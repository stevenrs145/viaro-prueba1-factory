Sos el IMPLEMENTADOR de una fábrica de software sobre Moodle 5.3 (módulo Quiz).
Implementás el PLAN aprobado: código del plugin + pruebas automáticas. Escribís SOLO dentro de `salidas/spec-3/`.
Podés leer `entorno/.moodle-src/` (Moodle real) y `factory/regresion/` (helpers y pruebas existentes).

# Spec
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


# Plan (decisiones ya tomadas: respetalas)
```json
{
  "spec_id": "spec-3",
  "titulo": "Reemplazo de la retroalimentación global por un resumen por tema",
  "naturaleza": "reemplaza",
  "componente": "local_resumentema",
  "ruta_moodle": "public/local/resumentema",
  "capa_justificacion": "Plugin local: el cambio cruza revisión, view.php, formulario del quiz, ajustes de admin y datos, y ninguna capa más específica lo cubre. Se descartan: (a) quizaccess_*: setup_attempt_page (classes/local/access_rule_base.php:248) solo permitiría alterar $quiz en memoria y no alcanza a profesores, porque locallib.php:1220 fuerza overallfeedback=VISIBLE; (b) tema hijo con renderer: cambiaría el tema sembrado y lo que miden todas las líneas base; (c) CSS: ocultaría sin eliminar, lo que incumple CA-2 y CA-3. El core no ofrece hook para quitar la fila: classes/hook/ de mod_quiz solo trae attempt_state_changed y structure_modified, y attempt_summary_information::create_for_attempt no es extensible (review.php:119). La supresión real es por datos: la fila exige texto de quiz_feedback (attempt_summary_information.php:271-274); view.php:190 y attempts_report.php:285 dependen de quiz_has_feedback (locallib.php:683); el servicio externo depende de lo mismo (classes/external.php:1759). Puntos de extensión verificados: (1) formulario: callback <plugin>_coursemodule_standard_elements en lib.php (course/moodleform_mod.php:669 y :829), invocado desde mod/quiz/mod_form.php:391, cuando ya existen la sección (:333-388) y los grupos de revisión (:241-247). CORRECCIÓN A LA PLATAFORMA: factory/conocimiento/moodle-5.3.md atribuye esto a core_course\\hook\\after_form_definition, pero ese hook solo se dispara en course/edit_form.php:435, no en formularios de actividad; hay que corregirlo ahí y en documentacion.md B3. (2) Ajustes de admin: settings.php del plugin; los locales cargan al final (admin/settings/plugins.php:848-860), así que $ADMIN->locate('modsettingquiz') ya existe; admin_settingpage::$settings es público (admin/classes/setting/settingpage/settingpage.php:42) y sus claves son plugin+nombre (:193-198): 'quizreviewoverallfeedback' y 'quizinitialnumfeedbacks' (mod/quiz/settings.php:87 y :226). (3) Bloque nuevo: \\core\\hook\\output\\after_standard_main_region_html_generation (lib/classes/hook/output/after_standard_main_region_html_generation.php:30, add_html :52), filtrando $PAGE->pagetype === 'mod-quiz-review'; se pinta en drawers.mustache:179, fuera de #region-main, así que un script mínimo lo mueve a continuación de la tabla resumen. (4) Datos: db/install.php y db/uninstall.php; el uninstall corre antes de borrar las tablas (lib/adminlib.php:169 y :226). (5) Reingreso de datos: eventos \\core\\event\\course_restored (backup/util/plan/restore_plan.class.php:216, solo TYPE_1COURSE), course_module_created (course/modlib.php:211 y duplicado en course/format/classes/local/cmactions.php:560), course_module_updated (course/modlib.php:820) y \\mod_quiz\\event\\attempt_started. (6) Cálculo: quiz_attempt::get_slots (:838), get_question_attempt (:886), question_definition::$category (question/type/questionbase.php:66). Mantiene intacto el core y no agrega ninguna opción.",
  "bordes": [
    {
      "descripcion": "'Tema' no está definido: categoría del banco, tags, secciones o grade items.",
      "decision": "Tema = categoría del banco de la pregunta realmente presentada en el intento (question_definition::$category). Para preguntas aleatorias cuenta la que le tocó al estudiante. Se agrupa por id de categoría, sin consolidar subcategorías, en orden de primera aparición en el examen. El nombre se muestra con format_string.",
      "criterio": "Toda pregunta tiene categoría y no exige configuración nueva; el sembrado define 3 categorías = 3 temas (entorno/seed/seed.php:51-55); coincide con B2 de documentacion.md.",
      "preguntaria": "¿El tema es la categoría del banco, y las subcategorías cuentan como temas propios?",
      "bloqueante": false
    },
    {
      "descripcion": "Quitar el bloque del todo implica retirar datos de quiz_feedback que escribieron los profesores (CA-3 pide no dejar configuración huérfana), pero borrarlos sin más sería irreversible.",
      "decision": "Migración reversible: db/install.php mueve a una tabla de archivo del plugin las filas con texto de quiz_feedback (conservando su id original) y quiz.reviewoverallfeedback de cada examen, deja ese campo en 0 y borra las filas de quiz_feedback. Los archivos del área mod_quiz/feedback no se tocan. db/uninstall.php lo restaura todo con import_record (mismo id, los archivos siguen enlazados) y descarta lo archivado de exámenes que ya no existan. El archivo no tiene UI ni se usa en ejecución; solo existe para revertir.",
      "criterio": "Un borrado definitivo sí sería bloqueante; archivar lo hace reversible. Además es obligatorio para la fábrica: retirar() desinstala en la mutación y al final de la corrida (factory/cli.mjs:146 y :221). Sin restaurar, las pruebas de CA-2 pasarían sin el plugin (PASA-SIN-FUNCIONALIDAD) y QUIZ-REG quedaría sin retro para los demás specs.",
      "preguntaria": "¿Los textos de retroalimentación global se pueden borrar definitivamente en algún momento, o hay que conservar el archivo por tiempo indefinido?",
      "bloqueante": false
    },
    {
      "descripcion": "Quitar los campos del formulario rompería el guardado: mod_form.php:638 hace count($data['feedbacktext']) sin comprobar que exista, y lib.php:1167-1172 espera text, format e itemid.",
      "decision": "El callback coursemodule_standard_elements, solo para el formulario de quiz, elimina overallfeedbackhdr, nogradewarning (si existe), gradeboundarystatic1/2, todos los feedbacktext[n] y feedbackboundaries[n], boundary_add_fields y boundary_repeats, y agrega hidden feedbacktext[0][text]='', [format]=1 e [itemid]=0 con PARAM_RAW. Las casillas overallfeedback{during,immediately,open,closed} y sus dos envoltorios html se quitan de cada grupo con getElements/setElements.",
      "criterio": "Los hidden no son una opción de UI: solo cumplen el contrato de validación del core. El resultado es el mismo que un quiz sin retro: lib.php guarda una fila con texto vacío, quiz_has_feedback da falso y reviewoverallfeedback queda en 0 (quiz_review_option_form_to_db, lib.php:1094).",
      "preguntaria": "Ninguna: es una restricción técnica del core.",
      "bloqueante": false
    },
    {
      "descripcion": "Hay más UI de la retro global que la sección del formulario: dos ajustes de admin (revisión por defecto y número inicial de campos) que quedarían sin efecto.",
      "decision": "settings.php del plugin retira 'quizreviewoverallfeedback' y 'quizinitialnumfeedbacks' de modsettingquiz. Solo si $ADMIN->fulltree y la página existe. La instalación pone config quiz/reviewoverallfeedback en 0 guardando el valor anterior en la config del plugin, y el uninstall lo restaura. Las filas de configuración NO se borran: mod_form.php:365 y :429 las leen sin comprobar.",
      "criterio": "CA-3 prohíbe opciones que ya no hacen nada; borrar la config generaría warnings en el core. Lo que el core lee de forma obligatoria se queda.",
      "preguntaria": "Ninguna: el spec lo exige y el valor es reversible.",
      "bloqueante": false
    },
    {
      "descripcion": "El core no se puede modificar: la tabla quiz_feedback, las funciones y las cadenas de la retro siguen en Moodle sin uso visible.",
      "decision": "CA-3 se aplica a lo que el plugin entrega y a lo observable (diff, UI, datos). Se declara como límite: esas piezas del core quedan y no son código del entregable.",
      "criterio": "Regla dura del proyecto: nunca tocar el core; el pipeline lo bloquea (factory/lib/moodle.mjs:57).",
      "preguntaria": "¿Producto acepta que el esquema y el código nativo del core permanezcan sin uso?",
      "bloqueante": false
    },
    {
      "descripcion": "Otras vías pueden reintroducir retro global: restauración de copias, duplicado de actividad, servicios web o escrituras directas.",
      "decision": "Una única función idempotente archiva y limpia un quiz, invocada por observers de course_restored, course_module_created y course_module_updated (filtrados a quiz), y por attempt_started como red final antes de que un estudiante pueda llegar al cierre. course_module_deleted purga lo archivado de ese quiz. Las filas con texto vacío se ignoran.",
      "criterio": "'Lo viejo se va' debe valer también para exámenes que llegan después; la restauración de actividad suelta no dispara course_restored (restore_plan.class.php:196). RIESGO DECLARADO: estas vías no quedan cubiertas por E2E, porque tras instalar el plugin no hay forma de crear retro desde la UI.",
      "preguntaria": "¿Debe conservarse la retro de cursos restaurados de copias antiguas si el plugin se retira después?",
      "bloqueante": false
    },
    {
      "descripcion": "'Ocupa su lugar': el hook solo agrega HTML fuera de #region-main y la fila vivía dentro de la tabla resumen.",
      "decision": "El servidor emite una sección propia y un script inline mínimo ($PAGE->requires->js_init_code, sin AMD ni build) la mueve justo después del contenedor de table.quizreviewsummary, antes de las preguntas. Sin JS queda visible al final de la página. Es una sección aparte, no una fila, porque un desglose no cabe en una celda.",
      "criterio": "Es el punto más cercano al lugar anterior que no toca el core. Debe verse igual en escritorio y móvil.",
      "preguntaria": "¿Una sección inmediatamente bajo la tabla cumple 'en su lugar', o debe ser una fila de la tabla?",
      "bloqueante": false
    },
    {
      "descripcion": "Dónde y a quién se muestra el resumen: paginación, permisos, notas ocultas y estado del intento.",
      "decision": "Solo en mod-quiz-review, primera página o showall (la tabla se recorta con page>0: renderer.php:148), con intento en estado FINISHED y quiz_has_grades. El callback corre también en páginas de error, así que debe comprobar is_review_allowed y get_display_options(true)->attempt. Si marks < MARK_AND_MAX no se emite el bloque. Lo ve quien puede ver esa revisión, incluido el profesor. No aparece en reviewquestion.php ni en view.php.",
      "criterio": "Un resumen con puntos no puede filtrar notas que el profesor ocultó (B4). Misma condición que add_attempt_grades_if_appropriate (attempt_summary_information.php:295-303).",
      "preguntaria": "Con notas ocultas, ¿debería mostrarse algo por tema, por ejemplo cantidad de correctas?",
      "bloqueante": false
    },
    {
      "descripcion": "Qué mide el desempeño por tema, y cómo tratar ensayos pendientes, ensayos en blanco y preguntas sin puntaje.",
      "decision": "Por tema: suma de marcas sobre suma de marcas máximas, en la escala de 'Puntos' (no la reescalada a 10), con quiz_format_question_grade, más porcentaje. Pendiente = solo estado needsgrading: suma 0 a lo obtenido, cuenta en el máximo, el tema muestra '1 pregunta sin calificar' (plural según corresponda) y sin porcentaje. Marca null en gaveup vale 0 sin aviso. Las preguntas con marca máxima 0 no cuentan; si no queda ningún tema, no hay bloque. Se calcula en vivo, sin guardar nada, así que reacciona a recalificaciones. Encabezados Tema/Puntos/Porcentaje: nunca 'Estado' ni otro que prepararCaptura enmascare, y la tabla no usa la clase quizreviewsummary.",
      "criterio": "La suma por tema debe cuadrar con 'Puntos'. gaveup no es pendiente (behaviour.php:112-113, ya verificado en spec-0). A diferencia de la nota global, la revisión ya muestra marcas por pregunta, así que el desglose parcial no filtra nada.",
      "preguntaria": "¿Se prefiere puntos, porcentaje o un nivel cualitativo con recomendación de estudio?",
      "bloqueante": false
    },
    {
      "descripcion": "Intentos anteriores a la instalación.",
      "decision": "Muestran el resumen por tema y ya no la retro global.",
      "criterio": "Sale de la migración y el cálculo en vivo, y el segundo escenario del spec va en esa dirección.",
      "preguntaria": "¿Hace falta conservar la retro que vieron los estudiantes en intentos históricos?",
      "bloqueante": false
    },
    {
      "descripcion": "Efecto colateral: al desaparecer quiz_feedback, también se va la columna de retro del informe de intentos (attempts_report.php:285) y el texto bajo la nota en view.php. Reportes del profesor está fuera de alcance.",
      "decision": "Se acepta: no se agrega código para mantener una columna que quedaría vacía. El recuadro #feedback de view.php sigue con la nota (renderer.php:1311), que spec-0 verifica.",
      "criterio": "Es el mismo bloque viejo; conservarlo dejaría algo muerto y contradiría CA-3. No se agrega nada a los reportes.",
      "preguntaria": "¿Producto acepta que el profesor deje de ver esa columna?",
      "bloqueante": false
    },
    {
      "descripcion": "Solo hay dos estudiantes para dos viewports y varios recorridos con intentos.",
      "decision": "estudiante9 en escritorio y estudiante10 en móvil, por isMobile, sin skip. Cada prueba hace su propio intento (QUIZ-REG admite intentos ilimitados) y usa su URL de review.php. Ninguna asserta la nota final de view.php por estudiante, porque depende de intentos previos. Las aserciones van contra el intento recién creado.",
      "criterio": "Rango asignado en el conocimiento; workers: 1 y sin reintentos (playwright.config.ts:11-14); reset borra los intentos antes de cada corrida.",
      "preguntaria": "Ninguna: es una decisión técnica.",
      "bloqueante": false
    },
    {
      "descripcion": "Idioma del bloque.",
      "decision": "lang/en (obligatorio) y lang/es en el plugin; las pruebas assertan el texto en español: 'Resumen por tema'.",
      "criterio": "La UI de la instancia está en español.",
      "preguntaria": "Ninguna: decisión menor y reversible.",
      "bloqueante": false
    }
  ],
  "criterios": [
    {
      "id": "CA-1",
      "texto": "Al terminar el intento, el estudiante ve su desempeño agrupado por tema.",
      "verificacion": "ambas",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "version.php",
        "db/hooks.php",
        "classes/hook_callbacks.php",
        "classes/resumen.php",
        "lang/en/local_resumentema.php",
        "lang/es/local_resumentema.php"
      ],
      "pruebas": [
        "[CA-1] [CA-2] @requiere-feature: en QUIZ-REG responde 1='12', 2='Verdadero', 3='4' (mal), 4='Verdadero', 5='Verdadero', ensayo vacío; en la pantalla de cierre ve exactamente 3 filas en orden: Álgebra 2,00/2,00, Geometría 1,00/2,00 e Historia 1,00/2,00, con sus porcentajes y sin aviso de pendiente (gaveup vale 0).",
        "En esa misma prueba: la sección está después de table.quizreviewsummary y antes de la primera .que (posición en el DOM); captura 'spec-3-cierre-por-tema.png'.",
        "[CA-1] @requiere-feature: ensayo respondido: antes de calificar, Historia muestra 1,00/2,00 y '1 pregunta sin calificar', sin porcentaje; el profesor califica con 0.5 y el estudiante ve Historia 1,50/2,00 sin aviso. Captura 'spec-3-cierre-pendiente.png' antes de calificar.",
        "[CA-1] @requiere-feature: con el intento terminado, la sección aparece una sola vez en showall=1 y no aparece con page=1&showall=0.",
        "[CA-1] sin @requiere-feature: como profesor desde la UI, en QUIZ-REG desmarcar maxmarks y marks en 'immediately' y 'open'; el estudiante termina y NO ve la sección; se restaura la configuración en try/finally."
      ]
    },
    {
      "id": "CA-2",
      "texto": "El bloque de retroalimentación general anterior ya no aparece donde aparecía.",
      "verificacion": "ambas",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "db/install.php",
        "db/uninstall.php",
        "db/install.xml",
        "db/events.php",
        "classes/retro_global.php",
        "classes/observer.php"
      ],
      "pruebas": [
        "[CA-1] [CA-2] @requiere-feature (escenario de examen ya existente: QUIZ-REG trae retro sembrada): filaResumen 'Retroalimentación' con toHaveCount(0) y ningún 'Retro global' en la página, junto con la sección por tema presente. Sin el plugin falla porque la desinstalación restaura la fila.",
        "[CA-2] @requiere-feature: el profesor abre la revisión del intento de un estudiante y tampoco ve la fila ni el texto; demuestra que se fue el dato, ya que locallib.php:1220 fuerza overallfeedback para él. También ve la sección por tema.",
        "[CA-2] @requiere-feature: en view.php el estudiante con intento terminado no ve 'Retro global', la tabla de intentos no tiene columna 'Retroalimentación' y #feedback sigue mostrando su nota; la sección por tema sigue visible en su review.php."
      ]
    },
    {
      "id": "CA-3",
      "texto": "No queda nada muerto del bloque anterior: ni código sin uso, ni configuración huérfana, ni una opción en la interfaz que ya no hace nada. Se verifica en el diff.",
      "verificacion": "funcional",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "lib.php",
        "settings.php",
        "db/install.php",
        "db/uninstall.php",
        "classes/retro_global.php"
      ],
      "pruebas": [
        "[CA-3] @requiere-feature: en el formulario de crear quiz, #id_overallfeedbackhdr, #id_boundary_add_fields y las casillas #id_overallfeedback{during,immediately,open,closed} tienen count 0; #id_marksimmediately y #id_generalfeedbackimmediately siguen presentes. Captura 'spec-3-formulario.png'. Se verifican por id, porque los hidden usan el nombre feedbacktext.",
        "[CA-3] @requiere-feature: crea un quiz nuevo con ese formulario, guarda sin error, reabre la edición y sigue sin esas opciones; demuestra que la validación de mod_form.php:638 no se rompe.",
        "[CA-3] @requiere-feature: como admin en /admin/settings.php?section=modsettingquiz no existen #id_s_quiz_initialnumfeedbacks ni controles [id^='id_s_quiz_reviewoverallfeedback'], y [id^='id_s_quiz_reviewmarks'] sigue presente."
      ]
    },
    {
      "id": "CA-4",
      "texto": "El resto de la pantalla de cierre (nota, revisión de respuestas, navegación) sigue funcionando igual.",
      "verificacion": "ambas",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [
        "classes/hook_callbacks.php"
      ],
      "pruebas": [
        "[CA-4] sin @requiere-feature: tras enviar, Estado 'Finalizado', Puntos '4,00/6,00' y Calificación '6,67 de 10,00 (66,67%)'; hay 6 bloques .que con sus respuestas; sigue visible la retroalimentación por pregunta (fuera de alcance), con el texto sembrado de HIS-1; el bloque de navegación enlaza a las preguntas y 'Finalizar revisión' lleva a view.php.",
        "Regresión spec-0: 02-estudiante-sin-ensayo y 03-calificacion-manual sobre las pantallas de cierre, comparando contra las líneas base propuestas."
      ]
    },
    {
      "id": "CA-5",
      "texto": "Se entrega con pruebas automáticas derivadas de estos criterios, funcionales y visuales, ejecutadas y en verde.",
      "verificacion": "proceso",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "Evidencia de la corrida: pruebas del spec y suite completa en verde, mutación sin el plugin, honestidad.log y trazabilidad.md."
      ]
    }
  ],
  "pantallas_afectadas": [
    "spec-0-cierre",
    "spec-0-crear-examen"
  ],
  "pruebas_afectadas": [
    {
      "archivo": "salidas/spec-0/pruebas/02-estudiante-sin-ensayo.spec.ts",
      "antes": "await expect(filaResumen(page, 'Retroalimentación')).toHaveText('Retro global: aprobado.');",
      "despues": "await expect(filaResumen(page, 'Retroalimentación')).toHaveCount(0);",
      "motivo": "Autorizado por producto el 2 de noviembre de 2026 (spec-3, Decisión de producto): la fila ya no debe existir. Se mantiene la cantidad de asserts y toHaveCount es un matcher fuerte. Pendiente de aprobación humana en el PR."
    },
    {
      "archivo": "salidas/spec-0/pruebas/03-calificacion-manual.spec.ts",
      "antes": "await expect(filaResumen(page, 'Retroalimentación')).toHaveText('Retro global: aprobado.');",
      "despues": "await expect(filaResumen(page, 'Retroalimentación')).toHaveCount(0);",
      "motivo": "Autorizado por producto el 2 de noviembre de 2026 (spec-3, Decisión de producto): la fila ya no debe existir. Se mantiene la cantidad de asserts y toHaveCount es un matcher fuerte. Pendiente de aprobación humana en el PR."
    }
  ],
  "sondas": [],
  "elimina": [
    "Fila 'Retroalimentación' de la revisión (estudiante y profesor): se va al quedar sin texto en quiz_feedback. Verificación: CA-2 con toHaveCount(0), más las dos pruebas de spec-0 actualizadas.",
    "Columna y bloque de retro global en view.php (renderer.php:1153, :1211 y :1304): quiz_has_feedback da falso. Verificación: prueba CA-2 de view.php.",
    "Columna de retro del informe de intentos (attempts_report.php:285): consecuencia aceptada en los bordes; no se agrega código a reportes ni se le dedica prueba.",
    "Sección 'Retroalimentación global' del formulario del quiz. Verificación: prueba CA-3 de formulario, línea base spec-0-crear-examen.",
    "Casillas de retro global en Opciones de revisión, los cuatro momentos. Verificación: prueba CA-3 de formulario.",
    "Ajustes de admin quiz/reviewoverallfeedback y quiz/initialnumfeedbacks en la UI. Verificación: prueba CA-3 de admin.",
    "Datos de retro: filas con texto de quiz_feedback (archivadas y borradas) y quiz.reviewoverallfeedback en 0 en todos los exámenes; config quiz/reviewoverallfeedback en 0. Verificación: comportamiento de profesor en CA-2 y revisión de db/install.php en cambios.diff.",
    "Convivencia: el plugin no agrega ninguna opción para activar la retro vieja. Verificación: settings.php solo retira ajustes y no llama a add() en cambios.diff.",
    "No se elimina, por regla dura: tabla quiz_feedback, funciones y cadenas del core, y las filas de config que el core lee obligatoriamente (ver bordes)."
  ]
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
- Los cajones (índice del curso, bloques) guardan su estado por usuario en `drawer-open-*`. `reset` los borra; dentro de una corrida, cerrar uno afecta a las pruebas siguientes de ese usuario.


# Dónde va cada cosa
- Código del plugin: `salidas/spec-3/codigo/<ruta_moodle>/` (espejo del árbol de Moodle; p. ej. `salidas/spec-3/codigo/public/mod/quiz/accessrule/x/version.php`).
  Plugin completo e instalable: `version.php` (component, version AAAAMMDDXX, requires 2026100500 = Moodle 5.3, maturity MATURITY_STABLE), `lang/en/<componente>.php` con `pluginname`,
  `db/` si hay tablas/eventos/hooks/tareas, `classes/` con namespaces correctos, `classes/privacy/provider.php`.
  Si el plan dice `naturaleza: reemplaza`, el plugin debe ELIMINAR lo viejo de verdad (UI, configuración y datos huérfanos, con `db/install.php`/`db/upgrade.php`), no ocultarlo detrás de una opción.
- Pruebas: `salidas/spec-3/pruebas/*.spec.ts` (Playwright, TypeScript). Importá helpers con `import { ... } from '../../../factory/regresion/helpers';`

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
  Nombres de captura con prefijo `spec-3-`. Toda pantalla que el spec introduce o cambia lleva su verificación visual.
- Las pruebas corren en escritorio y móvil. Si una prueba solo tiene sentido en un viewport, NO uses skip: dividí en archivos o
  hacé la prueba robusta en ambos.
- Cada prueba debe poder correr sola y en cualquier orden; el estado se resetea antes de cada corrida (se borran intentos).

# Al terminar
Respondé con un resumen breve: archivos creados, qué criterio cubre cada prueba, y cualquier decisión que tomaste fuera del plan (con su razón).
