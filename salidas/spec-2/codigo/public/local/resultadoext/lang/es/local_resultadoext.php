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
 * Cadenas de local_resultadoext.
 *
 * @package    local_resultadoext
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['causa'] = 'Causa';
$string['clave'] = 'Clave de idempotencia';
$string['codigohttp'] = 'Código HTTP';
$string['cuerpo'] = 'Cuerpo de la respuesta';
$string['datosenviados'] = 'Datos enviados';
$string['destino'] = 'URL de destino';
$string['destino_desc'] = 'Sistema externo que recibe los resultados. Si queda vacía, no se envía nada y cada intento queda registrado como omitido.';
$string['errnocurl'] = 'Errno de cURL';
$string['errorcurl'] = 'Error de cURL';
$string['estado'] = 'Estado';
$string['estado_agotado'] = 'Agotado';
$string['estado_exitoso'] = 'Exitoso';
$string['estado_omitido'] = 'Omitido';
$string['estado_pendiente'] = 'En cola';
$string['estado_reintentando'] = 'Reintentando';
$string['estudiante'] = 'Estudiante';
$string['examen'] = 'Examen';
$string['hora'] = 'Hora';
$string['idexterno'] = 'Id externo';
$string['intento'] = 'Intento';
$string['llamadaexitosa'] = 'Aceptada';
$string['llamadafallida'] = 'Fallida';
$string['llamadas'] = 'Llamadas';
$string['maxintentos'] = 'Máximo de ejecuciones por envío';
$string['maxintentos_desc'] = 'Ejecuciones de la tarea para cada envío, contando la primera. Moodle espera 60 segundos tras el primer fallo y duplica la espera en cada uno, así que 12 ejecuciones duran unas 34 horas. Aplica a los envíos nuevos.';
$string['nota'] = 'Estado de la nota';
$string['numero'] = 'N.º';
$string['numllamadas'] = 'Llamadas hechas';
$string['pluginname'] = 'Notificación de resultados a un sistema externo';
$string['privacy:metadata:envios'] = 'Cada aviso sobre un intento de examen enviado al sistema externo.';
$string['privacy:metadata:envios:attemptid'] = 'El intento del examen.';
$string['privacy:metadata:envios:estado'] = 'El estado del envío.';
$string['privacy:metadata:envios:payload'] = 'Los datos enviados, con los identificadores del estudiante y las notas.';
$string['privacy:metadata:envios:quizid'] = 'El examen.';
$string['privacy:metadata:envios:timecreated'] = 'Cuándo se creó el aviso.';
$string['privacy:metadata:envios:userid'] = 'El estudiante que hizo el intento.';
$string['privacy:metadata:externo'] = 'El resultado de cada intento se envía al sistema externo que configura el administrador.';
$string['privacy:metadata:externo:grade'] = 'La nota del intento y la nota final.';
$string['privacy:metadata:externo:idnumber'] = 'El número de identificación del estudiante.';
$string['privacy:metadata:externo:timestamp'] = 'Cuándo se produjo el resultado.';
$string['privacy:metadata:externo:userid'] = 'El id de usuario de Moodle del estudiante.';
$string['privacy:metadata:externo:username'] = 'El nombre de usuario del estudiante.';
$string['privacy:metadata:llamadas'] = 'Cada llamada HTTP hecha para un aviso.';
$string['privacy:metadata:llamadas:cuerpo'] = 'La respuesta del sistema externo.';
$string['privacy:metadata:llamadas:envioid'] = 'El aviso.';
$string['privacy:metadata:llamadas:timecreated'] = 'Cuándo se hizo la llamada.';
$string['registro'] = 'Registro de envíos al sistema externo';
$string['resultado'] = 'Resultado';
$string['resultadoext:viewlog'] = 'Ver el registro de envíos al sistema externo';
$string['sinenvios'] = 'No hay envíos para mostrar.';
$string['sinllamadas'] = 'Todavía no se hizo ninguna llamada para este envío.';
$string['tareaenviar'] = 'Enviar un resultado de examen al sistema externo';
$string['url'] = 'URL';
$string['verllamadas'] = 'Ver llamadas';
$string['volver'] = 'Volver al registro';
