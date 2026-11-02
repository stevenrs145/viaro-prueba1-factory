// Spec 1: reconocimiento obligatorio antes de iniciar un quiz (quizaccess_reconocimiento).
// La configuración se cambia desde la UI y cada prueba la deja desactivada en su `finally`: el examen es compartido.
// Toda prueba que abre un intento lo envía: un intento abierto haría que la siguiente pasada no viera el prechequeo.
import { test, expect, type Locator, type Page } from '@playwright/test';
import {
  abrirQuiz, bloquePregunta, botonIntento, enviarIntento, esperarJS, login, prepararCaptura, siguientePagina,
} from '../../../factory/regresion/helpers';

const CON_RECONOCIMIENTO = 'estudiante5';
const SIN_RECONOCIMIENTO = 'estudiante6';

const TEXTO = 'Declaro que resolveré este examen sin ayuda de terceros.';
const AVISO = 'Antes de iniciar el intento deberá aceptar un reconocimiento.';
const ERROR_ACEPTAR = 'Debe aceptar el reconocimiento para iniciar el intento.';
const ERROR_TEXTO_VACIO = 'Escriba el texto del reconocimiento.';

const activado = (page: Page) => page.locator('#id_reconocimientoenabled');
const texto = (page: Page) => page.locator('#id_reconocimientotext');
const formularioPrechequeo = (page: Page) => page.locator('#mod_quiz_preflight_form');

/** Abre los ajustes del examen como profesor, con la sección donde mod_form.php agrega las reglas de acceso desplegada. */
async function abrirAjustes(page: Page) {
  await login(page, 'profesor');
  const cmid = await abrirQuiz(page);
  await page.goto(`/course/modedit.php?update=${cmid}&return=1`);
  await esperarJS(page);
  if (!(await page.locator('#id_securitycontainer').isVisible())) {
    await page.locator('a.fheader[aria-controls="id_securitycontainer"]').click();
  }
  await expect(activado(page)).toBeVisible();
}

/**
 * En el viewport móvil el pie fijo de mod_form deja el botón "Guardar" fuera del viewport aunque Playwright haga scroll,
 * así que `click()` nunca pasa la comprobación de actionability. Se dispara el click del propio botón (envía el formulario
 * con ese botón como remitente y ejecuta la validación de Moodle); es solo la acción del docente, no lo que se verifica.
 */
async function pulsarGuardar(page: Page) {
  const boton = page.locator('#id_submitbutton');
  await expect(boton).toBeAttached();
  await boton.evaluate((el: HTMLElement) => el.click());
}

async function guardarAjustes(page: Page) {
  await pulsarGuardar(page);
  await expect(page).toHaveURL(/mod\/quiz\/view\.php\?id=\d+/);
}

async function activar(page: Page, valor: string) {
  await abrirAjustes(page);
  await activado(page).selectOption('1');
  await texto(page).fill(valor);
  await guardarAjustes(page);
}

async function desactivar(page: Page) {
  await abrirAjustes(page);
  await activado(page).selectOption('0');
  await guardarAjustes(page);
}

/** Entra como estudiante y abre el diálogo de prechequeo con el botón de intento. */
async function abrirDialogo(page: Page, usuario: string): Promise<Locator> {
  await login(page, usuario);
  await abrirQuiz(page);
  await esperarJS(page);
  const dialogo = page.locator('.mod_quiz_preflight_popup');
  // preflightcheck.js crea el diálogo en un Y.use asíncrono y enlaza el botón justo después: pending_js no lo cubre.
  await expect(dialogo.locator('#mod_quiz_preflight_form')).toHaveCount(1);
  await botonIntento(page).click();
  await expect(dialogo.locator('#mod_quiz_preflight_form')).toBeVisible();
  return dialogo;
}

async function aceptar(page: Page, dialogo: Locator) {
  await dialogo.locator('#id_reconocimientoaceptado').check();
  await dialogo.locator('[name="submitbutton"]').click();
  await expect(page).toHaveURL(/mod\/quiz\/attempt\.php/);
  await expect(bloquePregunta(page, 1)).toBeVisible();
}

/** Desde la primera página: el botón para terminar solo existe en la última (en las otras es un enlace). */
async function terminarDesdePrimeraPagina(page: Page) {
  await siguientePagina(page);
  await expect(bloquePregunta(page, 3)).toBeVisible();
  await siguientePagina(page);
  await expect(bloquePregunta(page, 5)).toBeVisible();
  await enviarIntento(page);
}

