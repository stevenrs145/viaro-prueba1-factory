# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-4/pruebas/intentos-restantes.spec.ts >> [CA-1] @requiere-feature con límite 3 y un intento en curso, el mensaje lo aclara y se puede continuar
- Location: salidas/spec-4/pruebas/intentos-restantes.spec.ts:124:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('.quizinfo p').filter({ hasText: /\bte quedan?\s/i })
Expected: "Te quedan 2 intentos además del que está en curso."
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" locator('.quizinfo p').filter({ hasText: /\bte quedan?\s/i }) with timeout 5000ms
  - waiting for locator('.quizinfo p').filter({ hasText: /\bte quedan?\s/i })

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
    - img "Estudiante Número 11": EN
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
      - listitem: / Examen de regresión
  - heading "Examen de regresión" [level=1]
- paragraph: Examen de práctica con preguntas de álgebra, geometría e historia.
- main:
  - button "Continuar el último intento"
  - paragraph: "Intentos permitidos: 3"
  - paragraph: "Método de calificación: Calificación más alta"
  - heading "Sus intentos" [level=3]
  - list:
    - listitem:
      - heading "Intento 1" [level=4]
      - table "Resumen de intento 1":
        - caption: Resumen de intento 1
        - rowgroup:
          - row "Estado En curso":
            - rowheader "Estado"
            - cell "En curso"
          - row "Comenzado martes, 3 de noviembre de 2026, 01:52":
            - rowheader "Comenzado"
            - cell "martes, 3 de noviembre de 2026, 01:52"
  - link "Siguiente":
    - /url: http://localhost:8090/r.php/course/cms/2/next
- contentinfo:
  - link "Contactar con el soporte del sitio":
    - /url: http://localhost:8090/user/contactsitesupport.php
  - text: Usted se ha identificado como
  - link "Estudiante Número 11":
    - /url: http://localhost:8090/user/profile.php?id=14
  - text: (
  - link "Cerrar sesión":
    - /url: http://localhost:8090/login/logout.php?sesskey=27HSNWveUb
  - text: )
  - link "Resumen de retención de datos":
    - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
  - link "Cambiar al tema estándar":
    - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fmod%2Fquiz%2Fview.php%3Fid%3D2&device=default&sesskey=27HSNWveUb
  - text: Desarrollado por
  - link "Moodle":
    - /url: https://moodle.com
