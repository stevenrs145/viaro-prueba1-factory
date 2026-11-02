// Soporte exclusivo de las pruebas de spec-0. Complementa factory/regresion/helpers.ts (que este spec no puede editar).
// Selectores tomados del código de Moodle 5.3 en entorno/.moodle-src/. Las aserciones que deciden si un criterio se
// cumple están en los .spec.ts; acá solo hay esperas y comprobaciones de que cada paso auxiliar terminó bien.
import { expect, type Locator, type Page } from '@playwright/test';
import { CLAVE, bloquePregunta, prepararCaptura } from '../../../factory/regresion/helpers';

export type TipoPregunta = 'multichoice' | 'truefalse' | 'essay';
export type Categoria = { id: string; contexto: string };

type ConfigMoodle = { courseId: number; contextid: number; sesskey: string };

const configMoodle = (page: Page): Promise<ConfigMoodle> =>
  page.evaluate(() => (window as unknown as { M: { cfg: ConfigMoodle } }).M.cfg);

/** Nombre único que no contiene "Examen de regresión", para que abrirQuiz nunca tome este examen por QUIZ-REG. */
export const nombreUnico = (prefijo: string, proyecto: string) => `${prefijo} ${proyecto} ${Date.now()}`;

/**
 * TinyMCE crea su iframe oculto y lo muestra al terminar de cargar sus módulos, lo que puede superar los 5 s por defecto
 * de expect con el servidor bajo carga. Es una espera de carga: la aserción sobre el editor no cambia.
 */
export const ESPERA_EDITOR = 30_000;

/**
 * Inicio de sesión de las pruebas de profesor de spec-0. Igual que login() de helpers.ts, pero espera 'domcontentloaded'
 * en vez de 'load': la primera petición tras un arranque en frío de Moodle puede tardar más de 30 s en terminar de
 * cargar todos los recursos de la portada de login aunque el formulario ya esté usable. Cada paso siguiente
 * (fill, click, expect) sigue esperando por sí mismo a su elemento, y la aserción final es la misma.
 */
export async function iniciarSesion(page: Page, usuario: string) {
  await page.context().clearCookies();
  // net::ERR_ABORTED: una navegación anterior (o la recarga de una ventana emergente que se cerró) todavía estaba en curso
  // y el navegador la cancela al empezar esta. No es un fallo de Moodle: se reintenta una vez la misma navegación.
  for (let intento = 1; ; intento++) {
    try {
      await page.goto('/login/index.php', { waitUntil: 'domcontentloaded', timeout: 60_000 });
      break;
    } catch (error) {
      if (intento >= 2 || !String(error).includes('ERR_ABORTED')) throw error;
    }
  }
  // Con 'domcontentloaded' el formulario puede recargarse (navegación anterior que termina, scripts de la portada) entre el
  // fill y el clic, y entonces se envía vacío: Moodle responde "Unable to log in" aunque las credenciales sean correctas.
  // Se comprueba que los valores siguen en los campos justo antes de enviar y, si el envío fue rechazado, se repite
  // el formulario una vez. La aserción final (ya no hay #loginbtn) es la misma de login() de helpers.ts.
  for (let intento = 1; ; intento++) {
    await page.fill('#username', usuario);
    await page.fill('#password', CLAVE);
    await expect(page.locator('#username')).toHaveValue(usuario);
    await expect(page.locator('#password')).toHaveValue(CLAVE);
    await page.click('#loginbtn');
    try {
      await expect(page.locator('#loginbtn')).toHaveCount(0);
      return;
    } catch (error) {
      if (intento >= 2) throw error;
      await page.goto('/login/index.php', { waitUntil: 'domcontentloaded', timeout: 60_000 });
    }
  }
}

/**
 * prepararCaptura() espera 'networkidle' con el límite por defecto de 30 s, que no alcanza cuando Moodle carga en frío
 * (TinyMCE, AMD, estilos). Se espera primero la misma condición con un límite mayor; luego prepararCaptura() la
 * encuentra ya cumplida. Devuelve las mismas máscaras; no cambia qué se compara.
 */
export async function prepararCapturaLenta(page: Page): Promise<Locator[]> {
  await page.waitForLoadState('networkidle', { timeout: 90_000 });
  return prepararCaptura(page);
}

