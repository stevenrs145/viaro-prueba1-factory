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

use core\hook\output\after_standard_main_region_html_generation;
use mod_quiz\quiz_attempt;
use question_display_options;

/**
 * Agrega el resumen por tema a la pantalla de cierre del intento.
 *
 * @package    local_resumentema
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class hook_callbacks {
    /**
     * Pinta la sección y la ubica donde estaba el bloque anterior.
     *
     * El hook escribe fuera de #region-main (drawers.mustache:179), así que un script la mueve justo debajo de la tabla
     * resumen. Debe esperar a domready: el JS final se imprime en el pie (footer.mustache:88), antes que esta sección.
     * Sin JS, la sección queda visible al final de la página.
     *
     * @param after_standard_main_region_html_generation $hook
     */
    public static function agregar_resumen(after_standard_main_region_html_generation $hook): void {
        global $PAGE;

        if ($PAGE->pagetype !== 'mod-quiz-review') {
            return;
        }
        $intento = self::intento_visible();
        if (!$intento) {
            return;
        }
        $html = resumen::html($intento);
        if (!$html) {
            return;
        }

        $hook->add_html($html);
        $id = resumen::ID_SECCION;
        $PAGE->requires->js_init_code(
            "var bloque = document.getElementById('{$id}'), tabla = document.querySelector('table.quizreviewsummary');
             if (bloque && tabla) { tabla.parentElement.after(bloque); }",
            true,
        );
    }

    /**
     * Devuelve el intento de la petición si su resumen se puede mostrar.
     *
     * El hook corre también en las páginas de error de review.php, antes de cualquier comprobación propia: acá se repiten
     * los permisos de esa página para no mostrar el resumen a quien no puede ver la revisión.
     *
     * @return quiz_attempt|null
     */
    private static function intento_visible(): ?quiz_attempt {
        global $CFG;
        require_once($CFG->dirroot . '/mod/quiz/locallib.php');

        try {
            $intento = quiz_attempt::create(optional_param('attempt', 0, PARAM_INT));
            $intento->check_review_capability();
        } catch (\moodle_exception $e) {
            // Intento inexistente o sin permiso: review.php ya está mostrando ese error.
            return null;
        }

        // La tabla resumen se recorta en las páginas siguientes a la primera (renderer.php:148).
        $pagina = $intento->force_page_number_into_range(optional_param('page', 0, PARAM_INT));
        if ($pagina > 0 && !optional_param('showall', false, PARAM_BOOL)) {
            return null;
        }

        if (!$intento->is_own_attempt() && !$intento->is_review_allowed()) {
            return null;
        }
        if ($intento->get_state() !== quiz_attempt::FINISHED || !quiz_has_grades($intento->get_quiz())) {
            return null;
        }

        // Misma condición que add_attempt_grades_if_appropriate(): no filtrar notas que el profesor ocultó.
        $opciones = $intento->get_display_options(true);
        if (!$opciones->attempt || $opciones->marks < question_display_options::MARK_AND_MAX) {
            return null;
        }
        return $intento;
    }
}
