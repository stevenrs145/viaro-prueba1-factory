Sos el IMPLEMENTADOR de una fábrica de software sobre Moodle 5.3 (módulo Quiz).
Implementás el PLAN aprobado: código del plugin + pruebas automáticas. Escribís SOLO dentro de `salidas/spec-1/`.
Podés leer `entorno/.moodle-src/` (Moodle real) y `factory/regresion/` (helpers y pruebas existentes).

# Spec
---
id: spec-1
titulo: Reconocimiento obligatorio antes de iniciar un quiz
naturaleza: agrega
---

# Spec 1 · Reconocimiento obligatorio antes de iniciar un quiz

## Intención
Antes de ver la primera pregunta de un quiz, el estudiante debe aceptar un breve reconocimiento (por ejemplo términos o instrucciones). Tanto el texto del reconocimiento como si es obligatorio deben poder configurarse **por quiz**. El objetivo es que un examen pueda exigir esa aceptación sin cambiar el resto del flujo del quiz.

## Criterios de aceptación
- CA-1: con el reconocimiento activado, el estudiante **no puede llegar a la primera pregunta** hasta aceptarlo.
- CA-2: con el reconocimiento desactivado, el flujo del quiz queda **idéntico** al actual.
- CA-3: el texto del reconocimiento es **configurable por quiz**.
- CA-4: el cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, más evidencia de que el camino completo funciona (configurar, el estudiante lo ve y acepta, llega al quiz).

## Escenarios
- Dado un quiz con el reconocimiento activado, cuando el estudiante entra, entonces ve el reconocimiento y la primera pregunta queda bloqueada hasta aceptar.
- Dado un quiz con el reconocimiento desactivado, cuando el estudiante entra, entonces empieza el quiz directamente.

## Fuera de alcance
Calificación, reportes, y cualquier tipo de actividad que no sea el quiz.

## Restricciones
Cambio aditivo: no romper el flujo cuando está desactivado. No tocar nada fuera del alcance.


