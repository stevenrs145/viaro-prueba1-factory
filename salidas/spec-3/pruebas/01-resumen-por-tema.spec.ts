// CA-1 y CA-2: lo que ve el estudiante al terminar. QUIZ-REG es el "examen ya existente con retroalimentación general
// configurada" del spec: su retro se sembró antes de instalar el plugin y la desinstalación la restaura, así que estas
// pruebas fallan sin el plugin. Las aserciones van contra el intento recién creado: cada prueba hace el suyo.
import { test, expect } from '@playwright/test';
import { abrirQuiz, bloquePregunta, filaResumen, login, prepararCaptura } from '../../../factory/regresion/helpers';
import { ESPERA_EDITOR, guardarExamen } from '../../spec-0/pruebas/soporte';
import { abrirOpcionesRevision, celdasTema, estudianteDe, filasTemas, hacerIntento, seccionTemas } from './soporte';

test('[CA-1] [CA-2] al terminar ve su desempeño por los tres temas y no el bloque anterior @requiere-feature', async ({ page, isMobile }) => {
  test.setTimeout(180_000);
  await login(page, estudianteDe(isMobile));
  await hacerIntento(page, '4'); // la correcta es '6'; el ensayo queda vacío (gaveup vale 0 y no es pendiente)

  await expect(seccionTemas(page).getByRole('heading', { name: 'Resumen por tema' })).toBeVisible();
  await expect(seccionTemas(page).locator('thead th')).toHaveText(['Tema', 'Puntos', 'Porcentaje']);
  await expect(filasTemas(page)).toHaveCount(3);
  await expect(celdasTema(page, 0)).toHaveText(['Álgebra', '2,00/2,00', '100,00%']);
  await expect(celdasTema(page, 1)).toHaveText(['Geometría', '1,00/2,00', '50,00%']);
  await expect(celdasTema(page, 2)).toHaveText(['Historia', '1,00/2,00', '50,00%']);

  await expect(filaResumen(page, 'Retroalimentación')).toHaveCount(0);
  await expect(page.getByText('Retro global')).toHaveCount(0);

  // Ocupa el lugar del bloque anterior: justo debajo de la tabla resumen y antes de las preguntas.
  await expect(page.locator('div:has(> table.quizreviewsummary) + #local-resumentema')).toHaveCount(1);
  await expect(page.locator('#local-resumentema ~ .que, #local-resumentema ~ * .que')).toHaveCount(6);

  await expect(page).toHaveScreenshot('spec-3-cierre-por-tema.png', { fullPage: true, mask: await prepararCaptura(page) });
});

test('[CA-1] un ensayo pendiente se avisa por tema y al calificarlo el resumen se actualiza @requiere-feature', async ({ page, isMobile }) => {
  test.setTimeout(180_000);
  const estudiante = estudianteDe(isMobile);
  await login(page, estudiante);
  const intento = await hacerIntento(page, '6', 'Una rana saltó al estanque.');

  await expect(celdasTema(page, 2)).toHaveText(['Historia', '1,00/2,00', '1 pregunta sin calificar']);
  await expect(page).toHaveScreenshot('spec-3-cierre-pendiente.png', { fullPage: true, mask: await prepararCaptura(page) });

  await login(page, 'profesor');
  await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  // comment.php solo funciona como ventana emergente: al guardar recarga la ventana de origen y se cierra.
  const [popup] = await Promise.all([page.waitForEvent('popup'), bloquePregunta(page, 6).locator('.commentlink a').click()]);
  await expect(popup.locator('iframe[id$="_-comment_id_ifr"]')).toBeVisible({ timeout: ESPERA_EDITOR });
  await popup.locator('input[name$="_-mark"]').fill('0.5');
  const cierre = popup.waitForEvent('close');
  await popup.locator('#id_submitbutton').click();
  await cierre;
  await expect(celdasTema(page, 2)).toHaveText(['Historia', '1,50/2,00', '75,00%']);

  await login(page, estudiante);
  await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  await expect(celdasTema(page, 2)).toHaveText(['Historia', '1,50/2,00', '75,00%']);
  await expect(seccionTemas(page)).not.toContainText('sin calificar');
});

test('[CA-1] la sección aparece una sola vez con showall y no en las páginas siguientes @requiere-feature', async ({ page, isMobile }) => {
  test.setTimeout(180_000);
  await login(page, estudianteDe(isMobile));
  const intento = await hacerIntento(page, '6');

  await page.goto(`/mod/quiz/review.php?attempt=${intento}&showall=1`);
  await expect(seccionTemas(page)).toHaveCount(1);

  await page.goto(`/mod/quiz/review.php?attempt=${intento}&page=1&showall=0`);
  await expect(page.locator('.que')).toHaveCount(2);
  await expect(seccionTemas(page)).toHaveCount(0);
});

test('[CA-1] si el profesor oculta las notas la sección no las filtra', async ({ page, isMobile }) => {
  test.setTimeout(300_000);
  // Primero "marks": depende de "maxmarks" y queda deshabilitada cuando esta se desmarca. Al restaurar, el orden inverso.
  const casillas = ['marksimmediately', 'maxmarksimmediately', 'marksopen', 'maxmarksopen'];
  await login(page, 'profesor');
  const cmid = await abrirQuiz(page);
  await abrirOpcionesRevision(page, cmid);
  const estadoInicial = await Promise.all(casillas.map((c) => page.locator(`#id_${c}`).isChecked()));

  try {
    for (const casilla of casillas) await page.locator(`#id_${casilla}`).setChecked(false);
    await guardarExamen(page);

    await login(page, estudianteDe(isMobile));
    await hacerIntento(page, '6');
    await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');
    await expect(filaResumen(page, 'Puntos')).toHaveCount(0);
    await expect(seccionTemas(page)).toHaveCount(0);
  } finally {
    await login(page, 'profesor');
    await abrirOpcionesRevision(page, cmid);
    for (let i = casillas.length - 1; i >= 0; i--) await page.locator(`#id_${casillas[i]}`).setChecked(estadoInicial[i]);
    await guardarExamen(page);
  }
});
