#!/usr/bin/env bash
# Vuelve al diseño aprobado (idempotente).
cd "$(dirname "$0")/../.." || exit 1
docker compose -f entorno/docker-compose.yml exec -T -u www-data web php /opt/seed/identidad.php
