Sos el ANALISTA de una fábrica de software sobre el módulo de exámenes (Quiz) de Moodle 5.3.
Tu única salida es un PLAN en JSON. No escribís código. Podés leer el código fuente de Moodle en
`entorno/.moodle-src/` (es la instancia real) para verificar puntos de extensión antes de decidir.

# Spec de producto (entrada; dice QUÉ, no CÓMO)
---
id: spec-3
titulo: Reemplazo del cierre del intento por un resumen por tema
naturaleza: reemplaza
---

# Spec 3 · Reemplazo del cierre del intento por un resumen por tema

## Intención
Hoy, al terminar un intento, el estudiante ve el bloque de retroalimentación general que trae Moodle de fábrica, que es un texto único para todo el examen. Ese bloque **ya no sirve** y queremos otro en su lugar: un resumen que le muestre cómo le fue **agrupado por el tema al que pertenece cada pregunta**, para que sepa qué estudiar.

Esto **no es agregar una sección más**. Lo viejo se va y lo nuevo ocupa su lugar.

## Criterios de aceptación
- CA-1: al terminar el intento, el estudiante ve su desempeño agrupado por tema.
- CA-2: el bloque de retroalimentación general anterior **ya no aparece** donde aparecía.
- CA-3: **no queda nada muerto del bloque anterior**: ni código sin uso, ni configuración huérfana, ni una opción en la interfaz que ya no hace nada. Esto se verifica en el diff.
- CA-4: el resto de la pantalla de cierre del intento (nota, revisión de respuestas, navegación) sigue funcionando igual.
- CA-5: se entrega con pruebas automáticas derivadas de estos criterios, funcionales y visuales, ejecutadas y en verde.

## Escenarios
- Dado un examen con preguntas de tres temas distintos, cuando el estudiante termina el intento, entonces ve su resultado desglosado por esos tres temas y no ve el bloque anterior.
- Dado un examen ya existente que tenía retroalimentación general configurada, cuando el estudiante termina el intento, entonces ve el resumen por tema.

## Fuera de alcance
La retroalimentación por pregunta, que es otra cosa y se queda como está. Reportes del profesor.

## Bordes
Hay decisiones acá que el spec no resuelve a propósito. Resolvelas con criterio explícito o preguntá.

## Decisión de producto
Autorizado por producto el 2 de noviembre de 2026: las dos aserciones de spec-0 que exigen la fila "Retroalimentación" con el texto "Retro global: aprobado." (`02-estudiante-sin-ensayo.spec.ts` y `03-calificacion-manual.spec.ts`) pasan a exigir que la fila ya no exista, sin bajar la cantidad de asserts. Se declaran en `pruebas_afectadas` y quedan pendientes de aprobación humana en el PR.

## Restricciones
Reemplazo, no adición. Que las dos cosas convivan detrás de una opción de configuración **no cumple** el CA-2.


# Conocimiento verificado de la plataforma
# Conocimiento de plataforma: Moodle 5.3 (módulo Quiz)

Este archivo se inyecta en cada corrida de la fábrica. Contiene hechos verificados en la instancia
(no supuestos). Si una afirmación de acá resulta falsa, se corrige acá, no en el prompt.

## Estructura de código (cambió en 5.1)
- Raíz del repo: `config.php`, `vendor/` (Composer, obligatorio), `admin/cli/*.php` (scripts CLI).
- `public/` es el webroot: todo el código de plugins vive bajo `public/`.
  - Regla de acceso de quiz: `public/mod/quiz/accessrule/<nombre>/`  (componente `quizaccess_<nombre>`)
  - Plugin local: `public/local/<nombre>/` (componente `local_<nombre>`)
  - Reporte de quiz: `public/mod/quiz/report/<nombre>/` (`quiz_<nombre>`)
  - Bloque: `public/blocks/<nombre>/` (`block_<nombre>`)
- CLI: `php admin/cli/upgrade.php --non-interactive`, `php admin/cli/purge_caches.php`,
  `php admin/cli/adhoc_task.php --execute`, `php admin/cli/uninstall_plugins.php --plugins=x --run`.
- PHP 8.3, PostgreSQL 17.

