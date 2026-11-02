# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-3/pruebas/02-retro-eliminada.spec.ts >> [CA-2] la página del examen ya no muestra el bloque anterior y conserva la nota @requiere-feature
- Location: salidas/spec-3/pruebas/02-retro-eliminada.spec.ts:23:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByText('Retro global')
Expected: 0
Received: 5
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByText('Retro global') with timeout 5000ms
  - waiting for getByText('Retro global')
    14 × locator resolved to 5 elements
       - unexpected value "5"

```

# Page snapshot

```yaml
- generic [active] [ref=f10e1]:
  - status
  - generic [ref=f10e2]:
    - link "Salta al contenido principal" [ref=f10e3] [cursor=pointer]:
      - /url: "#maincontent"
    - navigation "Navegación del sitio" [ref=f10e4]:
      - generic [ref=f10e5]:
        - button "Panel lateral" [ref=f10e6] [cursor=pointer]
        - text: 
        - generic [ref=f10e9]:
          - button "Mostrar la ventana de notificaciones cuando no hay ninguna" [ref=f10e11] [cursor=pointer]:
            - generic [aria-hidden] [ref=f10e12]: 
          - button "Mostrar/ocultar cajón de mensajería" [ref=f10e14] [cursor=pointer]:
            - generic [aria-hidden] [ref=f10e15]: 
          - button "Menú de usuario" [ref=f10e21] [cursor=pointer]:
            - img "Estudiante Número 10" [ref=f10e25]: EN
            - text: 
    - generic [ref=f10e26]:
      - generic [ref=f10e27]:
        - button "Abrir índice del curso" [ref=f10e29] [cursor=pointer]
        - banner [ref=f10e33]:
          - generic [ref=f10e34]:
            - navigation "Camino de migas" [ref=f10e37]:
              - list [ref=f10e38]:
                - listitem [ref=f10e39]:
                  - link "QA101" [ref=f10e40] [cursor=pointer]:
                    - /url: http://localhost:8090/course/view.php?id=2
                - listitem [ref=f10e41]:
                  - text: /
                  - link "General" [ref=f10e42] [cursor=pointer]:
                    - /url: http://localhost:8090/course/section.php?id=1
                - listitem [ref=f10e43]:
                  - text: /
                  - generic [ref=f10e44]: Examen de regresión
            - heading "Examen de regresión" [level=1] [ref=f10e53]
        - generic [ref=f10e56]:
          - paragraph [ref=f10e63]: Examen de práctica con preguntas de álgebra, geometría e historia.
          - main [ref=f10e64]:
            - button "Reintentar el cuestionario" [ref=f10e70] [cursor=pointer]
            - paragraph [ref=f10e72]: "Método de calificación: Calificación más alta"
            - generic [ref=f10e73]:
              - 'heading "Calificación más alta: 8,33 / 10,00." [level=3] [ref=f10e74]'
              - heading "Retroalimentación global" [level=3] [ref=f10e75]
              - generic [ref=f10e76]: "Retro global: aprobado."
            - heading "Sus intentos" [level=3] [ref=f10e77]
            - list [ref=f10e78]:
              - listitem [ref=f10e79]:
                - generic [ref=f10e80]:
                  - heading "Intento 5" [level=4] [ref=f10e82]
                  - table [ref=f10e83]:
                    - caption [ref=f10e84]: Resumen de intento 5
                    - rowgroup [ref=f10e85]:
                      - row [ref=f10e86]:
                        - rowheader "Estado" [ref=f10e87]
                        - cell "Finalizado" [ref=f10e88]
                      - row [ref=f10e89]:
                        - rowheader "Comenzado" [ref=f10e90]
                        - cell "lunes, 2 de noviembre de 2026, 20:47" [ref=f10e91]
                      - row [ref=f10e92]:
                        - rowheader "Completado" [ref=f10e93]
                        - cell "lunes, 2 de noviembre de 2026, 20:47" [ref=f10e94]
                      - row [ref=f10e95]:
                        - rowheader "Duración" [ref=f10e96]
                        - cell "7 segundos" [ref=f10e97]
                      - row [ref=f10e98]:
                        - rowheader "Puntos" [ref=f10e99]
                        - cell "5,00/6,00" [ref=f10e100]
                      - row [ref=f10e101]:
                        - rowheader "Calificación" [ref=f10e102]
                        - cell "8,33 de 10,00 (83,33%)" [ref=f10e103]
                      - row [ref=f10e104]:
                        - rowheader "Retroalimentación" [ref=f10e105]
                        - 'cell "Retro global: aprobado." [ref=f10e106]'
                  - link "Revisión" [ref=f10e109] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/review.php?attempt=544&cmid=2
              - listitem [ref=f10e110]:
                - generic [ref=f10e111]:
                  - heading "Intento 4" [level=4] [ref=f10e113]
                  - table [ref=f10e114]:
                    - caption [ref=f10e115]: Resumen de intento 4
                    - rowgroup [ref=f10e116]:
                      - row [ref=f10e117]:
                        - rowheader "Estado" [ref=f10e118]
                        - cell "Finalizado" [ref=f10e119]
                      - row [ref=f10e120]:
                        - rowheader "Comenzado" [ref=f10e121]
                        - cell "lunes, 2 de noviembre de 2026, 20:46" [ref=f10e122]
                      - row [ref=f10e123]:
                        - rowheader "Completado" [ref=f10e124]
                        - cell "lunes, 2 de noviembre de 2026, 20:47" [ref=f10e125]
                      - row [ref=f10e126]:
                        - rowheader "Duración" [ref=f10e127]
                        - cell "7 segundos" [ref=f10e128]
                      - row [ref=f10e129]:
                        - rowheader "Puntos" [ref=f10e130]
                        - cell "5,00/6,00" [ref=f10e131]
                      - row [ref=f10e132]:
                        - rowheader "Calificación" [ref=f10e133]
                        - cell "8,33 de 10,00 (83,33%)" [ref=f10e134]
                      - row [ref=f10e135]:
                        - rowheader "Retroalimentación" [ref=f10e136]
                        - 'cell "Retro global: aprobado." [ref=f10e137]'
                  - link "Revisión" [ref=f10e140] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/review.php?attempt=543&cmid=2
              - listitem [ref=f10e141]:
                - generic [ref=f10e142]:
                  - heading "Intento 3" [level=4] [ref=f10e144]
                  - table [ref=f10e145]:
                    - caption [ref=f10e146]: Resumen de intento 3
                    - rowgroup [ref=f10e147]:
                      - row [ref=f10e148]:
                        - rowheader "Estado" [ref=f10e149]
                        - cell "Finalizado" [ref=f10e150]
                      - row [ref=f10e151]:
                        - rowheader "Comenzado" [ref=f10e152]
                        - cell "lunes, 2 de noviembre de 2026, 20:46" [ref=f10e153]
                      - row [ref=f10e154]:
                        - rowheader "Completado" [ref=f10e155]
                        - cell "lunes, 2 de noviembre de 2026, 20:46" [ref=f10e156]
                      - row [ref=f10e157]:
                        - rowheader "Duración" [ref=f10e158]
                        - cell "7 segundos" [ref=f10e159]
                      - row [ref=f10e160]:
                        - rowheader "Puntos" [ref=f10e161]
                        - cell "5,00/6,00" [ref=f10e162]
                      - row [ref=f10e163]:
                        - rowheader "Calificación" [ref=f10e164]
                        - cell "8,33 de 10,00 (83,33%)" [ref=f10e165]
                      - row [ref=f10e166]:
                        - rowheader "Retroalimentación" [ref=f10e167]
                        - 'cell "Retro global: aprobado." [ref=f10e168]'
                  - link "Revisión" [ref=f10e171] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/review.php?attempt=542&cmid=2
              - listitem [ref=f10e172]:
                - generic [ref=f10e173]:
                  - heading "Intento 2" [level=4] [ref=f10e175]
                  - table [ref=f10e176]:
                    - caption [ref=f10e177]: Resumen de intento 2
                    - rowgroup [ref=f10e178]:
                      - row [ref=f10e179]:
                        - rowheader "Estado" [ref=f10e180]
                        - cell "Finalizado" [ref=f10e181]
                      - row [ref=f10e182]:
                        - rowheader "Comenzado" [ref=f10e183]
                        - cell "lunes, 2 de noviembre de 2026, 20:46" [ref=f10e184]
                      - row [ref=f10e185]:
                        - rowheader "Completado" [ref=f10e186]
                        - cell "lunes, 2 de noviembre de 2026, 20:46" [ref=f10e187]
                      - row [ref=f10e188]:
                        - rowheader "Duración" [ref=f10e189]
                        - cell "7 segundos" [ref=f10e190]
                      - row [ref=f10e191]:
                        - rowheader "Calificación" [ref=f10e192]
                        - cell "Sin calificar aún" [ref=f10e193]
                  - link "Revisión" [ref=f10e196] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/review.php?attempt=541&cmid=2
              - listitem [ref=f10e197]:
                - generic [ref=f10e198]:
                  - heading "Intento 1" [level=4] [ref=f10e200]
                  - table [ref=f10e201]:
                    - caption [ref=f10e202]: Resumen de intento 1
                    - rowgroup [ref=f10e203]:
                      - row [ref=f10e204]:
                        - rowheader "Estado" [ref=f10e205]
                        - cell "Finalizado" [ref=f10e206]
                      - row [ref=f10e207]:
                        - rowheader "Comenzado" [ref=f10e208]
                        - cell "lunes, 2 de noviembre de 2026, 20:45" [ref=f10e209]
                      - row [ref=f10e210]:
                        - rowheader "Completado" [ref=f10e211]
                        - cell "lunes, 2 de noviembre de 2026, 20:45" [ref=f10e212]
                      - row [ref=f10e213]:
                        - rowheader "Duración" [ref=f10e214]
                        - cell "7 segundos" [ref=f10e215]
                      - row [ref=f10e216]:
                        - rowheader "Puntos" [ref=f10e217]
                        - cell "4,00/6,00" [ref=f10e218]
                      - row [ref=f10e219]:
                        - rowheader "Calificación" [ref=f10e220]
                        - cell "6,67 de 10,00 (66,67%)" [ref=f10e221]
                      - row [ref=f10e222]:
                        - rowheader "Retroalimentación" [ref=f10e223]
                        - 'cell "Retro global: aprobado." [ref=f10e224]'
                  - link "Revisión" [ref=f10e227] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/review.php?attempt=540&cmid=2
            - link "Siguiente" [ref=f10e234] [cursor=pointer]:
              - /url: http://localhost:8090/r.php/course/cms/2/next
              - generic [aria-hidden] [ref=f10e237]: 
              - text: 
      - contentinfo [ref=f10e238]:
        - generic: "?"
        - generic [ref=f10e239]:
          - link "Contactar con el soporte del sitio" [ref=f10e242] [cursor=pointer]:
            - /url: http://localhost:8090/user/contactsitesupport.php
            - generic [aria-hidden] [ref=f10e243]: 
            - text: Contactar con el soporte del sitio
          - generic [ref=f10e244]:
            - generic [ref=f10e246]:
              - text: Usted se ha identificado como
              - link "Estudiante Número 10" [ref=f10e247] [cursor=pointer]:
                - /url: http://localhost:8090/user/profile.php?id=13
              - text: (
              - link "Cerrar sesión" [ref=f10e248] [cursor=pointer]:
                - /url: http://localhost:8090/login/logout.php?sesskey=NKGxvHk4dt
              - text: )
            - link "Resumen de retención de datos" [ref=f10e251] [cursor=pointer]:
              - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
            - link "Cambiar al tema estándar" [ref=f10e253] [cursor=pointer]:
              - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fmod%2Fquiz%2Fview.php%3Fid%3D2&device=default&sesskey=NKGxvHk4dt
          - generic [ref=f10e255]:
            - text: Desarrollado por
            - link "Moodle" [ref=f10e256] [cursor=pointer]:
              - /url: https://moodle.com
