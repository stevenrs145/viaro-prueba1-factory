// Pasos propios de spec-2: ajustes del plugin, examen de punta a punta y lectura del receptor y del registro.
import { expect, type Locator, type Page } from '@playwright/test';
import { abrirQuiz, botonIntento, elegir, enviarIntento, escribirEnsayo, esperarJS, login, receptor, siguientePagina } from '../../../factory/regresion/helpers';

export const AJUSTES = '/admin/settings.php?section=local_resultadoext';
export const REGISTRO = '/local/resultadoext/registro.php';
export const DESTINO_OK = 'http://receptor/resultados';
export const DESTINO_INEXISTENTE = 'http://receptor/ruta-inexistente';

// El cron corre cada 15 s, pero una vuelta puede tardar más si tiene otras tareas.
export const ESPERA_ENVIO = 120_000;
// El reintento es real: 60 s de backoff nativo, más la vuelta del cron y el timeout de 10 s de la llamada.
export const ESPERA_REINTENTO = 150_000;
// Prueba con un fallo y su reintento, más los inicios de sesión y el envío del examen.
export const DURACION_PRUEBA = 360_000;

export const campoDestino = (page: Page): Locator => page.locator('#id_s_local_resultadoext_destino');
export const campoMaxIntentos = (page: Page): Locator => page.locator('#id_s_local_resultadoext_maxintentos');
export const filaEnvio = (page: Page): Locator => page.locator('#local-resultadoext-envios tbody tr');
export const filasLlamadas = (page: Page): Locator => page.locator('#local-resultadoext-llamadas tbody tr');
export const tituloRegistro = (page: Page): Locator => page.locator('#region-main').getByRole('heading', { name: 'Registro de envíos al sistema externo' });

/** Inicia sesión como admin y guarda los ajustes indicados desde la UI. Al volver a abrir la página confirma que persistieron. */
export async function ajustarPlugin(page: Page, ajustes: { destino?: string; maxintentos?: number }) {
  await login(page, 'admin');
  await page.goto(AJUSTES);
  await esperarJS(page);
  if (ajustes.destino !== undefined) await campoDestino(page).fill(ajustes.destino);
  if (ajustes.maxintentos !== undefined) await campoMaxIntentos(page).selectOption(String(ajustes.maxintentos));
  const guardado = page.waitForResponse((r) => r.request().method() === 'POST' && r.url().includes('/admin/settings.php'));
  await page.locator('#adminsettings button[type="submit"]').click();
  await guardado;
  await page.goto(AJUSTES);
  if (ajustes.destino !== undefined) await expect(campoDestino(page)).toHaveValue(ajustes.destino);
  if (ajustes.maxintentos !== undefined) await expect(campoMaxIntentos(page)).toHaveValue(String(ajustes.maxintentos));
}

/**
 * Empieza un intento y responde bien las 5 preguntas automáticas. Devuelve el cmid.
 * Sin texto de ensayo, la pregunta queda en blanco: Moodle la cierra sin calificación manual (question_state::$gaveup),
 * así que get_total_mark() no es null y el intento tiene nota al enviarse. Con 5 de 6 puntos son 8,33 sobre 10.
 */
export async function responderExamen(page: Page, ensayo?: string): Promise<number> {
  const cmid = await abrirQuiz(page);
  await botonIntento(page).click();
  await elegir(page, 1, '12');
  await elegir(page, 2, 'Verdadero');
  await siguientePagina(page);
  await elegir(page, 3, '6');
  await elegir(page, 4, 'Verdadero');
  await siguientePagina(page);
  await elegir(page, 5, 'Verdadero');
  if (ensayo) await escribirEnsayo(page, 6, ensayo);
  return cmid;
}

/** Id del intento mostrado en la página de revisión. */
export const intentoEnRevision = (page: Page): number => Number(new URL(page.url()).searchParams.get('attempt'));

/** Responde, envía y devuelve el id del intento. */
export async function rendirExamen(page: Page): Promise<number> {
  await responderExamen(page);
  await enviarIntento(page);
  return intentoEnRevision(page);
}

export type Aviso = { cuerpo: any; headers: Record<string, string>; status: number | null; mode: string };

/** POST que llegaron al receptor para un intento. Filtrar por intento aísla la prueba de lo recibido antes. */
export async function avisosDe(page: Page, intento: number): Promise<Aviso[]> {
  const recibidos: Array<Omit<Aviso, 'cuerpo'> & { raw: string }> = await receptor(page, '/_recibidos');
  return recibidos.map((r) => ({ ...r, cuerpo: JSON.parse(r.raw) })).filter((a) => a.cuerpo.attempt === intento);
}

export const abrirRegistro = (page: Page, intento: number) => page.goto(`${REGISTRO}?intento=${intento}`);

/** Recarga el registro hasta que el envío del intento muestre ese estado. No acorta el backoff: solo observa. */
export async function esperarEstado(page: Page, intento: number, estado: string, espera: number) {
  await expect(async () => {
    await abrirRegistro(page, intento);
    await expect(filaEnvio(page)).toContainText(estado, { timeout: 1_000 });
  }).toPass({ timeout: espera, intervals: [3_000] });
}

export async function abrirLlamadas(page: Page, intento: number) {
  await abrirRegistro(page, intento);
  await page.locator('#local-resultadoext-envios').getByRole('link', { name: 'Ver llamadas' }).click();
  await expect(page.locator('#local-resultadoext-envio')).toBeVisible();
}

/** Como profesor, abre mode=grading y le pone 1 punto al ensayo con ese texto. Pueden convivir ensayos de otras pruebas. */
export async function calificarEnsayo(page: Page, cmid: number, texto: string) {
  await page.goto(`/mod/quiz/report.php?id=${cmid}&mode=grading`);
  const pregunta = page.getByRole('row', { name: /HIS-2 Ensayo/ });
  const enlace = await pregunta.locator('a[href*="grade=needsgrading"]').getAttribute('href');
  await page.goto(`${enlace}&pagesize=100`);
  await esperarJS(page);
  const ensayo = page.locator('#manualgradingform .que').filter({ hasText: texto });
  await ensayo.locator('input[name$="_-mark"]').fill('1');
  const guardado = page.waitForResponse((r) => r.request().method() === 'POST' && r.url().includes('/mod/quiz/report.php'));
  await page.locator('#manualgradingform input[type="submit"]').click();
  await guardado;
}
