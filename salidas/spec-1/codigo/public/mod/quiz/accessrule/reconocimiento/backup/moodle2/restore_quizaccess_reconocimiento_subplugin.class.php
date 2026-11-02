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

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/mod/quiz/backup/moodle2/restore_mod_quiz_access_subplugin.class.php');

/**
 * Restore instructions for the quizaccess_reconocimiento plugin.
 *
 * @package    quizaccess_reconocimiento
 * @category   backup
 * @copyright  2026 Viaro
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class restore_quizaccess_reconocimiento_subplugin extends restore_mod_quiz_access_subplugin {
    /**
     * Provides the path of the acknowledgement configuration in the backup.
     *
     * @return array
     */
    protected function define_quiz_subplugin_structure() {
        $path = $this->get_pathfor('/quizaccess_reconocimiento');

        return [new restore_path_element('quizaccess_reconocimiento', $path)];
    }

    /**
     * Stores the restored configuration against the new quiz.
     *
     * @param array|stdClass $data data read from the backup.
     */
    public function process_quizaccess_reconocimiento($data) {
        global $DB;

        $data = (object) $data;
        unset($data->id);
        $data->quizid = $this->get_new_parentid('quiz');

        $DB->insert_record('quizaccess_reconocimiento', $data);
    }
}
