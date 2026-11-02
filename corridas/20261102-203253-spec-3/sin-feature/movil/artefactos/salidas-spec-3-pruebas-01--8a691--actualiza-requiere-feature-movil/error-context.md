# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-3/pruebas/01-resumen-por-tema.spec.ts >> [CA-1] un ensayo pendiente se avisa por tema y al calificarlo el resumen se actualiza @requiere-feature
- Location: salidas/spec-3/pruebas/01-resumen-por-tema.spec.ts:31:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('#local-resumentema').locator('tbody tr').nth(2).locator('td')
Timeout: 5000ms
- Expected  - 5
+ Received  + 1

- Array [
-   "Historia",
-   "1,00/2,00",
-   "1 pregunta sin calificar",
- ]
+ Array []

Call log:
  - Expect "toHaveText" locator('#local-resumentema').locator('tbody tr').nth(2).locator('td') with timeout 5000ms
  - waiting for locator('#local-resumentema').locator('tbody tr').nth(2).locator('td')
    13 × locator resolved to 0 elements

```

# Page snapshot

```yaml
- generic [active] [ref=f8e1]:
  - status
  - generic [ref=f8e2]:
    - link "Salta al contenido principal" [ref=f8e3] [cursor=pointer]:
      - /url: "#maincontent"
    - navigation "Navegación del sitio" [ref=f8e4]:
      - generic [ref=f8e5]:
        - button "Panel lateral" [ref=f8e6] [cursor=pointer]
        - text: 
        - generic [ref=f8e9]:
          - button "Mostrar la ventana de notificaciones cuando no hay ninguna" [ref=f8e11] [cursor=pointer]:
            - generic [aria-hidden] [ref=f8e12]: 
          - button "Mostrar/ocultar cajón de mensajería" [ref=f8e14] [cursor=pointer]:
            - generic [aria-hidden] [ref=f8e15]: 
          - button "Menú de usuario" [ref=f8e21] [cursor=pointer]:
            - img "Estudiante Número 10" [ref=f8e25]: EN
            - text: 
    - generic [ref=f8e26]:
      - generic [ref=f8e27]:
        - generic:
          - button "Abrir índice del curso" [ref=f8e29] [cursor=pointer]
          - button "Abrir cajón de bloques" [ref=f8e34] [cursor=pointer]
        - banner [ref=f8e38]:
          - generic [ref=f8e39]:
            - navigation "Camino de migas" [ref=f8e42]:
              - list [ref=f8e43]:
                - listitem [ref=f8e44]:
                  - link "QA101" [ref=f8e45] [cursor=pointer]:
                    - /url: http://localhost:8090/course/view.php?id=2
                - listitem [ref=f8e46]:
                  - text: /
                  - link "General" [ref=f8e47] [cursor=pointer]:
                    - /url: http://localhost:8090/course/section.php?id=1
                - listitem [ref=f8e48]:
                  - text: /
                  - generic [ref=f8e49]: Examen de regresión
            - heading "Examen de regresión" [level=1] [ref=f8e58]
        - generic [ref=f8e61]:
          - alert [ref=f8e63]:
            - text: Intento enviado.
            - button "Descartar esta notificación" [ref=f8e64] [cursor=pointer]
          - main [ref=f8e67]:
            - table [ref=f8e69]:
              - caption [ref=f8e70]: Resumen de intento 2
              - rowgroup [ref=f8e71]:
                - row [ref=f8e72]:
                  - rowheader "Estado" [ref=f8e73]
                  - cell "Finalizado" [ref=f8e74]
                - row [ref=f8e75]:
                  - rowheader "Comenzado" [ref=f8e76]
                  - cell "lunes, 2 de noviembre de 2026, 20:46" [ref=f8e77]
                - row [ref=f8e78]:
                  - rowheader "Completado" [ref=f8e79]
                  - cell "lunes, 2 de noviembre de 2026, 20:46" [ref=f8e80]
                - row [ref=f8e81]:
                  - rowheader "Duración" [ref=f8e82]
                  - cell "7 segundos" [ref=f8e83]
                - row [ref=f8e84]:
                  - rowheader "Calificación" [ref=f8e85]
                  - cell "Sin calificar aún" [ref=f8e86]
            - generic [ref=f8e88]:
              - generic [ref=f8e89]:
                - generic [ref=f8e90]:
                  - heading "Pregunta 1" [level=3] [ref=f8e91]
                  - generic [ref=f8e92]: Correcta
                  - generic [ref=f8e93]: Se puntúa 1,00 sobre 1,00
                  - button "Marcadas" [ref=f8e95] [cursor=pointer]: Marcar pregunta
                - generic [ref=f8e96]:
                  - generic [ref=f8e97]:
                    - heading "Enunciado de la pregunta" [level=4] [ref=f8e98]
                    - paragraph [ref=f8e101]: ¿Cuánto es 3 × 4?
                    - group "Pregunta 1 Respuesta" [ref=f8e102]:
                      - generic [ref=f8e103]:
                        - generic [ref=f8e104]: Pregunta 1
                        - text: Respuesta
                      - generic [ref=f8e105]:
                        - generic [ref=f8e106]:
                          - radio "1. 12" [checked] [disabled] [ref=f8e107]
                          - generic [ref=f8e108]:
                            - generic [ref=f8e109]: "1."
                            - generic [ref=f8e110]: "12"
                          - img "Correcta" [ref=f8e112]: 
                          - generic [ref=f8e113]: 12 es el resultado de sumar cuatro veces el 3.
                        - generic [ref=f8e114]:
                          - radio "2. 7" [disabled] [ref=f8e115]
                          - generic [ref=f8e116]:
                            - generic [ref=f8e117]: "2."
                            - generic [ref=f8e118]: "7"
                        - generic [ref=f8e119]:
                          - radio "3. 9" [disabled] [ref=f8e120]
                          - generic [ref=f8e121]:
                            - generic [ref=f8e122]: "3."
                            - generic [ref=f8e123]: "9"
                        - generic [ref=f8e124]:
                          - radio "4. 10" [disabled] [ref=f8e125]
                          - generic [ref=f8e126]:
                            - generic [ref=f8e127]: "4."
                            - generic [ref=f8e128]: "10"
                  - generic [ref=f8e129]:
                    - heading "Retroalimentación" [level=4] [ref=f8e130]
                    - generic [ref=f8e131]:
                      - generic [ref=f8e132]: Respuesta correcta.
                      - paragraph [ref=f8e135]: 3 × 4 = 12.
                      - generic [ref=f8e136]: "La respuesta correcta es: 12"
              - generic [ref=f8e137]:
                - generic [ref=f8e138]:
                  - heading "Pregunta 2" [level=3] [ref=f8e139]
                  - generic [ref=f8e140]: Correcta
                  - generic [ref=f8e141]: Se puntúa 1,00 sobre 1,00
                  - button "Marcadas" [ref=f8e143] [cursor=pointer]: Marcar pregunta
                - generic [ref=f8e144]:
                  - generic [ref=f8e145]:
                    - heading "Enunciado de la pregunta" [level=4] [ref=f8e146]
                    - paragraph [ref=f8e149]: La suma de dos números pares siempre es par.
                    - group "Pregunta 2 Respuesta" [ref=f8e150]:
                      - generic [ref=f8e151]:
                        - generic [ref=f8e152]: Pregunta 2
                        - text: Respuesta
                      - generic [ref=f8e153]:
                        - generic [ref=f8e154]:
                          - radio "Verdadero" [checked] [disabled] [ref=f8e155]
                          - text: Verdadero
                          - img "Correcta" [ref=f8e156]: 
                        - generic [ref=f8e157]:
                          - radio "Falso" [disabled] [ref=f8e158]
                          - text: Falso
                  - generic [ref=f8e159]:
                    - heading "Retroalimentación" [level=4] [ref=f8e160]
                    - generic [ref=f8e161]:
                      - generic [ref=f8e162]: Correcto.
                      - paragraph [ref=f8e165]: Dos pares suman siempre un múltiplo de 2.
                      - generic [ref=f8e166]: La respuesta correcta es 'Verdadero'
              - generic [ref=f8e167]:
                - generic [ref=f8e168]:
                  - heading "Pregunta 3" [level=3] [ref=f8e169]
                  - generic [ref=f8e170]: Correcta
                  - generic [ref=f8e171]: Se puntúa 1,00 sobre 1,00
                  - button "Marcadas" [ref=f8e173] [cursor=pointer]: Marcar pregunta
                - generic [ref=f8e174]:
                  - generic [ref=f8e175]:
                    - heading "Enunciado de la pregunta" [level=4] [ref=f8e176]
                    - paragraph [ref=f8e179]: ¿Cuántos lados tiene un hexágono?
                    - group "Pregunta 3 Respuesta" [ref=f8e180]:
                      - generic [ref=f8e181]:
                        - generic [ref=f8e182]: Pregunta 3
                        - text: Respuesta
                      - generic [ref=f8e183]:
                        - generic [ref=f8e184]:
                          - radio "1. 6" [checked] [disabled] [ref=f8e185]
                          - generic [ref=f8e186]:
                            - generic [ref=f8e187]: "1."
                            - generic [ref=f8e188]: "6"
                          - img "Correcta" [ref=f8e190]: 
                          - generic [ref=f8e191]: Hexa significa seis.
                        - generic [ref=f8e192]:
                          - radio "2. 4" [disabled] [ref=f8e193]
                          - generic [ref=f8e194]:
                            - generic [ref=f8e195]: "2."
                            - generic [ref=f8e196]: "4"
                        - generic [ref=f8e197]:
                          - radio "3. 5" [disabled] [ref=f8e198]
                          - generic [ref=f8e199]:
                            - generic [ref=f8e200]: "3."
                            - generic [ref=f8e201]: "5"
                        - generic [ref=f8e202]:
                          - radio "4. 8" [disabled] [ref=f8e203]
                          - generic [ref=f8e204]:
                            - generic [ref=f8e205]: "4."
                            - generic [ref=f8e206]: "8"
                  - generic [ref=f8e207]:
                    - heading "Retroalimentación" [level=4] [ref=f8e208]
                    - generic [ref=f8e209]:
                      - generic [ref=f8e210]: Respuesta correcta.
                      - paragraph [ref=f8e213]: Un hexágono tiene seis lados.
                      - generic [ref=f8e214]: "La respuesta correcta es: 6"
              - generic [ref=f8e215]:
                - generic [ref=f8e216]:
                  - heading "Pregunta 4" [level=3] [ref=f8e217]
                  - generic [ref=f8e218]: Correcta
                  - generic [ref=f8e219]: Se puntúa 1,00 sobre 1,00
                  - button "Marcadas" [ref=f8e221] [cursor=pointer]: Marcar pregunta
                - generic [ref=f8e222]:
                  - generic [ref=f8e223]:
                    - heading "Enunciado de la pregunta" [level=4] [ref=f8e224]
                    - paragraph [ref=f8e227]: Todo cuadrado es también un rectángulo.
                    - group "Pregunta 4 Respuesta" [ref=f8e228]:
                      - generic [ref=f8e229]:
                        - generic [ref=f8e230]: Pregunta 4
                        - text: Respuesta
                      - generic [ref=f8e231]:
                        - generic [ref=f8e232]:
                          - radio "Verdadero" [checked] [disabled] [ref=f8e233]
                          - text: Verdadero
                          - img "Correcta" [ref=f8e234]: 
                        - generic [ref=f8e235]:
                          - radio "Falso" [disabled] [ref=f8e236]
                          - text: Falso
                  - generic [ref=f8e237]:
                    - heading "Retroalimentación" [level=4] [ref=f8e238]
                    - generic [ref=f8e239]:
                      - generic [ref=f8e240]: Correcto.
                      - paragraph [ref=f8e243]: Un cuadrado tiene cuatro ángulos rectos.
                      - generic [ref=f8e244]: La respuesta correcta es 'Verdadero'
              - generic [ref=f8e245]:
                - generic [ref=f8e246]:
                  - heading "Pregunta 5" [level=3] [ref=f8e247]
                  - generic [ref=f8e248]: Correcta
                  - generic [ref=f8e249]: Se puntúa 1,00 sobre 1,00
                  - button "Marcadas" [ref=f8e251] [cursor=pointer]: Marcar pregunta
                - generic [ref=f8e252]:
                  - generic [ref=f8e253]:
                    - heading "Enunciado de la pregunta" [level=4] [ref=f8e254]
                    - paragraph [ref=f8e257]: Guatemala declaró su independencia en 1821.
                    - group "Pregunta 5 Respuesta" [ref=f8e258]:
                      - generic [ref=f8e259]:
                        - generic [ref=f8e260]: Pregunta 5
                        - text: Respuesta
                      - generic [ref=f8e261]:
                        - generic [ref=f8e262]:
                          - radio "Verdadero" [checked] [disabled] [ref=f8e263]
                          - text: Verdadero
                          - img "Correcta" [ref=f8e264]: 
                        - generic [ref=f8e265]:
                          - radio "Falso" [disabled] [ref=f8e266]
                          - text: Falso
                  - generic [ref=f8e267]:
                    - heading "Retroalimentación" [level=4] [ref=f8e268]
                    - generic [ref=f8e269]:
                      - generic [ref=f8e270]: Correcto.
                      - paragraph [ref=f8e273]: El Acta de Independencia se firmó el 15 de septiembre de 1821.
                      - generic [ref=f8e274]: La respuesta correcta es 'Verdadero'
              - generic [ref=f8e275]:
                - generic [ref=f8e276]:
                  - heading "Pregunta 6" [level=3] [ref=f8e277]
                  - generic [ref=f8e278]: Finalizado
                  - generic [ref=f8e279]: Se puntúa como 0 sobre 1,00
                  - button "Marcadas" [ref=f8e281] [cursor=pointer]: Marcar pregunta
                - generic [ref=f8e282]:
                  - generic [ref=f8e283]:
                    - heading "Enunciado de la pregunta" [level=4] [ref=f8e284]
                    - paragraph [ref=f8e287]: Explica en un párrafo una consecuencia de la independencia de Centroamérica.
                    - generic [ref=f8e289]:
                      - heading "Texto de la respuesta Pregunta 6" [level=4] [ref=f8e290]
                      - textbox "Texto de la respuesta Pregunta 6" [ref=f8e291]
                  - generic [ref=f8e292]:
                    - heading "Retroalimentación" [level=4] [ref=f8e293]
                    - paragraph [ref=f8e297]: Una buena respuesta nombra la consecuencia y explica por qué ocurrió.
            - link "Finalizar revisión" [ref=f8e299] [cursor=pointer]:
              - /url: http://localhost:8090/mod/quiz/view.php?id=2
      - contentinfo [ref=f8e300]:
        - generic: "?"
        - generic [ref=f8e301]:
          - link "Contactar con el soporte del sitio" [ref=f8e304] [cursor=pointer]:
            - /url: http://localhost:8090/user/contactsitesupport.php
            - generic [aria-hidden] [ref=f8e305]: 
            - text: Contactar con el soporte del sitio
          - generic [ref=f8e306]:
            - generic [ref=f8e308]:
              - text: Usted se ha identificado como
              - link "Estudiante Número 10" [ref=f8e309] [cursor=pointer]:
                - /url: http://localhost:8090/user/profile.php?id=13
              - text: (
              - link "Cerrar sesión" [ref=f8e310] [cursor=pointer]:
                - /url: http://localhost:8090/login/logout.php?sesskey=1nYOyqfMbQ
              - text: )
            - link "Resumen de retención de datos" [ref=f8e313] [cursor=pointer]:
              - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
            - link "Cambiar al tema estándar" [ref=f8e315] [cursor=pointer]:
              - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fmod%2Fquiz%2Freview.php%3Fattempt%3D541%26amp%3Bcmid%3D2&device=default&sesskey=1nYOyqfMbQ
          - generic [ref=f8e317]:
            - text: Desarrollado por
            - link "Moodle" [ref=f8e318] [cursor=pointer]:
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
> 37 |   await expect(celdasTema(page, 2)).toHaveText(['Historia', '1,00/2,00', '1 pregunta sin calificar']);
     |                                     ^ Error: expect(locator).toHaveText(expected) failed
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