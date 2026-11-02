# Traspaso de sesión — 2026-11-01 22:00 (America/Guatemala)

Entrega: lunes 2 de noviembre, durante el día. Repo: `stevenrs145/viaro-prueba1-factory` (privado), en WSL `~/entrega`.
Motivo del traspaso: la sesión anterior (Claude en la nube operando la máquina) tenía un contexto enorme y gastaba
mucha cuota por mensaje. Se continúa en una sesión local de Claude Code dentro de `~/entrega`.

## Estado

| Pieza | Estado | Evidencia |
|---|---|---|
| Entorno Moodle 5.3 (Postgres 17, cron, receptor, seed) | VALIDADO | `entorno/`, commits `0456a8c` → `cf411bb` |
| Fábrica (`factory/cli.mjs`: análisis → sondas → implementación → reintentos → mutación → regresión → alcance → honestidad → PR) | IMPLEMENTADO y EJECUTADO | `corridas/*-spec-0/` |
| Auditor de honestidad | VALIDADO con 6 sabotajes | `cobertura.md §3` |
| Docs (README, cobertura, documentacion, ia/) | IMPLEMENTADO (falta cerrar números) | raíz del repo |
| spec-0 regresión | **7/8 en verde**, rama `factory/spec-0-20261101-232314` (sin PR aún) | `corridas/20261102-030458-spec-0/pipeline.log` |
| spec-1, spec-2, spec-3 | PENDIENTE | — |
| Spec desconocido de ensayo (spec-4) | PENDIENTE | — |
| Instalación limpia desde cero | PENDIENTE | — |
| Video | PENDIENTE | — |

Correo con 6 preguntas de bordes enviado a Evelyn (ver `documentacion.md §5`); sin respuesta al momento.

## Pendientes, en orden (marcar al completar)

1. [ ] **Arreglar helpers** (`factory/regresion/helpers.ts`), no gasta IA de la fábrica:
   - `prepararCaptura`: quitar `waitForLoadState('networkidle')` (en escritorio el índice del curso hace peticiones
     periódicas y nunca queda idle → única falla restante de spec-0). Usar `waitForLoadState('load')` +
     `await page.evaluate(() => document.fonts.ready)`; `toHaveScreenshot` ya espera estabilidad.
   - `login`: `page.goto('/login/index.php', { waitUntil: 'domcontentloaded' })` (hubo `net::ERR_ABORTED`).
   - Correr humo: `docker compose -f entorno/docker-compose.yml --profile qa run --rm -T --user "$(id -u):$(id -g)" -e HOME=/tmp -e QA_OUT=test-results/humo qa npx playwright test factory/regresion/humo-helpers.spec.ts`
   - Commit en main. Luego `node factory/cli.mjs run specs/spec-0-regresion.md --reanudar factory/spec-0-20261101-232314`.
   - Si queda verde y abre PR: revisar capturas, `node factory/cli.mjs aprobar-linea-base --pendientes --razon "Línea base inicial de regresión (spec-0)"`,
     `node factory/cli.mjs aprobar-pruebas --razon "..."`, commit en la rama, **mergear ese PR** (excepción declarada en README).
2. [ ] **Blindar el auditor** (`factory/honestidad/`), no gasta IA:
   - Ejecutar el auditor desde la versión de `main` (extraer `factory/honestidad/*.mjs` con `git show main:` a un dir temporal y correr eso), y
     bloquear `AUDITOR-ALTERADO` si `factory/honestidad/` difiere de main.
   - Bloquear `CONFIG-PRUEBAS-ALTERADA` si `playwright.config.ts` difiere de main en `testMatch`/`testIgnore`/`grep`/`projects` (exclusión de pruebas, sabotaje #4).
   - Cobertura: con `plan.json`, cada criterio no-`proceso` debe tener ≥1 prueba `[CA-n]` que corrió y pasó (`CRITERIO-SIN-PRUEBA`).
   - Probar cada regla con un sabotaje real y anotar ✅ en `cobertura.md §3`.
3. [ ] **Estados y ambigüedad bloqueante** en `cli.mjs`: escribir `corridas/<id>/estado.json`
   (PENDIENTE/EJECUTADO/VALIDADO/FALLIDO/BLOQUEADO por etapa). Si el plan trae `bordes[].bloqueante: true`, detener con
   estado BLOQUEADO y `pregunta.md` (agregar el campo a `factory/prompts/analista.md`).
4. [ ] **Specs 1, 2, 3** (gasta IA): `node factory/cli.mjs run specs/spec-1-reconocimiento.md` (y 2, 3). Uno a la vez.
   Spec 3 cambia la pantalla de cierre: debe declarar `pantallas_afectadas` y quedar como propuesta pendiente en el PR.
5. [ ] **Spec desconocido de ensayo** `specs/spec-4-*.md` (escrito por producto, sin tocar la fábrica). Idea: "mostrar al
   estudiante cuántos intentos le quedan en la página del quiz".
6. [ ] **Demos con evidencia** (para el video, tramos 6:00–9:00):
   - Fallo visual intencional: romper CSS (p. ej. un tema o un CSS extra que oculte el botón de enviar), correr la suite, guardar
     esperada/obtenida/diferencia en `visual/diferencias/<corrida>/`.
   - Sabotaje: debilitar una prueba aprobada, correr `honestidad` y `run`, guardar `honestidad.log` bloqueado.
7. [ ] **Instalación limpia**: clonar en carpeta nueva, seguir README tal cual, `setup.sh --fresh`, suite completa.
8. [ ] **Cierre de docs**: números reales en `cobertura.md`, matriz requisito→evidencia y pruebas A–L en `documentacion.md`,
   dar acceso de lectura a `evelyngonzalez-bit`, enlace del video en README.

## Hechos importantes (no redescubrir)
- Moodle 5.3: Composer obligatorio; CLI en `admin/cli` de la RAÍZ; Postgres 17; código web bajo `public/`.
- Exit codes de `install_database.php`/excepciones CLI pueden ser 0 tras fallar: verificar por BD.
- Cron: debe arrancar como root y ejecutar como www-data (ya corregido). `mod_qbank` encola transferencias que bloquean el banco hasta correr las tareas ad hoc.
- Con ensayo respondido: revisión muestra "Grade: Not yet graded", sin Marks ni Feedback.
- Playwright corre en `mcr.microsoft.com/playwright:v1.64.1-noble` con `--user $(id -u):$(id -g)` (si no, artefactos root).
- Corrector usa Sonnet (≈USD 0,35/llamada); analista e implementador Opus (≈USD 2–5).
- PowerShell rompe comillas/pipes de bash: desde una sesión local en WSL no aplica.
