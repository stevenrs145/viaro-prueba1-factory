// Spec 4: intentos restantes en la página del quiz.
// QUIZ-REG no tiene límite y lo comparten otros specs: el límite se pone con un override para estudiante11, desde la UI
// como profesor, sin tocar el ajuste general del quiz. reset.php no borra overrides y cada prueba corre en dos proyectos
// con el mismo estudiante: por eso cada prueba arranca y termina sin override y sin intentos de estudiante11.
import { test, expect, type Page } from '@playwright/test';
import {
  login, abrirQuiz, botonIntento, enviarIntento, esperarJS, prepararCaptura, siguientePagina,
} from '../../../factory/regresion/helpers';

const ESTUDIANTE = 'estudiante11';
const APELLIDO = 'Número 11'; // Identifica su fila en informes y overrides; no coincide con "Número 1".

let cmid: number;

/** El mensaje del plugin dentro del recuadro de información. El aviso nativo de intentos agotados va al pie, fuera de .quizinfo. */
const mensajeIntentos = (page: Page) => page.locator('.quizinfo p', { hasText: /\bte quedan?\s/i });

/** Cualquier rastro del mensaje en toda la página, dentro o fuera del recuadro. */
const mensajeEnLaPagina = (page: Page) => page.getByText(/\bte quedan?\s/i);

/** Como profesor: borra los intentos de estudiante11 en el informe, sin tocar los de otros estudiantes. */
async function borrarIntentos(page: Page) {
  await page.goto(`/mod/quiz/report.php?id=${cmid}&mode=overview&pagesize=100`);
  await esperarJS(page);
  const casillas = page.locator('#attempts tr', { hasText: APELLIDO }).locator('input[name="attemptid[]"]');
  if (await casillas.count() === 0) return;
  for (const casilla of await casillas.all()) await casilla.check();
  await esperarJS(page);
  await page.locator('#deleteattemptsbutton').click();
  // En móvil la tabla del informe desborda el ancho y el modal se desplaza al hacer scroll: el clic real nunca ve el botón
  // estable. Se despacha el clic sobre el botón del modal; que el borrado ocurrió lo comprueba el expect siguiente.
  await page.locator('.modal-footer [data-action="delete"]').dispatchEvent('click');
  await expect(casillas).toHaveCount(0);
}

/** Como profesor: quita el override de estudiante11, si existe. */
async function quitarOverride(page: Page) {
  await page.goto(`/mod/quiz/overrides.php?cmid=${cmid}&mode=user`);
  await esperarJS(page);
  const fila = page.locator('#quizoverrides tr', { hasText: APELLIDO });
  const eliminar = fila.locator('a[href*="overridedelete.php"]');
  if (await eliminar.count() === 0) return;
  await eliminar.click();
  await page.locator('form[action*="overridedelete.php"] button[type="submit"]').click();
  await expect(page).toHaveURL(/overrides\.php/);
  await expect(fila).toHaveCount(0);
}

/** Como profesor: da a estudiante11 un límite propio de intentos. El ajuste general del quiz no cambia. */
async function ponerLimite(page: Page, limite: number) {
  await login(page, 'profesor');
  await page.goto(`/mod/quiz/overrideedit.php?cmid=${cmid}&action=adduser`);
  await esperarJS(page);
  const usuario = page.locator('#fitem_id_userid');
  await usuario.getByRole('combobox').fill(APELLIDO);
  await esperarJS(page);
  await usuario.getByRole('option', { name: new RegExp(APELLIDO) }).click();
  await esperarJS(page);
  await expect(page.locator('#id_userid')).toHaveValue(/^\d+$/);
  await page.locator('#id_attempts').selectOption(String(limite));
  await page.locator('#id_submitbutton').click();
  await expect(page).toHaveURL(/overrides\.php/);
  await expect(page.locator('#quizoverrides tr', { hasText: APELLIDO })).toBeVisible();
}

/** Como estudiante: entra al primer intento o al siguiente. */
async function iniciarIntento(page: Page) {
  await botonIntento(page).click();
  await expect(page).toHaveURL(/attempt\.php/);
  await esperarJS(page);
}

/** Como estudiante: inicia un intento y lo envía. El botón de terminar solo está en la última página (3 páginas). */
async function hacerIntento(page: Page) {
  await iniciarIntento(page);
  await siguientePagina(page);
  await esperarJS(page);
  await siguientePagina(page);
  await esperarJS(page);
  await enviarIntento(page);
}

async function limpiar(page: Page) {
  await login(page, 'profesor');
  cmid = await abrirQuiz(page);
  await borrarIntentos(page);
  await quitarOverride(page);
}

test.beforeEach(async ({ page }) => {
  await limpiar(page);
});

test.afterEach(async ({ page }) => {
  await limpiar(page);
});

