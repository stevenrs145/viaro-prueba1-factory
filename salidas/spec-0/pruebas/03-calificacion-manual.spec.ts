// Escenario "intento con ensayo enviado, el profesor lo califica y el estudiante ve la nota final actualizada".
// Se usa una nota fraccionaria (0.5) para distinguir un ensayo calificado de uno ignorado o redondeado.
// comment.php solo funciona como ventana emergente: al guardar recarga window.opener y se cierra.
import { test, expect } from '@playwright/test';
import {
  abrirQuiz, bloquePregunta, botonIntento, elegir, enviarIntento, escribirEnsayo, filaResumen, login, prepararCaptura, siguientePagina,
} from '../../../factory/regresion/helpers';
import { ESPERA_EDITOR, escribirEditor, idIntento } from './soporte';

const COMENTARIO = 'Comentario de regresión: respuesta parcial.';
const EDITOR_COMENTARIO = 'iframe[id$="_-comment_id_ifr"]';

test('[CA-5] [CA-6] un profesor califica un ensayo y la nota del estudiante se actualiza', async ({ page, isMobile }) => {
  test.setTimeout(180_000);
  const numero = isMobile ? 4 : 3;
  const estudiante = `estudiante${numero}`;

  await login(page, estudiante);
  await abrirQuiz(page);
  await botonIntento(page).click();
  // Contenido sembrado en español (entorno/seed/identidad.php): las cinco respuestas correctas.
  await elegir(page, 1, '12');
  await elegir(page, 2, 'Verdadero');
  await siguientePagina(page);
  await elegir(page, 3, '6');
  await elegir(page, 4, 'Verdadero');
  await siguientePagina(page);
  await elegir(page, 5, 'Verdadero');
  await escribirEnsayo(page, 6, 'Una rana saltó al estanque.');
  await enviarIntento(page);
  const intento = idIntento(page);

  await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');
  await expect(filaResumen(page, 'Calificación')).toHaveText('Sin calificar aún');
  await expect(filaResumen(page, 'Puntos')).toHaveCount(0);

  await login(page, 'profesor');
  const cmid = await abrirQuiz(page);
  await page.goto(`/mod/quiz/report.php?id=${cmid}&mode=overview`);
  // La tabla es table#attempts (attempts_report.php:338). La fila tiene que ser la de este intento y seguir sin calificar.
  const filaInforme = page.locator('table#attempts tbody tr', { hasText: `Estudiante Número ${numero}` });
  await expect(filaInforme).toBeVisible();
  await expect(filaInforme.locator('a.reviewlink[href*="review.php?attempt="]')).toHaveAttribute('href', new RegExp(`review\\.php\\?attempt=${intento}(&|$)`));
  await expect(filaInforme).toContainText('Sin calificar aún');
  await page.goto(`/mod/quiz/report.php?id=${cmid}&mode=grading`);
  await expect(page.getByRole('cell', { name: /HIS-2 Ensayo/ })).toBeVisible();

  await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  // "Hacer un comentario o sobrescribir la calificación": div.commentlink (rendererbase.php:199), sin depender del idioma.
  const enlace = bloquePregunta(page, 6).locator('.commentlink a');
  const [popup] = await Promise.all([page.waitForEvent('popup'), enlace.click()]);
  await expect(popup).toHaveURL(/mod\/quiz\/comment\.php/);
  await expect(popup.locator(EDITOR_COMENTARIO)).toBeVisible({ timeout: ESPERA_EDITOR });
  // prepararCaptura ya tapa la columna de tiempo del historial (encabezado "Tiempo"/"Hora") además de fechas y contadores.
  await expect(popup).toHaveScreenshot('spec-0-calificacion-manual.png', { fullPage: true, mask: await prepararCaptura(popup) });

  await escribirEditor(popup, EDITOR_COMENTARIO, COMENTARIO);
  await popup.locator('input[name$="_-mark"]').fill('0.5');
  const cierre = popup.waitForEvent('close');
  await popup.locator('#id_submitbutton').click();
  await cierre;

  // La ventana de origen se recarga sola con la nota guardada.
  await expect(filaResumen(page, 'Puntos')).toHaveText('5,50/6,00');

  await login(page, estudiante);
  await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  await expect(filaResumen(page, 'Puntos')).toHaveText('5,50/6,00');
  await expect(filaResumen(page, 'Calificación')).toHaveText('9,17 de 10,00 (91,67%)');
  await expect(filaResumen(page, 'Retroalimentación')).toHaveText('Retro global: aprobado.');
  await expect(bloquePregunta(page, 6)).toContainText(COMENTARIO);
  await expect(page).toHaveScreenshot('spec-0-cierre-calificado.png', { fullPage: true, mask: await prepararCaptura(page) });

  await abrirQuiz(page);
  await expect(page.locator('li .card table')).toContainText('9,17');
  await expect(page.locator('#feedback')).toContainText(/9,17\s*\/\s*10,00/);
});
