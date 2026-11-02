// CA-2 y CA-3: el bloque anterior se fue de verdad, no solo de la vista del estudiante. El profesor es la prueba de que se
// fue el dato: para él locallib.php:1220 fuerza overallfeedback, así que un simple cambio de opción no se la ocultaría.
import { test, expect } from '@playwright/test';
import { abrirQuiz, filaResumen, login, prepararCaptura } from '../../../factory/regresion/helpers';
import {
  abrirFormularioExamen, cerrarIndiceCurso, crearExamen, eliminarExamen, idCursoQA101, nombreUnico,
} from '../../spec-0/pruebas/soporte';
import { abrirEdicion, estudianteDe, filasTemas, hacerIntento, OPCIONES_RETIRADAS, seccionTemas } from './soporte';

test('[CA-2] el profesor tampoco ve el bloque anterior en la revisión de un estudiante @requiere-feature', async ({ page, isMobile }) => {
  test.setTimeout(180_000);
  await login(page, estudianteDe(isMobile));
  const intento = await hacerIntento(page, '6');

  await login(page, 'profesor');
  await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');
  await expect(filaResumen(page, 'Retroalimentación')).toHaveCount(0);
  await expect(page.getByText('Retro global')).toHaveCount(0);
  await expect(filasTemas(page)).toHaveCount(3);
});

test('[CA-2] la página del examen ya no muestra el bloque anterior y conserva la nota @requiere-feature', async ({ page, isMobile }) => {
  test.setTimeout(180_000);
  await login(page, estudianteDe(isMobile));
  const intento = await hacerIntento(page, '6');

  await abrirQuiz(page);
  // Hay una tabla por intento y el más reciente va primero: el recién hecho es el primero.
  await expect(page.locator('li .card table').first()).toContainText('Finalizado');
  await expect(page.locator('li .card table thead th', { hasText: 'Retroalimentación' })).toHaveCount(0);
  await expect(page.getByText('Retro global')).toHaveCount(0);
  // La nota depende de los intentos previos del estudiante: se comprueba que sigue ahí, no su valor.
  await expect(page.locator('#feedback')).toContainText(/\d+,\d+\s*\/\s*10,00/);

  await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  await expect(seccionTemas(page)).toHaveCount(1);
});

test('[CA-3] el formulario del examen ya no ofrece nada de la retroalimentación global @requiere-feature', async ({ page, isMobile }) => {
  test.setTimeout(180_000);
  await login(page, 'profesor');
  await abrirFormularioExamen(page, await idCursoQA101(page));
  if (!isMobile) await cerrarIndiceCurso(page);

  for (const selector of OPCIONES_RETIRADAS) await expect(page.locator(selector)).toHaveCount(0);
  // La retroalimentación por pregunta y el resto de la revisión quedan fuera de alcance: siguen.
  await expect(page.locator('#id_marksimmediately')).toHaveCount(1);
  await expect(page.locator('#id_generalfeedbackimmediately')).toHaveCount(1);

  await expect(page).toHaveScreenshot('spec-3-formulario.png', { fullPage: true, mask: await prepararCaptura(page) });
});

test('[CA-3] un examen nuevo se guarda sin error con ese formulario y sigue sin esas opciones @requiere-feature', async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  const nombre = nombreUnico('Spec3', testInfo.project.name);
  await login(page, 'profesor');
  const curso = await idCursoQA101(page);

  let cmid = 0;
  try {
    cmid = await crearExamen(page, curso, nombre);
    await expect(page).toHaveTitle(new RegExp(nombre));

    await abrirEdicion(page, cmid);
    await expect(page.locator('#id_name')).toHaveValue(nombre);
    for (const selector of OPCIONES_RETIRADAS) await expect(page.locator(selector)).toHaveCount(0);
  } finally {
    if (cmid) await eliminarExamen(page, cmid);
  }
});

test('[CA-3] los ajustes del administrador ya no ofrecen la retroalimentación global @requiere-feature', async ({ page }) => {
  await login(page, 'admin');
  await page.goto('/admin/settings.php?section=modsettingquiz');
  await expect(page.locator("[id^='id_s_quiz_reviewmarks']").first()).toBeVisible();
  await expect(page.locator('#id_s_quiz_initialnumfeedbacks')).toHaveCount(0);
  await expect(page.locator("[id^='id_s_quiz_reviewoverallfeedback']")).toHaveCount(0);
});
