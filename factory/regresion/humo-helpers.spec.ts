// Prueba de la infraestructura de pruebas: si un helper se rompe (p. ej. cambia un selector de Moodle),
// esto falla primero y con un mensaje claro, antes que cualquier prueba de spec.
import { test, expect } from '@playwright/test';
import { login, abrirQuiz, botonIntento, elegir, escribirEnsayo, siguientePagina, enviarIntento, filaResumen } from './helpers';

test.describe('[HUMO] helpers de prueba', () => {
  test.skip(({ isMobile }) => isMobile, 'La infraestructura se valida una vez, en escritorio');

  test('[HUMO] estudiante completa el examen con ensayo y el profesor lo ve pendiente de calificar', async ({ page }) => {
    await login(page, 'estudiante12');
    await abrirQuiz(page);
    await botonIntento(page).click();
    await elegir(page, 1, '12');
    await elegir(page, 2, 'Verdadero');
    await siguientePagina(page);
    await elegir(page, 3, '6');
    await elegir(page, 4, 'Verdadero');
    await siguientePagina(page);
    await elegir(page, 5, 'Verdadero');
    await escribirEnsayo(page, 6, 'Una rana saltó al estanque.');
    await enviarIntento(page);
    await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');
    // Hecho verificado en 5.3: con un ensayo respondido la nota queda pendiente y no hay fila "Puntos" ni "Retroalimentación".
    await expect(filaResumen(page, 'Calificación')).toHaveText('Sin calificar aún');

    await login(page, 'profesor');
    const cmid = await abrirQuiz(page);
    await page.goto(`/mod/quiz/report.php?id=${cmid}&mode=grading`);
    await expect(page.getByRole('cell', { name: /HIS-2 Ensayo/ })).toBeVisible();
  });
});
