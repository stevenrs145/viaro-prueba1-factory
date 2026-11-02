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
 * Strings for the quizaccess_reconocimiento plugin.
 *
 * @package    quizaccess_reconocimiento
 * @category   string
 * @copyright  2026 Viaro
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['avisoinicio'] = 'Before starting the attempt you will have to accept an acknowledgement.';
$string['erroraceptar'] = 'You must accept the acknowledgement to start the attempt.';
$string['errortextovacio'] = 'Enter the acknowledgement text.';
$string['pluginname'] = 'Mandatory acknowledgement quiz access rule';
$string['privacy:metadata'] = 'The mandatory acknowledgement quiz access rule stores only quiz settings. It does not store who accepted or when.';
$string['reconocimientoaceptado'] = 'I have read and accept this acknowledgement';
$string['reconocimientoenabled'] = 'Require acknowledgement before starting';
$string['reconocimientoenabled_help'] = 'If enabled, students must accept the acknowledgement before each new attempt. Attempts already in progress are not interrupted.';
$string['reconocimientoheader'] = 'Acknowledgement';
$string['reconocimientotext'] = 'Acknowledgement text';
$string['reconocimientotext_help'] = 'Plain text that students must accept, such as terms or instructions. Line breaks are kept and HTML is shown as text.';
