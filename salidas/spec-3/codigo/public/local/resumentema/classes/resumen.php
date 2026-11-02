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

use html_table;
use html_writer;
use mod_quiz\quiz_attempt;
use question_state;

/**
 * Desempeño del intento agrupado por tema.
 *
 * Tema = categoría del banco de la pregunta que le tocó al estudiante. Se calcula en vivo, sin guardar nada, así que
 * refleja calificaciones manuales y recalificaciones.
 *
 * @package    local_resumentema
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class resumen {
    /** @var string Id de la sección: el script de hook_callbacks.php y las pruebas la localizan por él. */
    public const ID_SECCION = 'local-resumentema';

    /**
     * Calcula el desempeño por tema, en orden de primera aparición en el examen.
     *
     * Una pregunta sin calificar suma 0 a lo obtenido y cuenta en el máximo. En "gaveup" la marca es null y también vale 0,
     * pero no es pendiente: nadie la va a calificar. Las preguntas con marca máxima 0 no cuentan.
     *
     * @param quiz_attempt $intento
     * @return \stdClass[] con nombre, obtenido, maximo y pendientes
     */
    public static function temas(quiz_attempt $intento): array {
        global $DB;

        $temas = [];
        foreach ($intento->get_slots() as $slot) {
            $qa = $intento->get_question_attempt($slot);
            if (!$qa->has_marks()) {
                continue;
            }
            $categoria = $qa->get_question(false)->category;
            $temas[$categoria] ??= (object) ['nombre' => '', 'obtenido' => 0.0, 'maximo' => 0.0, 'pendientes' => 0];
            $temas[$categoria]->obtenido += (float) $qa->get_mark();
            $temas[$categoria]->maximo += $qa->get_max_mark();
            if ($qa->get_state() === question_state::$needsgrading) {
                $temas[$categoria]->pendientes++;
            }
        }

        if ($temas) {
            $categorias = $DB->get_records_list('question_categories', 'id', array_keys($temas), '', 'id, name');
            foreach ($temas as $id => $tema) {
                $tema->nombre = format_string($categorias[$id]->name, true, ['context' => $intento->get_context()]);
            }
        }
        return array_values($temas);
    }

    /**
     * Genera la sección del resumen.
     *
     * @param quiz_attempt $intento
     * @return string HTML, vacío si ninguna pregunta cuenta para la nota
     */
    public static function html(quiz_attempt $intento): string {
        $temas = self::temas($intento);
        if (!$temas) {
            return '';
        }

        $quiz = $intento->get_quiz();
        $tabla = new html_table();
        $tabla->attributes['class'] = 'table generaltable generalbox mb-0';
        $tabla->head = [
            get_string('columntopic', 'local_resumentema'),
            get_string('columnmarks', 'local_resumentema'),
            get_string('columnpercentage', 'local_resumentema'),
        ];
        foreach ($temas as $tema) {
            $tabla->data[] = [
                $tema->nombre,
                quiz_format_question_grade($quiz, $tema->obtenido) . '/' . quiz_format_question_grade($quiz, $tema->maximo),
                self::detalle($tema, (int) $quiz->decimalpoints),
            ];
        }

        $titulo = self::ID_SECCION . '-titulo';
        return html_writer::tag(
            'section',
            html_writer::tag('h3', get_string('summarytitle', 'local_resumentema'), ['id' => $titulo, 'class' => 'h5']) .
                html_writer::table($tabla),
            ['id' => self::ID_SECCION, 'class' => 'mb-3', 'aria-labelledby' => $titulo],
        );
    }

    /**
     * Última columna: el porcentaje o, si falta calificar algo, el aviso. Un porcentaje parcial se leería como definitivo.
     *
     * @param \stdClass $tema
     * @param int $decimales
     * @return string
     */
    private static function detalle(\stdClass $tema, int $decimales): string {
        if ($tema->pendientes) {
            return get_string($tema->pendientes === 1 ? 'pendingone' : 'pendingmany', 'local_resumentema', $tema->pendientes);
        }
        return format_float(100 * $tema->obtenido / $tema->maximo, $decimales) . '%';
    }
}
