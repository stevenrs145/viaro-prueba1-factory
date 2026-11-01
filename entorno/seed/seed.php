<?php
// Sembrado reproducible e idempotente del entorno. Solo datos sintéticos.
//   - Curso QA101, profesor y 6 estudiantes con nombres fijos (estables para el QA visual).
//   - Banco de preguntas del curso con 3 categorías = 3 temas (spec 3).
//   - Preguntas: opción múltiple, verdadero/falso y ensayo (regresión del camino feliz).
//   - "Examen de regresión" con retroalimentación global configurada (escenario 2 del spec 3).
// Uso: php /opt/seed/seed.php   (como www-data, dentro del contenedor web)
define('CLI_SCRIPT', true);
require('/var/www/moodle/config.php');
require_once($CFG->libdir . '/testing/generator/lib.php');
require_once($CFG->dirroot . '/mod/quiz/locallib.php');

use core_question\local\bank\question_bank_helper;

global $DB;
\core\session\manager::set_user(get_admin());

if ($DB->record_exists('course_modules', ['idnumber' => 'QUIZ-REG'])) {
    echo "Ya sembrado (examen QUIZ-REG existe). Nada que hacer.\n";
    exit(0);
}
if ($DB->record_exists('course', ['shortname' => 'QA101'])) {
    fwrite(STDERR, "Sembrado parcial detectado (curso sin examen). Ejecutar: ./entorno/setup.sh --fresh\n");
    exit(1);
}

$gen = new testing_data_generator();
const PASS = 'Viaro.2026';

$course = $gen->create_course(['fullname' => 'Curso QA de Exámenes', 'shortname' => 'QA101', 'idnumber' => 'QA101']);

$mkuser = function (string $username, string $first, string $last) use ($gen) {
    return $gen->create_user([
        'username' => $username, 'password' => PASS, 'firstname' => $first, 'lastname' => $last,
        'email' => "{$username}@example.invalid", 'idnumber' => strtoupper($username),
    ]);
};
$profesor = $mkuser('profesor', 'Paula', 'Profesora');
$gen->enrol_user($profesor->id, $course->id, 'editingteacher');
for ($i = 1; $i <= 6; $i++) {
    $u = $mkuser("estudiante{$i}", 'Estudiante', "Número {$i}");
    $gen->enrol_user($u->id, $course->id, 'student');
}

// Banco de preguntas del curso (Moodle 5.x: los bancos son instancias de mod_qbank).
$qbank = question_bank_helper::get_default_open_instance_system_type($course, true);
$bankctx = context_module::instance($qbank->id);
$qgen = $gen->get_plugin_generator('core_question');

$temas = ['ALG' => 'Álgebra', 'GEO' => 'Geometría', 'HIS' => 'Historia'];
$cats = [];
foreach ($temas as $code => $name) {
    $cats[$code] = $qgen->create_question_category(['contextid' => $bankctx->id, 'name' => $name, 'idnumber' => "TEMA-{$code}"]);
}

// Determinismo: sin mezclar opciones (la mezcla aleatoria rompe cualquier comparación visual y
// vuelve ambiguos los selectores). Se fija en la pregunta Y en el quiz.
$q = [];
$q[] = $qgen->create_question('multichoice', 'one_of_four', ['category' => $cats['ALG']->id, 'name' => 'ALG-1 Opción múltiple', 'shuffleanswers' => 0]);
$q[] = $qgen->create_question('truefalse', 'true', ['category' => $cats['ALG']->id, 'name' => 'ALG-2 Verdadero o falso']);
$q[] = $qgen->create_question('multichoice', 'one_of_four', ['category' => $cats['GEO']->id, 'name' => 'GEO-1 Opción múltiple', 'shuffleanswers' => 0]);
$q[] = $qgen->create_question('truefalse', 'true', ['category' => $cats['GEO']->id, 'name' => 'GEO-2 Verdadero o falso']);
$q[] = $qgen->create_question('truefalse', 'true', ['category' => $cats['HIS']->id, 'name' => 'HIS-1 Verdadero o falso']);
$q[] = $qgen->create_question('essay', 'editor', ['category' => $cats['HIS']->id, 'name' => 'HIS-2 Ensayo']);

$quizgen = $gen->get_plugin_generator('mod_quiz');
$quiz = $quizgen->create_instance([
    'course' => $course->id, 'name' => 'Examen de regresión', 'idnumber' => 'QUIZ-REG',
    'intro' => 'Examen sembrado para la regresión del camino feliz.',
    'questionsperpage' => 2, 'grade' => 10, 'sumgrades' => 0, 'attempts' => 0, 'shuffleanswers' => 0,
    'preferredbehaviour' => 'deferredfeedback',
    'overallfeedbacks' => [
        ['mingrade' => '50%', 'maxgrade' => '101%', 'feedbacktext' => 'Retro global: aprobado.'],
        ['mingrade' => '0%', 'maxgrade' => '50%', 'feedbacktext' => 'Retro global: necesitas repasar.'],
    ],
]);
foreach ($q as $i => $question) {
    quiz_add_quiz_question($question->id, $quiz, intdiv($i, 2) + 1);
}
// En 5.x quiz_update_sumgrades() ya no existe: se usa el grade_calculator.
\mod_quiz\quiz_settings::create($quiz->id)->get_grade_calculator()->recompute_quiz_sumgrades();

echo "Sembrado OK\n";
echo "  curso QA101 id={$course->id}\n  quiz QUIZ-REG id={$quiz->id} cmid={$quiz->cmid}\n";
echo "  usuarios: admin, profesor, estudiante1..6 (clave " . PASS . ")\n";
