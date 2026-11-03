# ia/: rastro de cómo se dirigió la IA

| Ruta | Qué es |
|---|---|
| `transcripciones/sesion-direccion-claude-code.md` | Sesión de dirección con Claude Code (1 y 2 de noviembre): qué pedí, qué hizo la IA, qué corregí y qué decidí. Depurada de datos personales y de preguntas de seguimiento del estado. |
| `bitacora.md` | Decisiones de la primera etapa de construcción, con una sesión de Claude que operaba la máquina y no dejó transcripción exportable. |
| `HANDOFF.md` | Traspaso entre sesiones: estado, pendientes y hechos verificados para no redescubrirlos. |
| `reglas/CLAUDE.md` | Instrucciones del proyecto para cualquier sesión de IA (copia del `CLAUDE.md` de la raíz). |
| `reglas/moodle-5.3.md` | Conocimiento verificado de la plataforma que reciben los agentes de la fábrica (copia de `factory/conocimiento/`). |
| `prompts/` | Plantillas de los tres agentes de la fábrica: analista, implementador y corrector (copia de `factory/prompts/`). |
| `transcripciones/<corrida>/` | Prompt y transcripción de cada llamada a la IA de la fábrica. En `main` están las de spec-0; las de cada spec, en la rama de su PR. |

**Herramientas.** Claude Code para dirigir la construcción, y Claude Code en modo no interactivo (`claude -p`) como motor
de la fábrica. Analista e implementador usan Opus; el corrector, Sonnet. Cada agente tiene herramientas restringidas: el
implementador y el corrector solo pueden escribir en `salidas/<spec>/`.
