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

namespace local_resultadoext\task;

use local_resultadoext\notificador;

/**
 * Entrega un aviso en cron. Lanzar una excepción activa el reintento nativo: 60 s que se duplican en cada fallo.
 *
 * @package    local_resultadoext
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class enviar_resultado extends \core\task\adhoc_task {
    /** @var int Segundos para conectar. */
    const TIMEOUT_CONEXION = 5;
    /** @var int Segundos en total por llamada: un destino colgado no debe retener al cron. */
    const TIMEOUT_TOTAL = 10;

    /**
     * Nombre visible de la tarea.
     *
     * @return string
     */
    public function get_name() {
        return get_string('tareaenviar', 'local_resultadoext');
    }

    /**
     * Entrega el aviso.
     *
     * @throws \RuntimeException si el envío falló y le quedan ejecuciones
     */
    public function execute() {
        $datos = $this->get_custom_data();
        $causa = notificador::procesar((int) $datos->envioid, $this->get_attempts_available());
        if ($causa !== null) {
            throw new \RuntimeException($causa);
        }
    }
}
