# Reglas del proyecto (para cualquier sesión de IA que trabaje en este repo)

Prueba técnica de Viaro: una **fábrica** que convierte specs de producto en plugins de Moodle 5.3 (módulo Quiz)
con pruebas funcionales y visuales, un control de verificación honesta y un PR sin merge. Leer primero
`ia/HANDOFF.md` (estado actual y pendientes), luego `README.md` y `documentacion.md`.

## Reglas duras
- **Nunca** modificar el core de Moodle (`entorno/.moodle-src/` está fuera de git; solo se agregan plugins).
- **Nunca** escribir a mano el código o las pruebas de un spec: los genera la fábrica (`node factory/cli.mjs run <spec>`).
  Si la fábrica falla, se arregla la FÁBRICA (prompts, helpers, entorno), no la salida.
- **Nunca** debilitar pruebas, agregar `skip`/`only`, relajar umbrales ni actualizar líneas base para que algo pase.
  Las líneas base solo se aprueban con `node factory/cli.mjs aprobar-linea-base --razon "..."` y es decisión humana.
- **Nunca** mergear PRs de specs 1–3 ni del spec desconocido (se dejan abiertos). Excepción declarada: spec-0 (regresión).
- No tocar el repo mientras corre la fábrica (el control de alcance lo marca como violación).
- Commits pequeños y por etapa, con mensaje descriptivo en español. Push a `origin` (repo privado).
- Datos solo sintéticos. Ningún secreto en el repo ni en logs.

## Cómo se trabaja
- Moodle: `bash entorno/setup.sh` (idempotente; `--fresh` reinstala). http://localhost:8090 · admin / Viaro.2026.
- Suite: `node factory/cli.mjs suite` · Auditor: `node factory/cli.mjs honestidad`.
- Retomar una corrida cortada: `node factory/cli.mjs run <spec> --reanudar <rama>`.
- Cuota de IA: cada llamada registra `[uso-ia]` en `corridas/<id>/pipeline.log`. Avisar al usuario al pasar el 70 %.
- Comandos Docker: `docker compose -f entorno/docker-compose.yml ...`.
