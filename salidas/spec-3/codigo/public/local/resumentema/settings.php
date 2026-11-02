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
 * Retira de los ajustes del examen los que configuraban la retroalimentación global. El plugin no agrega ajustes.
 *
 * @package    local_resumentema
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($ADMIN->fulltree) {
    // Los plugins locales cargan después que los módulos (admin/settings/plugins.php:848-860): la página ya existe.
    $paginaquiz = $ADMIN->locate('modsettingquiz');
    if ($paginaquiz) {
        unset($paginaquiz->settings->quizreviewoverallfeedback, $paginaquiz->settings->quizinitialnumfeedbacks);
    }
}
