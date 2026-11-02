# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-3/pruebas/02-retro-eliminada.spec.ts >> [CA-3] un examen nuevo se guarda sin error con ese formulario y sigue sin esas opciones @requiere-feature
- Location: salidas/spec-3/pruebas/02-retro-eliminada.spec.ts:54:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('#id_overallfeedbackhdr')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" locator('#id_overallfeedbackhdr') with timeout 5000ms
  - waiting for locator('#id_overallfeedbackhdr')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [active] [ref=f12e1]:
  - status
  - generic [ref=f12e2]:
    - link "Salta al contenido principal" [ref=f12e3] [cursor=pointer]:
      - /url: "#maincontent"
    - navigation "Navegación del sitio" [ref=f12e4]:
      - generic [ref=f12e5]:
        - button "Panel lateral" [ref=f12e6] [cursor=pointer]
        - text: 
        - generic [ref=f12e9]:
          - generic [ref=f12e12]:
            - switch "Modo de edición" [ref=f12e13] [cursor=pointer]
            - generic [ref=f12e14] [cursor=pointer]: Modo de edición
          - button "Mostrar la ventana de notificaciones cuando no hay ninguna" [ref=f12e24] [cursor=pointer]:
            - generic [aria-hidden] [ref=f12e25]: 
          - button "Mostrar/ocultar cajón de mensajería" [ref=f12e27] [cursor=pointer]:
            - generic [aria-hidden] [ref=f12e28]: 
          - button "Menú de usuario" [ref=f12e34] [cursor=pointer]:
            - img "Paula Profesora" [ref=f12e38]: PP
            - text: 
    - generic [ref=f12e39]:
      - generic [ref=f12e40]:
        - button "Abrir índice del curso" [ref=f12e42] [cursor=pointer]
        - banner [ref=f12e46]:
          - heading "Curso QA de Exámenes" [level=1] [ref=f12e53]
        - navigation "Menú de Curso" [ref=f12e56]:
          - menubar [ref=f12e57]:
            - menuitem "Curso" [ref=f12e58] [cursor=pointer]
            - menuitem "Configuración" [ref=f12e61] [cursor=pointer]
            - menuitem "Más " [ref=f12e63] [cursor=pointer]:
              - generic [ref=f12e64]: Más
              - text: 
        - main [ref=f12e68]:
          - generic [ref=f12e71]:
            - heading "Perfilado de sección" [level=2] [ref=f12e72]
            - button [expanded] [ref=f12e74] [cursor=pointer]:
              - generic [ref=f12e75]:
                - generic [aria-hidden] [ref=f12e76]: 
                - text: Colapsar todo
              - text: 
            - list [ref=f12e77]:
              - listitem [ref=f12e78]:
                - generic [ref=f12e79]:
                  - generic [ref=f12e81]:
                    - button "General" [expanded] [ref=f12e82] [cursor=pointer]:
                      - generic "Colapsar" [ref=f12e83]:
                        - generic [aria-hidden] [ref=f12e84]: 
                      - text:  
                    - heading [level=3] [ref=f12e86]:
                      - link "General" [ref=f12e87] [cursor=pointer]:
                        - /url: http://localhost:8090/course/section.php?id=1
                  - list [ref=f12e91]:
                    - listitem [ref=f12e92]:
                      - link "Examen de regresión Cuestionario" [ref=f12e99] [cursor=pointer]:
                        - /url: http://localhost:8090/mod/quiz/view.php?id=2
                        - generic [ref=f12e100]:
                          - text: Examen de regresión
                          - generic [ref=f12e101]: Cuestionario
              - listitem [ref=f12e102]:
                - generic [ref=f12e103]:
                  - generic [ref=f12e105]:
                    - button "Nueva sección" [expanded] [ref=f12e106] [cursor=pointer]:
                      - generic "Colapsar" [ref=f12e107]:
                        - generic [aria-hidden] [ref=f12e108]: 
                      - text:  
                    - heading [level=3] [ref=f12e110]:
                      - link "Nueva sección" [ref=f12e111] [cursor=pointer]:
                        - /url: http://localhost:8090/course/section.php?id=2
                  - generic [ref=f12e114]:
                    - list
              - listitem [ref=f12e115]:
                - generic [ref=f12e116]:
                  - generic [ref=f12e118]:
                    - button "Nueva sección" [expanded] [ref=f12e119] [cursor=pointer]:
                      - generic "Colapsar" [ref=f12e120]:
                        - generic [aria-hidden] [ref=f12e121]: 
                      - text:  
                    - heading [level=3] [ref=f12e123]:
                      - link "Nueva sección" [ref=f12e124] [cursor=pointer]:
                        - /url: http://localhost:8090/course/section.php?id=3
                  - generic [ref=f12e127]:
                    - list
              - listitem [ref=f12e128]:
                - generic [ref=f12e129]:
                  - generic [ref=f12e131]:
                    - button "Nueva sección" [expanded] [ref=f12e132] [cursor=pointer]:
                      - generic "Colapsar" [ref=f12e133]:
                        - generic [aria-hidden] [ref=f12e134]: 
                      - text:  
                    - heading [level=3] [ref=f12e136]:
                      - link "Nueva sección" [ref=f12e137] [cursor=pointer]:
                        - /url: http://localhost:8090/course/section.php?id=4
                  - generic [ref=f12e140]:
                    - list
              - listitem [ref=f12e141]:
                - generic [ref=f12e142]:
                  - generic [ref=f12e144]:
                    - button "Nueva sección" [expanded] [ref=f12e145] [cursor=pointer]:
                      - generic "Colapsar" [ref=f12e146]:
                        - generic [aria-hidden] [ref=f12e147]: 
                      - text:  
                    - heading [level=3] [ref=f12e149]:
                      - link "Nueva sección" [ref=f12e150] [cursor=pointer]:
                        - /url: http://localhost:8090/course/section.php?id=5
                  - generic [ref=f12e153]:
                    - list
              - listitem [ref=f12e154]:
                - generic [ref=f12e155]:
                  - generic [ref=f12e157]:
                    - button "Nueva sección" [expanded] [ref=f12e158] [cursor=pointer]:
                      - generic "Colapsar" [ref=f12e159]:
                        - generic [aria-hidden] [ref=f12e160]: 
                      - text:  
                    - heading [level=3] [ref=f12e162]:
                      - link "Nueva sección" [ref=f12e163] [cursor=pointer]:
                        - /url: http://localhost:8090/course/section.php?id=6
                  - generic [ref=f12e166]:
                    - list
      - contentinfo [ref=f12e167]:
        - generic: "?"
        - generic [ref=f12e168]:
          - generic [ref=f12e169]:
            - link "Documentación para esta página" [ref=f12e171] [cursor=pointer]:
              - /url: https://docs.moodle.org/503/es/course/view/topics
              - generic [aria-hidden] [ref=f12e172]: 
              - text: Documentación para esta página
            - link "Contactar con el soporte del sitio" [ref=f12e174] [cursor=pointer]:
              - /url: http://localhost:8090/user/contactsitesupport.php
              - generic [aria-hidden] [ref=f12e175]: 
              - text: Contactar con el soporte del sitio
          - generic [ref=f12e176]:
            - generic [ref=f12e178]:
              - text: Usted se ha identificado como
              - link "Paula Profesora" [ref=f12e179] [cursor=pointer]:
                - /url: http://localhost:8090/user/profile.php?id=3
              - text: (
              - link "Cerrar sesión" [ref=f12e180] [cursor=pointer]:
                - /url: http://localhost:8090/login/logout.php?sesskey=G8CHdBZ2I6
              - text: )
            - link "Resumen de retención de datos" [ref=f12e183] [cursor=pointer]:
              - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
            - link "Cambiar al tema estándar" [ref=f12e185] [cursor=pointer]:
              - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fcourse%2Fview.php%3Fid%3D2&device=default&sesskey=G8CHdBZ2I6
          - generic [ref=f12e187]:
            - text: Desarrollado por
            - link "Moodle" [ref=f12e188] [cursor=pointer]:
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
  32 |   await expect(page.getByText('Retro global')).toHaveCount(0);
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
> 67 |     for (const selector of OPCIONES_RETIRADAS) await expect(page.locator(selector)).toHaveCount(0);
     |                                                                                     ^ Error: expect(locator).toHaveCount(expected) failed
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