#!/usr/bin/env bash
# Demo de QA visual: cambia solo el color del botón principal desde los ajustes del tema (no toca código ni pruebas).
# Lo funcional sigue pasando; la comparación visual debe fallar y dejar esperada, obtenida y diferencia.
# Después: node factory/cli.mjs suite   ·   Para volver al diseño aprobado: bash factory/demos/restaurar-estilo.sh
cd "$(dirname "$0")/../.." || exit 1
docker compose -f entorno/docker-compose.yml exec -T -u www-data web php -r 'define("CLI_SCRIPT", 1); require "/var/www/moodle/config.php";
set_config("scss", get_config("theme_boost", "scss") . "\n// DEMO: cambio visual intencional\n.btn-primary { background-color: #b3362b !important; border-color: #b3362b !important; }\n", "theme_boost");
purge_all_caches(); echo "Estilo roto a propósito: botón principal en rojo.\n";'
