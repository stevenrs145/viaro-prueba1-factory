# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-3/pruebas/01-resumen-por-tema.spec.ts >> [CA-1] [CA-2] al terminar ve su desempeño por los tres temas y no el bloque anterior @requiere-feature
- Location: salidas/spec-3/pruebas/01-resumen-por-tema.spec.ts:9:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#local-resumentema').getByRole('heading', { name: 'Resumen por tema' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('#local-resumentema').getByRole('heading', { name: 'Resumen por tema' }) with timeout 5000ms
  - waiting for locator('#local-resumentema').getByRole('heading', { name: 'Resumen por tema' })

```

```yaml
- status
- link "Salta al contenido principal":
  - /url: "#maincontent"
- navigation "Navegación del sitio":
  - button "Panel lateral"
  - button "Mostrar la ventana de notificaciones cuando no hay ninguna"
  - button "Mostrar/ocultar cajón de mensajería"
  - button "Menú de usuario":
    - img "Estudiante Número 10": EN
    - text: 
- button "Abrir índice del curso"
- button "Abrir cajón de bloques"
- banner:
  - navigation "Camino de migas":
    - list:
      - listitem:
        - link "QA101":
          - /url: http://localhost:8090/course/view.php?id=2
      - listitem:
        - text: /
        - link "General":
          - /url: http://localhost:8090/course/section.php?id=1
      - listitem: / Examen de regresión
  - heading "Examen de regresión" [level=1]
- alert:
  - text: Intento enviado.
  - button "Descartar esta notificación"
- main:
  - table "Resumen de intento 1":
    - caption: Resumen de intento 1
    - rowgroup:
      - row "Estado Finalizado":
        - rowheader "Estado"
        - cell "Finalizado"
      - row "Comenzado lunes, 2 de noviembre de 2026, 20:45":
        - rowheader "Comenzado"
        - cell "lunes, 2 de noviembre de 2026, 20:45"
      - row "Completado lunes, 2 de noviembre de 2026, 20:45":
        - rowheader "Completado"
        - cell "lunes, 2 de noviembre de 2026, 20:45"
      - row "Duración 7 segundos":
        - rowheader "Duración"
        - cell "7 segundos"
      - row "Puntos 4,00/6,00":
        - rowheader "Puntos"
        - cell "4,00/6,00"
      - row "Calificación 6,67 de 10,00 (66,67%)":
        - rowheader "Calificación"
        - cell "6,67 de 10,00 (66,67%)"
      - 'row "Retroalimentación Retro global: aprobado."':
        - rowheader "Retroalimentación"
        - 'cell "Retro global: aprobado."'
  - heading "Pregunta 1" [level=3]
  - text: Correcta Se puntúa 1,00 sobre 1,00
  - button "Marcadas": Marcar pregunta
  - heading "Enunciado de la pregunta" [level=4]
  - paragraph: ¿Cuánto es 3 × 4?
  - group "Pregunta 1 Respuesta":
    - text: Pregunta 1 Respuesta
    - radio "1. 12" [checked] [disabled]
    - text: 1. 12
    - img "Correcta": 
    - text: 12 es el resultado de sumar cuatro veces el 3.
    - radio "2. 7" [disabled]
    - text: 2. 7
    - radio "3. 9" [disabled]
    - text: 3. 9
    - radio "4. 10" [disabled]
    - text: 4. 10
  - heading "Retroalimentación" [level=4]
  - text: Respuesta correcta.
  - paragraph: 3 × 4 = 12.
  - text: "La respuesta correcta es: 12"
  - heading "Pregunta 2" [level=3]
  - text: Correcta Se puntúa 1,00 sobre 1,00
  - button "Marcadas": Marcar pregunta
  - heading "Enunciado de la pregunta" [level=4]
  - paragraph: La suma de dos números pares siempre es par.
  - group "Pregunta 2 Respuesta":
    - text: Pregunta 2 Respuesta
    - radio "Verdadero" [checked] [disabled]
    - text: Verdadero
    - img "Correcta": 
    - radio "Falso" [disabled]
    - text: Falso
  - heading "Retroalimentación" [level=4]
  - text: Correcto.
  - paragraph: Dos pares suman siempre un múltiplo de 2.
  - text: La respuesta correcta es 'Verdadero'
  - heading "Pregunta 3" [level=3]
  - text: Incorrecta Se puntúa 0,00 sobre 1,00
  - button "Marcadas": Marcar pregunta
  - heading "Enunciado de la pregunta" [level=4]
  - paragraph: ¿Cuántos lados tiene un hexágono?
  - group "Pregunta 3 Respuesta":
    - text: Pregunta 3 Respuesta
    - radio "1. 6" [disabled]
    - text: 1. 6
    - radio "2. 4" [checked] [disabled]
    - text: 2. 4
    - img "Incorrecta": 
    - text: Cuatro lados tiene un cuadrilátero.
    - radio "3. 5" [disabled]
    - text: 3. 5
    - radio "4. 8" [disabled]
    - text: 4. 8
  - heading "Retroalimentación" [level=4]
  - text: Respuesta incorrecta.
  - paragraph: Un hexágono tiene seis lados.
  - text: "La respuesta correcta es: 6"
  - heading "Pregunta 4" [level=3]
  - text: Correcta Se puntúa 1,00 sobre 1,00
  - button "Marcadas": Marcar pregunta
  - heading "Enunciado de la pregunta" [level=4]
  - paragraph: Todo cuadrado es también un rectángulo.
  - group "Pregunta 4 Respuesta":
    - text: Pregunta 4 Respuesta
    - radio "Verdadero" [checked] [disabled]
    - text: Verdadero
    - img "Correcta": 
    - radio "Falso" [disabled]
    - text: Falso
  - heading "Retroalimentación" [level=4]
  - text: Correcto.
  - paragraph: Un cuadrado tiene cuatro ángulos rectos.
  - text: La respuesta correcta es 'Verdadero'
  - heading "Pregunta 5" [level=3]
  - text: Correcta Se puntúa 1,00 sobre 1,00
  - button "Marcadas": Marcar pregunta
  - heading "Enunciado de la pregunta" [level=4]
  - paragraph: Guatemala declaró su independencia en 1821.
  - group "Pregunta 5 Respuesta":
    - text: Pregunta 5 Respuesta
    - radio "Verdadero" [checked] [disabled]
    - text: Verdadero
    - img "Correcta": 
    - radio "Falso" [disabled]
    - text: Falso
  - heading "Retroalimentación" [level=4]
  - text: Correcto.
  - paragraph: El Acta de Independencia se firmó el 15 de septiembre de 1821.
  - text: La respuesta correcta es 'Verdadero'
  - heading "Pregunta 6" [level=3]
  - text: Sin contestar Se puntúa como 0 sobre 1,00
  - button "Marcadas": Marcar pregunta
  - heading "Enunciado de la pregunta" [level=4]
  - paragraph: Explica en un párrafo una consecuencia de la independencia de Centroamérica.
  - heading "Texto de la respuesta Pregunta 6" [level=4]
  - textbox "Texto de la respuesta Pregunta 6"
  - heading "Retroalimentación" [level=4]
  - paragraph: Una buena respuesta nombra la consecuencia y explica por qué ocurrió.
  - link "Finalizar revisión":
    - /url: http://localhost:8090/mod/quiz/view.php?id=2
