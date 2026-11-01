<?php
// Deja el estado de prueba conocido antes de cada corrida de la suite (determinismo funcional y visual):
//  - borra todos los intentos de los exámenes del curso QA101
//  - desactiva tours de usuario (ventanas emergentes que tapan la pantalla de forma no determinista)
// Uso: php /opt/seed/reset.php
define('CLI_SCRIPT', true);
require('/var/www/moodle/config.php');
require_once($CFG->dirroot . '/mod/quiz/locallib.php');

global $DB;
$course = $DB->get_record('course', ['shortname' => 'QA101'], '*', MUST_EXIST);
$n = 0;
foreach ($DB->get_records('quiz', ['course' => $course->id]) as $quiz) {
    $n += $DB->count_records('quiz_attempts', ['quiz' => $quiz->id]);
    quiz_delete_all_attempts($quiz);
}
$DB->set_field('tool_usertours_tours', 'enabled', 0);
purge_all_caches();
echo "reset OK: {$n} intentos borrados, tours desactivados\n";