export async function idCursoQA101(page: Page): Promise<number> {
  await page.goto('/course/view.php?name=QA101');
  return (await configMoodle(page)).courseId;
}

// ---------------------------------------------------------------------------------------------------------
// Examen

export async function abrirFormularioExamen(page: Page, curso: number) {
  await page.goto(`/course/modedit.php?add=quiz&course=${curso}&section=0`);
  await expect(page.locator('#id_introeditor_ifr')).toBeVisible({ timeout: ESPERA_EDITOR });
}

/**
 * Deja abierto el índice del curso (solo escritorio) para capturar siempre el mismo estado. Abierto o cerrado es una
 * preferencia guardada por usuario (drawer-open-index, boost/layout/drawers.php:34) que sobrevive entre corridas: no es
 * parte de la pantalla que se protege. En móvil no aplica: drawers.js:328 lo cierra al cargar sin mirar la preferencia.
 */
export async function abrirIndiceCurso(page: Page) {
  const abrir = page.getByRole('button', { name: 'Open course index' });
  if (await abrir.isVisible()) await abrir.click();
  await expect(page.getByRole('button', { name: 'Close course index' })).toBeVisible();
}

/** Guarda con "Save and display" y devuelve el cmid del examen creado o editado. */
export async function guardarExamen(page: Page): Promise<number> {
  await page.getByRole('button', { name: 'Save and display' }).click();
  await expect(page).toHaveURL(/mod\/quiz\/view\.php\?id=\d+/);
  return Number(new URL(page.url()).searchParams.get('id'));
}

export async function crearExamen(page: Page, curso: number, nombre: string): Promise<number> {
  await abrirFormularioExamen(page, curso);
  await page.locator('#id_name').fill(nombre);
  return guardarExamen(page);
}

export async function eliminarExamen(page: Page, cmid: number) {
  const { sesskey } = await configMoodle(page);
  await page.goto(`/course/mod.php?delete=${cmid}&sesskey=${sesskey}`);
  await page.getByRole('button', { name: 'Yes', exact: true }).click();
  await expect(page).toHaveURL(/course\/(view|section)\.php/);
}

// ---------------------------------------------------------------------------------------------------------
// Banco de preguntas

/** cmid del banco compartido de QA101, leído de la lista de bancos del curso. */
export async function cmidBanco(page: Page, curso: number): Promise<number> {
  await page.goto(`/question/banks.php?courseid=${curso}`);
  const banco = page.locator('.shared-banks .questioncount[data-cmid]').first();
  await expect(banco).toBeAttached();
  return Number(await banco.getAttribute('data-cmid'));
}

export const urlCategorias = (banco: number) => `/question/bank/managecategories/category.php?cmid=${banco}`;
const urlBanco = (banco: number, c: Categoria) => `/question/edit.php?cmid=${banco}&cat=${c.id},${c.contexto}`;

export const filaCategoria = (page: Page, nombre: string): Locator =>
  page.locator(`li.qbank_managecategories-item[data-categoryname=${JSON.stringify(nombre)}]`);

export const filaPregunta = (page: Page, nombre: string): Locator =>
  page.locator('#categoryquestions tbody tr', { hasText: nombre });

/**
 * Crea una categoría propia en el banco. Es necesaria porque el banco sembrado no tiene categoría por defecto
 * (question_bank_helper.php:660 usa skipdefaultcategory): sin esto, las preguntas caerían en Álgebra.
 */
export async function crearCategoria(page: Page, banco: number, nombre: string): Promise<Categoria> {
  await page.goto(urlCategorias(banco));
  // El botón recibe su evento cuando el componente reactivo termina de cargar el estado.
  await page.waitForLoadState('networkidle', { timeout: 90_000 });
  await page.locator('#qbank_managecategories-addcategory [data-action="addeditcategory"]').click();
  const modal = page.locator('[data-region="modal"]').filter({ has: page.locator('input[name="name"]') });
  await modal.locator('input[name="name"]').fill(nombre);
  await modal.locator('[data-action="save"]').click();
  await expect(filaCategoria(page, nombre)).toHaveCount(1);
  await page.reload();
  const id = await filaCategoria(page, nombre).getAttribute('data-categoryid');
  const { contextid } = await configMoodle(page);
  return { id: String(id), contexto: String(contextid) };
}

