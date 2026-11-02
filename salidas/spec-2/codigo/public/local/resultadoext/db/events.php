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

/**
 * Observers del plugin.
 *
 * Son externos ('internal' => false): corren después del commit y un fallo aquí no afecta la transacción del intento.
 *
 * @package    local_resultadoext
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$observers = [
    [
        'eventname' => '\mod_quiz\event\attempt_graded',
        'callback' => '\local_resultadoext\observer::attempt_graded',
        'internal' => false,
    ],
    [
        'eventname' => '\mod_quiz\event\question_manually_graded',
        'callback' => '\local_resultadoext\observer::question_manually_graded',
        'internal' => false,
    ],
];
