<?php
// Deja el estado de prueba EXACTAMENTE como lo dejó el sembrado, antes de cada corrida (determinismo funcional y visual):
//  - borra todos los intentos de los exámenes del curso QA101
//  - borra actividades creadas por pruebas (todo lo que no sea el examen sembrado QUIZ-REG ni el banco del curso)
//  - borra categorías de preguntas creadas por pruebas (y sus preguntas), conserva las 3 sembradas y la raíz
//  - borra notificaciones/mensajes (el contador de la barra superior cambiaría la captura)
//  - desactiva tours de usuario y ejecuta las tareas ad hoc pendientes (p. ej. migraciones de mod_qbank que bloquean el banco)
// Uso: php /opt/seed/reset.php
define('CLI_SCRIPT', true);
require('/var/www/moodle/config.php');
require_once($CFG->dirroot . '/mod/quiz/locallib.php');
require_once($CFG->dirroot . '/course/lib.php');
require_once($CFG->libdir . '/questionlib.php');

global $DB;
\core\session\manager::set_user(get_admin());
$course = $DB->get_record('course', ['shortname' => 'QA101'], '*', MUST_EXIST);

$intentos = 0;
foreach ($DB->get_records('quiz', ['course' => $course->id]) as $quiz) {
    $intentos += $DB->count_records('quiz_attempts', ['quiz' => $quiz->id]);
    quiz_delete_all_attempts($quiz);
}

$actividades = 0;
$modinfo = get_fast_modinfo($course);
foreach ($modinfo->get_cms() as $cm) {
    if ($cm->idnumber === 'QUIZ-REG' || $cm->modname === 'qbank') continue;
    course_delete_module($cm->id);
    $actividades++;
}

$categorias = 0;
$sembradas = ['TEMA-ALG', 'TEMA-GEO', 'TEMA-HIS'];
$cmbanco = $DB->get_records_sql("SELECT cm.id FROM {course_modules} cm JOIN {modules} m ON m.id = cm.module
                                  WHERE m.name = 'qbank' AND cm.course = ?", [$course->id]);
foreach ($cmbanco as $cmb) {
    $ctx = context_module::instance($cmb->id);
    $cats = $DB->get_records('question_categories', ['contextid' => $ctx->id], 'id DESC');
    foreach ($cats as $cat) {
        if ($cat->parent == 0 || in_array($cat->idnumber, $sembradas, true)) continue;
        // Categorías creadas por pruebas (o la "Default" que Moodle crea al primer uso) se vacían y se borran.
        $qids = $DB->get_fieldset_sql("SELECT q.id FROM {question} q JOIN {question_versions} qv ON qv.questionid = q.id
                                         JOIN {question_bank_entries} qbe ON qbe.id = qv.questionbankentryid
                                        WHERE qbe.questioncategoryid = ?", [$cat->id]);
        foreach ($qids as $qid) question_delete_question($qid);
        if (!$DB->record_exists('question_bank_entries', ['questioncategoryid' => $cat->id])
                && !$DB->record_exists('question_categories', ['parent' => $cat->id])) {
            $DB->delete_records('question_categories', ['id' => $cat->id]);
            $categorias++;
        }
    }
}

// El estado de los cajones se guarda por usuario y sobrevive entre corridas: abierto o cerrado mueve toda la página.
// Se fija explícitamente: sin la preferencia Moodle abre el índice del curso, y las líneas base lo tienen cerrado.
$DB->delete_records_select('user_preferences', "name LIKE 'drawer-open-%'");
foreach ($DB->get_fieldset_select('user', 'id', 'deleted = 0') as $idusuario) {
    set_user_preference('drawer-open-index', 0, $idusuario);
}
// Guardar el formulario del examen (lo hacen las pruebas para activar opciones) reescribe sus opciones de revisión:
// sin "durante el intento" desaparece la columna Puntos del resumen. Se vuelve a los valores por defecto del sitio.
foreach (['attempt', 'correctness', 'maxmarks', 'marks', 'specificfeedback', 'generalfeedback', 'rightanswer', 'overallfeedback'] as $revision) {
    $DB->set_field('quiz', "review{$revision}", get_config('quiz', "review{$revision}"), ['course' => $course->id, 'name' => 'Examen de regresión']);
}

$DB->delete_records('notifications');
$DB->delete_records('message_popup_notifications');
$DB->set_field('tool_usertours_tours', 'enabled', 0);
purge_all_caches();
echo "reset OK: {$intentos} intentos, {$actividades} actividades y {$categorias} categorías de prueba borradas; notificaciones limpias\n";
