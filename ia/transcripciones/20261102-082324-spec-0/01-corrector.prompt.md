Sos el CORRECTOR de una fábrica de software sobre Moodle 5.3. La implementación de `salidas/spec-0/` no pasó la validación
(intento 1). Escribís SOLO dentro de `salidas/spec-0/`. Podés leer `entorno/.moodle-src/` y `factory/regresion/`.

# Qué falló (salida real del pipeline)
### escritorio · [CA-1] [CA-6] un profesor crea y configura un examen nuevo en el curso
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: 'Close course index' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeVisible" getByRole('button', { name: 'Close course index' }) with timeout 5000ms[22m
[2m  - waiting for getByRole('button', { name: 'Close course index' })[22m


### movil · [CA-1] [CA-6] un profesor crea y configura un examen nuevo en el curso
TimeoutError: locator.selectOption: Timeout 15000ms exceeded.
Call log:
[2m  - waiting for locator('#id_grademethod')[22m
[2m    - locator resolved to <select name="grademethod" id="id_grademethod" class="form-select↵                       ↵                       ">…</select>[22m
[2m  - attempting select option action[22m
[2m    2 × waiting for element to be visible and enabled[22m
[2m      - did not find some options[22m
[2m    - retrying select option action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible and enabled[22m
[2m      - did not find some options[22m
[2m    - retrying select option action[22m
[2m      - waiting 100ms[22m
[2m    29 × waiting for element to be visible and enabled[22m
[2m       - did not find some options[22m
[2m     - retrying select option action[22m
[2m       - waiting 500ms[22m


### escritorio · [CA-2] un profesor crea preguntas en el banco y las agrega a un examen
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeEnabled[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /create a new question/i })
Expected: enabled
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeEnabled" getByRole('button', { name: /create a new question/i }) with timeout 5000ms[22m
[2m  - waiting for getByRole('button', { name: /create a new question/i })[22m


### movil · [CA-2] un profesor crea preguntas en el banco y las agrega a un examen
Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeEnabled[2m([22m[2m)[22m failed

Locator: getByRole('button', { name: /create a new question/i })
Expected: enabled
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "toBeEnabled" getByRole('button', { name: /create a new question/i }) with timeout 5000ms[22m
[2m  - waiting for getByRole('button', { name: /create a new question/i })[22m


### escritorio · [CA-3] [CA-4] [CA-6] un estudiante responde, navega, envía y ve su nota calculada
Error: [2mexpect([22m[31mlocator[39m[2m).not.[22mtoBeChecked[2m([22m[2m)[22m failed

Locator: locator('.que').filter({ has: locator('.qno').filter({ hasText: /^1$/ }) }).getByRole('radio', { name: /^([a-z0-9]+\. )?One$/i })
Expected: not checked
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "not toBeChecked" locator('.que').filter({ has: locator('.qno').filter({ hasText: /^1$/ }) }).getByRole('radio', { name: /^([a-z0-9]+\. )?One$/i }) with timeout 5000ms[22m
[2m  - waiting for locator('.que').filter({ has: locator('.qno').filter({ hasText: /^1$/ }) }).getByRole('radio', { name: /^([a-z0-9]+\. )?One$/i })[22m


### movil · [CA-3] [CA-4] [CA-6] un estudiante responde, navega, envía y ve su nota calculada
Error: [2mexpect([22m[31mlocator[39m[2m).not.[22mtoBeChecked[2m([22m[2m)[22m failed

Locator: locator('.que').filter({ has: locator('.qno').filter({ hasText: /^1$/ }) }).getByRole('radio', { name: /^([a-z0-9]+\. )?One$/i })
Expected: not checked
Timeout: 5000ms
Error: element(s) not found

Call log:
[2m  - Expect "not toBeChecked" locator('.que').filter({ has: locator('.qno').filter({ hasText: /^1$/ }) }).getByRole('radio', { name: /^([a-z0-9]+\. )?One$/i }) with timeout 5000ms[22m
[2m  - waiting for locator('.que').filter({ has: locator('.qno').filter({ hasText: /^1$/ }) }).getByRole('radio', { name: /^([a-z0-9]+\. )?One$/i })[22m


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
Error: expect(locator).toBeEnabled() failed

Locator: getByRole('button', { name: /create a new question/i })
Expected: enabled
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeEnabled" getByRole('button', { name: /create a new question/i }) with timeout 5000ms
  - waiting for getByRole('button', { name: /create a new question/i })

```

```yaml
- status
- link "Salta al contenido principal":
  - /url: "#maincontent"
- navigation "Navegación del sitio":
  - link "Viaro":
    - /url: http://localhost:8090/my/
  - menubar:
    - menuitem "Área personal"
  - switch "Modo de edición"
  - text: Modo de edición
  - button "Mostrar la ventana de notificaciones cuando no hay ninguna"
  - button "Mostrar/ocultar cajón de mensajería"
  - button "Menú de usuario":
    - img "Paula Profesora": PP
    - text: 
- button "Abrir índice del curso"
- banner:
  - navigation "Camino de migas":
    - list:
      - listitem:
        - link "QA101":
          - /url: http://localhost:8090/course/view.php?id=2
      - listitem:
        - text: /
        - link "Bancos de preguntas":
          - /url: http://localhost:8090/question/banks.php?courseid=2
      - listitem: / System shared question bank
  - heading "System shared question bank" [level=1]
- navigation "Menú de Actividad":
  - menubar:
    - menuitem "Banco de preguntas"
    - menuitem "Configuración"
    - menuitem "Más "
- main:
  - navigation:
    - text: Navegación terciaria del banco de preguntas
    - combobox "Navegación terciaria del banco de preguntas":
      - heading "Preguntas" [level=2]
      - text: 
  - heading "Banco de preguntas" [level=2]
  - combobox "Cómo se deben combinar varios filtros" [disabled]:
    - option "Todos" [selected]
  - group "Filtro 1":
    - text: Filtro 1 Coincidir Tipo de filtro
    - combobox "Tipo de filtro" [disabled]:
      - option "Seleccionar"
      - option "Estado de la última versión"
      - option "Categoría" [selected]
      - option "Marca"
      - option "Fecha de modificación"
      - option "Creado por"
      - option "Modificada por"
      - option "Nombre de la pregunta"
      - option "Número de ID de la pregunta"
      - option "Texto de la pregunta y retroalimentación general"
      - option "Tipo"
    - text: Categoría
    - combobox "Categoría":
      - listbox "Ítems seleccioandos:":
        - option "Spec0 categoria escritorio 1793607856965 " [selected]
    - text: "▼ Ítems seleccioandos:"
    - checkbox "Mostrar también preguntas de las subcategorías" [checked]
    - text: Mostrar también preguntas de las subcategorías y
  - group "Filtro 2":
    - text: Filtro 2 Coincidir Tipo de filtro
    - combobox "Tipo de filtro" [disabled]:
      - option "Seleccionar"
      - option "Mostrar preguntas ocultas" [selected]
      - option "Estado de la última versión"
      - option "Marca"
      - option "Fecha de modificación"
      - option "Creado por"
      - option "Modificada por"
      - option "Nombre de la pregunta"
      - option "Número de ID de la pregunta"
      - option "Texto de la pregunta y retroalimentación general"
      - option "Tipo"
    - text: Mostrar preguntas ocultas
    - combobox "Mostrar preguntas ocultas":
      - option "No" [selected]
      - option "Sí"
  - button "Añadir condición"
  - button "Mostrar"
  - button "Limpiar filtros"
  - button "Aplicar filtros"
  - button "Crear una nueva pregunta..."
  - link "Resetear columnas":
    - /url: http://localhost:8090/question/bank/columnsortorder/actions.php?action=reset&global&sesskey=E9aUK0ZK0m&returnurl=http%3A%2F%2Flocalhost%3A8090%2Fquestion%2Fedit.php%3Fcmid%3D1%26amp%3Bcat%3D153%252C20
  - text: ¿Mostrar el enunciado de la pregunta en la lista de preguntas?
  - combobox "¿Mostrar el enunciado de la pregunta en la lista de preguntas?":
    - option "No" [selected]
    - option "Sí, sólo texto"
    - option "Sí, con imágenes, multimedia, etc."
  - group:
    - text: Con seleccionadas
    - list:
      - listitem:
        - button "Mover a ..." [disabled]
      - listitem:
        - button "Borrar" [disabled]
      - listitem:
        - button "Exportar como Moodle XML" [disabled]
- contentinfo:
  - button "Mostrar pie de página"
```

# Test source

```ts
  42  |   await page.goto(`/course/modedit.php?add=quiz&course=${curso}&section=0`);
  43  |   await expect(page.locator('#id_introeditor_ifr')).toBeVisible({ timeout: ESPERA_EDITOR });
  44  | }
  45  | 
  46  | /**
  47  |  * Deja abierto el índice del curso (solo escritorio) para capturar siempre el mismo estado. Abierto o cerrado es una
  48  |  * preferencia guardada por usuario (drawer-open-index, boost/layout/drawers.php:34) que sobrevive entre corridas: no es
  49  |  * parte de la pantalla que se protege. En móvil no aplica: drawers.js:328 lo cierra al cargar sin mirar la preferencia.
  50  |  */
  51  | export async function abrirIndiceCurso(page: Page) {
  52  |   const abrir = page.getByRole('button', { name: 'Open course index' });
  53  |   if (await abrir.isVisible()) await abrir.click();
  54  |   await expect(page.getByRole('button', { name: 'Close course index' })).toBeVisible();
  55  | }
  56  | 
  57  | /** Guarda con "Save and display" y devuelve el cmid del examen creado o editado. */
  58  | export async function guardarExamen(page: Page): Promise<number> {
  59  |   await page.getByRole('button', { name: 'Save and display' }).click();
  60  |   await expect(page).toHaveURL(/mod\/quiz\/view\.php\?id=\d+/);
  61  |   return Number(new URL(page.url()).searchParams.get('id'));
  62  | }
  63  | 
  64  | export async func
---
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-0/pruebas/01-profesor-examen.spec.ts >> [CA-2] un profesor crea preguntas en el banco y las agrega a un examen
- Location: salidas/spec-0/pruebas/01-profesor-examen.spec.ts:47:1

# Error details

```
Error: expect(locator).toBeEnabled() failed

Locator: getByRole('button', { name: /create a new question/i })
Expected: enabled
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeEnabled" getByRole('button', { name: /create a new question/i }) with timeout 5000ms
  - waiting for getByRole('button', { name: /create a new question/i })

```

```yaml
- status
- link "Salta al contenido principal":
  - /url: "#maincontent"
- navigation "Navegación del sitio":
  - button "Panel lateral"
  - switch "Modo de edición"
  - text: Modo de edición
  - button "Mostrar la ventana de notificaciones cuando no hay ninguna"
  - button "Mostrar/ocultar cajón de mensajería"
  - button "Menú de usuario":
    - img "Paula Profesora": PP
    - text: 
- button "Abrir índice del curso"
- banner:
  - navigation "Camino de migas":
    - list:
      - listitem:
        - link "QA101":
          - /url: http://localhost:8090/course/view.php?id=2
      - listitem:
        - text: /
        - link "Bancos de preguntas":
          - /url: http://localhost:8090/question/banks.php?courseid=2
      - listitem: / System shared question bank
  - heading "System shared question bank" [level=1]
- navigation "Menú de Actividad":
  - menubar:
    - menuitem "Banco de preguntas"
    - menuitem "Configuración"
    - menuitem "Más "
- main:
  - navigation:
    - text: Navegación terciaria del banco de preguntas
    - combobox "Navegación terciaria del banco de preguntas":
      - heading "Preguntas" [level=2]
      - text: 
  - heading "Banco de preguntas" [level=2]
  - combobox "Cómo se deben combinar varios filtros" [disabled]:
    - option "Todos" [selected]
  - group "Filtro 1":
    - text: Filtro 1 Coincidir Tipo de filtro
    - combobox "Tipo de filtro" [disabled]:
      - option "Seleccionar"
      - option "Estado de la última versión"
      - option "Categoría" [selected]
      - option "Marca"
      - option "Fecha de modificación"
      - option "Creado por"
      - option "Modificada por"
      - option "Nombre de la pregunta"
      - option "Número de ID de la pregunta"
      - option "Texto de la pregunta y retroalimentación general"
      - option "Tipo"
    - text: Categoría
    - combobox "Categoría":
      - listbox "Ítems seleccioandos:":
        - option "Spec0 categoria movil 1793607984585 " [selected]
    - text: "▼ Ítems seleccioandos:"
    - checkbox "Mostrar también preguntas de las subcategorías" [checked]
    - text: Mostrar también preguntas de las subcategorías y
  - group "Filtro 2":
    - text: Filtro 2 Coincidir Tipo de filtro
    - combobox "Tipo de filtro" [disabled]:
      - option "Seleccionar"
      - option "Mostrar preguntas ocultas" [selected]
      - option "Estado de la última versión"
      - option "Marca"
      - option "Fecha de modificación"
      - option "Creado por"
      - option "Modificada por"
      - option "Nombre de la pregunta"
      - option "Número de ID de la pregunta"
      - option "Texto de la pregunta y retroalimentación general"
      - option "Tipo"
    - text: Mostrar preguntas ocultas
    - combobox "Mostrar preguntas ocultas":
      - option "No" [selected]
      - option "Sí"
  - button "Añadir condición"
  - button "Mostrar"
  - button "Limpiar filtros"
  - button "Aplicar filtros"
  - button "Crear una nueva pregunta..."
  - link "Resetear columnas":
    - /url: http://localhost:8090/question/bank/columnsortorder/actions.php?action=reset&global&sesskey=S9n9JpcAzA&returnurl=http%3A%2F%2Flocalhost%3A8090%2Fquestion%2Fedit.php%3Fcmid%3D1%26amp%3Bcat%3D154%252C20
  - text: ¿Mostrar el enunciado de la pregunta en la lista de preguntas?
  - combobox "¿Mostrar el enunciado de la pregunta en la lista de preguntas?":
    - option "No" [selected]
    - option "Sí, sólo texto"
    - option "Sí, con imágenes, multimedia, etc."
  - group:
    - text: Con seleccionadas
    - list:
      - listitem:
        - button [disabled]
      - listitem:
        - button [disabled]
      - listitem:
        - button [disabled]
- contentinfo:
  - link "Documentación para esta página":
    - /url: https://docs.moodle.org/503/es/question/edit
  - link "Contactar con el soporte del sitio":
    - /url: http://localhost:8090/user/contactsitesupport.php
  - text: Usted se ha identificado como
  - link "Paula Profesora":
    - /url: http://localhost:8090/user/profile.php?id=3
  - text: (
  - link "Cerrar sesión":
    - /url: http://localhost:8090/login/logout.php?sesskey=S9n9JpcAzA
  - text: )
  - link "Resumen de retención de datos":
    - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
  - link "Cambiar al tema estándar":
    - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fquestion%2Fedit.php%3Fcmid%3D1%26amp%3Bcat%3D154%252C20&device=default&sesskey=S9n9JpcAzA
  - text: Desarrollado por
  - link "Moodle":
    - /url: https://moodle.com
```

# Test source

```ts
  42  |   await page.goto(`/course/modedit.php?add=quiz&course=${curso}&section=0`);
  43  |   await expect(page.locator('#id_introeditor_ifr')).toBeVisible({ timeout: ESPERA_EDITOR });
  44  | }
  45  | 
  46  | /**
  47  |  * Deja abierto el índice del curso (solo escritorio) para capturar siempre el mismo estado. Abierto o cerrado es una
  48  |  * preferencia guardada por usuario (drawer-open-index, boost/layout/drawers.php:34) que sobrevive entre corridas: no es
  49  |  * parte de la pantalla que se protege. En móvil no aplica: drawers.js:328 lo cierra al cargar sin mirar la preferencia.
  50  |  */
  51  | export async function abrirIndiceCurso(page:
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
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Close course index' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByRole('button', { name: 'Close course index' }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'Close course index' })

```

```yaml
- status
- link "Salta al contenido principal":
  - /url: "#maincontent"
- navigation "Navegación del sitio":
  - link "Viaro":
    - /url: http://localhost:8090/my/
  - menubar:
    - menuitem "Área personal"
  - switch "Modo de edición"
  - text: Modo de edición
  - button "Mostrar la ventana de notificaciones cuando no hay ninguna"
  - button "Mostrar/ocultar cajón de mensajería"
  - button "Menú de usuario":
    - img "Paula Profesora": PP
    - text: 
- button "Abrir índice del curso"
- banner:
  - heading "Curso QA de Exámenes" [level=1]
- navigation "Menú de Curso":
  - menubar:
    - menuitem "Curso"
    - menuitem "Configuración"
    - menuitem "Participantes"
    - menuitem "Calificaciones"
    - menuitem "Actividades"
    - menuitem "Más "
- main:
  - heading "Nuevo Cuestionario" [level=2]
  - button "Expandir todo"
  - group "General":
    - text: General
    - button "General" [expanded]
    - text: Nombre
    - textbox "Nombre"
    - text: Descripción
    - application:
      - menubar
      - group [disabled]:
        - toolbar [disabled]
      - iframe
      - group "Element Path"
      - button
      - link "Build with TinyMCE":
        - /url: https://www.tiny.cloud/powered-by-tiny?utm_campaign=poweredby&utm_source=tiny&utm_medium=referral&utm_content=v7
        - text: Build with
        - img
      - separator "Pulse las teclas de flechas arriba y abajo para cambiar el tamaño del editor.":
        - img
    - checkbox "Muestra la descripción en la página del curso"
    - text: Muestra la descripción en la página del curso
    - button "Ayuda":
      - img "Ayuda con Muestra la descripción en la página del curso": 
  - group "Temporalización":
    - text: Temporalización
    - button "Temporalización"
  - group "Calificación":
    - text: Calificación
    - button "Calificación"
  - group "Esquema":
    - text: Esquema
    - button "Esquema"
  - group "Comportamiento de las preguntas":
    - text: Comportamiento de las preguntas
    - button "Comportamiento de las preguntas"
  - group "Opciones de revisión":
    - text: Opciones de revisión
    - button "Opciones de revisión"
    - button "Ayuda":
      - img "Ayuda con Opciones de revisión": 
  - group "Apariencia":
    - text: Apariencia
    - button "Apariencia"
  - group "Safe Exam Browser":
    - text: Safe Exam Browser
    - button "Safe Exam Browser"
  - group "Restricciones extra sobre los intentos":
    - text: Restricciones extra sobre los intentos
    - button "Restricciones extra sobre los intentos"
  - group "Retroalimentación global":
    - text: Retroalimentación global
    - button "Retroalimentación global"
    - button "Ayuda":
      - img "Ayuda con Retroalimentación global": 
  - group "Ajustes comunes del módulo":
    - text: Ajustes comunes del módulo
    - button "Ajustes comunes del módulo"
  - group "Restricciones de acceso":
    - text: Restricciones de acceso
    - button "Restricciones de acceso"
  - group "Marcas":
    - text: Marcas
    - button "Marcas"
  - group "Competencias":
    - text: Competencias
    - button "Competencias"
  - checkbox "Enviar notificación de actualización de contenido"
  - text: Enviar notificación de actualización de contenido
  - button "Ayuda":
    - img "Ayuda con Enviar notificación de actualización de contenido": 
  - button "Guardar cambios y regresar al curso"
  - button "Guardar cambios y mostrar"
  - button "Cancelar"
- contentinfo:
  - button "Mostrar pie de página"
```

# Test source

```ts
  1   | // Soporte exclusivo de las pruebas de spec-0. Complementa factory/regresion/helpers.ts (que este spec no puede editar).
  2   | // Selectores tomados del código de Moodle 5.3 en entorno/.moodle-src/. Las aserciones que deciden si un criterio se
  3   | // cumple están en los .spec.ts; acá solo hay esperas y comprobaciones de que cada paso auxiliar terminó bien.
  4   | import { expect, type Locator, type Page } from '@playwright/test';
  5   | import { bloquePregunta } from '../../../factory/regresion/helpers';
  6   | 
  7   | export type TipoPregunta = 'multichoice' | 'truefalse' | 'essay';
  8   | export type Categoria = { id: string; contexto: string };
  9   | 
  10  | type ConfigMoodle = { courseId: number; contextid: number; sesskey: string };
  11  | 
  12  | const configMoodle = (page: Page): Promise<ConfigMoodle> =>
  13  |   page.evaluate(() => (window as unknown as { M: { cfg: ConfigMoodle } }).M.cfg);
  14  | 
  15  | /** Nombre único que no contiene "Examen de regresión", para que abrirQuiz nunca tome este examen por QUIZ-REG. */
  16  | export const nombreUnico = (prefijo: string, proyecto: string) => `${prefijo} ${proyecto} ${Date.now()}`;
  17  | 
  18  | /**
  19  |  * TinyMCE crea su iframe oculto y lo muestra al terminar de cargar sus módulos, lo que puede superar los 5 s por defecto
  20  |  * de expect con el servidor bajo carga. Es una espera de carga: la aserción sobre el editor no cambia.
  21  |  */
  22  | export const ESPERA_EDITOR = 30_000;
  23  | 
  24  | /**
  25  |  * Espera a que terminen de inicializarse los módulos AMD de la página (misma señal que usa Behat y enviarIntento() de
  26  |  * helpers.ts). Sustituye a 'networkidle', que en Moodle nunca se cumple por sus p

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
5. Nunca reimplementes `login()` ni `prepararCaptura()`, ni los envuelvas con reintentos o esperas propias, y no uses `'networkidle'`.
   Si ya existe una copia en `salidas/spec-0/pruebas/`, bórrala y usá el helper. Si un helper es la causa, decilo en tu respuesta:
   lo arregla la fábrica, no la prueba.

Respondé con: causa raíz encontrada, qué cambiaste y por qué.
