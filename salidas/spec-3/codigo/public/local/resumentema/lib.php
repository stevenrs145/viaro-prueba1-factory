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
 * Retira la retroalimentación global del formulario del examen.
 *
 * @package    local_resumentema
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Quita del formulario del examen todo lo que configuraba la retroalimentación global.
 *
 * Los campos ocultos no son una opción: mod_form.php:638 hace count($data['feedbacktext']) y lib.php:1167-1172 lee text,
 * format e itemid, sin comprobar que existan. Con ellos el guardado es el de un examen sin retroalimentación.
 *
 * @param moodleform_mod $formulario
 * @param MoodleQuickForm $mform
 */
function local_resumentema_coursemodule_standard_elements($formulario, $mform) {
    if (!$formulario instanceof mod_quiz_mod_form) {
        return;
    }

    $elementos = ['overallfeedbackhdr', 'nogradewarning', 'gradeboundarystatic1', 'gradeboundarystatic2',
        'boundary_add_fields', 'boundary_repeats'];
    foreach ($mform->_elements as $elemento) {
        $nombre = (string) $elemento->getName();
        if (preg_match('/^(feedbacktext|feedbackboundaries)\[\d+\]$/', $nombre)) {
            $elementos[] = $nombre;
        }
    }
    foreach ($elementos as $nombre) {
        if ($mform->elementExists($nombre)) {
            $mform->removeElement($nombre);
        }
    }

    foreach (['during', 'immediately', 'open', 'closed'] as $momento) {
        $grupo = $mform->getElement($momento . 'optionsgrp');
        $casillas = $grupo->getElements();
        foreach ($casillas as $posicion => $casilla) {
            if ($casilla->getName() === 'overallfeedback' . $momento) {
                // Cada casilla va entre dos elementos html que la envuelven (mod_form.php:416-422).
                array_splice($casillas, $posicion - 1, 3);
                break;
            }
        }
        $grupo->setElements($casillas);
    }

    foreach (['text' => '', 'format' => FORMAT_HTML, 'itemid' => 0] as $campo => $valor) {
        $mform->addElement('hidden', "feedbacktext[0][{$campo}]", $valor);
        $mform->setType("feedbacktext[0][{$campo}]", PARAM_RAW);
    }
}
