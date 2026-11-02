// Escenario "lo responde completo sin ensayo y ve su nota calculada". QUIZ-REG incluye un ensayo (pregunta 6), que queda
// vacío: pasa a gaveup y vale 0, así que la nota no espera calificación manual.
// La pregunta 3 se responde mal a propósito: una nota fija o un reescalado roto no darían 4.00/6.00.
// CA-3 y CA-4 comparten recorrido porque cada estudiante hace un solo intento por corrida (ver plan).
import { test, expect } from '@playwright/test';
import {
  abrirQuiz, botonIntento, elegir, enviarIntento, filaResumen, login, paginaAnterior, prepararCaptura, siguientePagina,
} from '../../../factory/regresion/helpers';
import { filaEnResumen, irAlResumen, opcion } from './soporte';

test('[CA-3] [CA-4] [CA-6] un estudiante responde, navega, envía y ve su nota calculada', async ({ page, isMobile }) => {
  test.setTimeout(180_000);
  await login(page, isMobile ? 'estudiante2' : 'estudiante1');
  await abrirQuiz(page);
  await expect(page).toHaveScreenshot('spec-0-examen-estudiante.png', { fullPage: true, mask: await prepararCaptura(page) });

  await botonIntento(page).click();
  await expect(page).toHaveURL(/mod\/quiz\/attempt\.php/);
  await expect(opcion(page, 1, '12')).not.toBeChecked();
  await expect(page).toHaveScreenshot('spec-0-intento.png', { fullPage: true, mask: await prepararCaptura(page) });

  // Contenido sembrado en español (entorno/seed/identidad.php): la primera opción es la correcta.
  await elegir(page, 1, '12');
  await elegir(page, 2, 'Verdadero');
  await siguientePagina(page);
  await elegir(page, 3, '4'); // incorrecta a propósito: la correcta es "6"
  await elegir(page, 4, 'Verdadero');

  // Hacia atrás: las respuestas de la página 1 siguen guardadas.
  await paginaAnterior(page);
  await expect(opcion(page, 1, '12')).toBeChecked();
  await expect(opcion(page, 2, 'Verdadero')).toBeChecked();

  // Hacia adelante: también las de la página 2.
  await siguientePagina(page);
  await expect(opcion(page, 3, '4')).toBeChecked();
  await expect(opcion(page, 4, 'Verdadero')).toBeChecked();

  await siguientePagina(page);
  await elegir(page, 5, 'Verdadero');

  await irAlResumen(page);
  for (const pregunta of [1, 2, 3, 4, 5]) await expect(filaEnResumen(page, pregunta)).toHaveClass(/\banswersaved\b/);
  await expect(filaEnResumen(page, 6)).toHaveClass(/\bnotyetanswered\b/);
  await expect(page).toHaveScreenshot('spec-0-resumen-envio.png', { fullPage: true, mask: await prepararCaptura(page) });

  // "Volver al intento" es el primer botón de la página (renderer.php:842-848).
  await page.locator('div.submitbtns').first().getByRole('button').click();
  await expect(page).toHaveURL(/mod\/quiz\/attempt\.php/);
  await enviarIntento(page);

  await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');
  await expect(filaResumen(page, 'Puntos')).toHaveText('4,00/6,00');
  await expect(filaResumen(page, 'Calificación')).toHaveText('6,67 de 10,00 (66,67%)');
  await expect(filaResumen(page, 'Retroalimentación')).toHaveText('Retro global: aprobado.');
  await expect(page).toHaveScreenshot('spec-0-cierre.png', { fullPage: true, mask: await prepararCaptura(page) });

  await abrirQuiz(page);
  await expect(page.locator('li .card table')).toContainText('6,67');
  await expect(page.locator('#feedback')).toContainText(/6,67\s*\/\s*10,00/);
});