```

# Test source

```ts
  1  | // CA-2 y CA-3: el bloque anterior se fue de verdad, no solo de la vista del estudiante. El profesor es la prueba de que se
  2  | // fue el dato: para él locallib.php:1220 fuerza overallfeedback, así que un simple cambio de opción no se la ocultaría.
  3  | import { test, expect } from '@playwright/test';
  4  | import { abrirQuiz, filaResumen, login, prepararCaptura } from '../../../factory/regresion/helpers';
  5  | import {
  6  |   abrirFormularioExamen, cerrarIndiceCurso, crearExamen, eliminarExamen, idCursoQA101, nombreUnico,
  7  | } from '../../spec-0/pruebas/soporte';
  8  | import { abrirEdicion, estudianteDe, filasTemas, hacerIntento, OPCIONES_RETIRADAS, seccionTemas } from './soporte';
  9  | 
  10 | test('[CA-2] el profesor tampoco ve el bloque anterior en la revisión de un estudiante @requiere-feature', async ({ page, isMobile }) => {
  11 |   test.setTimeout(180_000);
  12 |   await login(page, estudianteDe(isMobile));
  13 |   const intento = await hacerIntento(page, '6');
  14 | 
  15 |   await login(page, 'profesor');
  16 |   await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  17 |   await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');
  18 |   await expect(filaResumen(page, 'Retroalimentación')).toHaveCount(0);
  19 |   await expect(page.getByText('Retro global')).toHaveCount(0);
  20 |   await expect(filasTemas(page)).toHaveCount(3);
  21 | });
  22 | 
  23 | test('[CA-2] la página del examen ya no muestra el bloque anterior y conserva la nota @requiere-feature', async ({ page, isMobile }) => {
  24 |   test.setTimeout(180_000);
  25 |   await login(page, estudianteDe(isMobile));
  26 |   const intento = await hacerIntento(page, '6');
  27 | 
  28 |   await abrirQuiz(page);
  29 |   // Hay una tabla por intento y el más reciente va primero: el recién hecho es el primero.
  30 |   await expect(page.locator('li .card table').first()).toContainText('Finalizado');
  31 |   await expect(page.locator('li .card table thead th', { hasText: 'Retroalimentación' })).toHaveCount(0);
> 32 |   await expect(page.getByText('Retro global')).toHaveCount(0);
     |                                                ^ Error: expect(locator).toHaveCount(expected) failed
  33 |   // La nota depende de los intentos previos del estudiante: se comprueba que sigue ahí, no su valor.
  34 |   await expect(page.locator('#feedback')).toContainText(/\d+,\d+\s*\/\s*10,00/);
  35 | 
  36 |   await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  37 |   await expect(seccionTemas(page)).toHaveCount(1);
  38 | });
  39 | 
  40 | test('[CA-3] el formulario del examen ya no ofrece nada de la retroalimentación global @requiere-feature', async ({ page, isMobile }) => {
  41 |   test.setTimeout(180_000);
  42 |   await login(page, 'profesor');
  43 |   await abrirFormularioExamen(page, await idCursoQA101(page));
  44 |   if (!isMobile) await cerrarIndiceCurso(page);
  45 | 
  46 |   for (const selector of OPCIONES_RETIRADAS) await expect(page.locator(selector)).toHaveCount(0);
  47 |   // La retroalimentación por pregunta y el resto de la revisión quedan fuera de alcance: siguen.
  48 |   await expect(page.locator('#id_marksimmediately')).toHaveCount(1);
  49 |   await expect(page.locator('#id_generalfeedbackimmediately')).toHaveCount(1);
  50 | 
  51 |   await expect(page).toHaveScreenshot('spec-3-formulario.png', { fullPage: true, mask: await prepararCaptura(page) });
  52 | });
  53 | 
  54 | test('[CA-3] un examen nuevo se guarda sin error con ese formulario y sigue sin esas opciones @requiere-feature', async ({ page }, testInfo) => {
  55 |   test.setTimeout(180_000);
  56 |   const nombre = nombreUnico('Spec3', testInfo.project.name);
  57 |   await login(page, 'profesor');
  58 |   const curso = await idCursoQA101(page);
  59 | 
  60 |   let cmid = 0;
  61 |   try {
  62 |     cmid = await crearExamen(page, curso, nombre);
  63 |     await expect(page).toHaveTitle(new RegExp(nombre));
  64 | 
  65 |     await abrirEdicion(page, cmid);
  66 |     await expect(page.locator('#id_name')).toHaveValue(nombre);
  67 |     for (const selector of OPCIONES_RETIRADAS) await expect(page.locator(selector)).toHaveCount(0);
  68 |   } finally {
  69 |     if (cmid) await eliminarExamen(page, cmid);
  70 |   }
  71 | });
  72 | 
  73 | test('[CA-3] los ajustes del administrador ya no ofrecen la retroalimentación global @requiere-feature', async ({ page }) => {
  74 |   await login(page, 'admin');
  75 |   await page.goto('/admin/settings.php?section=modsettingquiz');
  76 |   await expect(page.locator("[id^='id_s_quiz_reviewmarks']").first()).toBeVisible();
  77 |   await expect(page.locator('#id_s_quiz_initialnumfeedbacks')).toHaveCount(0);
  78 |   await expect(page.locator("[id^='id_s_quiz_reviewoverallfeedback']")).toHaveCount(0);
  79 | });
  80 | 
```