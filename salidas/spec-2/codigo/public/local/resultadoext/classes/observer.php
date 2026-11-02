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

namespace local_resultadoext;

/**
 * Reacciona a los eventos del quiz: guarda el aviso y lo encola, sin hacer HTTP.
 *
 * @package    local_resultadoext
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class observer {
    /**
     * Intento enviado y calificado automáticamente. Es el primer aviso, con nota o pendiente de calificación manual.
     *
     * @param \mod_quiz\event\attempt_graded $event
     */
    public static function attempt_graded(\mod_quiz\event\attempt_graded $event): void {
        self::aislar(fn() => notificador::registrar((int) $event->objectid, (int) $event->timecreated, false));
    }

    /**
     * Calificación manual de una pregunta: solo avisa si el intento ya tiene nota y esa nota cambió.
     *
     * @param \mod_quiz\event\question_manually_graded $event
     */
    public static function question_manually_graded(\mod_quiz\event\question_manually_graded $event): void {
        self::aislar(fn() => notificador::registrar((int) $event->other['attemptid'], (int) $event->timecreated, true));
    }

    /**
     * El gestor de eventos solo atrapa \Exception: un \Error llegaría a la pantalla del estudiante.
     *
     * @param callable $accion
     */
    private static function aislar(callable $accion): void {
        try {
            $accion();
        } catch (\Throwable $e) {
            debugging('local_resultadoext: ' . $e->getMessage(), DEBUG_DEVELOPER, $e->getTrace());
        }
    }
}