```

# Test source

```ts
  30  |   // En móvil la tabla del informe desborda el ancho y el modal se desplaza al hacer scroll: el clic real nunca ve el botón
  31  |   // estable. Se despacha el clic sobre el botón del modal; que el borrado ocurrió lo comprueba el expect siguiente.
  32  |   await page.locator('.modal-footer [data-action="delete"]').dispatchEvent('click');
  33  |   await expect(casillas).toHaveCount(0);
  34  | }
  35  | 
  36  | /** Como profesor: quita el override de estudiante11, si existe. */
  37  | async function quitarOverride(page: Page) {
  38  |   await page.goto(`/mod/quiz/overrides.php?cmid=${cmid}&mode=user`);
  39  |   await esperarJS(page);
  40  |   const fila = page.locator('#quizoverrides tr', { hasText: APELLIDO });
  41  |   const eliminar = fila.locator('a[href*="overridedelete.php"]');
  42  |   if (await eliminar.count() === 0) return;
  43  |   await eliminar.click();
  44  |   await page.locator('form[action*="overridedelete.php"] button[type="submit"]').click();
  45  |   await expect(page).toHaveURL(/overrides\.php/);
  46  |   await expect(fila).toHaveCount(0);
  47  | }
  48  | 
  49  | /** Como profesor: da a estudiante11 un límite propio de intentos. El ajuste general del quiz no cambia. */
  50  | async function ponerLimite(page: Page, limite: number) {
  51  |   await login(page, 'profesor');
  52  |   await page.goto(`/mod/quiz/overrideedit.php?cmid=${cmid}&action=adduser`);
  53  |   await esperarJS(page);
  54  |   const usuario = page.locator('#fitem_id_userid');
  55  |   await usuario.getByRole('combobox').fill(APELLIDO);
  56  |   await esperarJS(page);
  57  |   await usuario.getByRole('option', { name: new RegExp(APELLIDO) }).click();
  58  |   await esperarJS(page);
  59  |   await expect(page.locator('#id_userid')).toHaveValue(/^\d+$/);
  60  |   await page.locator('#id_attempts').selectOption(String(limite));
  61  |   await page.locator('#id_submitbutton').click();
  62  |   await expect(page).toHaveURL(/overrides\.php/);
  63  |   await expect(page.locator('#quizoverrides tr', { hasText: APELLIDO })).toBeVisible();
  64  | }
  65  | 
  66  | /** Como estudiante: entra al primer intento o al siguiente. */
  67  | async function iniciarIntento(page: Page) {
  68  |   await botonIntento(page).click();
  69  |   await expect(page).toHaveURL(/attempt\.php/);
  70  |   await esperarJS(page);
  71  | }
  72  | 
  73  | /** Como estudiante: inicia un intento y lo envía. El botón de terminar solo está en la última página (3 páginas). */
  74  | async function hacerIntento(page: Page) {
  75  |   await iniciarIntento(page);
  76  |   await siguientePagina(page);
  77  |   await esperarJS(page);
  78  |   await siguientePagina(page);
  79  |   await esperarJS(page);
  80  |   await enviarIntento(page);
  81  | }
  82  | 
  83  | async function limpiar(page: Page) {
  84  |   await login(page, 'profesor');
  85  |   cmid = await abrirQuiz(page);
  86  |   await borrarIntentos(page);
  87  |   await quitarOverride(page);
  88  | }
  89  | 
  90  | test.beforeEach(async ({ page }) => {
  91  |   await limpiar(page);
  92  | });
  93  | 
  94  | test.afterEach(async ({ page }) => {
  95  |   await limpiar(page);
  96  | });
  97  | 
  98  | test('[CA-1] @requiere-feature con límite 3 y sin intentos, el estudiante ve que le quedan 3', async ({ page }) => {
  99  |   await ponerLimite(page, 3);
  100 |   await login(page, ESTUDIANTE);
  101 |   await abrirQuiz(page);
  102 |   await expect(mensajeIntentos(page)).toHaveText('Te quedan 3 intentos.');
  103 |   await expect(page).toHaveScreenshot('spec-4-quedan-intentos.png', { fullPage: true, mask: await prepararCaptura(page) });
  104 | });
  105 | 
  106 | test('[CA-1] @requiere-feature con límite 3 y un intento enviado, el estudiante ve que le quedan 2', async ({ page }) => {
  107 |   await ponerLimite(page, 3);
  108 |   await login(page, ESTUDIANTE);
  109 |   await abrirQuiz(page);
  110 |   await hacerIntento(page);
  111 |   await abrirQuiz(page);
  112 |   await expect(mensajeIntentos(page)).toHaveText('Te quedan 2 intentos.');
  113 | });
  114 | 
  115 | test('[CA-1] @requiere-feature con límite 2 y un intento enviado, el mensaje va en singular', async ({ page }) => {
  116 |   await ponerLimite(page, 2);
  117 |   await login(page, ESTUDIANTE);
  118 |   await abrirQuiz(page);
  119 |   await hacerIntento(page);
  120 |   await abrirQuiz(page);
  121 |   await expect(mensajeIntentos(page)).toHaveText('Te queda 1 intento.');
  122 | });
  123 | 
  124 | test('[CA-1] @requiere-feature con límite 3 y un intento en curso, el mensaje lo aclara y se puede continuar', async ({ page }) => {
  125 |   await ponerLimite(page, 3);
  126 |   await login(page, ESTUDIANTE);
  127 |   await abrirQuiz(page);
  128 |   await iniciarIntento(page);
  129 |   await abrirQuiz(page);
> 130 |   await expect(mensajeIntentos(page)).toHaveText('Te quedan 2 intentos además del que está en curso.');
      |                                       ^ Error: expect(locator).toHaveText(expected) failed
  131 |   await expect(page.getByRole('button', { name: 'Continuar el último intento' })).toBeVisible();
  132 | });
  133 | 
  134 | test('[CA-2] @requiere-feature el número baja después de enviar un intento', async ({ page }) => {
  135 |   await ponerLimite(page, 3);
  136 |   await login(page, ESTUDIANTE);
  137 |   await abrirQuiz(page);
  138 |   await expect(mensajeIntentos(page)).toHaveText('Te quedan 3 intentos.');
  139 |   await hacerIntento(page);
  140 |   await abrirQuiz(page);
  141 |   await expect(mensajeIntentos(page)).toHaveText('Te quedan 2 intentos.');
  142 |   await expect(page.getByText('Te quedan 3 intentos.')).toHaveCount(0);
  143 | });
  144 | 
  145 | test('[CA-3] @requiere-feature con límite 1 y ese intento enviado, el estudiante ve que no le quedan intentos', async ({ page }) => {
  146 |   await ponerLimite(page, 1);
  147 |   await login(page, ESTUDIANTE);
  148 |   await abrirQuiz(page);
  149 |   await hacerIntento(page);
  150 |   await abrirQuiz(page);
  151 |   await expect(mensajeIntentos(page)).toHaveText('No te quedan intentos.');
  152 |   await expect(botonIntento(page)).toHaveCount(0);
  153 |   await expect(page).toHaveScreenshot('spec-4-sin-intentos.png', { fullPage: true, mask: await prepararCaptura(page) });
  154 | });
  155 | 
  156 | test('[CA-3] @requiere-feature con límite 1 y ese intento en curso, el mensaje lo aclara y se puede continuar', async ({ page }) => {
  157 |   await ponerLimite(page, 1);
  158 |   await login(page, ESTUDIANTE);
  159 |   await abrirQuiz(page);
  160 |   await iniciarIntento(page);
  161 |   await abrirQuiz(page);
  162 |   await expect(mensajeIntentos(page)).toHaveText('No te quedan intentos después del que está en curso.');
  163 |   await page.getByRole('button', { name: 'Continuar el último intento' }).click();
  164 |   await expect(page).toHaveURL(/attempt\.php/);
  165 | });
  166 | 
  167 | test('[CA-4] en un quiz sin límite no aparece ningún mensaje y el botón de intento funciona', async ({ page }) => {
  168 |   await login(page, ESTUDIANTE);
  169 |   await abrirQuiz(page);
  170 |   // QUIZ-REG sin límite solo informa el método de calificación: un párrafo más sería un mensaje nuevo.
  171 |   await expect(page.locator('.quizinfo p')).toHaveCount(1);
  172 |   await expect(mensajeEnLaPagina(page)).toHaveCount(0);
  173 |   await expect(page).toHaveScreenshot('spec-4-sin-limite.png', { fullPage: true, mask: await prepararCaptura(page) });
  174 |   await botonIntento(page).click();
  175 |   await expect(page).toHaveURL(/attempt\.php/);
  176 | });
  177 | 
  178 | test('[CA-4] en un quiz sin límite, tras enviar un intento sigue sin aparecer ningún mensaje', async ({ page }) => {
  179 |   await login(page, ESTUDIANTE);
  180 |   await abrirQuiz(page);
  181 |   await hacerIntento(page);
  182 |   await abrirQuiz(page);
  183 |   await expect(page.locator('.quizinfo p')).toHaveCount(1);
  184 |   await expect(mensajeEnLaPagina(page)).toHaveCount(0);
  185 |   await expect(page.getByRole('button', { name: 'Reintentar el cuestionario' })).toBeVisible();
  186 | });
  187 | 
  188 | test('[CA-4] fuera de alcance: con el override vigente, el profesor no ve el mensaje', async ({ page }) => {
  189 |   await ponerLimite(page, 3);
  190 |   await abrirQuiz(page);
  191 |   await expect(page.locator('.quizinfo')).toBeVisible();
  192 |   await expect(mensajeEnLaPagina(page)).toHaveCount(0);
  193 | });
  194 | 
```