# Plan (decisiones ya tomadas: respetalas)
```json
{
  "spec_id": "spec-1",
  "titulo": "Reconocimiento obligatorio antes de iniciar un quiz",
  "naturaleza": "agrega",
  "componente": "quizaccess_reconocimiento",
  "ruta_moodle": "public/mod/quiz/accessrule/reconocimiento",
  "capa_justificacion": "Regla de acceso quizaccess_*: es la capa más específica para pedir algo antes de iniciar un intento y no toca el core. Un local_* con hooks de salida solo agregaría HTML y no bloquearía startattempt.php; un observer de attempt_started llegaría tarde. Puntos de extensión verificados en entorno/.moodle-src/public/mod/quiz: las reglas se descubren por rule.php (classes/access_manager.php:103) y se instancian con make() (classes/access_manager.php:79; base en classes/local/access_rule_base.php:77). El prechequeo está en access_rule_base.php:111 (is_preflight_check_required), :124 (add_preflight_check_form_fields), :142 (validate_preflight_check) y :152 (notify_preflight_check_passed). El bloqueo real es del servidor: startattempt.php:76-101 no crea el intento hasta que el formulario valida, y startattempt.php:103-104 lo crea o arranca después; attempt.php:96-98 y summary.php:72 vuelven a comprobar; classes/external.php:1029-1037 aplica lo mismo a servicios web. La configuración por quiz usa access_rule_base.php:272 (add_settings_form_fields, llamado en mod_form.php:330, sección 'security'), :285 (validate_settings_form_fields), :307 (save_settings), :318 (delete_settings) y :342 (get_settings_sql); mod_form.php:517-520 copia a $toform lo que devuelve load_settings. Si make() devuelve null, la regla no existe para ese quiz: es la base de CA-2. Referencia de casilla obligatoria: accessrule/offlineattempts/rule.php:58-81. Trampa verificada: NO copiar is_preflight_check_required de timelimit (`$attemptid === null`, accessrule/timelimit/rule.php:64-67). Un intento precreado llega con id y estado NOT_STARTED (mod/quiz/locallib.php:1980-1985), startattempt.php:76 no validaría y startattempt.php:103 lo arrancaría sin aceptación.",
  "bordes": [
    {
      "descripcion": "Frecuencia de la aceptación: el spec no dice si es una vez por quiz, por sesión o por intento.",
      "decision": "Una vez por cada intento nuevo, incluido cada reintento. is_preflight_check_required devuelve true si $attemptid es null o si el intento está en estado NOT_STARTED (consultado en quiz_attempts), y false si ya está IN_PROGRESS u OVERDUE.",
      "criterio": "El spec habla de aceptar antes de ver la primera pregunta. Ligarlo al arranque del intento lo garantiza siempre y no depende de la sesión: el patrón de password con $SESSION volvería a pedir la aceptación a mitad de intento tras expirar la sesión.",
      "preguntaria": "¿Debe aceptarse en cada intento o basta una vez por estudiante y quiz?",
      "bloqueante": false
    },
    {
      "descripcion": "Intentos precreados (precreateattempts): existen en estado NOT_STARTED antes de que el estudiante entre.",
      "decision": "Se tratan como intento nuevo: exigen aceptación.",
      "criterio": "Si no, CA-1 se podría saltar: view.php mostraría el formulario, pero startattempt.php:76 no lo validaría y :103 arrancaría el intento.",
      "preguntaria": "Ninguna: lo exige CA-1.",
      "bloqueante": false
    },
    {
      "descripcion": "Intentos ya en curso al activar el reconocimiento, o al cambiar su texto.",
      "decision": "No se interrumpen ni se pide aceptar de nuevo; la regla aplica desde el siguiente intento.",
      "criterio": "CA-1 protege la llegada a la primera pregunta y ese estudiante ya pasó por ella. Interrumpir un examen en curso sería un cambio de flujo no pedido.",
      "preguntaria": "¿Un cambio del texto debe forzar una nueva aceptación en intentos abiertos?",
      "bloqueante": false
    },
    {
      "descripcion": "Registro de la aceptación: el spec no pide guardar quién aceptó ni cuándo.",
      "decision": "No se guarda ningún dato personal. La tabla del plugin solo contiene configuración por quiz y el provider de privacidad es null_provider. Mientras la regla esté activa, un intento arrancado implica aceptación, salvo los que ya estaban en curso al activarla.",
      "criterio": "Mínimo que cumple el spec; 'reportes' está fuera de alcance. Es reversible: una tabla de aceptaciones se puede agregar luego, aunque no recupera aceptaciones pasadas.",
      "preguntaria": "¿Hace falta constancia auditable (usuario, fecha y versión del texto), por ejemplo por motivos legales? Si es así, debe definirse antes de usarlo en producción.",
      "bloqueante": false
    },
    {
      "descripcion": "Formato del texto: el spec dice 'breve' y no menciona texto enriquecido.",
      "decision": "textarea de texto plano, renderizado con format_text(..., FORMAT_PLAIN) en el contexto del módulo; respeta saltos de línea y escapa HTML. Sin editor ni archivos.",
      "criterio": "load_settings entrega escalares (mod_form.php:517-520), mientras que un editor necesita un arreglo text/format y gestión de archivos. Para un texto breve no se justifica, y evita inyectar HTML en la página de inicio.",
      "preguntaria": "¿Producto necesita enlaces o formato en el texto?",
      "bloqueante": false
    },
    {
      "descripcion": "Reconocimiento activado con texto vacío.",
      "decision": "El formulario del quiz no guarda: validate_settings_form_fields devuelve error en el campo de texto si, tras recortar espacios, queda vacío. No hay texto por defecto.",
      "criterio": "Una aceptación sin contenido no significa nada, y un texto genérico podría hacer aceptar algo que el docente nunca escribió.",
      "preguntaria": "¿Debe existir un texto por defecto a nivel de sitio?",
      "bloqueante": false
    },
    {
      "descripcion": "Valor por defecto y desactivación posterior.",
      "decision": "Desactivado por defecto, sin filas para quizzes no configurados (LEFT JOIN; make() devuelve null). Al desactivar se conserva el texto con enabled=0. save_settings no hace nada si los campos del plugin no vienen en $quiz (generadores, servicios web), para no pisar la configuración. delete_settings borra la fila.",
      "criterio": "Cambio aditivo: los quizzes existentes no cambian (CA-2). Reactivar no obliga a reescribir el texto.",
      "preguntaria": "¿Debe poder activarse por defecto en todo el sitio?",
      "bloqueante": false
    },
    {
      "descripcion": "Dónde ve el estudiante el reconocimiento y qué pasa si no acepta.",
      "decision": "Se muestra en el formulario de prechequeo: el diálogo que abre el botón de intento y, sin JS, la página completa de startattempt.php. Se acepta con una casilla obligatoria validada en el servidor con empty(), sin regla de cliente. Además, description() muestra en view.php un aviso breve de que se pedirá aceptar. Cancelar vuelve a la página del quiz sin crear intento. Enviar sin marcar vuelve a mostrar el formulario con error, sin crear intento.",
      "criterio": "Es el camino nativo de Moodle. Validar en el servidor también cubre POST directos y servicios web. El tiempo límite no corre mientras se lee, porque el intento se crea después (startattempt.php:103-104).",
      "preguntaria": "¿El texto completo debe verse ya en la página del quiz, antes de pulsar el botón?",
      "bloqueante": false
    },
    {
      "descripcion": "Convivencia con otras reglas con prechequeo (contraseña, tiempo límite).",
      "decision": "Sin tratamiento especial: los campos se acumulan en el mismo formulario (preflight_check_form.php:46-51) y todas las validaciones deben pasar. El plugin no se declara reemplazo de otras reglas: get_superceded_rules queda vacío.",
      "criterio": "Comportamiento nativo y aditivo.",
      "preguntaria": "Ninguna necesaria.",
      "bloqueante": false
    },
    {
      "descripcion": "Profesores en vista previa.",
      "decision": "También ven y deben aceptar el reconocimiento; make() ignora $canignoretimelimits.",
      "criterio": "Así el docente comprueba lo que verá el estudiante, igual que con la contraseña. El spec no define ninguna excepción por rol.",
      "preguntaria": "¿Algún rol debe quedar exento?",
      "bloqueante": false
    },
    {
      "descripcion": "Respaldo, restauración y duplicado del quiz.",
      "decision": "Se incluyen backup_quizaccess_reconocimiento_subplugin y restore_quizaccess_reconocimiento_subplugin, mapeando quizid al quiz nuevo.",
      "criterio": "La configuración vive en tabla propia. Sin esto, un quiz duplicado o restaurado perdería el reconocimiento en silencio y dejaría de exigirse. El mecanismo está verificado en mod/quiz/backup/moodle2/backup_quiz_stepslib.php:47 y restore_quiz_stepslib.php:57.",
      "preguntaria": "Ninguna necesaria.",
      "bloqueante": false
    },
    {
      "descripcion": "App móvil y servicios web: el cliente no conoce este campo de prechequeo.",
      "decision": "Falla cerrado: sin preflightdata de aceptación, start_attempt devuelve error de validación. No se desarrolla soporte específico para la app.",
      "criterio": "CA-1 no admite una vía sin aceptación (external.php:1029-1037). Las pruebas E2E cubren la web; este camino queda como borde declarado y no se prueba contra la app.",
      "preguntaria": "¿Los estudiantes rinden estos quizzes desde la app móvil? De ser así, hace falta un spec aparte.",
      "bloqueante": false
    },
    {
      "descripcion": "Idioma: la instancia está en español y el plugin debe verse así.",
      "decision": "Se entregan lang/en/quizaccess_reconocimiento.php (obligatorio) y lang/es/quizaccess_reconocimiento.php con las mismas claves.",
      "criterio": "El gestor de cadenas carga lang/<idioma> del plugin (public/lib/classes/string_manager_standard.php:188-189).",
      "preguntaria": "Ninguna necesaria.",
      "bloqueante": false
    },
    {
      "descripcion": "Las pruebas comparten 'Examen de regresión' con otros specs, y escritorio y móvil reutilizan a estudiante5 y estudiante6.",
      "decision": "Cada prueba configura desde la UI como profesor, usa `finally` para restaurar el valor previo (por defecto, desactivado) y termina el intento que abrió. Un intento abierto haría que la siguiente pasada viera 'Continuar el último intento' sin prechequeo y fallaría en falso. Hay workers: 1 y fullyParallel: false (playwright.config.ts:11-12), así que no hay configuración concurrente.",
      "criterio": "Reglas del implementador: usar datos sembrados, dejar todo como estaba y garantizar pruebas independientes del orden.",
      "preguntaria": "Ninguna necesaria.",
      "bloqueante": false
    }
  ],
  "criterios": [
    {
      "id": "CA-1",
      "texto": "Con el reconocimiento activado, el estudiante no puede llegar a la primera pregunta hasta aceptarlo.",
      "verificacion": "ambas",
      "requiere_feature": true,
      "camino_error": true,
      "archivos": [
        "rule.php",
        "db/install.xml",
        "lang/en/quizaccess_reconocimiento.php",
        "lang/es/quizaccess_reconocimiento.php"
      ],
      "pruebas": [
        "Con el reconocimiento activado, estudiante5 pulsa el botón de intento: se abre el diálogo (.mod_quiz_preflight_popup, formulario #mod_quiz_preflight_form) con el texto configurado y la URL sigue en view.php, sin .que visible.",
        "@camino-error: enviar el formulario sin marcar la casilla (botón [name=\"submitbutton\"]) muestra el error en startattempt.php, sin preguntas. Al volver a view.php no hay 'Continuar el último intento', o sea, no se creó intento.",
        "@camino-error: con sesión de estudiante, abrir directamente /mod/quiz/startattempt.php?cmid=<cmid>&sesskey=<M.cfg.sesskey> muestra el formulario y no la pregunta; no se crea intento.",
        "Cancelar (#id_cancel) deja al estudiante en la página del quiz, sin intento.",
        "Tras marcar la casilla y enviar, se llega a attempt.php con la pregunta 1 visible. El intento se termina con enviarIntento().",
        "Visual: captura 'spec-1-prechequeo' del diálogo con el reconocimiento."
      ]
    },
    {
      "id": "CA-2",
      "texto": "Con el reconocimiento desactivado, el flujo del quiz queda idéntico al actual.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [
        "rule.php"
      ],
      "pruebas": [
        "Sin configurar el reconocimiento, estudiante6 ve en view.php el botón de intento, sin aviso del plugin y con #mod_quiz_preflight_form en 0. Un clic lo lleva directo a attempt.php con la pregunta 1 visible, y completa el intento con enviarIntento().",
        "Tras activar, guardar y desactivar desde la UI, el flujo vuelve a ser directo y el texto guardado sigue en el formulario de ajustes."
      ]
    },
    {
      "id": "CA-3",
      "texto": "El texto del reconocimiento es configurable por quiz.",
      "verificacion": "ambas",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "rule.php",
        "db/install.xml",
        "backup/moodle2/backup_quizaccess_reconocimiento_subplugin.class.php",
        "backup/moodle2/restore_quizaccess_reconocimiento_subplugin.class.php",
        "lang/en/quizaccess_reconocimiento.php",
        "lang/es/quizaccess_reconocimiento.php"
      ],
      "pruebas": [
        "Como profesor, en los ajustes del quiz (sección 'security' desplegada) se activa la opción y se guarda un texto A. Al reabrir los ajustes siguen la opción y el texto, y el estudiante ve A en el diálogo.",
        "Se cambia a un texto B: el estudiante ve B y el diálogo ya no contiene A.",
        "Activar con el texto vacío no guarda y muestra el error en el campo.",
        "El texto con etiquetas HTML se muestra escapado, sin crear elementos en el diálogo.",
        "Visual: captura 'spec-1-ajustes' de la sección de ajustes con el reconocimiento activado."
      ]
    },
    {
      "id": "CA-4",
      "texto": "El cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, más evidencia de que el camino completo funciona (configurar, el estudiante lo ve y acepta, llega al quiz).",
      "verificacion": "proceso",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "Evidencia de la corrida: suite de CA-1 a CA-3 en verde en escritorio y móvil, con la comprobación sin plugin para las pruebas @requiere-feature.",
        "El camino completo queda en una sola prueba titulada [CA-1][CA-3]: el profesor configura, estudiante5 ve y acepta, llega a la pregunta 1 y envía; luego se restaura la configuración."
      ]
    }
  ],
  "pantallas_afectadas": [],
  "sondas": [],
  "elimina": []
}
```

