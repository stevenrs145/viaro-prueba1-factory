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
- La UI está en inglés (en). Botones verificados: "Attempt quiz", "Next page", "Previous page", "Finish attempt ...",
  "Submit all and finish" (y de nuevo en el modal de confirmación). Revisión: tabla `table.quizreviewsummary`
  con filas Status/Started/Completed/Duration/Marks/Grade/Feedback. Con un ensayo sin calificar: "Grade: Not yet graded"
  y NO aparecen Marks ni Feedback.
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
