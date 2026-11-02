# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-3/pruebas/01-resumen-por-tema.spec.ts >> [CA-1] la sección aparece una sola vez con showall y no en las páginas siguientes @requiere-feature
- Location: salidas/spec-3/pruebas/01-resumen-por-tema.spec.ts:57:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('#local-resumentema')
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" locator('#local-resumentema') with timeout 5000ms
  - waiting for locator('#local-resumentema')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [active] [ref=f9e1]:
  - status
  - generic [ref=f9e2]:
    - link "Salta al contenido principal" [ref=f9e3] [cursor=pointer]:
      - /url: "#maincontent"
    - navigation "Navegación del sitio" [ref=f9e4]:
      - generic [ref=f9e5]:
        - button "Panel lateral" [ref=f9e6] [cursor=pointer]
        - text: 
        - generic [ref=f9e9]:
          - button "Mostrar la ventana de notificaciones cuando no hay ninguna" [ref=f9e11] [cursor=pointer]:
            - generic [aria-hidden] [ref=f9e12]: 
          - button "Mostrar/ocultar cajón de mensajería" [ref=f9e14] [cursor=pointer]:
            - generic [aria-hidden] [ref=f9e15]: 
          - button "Menú de usuario" [ref=f9e21] [cursor=pointer]:
            - img "Estudiante Número 10" [ref=f9e25]: EN
            - text: 
    - generic [ref=f9e26]:
      - generic [ref=f9e27]:
        - generic:
          - button "Abrir índice del curso" [ref=f9e29] [cursor=pointer]
          - button "Abrir cajón de bloques" [ref=f9e34] [cursor=pointer]
        - banner [ref=f9e38]:
          - generic [ref=f9e39]:
            - navigation "Camino de migas" [ref=f9e42]:
              - list [ref=f9e43]:
                - listitem [ref=f9e44]:
                  - link "QA101" [ref=f9e45] [cursor=pointer]:
                    - /url: http://localhost:8090/course/view.php?id=2
                - listitem [ref=f9e46]:
                  - text: /
                  - link "General" [ref=f9e47] [cursor=pointer]:
                    - /url: http://localhost:8090/course/section.php?id=1
                - listitem [ref=f9e48]:
                  - text: /
                  - generic [ref=f9e49]: Examen de regresión
            - heading "Examen de regresión" [level=1] [ref=f9e58]
        - main [ref=f9e63]:
          - table [ref=f9e65]:
            - caption [ref=f9e66]: Resumen de intento 3
            - rowgroup [ref=f9e67]:
              - row [ref=f9e68]:
                - rowheader "Estado" [ref=f9e69]
                - cell "Finalizado" [ref=f9e70]
              - row [ref=f9e71]:
                - rowheader "Comenzado" [ref=f9e72]
                - cell "lunes, 2 de noviembre de 2026, 20:46" [ref=f9e73]
              - row [ref=f9e74]:
                - rowheader "Completado" [ref=f9e75]
                - cell "lunes, 2 de noviembre de 2026, 20:46" [ref=f9e76]
              - row [ref=f9e77]:
                - rowheader "Duración" [ref=f9e78]
                - cell "7 segundos" [ref=f9e79]
              - row [ref=f9e80]:
                - rowheader "Puntos" [ref=f9e81]
                - cell "5,00/6,00" [ref=f9e82]
              - row [ref=f9e83]:
                - rowheader "Calificación" [ref=f9e84]
                - cell "8,33 de 10,00 (83,33%)" [ref=f9e85]
              - row [ref=f9e86]:
                - rowheader "Retroalimentación" [ref=f9e87]
                - 'cell "Retro global: aprobado." [ref=f9e88]'
          - generic [ref=f9e90]:
            - generic [ref=f9e91]:
              - generic [ref=f9e92]:
                - heading "Pregunta 1" [level=3] [ref=f9e93]
                - generic [ref=f9e94]: Correcta
                - generic [ref=f9e95]: Se puntúa 1,00 sobre 1,00
                - button "Marcadas" [ref=f9e97] [cursor=pointer]: Marcar pregunta
              - generic [ref=f9e98]:
                - generic [ref=f9e99]:
                  - heading "Enunciado de la pregunta" [level=4] [ref=f9e100]
                  - paragraph [ref=f9e103]: ¿Cuánto es 3 × 4?
                  - group "Pregunta 1 Respuesta" [ref=f9e104]:
                    - generic [ref=f9e105]:
                      - generic [ref=f9e106]: Pregunta 1
                      - text: Respuesta
                    - generic [ref=f9e107]:
                      - generic [ref=f9e108]:
                        - radio "1. 12" [checked] [disabled] [ref=f9e109]
                        - generic [ref=f9e110]:
                          - generic [ref=f9e111]: "1."
                          - generic [ref=f9e112]: "12"
                        - img "Correcta" [ref=f9e114]: 
                        - generic [ref=f9e115]: 12 es el resultado de sumar cuatro veces el 3.
                      - generic [ref=f9e116]:
                        - radio "2. 7" [disabled] [ref=f9e117]
                        - generic [ref=f9e118]:
                          - generic [ref=f9e119]: "2."
                          - generic [ref=f9e120]: "7"
                      - generic [ref=f9e121]:
                        - radio "3. 9" [disabled] [ref=f9e122]
                        - generic [ref=f9e123]:
                          - generic [ref=f9e124]: "3."
                          - generic [ref=f9e125]: "9"
                      - generic [ref=f9e126]:
                        - radio "4. 10" [disabled] [ref=f9e127]
                        - generic [ref=f9e128]:
                          - generic [ref=f9e129]: "4."
                          - generic [ref=f9e130]: "10"
                - generic [ref=f9e131]:
                  - heading "Retroalimentación" [level=4] [ref=f9e132]
                  - generic [ref=f9e133]:
                    - generic [ref=f9e134]: Respuesta correcta.
                    - paragraph [ref=f9e137]: 3 × 4 = 12.
                    - generic [ref=f9e138]: "La respuesta correcta es: 12"
            - generic [ref=f9e139]:
              - generic [ref=f9e140]:
                - heading "Pregunta 2" [level=3] [ref=f9e141]
                - generic [ref=f9e142]: Correcta
                - generic [ref=f9e143]: Se puntúa 1,00 sobre 1,00
                - button "Marcadas" [ref=f9e145] [cursor=pointer]: Marcar pregunta
              - generic [ref=f9e146]:
                - generic [ref=f9e147]:
                  - heading "Enunciado de la pregunta" [level=4] [ref=f9e148]
                  - paragraph [ref=f9e151]: La suma de dos números pares siempre es par.
                  - group "Pregunta 2 Respuesta" [ref=f9e152]:
                    - generic [ref=f9e153]:
                      - generic [ref=f9e154]: Pregunta 2
                      - text: Respuesta
                    - generic [ref=f9e155]:
                      - generic [ref=f9e156]:
                        - radio "Verdadero" [checked] [disabled] [ref=f9e157]
                        - text: Verdadero
                        - img "Correcta" [ref=f9e158]: 
                      - generic [ref=f9e159]:
                        - radio "Falso" [disabled] [ref=f9e160]
                        - text: Falso
                - generic [ref=f9e161]:
                  - heading "Retroalimentación" [level=4] [ref=f9e162]
                  - generic [ref=f9e163]:
                    - generic [ref=f9e164]: Correcto.
                    - paragraph [ref=f9e167]: Dos pares suman siempre un múltiplo de 2.
                    - generic [ref=f9e168]: La respuesta correcta es 'Verdadero'
            - generic [ref=f9e169]:
              - generic [ref=f9e170]:
                - heading "Pregunta 3" [level=3] [ref=f9e171]
                - generic [ref=f9e172]: Correcta
                - generic [ref=f9e173]: Se puntúa 1,00 sobre 1,00
                - button "Marcadas" [ref=f9e175] [cursor=pointer]: Marcar pregunta
              - generic [ref=f9e176]:
                - generic [ref=f9e177]:
                  - heading "Enunciado de la pregunta" [level=4] [ref=f9e178]
                  - paragraph [ref=f9e181]: ¿Cuántos lados tiene un hexágono?
                  - group "Pregunta 3 Respuesta" [ref=f9e182]:
                    - generic [ref=f9e183]:
                      - generic [ref=f9e184]: Pregunta 3
                      - text: Respuesta
                    - generic [ref=f9e185]:
                      - generic [ref=f9e186]:
                        - radio "1. 6" [checked] [disabled] [ref=f9e187]
                        - generic [ref=f9e188]:
                          - generic [ref=f9e189]: "1."
                          - generic [ref=f9e190]: "6"
                        - img "Correcta" [ref=f9e192]: 
                        - generic [ref=f9e193]: Hexa significa seis.
                      - generic [ref=f9e194]:
                        - radio "2. 4" [disabled] [ref=f9e195]
                        - generic [ref=f9e196]:
                          - generic [ref=f9e197]: "2."
                          - generic [ref=f9e198]: "4"
                      - generic [ref=f9e199]:
                        - radio "3. 5" [disabled] [ref=f9e200]
                        - generic [ref=f9e201]:
                          - generic [ref=f9e202]: "3."
                          - generic [ref=f9e203]: "5"
                      - generic [ref=f9e204]:
                        - radio "4. 8" [disabled] [ref=f9e205]
                        - generic [ref=f9e206]:
                          - generic [ref=f9e207]: "4."
                          - generic [ref=f9e208]: "8"
                - generic [ref=f9e209]:
                  - heading "Retroalimentación" [level=4] [ref=f9e210]
                  - generic [ref=f9e211]:
                    - generic [ref=f9e212]: Respuesta correcta.
                    - paragraph [ref=f9e215]: Un hexágono tiene seis lados.
                    - generic [ref=f9e216]: "La respuesta correcta es: 6"
            - generic [ref=f9e217]:
              - generic [ref=f9e218]:
                - heading "Pregunta 4" [level=3] [ref=f9e219]
                - generic [ref=f9e220]: Correcta
                - generic [ref=f9e221]: Se puntúa 1,00 sobre 1,00
                - button "Marcadas" [ref=f9e223] [cursor=pointer]: Marcar pregunta
              - generic [ref=f9e224]:
                - generic [ref=f9e225]:
                  - heading "Enunciado de la pregunta" [level=4] [ref=f9e226]
                  - paragraph [ref=f9e229]: Todo cuadrado es también un rectángulo.
                  - group "Pregunta 4 Respuesta" [ref=f9e230]:
                    - generic [ref=f9e231]:
                      - generic [ref=f9e232]: Pregunta 4
                      - text: Respuesta
                    - generic [ref=f9e233]:
                      - generic [ref=f9e234]:
                        - radio "Verdadero" [checked] [disabled] [ref=f9e235]
                        - text: Verdadero
                        - img "Correcta" [ref=f9e236]: 
                      - generic [ref=f9e237]:
                        - radio "Falso" [disabled] [ref=f9e238]
                        - text: Falso
                - generic [ref=f9e239]:
                  - heading "Retroalimentación" [level=4] [ref=f9e240]
                  - generic [ref=f9e241]:
                    - generic [ref=f9e242]: Correcto.
                    - paragraph [ref=f9e245]: Un cuadrado tiene cuatro ángulos rectos.
                    - generic [ref=f9e246]: La respuesta correcta es 'Verdadero'
            - generic [ref=f9e247]:
              - generic [ref=f9e248]:
                - heading "Pregunta 5" [level=3] [ref=f9e249]
                - generic [ref=f9e250]: Correcta
                - generic [ref=f9e251]: Se puntúa 1,00 sobre 1,00
                - button "Marcadas" [ref=f9e253] [cursor=pointer]: Marcar pregunta
              - generic [ref=f9e254]:
                - generic [ref=f9e255]:
                  - heading "Enunciado de la pregunta" [level=4] [ref=f9e256]
                  - paragraph [ref=f9e259]: Guatemala declaró su independencia en 1821.
                  - group "Pregunta 5 Respuesta" [ref=f9e260]:
                    - generic [ref=f9e261]:
                      - generic [ref=f9e262]: Pregunta 5
                      - text: Respuesta
                    - generic [ref=f9e263]:
                      - generic [ref=f9e264]:
                        - radio "Verdadero" [checked] [disabled] [ref=f9e265]
                        - text: Verdadero
                        - img "Correcta" [ref=f9e266]: 
                      - generic [ref=f9e267]:
                        - radio "Falso" [disabled] [ref=f9e268]
                        - text: Falso
                - generic [ref=f9e269]:
                  - heading "Retroalimentación" [level=4] [ref=f9e270]
                  - generic [ref=f9e271]:
                    - generic [ref=f9e272]: Correcto.
                    - paragraph [ref=f9e275]: El Acta de Independencia se firmó el 15 de septiembre de 1821.
                    - generic [ref=f9e276]: La respuesta correcta es 'Verdadero'
            - generic [ref=f9e277]:
              - generic [ref=f9e278]:
                - heading "Pregunta 6" [level=3] [ref=f9e279]
                - generic [ref=f9e280]: Sin contestar
                - generic [ref=f9e281]: Se puntúa como 0 sobre 1,00
                - button "Marcadas" [ref=f9e283] [cursor=pointer]: Marcar pregunta
              - generic [ref=f9e284]:
                - generic [ref=f9e285]:
                  - heading "Enunciado de la pregunta" [level=4] [ref=f9e286]
                  - paragraph [ref=f9e289]: Explica en un párrafo una consecuencia de la independencia de Centroamérica.
                  - generic [ref=f9e291]:
                    - heading "Texto de la respuesta Pregunta 6" [level=4] [ref=f9e292]
                    - textbox "Texto de la respuesta Pregunta 6" [ref=f9e293]
                - generic [ref=f9e294]:
                  - heading "Retroalimentación" [level=4] [ref=f9e295]
                  - paragraph [ref=f9e299]: Una buena respuesta nombra la consecuencia y explica por qué ocurrió.
          - link "Finalizar revisión" [ref=f9e301] [cursor=pointer]:
            - /url: http://localhost:8090/mod/quiz/view.php?id=2
      - contentinfo [ref=f9e302]:
        - generic: "?"
        - generic [ref=f9e303]:
          - link "Contactar con el soporte del sitio" [ref=f9e306] [cursor=pointer]:
            - /url: http://localhost:8090/user/contactsitesupport.php
            - generic [aria-hidden] [ref=f9e307]: 
            - text: Contactar con el soporte del sitio
          - generic [ref=f9e308]:
            - generic [ref=f9e310]:
              - text: Usted se ha identificado como
              - link "Estudiante Número 10" [ref=f9e311] [cursor=pointer]:
                - /url: http://localhost:8090/user/profile.php?id=13
              - text: (
              - link "Cerrar sesión" [ref=f9e312] [cursor=pointer]:
                - /url: http://localhost:8090/login/logout.php?sesskey=T8PcBTSwOC
              - text: )
            - link "Resumen de retención de datos" [ref=f9e315] [cursor=pointer]:
              - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
            - link "Cambiar al tema estándar" [ref=f9e317] [cursor=pointer]:
              - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fmod%2Fquiz%2Freview.php%3Fattempt%3D542%26amp%3Bcmid%3D2&device=default&sesskey=T8PcBTSwOC
          - generic [ref=f9e319]:
            - text: Desarrollado por
            - link "Moodle" [ref=f9e320] [cursor=pointer]:
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
  14 |   await expect(seccionTemas(page).getByRole('heading', { name: 'Resumen por tema' })).toBeVisible();
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
> 63 |   await expect(seccionTemas(page)).toHaveCount(1);
     |                                    ^ Error: expect(locator).toHaveCount(expected) failed
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