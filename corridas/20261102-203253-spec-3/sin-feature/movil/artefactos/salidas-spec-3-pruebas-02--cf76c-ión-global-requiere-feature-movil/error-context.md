# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-3/pruebas/02-retro-eliminada.spec.ts >> [CA-3] el formulario del examen ya no ofrece nada de la retroalimentación global @requiere-feature
- Location: salidas/spec-3/pruebas/02-retro-eliminada.spec.ts:40:1

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
    13 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [active] [ref=f3e1]:
  - status
  - generic [ref=f3e2]:
    - link "Salta al contenido principal" [ref=f3e3] [cursor=pointer]:
      - /url: "#maincontent"
    - navigation "Navegación del sitio" [ref=f3e4]:
      - generic [ref=f3e5]:
        - button "Panel lateral" [ref=f3e6] [cursor=pointer]
        - text: 
        - generic [ref=f3e9]:
          - generic [ref=f3e12]:
            - switch "Modo de edición" [ref=f3e13] [cursor=pointer]
            - generic [ref=f3e14] [cursor=pointer]: Modo de edición
          - button "Mostrar la ventana de notificaciones cuando no hay ninguna" [ref=f3e24] [cursor=pointer]:
            - generic [aria-hidden] [ref=f3e25]: 
          - button "Mostrar/ocultar cajón de mensajería" [ref=f3e27] [cursor=pointer]:
            - generic [aria-hidden] [ref=f3e28]: 
          - button "Menú de usuario" [ref=f3e34] [cursor=pointer]:
            - img "Paula Profesora" [ref=f3e38]: PP
            - text: 
    - generic [ref=f3e39]:
      - generic [ref=f3e40]:
        - button "Abrir índice del curso" [ref=f3e42] [cursor=pointer]
        - banner [ref=f3e46]:
          - heading "Curso QA de Exámenes" [level=1] [ref=f3e53]
        - navigation "Menú de Curso" [ref=f3e56]:
          - menubar [ref=f3e57]:
            - menuitem "Curso" [ref=f3e58] [cursor=pointer]
            - menuitem "Configuración" [ref=f3e61] [cursor=pointer]
            - menuitem "Más " [ref=f3e63] [cursor=pointer]:
              - generic [ref=f3e64]: Más
              - text: 
        - main [ref=f3e68]:
          - heading "Nuevo Cuestionario" [level=2] [ref=f3e70]
          - generic [ref=f3e71]:
            - button "Expandir todo" [ref=f3e73] [cursor=pointer]
            - group "General" [ref=f3e75]:
              - generic [ref=f3e78]:
                - button "General" [expanded] [ref=f3e79] [cursor=pointer]:
                  - generic "Colapsar" [ref=f3e80]:
                    - generic [aria-hidden] [ref=f3e81]: 
                  - text:  
                - heading [level=3] [aria-hidden] [ref=f3e83]: General
              - generic [ref=f3e84]:
                - generic [ref=f3e85]:
                  - generic [ref=f3e86]:
                    - generic [ref=f3e87]: Nombre
                    - generic [aria-hidden] [ref=f3e90]: 
                  - textbox "Nombre" [ref=f3e92]
                - generic [ref=f3e93]:
                  - generic [ref=f3e94]: Descripción
                  - application [ref=f3e99]:
                    - generic [ref=f3e100]:
                      - toolbar [ref=f3e102]:
                        - group "historial" [ref=f3e103]:
                          - button "Deshacer" [disabled] [ref=f3e104]
                          - button "Rehacer" [disabled] [ref=f3e105]
                        - group "formato" [ref=f3e106]:
                          - button "Negrita" [ref=f3e107] [cursor=pointer]
                          - button "Cursiva" [ref=f3e108] [cursor=pointer]
                        - group "content" [ref=f3e109]:
                          - button "Imagen" [ref=f3e110] [cursor=pointer]
                          - button "Multimedios" [ref=f3e111] [cursor=pointer]
                          - button "Grabar audio" [ref=f3e112] [cursor=pointer]
                          - button "Grabar video" [ref=f3e113] [cursor=pointer]
                          - button "Configurar contenido H5P" [ref=f3e114] [cursor=pointer]
                          - button "Enlace" [ref=f3e115] [cursor=pointer]
                          - button "Desenlanzar" [ref=f3e116] [cursor=pointer]
                        - group "Ver" [ref=f3e117]:
                          - button "Pantalla completa" [ref=f3e118] [cursor=pointer]
                        - group "alineación" [ref=f3e119]:
                          - button "Alinear a la izquierda" [ref=f3e120] [cursor=pointer]
                          - button "Alinear al centro" [ref=f3e121] [cursor=pointer]
                          - button "Alinear a la derecha" [ref=f3e122] [cursor=pointer]
                        - group "directionality" [ref=f3e123]:
                          - button "Izquierda a derecha" [ref=f3e124] [cursor=pointer]
                          - button "Derecha a izquierda" [ref=f3e125] [cursor=pointer]
                        - group "sangría" [ref=f3e126]:
                          - button "Disminuir sangría" [disabled] [ref=f3e127]
                          - button "Incrementar sangría" [ref=f3e128] [cursor=pointer]
                        - group "lists" [ref=f3e129]:
                          - button "Lista de viñetas" [ref=f3e130] [cursor=pointer]
                          - button "Lista de viñetas" [ref=f3e131] [cursor=pointer]
                          - button "Lista numerada" [ref=f3e134] [cursor=pointer]
                          - button "Lista numerada" [ref=f3e135] [cursor=pointer]
                        - group "Avanzado" [ref=f3e138]:
                          - button "Editor de ecuación" [ref=f3e139] [cursor=pointer]
                        - group "Acordeón" [ref=f3e140]:
                          - button "Insertar acordeón" [ref=f3e141] [cursor=pointer]
                          - button "Desplegar acordeón" [ref=f3e142] [cursor=pointer]
                          - button "Borrar acordeón" [ref=f3e143] [cursor=pointer]
                      - iframe [ref=f3e146]:
                        - generic "Descripción. Rich text area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help." [ref=f4e1]:
                          - paragraph [ref=f4e2]
                    - generic [ref=f3e148]:
                      - group "Element Path" [ref=f3e149]:
                        - button "p" [ref=f3e150]
                      - generic [ref=f3e151]:
                        - button "0 palabras" [ref=f3e152] [cursor=pointer]
                        - link "Build with TinyMCE" [ref=f3e154]:
                          - /url: https://www.tiny.cloud/powered-by-tiny?utm_campaign=poweredby&utm_source=tiny&utm_medium=referral&utm_content=v7
                          - text: Build with
                - generic [ref=f3e163]:
                  - checkbox "Muestra la descripción en la página del curso" [ref=f3e164]
                  - generic [ref=f3e165]: Muestra la descripción en la página del curso
                  - button "Ayuda" [ref=f3e167] [cursor=pointer]:
                    - img "Ayuda con Muestra la descripción en la página del curso" [ref=f3e168]: 
            - group "Temporalización" [ref=f3e169]:
              - generic [ref=f3e172]:
                - button "Temporalización" [ref=f3e173] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e174]:
                    - generic [aria-hidden] [ref=f3e176]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e178]: Temporalización
              - text:         
            - group "Calificación" [ref=f3e179]:
              - generic [ref=f3e182]:
                - button "Calificación" [ref=f3e183] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e184]:
                    - generic [aria-hidden] [ref=f3e186]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e188]: Calificación
              - text:   
            - group "Esquema" [ref=f3e189]:
              - generic [ref=f3e192]:
                - button "Esquema" [ref=f3e193] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e194]:
                    - generic [aria-hidden] [ref=f3e196]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e198]: Esquema
              - text:  
            - group "Comportamiento de las preguntas" [ref=f3e199]:
              - generic [ref=f3e202]:
                - button "Comportamiento de las preguntas" [ref=f3e203] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e204]:
                    - generic [aria-hidden] [ref=f3e206]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e208]: Comportamiento de las preguntas
              - text:    
            - group "Opciones de revisión" [ref=f3e209]:
              - generic [ref=f3e211]:
                - generic [ref=f3e212]:
                  - button "Opciones de revisión" [ref=f3e213] [cursor=pointer]:
                    - text: 
                    - generic "Expandir" [ref=f3e214]:
                      - generic [aria-hidden] [ref=f3e216]: 
                      - text: 
                  - heading [level=3] [aria-hidden] [ref=f3e218]: Opciones de revisión
                - button "Ayuda" [ref=f3e219] [cursor=pointer]:
                  - img "Ayuda con Opciones de revisión" [ref=f3e220]: 
              - text:        
            - group "Apariencia" [ref=f3e221]:
              - generic [ref=f3e224]:
                - button "Apariencia" [ref=f3e225] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e226]:
                    - generic [aria-hidden] [ref=f3e228]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e230]: Apariencia
              - text:    
            - group "Safe Exam Browser" [ref=f3e231]:
              - generic [ref=f3e234]:
                - button "Safe Exam Browser" [ref=f3e235] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e236]:
                    - generic [aria-hidden] [ref=f3e238]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e240]: Safe Exam Browser
              - text:                                            
            - group "Restricciones extra sobre los intentos" [ref=f3e241]:
              - generic [ref=f3e244]:
                - button "Restricciones extra sobre los intentos" [ref=f3e245] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e246]:
                    - generic [aria-hidden] [ref=f3e248]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e250]: Restricciones extra sobre los intentos
              - text:       
            - group "Retroalimentación global" [ref=f3e251]:
              - generic [ref=f3e253]:
                - generic [ref=f3e254]:
                  - button "Retroalimentación global" [ref=f3e255] [cursor=pointer]:
                    - text: 
                    - generic "Expandir" [ref=f3e256]:
                      - generic [aria-hidden] [ref=f3e258]: 
                      - text: 
                  - heading [level=3] [aria-hidden] [ref=f3e260]: Retroalimentación global
                - button "Ayuda" [ref=f3e261] [cursor=pointer]:
                  - img "Ayuda con Retroalimentación global" [ref=f3e262]: 
            - group "Ajustes comunes del módulo" [ref=f3e263]:
              - generic [ref=f3e266]:
                - button "Ajustes comunes del módulo" [ref=f3e267] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e268]:
                    - generic [aria-hidden] [ref=f3e270]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e272]: Ajustes comunes del módulo
              - text:    
            - group "Restricciones de acceso" [ref=f3e273]:
              - generic [ref=f3e276]:
                - button "Restricciones de acceso" [ref=f3e277] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e278]:
                    - generic [aria-hidden] [ref=f3e280]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e282]: Restricciones de acceso
            - group "Marcas" [ref=f3e283]:
              - generic [ref=f3e286]:
                - button "Marcas" [ref=f3e287] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e288]:
                    - generic [aria-hidden] [ref=f3e290]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e292]: Marcas
            - group "Competencias" [ref=f3e293]:
              - generic [ref=f3e296]:
                - button "Competencias" [ref=f3e297] [cursor=pointer]:
                  - text: 
                  - generic "Expandir" [ref=f3e298]:
                    - generic [aria-hidden] [ref=f3e300]: 
                    - text: 
                - heading [level=3] [aria-hidden] [ref=f3e302]: Competencias
              - text: 
            - generic [ref=f3e305]:
              - checkbox "Enviar notificación de actualización de contenido" [ref=f3e306]
              - generic [ref=f3e307]: Enviar notificación de actualización de contenido
              - button "Ayuda" [ref=f3e309] [cursor=pointer]:
                - img "Ayuda con Enviar notificación de actualización de contenido" [ref=f3e310]: 
            - generic [ref=f3e316]:
              - button "Guardar cambios y regresar al curso" [ref=f3e319] [cursor=pointer]
              - button "Guardar cambios y mostrar" [ref=f3e322] [cursor=pointer]
              - button "Cancelar" [ref=f3e325] [cursor=pointer]
            - generic [aria-hidden] [ref=f3e326]:
              - generic [aria-hidden] [ref=f3e327]: 
              - text: Requerido
      - contentinfo [ref=f3e328]:
        - generic: "?"
        - generic [ref=f3e329]:
          - generic [ref=f3e330]:
            - link "Documentación para esta página" [ref=f3e332] [cursor=pointer]:
              - /url: https://docs.moodle.org/503/es/mod/quiz/mod
              - generic [aria-hidden] [ref=f3e333]: 
              - text: Documentación para esta página
            - link "Contactar con el soporte del sitio" [ref=f3e335] [cursor=pointer]:
              - /url: http://localhost:8090/user/contactsitesupport.php
              - generic [aria-hidden] [ref=f3e336]: 
              - text: Contactar con el soporte del sitio
          - generic [ref=f3e337]:
            - generic [ref=f3e339]:
              - text: Usted se ha identificado como
              - link "Paula Profesora" [ref=f3e340] [cursor=pointer]:
                - /url: http://localhost:8090/user/profile.php?id=3
              - text: (
              - link "Cerrar sesión" [ref=f3e341] [cursor=pointer]:
                - /url: http://localhost:8090/login/logout.php?sesskey=95WReUPbX0
              - text: )
            - link "Resumen de retención de datos" [ref=f3e344] [cursor=pointer]:
              - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
            - link "Cambiar al tema estándar" [ref=f3e346] [cursor=pointer]:
              - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fcourse%2Fmodedit.php%3Fadd%3Dquiz%26amp%3Bsection%3D0%26amp%3Bcourse%3D2&device=default&sesskey=95WReUPbX0
          - generic [ref=f3e348]:
            - text: Desarrollado por
            - link "Moodle" [ref=f3e349] [cursor=pointer]:
              - /url: https://moodle.com
  - text: ×     
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
> 46 |   for (const selector of OPCIONES_RETIRADAS) await expect(page.locator(selector)).toHaveCount(0);
     |                                                                                   ^ Error: expect(locator).toHaveCount(expected) failed
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