/** Escribe en un editor TinyMCE. `iframe` es el selector CSS de su iframe. */
export async function escribirEditor(page: Page, iframe: string, texto: string) {
  await expect(page.locator(iframe)).toBeVisible({ timeout: ESPERA_EDITOR });
  // El iframe ya es visible mientras TinyMCE sigue cargando: su "throbber" (aria-busy) tapa el editor e intercepta el
  // click. Se espera a que desaparezca antes de interactuar.
  await expect(page.locator('.tox-tinymce', { has: page.locator(iframe) }).locator('.tox-throbber')).toBeHidden({
    timeout: ESPERA_EDITOR,
  });
  const cuerpo = page.frameLocator(iframe).locator('body');
  await cuerpo.click();
  await cuerpo.fill(texto);
}

/** Crea una pregunta desde el botón "Create a new question ..." del banco, dentro de la categoría indicada. */
export async function crearPregunta(page: Page, banco: number, categoria: Categoria, tipo: TipoPregunta, nombre: string) {
  await page.goto(urlBanco(banco, categoria));
  // edit.php:73 corta la página sin pintar el banco mientras la migración de mod_qbank siga en la cola de tareas ad hoc.
  await expect(
    page.getByRole('alert').filter({ hasText: 'transfer_question_categories' }),
    'Entorno: las tareas ad hoc de mod_qbank no terminaron; revisar el cron o ejecutarlas antes de esta prueba',
  ).toHaveCount(0);
  // Con teclado, no con click: en móvil, el punto de click de Playwright cae sobre elementos que están ANTES del botón
  // en el flujo (h2, filtros) o bajo la barra fija, aunque nada lo tape en el DOM. El teclado no depende de coordenadas
  // y recorre el mismo botón, el mismo diálogo y el mismo envío. El botón nace deshabilitado hasta que carga chooser.js
  // y el diálogo solo habilita "Add" al elegir un tipo: se espera cada estado porque press() no lo hace.
  const crear = page.getByRole('button', { name: /create a new question/i });
  await expect(crear).toBeEnabled();
  await crear.press('Enter');
  const tipoPregunta = page.locator(`#item_qtype_${tipo}`);
  await expect(tipoPregunta).toBeVisible();
  await tipoPregunta.press('Space');
  await expect(tipoPregunta).toBeChecked();
  const agregar = page.locator('#chooserform input.submitbutton');
  await expect(agregar).toBeEnabled();
  await agregar.press('Enter');
  await expect(page).toHaveURL(/question\/bank\/editquestion\/question\.php/);

  await page.locator('#id_name').fill(nombre);
  await escribirEditor(page, '#id_questiontext_ifr', `Enunciado de ${nombre}`);
  if (tipo === 'multichoice') {
    await escribirEditor(page, '#id_answer_0_ifr', 'Correcta');
    await page.locator('#id_fraction_0').selectOption({ label: '100%' });
    await escribirEditor(page, '#id_answer_1_ifr', 'Incorrecta');
  } else if (tipo === 'truefalse') {
    await page.locator('#id_correctanswer').selectOption({ label: 'True' });
  }
  await page.locator('#id_submitbutton').click();
  await expect(page).toHaveURL(/question\/edit\.php/);
  await expect(filaPregunta(page, nombre)).toHaveCount(1);
}

