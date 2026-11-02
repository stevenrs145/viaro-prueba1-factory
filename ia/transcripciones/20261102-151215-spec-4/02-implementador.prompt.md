Sos el IMPLEMENTADOR de una fábrica de software sobre Moodle 5.3 (módulo Quiz).
Implementás el PLAN aprobado: código del plugin + pruebas automáticas. Escribís SOLO dentro de `salidas/spec-4/`.
Podés leer `entorno/.moodle-src/` (Moodle real) y `factory/regresion/` (helpers y pruebas existentes).

# Spec
---
id: spec-4
titulo: Intentos restantes en la página del quiz
naturaleza: agrega
---

# Spec 4 · Intentos restantes en la página del quiz

## Intención
Antes de empezar o retomar un quiz, el estudiante debe saber cuántos intentos le quedan, para decidir cuándo usarlos sin tener que contarlos por su cuenta.

## Criterios de aceptación
- CA-1: en un quiz con límite de intentos, la página del quiz muestra al estudiante **cuántos intentos le quedan**.
- CA-2: el número se actualiza después de **enviar un intento**.
- CA-3: cuando no le quedan intentos, el mensaje lo indica con claridad.
- CA-4: en un quiz sin límite de intentos, la página queda **idéntica** a la actual.
- CA-5: el cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, más evidencia de que el camino completo funciona.

## Escenarios
- Dado un quiz con 3 intentos permitidos y uno enviado, cuando el estudiante abre la página del quiz, entonces ve que le quedan 2.
- Dado un quiz con todos los intentos usados, cuando el estudiante abre la página del quiz, entonces ve que no le quedan intentos.
- Dado un quiz sin límite de intentos, cuando el estudiante abre la página del quiz, entonces no ve ningún mensaje nuevo.

## Fuera de alcance
Cambiar cuántos intentos se permiten, y lo que ve el profesor.

## Restricciones
Cambio aditivo: no romper el flujo actual. No tocar nada fuera del alcance.


