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

use mod_quiz\local\access_rule_base;
use mod_quiz\quiz_settings;

/**
 * Tells the student how many attempts they have left.
 *
 * This rule never prevents anything: it only adds a line to the quiz information.
 *
 * @package    quizaccess_attemptsremaining
 * @copyright  2026 Viaro
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class quizaccess_attemptsremaining extends access_rule_base {
    /**
     * The rule only exists for students of a quiz with an effective attempts limit.
     *
     * Without a rule there is no output, so unlimited quizzes and the teacher's page stay as they are.
     *
     * @param quiz_settings $quizobj information about the quiz in question.
     * @param int $timenow the time that should be considered as 'now'.
     * @param bool $canignoretimelimits whether the current user is exempt from time limits.
     * @return self|null the rule, or null if it does not apply.
     */
    public static function make(quiz_settings $quizobj, $timenow, $canignoretimelimits) {
        if ($quizobj->get_num_attempts_allowed() == 0) {
            return null;
        }

        if (!$quizobj->has_capability('mod/quiz:attempt') || $quizobj->has_capability('mod/quiz:preview')) {
            return null;
        }

        return new self($quizobj, $timenow);
    }

    /**
     * Count the attempts the same way as view.php: finished ones plus the one in progress.
     *
     * The rule API does not receive a user id: this always describes the current user.
     *
     * @return string the message for the quiz information box.
     */
    public function description() {
        global $USER;

        $finished = count(quiz_get_user_attempts($this->quiz->id, $USER->id, 'finished', true));
        $unfinished = count(quiz_get_user_attempts($this->quiz->id, $USER->id, 'unfinished', true));
        $remaining = max(0, $this->quiz->attempts - $finished - $unfinished);

        if ($unfinished) {
            if ($remaining == 0) {
                return get_string('remainingnoneinprogress', 'quizaccess_attemptsremaining');
            }
            if ($remaining == 1) {
                return get_string('remainingoneinprogress', 'quizaccess_attemptsremaining');
            }
            return get_string('remaininginprogress', 'quizaccess_attemptsremaining', $remaining);
        }

        if ($remaining == 0) {
            return get_string('remainingnone', 'quizaccess_attemptsremaining');
        }
        if ($remaining == 1) {
            return get_string('remainingone', 'quizaccess_attemptsremaining');
        }
        return get_string('remaining', 'quizaccess_attemptsremaining', $remaining);
    }
}
