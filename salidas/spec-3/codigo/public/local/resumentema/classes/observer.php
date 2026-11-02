<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace local_resumentema;

/**
 * Impide que la retroalimentación global reingrese por restauración, duplicado, servicios web o escrituras directas.
 *
 * @package    local_resumentema
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class observer {
    /**
     * Restauración de un curso completo.
     *
     * @param \core\event\course_restored $evento
     */
    public static function curso_restaurado(\core\event\course_restored $evento): void {
        retro_global::archivar_curso($evento->objectid);
    }

    /**
     * Creación, duplicado o edición de una actividad.
     *
     * @param \core\event\base $evento course_module_created o course_module_updated
     */
    public static function modulo_guardado(\core\event\base $evento): void {
        if ($evento->other['modulename'] === 'quiz') {
            retro_global::archivar_quiz($evento->other['instanceid']);
        }
    }

    /**
     * Eliminación de una actividad.
     *
     * @param \core\event\course_module_deleted $evento
     */
    public static function modulo_eliminado(\core\event\course_module_deleted $evento): void {
        if ($evento->other['modulename'] === 'quiz') {
            retro_global::purgar_quiz($evento->other['instanceid']);
        }
    }

    /**
     * Red final: cualquier vía que los eventos anteriores no vean se limpia antes de que un estudiante llegue al cierre.
     *
     * @param \mod_quiz\event\attempt_started $evento
     */
    public static function intento_iniciado(\mod_quiz\event\attempt_started $evento): void {
        global $DB;

        // El evento solo trae quizid en la variante de vista previa (locallib.php:401-407).
        retro_global::archivar_quiz($DB->get_field('quiz_attempts', 'quiz', ['id' => $evento->objectid], MUST_EXIST));
    }
}