## Regla de oro
NUNCA se modifica nada fuera del directorio del plugin generado. El pipeline lo verifica con
`git status` sobre el código de Moodle y bloquea si hay cambios fuera de las rutas de plugins.

## Elegir la capa (de más específica a más general)
| Necesidad | Capa | Punto de extensión |
|---|---|---|
| Condicionar/impedir el inicio o la continuación de un intento, pedir algo antes de empezar | Regla de acceso `quizaccess_*` | `mod_quiz\local\access_rule_base`: `make()`, `is_preflight_check_required()`, `add_preflight_check_form_fields()`, `validate_preflight_check()`, `notify_preflight_check_passed()`, `current_attempt_finished()`, `prevent_access()`, `description()`; configuración por quiz con `add_settings_form_fields()`, `save_settings()`, `delete_settings()`, `get_settings_sql()` |
| Reaccionar a algo que pasó (envío de intento, calificación) | `local_*` con observer | `db/events.php`. Eventos: `\mod_quiz\event\attempt_submitted`, `attempt_graded`, `attempt_manual_grading_completed`, `attempt_regraded`, `attempt_abandoned`, `attempt_becameoverdue`, `attempt_started`, `attempt_reviewed` |
| Trabajo lento o que depende de terceros (HTTP) | Tarea ad hoc | `\core\task\adhoc_task` + `\core\task\manager::queue_adhoc_task()`. El cron corre en un contenedor aparte. Reintento nativo: lanzar excepción => backoff; `set_attempts_available()` |
| Configuración del administrador | `settings.php` del plugin | `admin_setting_*` |
| Agregar/quitar campos del formulario de una actividad | Hooks de formulario | `core_course\hook\after_form_definition`, `after_form_definition_after_data`, `after_form_submission` (en `db/hooks.php`) |
| Agregar HTML a una página existente | Hooks de salida | `core\hook\output\before_footer_html_generation`, `after_standard_main_region_html_generation`, `before_standard_top_of_body_html_generation`. Filtrar por `$PAGE->pagetype` (p. ej. `mod-quiz-review`) |
| Persistencia propia | `db/install.xml` + `db/upgrade.php` | Tablas `<plugin>_*`. Limpieza en `db/uninstall.php` |
| Datos personales guardados o enviados fuera | Privacy API | `classes/privacy/provider.php`; envío externo => `add_external_location_link()` |

## Hechos del Quiz verificados en 5.3
- Retroalimentación global (overall feedback): tabla `quiz_feedback` (rangos de nota: `mingrade`, `maxgrade`,
  `feedbacktext`). Se muestra SOLO si la opción de revisión `overallfeedback` está activa en el momento
  correspondiente (campo `quiz.reviewoverallfeedback`, bitmask de momentos). Lugares donde aparece:
  1. Revisión del intento: `mod_quiz\output\attempt_summary_information::create_for_attempt()` fila `feedback`.
  2. Página del quiz (view.php): columna de la tabla de intentos (`renderer.php` ~l.1212) y bloque bajo el resultado (~l.1305).
  3. Formulario del quiz: sección de retroalimentación global y casillas "Retroalimentación global" en Opciones de revisión.
- Retroalimentación POR PREGUNTA (en la UI en español "Retroalimentación general") es otra cosa: es del banco de preguntas.
- Bancos de preguntas en 5.x son instancias de `mod_qbank`; las categorías cuelgan del contexto del banco.
- Calificación por elementos (grade items del quiz, `quiz_grade_items`) existe de forma nativa.
- Con preguntas de ensayo, al enviar el intento la nota queda pendiente hasta la calificación manual
  (`attempt_manual_grading_completed`).
- Moodle bloquea por defecto peticiones salientes a rangos privados y a puertos distintos de 80/443
  (`curlsecurityblockedhosts`, `curlsecurityallowedport`). Usar la clase `curl` de Moodle o `\core\http_client`.

