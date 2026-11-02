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
 * Ajustes del plugin y página del registro.
 *
 * @package    local_resultadoext
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    $pagina = new admin_settingpage('local_resultadoext', get_string('pluginname', 'local_resultadoext'));
    $ADMIN->add('localplugins', $pagina);

    if ($ADMIN->fulltree) {
        $pagina->add(new admin_setting_configtext(
            'local_resultadoext/destino',
            get_string('destino', 'local_resultadoext'),
            get_string('destino_desc', 'local_resultadoext'),
            '',
            PARAM_URL,
            60
        ));
        $opciones = array_combine(range(1, 12), range(1, 12));
        $pagina->add(new admin_setting_configselect(
            'local_resultadoext/maxintentos',
            get_string('maxintentos', 'local_resultadoext'),
            get_string('maxintentos_desc', 'local_resultadoext'),
            12,
            $opciones
        ));
    }
}

// Fuera del bloque anterior: un gestor con la capacidad ve el registro aunque no administre el sitio.
$ADMIN->add('reports', new admin_externalpage(
    'local_resultadoext_registro',
    get_string('registro', 'local_resultadoext'),
    new moodle_url('/local/resultadoext/registro.php'),
    'local/resultadoext:viewlog'
));
