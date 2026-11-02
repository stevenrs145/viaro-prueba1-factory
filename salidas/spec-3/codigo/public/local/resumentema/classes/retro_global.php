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

namespace local_resumentema;

/**
 * Retira los datos de la retroalimentación global del examen y permite revertirlo.
 *
 * El core la muestra solo si quiz_feedback tiene texto (attempt_summary_information.php:271-274 y quiz_has_feedback()):
 * vaciar esos datos la elimina para todos, incluido el profesor, para quien locallib.php:1220 fuerza la opción.
 *
 * @package    local_resumentema
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class retro_global {
    /** @var string Archivo de las filas con texto de quiz_feedback. */
    private const TABLA_RETRO = 'local_resumentema_retro';

    /** @var string Archivo de quiz.reviewoverallfeedback. */
    private const TABLA_REVISION = 'local_resumentema_revision';

    /** @var string Nombre de la opción en la configuración de quiz y, con su valor anterior, en la del plugin. */
    private const AJUSTE_REVISION = 'reviewoverallfeedback';

    /**
     * Archiva y limpia todos los exámenes y el ajuste de sitio.
     */
    public static function archivar_todo(): void {
        global $DB;

        $anterior = get_config('quiz', self::AJUSTE_REVISION);
        if ($anterior !== false) {
            set_config(self::AJUSTE_REVISION, $anterior, 'local_resumentema');
        }
        // Los dos ajustes salen de la UI (settings.php), pero mod_form.php:365 y :429 los leen sin comprobar: las filas deben
        // existir, también si el plugin ya está presente en una instalación limpia y Moodle no llega a aplicar el valor por
        // defecto de un ajuste que ya no está en la página.
        set_config(self::AJUSTE_REVISION, 0, 'quiz');
        if (get_config('quiz', 'initialnumfeedbacks') === false) {
            set_config('initialnumfeedbacks', 2, 'quiz');
        }

        $quizes = $DB->get_fieldset_sql(
            'SELECT q.id
               FROM {quiz} q
              WHERE q.reviewoverallfeedback <> 0
                 OR EXISTS (SELECT 1 FROM {quiz_feedback} f WHERE f.quizid = q.id)'
        );
        foreach ($quizes as $quizid) {
            self::archivar_quiz($quizid);
        }
    }

    /**
     * Archiva y limpia todos los exámenes de un curso.
     *
     * @param int $cursoid
     */
    public static function archivar_curso(int $cursoid): void {
        global $DB;

        foreach ($DB->get_fieldset_select('quiz', 'id', 'course = ?', [$cursoid]) as $quizid) {
            self::archivar_quiz($quizid);
        }
    }

    /**
     * Archiva y limpia un examen. Es idempotente: si no hay nada que retirar, no escribe.
     *
     * Las filas sin texto se ignoran: son las que guarda el propio formulario del examen y no muestran nada. Los archivos
     * del área mod_quiz/feedback no se tocan: siguen enlazados por el id original.
     *
     * @param int $quizid
     */
    public static function archivar_quiz(int $quizid): void {
        global $DB;

        $filas = array_filter(
            $DB->get_records('quiz_feedback', ['quizid' => $quizid]),
            fn($fila) => trim($fila->feedbacktext) !== '',
        );
        $revision = (int) $DB->get_field('quiz', self::AJUSTE_REVISION, ['id' => $quizid]);
        if (!$filas && !$revision) {
            return;
        }

        $transaccion = $DB->start_delegated_transaction();
        if ($filas) {
            // Si reingresó retro a un examen ya archivado, la vigente es la nueva: mezclarlas solaparía los rangos de nota.
            $DB->delete_records(self::TABLA_RETRO, ['quizid' => $quizid]);
            foreach ($filas as $fila) {
                $archivada = clone $fila;
                $archivada->feedbackid = $fila->id;
                unset($archivada->id);
                $DB->insert_record(self::TABLA_RETRO, $archivada);
            }
            $DB->delete_records_list('quiz_feedback', 'id', array_keys($filas));
        }
        if ($revision) {
            $DB->delete_records(self::TABLA_REVISION, ['quizid' => $quizid]);
            $DB->insert_record(self::TABLA_REVISION, (object) ['quizid' => $quizid, self::AJUSTE_REVISION => $revision]);
            $DB->set_field('quiz', self::AJUSTE_REVISION, 0, ['id' => $quizid]);
        }
        $transaccion->allow_commit();
    }

    /**
     * Olvida lo archivado de un examen que se eliminó.
     *
     * @param int $quizid
     */
    public static function purgar_quiz(int $quizid): void {
        global $DB;

        $DB->delete_records(self::TABLA_RETRO, ['quizid' => $quizid]);
        $DB->delete_records(self::TABLA_REVISION, ['quizid' => $quizid]);
    }

    /**
     * Devuelve todo a su estado anterior. Lo archivado de exámenes que ya no existen se descarta con las tablas del plugin.
     *
     * Primero se quitan las filas actuales del examen: guardar el formulario deja una fila vacía que cubre todas las notas,
     * y con ella quiz_feedback_record_for_grade() encontraría dos filas para una misma nota.
     */
    public static function restaurar_todo(): void {
        global $DB;

        $transaccion = $DB->start_delegated_transaction();

        $filas = $DB->get_records_sql(
            'SELECT a.* FROM {' . self::TABLA_RETRO . '} a JOIN {quiz} q ON q.id = a.quizid'
        );
        if ($filas) {
            $DB->delete_records_list('quiz_feedback', 'quizid', array_unique(array_column($filas, 'quizid')));
        }
        foreach ($filas as $fila) {
            $fila->id = $fila->feedbackid;
            unset($fila->feedbackid);
            $DB->import_record('quiz_feedback', $fila);
        }

        $revisiones = $DB->get_records_sql(
            'SELECT a.* FROM {' . self::TABLA_REVISION . '} a JOIN {quiz} q ON q.id = a.quizid'
        );
        foreach ($revisiones as $fila) {
            $DB->set_field('quiz', self::AJUSTE_REVISION, $fila->reviewoverallfeedback, ['id' => $fila->quizid]);
        }

        $anterior = get_config('local_resumentema', self::AJUSTE_REVISION);
        if ($anterior !== false) {
            set_config(self::AJUSTE_REVISION, $anterior, 'quiz');
        }

        $transaccion->allow_commit();
    }
}
