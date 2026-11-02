#!/usr/bin/env bash
# Levanta Moodle 5.3 desde cero, de forma reproducible e idempotente.
#   ./entorno/setup.sh           crea lo que falte y deja todo arriba
#   ./entorno/setup.sh --fresh   borra BD y moodledata y reinstala desde cero
set -euo pipefail
cd "$(dirname "$0")"

MOODLE_TAG="${MOODLE_TAG:-v5.3.0}"
PORT="${MOODLE_PORT:-8090}"
ADMIN_PASS="${ADMIN_PASS:-Viaro.2026}"
dc() { docker compose "$@"; }
log() { printf '\n[setup] %s\n' "$*"; }

if [[ "${1:-}" == "--fresh" ]]; then
  log "Borrando volúmenes (BD y moodledata)"
  dc down -v --remove-orphans
fi

if [[ ! -f .moodle-src/public/version.php ]]; then
  log "Descargando Moodle ${MOODLE_TAG}"
  git clone --depth 1 -b "$MOODLE_TAG" https://github.com/moodle/moodle.git .moodle-src
fi

log "Construyendo imágenes"
dc build --quiet

if [[ ! -f .moodle-src/vendor/phpunit/phpunit/composer.json ]]; then
  # Moodle >= 5.1 requiere Composer. Se incluyen dependencias de desarrollo porque los
  # generadores de datos de Moodle (usados en el sembrado) cargan PHPUnit.
  log "Instalando dependencias PHP con Composer"
  dc run --rm --no-deps web bash -c "git config --global --add safe.directory /var/www/moodle; composer install --no-interaction --no-progress"
fi

log "Levantando base de datos, web y receptor"
dc up -d db web receptor

installed() { [[ "$(dc exec -T db psql -U moodle -d moodle -tAc "select to_regclass('mdl_config') is not null")" == "t" ]]; }
if ! installed; then
  log "Instalando la base de datos de Moodle"
  dc exec -T -u www-data web php /var/www/moodle/admin/cli/install_database.php \
    --agree-license --fullname="Viaro QA" --shortname="viaroqa" \
    --adminuser=admin --adminpass="$ADMIN_PASS" --adminemail=admin@example.invalid
  # install_database.php puede salir con 0 aunque falle el chequeo de entorno: se verifica aparte.
  installed || { echo "[setup] ERROR: la instalación de Moodle no creó las tablas" >&2; exit 1; }
fi

log "Sembrando datos sintéticos"
dc exec -T -u www-data web php /opt/seed/seed.php
# El manejador de excepciones de Moodle en CLI no garantiza código de salida != 0: se verifica el resultado.
[[ "$(dc exec -T db psql -U moodle -d moodle -tAc "select count(*) from mdl_quiz_slots s join mdl_quiz q on q.id=s.quizid join mdl_course_modules cm on cm.instance=q.id where cm.idnumber='QUIZ-REG'")" == "6" ]] \
  || { echo "[setup] ERROR: el sembrado no dejó el examen QUIZ-REG con 6 preguntas" >&2; exit 1; }

log "Ejecutando tareas ad hoc pendientes (migración de bancos de preguntas de mod_qbank, etc.)"
# Mientras haya transferencias de mod_qbank en cola, Moodle 5.3 no muestra el banco de preguntas.
dc exec -T -u www-data web php /var/www/moodle/admin/cli/adhoc_task.php --execute > /dev/null 2>&1 || true

log "Levantando cron"
dc up -d cron
sleep 5
dc ps cron --format '{{.Status}}' | grep -q '^Up' || { echo "[setup] ERROR: el contenedor de cron no quedó corriendo" >&2; dc logs --tail 20 cron >&2; exit 1; }

log "Esperando a Moodle en http://localhost:${PORT}"
for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:${PORT}/login/index.php" || true)
  [[ "$code" == "200" ]] && { log "Moodle listo: http://localhost:${PORT}  (admin / ${ADMIN_PASS})"; exit 0; }
  sleep 2
done
echo "Moodle no respondió 200 en /login/index.php" >&2
exit 1
