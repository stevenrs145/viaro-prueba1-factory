<?php
// Migración de instancias ya sembradas: completa estudiante1..12 (el seed actual ya los crea en instalaciones nuevas).
define('CLI_SCRIPT', true);
require('/var/www/moodle/config.php');
require_once($CFG->libdir . '/testing/generator/lib.php');
global $DB;
$gen = new testing_data_generator();
$course = $DB->get_record('course', ['shortname' => 'QA101'], '*', MUST_EXIST);
for ($i = 1; $i <= 12; $i++) {
    if ($DB->record_exists('user', ['username' => "estudiante{$i}"])) continue;
    $u = $gen->create_user(['username' => "estudiante{$i}", 'password' => 'Viaro.2026', 'firstname' => 'Estudiante',
        'lastname' => "Número {$i}", 'email' => "estudiante{$i}@example.invalid", 'idnumber' => strtoupper("estudiante{$i}")]);
    $gen->enrol_user($u->id, $course->id, 'student');
    echo "creado estudiante{$i}\n";
}
