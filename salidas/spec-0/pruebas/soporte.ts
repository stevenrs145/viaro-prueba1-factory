// Soporte exclusivo de las pruebas de spec-0. Complementa factory/regresion/helpers.ts (que este spec no puede editar).
// Selectores tomados del código de Moodle 5.3 en entorno/.moodle-src/. Las aserciones que deciden si un criterio se
// cumple están en los .spec.ts; acá solo hay esperas y comprobaciones de que cada paso auxiliar terminó bien.
import { expect, type Locator, type Page } from '@playwright/test';
import { bloquePregunta } from '../../../factory/regresion/helpers';

export type TipoPregunta = 'multichoice' | 'truefalse' | 'essay';
export type Categoria = { id: string; contexto: string };

type ConfigMoodle = { courseId: number; contextid: number; sesskey: string };

const configMoodle = (page: Page): Promise<ConfigMoodle> =>
  page.evaluate(() => (window as unknown as { M: { cfg: ConfigMoodle } }).M.cfg);

/** Nombre único que no contiene "Examen de regresión", para que abrirQuiz nunca tome este examen por QUIZ-REG. */
export const nombreUnico = (prefijo: string, proyecto: string) => `${prefijo} ${proyecto} ${Date.now()}`;

export async function idCursoQA101(page: Page): Promise<number> {
  await page.goto('/course/view.php?name=QA101');
  return (await configMoodle(page)).courseId;
}

// ---------------------------------------------------------------------------------------------------------
// Examen

export async function abrirFormularioExamen(page: Page, curso: number) {
  await page.goto(`/course/modedit.php?add=quiz&course=${curso}&section=0`);
  await expect(page.locator('#id_introeditor_ifr')).toBeVisible();
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
  await page.waitForLoadState('networkidle');
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
  await expect(page.locator(iframe)).toBeVisible();
  const cuerpo = page.frameLocator(iframe).locator('body');
  await cuerpo.click();
  await cuerpo.fill(texto);
}

/** Crea una pregunta desde el botón "Create a new question ..." del banco, dentro de la categoría indicada. */
export async function crearPregunta(page: Page, banco: number, categoria: Categoria, tipo: TipoPregunta, nombre: string) {
  await page.goto(urlBanco(banco, categoria));
  await page.getByRole('button', { name: /create a new question/i }).click();
  await page.locator(`#item_qtype_${tipo}`).check();
  await page.locator('#chooserform input.submitbutton').click();
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
  await page.waitForLoadState('networkidle');
  await page.locator('.last-add-menu a[data-bs-toggle="dropdown"]').click();
  await page.locator('.last-add-menu [data-action="questionbank"]').click();

  // El modal abre en el banco privado del examen; las preguntas están en el banco del curso.
  await page.locator('#switch-question-bank').click();
  // bank_switcher.js oculta esta selección justo antes de registrar el clic de los enlaces.
  await expect(page.locator('.search-banks .form-autocomplete-selection.d-none')).toHaveCount(1);
  await page.locator(`a[data-newmodid="${banco}"]`).click();

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
