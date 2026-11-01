// CA-1, CA-2 y la captura del formulario de CA-6. Estas pruebas crean su propio examen porque no se puede "crear" uno
// ya sembrado, y lo borran al terminar. QUIZ-REG no se toca: sus preguntas se bloquean en cuanto tiene intentos.
import { test, expect } from '@playwright/test';
import { login, prepararCaptura } from '../../../factory/regresion/helpers';
import {
  abrirFormularioExamen, agregarDesdeBanco, cmidBanco, crearCategoria, crearExamen, crearPregunta, eliminarCategoria,
  eliminarExamen, eliminarPreguntas, filaCategoria, guardarExamen, idCursoQA101, nombreUnico, urlCategorias,
  type Categoria, type TipoPregunta,
} from './soporte';

test('[CA-1] [CA-6] un profesor crea y configura un examen nuevo en el curso', async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  const nombre = nombreUnico('Spec0', testInfo.project.name);
  await login(page, 'profesor');
  const curso = await idCursoQA101(page);

  let cmid = 0;
  try {
    await abrirFormularioExamen(page, curso);
    await expect(page.locator('#id_name')).toHaveValue('');
    await expect(page).toHaveScreenshot('spec-0-crear-examen.png', { fullPage: true, mask: await prepararCaptura(page) });

    await page.locator('#id_name').fill(nombre);
    await page.locator('a.collapseexpand').click();
    await page.locator('#id_attempts').selectOption('2');
    await page.locator('#id_grademethod').selectOption({ label: 'First attempt' });
    cmid = await guardarExamen(page);

    await expect(page).toHaveTitle(new RegExp(nombre));
    await expect(page.locator('.quizinfo')).toContainText('Attempts allowed: 2');
    await expect(page.locator('.quizinfo')).toContainText('Grading method: First attempt');

    // La configuración se conserva al volver a abrir el formulario.
    await page.goto(`/course/modedit.php?update=${cmid}&return=1`);
    await expect(page.locator('#id_name')).toHaveValue(nombre);
    await expect(page.locator('#id_attempts')).toHaveValue('2');
    await expect(page.locator('#id_grademethod option:checked')).toHaveText('First attempt');
  } finally {
    if (cmid) await eliminarExamen(page, cmid);
  }

  await page.goto('/course/view.php?name=QA101');
  await expect(page.locator('a.aalink', { hasText: nombre })).toHaveCount(0);
});

test('[CA-2] un profesor crea preguntas en el banco y las agrega a un examen', async ({ page }, testInfo) => {
  test.setTimeout(240_000);
  const proyecto = testInfo.project.name;
  const nombreExamen = nombreUnico('Spec0', proyecto);
  const nombreCategoria = nombreUnico('Spec0 categoria', proyecto);
  const preguntas: { tipo: TipoPregunta; nombre: string }[] = [
    { tipo: 'multichoice', nombre: nombreUnico('Spec0 opcion multiple', proyecto) },
    { tipo: 'truefalse', nombre: nombreUnico('Spec0 verdadero falso', proyecto) },
    { tipo: 'essay', nombre: nombreUnico('Spec0 ensayo', proyecto) },
  ];
  await login(page, 'profesor');
  const curso = await idCursoQA101(page);
  const banco = await cmidBanco(page, curso);

  let cmid = 0;
  let categoria: Categoria | null = null;
  try {
    categoria = await crearCategoria(page, banco, nombreCategoria);
    for (const { tipo, nombre } of preguntas) await crearPregunta(page, banco, categoria, tipo, nombre);

    cmid = await crearExamen(page, curso, nombreExamen);
    await agregarDesdeBanco(page, cmid, banco, nombreCategoria, preguntas.map((p) => p.nombre));

    await expect(page.locator('li.slot')).toHaveCount(3);
    for (const { nombre } of preguntas) await expect(page.locator('li.slot', { hasText: nombre })).toHaveCount(1);
    await expect(page.locator('.mod_quiz_summarks')).toHaveText('3.00');
  } finally {
    // Primero el examen: mientras lo use, el banco solo ocultaría las preguntas y la categoría no quedaría vacía.
    if (cmid) await eliminarExamen(page, cmid);
    if (categoria) {
      await eliminarPreguntas(page, banco, categoria);
      await eliminarCategoria(page, banco, categoria);
    }
  }

  await page.goto('/course/view.php?name=QA101');
  await expect(page.locator('a.aalink', { hasText: nombreExamen })).toHaveCount(0);
  await page.goto(urlCategorias(banco));
  await expect(filaCategoria(page, 'Álgebra')).toHaveCount(1);
  await expect(filaCategoria(page, nombreCategoria)).toHaveCount(0);
});