- contentinfo:
  - link "Contactar con el soporte del sitio":
    - /url: http://localhost:8090/user/contactsitesupport.php
  - text: Usted se ha identificado como
  - link "Estudiante Número 10":
    - /url: http://localhost:8090/user/profile.php?id=13
  - text: (
  - link "Cerrar sesión":
    - /url: http://localhost:8090/login/logout.php?sesskey=Q4L1mRTzVm
  - text: )
  - link "Resumen de retención de datos":
    - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
  - link "Cambiar al tema estándar":
    - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fmod%2Fquiz%2Freview.php%3Fattempt%3D540%26amp%3Bcmid%3D2&device=default&sesskey=Q4L1mRTzVm
  - text: Desarrollado por
  - link "Moodle":
    - /url: https://moodle.com
```

# Test source

```ts
  1  | // CA-1 y CA-2: lo que ve el estudiante al terminar. QUIZ-REG es el "examen ya existente con retroalimentación general
  2  | // configurada" del spec: su retro se sembró antes de instalar el plugin y la desinstalación la restaura, así que estas
  3  | // pruebas fallan sin el plugin. Las aserciones van contra el intento recién creado: cada prueba hace el suyo.
  4  | import { test, expect } from '@playwright/test';
  5  | import { abrirQuiz, bloquePregunta, filaResumen, login, prepararCaptura } from '../../../factory/regresion/helpers';
  6  | import { ESPERA_EDITOR } from '../../spec-0/pruebas/soporte';
  7  | import { abrirOpcionesRevision, celdasTema, estudianteDe, filasTemas, guardarEdicion, hacerIntento, seccionTemas } from './soporte';
  8  | 
  9  | test('[CA-1] [CA-2] al terminar ve su desempeño por los tres temas y no el bloque anterior @requiere-feature', async ({ page, isMobile }) => {
  10 |   test.setTimeout(180_000);
  11 |   await login(page, estudianteDe(isMobile));
  12 |   await hacerIntento(page, '4'); // la correcta es '6'; el ensayo queda vacío (gaveup vale 0 y no es pendiente)
  13 | 
> 14 |   await expect(seccionTemas(page).getByRole('heading', { name: 'Resumen por tema' })).toBeVisible();
     |                                                                                       ^ Error: expect(locator).toBeVisible() failed
  15 |   await expect(seccionTemas(page).locator('thead th')).toHaveText(['Tema', 'Puntos', 'Porcentaje']);
  16 |   await expect(filasTemas(page)).toHaveCount(3);
  17 |   await expect(celdasTema(page, 0)).toHaveText(['Álgebra', '2,00/2,00', '100,00%']);
  18 |   await expect(celdasTema(page, 1)).toHaveText(['Geometría', '1,00/2,00', '50,00%']);
  19 |   await expect(celdasTema(page, 2)).toHaveText(['Historia', '1,00/2,00', '50,00%']);
  20 | 
  21 |   await expect(filaResumen(page, 'Retroalimentación')).toHaveCount(0);
  22 |   await expect(page.getByText('Retro global')).toHaveCount(0);
  23 | 
  24 |   // Ocupa el lugar del bloque anterior: justo debajo de la tabla resumen y antes de las preguntas.
  25 |   await expect(page.locator('div:has(> table.quizreviewsummary) + #local-resumentema')).toHaveCount(1);
  26 |   await expect(page.locator('#local-resumentema ~ .que, #local-resumentema ~ * .que')).toHaveCount(6);
  27 | 
  28 |   await expect(page).toHaveScreenshot('spec-3-cierre-por-tema.png', { fullPage: true, mask: await prepararCaptura(page) });
  29 | });
  30 | 
  31 | test('[CA-1] un ensayo pendiente se avisa por tema y al calificarlo el resumen se actualiza @requiere-feature', async ({ page, isMobile }) => {
  32 |   test.setTimeout(180_000);
  33 |   const estudiante = estudianteDe(isMobile);
  34 |   await login(page, estudiante);
  35 |   const intento = await hacerIntento(page, '6', 'Una rana saltó al estanque.');
  36 | 
  37 |   await expect(celdasTema(page, 2)).toHaveText(['Historia', '1,00/2,00', '1 pregunta sin calificar']);
  38 |   await expect(page).toHaveScreenshot('spec-3-cierre-pendiente.png', { fullPage: true, mask: await prepararCaptura(page) });
  39 | 
  40 |   await login(page, 'profesor');
  41 |   await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  42 |   // comment.php solo funciona como ventana emergente: al guardar recarga la ventana de origen y se cierra.
  43 |   const [popup] = await Promise.all([page.waitForEvent('popup'), bloquePregunta(page, 6).locator('.commentlink a').click()]);
  44 |   await expect(popup.locator('iframe[id$="_-comment_id_ifr"]')).toBeVisible({ timeout: ESPERA_EDITOR });
  45 |   await popup.locator('input[name$="_-mark"]').fill('0.5');
  46 |   const cierre = popup.waitForEvent('close');
  47 |   await popup.locator('#id_submitbutton').click();
  48 |   await cierre;
  49 |   await expect(celdasTema(page, 2)).toHaveText(['Historia', '1,50/2,00', '75,00%']);
  50 | 
  51 |   await login(page, estudiante);
  52 |   await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  53 |   await expect(celdasTema(page, 2)).toHaveText(['Historia', '1,50/2,00', '75,00%']);
  54 |   await expect(seccionTemas(page)).not.toContainText('sin calificar');
  55 | });
  56 | 
  57 | test('[CA-1] la sección aparece una sola vez con showall y no en las páginas siguientes @requiere-feature', async ({ page, isMobile }) => {
  58 |   test.setTimeout(180_000);
  59 |   await login(page, estudianteDe(isMobile));
  60 |   const intento = await hacerIntento(page, '6');
  61 | 
  62 |   await page.goto(`/mod/quiz/review.php?attempt=${intento}&showall=1`);
  63 |   await expect(seccionTemas(page)).toHaveCount(1);
  64 | 
  65 |   await page.goto(`/mod/quiz/review.php?attempt=${intento}&page=1&showall=0`);
  66 |   await expect(page.locator('.que')).toHaveCount(2);
  67 |   await expect(seccionTemas(page)).toHaveCount(0);
  68 | });
  69 | 
  70 | test('[CA-1] si el profesor oculta las notas la sección no las filtra', async ({ page, isMobile }) => {
  71 |   test.setTimeout(300_000);
  72 |   // Primero "marks": depende de "maxmarks" y queda deshabilitada cuando esta se desmarca. Al restaurar, el orden inverso.
  73 |   const casillas = ['marksimmediately', 'maxmarksimmediately', 'marksopen', 'maxmarksopen'];
  74 |   await login(page, 'profesor');
  75 |   const cmid = await abrirQuiz(page);
  76 |   await abrirOpcionesRevision(page, cmid);
  77 |   const estadoInicial = await Promise.all(casillas.map((c) => page.locator(`#id_${c}`).isChecked()));
  78 | 
  79 |   try {
  80 |     for (const casilla of casillas) await page.locator(`#id_${casilla}`).setChecked(false);
  81 |     await guardarEdicion(page);
  82 | 
  83 |     await login(page, estudianteDe(isMobile));
  84 |     await hacerIntento(page, '6');
  85 |     await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');
  86 |     await expect(filaResumen(page, 'Puntos')).toHaveCount(0);
  87 |     await expect(seccionTemas(page)).toHaveCount(0);
  88 |   } finally {
  89 |     await login(page, 'profesor');
  90 |     await abrirOpcionesRevision(page, cmid);
  91 |     for (let i = casillas.length - 1; i >= 0; i--) await page.locator(`#id_${casillas[i]}`).setChecked(estadoInicial[i]);
  92 |     await guardarEdicion(page);
  93 |   }
  94 | });
  95 | 
```