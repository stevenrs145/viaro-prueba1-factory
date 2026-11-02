# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-1/pruebas/reconocimiento.spec.ts >> [Spec 1] reconocimiento obligatorio >> [CA-1][CA-3] camino completo: el profesor configura, el estudiante acepta, responde y envía @requiere-feature
- Location: salidas/spec-1/pruebas/reconocimiento.spec.ts:293:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#id_reconocimientoenabled')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('#id_reconocimientoenabled') with timeout 5000ms
  - waiting for locator('#id_reconocimientoenabled')

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
        - link "General":
          - /url: http://localhost:8090/course/section.php?id=1
      - listitem:
        - text: /
        - link "Examen de regresión":
          - /url: http://localhost:8090/mod/quiz/view.php?id=2
      - listitem: / Configuración
  - heading "Examen de regresión" [level=1]
- navigation "Menú de Actividad":
  - menubar:
    - menuitem "Cuestionario"
    - menuitem "Configuración"
    - menuitem "Más "
- main:
  - heading "Editar ajustes" [level=2]
  - button "Expandir todo"
  - group "General":
    - text: General
    - button "General" [expanded]
    - text: Nombre
    - textbox "Nombre": Examen de regresión
    - text: Descripción
    - textbox "Descripción": <p>Examen de práctica con preguntas de álgebra, geometría e historia.</p>
    - text: Formato Descripción
    - combobox "Formato Descripción":
      - option "Formato HTML"
      - option "Formato automático" [selected]
      - option "Formato de texto plano"
      - option "Formato Markdown"
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
    - button "Restricciones extra sobre los intentos" [expanded]
    - text: Se requiere contraseña
    - button "Ayuda":
      - img "Ayuda con Se requiere contraseña": 
    - link "Haz click para insertar texto Editar contraseña":
      - /url: "#"
      - emphasis: Haz click para insertar texto
      - img "Editar contraseña": 
    - link "Revelar":
      - /url: "#"
      - img "Revelar": 
    - button "Mostrar más..."
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
  - link "Documentación para esta página":
    - /url: https://docs.moodle.org/503/es/mod/quiz/mod
  - link "Contactar con el soporte del sitio":
    - /url: http://localhost:8090/user/contactsitesupport.php
  - text: Usted se ha identificado como
  - link "Paula Profesora":
    - /url: http://localhost:8090/user/profile.php?id=3
  - text: (
  - link "Cerrar sesión":
    - /url: http://localhost:8090/login/logout.php?sesskey=BJ2G9GcMLr
  - text: )
  - link "Resumen de retención de datos":
    - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
  - link "Cambiar al tema estándar":
    - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fcourse%2Fmodedit.php%3Freturn%3D1%26amp%3Bupdate%3D2&device=default&sesskey=BJ2G9GcMLr
  - text: Desarrollado por
  - link "Moodle":
    - /url: https://moodle.com