# Respuestas reales de las sondas (contrato verificado; construí SOBRE ESTO, no sobre supuestos)
```json
[]
```

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


# Dónde va cada cosa
- Código del plugin: `salidas/spec-1/codigo/<ruta_moodle>/` (espejo del árbol de Moodle; p. ej. `salidas/spec-1/codigo/public/mod/quiz/accessrule/x/version.php`).
  Plugin completo e instalable: `version.php` (component, version AAAAMMDDXX, requires 2026100500 = Moodle 5.3, maturity MATURITY_STABLE), `lang/en/<componente>.php` con `pluginname`,
  `db/` si hay tablas/eventos/hooks/tareas, `classes/` con namespaces correctos, `classes/privacy/provider.php`.
  Si el plan dice `naturaleza: reemplaza`, el plugin debe ELIMINAR lo viejo de verdad (UI, configuración y datos huérfanos, con `db/install.php`/`db/upgrade.php`), no ocultarlo detrás de una opción.
- Pruebas: `salidas/spec-1/pruebas/*.spec.ts` (Playwright, TypeScript). Importá helpers con `import { ... } from '../../../factory/regresion/helpers';`

# Reglas de las pruebas (el control de verificación honesta las audita; violarlas BLOQUEA la entrega)
- Cada prueba lleva en el título el criterio que cubre: `[CA-1] ...`. Etiquetas en el título:
  `@requiere-feature` (debe fallar sin el plugin) y `@camino-error` (fuerza un error real).
