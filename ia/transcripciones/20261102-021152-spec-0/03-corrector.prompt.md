Sos el CORRECTOR de una fábrica de software sobre Moodle 5.3. La implementación de `salidas/spec-0/` no pasó la validación
(intento 3). Escribís SOLO dentro de `salidas/spec-0/`. Podés leer `entorno/.moodle-src/` y `factory/regresion/`.

# Qué falló (salida real del pipeline)
### escritorio · [CA-1] [CA-6] un profesor crea y configura un examen nuevo en el curso
Error: [2mexpect([22m[31mpage[39m[2m).[22mtoHaveScreenshot[2m([22m[32mexpected[39m[2m)[22m failed

  51826 pixels (ratio 0.03 of all image pixels) are different.

  Snapshot: spec-0-crear-examen.png

Call log:
[2m  - Expect "toHaveScreenshot(spec-0-crear-examen.png)" with timeout 5000ms[22m
[2m    - verifying given screenshot expectation[22m
[2m  - taking page screenshot[22m
[2m    - disabled all CSS animations[22m
[2m  - waiting for fonts to load...[22m
[2m  - fonts loaded[22m
[2m  - 51826 pixels (ratio 0.03 of all image pixels) are different.[22m
[2m  - waiting 100ms before taking screenshot[22m
[2m  - taking page screenshot[22m
[2m    - disabled all CSS animations[22m
[2m  - waiting for fonts to load...[22m
[2m  - fonts loaded[22m
[2m  - captured a stable screenshot[22m
[2m  - 51826 pixels (ratio 0.03 of all image pixels) are different.[22m


### escritorio · [CA-5] [CA-6] un profesor califica un ensayo y la nota del estudiante se actualiza
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator:  locator('iframe[id$="_-comment_id_ifr"]')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
[2m  - Expect "toBeVisible" locator('iframe[id$="_-comment_id_ifr"]') with timeout 5000ms[22m
[2m  - waiting for locator('iframe[id$="_-comment_id_ifr"]')[22m
[2m    - locator resolved to <iframe frameborder="0" allowtransparency="true" id="q22:6_-comment_id_ifr" class="tox-edit-area__iframe" srcdoc="<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /></head><body id="tinymce" class="mce-content-body " data-id="q22:6_-comment_id" aria-label="Comment. Rich text area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help."><br></body></html>"></iframe>[22m
[2m    - unexpected value "hidden"[22m


### movil · [CA-5] [CA-6] un profesor califica un ensayo y la nota del estudiante se actualiza
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: locator('iframe[id$="_-comment_id_ifr"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" locator('iframe[id$="_-comment_id_ifr"]') with timeout 5000ms[22m
[2m  - waiting for locator('iframe[id$="_-comment_id_ifr"]')[22m


## Estado de la página al fallar (ARIA)
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-0/pruebas/01-profesor-examen.spec.ts >> [CA-1] [CA-6] un profesor crea y configura un examen nuevo en el curso
- Location: salidas/spec-0/pruebas/01-profesor-examen.spec.ts:11:1

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  51826 pixels (ratio 0.03 of all image pixels) are different.

  Snapshot: spec-0-crear-examen.png

Call log:
  - Expect "toHaveScreenshot(spec-0-crear-examen.png)" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 51826 pixels (ratio 0.03 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 51826 pixels (ratio 0.03 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - status
  - generic [ref=f3e2]:
    - link "Skip to main content" [ref=f3e3] [cursor=pointer]:
      - /url: "#maincontent"
    - navigation "Site navigation" [ref=f3e4]:
      - generic [ref=f3e5]:
        - link "viaroqa" [ref=f3e6] [cursor=pointer]:
          - /url: http://localhost:8090/my/
        - menubar [ref=f3e9]:
          - menuitem "Dashboard" [ref=f3e10] [cursor=pointer]
          - text: 
        - generic [ref=f3e12]:
          - generic [ref=f3e15]:
            - switch "Edit mode" [ref=f3e16] [cursor=pointer]
            - generic [ref=f3e17] [cursor=pointer]: Edit mode
          - button "Show notification window with 1 new notifications" [ref=f3e27] [cursor=pointer]:
            - generic [aria-hidden] [ref=f3e28]: 
            - generic [aria-hidden] [ref=f3e29]: "1"
          - button "Toggle messaging drawer" [ref=f3e31] [cursor=pointer]:
            - generic [aria-hidden] [ref=f3e32]: 
          - button "User menu" [ref=f3e38] [cursor=pointer]:
            - img "Paula Profesora" [ref=f3e42]: PP
            - generic [aria-hidden] [ref=f3e43]: Paula
            - text: 
    - generic [ref=f3e44]:
      - generic [ref=f3e45]:
        - button "Open course index" [ref=f3e47] [cursor=pointer]
        - banner [ref=f3e51]:
          - heading "Curso QA de Exámenes" [level=1] [ref=f3e58]
        - navigation "Course menu" [ref=f3e61]:
          - menubar [ref=f3e62]:
            - menuitem "Course" [ref=f3e63] [cursor=pointer]
            - menuitem "Settings" [ref=f3e66] [cursor=pointer]
            - menuitem "Participants" [ref=f3e68] [cursor=pointer]
            - menuitem "Grades" [ref=f3e70] [cursor=pointer]
            - menuitem "Activities" [ref=f3e72] [cursor=pointer]
            - menuitem "More " [ref=f3e74] [cursor=pointer]:
              - generic [ref=f3e75]: More
              - text: 
        - main [ref=f3e79]:
          - heading "New Quiz" [level=2] [ref=f3e81]
          - generic [ref=f3e82]:
            - button "Expand all" [ref=f3e84] [cursor=pointer]
            - group "General" [ref=f3e86]:
              - generic [ref=f3e89]:
                - button "General" [expanded] [ref=f3e90] [cursor=pointer]:
                  - generic "Collapse" [ref=f3e91]:
                    - generic [aria-hidden] [ref=f3e92]: 
                  - text:  
                - heading [level=3] [aria-hidden] [ref=f3e94]: General
              - generic [ref=f3e95]:
                - generic [ref=f3e96]:
                  - generic [ref=f3e97]:
                    - generic [ref=f3e98]: Name
                    - generic [aria-hidden] [ref=f3e101]: 
                  - textbox "Name" [ref=f3e103]
                - generic [ref=f3e104]:
                  - generic [ref=f3e105]: Description
                  - application [ref=f3e110]:
                    - generic [ref=f3e111]:
                      - generic [ref=f3e112]:
                        - menubar [ref=f3e114]:
                          - menuitem "Edit" [ref=f3e115] [cursor=pointer]
                          - menuitem "View" [ref=f3e117] [cursor=pointer]
                          - menuitem "Insert" [ref=f3e119] [cursor=pointer]
                          - menuitem "Format" [ref=f3e121] [cursor=pointer]
                          - menuitem "Tools" [ref=f3e123] [cursor=pointer]
                          - menuitem "Table" [ref=f3e125] [cursor=pointer]
                          - menuitem "Help" [ref=f3e127] [cursor=pointer]
                        - group [ref=f3e129]:
                          - toolbar [ref=f3e130]:
                            - group "history" [ref=f3e131]:
                              - button "Undo" [disabled] [ref=f3e132]
                              - button "Redo" [disabled] [ref=f3e133]
                            - group "formatting" [ref=f3e134]:
                              - button "Bold" [ref=f3e135] [cursor=pointer]
                              - button "Italic" [ref=f3e136] [cursor=pointer]
                            - group "content" [ref=f3e137]:
                              - button "Image" [ref=f3e138] [cursor=pointer]
                              - button "Multimedia" [ref=f3e139] [cursor=pointer]
                              - button "Record audio" [ref=f3e140] [cursor=pointer]
                              - button "Record video" [ref=f3e141] [cursor=pointer]
                              - button "Insert H5P content" [ref=f3e142] [cursor=pointer]
                              - button "Link" [ref=f3e143] [cursor=pointer]
                              - button "Unlink" [ref=f3e144] [cursor=pointer]
                            - group "view" [ref=f3e145]:
                              - button "Fullscreen" [ref=f3e146] [cursor=pointer]
                            - group [ref=f3e147]:
   
---
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-0/pruebas/03-calificacion-manual.spec.ts >> [CA-5] [CA-6] un profesor califica un ensayo y la nota del estudiante se actualiza
- Location: salidas/spec-0/pruebas/03-calificacion-manual.spec.ts:14:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('iframe[id$="_-comment_id_ifr"]')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" locator('iframe[id$="_-comment_id_ifr"]') with timeout 5000ms
  - waiting for locator('iframe[id$="_-comment_id_ifr"]')
    - locator resolved to <iframe frameborder="0" allowtransparency="true" id="q22:6_-comment_id_ifr" class="tox-edit-area__iframe" srcdoc="<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /></head><body id="tinymce" class="mce-content-body " data-id="q22:6_-comment_id" aria-label="Comment. Rich text area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help."><br></body></html>"></iframe>
    - unexpected value "hidden"

```

```yaml
- status
- link "Skip to main content":
  - /url: "#maincontent"
- main:
  - table "Summary of attempt":
    - caption: Summary of attempt
    - rowgroup:
      - row "Estudiante Número 3 Estudiante Número 3":
        - rowheader "Estudiante Número 3":
          - link "Estudiante Número 3":
            - /url: http://localhost:8090/user/view.php?id=6&course=2
            - img "Estudiante Número 3": EN
        - cell "Estudiante Número 3":
          - link "Estudiante Número 3":
            - /url: http://localhost:8090/user/view.php?id=6&course=2
      - row "Quiz Examen de regresión":
        - rowheader "Quiz"
        - cell "Examen de regresión"
      - row "Question HIS-2 Ensayo":
        - rowheader "Question"
        - cell "HIS-2 Ensayo"
  - heading "Question 6" [level=3]
  - text: Complete Marked out of 1.00 Flag question v1 (latest)
  - heading "Question text" [level=4]
  - text: Please write a story about a frog.
  - heading "Answer text Question 6" [level=4]
  - textbox "Answer text Question 6"
  - heading "Comments" [level=4]
  - group:
    - text: Comment Mark
    - textbox "Mark"
    - text: out of 1.00
  - heading "Response history" [level=4]
  - table:
    - rowgroup:
      - row "Step Time Action State Marks":
        - columnheader "Step"
        - columnheader "Time"
        - columnheader "Action"
        - columnheader "State"
        - columnheader "Marks"
    - rowgroup:
      - row "1 2/11/26, 02:40:31 Started Not yet answered":
        - cell "1":
          - link "1":
            - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=22&slot=6&step=0
        - cell "2/11/26, 02:40:31"
        - cell "Started"
        - cell "Not yet answered"
        - cell
      - 'row "2 2/11/26, 02:40:34 Saved: Una rana saltó al estanque. Answer saved"':
        - cell "2":
          - link "2":
            - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=22&slot=6&step=1
        - cell "2/11/26, 02:40:34"
        - 'cell "Saved: Una rana saltó al estanque."'
        - cell "Answer saved"
        - cell
      - row "3 2/11/26, 02:40:37 Attempt finished Complete":
        - cell "3"
        - cell "2/11/26, 02:40:37"
        - cell "Attempt finished"
        - cell "Complete"
        - cell
  - group:
    - group:
      - button "Save"
      - button "Cancel"
```

# Test source

```ts
  1  | // Escenario "intento con ensayo enviado, el profesor lo califica y el estudiante ve la nota final actualizada".
  2  | // Se usa una nota fraccionaria (0.5) para distinguir un ensayo calificado de uno ignorado o redondeado.
  3  | // comment.php solo funciona como ventana emergente: al guardar recarga window.opener y se cierra.
  4  | import { test, expect } from '@playwright/test';
  5  | import {
  6  |   abrirQuiz, bloquePregunta, botonIntento, elegir, enviarIntento, escribirEnsayo, filaResumen, login, prepararCaptura,
  7  |   siguientePagina,
  8  | } from '../../../factory/regresion/helpers';
  9  | import { celdasTiempoHistorial, escribirEditor, idIntento } from './soporte';
  10 | 
  11 | const COMENTARIO = 'Comentario de regresión: respuesta parcial.';
  12 | const EDITOR_COMENTARIO = 'iframe[id$="_-comment_id_ifr"]';
  13 | 
  14 | test('[CA-5] [CA-6] un profesor califica un ensayo y la nota del estudiante se actualiza', async ({ page, isMobile }) => {
  15 |   test.setTimeout(180_000);
  16 |   const numero = isMobile ? 4 : 3;
  17 |   const estudiante = `estudiante${numero}`;
  18 | 
  19 |   await login(page, estudiante);
  20 |   await abrirQuiz(page);
  21 |   await botonIntento(page).click();
  22 |   await elegir(page, 1, 'One');
  23 |   await elegir(page, 2, 'True');
  24 |   await siguientePagina(page);
  25 |   await elegir(page, 3, 'One');
  26 |   await elegir(page, 4, 'True');
  27 |   await siguientePagina(page);
  28 |   await elegir(page, 5, 'True');
  29 |   await escribirEnsayo(page, 6, 'Una rana saltó al estanque.');
  30 |   await enviarIntento(page);
  31 |   const intento = idIntento(page);
  32 | 
  33 |   await expect(filaResumen(page, 'Status')).toHaveText('Finished');
  34 |   await expect(filaResumen(page, 'Grade')).toHaveText('Not yet graded');
  35 |   await expect(filaResumen(page, 'Marks')).toHaveCount(0);
  36 | 
  37 |   await login(page, 'profesor');
  38 |   const cmid = await abrirQuiz(page);
  39 |   await page.goto(`/mod/quiz/report.php?id=${cmid}&mode=overview`);
  40 |   // La tabla es table#attempts (attempts_report.php:338). La fila tiene que ser la de este intento y seguir sin calificar.
  41 |   const filaInforme = page.locator('table#attempts tbody tr', { hasText: `Estudiante Número ${numero}` });
  42 |   await expect(filaInforme).toBeVisible();
  43 |   await expect(filaInforme.getByRole('link',
---
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-0/pruebas/03-calificacion-manual.spec.ts >> [CA-5] [CA-6] un profesor califica un ensayo y la nota del estudiante se actualiza
- Location: salidas/spec-0/pruebas/03-calificacion-manual.spec.ts:14:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('iframe[id$="_-comment_id_ifr"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('iframe[id$="_-comment_id_ifr"]') with timeout 5000ms
  - waiting for locator('iframe[id$="_-comment_id_ifr"]')

```

```yaml
- status
- link "Skip to main content":
  - /url: "#maincontent"
- main:
  - table "Summary of attempt":
    - caption: Summary of attempt
    - rowgroup:
      - row "Estudiante Número 4 Estudiante Número 4":
        - rowheader "Estudiante Número 4":
          - link "Estudiante Número 4":
            - /url: http://localhost:8090/user/view.php?id=7&course=2
            - img "Estudiante Número 4": EN
        - cell "Estudiante Número 4":
          - link "Estudiante Número 4":
            - /url: http://localhost:8090/user/view.php?id=7&course=2
      - row "Quiz Examen de regresión":
        - rowheader "Quiz"
        - cell "Examen de regresión"
      - row "Question HIS-2 Ensayo":
        - rowheader "Question"
        - cell "HIS-2 Ensayo"
  - heading "Question 6" [level=3]
  - text: Complete Marked out of 1.00 Flag question v1 (latest)
  - heading "Question text" [level=4]
  - text: Please write a story about a frog.
  - heading "Answer text Question 6" [level=4]
  - textbox "Answer text Question 6"
  - heading "Comments" [level=4]
  - group:
    - text: Comment Mark
    - textbox "Mark"
    - text: out of 1.00
  - heading "Response history" [level=4]
  - table:
    - rowgroup:
      - row "Step Time Action State Marks":
        - columnheader "Step"
        - columnheader "Time"
        - columnheader "Action"
        - columnheader "State"
        - columnheader "Marks"
    - rowgroup:
      - row "1 2/11/26, 02:45:55 Started Not yet answered":
        - cell "1":
          - link "1":
            - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=24&slot=6&step=0
        - cell "2/11/26, 02:45:55"
        - cell "Started"
        - cell "Not yet answered"
        - cell
      - 'row "2 2/11/26, 02:45:59 Saved: Una rana saltó al estanque. Answer saved"':
        - cell "2":
          - link "2":
            - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=24&slot=6&step=1
        - cell "2/11/26, 02:45:59"
        - 'cell "Saved: Una rana saltó al estanque."'
        - cell "Answer saved"
        - cell
      - row "3 2/11/26, 02:46:05 Attempt finished Complete":
        - cell "3"
        - cell "2/11/26, 02:46:05"
        - cell "Attempt finished"
        - cell "Complete"
        - cell
  - group:
    - group:
      - button "Save"
      - button "Cancel"
```

# Test source

```ts
  1  | // Escenario "intento con ensayo enviado, el profesor lo califica y el estudiante ve la nota final actualizada".
  2  | // Se usa una nota fraccionaria (0.5) para distinguir un ensayo calificado de uno ignorado o redondeado.
  3  | // comment.php solo funciona como ventana emergente: al guardar recarga window.opener y se cierra.
  4  | import { test, expect } from '@playwright/test';
  5  | import {
  6  |   abrirQuiz, bloquePregunta, botonIntento, elegir, enviarIntento, escribirEnsayo, filaResumen, login, prepararCaptura,
  7  |   siguientePagina,
  8  | } from '../../../factory/regresion/helpers';
  9  | import { celdasTiempoHistorial, escribirEditor, idIntento } from './soporte';
  10 | 
  11 | const COMENTARIO = 'Comentario de regresión: respuesta parcial.';
  12 | const EDITOR_COMENTARIO = 'iframe[id$="_-comment_id_ifr"]';
  13 | 
  14 | test('[CA-5] [CA-6] un profesor califica un ensayo y la nota del estudiante se actualiza', async ({ page, isMobile }) => {
  15 |   test.setTimeout(180_000);
  16 |   const numero = isMobile ? 4 : 3;
  17 |   const estudiante = `estudiante${numero}`;
  18 | 
  19 |   await login(page, estudiante);
  20 |   await abrirQuiz(page);
  21 |   await botonIntento(page).click();
  22 |   await elegir(page, 1, 'One');
  23 |   await elegir(page, 2, 'True');
  24 |   await siguientePagina(page);
  25 |   await elegir(page, 3, 'One');
  26 |   await elegir(page, 4, 'True');
  27 |   await siguientePagina(page);
  28 |   await elegir(page, 5, 'True');
  29 |   await escribirEnsayo(page, 6, 'Una rana saltó al estanque.');
  30 |   await enviarIntento(page);
  31 |   const intento = idIntento(page);
  32 | 
  33 |   await expect(filaResumen(page, 'Status')).toHaveText('Finished');
  34 |   await expect(filaResumen(page, 'Grade')).toHaveText('Not yet graded');
  35 |   await expect(filaResumen(page, 'Marks')).toHaveCount(0);
  36 | 
  37 |   await login(page, 'profesor');
  38 |   const cmid = await abrirQuiz(page);
  39 |   await page.goto(`/mod/quiz/report.php?id=${cmid}&mode=overview`);
  40 |   // La tabla es table#attempts (attempts_report.php:338). La fila tiene que ser la de este intento y seguir sin calificar.
  41 |   const filaInforme = page.locator('table#attempts tbody tr', { hasText: `Estudiante Número ${numero}` });
  42 |   await expect(filaInforme).toBeVisible();
  43 |   await expect(filaInforme.getByRole('link', { name: 'Review attempt' })).toHaveAttribute('href', new RegExp(`review\\.php\\?attempt=${intento}$`));
  44 |   await expect(filaInforme).toContainText('Not yet graded');
  45 |   await page.goto(`/mod/quiz/report.php?id=${cmid}&mode=grading`);
  46 |   await expect(page.getByRole('cell', { name: /HIS-2 Ensayo/ })).toBeVisible();
  47 | 
  48 |   await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  49 |   const enlace = bloquePregunta(page, 6).getByRole('link', { 

# Plan vigente
```json
{
  "spec_id": "spec-0",
  "titulo": "Regresión del camino feliz del módulo de exámenes",
  "naturaleza": "solo-pruebas",
  "componente": null,
  "ruta_moodle": null,
  "capa_justificacion": "No se necesita plugin: el spec prohíbe modificar Moodle y pide proteger comportamiento nativo, así que la capa más específica son pruebas E2E de Playwright en salidas/spec-0/pruebas/. No hay punto de extensión; se verificó que existen las superficies que se van a ejercitar: creación por public/course/modedit.php:34 y :70 (add, course) con section obligatorio si no hay sectionid (:72-74); banco en public/question/banks.php:35 (courseid); composición en public/mod/quiz/edit.php:53; intento, resumen y revisión en public/mod/quiz/attempt.php:142, summary.php:99 y review.php:116; calificación manual en public/mod/quiz/comment.php:81-102 e informe public/mod/quiz/report/grading/report.php:78-92. Lógica de notas verificada: public/question/engine/questionusage.php:387-395 y public/question/behaviour/manualgraded/behaviour.php:112-116. Filas de la revisión: public/mod/quiz/classes/output/attempt_summary_information.php:305-329. Las pruebas son compatibles con el control de honestidad si cada test conserva sus expect en el cuerpo del test (factory/honestidad/analisis.mjs:59 no cuenta los que estén en funciones auxiliares). Con componente null, la mutación sin funcionalidad no aplica (factory/cli.mjs:99).",
  "bordes": [
    {
      "descripcion": "La restricción dice 'usa el examen sembrado', pero CA-1 y CA-2 piden crear un examen y agregarle preguntas.",
      "decision": "CA-1 y CA-2 crean y luego eliminan un examen propio llamado 'Spec0 <proyecto> <timestamp>', que no contiene el texto 'Examen de regresión'. CA-3, CA-4, CA-5 y las capturas de estudiante usan QUIZ-REG.",
      "criterio": "No se puede crear un examen ya sembrado. Cambiar QUIZ-REG afectaría a todos los specs y sus preguntas se bloquean en cuanto tiene intentos. El nombre evita que abrirQuiz, que filtra con hasText y first(), tome el examen equivocado.",
      "preguntaria": "¿La restricción de usar datos sembrados excluye a CA-1 y CA-2, o esperan otro mecanismo?"
    },
    {
      "descripcion": "El escenario 'responde completo sin ensayo' no se puede cumplir con otro examen, porque QUIZ-REG incluye un ensayo en la pregunta 6.",
      "decision": "El estudiante responde las preguntas 1 a 5 y deja el ensayo vacío.",
      "criterio": "Un ensayo vacío queda en estado gaveup, no needsgrading (behaviour.php:112-113), y get_total_mark solo devuelve null ante needsgrading (questionusage.php:390). La nota se calcula sin calificación manual y el ensayo vale 0.",
      "preguntaria": "¿'Sin ensayo' significa dejarlo en blanco o se necesita un examen sembrado sin ensayo?"
    },
    {
      "descripcion": "El spec no fija qué nota debe verse.",
      "decision": "Se comparan valores exactos. Sin ensayo se responde One, True, Two (incorrecta), True, True: Marks '4.00/6.00', Grade '6.67 out of 10.00 (66.67%)'. Con ensayo se responden las cinco bien y el profesor pone 0.5: Marks '5.50/6.00', Grade '9.17 out of 10.00 (91.67%)'. En ambos casos Feedback 'Retro global: aprobado.'.",
      "criterio": "Las 6 preguntas valen 1 y el examen vale 10 (seed.php; helpers de pregunta con defaultmark 1; grade_out_of.php:88-92). Una respuesta incorrecta y una nota fraccionaria detectan una nota fija, un ensayo ignorado o un reescalado roto. La opción de retroalimentación global está activa en todos los momentos (tests/generator/lib.php:62,70,78), así que el resultado no depende del tiempo transcurrido.",
      "preguntaria": "¿Alcanza con la nota del intento y view.php, o también debe verificarse en el libro de calificaciones?"
    },
    {
      "descripcion": "Hay 4 estudiantes para 2 proyectos, y el sembrado usa 'calificación más alta' con intentos ilimitados.",
      "decision": "Recorrido sin ensayo: estudiante1 en escritorio y estudiante2 en móvil. Recorrido con ensayo: estudiante3 en escritorio y estudiante4 en móvil. Se elige con el fixture isMobile, sin skip. Cada estudiante hace un solo intento por corrida.",
      "criterio": "Compartir estudiante entre proyectos permitiría que un intento anterior tape una nota no actualizada y haría que view.php dependiera del orden de ejecución. Las pruebas de ambos proyectos corren en secuencia y sin reintentos (playwright.config.ts:11-14).",
      "preguntaria": "Ninguna: es una decisión técnica para que el resultado sea fiable."
    },
    {
      "descripcion": "Con un intento por estudiante, CA-3 y CA-4 no pueden ser pruebas independientes sin compartir usuario entre recorridos.",
      "decision": "Se usa un único recorrido de estudiante titulado [CA-3] [CA-4] [CA-6]. Otro recorrido cubre [CA-5] [CA-6], y la captura del formulario va en la prueba [CA-1] [CA-6].",
      "criterio": "La trazabilidad acepta varios criterios en un título (factory/lib/trazabilidad.mjs:13). El costo es que una rotura en CA-3 impide evaluar CA-4 en esa corrida; se acepta para mantener el determinismo y el rango de estudiantes asignado.",
      "preguntaria": "¿Quieren ampliar el rango de estudiantes de spec-0 para separar esas pruebas?"
    },
    {
      "descripcion": "'Pantalla de cierre del intento' puede ser summary.php o review.php.",
      "decision": "Se capturan ambas: spec-0-resumen-envio (summary.php) y spec-0-cierre (review.php). Para capturar el resumen, la prueba vuelve con 'Return to attempt' y después usa enviarIntento.",
      "criterio": "helpers.ts llama 'cierre/revisión' a review.php y spec-3 la trata como la pantalla de nota y revisión, pero cubrir ambas elimina la ambigüedad.",
      "preguntaria": "¿Cuál de las dos pantallas es la que producto llama 'cierre'?"
    },
    {
      "descripcion": "CA-6 pide entre 5 y 8 pantallas, sin decir cuáles aparte de las obligatorias.",
      "decision": "Son 7 pantallas por 2 viewports, es decir 14 PNG: spec-0-crear-examen, spec-0-examen-estudiante, spec-0-intento, spec-0-resumen-envio, spec-0-cierre, spec-0-calificacion-manual y spec-0-cierre-calificado. Quedan afuera la página del curso, los informes overview y grading, el banco, la vista del profesor en view.php y edit.php.",
      "criterio": "Las pantallas excluidas muestran datos de otras pruebas (intentos de estudiante12 y de otros specs, contadores o residuos), que cambian entre la corrida del spec y la suite completa. spec-0-intento se captura en la página 1, sin editor TinyMCE y sin respuestas.",
      "preguntaria": "¿Hay alguna pantalla de profesor que deba estar en la línea base aunque requiera datos aislados?"
    },
    {
      "descripcion": "La calificación manual puede hacerse desde mode=grading o desde comment.php; el primero lista intentos de varios estudiantes y el segundo solo funciona como ventana emergente.",
      "decision": "La prueba verifica que overview muestra al estudiante y que mode=grading muestra 'HIS-2 Ensayo'. Luego abre review.php con el id del intento, usa 'Make comment or override mark' con page.waitForEvent('popup'), guarda comentario y nota 0.5, y espera el cierre del popup.",
      "criterio": "comment.php es la calificación manual real para un solo intento. Al guardar llama a window.opener.location.reload (comment.php:102 y weblib.php:331), por lo que un page.goto directo no tendría opener y dejaría la pantalla en un estado no representativo.",
      "preguntaria": "¿Debe cubrirse además la calificación masiva desde mode=grading?"
    },
    {
      "descripcion": "comment.php muestra al profesor el historial de respuestas con la columna Time, que prepararCaptura no enmascara.",
      "decision": "La captura spec-0-calificacion-manual agrega al arreglo de máscaras solo las celdas de la columna Time del historial, y se toma antes de guardar.",
      "criterio": "El historial es visible para profesores (locallib.php:1221) y la columna es Time (question/engine/renderer.php:444), mientras que la expresión de prepararCaptura no la cubre. La fábrica no puede editar helpers.ts desde este spec, y enmascarar la celda conserva el principio de tapar solo el valor dinámico.",
      "preguntaria": "Ninguna; se recomienda agregar 'time' a prepararCaptura en un cambio aparte."
    },
    {
      "descripcion": "CA-1 y CA-2 dejan datos en el curso y reset.php solo borra intentos.",
      "decision": "Al final, en try/finally, la prueba elimina el examen con la confirmación de /course/mod.php?delete=<cmid>&sesskey=<M.cfg.sesskey> y las preguntas con el borrado del banco. Verifica que el examen ya no esté en el curso y que las preguntas no se listen. Las preguntas van en una categoría distinta de Álgebra, Geometría e Historia.",
      "criterio": "implementador.md exige dejar la configuración como estaba y spec-3 usa esas categorías como temas. Si una prueba se corta, pueden quedar residuos; los nombres únicos y la exclusión del curso y del banco de la línea base evitan falsos fallos.",
      "preguntaria": "¿Aceptan agregar a reset.php la limpieza de datos con prefijo Spec0?"
    },
    {
      "descripcion": "Crear el examen desde el selector de actividades cambia mucho entre escritorio y móvil.",
      "decision": "El profesor entra directo a /course/modedit.php?add=quiz&course=<id>&section=0, en ambos viewports. Las preguntas se crean desde /question/banks.php?courseid=<id>, no con 'a new question' desde el examen.",
      "criterio": "El spec exige crear en el banco y luego agregar al examen. El formulario y su guardado son lo que se quiere proteger. El selector de actividades queda sin cubrir y se declara en la cobertura.",
      "preguntaria": "¿El selector de actividades es parte del camino feliz que quieren proteger?"
    },
    {
      "descripcion": "'Para cada rol' no enumera los roles.",
      "decision": "Se cubren profesor con edición y estudiante. Administrador queda afuera.",
      "criterio": "Son los únicos roles que aparecen en los criterios y CA-1 a CA-6 no asignan acción alguna al administrador.",
      "preguntaria": "¿Debe cubrirse algún otro rol, por ejemplo profesor sin permiso de edición?"
    },
    {
      "descripcion": "'Cada mes, antes y después de cada cambio' sugiere una ejecución programada que este spec no pide construir.",
      "decision": "Se entrega la suite ejecutable con 'node factory/cli.mjs suite' y no se agrega programación.",
      "criterio": "El spec es solo-pruebas y las pruebas de salidas/*/pruebas ya entran en testMatch (playwright.config.ts:9), así que corren con cada spec posterior.",
      "preguntaria": "¿Quién dispara la corrida mensual y dónde?"
    },
    {
      "descripcion": "Sin línea base aprobada ni plugin, la primera corrida no demuestra que las pruebas detecten una rotura.",
      "decision": "Las 14 imágenes quedan pendientes de aprobación humana en el PR. La comparación de la regresión completa solo demuestra estabilidad, no que la imagen sea correcta. La detección funcional se apoya en valores exactos.",
      "criterio": "Con componente null, cli.mjs:99 no ejecuta la mutación y --update-snapshots=missing escribe y pasa cuando falta la imagen (node_modules/playwright/lib/matchers/expect.js:12485-12487).",
      "preguntaria": "¿Quieren una mutación deliberada puntual para demostrar la detección antes de aprobar?"
    },
    {
      "descripcion": "Los helpers solo tienen prueba de humo en escritorio y con el ensayo respondido.",
      "decision": "Se usan igual en móvil. Si enviarIntento falla con el ensayo vacío o en móvil, se resuelve con una variante en salidas/spec-0/pruebas/soporte.ts, sin debilitar aserciones. Los recorridos con varias capturas pueden usar test.setTimeout(180_000).",
      "criterio": "humo-helpers.spec.ts:7 omite móvil y helpers.ts no puede editarse desde este spec. Los recorridos con varios inicios de sesión y networkidle pueden superar el límite global de 90 segundos.",
      "preguntaria": "Ninguna: se resuelve con el resultado real de la primera corrida."
    },
    {
      "descripcion": "El spec manda declarar lo que queda fuera de alcance en el reporte de cobertura, pero la IA solo puede escribir en salidas/spec-0/.",
      "decision": "Se escribe salidas/spec-0/cobertura.md con cada exclusión y su plan. Pasarlo al cobertura.md raíz queda como tarea humana.",
      "criterio": "implementador.md limita la escritura a spec_dir y cobertura.md raíz no existe aún como archivo de la fábrica.",
      "preguntaria": "¿El reporte final debe consolidarse en el cobertura.md raíz antes de aprobar el PR?"
    }
  ],
  "criterios": [
    {
      "id": "CA-1",
      "texto": "Un profesor puede crear y configurar un examen nuevo en el curso.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-1] [CA-6] En 01-profesor-examen.spec.ts, profesor abre /course/modedit.php?add=quiz&course=<id>&section=0, captura spec-0-crear-examen antes de completar, crea 'Spec0 <proyecto> <timestamp>' con Attempts allowed 2 y Grading method First attempt, guarda y verifica en view.php el nombre, 'Attempts allowed: 2' y 'Grading method: First attempt'. Reabre con update=<cmid> y verifica que los valores persisten. Limpia el examen y verifica que ya no aparece en el curso."
      ]
    },
    {
      "id": "CA-2",
      "texto": "Un profesor puede crear preguntas en el banco (opción múltiple, verdadero o falso y ensayo) y agregarlas a un examen.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-2] En 01-profesor-examen.spec.ts, profesor crea un examen propio, crea desde el banco de QA101 una pregunta de cada tipo con nombre único y las agrega con Add > from question bank > Add selected questions to the quiz, cambiando de banco si hace falta. Verifica en /mod/quiz/edit.php?cmid=<cmid> que hay exactamente 3 preguntas con esos nombres y que el total de puntos es 3.00. Elimina examen y preguntas y verifica su ausencia."
      ]
    },
    {
      "id": "CA-3",
      "texto": "Un estudiante puede iniciar un intento, responder, navegar entre preguntas (hacia adelante y hacia atrás) y enviarlo.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-3] [CA-4] [CA-6] En 02-estudiante-sin-ensayo.spec.ts, con estudiante1 en escritorio y estudiante2 en móvil: captura spec-0-examen-estudiante e inicia el intento; captura spec-0-intento en la página 1; responde 1 y 2; avanza y responde 3 y 4; retrocede con Previous page y verifica toBeChecked en las respuestas 1 y 2; avanza de nuevo hasta la página 3, verifica toBeChecked en 3 y 4 al pasar por la página 2, y responde 5. Verifica en summary.php cinco respuestas guardadas y el ensayo sin responder, captura spec-0-resumen-envio, vuelve con Return to attempt y envía."
      ]
    },
    {
      "id": "CA-4",
      "texto": "Al enviar, las preguntas automáticas se califican solas y el estudiante ve su resultado.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-3] [CA-4] [CA-6] Mismo recorrido, escenario sin ensayo: tras enviar, en review.php verifica con filaResumen Status 'Finished', Marks '4.00/6.00', Grade '6.67 out of 10.00 (66.67%)' y Feedback 'Retro global: aprobado.'. Captura spec-0-cierre y verifica que view.php muestra el intento con nota 6.67."
      ]
    },
    {
      "id": "CA-5",
      "texto": "Un profesor puede ver los intentos y calificar manualmente una pregunta de ensayo; la nota del estudiante se actualiza.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-5] [CA-6] En 03-calificacion-manual.spec.ts, con estudiante3 en escritorio y estudiante4 en móvil: responde bien las preguntas 1 a 5, escribe el ensayo, envía y guarda el id del intento. Verifica Grade 'Not yet graded' y toHaveCount(0) en la fila Marks. Como profesor, verifica la fila de 'Estudiante Número N' en mode=overview y 'HIS-2 Ensayo' en mode=grading. Abre review.php del intento y luego el popup de calificación; captura spec-0-calificacion-manual enmascarando también la columna Time; guarda un comentario fijo y nota 0.5. Como estudiante, en review.php verifica Marks '5.50/6.00', Grade '9.17 out of 10.00 (91.67%)', Feedback 'Retro global: aprobado.' y el comentario. Captura spec-0-cierre-calificado y verifica que view.php muestra 9.17."
      ]
    },
    {
      "id": "CA-6",
      "texto": "Las pantallas principales del recorrido se ven como en la línea base aprobada, en escritorio y en celular. Entre 5 y 8 pantallas completas; obligatorias: la pantalla del intento del estudiante y la pantalla de cierre del intento.",
      "verificacion": "visual",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-1] [CA-6], [CA-3] [CA-4] [CA-6] y [CA-5] [CA-6]: las 7 pantallas se comparan con toHaveScreenshot('spec-0-<pantalla>.png', { fullPage: true, mask }) en ambos proyectos, usando prepararCaptura y sin tolerancias por prueba: spec-0-crear-examen, spec-0-examen-estudiante, spec-0-intento, spec-0-resumen-envio, spec-0-cierre, spec-0-calificacion-manual y spec-0-cierre-calificado."
      ]
    },
    {
      "id": "PROC-1",
      "texto": "Lo que queda fuera de alcance se declara en el reporte de cobertura con su plan.",
      "verificacion": "proceso",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "Evidencia en salidas/spec-0/cobertura.md: una entrada con plan para preguntas aleatorias, opciones de revisión, límite de tiempo y auto envío, overrides de notas, reportes avanzados y restricciones de acceso, más los huecos decididos en este plan: selector de actividades, calificación masiva por mode=grading, informes sin línea base y rol administrador."
      ]
    }
  ],
  "pantallas_afectadas": [],
  "sondas": [],
  "elimina": []
}
```

# Spec
---
id: spec-0
titulo: Regresión del camino feliz del módulo de exámenes
naturaleza: solo-pruebas
---

# Spec 0 · Regresión del camino feliz del módulo de exámenes

## Intención
Cada mes, antes y después de cada cambio, tiene que poder comprobarse automáticamente que el uso básico del módulo
de exámenes sigue funcionando y se ve bien, para cada rol, en escritorio y en celular. Este spec no cambia el
comportamiento de Moodle: produce la regresión que protege todo lo demás.

## Criterios de aceptación
- CA-1: un profesor puede crear y configurar un examen nuevo en el curso.
- CA-2: un profesor puede crear preguntas en el banco (opción múltiple, verdadero o falso y ensayo) y agregarlas a un examen.
- CA-3: un estudiante puede iniciar un intento, responder, navegar entre preguntas (hacia adelante y hacia atrás) y enviarlo.
- CA-4: al enviar, las preguntas automáticas se califican solas y el estudiante ve su resultado.
- CA-5: un profesor puede ver los intentos y calificar manualmente una pregunta de ensayo; la nota del estudiante se actualiza.
- CA-6: las pantallas principales del recorrido se ven como en la línea base aprobada, en escritorio y en celular.
  Entre 5 y 8 pantallas completas; obligatorias: la pantalla del intento del estudiante y la pantalla de cierre del intento.

## Escenarios
- Dado el examen sembrado, cuando un estudiante lo responde completo sin ensayo y lo envía, entonces ve su nota calculada.
- Dado un intento con ensayo enviado, cuando el profesor lo califica manualmente, entonces el estudiante ve la nota final actualizada.

## Fuera de alcance
Preguntas aleatorias, opciones de revisión, límite de tiempo y auto envío, overrides de notas, reportes avanzados,
restricciones de acceso. (Se declaran en el reporte de cobertura con su plan.)

## Restricciones
No modifica código de Moodle ni plugins: solo pruebas. Usa el examen y los usuarios sembrados.


# Cómo corregir
1. Diagnosticá la CAUSA antes de editar: ¿es el código del plugin o es la prueba? Leé el estado ARIA de la página al fallar.
2. Si el plugin no hace lo que el criterio pide, arreglá el PLUGIN. Nunca "arregles" una prueba para que acepte un comportamiento
   que no cumple el criterio: debilitar, borrar o saltar asserts está prohibido y el control de honestidad lo bloquea.
3. Si la prueba usa un selector o un flujo equivocado (verificá contra el estado ARIA real), corregí la prueba manteniendo
   la misma intensidad de verificación.
4. Mismas reglas de pruebas que en la implementación (títulos `[CA-n]`, `@requiere-feature`, `@camino-error`, sin mocks de red,
   sin skip/only/soft, helpers de `factory/regresion/helpers.ts`).

Respondé con: causa raíz encontrada, qué cambiaste y por qué.
