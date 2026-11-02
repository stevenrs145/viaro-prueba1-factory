Sos el CORRECTOR de una fábrica de software sobre Moodle 5.3. La implementación de `salidas/spec-0/` no pasó la validación
(intento 1). Escribís SOLO dentro de `salidas/spec-0/`. Podés leer `entorno/.moodle-src/` y `factory/regresion/`.

# Qué falló (salida real del pipeline)
### escritorio · [CA-1] [CA-6] un profesor crea y configura un examen nuevo en el curso
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
[2m  - navigating to "http://localhost:8090/login/index.php", waiting until "load"[22m


### escritorio · [CA-2] un profesor crea preguntas en el banco y las agrega a un examen
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
[2m  - waiting for locator('#id_questiontext_ifr').contentFrame().locator('body')[22m
[2m    - locator resolved to <body id="tinymce" contenteditable="true" class="mce-content-body " data-id="id_questiontext" aria-label="Question text. Rich text area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help.">…</body>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div tabindex="0" aria-label="Loading…" class="tox-throbber__busy-spinner">…</div> from <div aria-busy="true" class="tox-throbber">…</div> subtree intercepts pointer events[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - <div tabindex="0" aria-label="Loading…" class="tox-throbber__busy-spinner">…</div> from <div aria-busy="true" class="tox-throbber">…</div> subtree intercepts pointer events[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    17 × waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - <div tabindex="0" aria-label="Loading…" class="tox-throbber__busy-spinner">…</div> from <div aria-busy="true" class="tox-throbber">…</div> subtree intercepts pointer events[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m


## Estado de la página al fallar (ARIA)
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-0/pruebas/01-profesor-examen.spec.ts >> [CA-2] un profesor crea preguntas en el banco y las agrega a un examen
- Location: salidas/spec-0/pruebas/01-profesor-examen.spec.ts:47:1

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#id_questiontext_ifr').contentFrame().locator('body')
    - locator resolved to <body id="tinymce" contenteditable="true" class="mce-content-body " data-id="id_questiontext" aria-label="Question text. Rich text area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help.">…</body>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div tabindex="0" aria-label="Loading…" class="tox-throbber__busy-spinner">…</div> from <div aria-busy="true" class="tox-throbber">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div tabindex="0" aria-label="Loading…" class="tox-throbber__busy-spinner">…</div> from <div aria-busy="true" class="tox-throbber">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    17 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div tabindex="0" aria-label="Loading…" class="tox-throbber__busy-spinner">…</div> from <div aria-busy="true" class="tox-throbber">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=f27e1]:
  - status
  - generic [ref=f27e2]:
    - link "Skip to main content" [ref=f27e3] [cursor=pointer]:
      - /url: "#maincontent"
    - navigation "Site navigation" [ref=f27e4]:
      - generic [ref=f27e5]:
        - link "viaroqa" [ref=f27e6] [cursor=pointer]:
          - /url: http://localhost:8090/my/
        - menubar [ref=f27e9]:
          - menuitem "Dashboard" [ref=f27e10] [cursor=pointer]
          - text: 
        - generic [ref=f27e12]:
          - generic [ref=f27e15]:
            - switch "Edit mode" [ref=f27e16] [cursor=pointer]
            - generic [ref=f27e17] [cursor=pointer]: Edit mode
          - button "Show notification window with no new notifications" [ref=f27e27] [cursor=pointer]:
            - generic [aria-hidden] [ref=f27e28]: 
          - button "Toggle messaging drawer" [ref=f27e30] [cursor=pointer]:
            - generic [aria-hidden] [ref=f27e31]: 
          - button "User menu" [ref=f27e37] [cursor=pointer]:
            - img "Paula Profesora" [ref=f27e41]: PP
            - generic [aria-hidden] [ref=f27e42]: Paula
            - text: 
    - generic [ref=f27e43]:
      - generic [ref=f27e44]:
        - button "Open course index" [ref=f27e46] [cursor=pointer]
        - banner [ref=f27e50]:
          - generic [ref=f27e51]:
            - navigation "Breadcrumb" [ref=f27e54]:
              - list [ref=f27e55]:
                - listitem [ref=f27e56]:
                  - link "QA101" [ref=f27e57] [cursor=pointer]:
                    - /url: http://localhost:8090/course/view.php?id=2
                - listitem [ref=f27e58]:
                  - text: /
                  - generic [ref=f27e59]: System shared question bank
            - heading "System shared question bank" [level=1] [ref=f27e68]
        - navigation "Activity menu" [ref=f27e71]:
          - menubar [ref=f27e72]:
            - menuitem "Question bank" [ref=f27e73] [cursor=pointer]
            - menuitem "Settings" [ref=f27e75] [cursor=pointer]
            - menuitem "More " [ref=f27e77] [cursor=pointer]:
              - generic [ref=f27e78]: More
              - text: 
        - main [ref=f27e83]:
          - navigation [ref=f27e87]:
            - generic [ref=f27e88]:
              - generic [ref=f27e89]: Question bank tertiary navigation
              - combobox "Question bank tertiary navigation" [ref=f27e90] [cursor=pointer]:
                - heading "Categories" [level=2] [ref=f27e91]
                - text: 
              - text: 
          - heading [level=2] [ref=f27e94]:
            - text: Edit categories
            - button "Help" [ref=f27e95] [cursor=pointer]:
              - img "Help with Edit categories" [ref=f27e96]: 
          - generic [ref=f27e97]:
            - button "Add category" [ref=f27e99] [cursor=pointer]
            - generic [ref=f27e101]:
              - checkbox "Show descriptions" [ref=f27e102]
              - generic [ref=f27e103]: Show descriptions
          - generic [ref=f27e104]:
            - 'heading "Question categories for ''Question bank: System shared question bank''" [level=3] [ref=f27e105]'
            - list [ref=f27e107]:
              - listitem [ref=f27e108]:
                - generic [ref=f27e110]:
                  - generic [ref=f27e111]: 
                  - generic [ref=f27e115]:
                    - button "Collapse Álgebra" [expanded] [ref=f27e116] [cursor=pointer]:
                      - generic "Collapse" [ref=f27e117]:
                        - generic [aria-hidden] [ref=f27e118]: 
                      - text:  
                    - strong [ref=f27e121]:
                      - generic [ref=f27e122]:
                        - button "Álgebra (2)" [ref=f27e123] [cursor=pointer]
                        - link [ref=f27e124] [cursor=pointer]:
                          - /url: "#"
                          - img "Edit category name" [ref=f27e126]: 
                      - ge
---
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-0/pruebas/01-profesor-examen.spec.ts >> [CA-1] [CA-6] un profesor crea y configura un examen nuevo en el curso
- Location: salidas/spec-0/pruebas/01-profesor-examen.spec.ts:11:1

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "http://localhost:8090/login/index.php", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - status
  - generic [ref=e2]:
    - link "Skip to main content" [ref=e3] [cursor=pointer]:
      - /url: "#maincontent"
    - generic [ref=e5]:
      - complementary [ref=e6]:
        - generic [ref=e7]:
          - heading "Welcome to Moodle" [level=1] [ref=e8]
          - generic [ref=e9]: Your learning journey starts here. Access courses, connect with peers, and achieve your goals.
          - paragraph [ref=e10]: You're part of a global learning community
          - generic [ref=e11]:
            - generic [ref=e12]:
              - strong [ref=e13]: 500M
              - generic [ref=e14]: users
            - generic [ref=e15]:
              - strong [ref=e16]: 150K
              - generic [ref=e17]: sites
            - generic [ref=e18]:
              - strong [ref=e19]: 200+
              - generic [ref=e20]: countries
        - text: AI-generated image
      - main [ref=e24]:
        - generic [ref=e26]:
          - heading "Welcome back" [level=1] [ref=e27]
          - paragraph [ref=e28]: Log in to Viaro QA
          - generic [ref=e29]:
            - generic [ref=e30]:
              - generic [ref=e31]: Username or email
              - generic [ref=e32]:
                - generic:
                  - generic [aria-hidden]: 
                - textbox "Username or email" [ref=e33]:
                  - /placeholder: Enter your username or email
            - generic [ref=e34]:
              - generic [ref=e35]: Password
              - generic [ref=e36]:
                - generic:
                  - generic [aria-hidden]: 
                - textbox "Password" [ref=e37]:
                  - /placeholder: Enter your password
            - link "Forgot password?" [ref=e39] [cursor=pointer]:
              - /url: http://localhost:8090/login/forgot_password.php
            - button "Log in" [ref=e41] [cursor=pointer]
          - button "Cookies notice" [ref=e43] [cursor=pointer]
    - contentinfo:
      - button "Show footer" [ref=e44] [cursor=pointer]:
        - generic [aria-hidden] [ref=e45]: "?"
```

# Test source

```ts
  1   | // Helpers compartidos por TODAS las pruebas (regresión y las generadas por la fábrica).
  2   | // Selectores verificados contra Moodle 5.3 en la instancia (ver ia/bitacora.md). La IA de la fábrica
  3   | // debe usar estos helpers en vez de reinventar selectores.
  4   | import { expect, type Locator, type Page } from '@playwright/test';
  5   | 
  6   | export const CLAVE = 'Viaro.2026';
  7   | export const QUIZ_REG = 'Examen de regresión';
  8   | export const RECEPTOR = process.env.RECEPTOR_URL || 'http://localhost:8091';
  9   | 
  10  | export async function login(page: Page, usuario: string) {
  11  |   await page.context().clearCookies();
> 12  |   await page.goto('/login/index.php');
      |              ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  13  |   await page.fill('#username', usuario);
  14  |   await page.fill('#password', CLAVE);
  15  |   await page.click('#loginbtn');
  16  |   await expect(page.locator('#loginbtn')).toHaveCount(0);
  17  | }
  18  | 
  19  | /** Abre la página de un quiz del curso QA101 por su nombre visible. Devuelve el cmid. */
  20  | export async function abrirQuiz(page: Page, nombre = QUIZ_REG): Promise<number> {
  21  |   await page.goto('/course/view.php?name=QA101');
  22  |   await page.locator('a.aalink', { hasText: nombre }).first().click();
  23  |   await expect(page).toHaveURL(/mod\/quiz\/view\.php\?id=\d+/);
  24  |   return Number(new URL(page.url()).searchParams.get('id'));
  25  | }
  26  | 
  27  | /** Botón principal de la página del quiz (Attempt quiz / Continue your attempt / Re-attempt quiz). */
  28  | export function botonIntento(page: Page): Locator {
  29  |   return page.getByRole('button', { name: /attempt quiz|continue your attempt|re-attempt quiz/i });
  30  | }
  31  | 
  32  | /** Responde una pregunta de opción múltiple o V/F por el texto de la opción, dentro del bloque de la pregunta N (1-based, número visible). */
  33  | export async function elegir(page: Page, pregunta: number, opcion: string) {
  34  |   const q = bloquePregunta(page, pregunta);
  35  |   // Opción múltiple: el nombre accesible incluye la numeración ("1. One"); V/F no ("True").
  36  |   const esc = opcion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  37  |   await q.getByRole('radio', { name: new RegExp(`^([a-z0-9]+\\. )?${esc}$`, 'i') }).check();
  38  | }
  39  | 
  40  | /** Escribe en una pregunta de ensayo. Con TinyMCE el iframe es "<id del textarea>_ifr" (p. ej. q2:6_answer_id_ifr). */
  41  | export async function escribirEnsayo(page: Page, pregunta: number, texto: string) {
  42  |   const q = bloquePregunta(page, pregunta);
  43  |   const iframe = q.locator('iframe[id$="_answer_id_ifr"]');
  44  |   await expect(iframe.or(q.locator('textarea[name$="_answer"]:visible'))).toBeVisible();
  45  |   if (await iframe.count()) {
  46  |     const cuerpo = q.frameLocator('iframe[id$="_answer_id_ifr"]').locator('body');
  47  |     await cuerpo.click();
  48  |     await cuerpo.fill(texto);
  49  |   } else {
  50  |     await q.locator('textarea[name$="_answer"]').fill(texto);
  51  |   }
  52  | }
  53  | 
  54  | export function bloquePregunta(page: Page, numero: number): Locator {
  55  |   return page.locator('.que').filter({ has: page.locator('.qno', { hasText: new RegExp(`^${numero}$`) }) });
 

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