## Entorno de la fábrica
- Moodle: http://localhost:8090 — admin / Viaro.2026 ; profesor ; estudiante1..12 (misma clave).
- Estudiantes por spec (para que las pruebas de distintos specs no compartan intentos):
  regresión (spec-0): estudiante1..4 · spec-1: estudiante5..6 · spec-2: estudiante7..8 · spec-3: estudiante9..10 ·
  cualquier spec nuevo: estudiante11 · prueba de humo: estudiante12.
- La UI está en español (es), con coma decimal: "9,17 de 10,00 (91,67%)", "1,00/6,00". Botones verificados: "Intento de cuestionario",
  "Continuar el último intento", "Reintentar el cuestionario", "Siguiente página", "Página anterior", "Terminar intento...", "Enviar todo y terminar"
  (y de nuevo en el modal de confirmación). Revisión: tabla `table.quizreviewsummary` con filas Estado/Comenzado/Completado/Duración/Puntos/Calificación/Retroalimentación.
  Con un ensayo sin calificar: Calificación = "Sin calificar aún" y NO aparecen Puntos ni Retroalimentación. V/F: "Verdadero"/"Falso".
  Las preguntas sembradas tienen la opción correcta primero: ALG-1 "12", GEO-1 "6"; ALG-2, GEO-2 e HIS-1 son "Verdadero".
- Informe de intentos del profesor: /mod/quiz/report.php?id=<cmid>&mode=overview ; calificación manual: mode=grading.
- Curso `QA101`; examen `QUIZ-REG` (6 preguntas: 3 temas = categorías Álgebra/Geometría/Historia; incluye ensayo;
  tiene retroalimentación global configurada).
- Receptor externo de pruebas: desde Moodle `http://receptor/`, desde el host `http://localhost:8091/`.
  `POST /_control {"mode": "...", "times": N}` fuerza fallos; `GET /_recibidos` muestra lo recibido.
- Ejecutar PHP dentro de Moodle: `docker compose -f entorno/docker-compose.yml exec -T -u www-data web php <script>`.

## Pruebas en Moodle 5.3 (verificado)
- Nunca esperar `'networkidle'`: el índice del curso hace peticiones periódicas y no se cumple.
- El login se hace SIEMPRE con `login()`: `core/togglesensitive` reemplaza el input de la clave y borra lo escrito, y una
  petición de la página anterior puede invalidar el `logintoken`. Por eso Moodle responde "Unable to log in" con la clave correcta.
- Una página tiene su JS listo cuando `M.util.pending_js` está vacío: usar `esperarJS()` de los helpers al cargar y tras acciones con JS (filtros, autocompletar, modales). Hacer clic antes puede saltarse el manejador.
- Los cajones (índice del curso, bloques) guardan su estado por usuario en `drawer-open-*`. `reset` los borra; dentro de una corrida, cerrar uno afecta a las pruebas siguientes de ese usuario.


