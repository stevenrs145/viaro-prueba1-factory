# Mini software factory — módulo de exámenes (Quiz) de Moodle 5.3

Un pipeline que recibe **specs escritas por producto** y produce, por cada una, un **plugin de Moodle** en la capa
correcta (sin tocar el core), **pruebas funcionales y visuales** que corren solas, **trazabilidad**
criterio → archivo → prueba y un **log de la corrida**. Pasa por un **control de verificación honesta**
independiente y se detiene en un **pull request sin mergear**.

```
specs/spec-N.md ──► node factory/cli.mjs run specs/spec-N.md
                     │
                     ├─ 1. Analista (IA, solo lectura)  → plan.json: capa, bordes, criterio→prueba, sondas
                     ├─ 2. Sondas (sin IA)              → respuestas REALES del sistema/receptor (no supuestos)
                     ├─ 3. Implementador (IA, escribe solo en salidas/spec-N/) → plugin + pruebas Playwright
                     ├─ 4. Validar → desplegar en Moodle → probar → [Corrector IA] hasta 3 reintentos
                     ├─ 5. Mutación: desinstala el plugin; las pruebas @requiere-feature DEBEN fallar
                     ├─ 6. Regresión completa funcional + visual (escritorio y móvil)
                     ├─ 7. Alcance: git del repo y del core de Moodle (solo pueden aparecer plugins nuevos)
                     ├─ 8. CONTROL DE VERIFICACIÓN HONESTA (sin IA, contra referencias de main) ── bloquea
                     └─ 9. trazabilidad.md, cambios.diff, evidencia → rama + PR.   No mergea. No despliega.
```

## Requisitos
- Windows 10/11 con **WSL2** (Ubuntu) o Linux x86_64.
- **Docker** (en Docker Desktop: *Settings → Resources → WSL integration* activado para la distro), **Git**, **Node 20+**, **npm**.
- **Claude Code CLI** autenticado — es el motor de IA de la fábrica:
  `npm i -g @anthropic-ai/claude-code` y luego `claude` una vez para iniciar sesión (o `ANTHROPIC_API_KEY` en el entorno).
- **GitHub CLI** autenticado (`gh auth login`) para que el pipeline abra el PR. Sin `gh` el PR queda descrito en `corridas/<id>/pr.md`.
- Puertos libres: **8090** (Moodle) y **8091** (receptor externo de prueba).

> Clonar dentro del filesystem de WSL (`~/...`), no en `/mnt/c/...`: Moodle hace mucha E/S de archivos.

## Instalación desde cero
```bash
git clone https://github.com/stevenrs145/viaro-prueba1-factory.git entrega
cd entrega
npm ci                     # Playwright 1.64.1 (las pruebas corren en su imagen oficial de Docker)
bash entorno/setup.sh      # Moodle 5.3 + Postgres 17 + cron + receptor + datos sintéticos (~6 min la primera vez)
```
Moodle queda en <http://localhost:8090> — `admin` / `Viaro.2026`; `profesor`; `estudiante1..12` (misma clave).
El sitio queda en español y con identidad propia, aplicados por `entorno/seed/identidad.php` como ajustes de Moodle, sin tocar el core.
El setup descarga el paquete de idioma `es`: necesita conexión a internet.
`bash entorno/setup.sh --fresh` borra todo y reinstala. El script es idempotente y **verifica** la instalación y el
sembrado contra la base de datos (no confía en los códigos de salida de Moodle, que pueden ser 0 tras fallar).

## Uso
| Qué | Comando |
|---|---|
| Pasar un spec por la fábrica | `node factory/cli.mjs run specs/spec-1-reconocimiento.md` |
| Retomar una corrida interrumpida (p. ej. límite de uso de la IA) | `node factory/cli.mjs run <spec> --reanudar <rama>` |
| Suite completa funcional + visual + honestidad | `node factory/cli.mjs suite` |
| Solo el control de verificación honesta | `node factory/cli.mjs honestidad` |
| Probar el control con sabotajes reales, en un clon temporal | `node factory/sabotajes.mjs` |
| Probar `estado.json` y la detención BLOQUEADO | `node factory/estados.mjs` |
| Aprobar líneas base visuales (**humano**) | `node factory/cli.mjs aprobar-linea-base --pendientes --razon "..."` |
| Aprobar el manifiesto de pruebas (**humano**) | `node factory/cli.mjs aprobar-pruebas --razon "..."` |