# Plan (decisiones ya tomadas: respetalas)
```json
{
  "spec_id": "spec-4",
  "titulo": "Intentos restantes en la página del quiz",
  "naturaleza": "agrega",
  "componente": "quizaccess_attemptsremaining",
  "ruta_moodle": "public/mod/quiz/accessrule/attemptsremaining",
  "capa_justificacion": "Regla de acceso de quiz usada solo por su descripción: no impide ni condiciona nada. Es la capa más específica, porque el mensaje entra en la lista de información que view.php ya muestra al estudiante, junto a 'Intentos permitidos' del core. Verificado: access_manager.php:78-83 instancia toda clase quizaccess_* con make() y descarta las que devuelven null; access_manager.php:103 las descubre por rule.php; access_rule_base.php:174 define description(); access_manager.php:321-326 acumula las descripciones; view.php:214 las pasa a infomessages; renderer.php:910 y renderer.php:1063 las pintan en el recuadro .quizinfo. Precedente directo: accessrule/numattempts/rule.php:29-40, que usa get_num_attempts_allowed() == 0 en make() para no actuar en quizzes sin límite. Eso resuelve CA-4 sin ramas de presentación: sin regla no hay salida. Se descarta un hook de salida (before_footer_html_generation y similares): obligaría a filtrar por pagetype, a recalcular quiz, overrides y capacidades, y a inyectar HTML fuera del recuadro de información. Se descarta local_* con observer: CA-2 no necesita reaccionar a un evento, porque el conteo se calcula en vivo en cada carga. No hace falta persistencia propia: el dato sale de quiz_attempts, así que no hay db/ ni tablas. El proveedor de privacidad es null_provider. Restricciones verificadas: la regla no recibe userid (usar $USER, el usuario actual) y describe_rules también lo usa la API externa (external.php:2133).",
  "bordes": [
    {
      "descripcion": "Intento en curso: el spec habla de 'empezar o retomar', pero no dice si un intento sin enviar cuenta como usado.",
      "decision": "Cuenta como usado, igual que el core: view.php:86-106 suma terminados y no terminados en numattempts, y numattempts/rule.php:42-50 compara contra ese total. Con un intento en curso el mensaje lo aclara: 'Te quedan N intentos además del que está en curso', 'Te queda 1 intento además del que está en curso' o 'No te quedan intentos después del que está en curso'.",
      "criterio": "El número debe coincidir con los intentos nuevos que Moodle realmente va a permitir. La aclaración evita decir 'no te quedan intentos' mientras la página ofrece 'Continuar el último intento'.",
      "preguntaria": "Con un intento abierto, ¿el contador debe descontarlo ya o solo al enviarlo? ¿Sirve la aclaración 'además del que está en curso'?",
      "bloqueante": false
    },
    {
      "descripcion": "Qué estados de intento se cuentan.",
      "decision": "Contar quiz_get_user_attempts(quizid, userid, 'finished', true) más 'unfinished', igual que view.php:86 y :91. No usar 'all': incluiría NOT_STARTED (quiz_attempt.php:57), que el core no cuenta. Finished incluye SUBMITTED y ABANDONED (lib.php:544-547). El resultado se acota con max(0, permitidos - usados).",
      "criterio": "Misma cuenta que la regla nativa. Un intento abandonado consume cupo en el core, así que acá también.",
      "preguntaria": "¿Un intento abandonado por vencimiento debe restar del contador, como ya lo hace Moodle al impedir nuevos intentos?",
      "bloqueante": false
    },
    {
      "descripcion": "Overrides de usuario o de grupo que cambian el límite de intentos.",
      "decision": "Usar el límite efectivo del estudiante con $quizobj->get_num_attempts_allowed(), que ya trae el override aplicado (quiz_settings.php:103-104 y :256). Si el override deja el quiz sin límite, make() devuelve null. Si el límite efectivo es menor que lo usado, muestra el mensaje de 'no te quedan intentos'.",
      "criterio": "El estudiante debe ver su propio límite real. El override no se modifica.",
      "preguntaria": "¿Algún caso en que el mensaje deba ignorar un override?",
      "bloqueante": false
    },
    {
      "descripcion": "Quién ve el mensaje. Lo que ve el profesor está fuera de alcance, pero describe_rules corre para todos los roles (view.php:214).",
      "decision": "make() devuelve null si el usuario no tiene mod/quiz:attempt o si tiene mod/quiz:preview (profesor, administrador). Se usa $quizobj->has_capability (quiz_settings.php:415). Invitados y no matriculados tampoco lo ven.",
      "criterio": "Respeta el 'fuera de alcance': la página del profesor no cambia. Las previsualizaciones no son intentos reales del estudiante.",
      "preguntaria": "¿Confirmamos que el profesor no vea este mensaje ni siquiera en previsualización?",
      "bloqueante": false
    },
    {
      "descripcion": "Mensaje del core cuando se agotan los intentos: Moodle ya muestra nomoreattempts al pie (numattempts/rule.php:44, renderer.php:961).",
      "decision": "Se agrega 'No te quedan intentos.' en .quizinfo y se conserva el mensaje del core. Ambos pueden convivir en pantalla.",
      "criterio": "Cambio aditivo: no se toca el flujo actual ni se quita nada. El mensaje nuevo queda arriba, junto a los datos del quiz, y la prueba de CA-3 lo distingue del nativo.",
      "preguntaria": "¿Molesta ver dos mensajes parecidos? Quitar el nativo implicaría ocultar comportamiento del core y hoy quedaría fuera de alcance.",
      "bloqueante": false
    },
    {
      "descripcion": "Quiz cerrado, todavía no abierto o sin preguntas: quedan intentos, pero no se pueden usar ahora.",
      "decision": "El mensaje informa el saldo igual, sin mirar fechas ni contenido. Los avisos propios de Moodle siguen indicando que el quiz no está disponible.",
      "criterio": "El spec pide saber cuántos quedan, no si se pueden usar hoy. Mezclar disponibilidad agregaría reglas no pedidas.",
      "preguntaria": "¿Hay que ocultar el contador cuando el quiz está cerrado?",
      "bloqueante": false
    },
    {
      "descripcion": "Redacción, singular/plural e idioma.",
      "decision": "Cadenas en lang/en (obligatorio) y lang/es. El plugin puede traer su español: string_manager_standard.php:188 carga lang/<idioma> del plugin. Textos en español: 'Te quedan {$a} intentos.', 'Te queda 1 intento.', 'No te quedan intentos.', más las variantes con intento en curso. El estilo es el de un párrafo más de .quizinfo, sin notificación de color.",
      "criterio": "Coherencia con la UI en español y con el bloque de información existente. Se evita un 'Te quedan 1 intentos'.",
      "preguntaria": "¿Producto tiene un texto preferido o quiere destacar visualmente el caso sin intentos?",
      "bloqueante": false
    },
    {
      "descripcion": "Activación: el spec no pide una opción por quiz.",
      "decision": "Sin ajustes por quiz ni de administrador: aplica a todo quiz con límite. Se desactiva retirando la regla de acceso.",
      "criterio": "Cambio mínimo. Una opción nueva agregaría formulario, tabla y alcance no pedidos.",
      "preguntaria": "¿Debe poder apagarse por curso o por quiz?",
      "bloqueante": false
    },
    {
      "descripcion": "Efecto colateral: mod_quiz_get_quiz_access_information también usa describe_rules (external.php:2133), así que la app móvil recibiría el mensaje entre sus reglas de acceso.",
      "decision": "Se acepta sin código adicional y se declara en el PR.",
      "criterio": "Es el mismo dato para el mismo estudiante, sin cambios en el contrato de la API. Filtrarlo exigiría distinguir el origen de la llamada.",
      "preguntaria": "¿Hay objeción a que la app móvil muestre el mismo dato?",
      "bloqueante": false
    },
    {
      "descripcion": "Datos de prueba: QUIZ-REG es sin límite (seed.php:71, attempts=0), es compartido, y spec-4 solo tiene a estudiante11, que corre en escritorio y móvil.",
      "decision": "CA-1, CA-2 y CA-3 ponen el límite con un override de usuario para estudiante11 sobre QUIZ-REG, desde la UI como profesor (overrides.php, overrideedit.php). No se cambia el ajuste general del quiz. Cada prueba arranca sin intentos de estudiante11 (borrados como profesor en el informe mode=overview) y sin override, y termina dejándolo igual. CA-4 usa QUIZ-REG tal cual.",
      "criterio": "Si la limpieza falla, solo afecta a estudiante11 y no a la regresión de otros specs. El reset entre corridas no alcanza, porque cada prueba corre en dos proyectos con el mismo estudiante. El override llega al mismo campo quiz->attempts que usa un límite general (quiz_settings.php:104 y :256) y además verifica el límite efectivo. Limitación que el PR debe declarar: el límite configurado a nivel de quiz no se prueba por separado.",
      "preguntaria": "¿Hace falta una prueba adicional con límite configurado en el propio quiz?",
      "bloqueante": false
    }
  ],
  "criterios": [
    {
      "id": "CA-1",
      "texto": "En un quiz con límite de intentos, la página del quiz muestra al estudiante cuántos intentos le quedan.",
      "verificacion": "ambas",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "rule.php",
        "version.php",
        "lang/en/quizaccess_attemptsremaining.php",
        "lang/es/quizaccess_attemptsremaining.php",
        "classes/privacy/provider.php"
      ],
      "pruebas": [
        "[CA-1] @requiere-feature Con límite efectivo 3 y sin intentos, estudiante11 ve 'Te quedan 3 intentos.' en .quizinfo. Captura spec-4-quedan-intentos.png.",
        "[CA-1] @requiere-feature Con límite 3 y un intento enviado, estudiante11 ve 'Te quedan 2 intentos.' en .quizinfo. La aserción apunta al mensaje propio, no a 'Intentos permitidos'.",
        "[CA-1] @requiere-feature Con límite 2 y un intento enviado, ve el singular 'Te queda 1 intento.'.",
        "[CA-1] @requiere-feature Con límite 3 y un intento en curso, ve 'Te quedan 2 intentos además del que está en curso' y el botón 'Continuar el último intento'."
      ]
    },
    {
      "id": "CA-2",
      "texto": "El número se actualiza después de enviar un intento.",
      "verificacion": "funcional",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "rule.php"
      ],
      "pruebas": [
        "[CA-2] @requiere-feature Con límite 3, estudiante11 ve 3, inicia un intento, lo envía con enviarIntento(), vuelve a la página del quiz y ve 'Te quedan 2 intentos.'. El mensaje con 3 ya no aparece."
      ]
    },
    {
      "id": "CA-3",
      "texto": "Cuando no le quedan intentos, el mensaje lo indica con claridad.",
      "verificacion": "ambas",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "rule.php",
        "lang/en/quizaccess_attemptsremaining.php",
        "lang/es/quizaccess_attemptsremaining.php"
      ],
      "pruebas": [
        "[CA-3] @requiere-feature Con límite 1 y ese intento enviado, estudiante11 ve exactamente 'No te quedan intentos.' en .quizinfo y no hay botón de intento. Debe fallar sin el plugin aunque exista el mensaje nativo del pie. Captura spec-4-sin-intentos.png.",
        "[CA-3] @requiere-feature Con límite 1 y ese intento en curso, ve 'No te quedan intentos después del que está en curso' y puede continuar el intento."
      ]
    },
    {
      "id": "CA-4",
      "texto": "En un quiz sin límite de intentos, la página queda idéntica a la actual.",
      "verificacion": "ambas",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [
        "rule.php"
      ],
      "pruebas": [
        "[CA-4] En QUIZ-REG sin límite ni override, estudiante11 no ve ningún mensaje de intentos restantes en .quizinfo ni en el resto de la página, y el botón de intento funciona como siempre. Captura spec-4-sin-limite.png.",
        "[CA-4] En un quiz sin límite, tras enviar un intento, sigue sin aparecer ningún mensaje nuevo.",
        "[CA-4] Fuera de alcance: con el override de límite vigente para estudiante11, el profesor abre la página del quiz y no ve el mensaje de intentos restantes."
      ]
    },
    {
      "id": "CA-5",
      "texto": "El cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, más evidencia de que el camino completo funciona.",
      "verificacion": "proceso",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "Evidencia de corrida: funcional.xml en verde en escritorio y móvil, mutación (las pruebas @requiere-feature fallan sin el plugin), regresión, control de alcance, auditor de honestidad y trazabilidad.md. La prueba [CA-2] recorre el camino completo: abrir, intentar, enviar y volver."
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
- Código del plugin: `salidas/spec-4/codigo/<ruta_moodle>/` (espejo del árbol de Moodle; p. ej. `salidas/spec-4/codigo/public/mod/quiz/accessrule/x/version.php`).
  Plugin completo e instalable: `version.php` (component, version AAAAMMDDXX, requires 2026100500 = Moodle 5.3, maturity MATURITY_STABLE), `lang/en/<componente>.php` con `pluginname`,
  `db/` si hay tablas/eventos/hooks/tareas, `classes/` con namespaces correctos, `classes/privacy/provider.php`.
  Si el plan dice `naturaleza: reemplaza`, el plugin debe ELIMINAR lo viejo de verdad (UI, configuración y datos huérfanos, con `db/install.php`/`db/upgrade.php`), no ocultarlo detrás de una opción.
- Pruebas: `salidas/spec-4/pruebas/*.spec.ts` (Playwright, TypeScript). Importá helpers con `import { ... } from '../../../factory/regresion/helpers';`

# Reglas de las pruebas (el control de verificación honesta las audita; violarlas BLOQUEA la entrega)
- Cada prueba lleva en el título el criterio que cubre: `[CA-1] ...`. Etiquetas en el título:
  `@requiere-feature` (debe fallar sin el plugin) y `@camino-error` (fuerza un error real).
- Infraestructura: usá `login()`, `prepararCaptura()` y `enviarIntento()` de los helpers. No escribas tu propia versión ni un
  envoltorio con reintentos, y no uses `'networkidle'`, que en Moodle nunca se cumple. Si un helper falla, es un defecto de la
  fábrica: reportalo en tu respuesta. La validación estática rechaza `'networkidle'`, `#loginbtn` y `/login/index.php`.
- Cada `test(...)` debe tener al menos un `expect(` en su propio cuerpo: el auditor no cuenta los que están dentro de funciones auxiliares.
- Comportamiento real: nada de `page.route`/`route.fulfill`, nada de `expect(true)`, nada de `.catch(() => {})`,
  nada de `test.skip/fixme/only`, nada de `expect.soft`. Matchers concretos (`toHaveText`, `toHaveCount`, `toBeVisible`, `toHaveURL`, `toEqual`), no `toBeTruthy`.
- Datos: usá el curso QA101, el examen "Examen de regresión" y los usuarios sembrados. Si necesitás configurar algo
  (activar una opción en un quiz, configurar un ajuste de admin), hacelo DESDE LA UI en la prueba (como profesor/admin) y
  dejalo como estaba al final. La configuración que dejes cambiada afecta a las pruebas de otros specs.
- Usuarios: usá SOLO los estudiantes asignados a este spec (ver "Estudiantes por spec" en el conocimiento), uno distinto por prueba cuando haya intentos.
- Visual: `await expect(page).toHaveScreenshot('<spec_id>-<pantalla>.png', { fullPage: true, mask: await prepararCaptura(page) })`.
  Nombres de captura con prefijo `spec-4-`. Toda pantalla que el spec introduce o cambia lleva su verificación visual.
- Las pruebas corren en escritorio y móvil. Si una prueba solo tiene sentido en un viewport, NO uses skip: dividí en archivos o
  hacé la prueba robusta en ambos.
- Cada prueba debe poder correr sola y en cualquier orden; el estado se resetea antes de cada corrida (se borran intentos).

# Al terminar
Respondé con un resumen breve: archivos creados, qué criterio cubre cada prueba, y cualquier decisión que tomaste fuera del plan (con su razón).
