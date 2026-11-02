<?php
// Identidad del sitio: español e imagen propia, sin tocar el core de Moodle.
//   - Instala el paquete de idioma es y lo deja como idioma del sitio y de todos los usuarios.
//   - Traduce el contenido sembrado, conservando su estructura: misma opción correcta, mismos temas, mismas notas.
//   - Aplica el diseño como ajustes del tema Boost (en base de datos): no agrega archivos al árbol de Moodle.
// Idempotente. Uso: php /opt/seed/identidad.php   (como www-data, dentro del contenedor web)
define('CLI_SCRIPT', true);
require('/var/www/moodle/config.php');
require_once($CFG->libdir . '/filelib.php');

global $DB;
\core\session\manager::set_user(get_admin());

// 1. Idioma
if (!get_string_manager()->translation_exists('es', false)) {
    (new \tool_langimport\controller())->install_languagepacks('es', false);
    get_string_manager(true)->reset_caches();
    if (!get_string_manager()->translation_exists('es', false)) {
        fwrite(STDERR, "No se pudo instalar el paquete de idioma es: revisar la conexión con download.moodle.org\n");
        exit(1);
    }
}
set_config('lang', 'es');
set_config('autolang', 0); // el idioma del navegador no debe cambiar el sitio: las pruebas y capturas serían distintas
set_config('langmenu', 0);
$DB->set_field_select('user', 'lang', 'es', 'deleted = 0');

// Cadenas sin traducir o mal traducidas en el paquete es: se corrigen como traducción local, fuera del core.
$local = $CFG->dataroot . '/lang/es_local';
make_writable_directory($local);
$cadenas = [
    'quiz.php' => ['attemptsubmitted' => 'Intento enviado.', 'feedback' => 'Retroalimentación'],
    'moodle.php' => ['loginwelcometitle' => 'Viaro Exámenes',
        'loginwelcomedescription' => 'Evaluaciones claras para estudiantes y docentes. Inicia sesión para continuar.'],
];
foreach ($cadenas as $archivo => $lista) {
    $php = "<?php\n";
    foreach ($lista as $clave => $texto) {
        $php .= '$string[' . var_export($clave, true) . '] = ' . var_export($texto, true) . ";\n";
    }
    file_put_contents("{$local}/{$archivo}", $php);
}

// 2. Nombre del sitio
$sitio = get_site();
$sitio->fullname = 'Viaro Exámenes';
$sitio->shortname = 'Viaro';
$DB->update_record('course', $sitio);

// 3. Contenido sembrado en español. El orden de las opciones se conserva: la primera es la correcta.
$preguntas = [
    'ALG-1 Opción múltiple' => [
        'texto' => '¿Cuánto es 3 × 4?',
        'opciones' => [['12', '12 es el resultado de sumar cuatro veces el 3.'], ['7', '7 es la suma, no el producto.'],
            ['9', '9 es 3 × 3.'], ['10', '10 no es múltiplo de 3.']],
        'general' => '3 × 4 = 12.',
    ],
    'ALG-2 Verdadero o falso' => ['texto' => 'La suma de dos números pares siempre es par.', 'general' => 'Dos pares suman siempre un múltiplo de 2.'],
    'GEO-1 Opción múltiple' => [
        'texto' => '¿Cuántos lados tiene un hexágono?',
        'opciones' => [['6', 'Hexa significa seis.'], ['4', 'Cuatro lados tiene un cuadrilátero.'],
            ['5', 'Cinco lados tiene un pentágono.'], ['8', 'Ocho lados tiene un octágono.']],
        'general' => 'Un hexágono tiene seis lados.',
    ],
    'GEO-2 Verdadero o falso' => ['texto' => 'Todo cuadrado es también un rectángulo.', 'general' => 'Un cuadrado tiene cuatro ángulos rectos.'],
    'HIS-1 Verdadero o falso' => ['texto' => 'Guatemala declaró su independencia en 1821.', 'general' => 'El Acta de Independencia se firmó el 15 de septiembre de 1821.'],
    'HIS-2 Ensayo' => [
        'texto' => 'Explica en un párrafo una consecuencia de la independencia de Centroamérica.',
        'general' => 'Una buena respuesta nombra la consecuencia y explica por qué ocurrió.',
        'calificador' => 'Valorar que la consecuencia sea correcta y esté explicada.',
    ],
];
foreach ($preguntas as $nombre => $p) {
    foreach ($DB->get_records('question', ['name' => $nombre]) as $q) {
        $DB->update_record('question', (object) ['id' => $q->id, 'questiontext' => "<p>{$p['texto']}</p>",
            'questiontextformat' => FORMAT_HTML, 'generalfeedback' => "<p>{$p['general']}</p>", 'generalfeedbackformat' => FORMAT_HTML]);
        $respuestas = array_values($DB->get_records('question_answers', ['question' => $q->id], 'id'));
        if ($q->qtype === 'multichoice') {
            foreach ($respuestas as $i => $r) {
                $DB->update_record('question_answers', (object) ['id' => $r->id, 'answer' => $p['opciones'][$i][0],
                    'answerformat' => FORMAT_HTML, 'feedback' => $p['opciones'][$i][1], 'feedbackformat' => FORMAT_HTML]);
            }
            $DB->set_field('qtype_multichoice_options', 'correctfeedback', 'Respuesta correcta.', ['questionid' => $q->id]);
            $DB->set_field('qtype_multichoice_options', 'partiallycorrectfeedback', 'Respuesta parcialmente correcta.', ['questionid' => $q->id]);
            $DB->set_field('qtype_multichoice_options', 'incorrectfeedback', 'Respuesta incorrecta.', ['questionid' => $q->id]);
        } else if ($q->qtype === 'truefalse') {
            foreach ($respuestas as $r) {
                $DB->set_field('question_answers', 'feedback', $r->fraction > 0 ? 'Correcto.' : 'Incorrecto.', ['id' => $r->id]);
            }
        } else if ($q->qtype === 'essay') {
            $DB->set_field('qtype_essay_options', 'graderinfo', "<p>{$p['calificador']}</p>", ['questionid' => $q->id]);
            $DB->set_field('qtype_essay_options', 'graderinfoformat', FORMAT_HTML, ['questionid' => $q->id]);
        }
    }
}

// 4. Diseño: ajustes de Boost
set_config('theme', 'boost');
set_config('scsspre', file_get_contents(__DIR__ . '/tema-variables.scss'), 'theme_boost');
set_config('scss', file_get_contents(__DIR__ . '/tema.scss'), 'theme_boost');

purge_all_caches();
echo "Identidad OK: español, Viaro Exámenes y tema aplicado\n";
