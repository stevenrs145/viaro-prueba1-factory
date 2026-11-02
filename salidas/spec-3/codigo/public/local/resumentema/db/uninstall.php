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
 * Desinstalación: devuelve la retroalimentación global a los exámenes.
 *
 * @package    local_resumentema
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Restaura lo archivado. Corre antes de que Moodle borre las tablas del plugin (lib/adminlib.php:169 y :226).
 *
 * @return bool
 */
function xmldb_local_resumentema_uninstall() {
    \local_resumentema\retro_global::restaurar_todo();
    return true;
}