```

# Test source

```ts
  1   | // Spec 1: reconocimiento obligatorio antes de iniciar un quiz (quizaccess_reconocimiento).
  2   | // La configuración se cambia desde la UI y cada prueba la deja desactivada en su `finally`: el examen es compartido.
  3   | // Toda prueba que abre un intento lo envía: un intento abierto haría que la siguiente pasada no viera el prechequeo.
  4   | import { test, expect, type Locator, type Page } from '@playwright/test';
  5   | import {
  6   |   abrirQuiz, bloquePregunta, botonIntento, enviarIntento, esperarJS, login, prepararCaptura, siguientePagina,
  7   | } from '../../../factory/regresion/helpers';
  8   | 
  9   | const CON_RECONOCIMIENTO = 'estudiante5';
  10  | const SIN_RECONOCIMIENTO = 'estudiante6';
  11  | 
  12  | const TEXTO = 'Declaro que resolveré este examen sin ayuda de terceros.';
  13  | const AVISO = 'Antes de iniciar el intento deberá aceptar un reconocimiento.';
  14  | const ERROR_ACEPTAR = 'Debe aceptar el reconocimiento para iniciar el intento.';
  15  | const ERROR_TEXTO_VACIO = 'Escriba el texto del reconocimiento.';
  16  | 
  17  | const activado = (page: Page) => page.locator('#id_reconocimientoenabled');
  18  | const texto = (page: Page) => page.locator('#id_reconocimientotext');
  19  | const formularioPrechequeo = (page: Page) => page.locator('#mod_quiz_preflight_form');
  20  | 
  21  | /** Abre los ajustes del examen como profesor, con la sección donde mod_form.php agrega las reglas de acceso desplegada. */
  22  | async function abrirAjustes(page: Page) {
  23  |   await login(page, 'profesor');
  24  |   const cmid = await abrirQuiz(page);
  25  |   await page.goto(`/course/modedit.php?update=${cmid}&return=1`);
  26  |   await esperarJS(page);
  27  |   if (!(await page.locator('#id_securitycontainer').isVisible())) {
  28  |     await page.locator('a.fheader[aria-controls="id_securitycontainer"]').click();
  29  |   }
> 30  |   await expect(activado(page)).toBeVisible();
      |                                ^ Error: expect(locator).toBeVisible() failed
  31  | }
  32  | 
  33  | /**
  34  |  * En el viewport móvil el pie fijo de mod_form deja el botón "Guardar" fuera del viewport aunque Playwright haga scroll,
  35  |  * así que `click()` nunca pasa la comprobación de actionability. Se dispara el click del propio botón (envía el formulario
  36  |  * con ese botón como remitente y ejecuta la validación de Moodle); es solo la acción del docente, no lo que se verifica.
  37  |  */
  38  | async function pulsarGuardar(page: Page) {
  39  |   const boton = page.locator('#id_submitbutton');
  40  |   await expect(boton).toBeAttached();
  41  |   await boton.evaluate((el: HTMLElement) => el.click());
  42  | }
  43  | 
  44  | async function guardarAjustes(page: Page) {
  45  |   await pulsarGuardar(page);
  46  |   await expect(page).toHaveURL(/mod\/quiz\/view\.php\?id=\d+/);
  47  | }
  48  | 
  49  | async function activar(page: Page, valor: string) {
  50  |   await abrirAjustes(page);
  51  |   await activado(page).selectOption('1');
  52  |   await texto(page).fill(valor);
  53  |   await guardarAjustes(page);
  54  | }
  55  | 
  56  | async function desactivar(page: Page) {
  57  |   await abrirAjustes(page);
  58  |   await activado(page).selectOption('0');
  59  |   await guardarAjustes(page);
  60  | }
  61  | 
  62  | /** Entra como estudiante y abre el diálogo de prechequeo con el botón de intento. */
  63  | async function abrirDialogo(page: Page, usuario: string): Promise<Locator> {
  64  |   await login(page, usuario);
  65  |   await abrirQuiz(page);
  66  |   await esperarJS(page);
  67  |   const dialogo = page.locator('.mod_quiz_preflight_popup');
  68  |   // preflightcheck.js crea el diálogo en un Y.use asíncrono y enlaza el botón justo después: pending_js no lo cubre.
  69  |   await expect(dialogo.locator('#mod_quiz_preflight_form')).toHaveCount(1);
  70  |   await botonIntento(page).click();
  71  |   await expect(dialogo.locator('#mod_quiz_preflight_form')).toBeVisible();
  72  |   return dialogo;
  73  | }
  74  | 
  75  | async function aceptar(page: Page, dialogo: Locator) {
  76  |   await dialogo.locator('#id_reconocimientoaceptado').check();
  77  |   await dialogo.locator('[name="submitbutton"]').click();
  78  |   await expect(page).toHaveURL(/mod\/quiz\/attempt\.php/);
  79  |   await expect(bloquePregunta(page, 1)).toBeVisible();
  80  | }
  81  | 
  82  | /** Desde la primera página: el botón para terminar solo existe en la última (en las otras es un enlace). */
  83  | async function terminarDesdePrimeraPagina(page: Page) {
  84  |   await siguientePagina(page);
  85  |   await expect(bloquePregunta(page, 3)).toBeVisible();
  86  |   await siguientePagina(page);
  87  |   await expect(bloquePregunta(page, 5)).toBeVisible();
  88  |   await enviarIntento(page);
  89  | }
  90  | 
  91  | async function expectSinIntentoAbierto(page: Page) {
  92  |   await expect(page).toHaveURL(/mod\/quiz\/view\.php/);
  93  |   await expect(page.getByRole('button', { name: /continuar el último intento/i })).toHaveCount(0);
  94  |   await expect(botonIntento(page)).toBeVisible();
  95  | }
  96  | 
  97  | async function urlDeInicioDirecto(page: Page, cmid: number) {
  98  |   const sesskey = await page.evaluate(() => (window as any).M.cfg.sesskey);
  99  |   return `/mod/quiz/startattempt.php?cmid=${cmid}&sesskey=${sesskey}`;
  100 | }
  101 | 
  102 | test.describe('[Spec 1] reconocimiento obligatorio', () => {
  103 |   test('[CA-1] con el reconocimiento activado el botón de intento abre el diálogo y no muestra preguntas @requiere-feature', async ({ page }) => {
  104 |     try {
  105 |       await activar(page, TEXTO);
  106 |       const dialogo = await abrirDialogo(page, CON_RECONOCIMIENTO);
  107 |       await expect(dialogo.locator('.quizaccess_reconocimiento_texto')).toHaveText(TEXTO);
  108 |       await expect(page.getByText(AVISO)).toBeVisible();
  109 |       await expect(page).toHaveURL(/mod\/quiz\/view\.php/);
  110 |       await expect(page.locator('.que')).toHaveCount(0);
  111 |     } finally {
  112 |       await desactivar(page);
  113 |     }
  114 |   });
  115 | 
  116 |   test('[CA-1] enviar sin marcar la casilla muestra el error y no crea intento @requiere-feature @camino-error', async ({ page }) => {
  117 |     try {
  118 |       await activar(page, TEXTO);
  119 |       const dialogo = await abrirDialogo(page, CON_RECONOCIMIENTO);
  120 |       await dialogo.locator('[name="submitbutton"]').click();
  121 | 
  122 |       await expect(page).toHaveURL(/mod\/quiz\/startattempt\.php/);
  123 |       await expect(page.locator('#id_error_reconocimientoaceptado')).toHaveText(ERROR_ACEPTAR);
  124 |       await expect(page.locator('.que')).toHaveCount(0);
  125 | 
  126 |       await abrirQuiz(page);
  127 |       await expectSinIntentoAbierto(page);
  128 |     } finally {
  129 |       await desactivar(page);
  130 |     }
```