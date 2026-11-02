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

namespace local_resultadoext\privacy;

use core_privacy\local\metadata\collection;
use core_privacy\local\request\approved_contextlist;
use core_privacy\local\request\approved_userlist;
use core_privacy\local\request\contextlist;
use core_privacy\local\request\transform;
use core_privacy\local\request\userlist;
use core_privacy\local\request\writer;

/**
 * Privacy API: datos enviados al sistema externo y registro de esos envíos. El registro vive en el contexto de sistema.
 *
 * @package    local_resultadoext
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class provider implements
    \core_privacy\local\metadata\provider,
    \core_privacy\local\request\core_userlist_provider,
    \core_privacy\local\request\plugin\provider {
    /**
     * Describe los datos personales.
     *
     * @param collection $collection
     * @return collection
     */
    public static function get_metadata(collection $collection): collection {
        $collection->add_database_table('local_resultadoext_envios', [
            'attemptid' => 'privacy:metadata:envios:attemptid',
            'quizid' => 'privacy:metadata:envios:quizid',
            'userid' => 'privacy:metadata:envios:userid',
            'payload' => 'privacy:metadata:envios:payload',
            'estado' => 'privacy:metadata:envios:estado',
            'timecreated' => 'privacy:metadata:envios:timecreated',
        ], 'privacy:metadata:envios');
        $collection->add_database_table('local_resultadoext_llamadas', [
            'envioid' => 'privacy:metadata:llamadas:envioid',
            'cuerpo' => 'privacy:metadata:llamadas:cuerpo',
            'timecreated' => 'privacy:metadata:llamadas:timecreated',
        ], 'privacy:metadata:llamadas');
        $collection->add_external_location_link('sistema_externo', [
            'userid' => 'privacy:metadata:externo:userid',
            'username' => 'privacy:metadata:externo:username',
            'idnumber' => 'privacy:metadata:externo:idnumber',
            'grade' => 'privacy:metadata:externo:grade',
            'timestamp' => 'privacy:metadata:externo:timestamp',
        ], 'privacy:metadata:externo');
        return $collection;
    }

    /**
     * Contextos con datos del usuario.
     *
     * @param int $userid
     * @return contextlist
     */
    public static function get_contexts_for_userid(int $userid): contextlist {
        global $DB;

        $contextlist = new contextlist();
        if ($DB->record_exists('local_resultadoext_envios', ['userid' => $userid])) {
            $contextlist->add_system_context();
        }
        return $contextlist;
    }

    /**
     * Usuarios con datos en un contexto.
     *
     * @param userlist $userlist
     */
    public static function get_users_in_context(userlist $userlist) {
        if ($userlist->get_context()->contextlevel !== CONTEXT_SYSTEM) {
            return;
        }
        $userlist->add_from_sql('userid', 'SELECT userid FROM {local_resultadoext_envios}', []);
    }

    /**
     * Exporta los envíos de un usuario.
     *
     * @param approved_contextlist $contextlist
     */
    public static function export_user_data(approved_contextlist $contextlist) {
        global $DB;

        $contexto = \context_system::instance();
        if (!in_array($contexto->id, $contextlist->get_contextids())) {
            return;
        }
        $envios = $DB->get_records('local_resultadoext_envios', ['userid' => $contextlist->get_user()->id], 'id ASC');
        foreach ($envios as $envio) {
            $llamadas = $DB->get_records('local_resultadoext_llamadas', ['envioid' => $envio->id], 'numero ASC', 'numero, destino, httpcode, cuerpo');
            writer::with_context($contexto)->export_data(
                [get_string('pluginname', 'local_resultadoext'), $envio->idempotencykey],
                (object) [
                    'attemptid' => $envio->attemptid,
                    'estado' => $envio->estado,
                    'payload' => $envio->payload,
                    'causa' => $envio->causa,
                    'timecreated' => transform::datetime($envio->timecreated),
                    'llamadas' => array_values($llamadas),
                ]
            );
        }
    }

    /**
     * Borra todos los datos de un contexto.
     *
     * @param \context $context
     */
    public static function delete_data_for_all_users_in_context(\context $context) {
        global $DB;

        if ($context->contextlevel !== CONTEXT_SYSTEM) {
            return;
        }
        $DB->delete_records('local_resultadoext_llamadas');
        $DB->delete_records('local_resultadoext_envios');
    }

    /**
     * Borra los datos de un usuario.
     *
     * @param approved_contextlist $contextlist
     */
    public static function delete_data_for_user(approved_contextlist $contextlist) {
        if (in_array(\context_system::instance()->id, $contextlist->get_contextids())) {
            self::borrar([$contextlist->get_user()->id]);
        }
    }

    /**
     * Borra los datos de varios usuarios.
     *
     * @param approved_userlist $userlist
     */
    public static function delete_data_for_users(approved_userlist $userlist) {
        if ($userlist->get_context()->contextlevel === CONTEXT_SYSTEM) {
            self::borrar($userlist->get_userids());
        }
    }

    /**
     * Borra los envíos de unos usuarios y sus llamadas.
     *
     * @param int[] $userids
     */
    private static function borrar(array $userids): void {
        global $DB;

        if (!$userids) {
            return;
        }
        [$condicion, $parametros] = $DB->get_in_or_equal($userids);
        $DB->delete_records_select(
            'local_resultadoext_llamadas',
            "envioid IN (SELECT id FROM {local_resultadoext_envios} WHERE userid $condicion)",
            $parametros
        );
        $DB->delete_records_select('local_resultadoext_envios', "userid $condicion", $parametros);
    }
}