/** Add > from question bank > Switch bank > filtro de categoría > Add selected questions to the quiz. */
export async function agregarDesdeBanco(page: Page, examen: number, banco: number, categoria: string, preguntas: string[]) {
  await page.goto(`/mod/quiz/edit.php?cmid=${examen}`);
  await page.waitForLoadState('networkidle', { timeout: 90_000 });
  await page.locator('.last-add-menu a[data-bs-toggle="dropdown"]').click();
  await page.locator('.last-add-menu [data-action="questionbank"]').click();

  // El modal abre en el banco privado del examen; las preguntas están en el banco del curso.
  await page.locator('#switch-question-bank').click();
  // bank_switcher.js oculta esta selección justo antes de registrar el clic de los enlaces.
  await expect(page.locator('.search-banks .form-autocomplete-selection.d-none')).toHaveCount(1);
  // Tras visitarlo, el banco también aparece en "recientes" con el mismo data-newmodid; "banks in course" siempre lo lista.
  await page.locator(`.course-shared-banks a[data-newmodid="${banco}"]`).click();

  const filtro = page.locator('[data-filter-type="category"]');
  const entrada = filtro.locator('div.form-autocomplete-input input');
  await entrada.click();
  await entrada.fill(categoria);
  await filtro.locator('.form-autocomplete-suggestions li', { hasText: categoria }).click();
  await page.locator('[data-filteraction="apply"]').click();

  for (const nombre of preguntas) {
    await filaPregunta(page, nombre).locator('input[type="checkbox"]').check();
  }
  await page.getByRole('button', { name: 'Add selected questions to the quiz' }).click();
  await expect(page).toHaveURL(/mod\/quiz\/edit\.php/);
}

/** Borra todas las preguntas de la categoría con la confirmación del banco y comprueba que ya no se listan. */
export async function eliminarPreguntas(page: Page, banco: number, categoria: Categoria) {
  await page.goto(urlBanco(banco, categoria));
  const nombres = await page.locator('#categoryquestions tbody input[type="checkbox"]')
    .evaluateAll((casillas) => casillas.map((c) => (c as HTMLInputElement).name));
  const ids = nombres.filter((n) => /^q\d+$/.test(n));
  if (!ids.length) return;
  const { sesskey } = await configMoodle(page);
  const parametros = new URLSearchParams({
    deleteselected: ids[0].slice(1),
    deleteall: '1',
    sesskey,
    cmid: String(banco),
    returnurl: `/question/edit.php?cmid=${banco}`,
  });
  ids.forEach((q) => parametros.set(q, '1'));
  await page.goto(`/question/bank/deletequestion/delete.php?${parametros}`);
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await expect(page).toHaveURL(/question\/edit\.php/);
  await page.goto(urlBanco(banco, categoria));
  await expect(page.locator('#categoryquestions tbody tr')).toHaveCount(0);
}

export async function eliminarCategoria(page: Page, banco: number, categoria: Categoria) {
  const { sesskey } = await configMoodle(page);
  await page.goto(`${urlCategorias(banco)}&delete=${categoria.id}&sesskey=${sesskey}`);
  await expect(page).toHaveURL(/managecategories\/category\.php/);
}

// ---------------------------------------------------------------------------------------------------------
// Intento y calificación

/** Radio de una opción, con el mismo criterio de nombre accesible que elegir() en helpers.ts. */
export function opcion(page: Page, pregunta: number, texto: string): Locator {
  return bloquePregunta(page, pregunta).getByRole('radio', { name: new RegExp(`^([a-z0-9]+\\. )?${texto}$`, 'i') });
}

/** Celda de estado de una pregunta en la tabla de summary.php. */
export const estadoEnResumen = (page: Page, pregunta: number): Locator =>
  page.locator(`table.quizsummaryofattempt tr.quizsummary${pregunta} td.c1`);

/** Desde la última página del intento va a summary.php, sin enviar. */
export async function irAlResumen(page: Page) {
  await page.getByRole('button', { name: /finish attempt/i }).click();
  await expect(page).toHaveURL(/summary\.php/);
}

export const idIntento = (page: Page) => Number(new URL(page.url()).searchParams.get('attempt'));

/**
 * Celdas de la columna Time del historial de respuestas de comment.php. prepararCaptura no las cubre y la fábrica
 * no puede editar helpers.ts desde este spec. Se ubican por el texto del encabezado, no por posición.
 */
export async function celdasTiempoHistorial(page: Page): Promise<Locator> {
  const tabla = page.locator('div.responsehistoryheader table');
  const encabezados = await tabla.locator('thead th').allTextContents();
  const columna = encabezados.findIndex((t) => t.trim() === 'Time');
  expect(columna, `Encabezados del historial: ${encabezados.join(', ')}`).not.toEqual(-1);
  return tabla.locator(`tbody tr > :nth-child(${columna + 1})`);
}
