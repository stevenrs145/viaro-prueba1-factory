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

use mod_quiz\form\preflight_check_form;
use mod_quiz\local\access_rule_base;
use mod_quiz\quiz_attempt;
use mod_quiz\quiz_settings;

/**
 * Requires the student to accept a per-quiz acknowledgement before an attempt starts.
 *
 * The rule only exists for quizzes that enabled it: otherwise make() returns null and the
 * quiz flow is untouched.
 *
 * @package    quizaccess_reconocimiento
 * @copyright  2026 Viaro
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class quizaccess_reconocimiento extends access_rule_base {
    /** @var string table holding the per-quiz configuration. */
    const TABLE = 'quizaccess_reconocimiento';

    /** @var string name of the preflight checkbox. */
    const CAMPO_ACEPTADO = 'reconocimientoaceptado';

    public static function make(quiz_settings $quizobj, $timenow, $canignoretimelimits) {
        // Teachers previewing the quiz go through the same check, so $canignoretimelimits is ignored.
        if (empty($quizobj->get_quiz()->reconocimientoenabled)) {
            return null;
        }

        return new self($quizobj, $timenow);
    }

    public function description() {
        return get_string('avisoinicio', 'quizaccess_reconocimiento');
    }

    /**
     * The check applies to every attempt that has not started yet.
     *
     * A pre-created attempt arrives here with an id and the NOT_STARTED state: it must be checked too,
     * or startattempt.php would start it without acceptance. Attempts already running are left alone.
     *
     * @param int|null $attemptid the id of the current attempt, if there is one, otherwise null.
     * @return bool whether the student still has to accept.
     */
    public function is_preflight_check_required($attemptid) {
        global $DB;

        if (empty($attemptid)) {
            return true;
        }

        return $DB->get_field('quiz_attempts', 'state', ['id' => $attemptid]) === quiz_attempt::NOT_STARTED;
    }

    public function add_preflight_check_form_fields(preflight_check_form $quizform,
            MoodleQuickForm $mform, $attemptid) {

        // FORMAT_PLAIN escapes HTML and keeps the line breaks of the text.
        $texto = format_text($this->quiz->reconocimientotext, FORMAT_PLAIN,
                ['context' => $this->quizobj->get_context()]);

        $mform->addElement('header', 'reconocimientoheader',
                get_string('reconocimientoheader', 'quizaccess_reconocimiento'));
        $mform->addElement('static', 'reconocimientomensaje', '',
                html_writer::div($texto, 'quizaccess_reconocimiento_texto'));
        // No client rule: the acceptance is decided in the server, so direct POSTs are covered as well.
        $mform->addElement('advcheckbox', self::CAMPO_ACEPTADO, null,
                get_string('reconocimientoaceptado', 'quizaccess_reconocimiento'));
    }

    public function validate_preflight_check($data, $files, $errors, $attemptid) {
        if (empty($data[self::CAMPO_ACEPTADO])) {
            $errors[self::CAMPO_ACEPTADO] = get_string('erroraceptar', 'quizaccess_reconocimiento');
        }

        return $errors;
    }

    public static function add_settings_form_fields(mod_quiz_mod_form $quizform, MoodleQuickForm $mform) {
        $mform->addElement('selectyesno', 'reconocimientoenabled',
                get_string('reconocimientoenabled', 'quizaccess_reconocimiento'));
        $mform->addHelpButton('reconocimientoenabled', 'reconocimientoenabled', 'quizaccess_reconocimiento');
        $mform->setDefault('reconocimientoenabled', 0);

        $mform->addElement('textarea', 'reconocimientotext',
                get_string('reconocimientotext', 'quizaccess_reconocimiento'), ['rows' => 4, 'cols' => 60]);
        // PARAM_TEXT would strip tags from what the teacher wrote; the text is escaped when displayed.
        $mform->setType('reconocimientotext', PARAM_RAW_TRIMMED);
        $mform->addHelpButton('reconocimientotext', 'reconocimientotext', 'quizaccess_reconocimiento');
        // Hidden, not disabled: a disabled field is not submitted and disabling the rule must keep the text.
        $mform->hideIf('reconocimientotext', 'reconocimientoenabled', 'eq', 0);
    }

    public static function validate_settings_form_fields(array $errors,
            array $data, $files, mod_quiz_mod_form $quizform) {

        if (!empty($data['reconocimientoenabled']) && trim($data['reconocimientotext'] ?? '') === '') {
            $errors['reconocimientotext'] = get_string('errortextovacio', 'quizaccess_reconocimiento');
        }

        return $errors;
    }

    public static function save_settings($quiz) {
        global $DB;

        // Generators and web services do not send these fields: their configuration must not be overwritten.
        if (!isset($quiz->reconocimientoenabled) || !isset($quiz->reconocimientotext)) {
            return;
        }

        $enabled = empty($quiz->reconocimientoenabled) ? 0 : 1;
        $message = trim($quiz->reconocimientotext);

        $id = $DB->get_field(self::TABLE, 'id', ['quizid' => $quiz->id]);
        if ($id) {
            $DB->update_record(self::TABLE, (object) ['id' => $id, 'enabled' => $enabled, 'message' => $message]);
        } else if ($enabled || $message !== '') {
            $DB->insert_record(self::TABLE, (object) ['quizid' => $quiz->id, 'enabled' => $enabled, 'message' => $message]);
        }
    }

    public static function delete_settings($quiz) {
        global $DB;

        $DB->delete_records(self::TABLE, ['quizid' => $quiz->id]);
    }

    public static function get_settings_sql($quizid) {
        return [
            'reconocimiento.enabled AS reconocimientoenabled, reconocimiento.message AS reconocimientotext',
            'LEFT JOIN {' . self::TABLE . '} reconocimiento ON reconocimiento.quizid = quiz.id',
            [],
        ];
    }
}
