# Reglas e instrucciones de los agentes

- `../prompts/` — copia de lectura de las plantillas que usa la fábrica (`factory/prompts/`): analista, implementador, corrector.
- `moodle-5.3.md` — base de conocimiento verificada que se inyecta en cada llamada (copia de `factory/conocimiento/`).
- Restricciones por rol (en código, `factory/lib/ia.mjs`):
  - analista: `Read, Glob, Grep` (solo lectura)
  - implementador / corrector: además `Write/Edit` limitados a `salidas/<spec>/**`
  - siempre prohibidos: `Bash, WebFetch, WebSearch, Task`
  - la restricción se VERIFICA después con git (etapa 7 del pipeline), no se confía en la herramienta.