- Infraestructura: usá `login()`, `prepararCaptura()` y `enviarIntento()` de los helpers. No escribas tu propia versión ni un
  envoltorio con reintentos, y no uses `'networkidle'`, que en Moodle nunca se cumple. Si un helper falla, es un defecto de la
  fábrica: reportalo en tu respuesta. La validación estática rechaza `'networkidle'`, `#loginbtn` y `/login/index.php`.
- Comportamiento real: nada de `page.route`/`route.fulfill`, nada de `expect(true)`, nada de `.catch(() => {})`,
  nada de `test.skip/fixme/only`, nada de `expect.soft`. Matchers concretos (`toHaveText`, `toHaveCount`, `toBeVisible`, `toHaveURL`, `toEqual`), no `toBeTruthy`.
- Datos: usá el curso QA101, el examen "Examen de regresión" y los usuarios sembrados. Si necesitás configurar algo
  (activar una opción en un quiz, configurar un ajuste de admin), hacelo DESDE LA UI en la prueba (como profesor/admin) y
  dejalo como estaba al final. La configuración que dejes cambiada afecta a las pruebas de otros specs.
- Usuarios: usá SOLO los estudiantes asignados a este spec (ver "Estudiantes por spec" en el conocimiento), uno distinto por prueba cuando haya intentos.
- Visual: `await expect(page).toHaveScreenshot('<spec_id>-<pantalla>.png', { fullPage: true, mask: await prepararCaptura(page) })`.
  Nombres de captura con prefijo `spec-1-`. Toda pantalla que el spec introduce o cambia lleva su verificación visual.
- Las pruebas corren en escritorio y móvil. Si una prueba solo tiene sentido en un viewport, NO uses skip: dividí en archivos o
  hacé la prueba robusta en ambos.
- Cada prueba debe poder correr sola y en cualquier orden; el estado se resetea antes de cada corrida (se borran intentos).

# Al terminar
Respondé con un resumen breve: archivos creados, qué criterio cubre cada prueba, y cualquier decisión que tomaste fuera del plan (con su razón).
