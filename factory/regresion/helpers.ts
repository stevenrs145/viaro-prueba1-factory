// Helpers compartidos por TODAS las pruebas (regresión y las generadas por la fábrica).
// Selectores verificados contra Moodle 5.3 en la instancia (ver ia/bitacora.md). La IA de la fábrica
// debe usar estos helpers en vez de reinventar selectores.
import { expect, type Locator, type Page } from '@playwright/test';

export const CLAVE = 'Viaro.2026';
export const QUIZ_REG = 'Examen de regresión';
export const RECEPTOR = process.env.RECEPTOR_URL || 'http://localhost:8091';

export async function login(page: Page, usuario: string) {
  await page.context().clearCookies();
  await page.goto('/login/index.php');
  await page.fill('#username', usuario);
  await page.fill('#password', CLAVE);
  await page.click('#loginbtn');
  await expect(page.locator('#loginbtn')).toHaveCount(0);
}

/** Abre la página de un quiz del curso QA101 por su nombre visible. Devuelve el cmid. */
export async function abrirQuiz(page: Page, nombre = QUIZ_REG): Promise<number> {
  await page.goto('/course/view.php?name=QA101');
  await page.locator('a.aalink', { hasText: nombre }).first().click();
  await expect(page).toHaveURL(/mod\/quiz\/view\.php\?id=\d+/);
  return Number(new URL(page.url()).searchParams.get('id'));
}

/** Botón principal de la página del quiz (Attempt quiz / Continue your attempt / Re-attempt quiz). */
export function botonIntento(page: Page): Locator {
  return page.getByRole('button', { name: /attempt quiz|continue your attempt|re-attempt quiz/i });
}

/** Responde una pregunta de opción múltiple o V/F por el texto de la opción, dentro del bloque de la pregunta N (1-based, número visible). */
export async function elegir(page: Page, pregunta: number, opcion: string) {
  const q = bloquePregunta(page, pregunta);
  // Opción múltiple: el nombre accesible incluye la numeración ("1. One"); V/F no ("True").
  const esc = opcion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  await q.getByRole('radio', { name: new RegExp(`^([a-z0-9]+\\. )?${esc}$`, 'i') }).check();
}

/** Escribe en una pregunta de ensayo. Con TinyMCE el iframe es "<id del textarea>_ifr" (p. ej. q2:6_answer_id_ifr). */
export async function escribirEnsayo(page: Page, pregunta: number, texto: string) {
  const q = bloquePregunta(page, pregunta);
  const iframe = q.locator('iframe[id$="_answer_id_ifr"]');
  await expect(iframe.or(q.locator('textarea[name$="_answer"]:visible'))).toBeVisible();
  if (await iframe.count()) {
    const cuerpo = q.frameLocator('iframe[id$="_answer_id_ifr"]').locator('body');
    await cuerpo.click();
    await cuerpo.fill(texto);
  } else {
    await q.locator('textarea[name$="_answer"]').fill(texto);
  }
}

export function bloquePregunta(page: Page, numero: number): Locator {
  return page.locator('.que').filter({ has: page.locator('.qno', { hasText: new RegExp(`^${numero}$`) }) });
}

export async function siguientePagina(page: Page) {
  await page.getByRole('button', { name: 'Next page' }).click();
  await page.waitForLoadState('domcontentloaded');
}

export async function paginaAnterior(page: Page) {
  await page.getByRole('button', { name: 'Previous page' }).click();
  await page.waitForLoadState('domcontentloaded');
}

/** Desde cualquier página del intento: Finish attempt -> resumen -> Submit all and finish -> confirmar en el modal. */
export async function enviarIntento(page: Page) {
  await page.getByRole('button', { name: /finish attempt/i }).click();
  await expect(page).toHaveURL(/summary\.php/);
  await page.getByRole('button', { name: 'Submit all and finish' }).click();
  const confirmar = page.locator('.modal-footer button', { hasText: 'Submit all and finish' });
  await expect(confirmar).toBeVisible({ timeout: 15_000 });
  await confirmar.click();
  await expect(page).toHaveURL(/review\.php/);
}

/** Tabla resumen de la pantalla de cierre/revisión del intento: valor de una fila por su encabezado (Status, Marks, Grade, Feedback...). */
export function filaResumen(page: Page, encabezado: string): Locator {
  return page.locator('table.quizreviewsummary tr').filter({ has: page.locator('th', { hasText: new RegExp(`^${encabezado}$`) }) }).locator('td');
}

/** Receptor externo (spec 2): controlar fallos y leer lo recibido. */
export async function receptor(page: Page, ruta: string, body?: unknown) {
  const r = body === undefined
    ? await page.request.get(`${RECEPTOR}${ruta}`)
    : await page.request.post(`${RECEPTOR}${ruta}`, { data: body });
  return r.json();
}

/**
 * Neutraliza lo que cambia legítimamente entre corridas ANTES de una captura:
 *  - quita foco y hover (tooltips)
 *  - devuelve máscaras para fechas, duraciones, temporizador y contadores de notificaciones.
 * Las máscaras tapan SOLO el valor dinámico (la celda), no la fila: si la fila desaparece, la captura lo detecta.
 */
export async function prepararCaptura(page: Page): Promise<Locator[]> {
  await page.mouse.move(0, 0);
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.waitForLoadState('networkidle');
  // Columnas de tablas cuyo encabezado indica un valor temporal: se marcan por el TEXTO del encabezado,
  // no por posición (la posición cambia entre informes y vistas).
  await page.evaluate((patron) => {
    const re = new RegExp(patron, 'i');
    document.querySelectorAll('table').forEach((t) => {
      const ths = Array.from(t.querySelectorAll('thead th, tr:first-child th'));
      ths.forEach((th, i) => {
        if (!re.test((th.textContent || '').trim())) return;
        t.querySelectorAll('tbody tr').forEach((tr) => tr.children[i]?.setAttribute('data-qa-mascara', 'tiempo'));
      });
    });
  }, '^(started|completed|duration|submitted|time taken|state)');
  return [
    filaResumen(page, 'Started'),
    filaResumen(page, 'Completed'),
    filaResumen(page, 'Duration'),
    page.locator('[data-qa-mascara]'),
    page.locator('#quiz-timer-wrapper'),
    page.locator('.popover-region .count-container'),
  ];
}