Un spec nuevo es un `.md` con frontmatter `id:` y las secciones de intención, criterios (`CA-n`) y escenarios
(ver `specs/`). **No hace falta tocar la fábrica.** Resultado de cada corrida: `corridas/<fecha-hora>-<spec>/`
(`estado.json`, `pipeline.log`, `funcional.xml`, `visual/index.html`, `honestidad.log`, prompts y transcripciones de IA en `ia/`).
Si el analista encuentra una decisión que solo producto puede tomar, la corrida termina en BLOQUEADO con `pregunta.md`, sin construir nada.

## Puntos de intervención humana (declarados)
1. **Merge del PR**: el pipeline propone (rama + PR con razonamiento, diff, pruebas y evidencia); un humano decide.
2. **Líneas base visuales**: el pipeline solo crea las de pantallas nuevas o *propone* cambios en pantallas que el spec
   declaró afectadas; ambas quedan pendientes hasta `aprobar-linea-base --razon`.
3. **Manifiesto de pruebas**: la referencia contra la que se mide el debilitamiento cambia solo con
   `aprobar-pruebas --razon`, y cuenta cuando está en `main`.
4. **Pruebas aprobadas**: un spec solo cambia una si producto lo autoriza en el spec. El plan declara el reemplazo exacto en
   `pruebas_afectadas`, la fábrica lo aplica, el PR lo muestra y un humano lo aprueba.
5. **Ambigüedades bloqueantes**: producto las resuelve en el spec y se vuelve a ejecutar.

## Ramas
- `main`: fábrica, entorno, regresión aprobada y referencias del control de honestidad.
- `factory/spec-N-<fecha>`: una por corrida de spec, con su PR **abierto**. Las salidas de cada spec (código, pruebas,
  `trazabilidad.md`, `cambios.diff`) y su corrida completa viven en esa rama; `salidas/spec-N/README.md` en `main` dice dónde.

| Spec | Qué hace | PR (abierto) |
|---|---|---|
| spec-0 | Regresión del camino feliz | [#1](https://github.com/stevenrs145/viaro-prueba1-factory/pull/1), mergeado a propósito |
| spec-1 | Reconocimiento obligatorio antes de iniciar un quiz | [#2](https://github.com/stevenrs145/viaro-prueba1-factory/pull/2) |
| spec-2 | Notificación del resultado a un sistema externo | [#3](https://github.com/stevenrs145/viaro-prueba1-factory/pull/3) |
| spec-3 | Reemplazo de la retroalimentación global por un resumen por tema | [#5](https://github.com/stevenrs145/viaro-prueba1-factory/pull/5) |
| spec-4 | Spec desconocido de ensayo: intentos restantes | [#4](https://github.com/stevenrs145/viaro-prueba1-factory/pull/4) |
- La regresión (spec-0) también salió de la fábrica; su PR se mergeó a `main` a propósito, después de aprobar
  sus líneas base, porque es la línea base compartida contra la que se miden los demás specs. Los PR de los specs 1–4 quedan abiertos.

## Estructura
```
README.md  documentacion.md  cobertura.md
specs/            ENTRADAS: specs de producto (agregado a la estructura pedida: separa entrada de salida)
factory/          cli.mjs (pipeline) · lib/ · prompts/ · conocimiento/ · regresion/helpers.ts · honestidad/
entorno/          docker-compose.yml · Dockerfile.web · config.php · setup.sh · seed/ · receptor/
salidas/spec-N/   spec.md · plan.json · sondas.json · codigo/ · pruebas/ · trazabilidad.md · cambios.diff
corridas/<id>/    pipeline.log · funcional.xml · visual/ · honestidad.log · ia/
visual/           lineas-base/ (+ APROBACIONES.json) · diferencias/
ia/               bitácora de dirección, reglas, prompts, transcripciones
```

## Video
_(enlace permanente, no público: se agrega al final)_
