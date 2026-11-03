#!/usr/bin/env bash
# Instala en Moodle el plugin de un spec desde la rama de su PR, para verlo funcionando, y vuelve a main.
# Uso: bash factory/demos/mostrar-spec.sh factory/spec-1-20261102-094736 spec-1
#      bash factory/demos/mostrar-spec.sh --retirar factory/spec-1-20261102-094736 spec-1
cd "$(dirname "$0")/../.." || exit 1
accion=desplegar
if [ "$1" = --retirar ]; then accion=retirar; shift; fi
rama=$1
spec=$2
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then echo "Hay cambios sin commit: no se cambia de rama."; exit 1; fi
git checkout -q "$rama" || exit 1
node --input-type=module -e "import * as m from './factory/lib/moodle.mjs'; const r = m.$accion('salidas/$spec'); console.log('$accion', r.ok ? 'OK' : r.salida)"
git checkout -q main
