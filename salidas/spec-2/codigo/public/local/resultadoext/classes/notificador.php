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

use mod_quiz\quiz_attempt;

defined('MOODLE_INTERNAL') || die();

global $CFG;
require_once($CFG->dirroot . '/mod/quiz/locallib.php');
require_once($CFG->libdir . '/filelib.php');

/**
 * Arma, registra y entrega los avisos al sistema externo.
 *
 * @package    local_resultadoext
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class notificador {
    /** @var string Aviso en cola, todavía sin llamadas. */
    const ESTADO_PENDIENTE = 'pendiente';
    /** @var string Falló al menos una vez y le quedan ejecuciones. */
    const ESTADO_REINTENTANDO = 'reintentando';
    /** @var string El sistema externo aceptó el aviso. */
    const ESTADO_EXITOSO = 'exitoso';
    /** @var string No hay destino configurado: no se hizo HTTP. */
    const ESTADO_OMITIDO = 'omitido';
    /** @var string Falló la última ejecución disponible. */
    const ESTADO_AGOTADO = 'agotado';
    /** @var int Tope del cuerpo de respuesta que se guarda. */
    const TOPE_CUERPO = 2000;
    /** @var int Ejecuciones de la tarea si el administrador no configuró otra cosa. */
    const MAX_INTENTOS = 12;
    /** @var string Causa de un envío sin destino. */
    const CAUSA_SIN_DESTINO = 'destino no configurado';

    /**
     * Guarda el aviso de un intento y lo encola. No hace HTTP: corre en la petición del estudiante o del profesor.
     *
     * @param int $attemptid
     * @param int $momento marca de tiempo del evento
     * @param bool $manual true si viene de una calificación manual
     */
    public static function registrar(int $attemptid, int $momento, bool $manual): void {
        global $DB;

        $attempt = $DB->get_record('quiz_attempts', ['id' => $attemptid]);
        if (!$attempt || $attempt->preview || $attempt->state !== quiz_attempt::FINISHED) {
            return;
        }
        $pendiente = is_null($attempt->sumgrades);
        if ($manual && $pendiente) {
            // Faltan otros ensayos por calificar: el aviso con nota sale cuando el intento quede completo.
            return;
        }
        $clave = self::clave($attempt);
        if ($clave === null) {
            return;
        }

        $quiz = $DB->get_record('quiz', ['id' => $attempt->quiz], '*', MUST_EXIST);
        $destino = self::destino();
        $ahora = time();
        $envio = (object) [
            'attemptid' => $attempt->id,
            'quizid' => $quiz->id,
            'userid' => $attempt->userid,
            'idempotencykey' => $clave,
            'gradestatus' => $pendiente ? 'pending' : 'graded',
            'payload' => json_encode(self::datos($attempt, $quiz, $clave, $momento), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'estado' => $destino === '' ? self::ESTADO_OMITIDO : self::ESTADO_PENDIENTE,
            'intentos' => 0,
            'causa' => $destino === '' ? self::CAUSA_SIN_DESTINO : null,
            'timecreated' => $ahora,
            'timemodified' => $ahora,
        ];
        $envio->id = $DB->insert_record('local_resultadoext_envios', $envio);

        if ($destino !== '') {
            $tarea = new task\enviar_resultado();
            $tarea->set_custom_data(['envioid' => $envio->id]);
            $tarea->set_attempts_available(self::max_intentos());
            \core\task\manager::queue_adhoc_task($tarea);
        }
    }

    /**
     * Clave de idempotencia del estado actual de la nota, o null si el último aviso ya informó esa nota.
     *
     * Una nota puede volver a un valor anterior (5, 6, 5): ese caso es un aviso nuevo y necesita otra clave, porque el
     * sistema externo trataría la clave repetida como duplicado y se quedaría con la nota intermedia.
     *
     * @param \stdClass $attempt
     * @return string|null
     */
    private static function clave(\stdClass $attempt): ?string {
        global $DB;

        $nota = is_null($attempt->sumgrades) ? 'pendiente' : sprintf('%.5F', (float) $attempt->sumgrades);
        $base = "intento-{$attempt->id}-{$nota}";
        $ultimos = $DB->get_records('local_resultadoext_envios', ['attemptid' => $attempt->id], 'id DESC', 'id, idempotencykey', 0, 1);
        $ultimo = reset($ultimos);
        if ($ultimo && ($ultimo->idempotencykey === $base || str_starts_with($ultimo->idempotencykey, $base . '-'))) {
            return null;
        }
        if ($DB->record_exists('local_resultadoext_envios', ['idempotencykey' => $base])) {
            return $base . '-' . ($DB->count_records('local_resultadoext_envios', ['attemptid' => $attempt->id]) + 1);
        }
        return $base;
    }

    /**
     * Datos del aviso. Se congelan al registrarlo para que cada reintento envíe exactamente lo mismo.
     *
     * @param \stdClass $attempt
     * @param \stdClass $quiz
     * @param string $clave
     * @param int $momento
     * @return array
     */
    private static function datos(\stdClass $attempt, \stdClass $quiz, string $clave, int $momento): array {
        global $DB;

        $estudiante = $DB->get_record('user', ['id' => $attempt->userid], 'id, username, idnumber', MUST_EXIST);
        $cm = get_coursemodule_from_instance('quiz', $quiz->id, $quiz->course, false, MUST_EXIST);
        $nota = quiz_rescale_grade($attempt->sumgrades, $quiz, false);
        $final = quiz_get_best_grade($quiz, $attempt->userid);

        return [
            'idempotency_key' => $clave,
            'student' => [
                'id' => (int) $estudiante->id,
                'username' => $estudiante->username,
                'idnumber' => $estudiante->idnumber,
            ],
            'quiz' => [
                'id' => (int) $quiz->id,
                'cmid' => (int) $cm->id,
                'name' => $quiz->name,
            ],
            'attempt' => (int) $attempt->id,
            'attempt_grade' => is_null($nota) ? null : round((float) $nota, 5),
            'final_grade' => is_null($final) ? null : round((float) $final, 5),
            'max_grade' => (float) $quiz->grade,
            'grade_status' => is_null($attempt->sumgrades) ? 'pending' : 'graded',
            'timestamp' => gmdate('Y-m-d\TH:i:s\Z', $momento),
        ];
    }

    /**
     * Ejecuta un envío: hace la llamada y deja registrado qué pasó.
     *
     * @param int $envioid
     * @param int $restantes ejecuciones disponibles de la tarea, contando esta
     * @return string|null causa del fallo si hay que reintentar; null si el envío terminó
     */
    public static function procesar(int $envioid, int $restantes): ?string {
        global $DB;

        $envio = $DB->get_record('local_resultadoext_envios', ['id' => $envioid]);
        if (!$envio || !in_array($envio->estado, [self::ESTADO_PENDIENTE, self::ESTADO_REINTENTANDO], true)) {
            return null;
        }

        $destino = self::destino();
        if ($destino === '') {
            self::actualizar($envio, self::ESTADO_OMITIDO, self::CAUSA_SIN_DESTINO);
            return null;
        }

        $respuesta = self::llamar($destino, $envio);
        $evaluacion = self::evaluar($respuesta->http, $respuesta->errno, $respuesta->error, $respuesta->cuerpo);

        $envio->intentos++;
        $DB->insert_record('local_resultadoext_llamadas', (object) [
            'envioid' => $envio->id,
            'numero' => $envio->intentos,
            'destino' => $destino,
            'httpcode' => $respuesta->http ?: null,
            'curlerrno' => $respuesta->errno ?: null,
            'curlerror' => $respuesta->error === '' ? null : $respuesta->error,
            'cuerpo' => self::recortar($respuesta->cuerpo),
            'exito' => $evaluacion->exito ? 1 : 0,
            'timecreated' => time(),
        ]);

        if ($evaluacion->exito) {
            $envio->externalid = $evaluacion->externalid;
            self::actualizar($envio, self::ESTADO_EXITOSO, null);
            return null;
        }
        if ($restantes <= 1) {
            // No se lanza excepción: la tarea termina y no queda una fila muerta en la cola.
            self::actualizar($envio, self::ESTADO_AGOTADO, $evaluacion->causa);
            return null;
        }
        self::actualizar($envio, self::ESTADO_REINTENTANDO, $evaluacion->causa);
        return $evaluacion->causa;
    }

    /**
     * Hace el POST. Devuelve siempre un resultado, también si la clase curl lanza una excepción.
     *
     * @param string $destino
     * @param \stdClass $envio
     * @return \stdClass http, errno, error, cuerpo
     */
    private static function llamar(string $destino, \stdClass $envio): \stdClass {
        try {
            $curl = new \curl();
            $curl->setHeader([
                'Content-Type: application/json',
                'Accept: application/json',
                'Idempotency-Key: ' . $envio->idempotencykey,
            ]);
            $cuerpo = $curl->post($destino, $envio->payload, [
                'CURLOPT_CONNECTTIMEOUT' => task\enviar_resultado::TIMEOUT_CONEXION,
                'CURLOPT_TIMEOUT' => task\enviar_resultado::TIMEOUT_TOTAL,
            ]);
            return (object) [
                'http' => (int) ($curl->get_info()['http_code'] ?? 0),
                'errno' => (int) $curl->get_errno(),
                // Un bloqueo de curlsecurity deja el mensaje real en error, con errno 0.
                'error' => (string) $curl->error,
                'cuerpo' => (string) $cuerpo,
            ];
        } catch (\Throwable $e) {
            return (object) ['http' => 0, 'errno' => 0, 'error' => get_class($e) . ': ' . $e->getMessage(), 'cuerpo' => ''];
        }
    }

    /**
     * Decide si la respuesta es un éxito: un 2xx no alcanza, el cuerpo debe confirmar que el dato se guardó.
     *
     * @param int $http
     * @param int $errno
     * @param string $error
     * @param string $cuerpo
     * @return \stdClass exito, externalid, causa
     */
    public static function evaluar(int $http, int $errno, string $error, string $cuerpo): \stdClass {
        $fallo = fn(string $causa) => (object) ['exito' => false, 'externalid' => null, 'causa' => $causa];
        $crudo = self::recortar($cuerpo);

        if ($errno !== 0 || $error !== '') {
            return $fallo("cURL errno {$errno}: {$error}");
        }
        if ($http < 200 || $http >= 300) {
            return $fallo("HTTP {$http}: {$crudo}");
        }
        $json = json_decode($cuerpo, true);
        if (!is_array($json)) {
            return $fallo("HTTP {$http}, cuerpo que no es JSON: {$crudo}");
        }
        if (($json['status'] ?? null) !== 'accepted') {
            return $fallo("HTTP {$http}, sin status accepted: {$crudo}");
        }
        $id = isset($json['id']) && is_scalar($json['id']) ? \core_text::substr((string) $json['id'], 0, 255) : null;
        return (object) ['exito' => true, 'externalid' => $id, 'causa' => null];
    }

    /**
     * Destino configurado. Se lee en cada ejecución: corregirlo sirve para lo que sigue en cola.
     *
     * @return string
     */
    private static function destino(): string {
        return trim((string) get_config('local_resultadoext', 'destino'));
    }

    /**
     * Ejecuciones de la tarea por envío.
     *
     * @return int
     */
    private static function max_intentos(): int {
        $max = (int) get_config('local_resultadoext', 'maxintentos');
        return $max > 0 ? $max : self::MAX_INTENTOS;
    }

    /**
     * Prepara un cuerpo de terceros para guardarlo: UTF-8 válido, sin bytes nulos y con tope de tamaño.
     *
     * @param string $texto
     * @return string
     */
    private static function recortar(string $texto): string {
        return \core_text::substr((string) fix_utf8($texto), 0, self::TOPE_CUERPO);
    }

    /**
     * Guarda el estado de un envío.
     *
     * @param \stdClass $envio
     * @param string $estado
     * @param string|null $causa
     */
    private static function actualizar(\stdClass $envio, string $estado, ?string $causa): void {
        global $DB;

        $envio->estado = $estado;
        $envio->causa = $causa;
        $envio->timemodified = time();
        $DB->update_record('local_resultadoext_envios', $envio);
    }
}