test('[CA-1] @requiere-feature con límite 3 y sin intentos, el estudiante ve que le quedan 3', async ({ page }) => {
  await ponerLimite(page, 3);
  await login(page, ESTUDIANTE);
  await abrirQuiz(page);
  await expect(mensajeIntentos(page)).toHaveText('Te quedan 3 intentos.');
  await expect(page).toHaveScreenshot('spec-4-quedan-intentos.png', { fullPage: true, mask: await prepararCaptura(page) });
});

test('[CA-1] @requiere-feature con límite 3 y un intento enviado, el estudiante ve que le quedan 2', async ({ page }) => {
  await ponerLimite(page, 3);
  await login(page, ESTUDIANTE);
  await abrirQuiz(page);
  await hacerIntento(page);
  await abrirQuiz(page);
  await expect(mensajeIntentos(page)).toHaveText('Te quedan 2 intentos.');
});

test('[CA-1] @requiere-feature con límite 2 y un intento enviado, el mensaje va en singular', async ({ page }) => {
  await ponerLimite(page, 2);
  await login(page, ESTUDIANTE);
  await abrirQuiz(page);
  await hacerIntento(page);
  await abrirQuiz(page);
  await expect(mensajeIntentos(page)).toHaveText('Te queda 1 intento.');
});

test('[CA-1] @requiere-feature con límite 3 y un intento en curso, el mensaje lo aclara y se puede continuar', async ({ page }) => {
  await ponerLimite(page, 3);
  await login(page, ESTUDIANTE);
  await abrirQuiz(page);
  await iniciarIntento(page);
  await abrirQuiz(page);
  await expect(mensajeIntentos(page)).toHaveText('Te quedan 2 intentos además del que está en curso.');
  await expect(page.getByRole('button', { name: 'Continuar el último intento' })).toBeVisible();
});

test('[CA-2] @requiere-feature el número baja después de enviar un intento', async ({ page }) => {
  await ponerLimite(page, 3);
  await login(page, ESTUDIANTE);
  await abrirQuiz(page);
  await expect(mensajeIntentos(page)).toHaveText('Te quedan 3 intentos.');
  await hacerIntento(page);
  await abrirQuiz(page);
  await expect(mensajeIntentos(page)).toHaveText('Te quedan 2 intentos.');
  await expect(page.getByText('Te quedan 3 intentos.')).toHaveCount(0);
});

test('[CA-3] @requiere-feature con límite 1 y ese intento enviado, el estudiante ve que no le quedan intentos', async ({ page }) => {
  await ponerLimite(page, 1);
  await login(page, ESTUDIANTE);
  await abrirQuiz(page);
  await hacerIntento(page);
  await abrirQuiz(page);
  await expect(mensajeIntentos(page)).toHaveText('No te quedan intentos.');
  await expect(botonIntento(page)).toHaveCount(0);
  await expect(page).toHaveScreenshot('spec-4-sin-intentos.png', { fullPage: true, mask: await prepararCaptura(page) });
});

test('[CA-3] @requiere-feature con límite 1 y ese intento en curso, el mensaje lo aclara y se puede continuar', async ({ page }) => {
  await ponerLimite(page, 1);
  await login(page, ESTUDIANTE);
  await abrirQuiz(page);
  await iniciarIntento(page);
  await abrirQuiz(page);
  await expect(mensajeIntentos(page)).toHaveText('No te quedan intentos después del que está en curso.');
  await page.getByRole('button', { name: 'Continuar el último intento' }).click();
  await expect(page).toHaveURL(/attempt\.php/);
});

test('[CA-4] en un quiz sin límite no aparece ningún mensaje y el botón de intento funciona', async ({ page }) => {
  await login(page, ESTUDIANTE);
  await abrirQuiz(page);
  // QUIZ-REG sin límite solo informa el método de calificación: un párrafo más sería un mensaje nuevo.
  await expect(page.locator('.quizinfo p')).toHaveCount(1);
  await expect(mensajeEnLaPagina(page)).toHaveCount(0);
  await expect(page).toHaveScreenshot('spec-4-sin-limite.png', { fullPage: true, mask: await prepararCaptura(page) });
  await botonIntento(page).click();
  await expect(page).toHaveURL(/attempt\.php/);
});

test('[CA-4] en un quiz sin límite, tras enviar un intento sigue sin aparecer ningún mensaje', async ({ page }) => {
  await login(page, ESTUDIANTE);
  await abrirQuiz(page);
  await hacerIntento(page);
  await abrirQuiz(page);
  await expect(page.locator('.quizinfo p')).toHaveCount(1);
  await expect(mensajeEnLaPagina(page)).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Reintentar el cuestionario' })).toBeVisible();
});

test('[CA-4] fuera de alcance: con el override vigente, el profesor no ve el mensaje', async ({ page }) => {
  await ponerLimite(page, 3);
  await abrirQuiz(page);
  await expect(page.locator('.quizinfo')).toBeVisible();
  await expect(mensajeEnLaPagina(page)).toHaveCount(0);
});
