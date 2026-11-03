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
 * Registro de envíos al sistema externo.
 *
 * Todo lo que viene del sistema externo o del examen se escapa: es contenido de terceros en una página de administrador.
 *
 * @package    local_resultadoext
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require(__DIR__ . '/../../config.php');
require_once($CFG->libdir . '/adminlib.php');

$intento = optional_param('intento', 0, PARAM_INT);
$envioid = optional_param('envio', 0, PARAM_INT);
$pagina = optional_param('pagina', 0, PARAM_INT);

require_login();
require_capability('local/resultadoext:viewlog', context_system::instance());

$parametros = array_filter(['intento' => $intento, 'envio' => $envioid, 'pagina' => $pagina]);
admin_externalpage_setup('local_resultadoext_registro', '', $parametros);

$componente = 'local_resultadoext';
$estadovisible = fn(string $estado) => get_string('estado_' . $estado, $componente);
$fecha = fn(int $momento) => userdate($momento, get_string('strftimedatetimeseconds', 'langconfig'));

echo $OUTPUT->header();
echo $OUTPUT->heading(get_string('registro', $componente));

if ($envioid) {
    $envio = $DB->get_record('local_resultadoext_envios', ['id' => $envioid], '*', MUST_EXIST);
    echo html_writer::tag('p', html_writer::link(new moodle_url('/local/resultadoext/registro.php'), get_string('volver', $componente)));

    $resumen = new html_table();
    $resumen->id = 'local-resultadoext-envio';
    $resumen->data = [
        [get_string('clave', $componente), s($envio->idempotencykey)],
        [get_string('estado', $componente), s($estadovisible($envio->estado))],
        [get_string('datosenviados', $componente), html_writer::tag('pre', s($envio->payload), ['class' => 'mb-0 text-wrap'])],
    ];
    echo html_writer::table($resumen);

    echo $OUTPUT->heading(get_string('llamadas', $componente), 3);
    $llamadas = $DB->get_records('local_resultadoext_llamadas', ['envioid' => $envio->id], 'numero ASC');
    if ($llamadas) {
        $tabla = new html_table();
        $tabla->id = 'local-resultadoext-llamadas';
        $tabla->head = [
            get_string('numero', $componente),
            get_string('hora', $componente),
            get_string('url', $componente),
            get_string('codigohttp', $componente),
            get_string('errnocurl', $componente),
            get_string('errorcurl', $componente),
            get_string('resultado', $componente),
            get_string('cuerpo', $componente),
        ];
        foreach ($llamadas as $llamada) {
            $tabla->data[] = [
                (int) $llamada->numero,
                s($fecha((int) $llamada->timecreated)),
                s($llamada->destino),
                s((string) $llamada->httpcode),
                s((string) $llamada->curlerrno),
                s((string) $llamada->curlerror),
                get_string($llamada->exito ? 'llamadaexitosa' : 'llamadafallida', $componente),
                html_writer::tag('code', s((string) $llamada->cuerpo)),
            ];
        }
        echo html_writer::table($tabla);
    } else {
        echo $OUTPUT->notification(get_string('sinllamadas', $componente), 'info', false);
    }
} else {
    $porpagina = 50;
    $condicion = $intento ? ['attemptid' => $intento] : [];
    $total = $DB->count_records('local_resultadoext_envios', $condicion);
    $envios = $DB->get_records('local_resultadoext_envios', $condicion, 'id DESC', '*', $pagina * $porpagina, $porpagina);

    if ($envios) {
        $tabla = new html_table();
        $tabla->id = 'local-resultadoext-envios';
        $tabla->head = [
            get_string('hora', $componente),
            get_string('estudiante', $componente),
            get_string('examen', $componente),
            get_string('intento', $componente),
            get_string('nota', $componente),
            get_string('estado', $componente),
            get_string('numllamadas', $componente),
            get_string('idexterno', $componente),
            get_string('causa', $componente),
            '',
        ];
        foreach ($envios as $envio) {
            $datos = json_decode($envio->payload);
            $enlace = new moodle_url('/local/resultadoext/registro.php', ['envio' => $envio->id]);
            $tabla->data[] = [
                s($fecha((int) $envio->timecreated)),
                s($datos->student->username ?? ''),
                s($datos->quiz->name ?? ''),
                (int) $envio->attemptid,
                s($envio->gradestatus),
                s($estadovisible($envio->estado)),
                (int) $envio->intentos,
                s((string) $envio->externalid),
                s((string) $envio->causa),
                html_writer::link($enlace, get_string('verllamadas', $componente)),
            ];
        }
        echo html_writer::table($tabla);
        echo $OUTPUT->paging_bar($total, $pagina, $porpagina, new moodle_url('/local/resultadoext/registro.php', ['intento' => $intento]), 'pagina');
    } else {
        echo $OUTPUT->notification(get_string('sinenvios', $componente), 'info', false);
    }
}

echo $OUTPUT->footer();