async function expectSinIntentoAbierto(page: Page) {
  await expect(page).toHaveURL(/mod\/quiz\/view\.php/);
  await expect(page.getByRole('button', { name: /continuar el último intento/i })).toHaveCount(0);
  await expect(botonIntento(page)).toBeVisible();
}

async function urlDeInicioDirecto(page: Page, cmid: number) {
  const sesskey = await page.evaluate(() => (window as any).M.cfg.sesskey);
  return `/mod/quiz/startattempt.php?cmid=${cmid}&sesskey=${sesskey}`;
}

test.describe('[Spec 1] reconocimiento obligatorio', () => {
  test('[CA-1] con el reconocimiento activado el botón de intento abre el diálogo y no muestra preguntas @requiere-feature', async ({ page }) => {
    try {
      await activar(page, TEXTO);
      const dialogo = await abrirDialogo(page, CON_RECONOCIMIENTO);
      await expect(dialogo.locator('.quizaccess_reconocimiento_texto')).toHaveText(TEXTO);
      await expect(page.getByText(AVISO)).toBeVisible();
      await expect(page).toHaveURL(/mod\/quiz\/view\.php/);
      await expect(page.locator('.que')).toHaveCount(0);
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-1] enviar sin marcar la casilla muestra el error y no crea intento @requiere-feature @camino-error', async ({ page }) => {
    try {
      await activar(page, TEXTO);
      const dialogo = await abrirDialogo(page, CON_RECONOCIMIENTO);
      await dialogo.locator('[name="submitbutton"]').click();

      await expect(page).toHaveURL(/mod\/quiz\/startattempt\.php/);
      await expect(page.locator('#id_error_reconocimientoaceptado')).toHaveText(ERROR_ACEPTAR);
      await expect(page.locator('.que')).toHaveCount(0);

      await abrirQuiz(page);
      await expectSinIntentoAbierto(page);
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-1] abrir startattempt.php directamente muestra el formulario y no la pregunta @requiere-feature @camino-error', async ({ page }) => {
    try {
      await activar(page, TEXTO);
      await login(page, CON_RECONOCIMIENTO);
      const cmid = await abrirQuiz(page);
      await page.goto(await urlDeInicioDirecto(page, cmid));

      await expect(formularioPrechequeo(page)).toBeVisible();
      await expect(page).toHaveURL(/mod\/quiz\/startattempt\.php/);
      await expect(page.locator('.que')).toHaveCount(0);

      // Sin JS, Cancelar pasa por el servidor en vez de solo cerrar el diálogo.
      await page.locator('#id_cancel').click();
      await expectSinIntentoAbierto(page);
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-1] cancelar el diálogo deja al estudiante en la página del quiz sin intento @requiere-feature', async ({ page }) => {
    try {
      await activar(page, TEXTO);
      const dialogo = await abrirDialogo(page, CON_RECONOCIMIENTO);
      await dialogo.locator('#id_cancel').click();

      await expect(formularioPrechequeo(page)).toBeHidden();
      await expect(page.locator('.que')).toHaveCount(0);
      await page.reload();
      await expectSinIntentoAbierto(page);
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-1] al aceptar se llega a la primera pregunta @requiere-feature', async ({ page }) => {
    try {
      await activar(page, TEXTO);
      const dialogo = await abrirDialogo(page, CON_RECONOCIMIENTO);
      await aceptar(page, dialogo);
      await terminarDesdePrimeraPagina(page);
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-1] captura del formulario de prechequeo @requiere-feature', async ({ page }) => {
    try {
      await activar(page, TEXTO);
      await login(page, CON_RECONOCIMIENTO);
      const cmid = await abrirQuiz(page);
      // Se captura startattempt.php y no el diálogo: detrás del diálogo está la tabla de intentos del estudiante,
      // que cambia con el orden de las pruebas. El formulario es el mismo en ambos caminos.
      await page.goto(await urlDeInicioDirecto(page, cmid));
      await expect(formularioPrechequeo(page).locator('.quizaccess_reconocimiento_texto')).toHaveText(TEXTO);
      await expect(page).toHaveScreenshot('spec-1-prechequeo.png', { fullPage: true, mask: await prepararCaptura(page) });
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-2] sin configurar, el botón lleva directo a la primera pregunta', async ({ page }) => {
    await login(page, SIN_RECONOCIMIENTO);
    await abrirQuiz(page);
    await esperarJS(page);
    await expect(page.getByText(AVISO)).toHaveCount(0);
    await expect(formularioPrechequeo(page)).toHaveCount(0);

    await botonIntento(page).click();
    await expect(page).toHaveURL(/mod\/quiz\/attempt\.php/);
    await expect(bloquePregunta(page, 1)).toBeVisible();
    await terminarDesdePrimeraPagina(page);
  });

  test('[CA-2] tras activar y desactivar el flujo vuelve a ser directo y el texto se conserva @requiere-feature', async ({ page }) => {
    try {
      await activar(page, TEXTO);
      await desactivar(page);

      await login(page, SIN_RECONOCIMIENTO);
      await abrirQuiz(page);
      await esperarJS(page);
      await expect(page.getByText(AVISO)).toHaveCount(0);
      await expect(formularioPrechequeo(page)).toHaveCount(0);
      await botonIntento(page).click();
      await expect(page).toHaveURL(/mod\/quiz\/attempt\.php/);
      await expect(bloquePregunta(page, 1)).toBeVisible();
      await terminarDesdePrimeraPagina(page);

      await abrirAjustes(page);
      await expect(activado(page)).toHaveValue('0');
      await expect(texto(page)).toHaveValue(TEXTO);
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-3] el texto se guarda por quiz y el estudiante ve siempre el último @requiere-feature', async ({ page }) => {
    const textoA = 'Texto A: leí las instrucciones del examen.';
    const textoB = 'Texto B: acepto las condiciones del examen.';
    try {
      await activar(page, textoA);
      await abrirAjustes(page);
      await expect(activado(page)).toHaveValue('1');
      await expect(texto(page)).toHaveValue(textoA);

      const dialogoA = await abrirDialogo(page, CON_RECONOCIMIENTO);
      await expect(dialogoA.locator('.quizaccess_reconocimiento_texto')).toHaveText(textoA);

      await activar(page, textoB);
      const dialogoB = await abrirDialogo(page, CON_RECONOCIMIENTO);
      await expect(dialogoB.locator('.quizaccess_reconocimiento_texto')).toHaveText(textoB);
      await expect(dialogoB).not.toContainText(textoA);
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-3] activar con el texto vacío no guarda y muestra el error en el campo @requiere-feature @camino-error', async ({ page }) => {
    try {
      await abrirAjustes(page);
      await activado(page).selectOption('1');
      await texto(page).fill('   ');
      await pulsarGuardar(page);

      await expect(page).toHaveURL(/course\/modedit\.php/);
      await expect(page.locator('#id_error_reconocimientotext')).toHaveText(ERROR_TEXTO_VACIO);

      await abrirAjustes(page);
      await expect(activado(page)).toHaveValue('0');
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-3] el texto con etiquetas HTML se muestra escapado @requiere-feature', async ({ page }) => {
    const conEtiquetas = 'Acepto <b data-qa="inyectado">las reglas</b> del examen.';
    try {
      await activar(page, conEtiquetas);
      const dialogo = await abrirDialogo(page, CON_RECONOCIMIENTO);
      await expect(dialogo.locator('.quizaccess_reconocimiento_texto')).toHaveText(conEtiquetas);
      await expect(dialogo.locator('[data-qa="inyectado"]')).toHaveCount(0);
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-3] captura de los ajustes con el reconocimiento activado @requiere-feature', async ({ page }) => {
    try {
      await activar(page, TEXTO);
      await abrirAjustes(page);
      await expect(texto(page)).toBeVisible();
      await expect(page).toHaveScreenshot('spec-1-ajustes.png', { fullPage: true, mask: await prepararCaptura(page) });
    } finally {
      await desactivar(page);
    }
  });

  test('[CA-1][CA-3] camino completo: el profesor configura, el estudiante acepta, responde y envía @requiere-feature', async ({ page }) => {
    try {
      await activar(page, TEXTO);
      const dialogo = await abrirDialogo(page, CON_RECONOCIMIENTO);
      await expect(dialogo.locator('.quizaccess_reconocimiento_texto')).toHaveText(TEXTO);
      await aceptar(page, dialogo);
      await terminarDesdePrimeraPagina(page);
      await expect(page).toHaveURL(/mod\/quiz\/review\.php/);
    } finally {
      await desactivar(page);
    }
  });
});
