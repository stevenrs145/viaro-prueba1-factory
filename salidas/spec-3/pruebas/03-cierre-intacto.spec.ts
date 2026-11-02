// CA-4: el resto de la pantalla de cierre sigue igual. Sin @requiere-feature: debe pasar con y sin el plugin.
// La regresión visual de estas pantallas la dan spec-0-cierre y spec-0-cierre-calificado, con líneas base propuestas.
import { test, expect } from '@playwright/test';
import { bloquePregunta, filaResumen, login } from '../../../factory/regresion/helpers';
import { opcion } from '../../spec-0/pruebas/soporte';
import { estudianteDe, hacerIntento } from './soporte';

test('[CA-4] la nota, la revisión de respuestas y la navegación siguen funcionando', async ({ page, isMobile }) => {
  test.setTimeout(180_000);
  await login(page, estudianteDe(isMobile));
  await hacerIntento(page, '4'); // incorrecta a propósito: una nota fija no daría 4,00/6,00

  await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');
  await expect(filaResumen(page, 'Puntos')).toHaveText('4,00/6,00');
  await expect(filaResumen(page, 'Calificación')).toHaveText('6,67 de 10,00 (66,67%)');

  await expect(page.locator('.que')).toHaveCount(6);
  await expect(opcion(page, 3, '4')).toBeChecked();
  // La retroalimentación por pregunta está fuera de alcance: se queda como está.
  await expect(bloquePregunta(page, 5)).toContainText('El Acta de Independencia se firmó el 15 de septiembre de 1821.');

  // El bloque de navegación puede estar en un cajón cerrado: se comprueban los enlaces, no su visibilidad.
  await expect(page.locator('a.qnbutton')).toHaveCount(6);
  await expect(page.locator('a.qnbutton').last()).toHaveAttribute('href', /#question-\d+-6$/);

  // "Finalizar revisión": con teclado, porque en móvil el clic por coordenadas puede caer en elementos fijos de la página.
  // El enlace aparece también dentro del bloque de navegación (aria-hidden, tabindex -1): se usa el de la página.
  await page.getByRole('link', { name: 'Finalizar revisión' }).press('Enter');
  await expect(page).toHaveURL(/mod\/quiz\/view\.php\?id=\d+/);
});
