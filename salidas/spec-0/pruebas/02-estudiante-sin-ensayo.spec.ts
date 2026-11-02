// Escenario "lo responde completo sin ensayo y ve su nota calculada". QUIZ-REG incluye un ensayo (pregunta 6), que queda
// vacío: pasa a gaveup y vale 0, así que la nota no espera calificación manual.
// La pregunta 3 se responde mal a propósito: una nota fija o un reescalado roto no darían 4.00/6.00.
// CA-3 y CA-4 comparten recorrido porque cada estudiante hace un solo intento por corrida (ver plan).
import { test, expect } from '@playwright/test';
import {
  abrirQuiz, botonIntento, elegir, enviarIntento, filaResumen, paginaAnterior, siguientePagina,
} from '../../../factory/regresion/helpers';
import { estadoEnResumen, irAlResumen, iniciarSesion as login, opcion, prepararCapturaLenta as prepararCaptura } from './soporte';

test('[CA-3] [CA-4] [CA-6] un estudiante responde, navega, envía y ve su nota calculada', async ({ page, isMobile }) => {
  test.setTimeout(180_000);
  await login(page, isMobile ? 'estudiante2' : 'estudiante1');
  await abrirQuiz(page);
  await expect(page).toHaveScreenshot('spec-0-examen-estudiante.png', { fullPage: true, mask: await prepararCaptura(page) });

  await botonIntento(page).click();
  await expect(page).toHaveURL(/mod\/quiz\/attempt\.php/);
  await expect(opcion(page, 1, 'One')).not.toBeChecked();
  await expect(page).toHaveScreenshot('spec-0-intento.png', { fullPage: true, mask: await prepararCaptura(page) });

  await elegir(page, 1, 'One');
  await elegir(page, 2, 'True');
  await siguientePagina(page);
  await elegir(page, 3, 'Two');
  await elegir(page, 4, 'True');

  // Hacia atrás: las respuestas de la página 1 siguen guardadas.
  await paginaAnterior(page);
  await expect(opcion(page, 1, 'One')).toBeChecked();
  await expect(opcion(page, 2, 'True')).toBeChecked();

  // Hacia adelante: también las de la página 2.
  await siguientePagina(page);
  await expect(opcion(page, 3, 'Two')).toBeChecked();
  await expect(opcion(page, 4, 'True')).toBeChecked();

  await siguientePagina(page);
  await elegir(page, 5, 'True');

  await irAlResumen(page);
  for (const pregunta of [1, 2, 3, 4, 5]) await expect(estadoEnResumen(page, pregunta)).toHaveText('Answer saved');
  await expect(estadoEnResumen(page, 6)).toHaveText('Not yet answered');
  await expect(page).toHaveScreenshot('spec-0-resumen-envio.png', { fullPage: true, mask: await prepararCaptura(page) });

  await page.getByRole('button', { name: 'Return to attempt' }).click();
  await expect(page).toHaveURL(/mod\/quiz\/attempt\.php/);
  await enviarIntento(page);

  await expect(filaResumen(page, 'Status')).toHaveText('Finished');
  await expect(filaResumen(page, 'Marks')).toHaveText('4.00/6.00');
  await expect(filaResumen(page, 'Grade')).toHaveText('6.67 out of 10.00 (66.67%)');
  await expect(filaResumen(page, 'Feedback')).toHaveText('Retro global: aprobado.');
  await expect(page).toHaveScreenshot('spec-0-cierre.png', { fullPage: true, mask: await prepararCaptura(page) });

  await abrirQuiz(page);
  await expect(filaResumen(page, 'Grade')).toHaveText('6.67 out of 10.00 (66.67%)');
  await expect(page.locator('#feedback')).toContainText('6.67 / 10.00');
});
