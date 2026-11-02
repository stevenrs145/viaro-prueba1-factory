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
 * Strings for local_resultadoext.
 *
 * @package    local_resultadoext
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['causa'] = 'Cause';
$string['clave'] = 'Idempotency key';
$string['codigohttp'] = 'HTTP code';
$string['cuerpo'] = 'Response body';
$string['datosenviados'] = 'Data sent';
$string['destino'] = 'Destination URL';
$string['destino_desc'] = 'External system that receives the results. If empty, nothing is sent and each attempt is logged as skipped.';
$string['errnocurl'] = 'cURL errno';
$string['errorcurl'] = 'cURL error';
$string['estado'] = 'Status';
$string['estado_agotado'] = 'Exhausted';
$string['estado_exitoso'] = 'Successful';
$string['estado_omitido'] = 'Skipped';
$string['estado_pendiente'] = 'Queued';
$string['estado_reintentando'] = 'Retrying';
$string['estudiante'] = 'Student';
$string['examen'] = 'Quiz';
$string['hora'] = 'Time';
$string['idexterno'] = 'External id';
$string['intento'] = 'Attempt';
$string['llamadaexitosa'] = 'Accepted';
$string['llamadafallida'] = 'Failed';
$string['llamadas'] = 'Calls';
$string['maxintentos'] = 'Maximum runs per delivery';
$string['maxintentos_desc'] = 'Runs of the task for each delivery, counting the first one. Moodle waits 60 seconds after the first failure and doubles the wait after each one, so 12 runs take about 34 hours. Applies to new deliveries.';
$string['nota'] = 'Grade status';
$string['numero'] = 'No.';
$string['numllamadas'] = 'Calls made';
$string['pluginname'] = 'Result notification to external system';
$string['privacy:metadata:envios'] = 'Each notification about a quiz attempt sent to the external system.';
$string['privacy:metadata:envios:attemptid'] = 'The quiz attempt.';
$string['privacy:metadata:envios:estado'] = 'The delivery status.';
$string['privacy:metadata:envios:payload'] = 'The data sent, including the student identifiers and the grades.';
$string['privacy:metadata:envios:quizid'] = 'The quiz.';
$string['privacy:metadata:envios:timecreated'] = 'When the notification was created.';
$string['privacy:metadata:envios:userid'] = 'The student who made the attempt.';
$string['privacy:metadata:externo'] = 'The result of each attempt is sent to the external system configured by the administrator.';
$string['privacy:metadata:externo:grade'] = 'The attempt grade and the final grade.';
$string['privacy:metadata:externo:idnumber'] = 'The ID number of the student.';
$string['privacy:metadata:externo:timestamp'] = 'When the result was produced.';
$string['privacy:metadata:externo:userid'] = 'The Moodle user id of the student.';
$string['privacy:metadata:externo:username'] = 'The username of the student.';
$string['privacy:metadata:llamadas'] = 'Each HTTP call made for a notification.';
$string['privacy:metadata:llamadas:cuerpo'] = 'The response of the external system.';
$string['privacy:metadata:llamadas:envioid'] = 'The notification.';
$string['privacy:metadata:llamadas:timecreated'] = 'When the call was made.';
$string['registro'] = 'Log of deliveries to the external system';
$string['resultado'] = 'Result';
$string['resultadoext:viewlog'] = 'View the log of deliveries to the external system';
$string['sinenvios'] = 'There are no deliveries to show.';
$string['sinllamadas'] = 'No calls have been made for this delivery.';
$string['tareaenviar'] = 'Send a quiz result to the external system';
$string['url'] = 'URL';
$string['verllamadas'] = 'View calls';
$string['volver'] = 'Back to the log';
