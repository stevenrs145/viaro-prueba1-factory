<?php
// Configuración de Moodle para el entorno reproducible. Valores por variables de entorno (docker-compose.yml).
unset($CFG);
global $CFG;
$CFG = new stdClass();

$CFG->dbtype    = 'pgsql';
$CFG->dblibrary = 'native';
$CFG->dbhost    = getenv('DB_HOST') ?: 'db';
$CFG->dbname    = getenv('DB_NAME') ?: 'moodle';
$CFG->dbuser    = getenv('DB_USER') ?: 'moodle';
$CFG->dbpass    = getenv('DB_PASS') ?: 'moodle';
$CFG->prefix    = 'mdl_';
$CFG->dboptions = ['dbpersist' => 0, 'dbport' => '', 'dbsocket' => ''];

$CFG->wwwroot   = getenv('MOODLE_WWWROOT') ?: 'http://localhost:8090';
$CFG->dataroot  = '/var/www/moodledata';
$CFG->admin     = 'admin';
$CFG->directorypermissions = 02777;

// Entorno de prueba con datos sintéticos únicamente.
$CFG->debug = E_ALL;
$CFG->debugdisplay = 0;
$CFG->noemailever = true;
$CFG->passwordpolicy = 0;

// Spec 2: por defecto Moodle bloquea peticiones salientes a rangos privados (172.16.0.0/12)
// y a puertos distintos de 80/443. El receptor de la demo vive en la red de Docker,
// así que se desbloquea SOLO el rango de Docker; se mantienen bloqueados localhost y metadata cloud.
$CFG->curlsecurityblockedhosts = "127.0.0.0/8\nlocalhost\n0.0.0.0\n169.254.169.254\n10.0.0.0/8\n192.168.0.0/16";
$CFG->curlsecurityallowedport = "80\n443";

// Igual que config-dist.php de 5.3: el helper de la raíz resuelve dirroot/libdir hacia public/.
require_once(__DIR__ . '/lib/setup.php');
