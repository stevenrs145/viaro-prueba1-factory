// Soporte de las pruebas de spec-3. Reutiliza factory/regresion/helpers.ts y el soporte aprobado de spec-0; acá solo está lo
// propio de este spec. Las aserciones que deciden si un criterio se cumple están en los .spec.ts.
import { expect, type Locator, type Page } from '@playwright/test';
import {
  abrirQuiz, botonIntento, elegir, enviarIntento, escribirEnsayo, esperarJS, siguientePagina,
} from '../../../factory/regresion/helpers';
import { cerrarIndiceCurso, ESPERA_EDITOR, idIntento } from '../../spec-0/pruebas/soporte';

/** Rango asignado a spec-3. Cada prueba hace su propio intento: QUIZ-REG admite intentos ilimitados. */
export const estudianteDe = (isMobile: boolean) => (isMobile ? 'estudiante10' : 'estudiante9');

export const seccionTemas = (page: Page): Locator => page.locator('#local-resumentema');
export const filasTemas = (page: Page): Locator => seccionTemas(page).locator('tbody tr');
export const celdasTema = (page: Page, posicion: number): Locator => filasTemas(page).nth(posicion).locator('td');

/** Selectores de lo que retira el plugin. Van por id: los campos ocultos que exige el core usan el nombre feedbacktext. */
export const OPCIONES_RETIRADAS = [
  '#id_overallfeedbackhdr',
  '#id_boundary_add_fields',
  '#id_overallfeedbackduring',
  '#id_overallfeedbackimmediately',
  '#id_overallfeedbackopen',
  '#id_overallfeedbackclosed',
];

/**
 * Hace un intento completo en QUIZ-REG y queda en la pantalla de cierre. Las preguntas 1, 2, 4 y 5 se responden bien; la 3
 * con `pregunta3` ('6' es correcta) y el ensayo solo si se indica: vacío pasa a gaveup y vale 0. Devuelve el id del intento.
 */
export async function hacerIntento(page: Page, pregunta3: string, ensayo?: string): Promise<number> {
  await abrirQuiz(page);
  await botonIntento(page).click();
  await expect(page).toHaveURL(/mod\/quiz\/attempt\.php/);
  await elegir(page, 1, '12');
  await elegir(page, 2, 'Verdadero');
  await siguientePagina(page);
  await elegir(page, 3, pregunta3);
  await elegir(page, 4, 'Verdadero');
  await siguientePagina(page);
  await elegir(page, 5, 'Verdadero');
  if (ensayo) await escribirEnsayo(page, 6, ensayo);
  await enviarIntento(page);
  return idIntento(page);
}

export async function abrirEdicion(page: Page, cmid: number) {
  await page.goto(`/course/modedit.php?update=${cmid}&return=1`);
  // QUIZ-REG guarda su descripción en formato automático, que TinyMCE no soporta: Moodle la muestra en un textarea plano.
  // Un examen creado con el formulario usa HTML y sí lleva TinyMCE. Cualquiera de los dos marca que el formulario cargó.
  const editor = page.locator('#id_introeditor_ifr').or(page.locator('textarea#id_introeditor'));
  await expect(editor).toBeVisible({ timeout: ESPERA_EDITOR });
  await esperarJS(page);
  // En móvil el cajón del índice del curso (preferencia que sobrevive entre corridas) cubre el formulario y deja los botones
  // de guardar fuera del viewport; se cierra igual que en spec-0.
  await cerrarIndiceCurso(page);
}

/**
 * Guarda el formulario de edición del examen con "Guardar cambios y mostrar". En móvil, con las secciones desplegadas y la
 * barra pegajosa del formulario, Playwright da el botón por "fuera del viewport" aunque lo desplaza a la vista (visible,
 * habilitado y estable, y aun así el click se reintenta hasta agotar el tiempo). El click se despacha sobre el propio botón:
 * activa el envío igual que un click real, y lo que se verifica es el resultado (la URL de view.php), no la geometría.
 */
export async function guardarEdicion(page: Page): Promise<void> {
  await page.locator('#id_submitbutton').dispatchEvent('click');
  await expect(page).toHaveURL(/mod\/quiz\/view\.php\?id=\d+/);
}

/** Abre la edición con todas las secciones desplegadas, para poder usar las casillas de Opciones de revisión. */
export async function abrirOpcionesRevision(page: Page, cmid: number) {
  await abrirEdicion(page, cmid);
  await page.locator('a.collapseexpand').click();
  await expect(page.locator('#id_marksimmediately')).toBeVisible();
}