# Helpers de prueba disponibles (factory/regresion/helpers.ts)
```ts
// Helpers compartidos por TODAS las pruebas (regresión y las generadas por la fábrica).
// Selectores verificados contra Moodle 5.3 en la instancia (ver ia/bitacora.md). La IA de la fábrica
// debe usar estos helpers en vez de reinventar selectores.
import { expect, type Locator, type Page } from '@playwright/test';

export const CLAVE = 'Viaro.2026';
export const QUIZ_REG = 'Examen de regresión';
export const RECEPTOR = process.env.RECEPTOR_URL || 'http://localhost:8091';

/**
 * Espera a que el JS de Moodle termine: M.util.pending_js vacío es la señal que usa Behat. Usar tras cargar una página y
 * tras una acción que dispara JS (filtros, autocompletar, modales) antes de la siguiente acción: Playwright es más rápido.
 */
export async function esperarJS(page: Page) {
  await page.waitForLoadState('load');
  await page.waitForFunction(() => (window as any).M?.util?.pending_js?.length === 0);
}

export async function login(page: Page, usuario: string) {
  // Salir de la página ANTES de borrar cookies: al descargarse, Moodle lanza un POST a service.php
  // (core_message_get_unsent_message). Sin cookie, su respuesta fija otra MoodleSession e invalida el logintoken.
  await page.goto('about:blank');
  await page.context().clearCookies();
  await page.goto('/login/index.php', { waitUntil: 'domcontentloaded' });
  // core/togglesensitive reemplaza el input de la clave (outerHTML) al cargar y se pierde lo ya escrito:
  // hay que esperar a su botón antes de rellenar, o Moodle rechaza el login con la clave vacía.
  await expect(page.getByRole('button', { name: 'Alternar sensibilidad' })).toBeVisible();
  await page.fill('#username', usuario);
  await page.fill('#password', CLAVE);
  await expect(page.locator('#password')).toHaveValue(CLAVE);
  await page.click('#loginbtn');
  await expect(page.locator('#loginbtn')).toHaveCount(0);
}

/** Abre la página de un quiz del curso QA101 por su nombre visible. Devuelve el cmid. */
export async function abrirQuiz(page: Page, nombre = QUIZ_REG): Promise<number> {
  await page.goto('/course/view.php?name=QA101');
  await page.locator('a.aalink', { hasText: nombre }).first().click();
  await expect(page).toHaveURL(/mod\/quiz\/view\.php\?id=\d+/);
  return Number(new URL(page.url()).searchParams.get('id'));
}

/** Botón principal de la página del quiz (Intento de cuestionario / Continuar el último intento / Reintentar el cuestionario). */
export function botonIntento(page: Page): Locator {
  return page.getByRole('button', { name: /intento de cuestionario|continuar el último intento|reintentar el cuestionario/i });
}

/** Responde una pregunta de opción múltiple o V/F por el texto de la opción, dentro del bloque de la pregunta N (1-based, número visible). */
export async function elegir(page: Page, pregunta: number, opcion: string) {
  const q = bloquePregunta(page, pregunta);
  // Opción múltiple: el nombre accesible incluye la numeración ("1. One"); V/F no ("True").
  const esc = opcion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  await q.getByRole('radio', { name: new RegExp(`^([a-z0-9]+\\. )?${esc}$`, 'i') }).check();
}

/** Escribe en una pregunta de ensayo. Con TinyMCE el iframe es "<id del textarea>_ifr" (p. ej. q2:6_answer_id_ifr). */
export async function escribirEnsayo(page: Page, pregunta: number, texto: string) {
  const q = bloquePregunta(page, pregunta);
  const iframe = q.locator('iframe[id$="_answer_id_ifr"]');
  await expect(iframe.or(q.locator('textarea[name$="_answer"]:visible'))).toBeVisible();
  if (await iframe.count()) {
    const cuerpo = q.frameLocator('iframe[id$="_answer_id_ifr"]').locator('body');
    await cuerpo.click();
    await cuerpo.fill(texto);
  } else {
    await q.locator('textarea[name$="_answer"]').fill(texto);
  }
}

export function bloquePregunta(page: Page, numero: number): Locator {
  return page.locator('.que').filter({ has: page.locator('.qno', { hasText: new RegExp(`^${numero}$`) }) });
}

export async function siguientePagina(page: Page) {
  await page.getByRole('button', { name: 'Siguiente página' }).click();
  await page.waitForLoadState('domcontentloaded');
}

export async function paginaAnterior(page: Page) {
  await page.getByRole('button', { name: 'Página anterior' }).click();
  await page.waitForLoadState('domcontentloaded');
}

/** Desde cualquier página del intento: Terminar intento -> resumen -> Enviar todo y terminar -> confirmar en el modal. */
export async function enviarIntento(page: Page) {
  await page.getByRole('button', { name: /terminar intento/i }).click();
  await expect(page).toHaveURL(/summary\.php/);
  // Si se hace clic antes de que submission_confirmation.js enlace su manejador, se envía sin modal.
  await esperarJS(page);
  await page.getByRole('button', { name: 'Enviar todo y terminar' }).click();
  const confirmar = page.locator('.modal-footer button', { hasText: 'Enviar todo y terminar' });
  await expect(confirmar).toBeVisible({ timeout: 15_000 });
  await confirmar.click();
  await expect(page).toHaveURL(/review\.php/);
}

/** Tabla resumen de la pantalla de cierre/revisión del intento: valor de una fila por su encabezado (Estado, Puntos, Calificación, Retroalimentación...). */
export function filaResumen(page: Page, encabezado: string): Locator {
  return page.locator('table.quizreviewsummary tr').filter({ has: page.locator('th', { hasText: new RegExp(`^${encabezado}$`) }) }).locator('td');
}

/** Receptor externo (spec 2): controlar fallos y leer lo recibido. */
export async function receptor(page: Page, ruta: string, body?: unknown) {
  const r = body === undefined
    ? await page.request.get(`${RECEPTOR}${ruta}`)
    : await page.request.post(`${RECEPTOR}${ruta}`, { data: body });
  return r.json();
}

/**
 * Neutraliza lo que cambia legítimamente entre corridas ANTES de una captura:
 *  - quita foco y hover (tooltips)
 *  - devuelve máscaras para fechas, duraciones, temporizador y contadores de notificaciones.
 * Las máscaras tapan SOLO el valor dinámico (la celda), no la fila: si la fila desaparece, la captura lo detecta.
 */
export async function prepararCaptura(page: Page): Promise<Locator[]> {
  await page.mouse.move(0, 0);
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  // Sin 'networkidle': el índice del curso hace peticiones periódicas y nunca queda inactivo.
  // toHaveScreenshot ya espera a que la imagen sea estable.
  await esperarJS(page);
  await page.waitForFunction(() => {
    const tiny = (window as any).tinymce;
    return !tiny || tiny.get().every((editor: any) => editor.initialized);
  });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: `
    [data-qa-mascara], [data-qa-mascara] * { color: transparent !important; background: #c9d3d7 !important; border-color: #c9d3d7 !important; }
    /* En una captura de página completa, lo fijo a la pantalla aparecería en medio del contenido. */
    #sticky-footer, .stickyfooter { position: static !important; }
    .drawer-toggles, .btn-footer-popover, .tooltip { visibility: hidden !important; }
  ` });
  // Columnas de tablas cuyo encabezado indica un valor temporal: se marcan por el TEXTO del encabezado,
  // no por posición (la posición cambia entre informes y vistas).
  await page.evaluate((patron) => {
    const re = new RegExp(patron, 'i');
    // La tabla de resumen va en vertical: sus filas dinámicas se marcan abajo, una por una, y sus etiquetas quedan visibles.
    document.querySelectorAll('table:not(.quizreviewsummary)').forEach((t) => {
      const ths = Array.from(t.querySelectorAll('thead th, tr:first-child th'));
      ths.forEach((th, i) => {
        if (!re.test((th.textContent || '').trim())) return;
        t.querySelectorAll('tbody tr').forEach((tr) => tr.children[i]?.setAttribute('data-qa-mascara', 'tiempo'));
      });
    });
  }, '^(comenzado|completado|duración|enviado|tiempo|hora|estado)');
  // La máscara se pinta en la página y no con `mask`: Playwright no admite maskColor global y sale magenta en cada captura.
  const dinamicos = [filaResumen(page, 'Comenzado'), filaResumen(page, 'Completado'), filaResumen(page, 'Duración'),
    page.locator('#quiz-timer-wrapper'), page.locator('.popover-region .count-container')];
  for (const dinamico of dinamicos) {
    await dinamico.evaluateAll((els) => els.forEach((e) => e.setAttribute('data-qa-mascara', 'valor')));
  }
  return [];
}

```

# Qué tenés que decidir
1. **Capa correcta** sin tocar el core: tipo de plugin y componente (frankenstyle) y ruta bajo `public/`.
   Elegí la capa MÁS ESPECÍFICA que resuelva el spec. Si el spec no requiere código (p. ej. solo pruebas de regresión), `componente: null`.
   Verificá en `entorno/.moodle-src/public/...` que el punto de extensión que vas a usar EXISTE en esta versión (citá archivo y línea en `capa_justificacion`).
2. **Bordes**: todo lo que el spec deja sin definir. Para cada uno: la decisión, el criterio, y la pregunta que le harías a producto.
   Ningún supuesto en silencio: si lo asumís, va acá.
   Marcá `bloqueante: true` SOLO si el borde no admite una decisión razonable sin producto: una decisión equivocada cambia
   el comportamiento prometido, destruye datos o rompe un requisito, y el spec, la plataforma y las sondas no lo resuelven.
   Eso detiene la corrida sin construir nada y le hace tu pregunta a producto. Si existe una decisión razonable y reversible,
   tomala con `bloqueante: false`: detener por dudas menores es un defecto del plan.
3. **Criterios de aceptación** → cómo se verifica cada uno:
   - `funcional`: prueba E2E de comportamiento real.
   - `visual`: comparación contra línea base.
   - `ambas`.
   - `proceso`: criterios sobre la entrega misma (p. ej. "se entrega con pruebas en verde"); se verifican con la evidencia de la corrida.
   - `requiere_feature: true` si la prueba DEBE FALLAR cuando el plugin no está instalado (la fábrica lo comprueba desinstalándolo).
     Una prueba de "el flujo queda idéntico cuando está desactivado" es `false`.
   - `camino_error: true` si el criterio habla de fallos, reintentos o errores: su prueba debe forzar el error de verdad.
4. **Pantallas afectadas**: prefijos de nombres de líneas base EXISTENTES que el cambio altera A PROPÓSITO.
   Solo esas podrán actualizarse (quedan pendientes de aprobación humana en el PR); cualquier otra diferencia visual bloquea.
   Declarar de más es visible en el PR y se considera un defecto del plan. Líneas base existentes hoy:
   spec-0-calificacion-manual--escritorio.png, spec-0-calificacion-manual--movil.png, spec-0-cierre--escritorio.png, spec-0-cierre--movil.png, spec-0-cierre-calificado--escritorio.png, spec-0-cierre-calificado--movil.png, spec-0-crear-examen--escritorio.png, spec-0-crear-examen--movil.png, spec-0-examen-estudiante--escritorio.png, spec-0-examen-estudiante--movil.png, spec-0-intento--escritorio.png, spec-0-intento--movil.png, spec-0-resumen-envio--escritorio.png, spec-0-resumen-envio--movil.png
5. **Pruebas afectadas**: si el spec autoriza cambiar una aserción de una prueba de regresión ya aprobada, declarala en
   `pruebas_afectadas` con el texto EXACTO de una línea (`antes`, debe aparecer una sola vez en el archivo), su reemplazo (`despues`)
   y el `motivo`. Sin bajar la cantidad de `expect` ni usar matchers débiles. Sin esa autorización en el spec, es un borde bloqueante.
   La fábrica aplica el reemplazo y el PR lo muestra para aprobación humana.
6. **Sondas**: si el spec involucra un sistema externo o un comportamiento que no conocés, pedí peticiones HTTP reales
   para verificar el contrato ANTES de construir (la fábrica las ejecuta y te pasa las respuestas reales).
   Desde el host: Moodle en http://localhost:8090, receptor externo en http://localhost:8091.



# Formato de salida (EXACTO, un único bloque)
```json
{
  "spec_id": "spec-3",
  "titulo": "título corto",
  "naturaleza": "agrega | integra | reemplaza | solo-pruebas",
  "componente": "quizaccess_xxx | local_xxx | null",
  "ruta_moodle": "public/... | null",
  "capa_justificacion": "por qué esta capa y no otra; punto de extensión verificado (archivo:línea)",
  "bordes": [{"descripcion": "", "decision": "", "criterio": "", "preguntaria": "", "bloqueante": false}],
  "criterios": [{"id": "CA-1", "texto": "", "verificacion": "funcional|visual|ambas|proceso", "requiere_feature": true, "camino_error": false, "archivos": ["rutas relativas al plugin que lo implementan"], "pruebas": ["descripción de cada prueba"]}],
  "pantallas_afectadas": [],
  "pruebas_afectadas": [{"archivo": "salidas/spec-0/pruebas/x.spec.ts", "antes": "", "despues": "", "motivo": ""}],
  "sondas": [{"descripcion": "", "metodo": "POST", "url": "http://localhost:8091/...", "body": {}}],
  "elimina": ["si naturaleza=reemplaza: TODO lo viejo que debe desaparecer (UI, config, datos) y cómo se verifica que se fue"]
}
```
