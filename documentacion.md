# Cómo construí la fábrica

## 1. Qué construí y por qué esta arquitectura
Una fábrica de **un comando por spec** (`node factory/cli.mjs run <spec.md>`), en Node sin dependencias propias
(solo Playwright para las pruebas). El principio: **la IA decide, la máquina verifica**. Todo lo que la IA produce
pasa por controles deterministas que la IA no puede saltarse.

| Etapa | Quién | Por qué |
|---|---|---|
| Análisis → `plan.json` (capa, bordes, criterio→prueba, sondas) | IA, solo lectura del código real de Moodle | Elegir la capa exige criterio; leer el código evita inventar APIs. El plan se valida con un esquema y se reintenta si no cumple. |
| Sondas | Código | "No asumir el contrato": la IA pide peticiones; la fábrica las ejecuta contra el sistema real y le devuelve las respuestas. |
| Implementación | IA, escribe solo en `salidas/<spec>/` | Herramientas restringidas por rol; la restricción se verifica después con git. |
| Validación, despliegue, pruebas | Código | Sintaxis PHP, estructura del plugin, criterio→prueba, `upgrade.php`, Playwright en contenedor. |
| Corrección (×3) | IA, con el fallo real + snapshot ARIA de la página | Cada intento queda en `pipeline.log`. |
| Mutación sin funcionalidad | Código | Se desinstala el plugin: las pruebas `@requiere-feature` deben fallar. Si pasan sin el código, no prueban nada. |
| Alcance y core intacto | Código | `git status` del repo y del árbol de Moodle: solo pueden aparecer directorios de plugins nuevos. |
| Control de verificación honesta | Código independiente | No importa nada del generador; compara contra referencias en `main`. |
| PR | Código | Rama + PR con razonamiento, bordes, diff, evidencia. Nunca mergea. |

**Playwright en su imagen oficial de Docker**, no en el navegador del host: las capturas dependen de fuentes y
antialiasing, y así el render es igual en mi máquina y en la de la sesión en vivo. El contenedor comparte la red del
web y usa la misma URL (`wwwroot`) que el host.

**La regresión también sale de la fábrica (spec-0).** Si la fábrica no puede producir la regresión, no hay garantía
de que pueda producir las pruebas de un spec sorpresa. Fue su primera corrida real.

## 2. Cómo dirigí la IA
**Herramientas.** Una sesión de Claude que operó mi máquina (WSL2) para construir la fábrica, y Claude Code CLI en
modo headless (`claude -p`) como motor del pipeline, con plantillas versionadas (`factory/prompts/`), conocimiento
verificado de la plataforma (`factory/conocimiento/moodle-5.3.md`) y herramientas restringidas por rol. Cada llamada
deja prompt y transcripción en `ia/transcripciones/<corrida>/`. Las decisiones de construcción están en `ia/bitacora.md`.

| Delegué a la IA | Decidí yo |
|---|---|
| Leer el código de Moodle para ubicar puntos de extensión | Que la regresión saliera de la fábrica como prueba de que la fábrica sirve |
| Redactar plan, plugin y pruebas de cada spec | Separar IA (decide) de código (verifica); un control de honestidad sin IA |
| Diagnosticar fallos con el estado real de la página | Rechazar mis primeras preguntas a producto por genéricas y buscar las trampas del enunciado |
| Primera versión de helpers, setup y control | Pruebas en contenedor; umbral visual; qué se enmascara y cómo |
| | Referencias del control en `main`, no en la rama auditada |
| | Que los cambios de líneas base existentes nunca se aprueben solos |

**Cómo validé lo generado:** nada se dio por bueno porque la IA lo dijera. Cada supuesto del entorno se comprobó
ejecutando (8 resultaron falsos en Moodle 5.3, ver §6). Los helpers se validaron con una prueba de humo contra la
instancia real antes de que la fábrica los usara. El control de honestidad se probó con sabotajes reales antes de
confiar en él. Y en cada spec, el pipeline se verifica a sí mismo.

## 3. Control de verificación honesta
Detalle, reglas y límites en `cobertura.md §3`. Resumen: análisis estático por prueba (cantidad y fuerza de asserts,
`await`, omisiones, `only`, `catch` vacíos, mocks de red, `expect.soft`, umbrales y máscaras) comparado contra el
manifiesto aprobado en `main`; **mutación** (las pruebas deben fallar sin el plugin); y **líneas base** verificadas por
hash contra aprobaciones firmadas. Un cambio de línea base existente solo es legítimo con aprobación humana con razón,
o como *propuesta* del pipeline para una pantalla que el spec declaró afectada (queda pendiente en el PR). Límites
declarados: asserts dentro de helpers, valores esperados cambiados por otros igual de fuertes, datos fijados de forma
coherente, y que quien escribe en `main` puede mover las referencias.

## 4. Qué mockeé, asumí o quedó manual
- **Sistema externo (spec 2)**: receptor propio en `entorno/receptor/`, con contrato real (422 si faltan campos,
  201/200 con idempotencia) y modos de fallo controlables (500, timeout, HTML de proxy, 200 con cuerpo de error). Es un
  mock del destino, no de Moodle: el plugin le habla por HTTP real.
- **Seguridad de salida de Moodle**: se desbloqueó solo el rango de la red de Docker en `curlsecurityblockedhosts`.
- **Datos**: sintéticos (curso QA101, 12 estudiantes con rangos por spec para que las pruebas no compartan intentos).
- **Manual (declarado)**: merge de PR, aprobación de líneas base y del manifiesto de pruebas. Login de Claude Code y `gh`.
- **Retomar tras límite de uso de la IA** (`--reanudar`): agregado tras quedarme sin cuota en plena corrida; reutiliza
  plan y código y rehace todas las verificaciones.

## 5. Bordes de los specs
Preguntas enviadas a Viaro el 2026-11-01, cada una con su propuesta. Sin respuesta antes de la entrega, se aplicó la propuesta.

| # | Spec | Borde | Decisión | Por qué |
|---|---|---|---|---|
| B1 | 3 | El spec dice "retroalimentación general, texto único para todo el examen". En Moodle el bloque a nivel examen es *overall feedback* (retroalimentación global), que **no** es un texto único sino uno por rango de nota; y en la UI en español "retroalimentación general" es la retro **por pregunta**, que el spec deja fuera de alcance. | Se reemplaza *overall feedback*; la retro por pregunta no se toca. | La descripción funcional solo coincide con overall feedback. Discrepancia documentada vs. real. |
| B2 | 3 | "Tema" sin definir: categoría del banco, tags, secciones del quiz o *grade items* nativos (MDL-74610). | Categoría del banco. | Toda pregunta tiene una; no exige configuración nueva. |
| B3 | 3 | Overall feedback vive en la revisión, en la tabla de intentos de view.php, en el formulario y en las casillas de Opciones de revisión. CA-3 prohíbe opciones que ya no hacen nada. | Retirarla de todos esos puntos desde plugin (hooks de formulario `after_form_definition`), sin tocar core, y limpiar datos. | CA-3 se verifica en el diff. |
| B4 | 3 | Si el profesor oculta notas en Opciones de revisión, un resumen por tema las filtraría. | El resumen respeta la opción de revisión de notas. | No introducir fuga. |
| B5 | 2 | Con ensayo, al enviar no hay nota (verificado: "Not yet graded"). | Notificar al envío con nota pendiente y renotificar al calificar; id de intento como clave de idempotencia. | La regresión exige ensayo; los reintentos no deben duplicar. |
| B6 | 2 | Identificador del estudiante; enviar el correo saca datos personales de Moodle. | id de Moodle + idnumber, no correo; Privacy API. | Minimizar datos personales. |
| B7 | 2 | "Responde distinto a lo esperado": 2xx con error en el cuerpo, HTML de proxy, timeout. | Éxito = contrato verificado, no solo el código HTTP. | Restricción del spec. |
| B8 | 1 | Vigencia de la aceptación; con límite de tiempo, ¿corre el reloj mientras se lee? | Por intento y antes de crearlo (preflight de regla de acceso); no se repite al retomar. | No consumir tiempo ni alterar el flujo. |

Además, cada plan de la fábrica registra los bordes que encontró la IA y qué habría preguntado
(`salidas/spec-N/plan.json` → `bordes[].preguntaria`). Spec-0 registró 16.

## 6. Qué encontré en el camino (Moodle 5.3 vs. documentación previa)
1. **Composer obligatorio** desde 5.1 (`vendor/` en la raíz, fuera de `public/`).
2. **Scripts CLI en `admin/cli` de la raíz**, no bajo `public/`.
3. **PostgreSQL 17** requerido.
4. **`install_database.php` y el manejador de excepciones CLI pueden salir con código 0 tras fallar** → el setup
   verifica contra la base de datos.
5. Los generadores de datos de Moodle cargan PHPUnit: el sembrado necesita dependencias de desarrollo.
6. `quiz_update_sumgrades()` ya no existe (`grade_calculator::recompute_quiz_sumgrades()`).
7. La imagen `moodlehq/moodle-php-apache` toma el DocumentRoot de `APACHE_DOCUMENT_ROOT`.
8. Salidas HTTP a rangos privados y puertos ≠ 80/443 bloqueadas por defecto (impacta al spec 2).
9. La mezcla de opciones de respuesta está activa por defecto y hace no determinista cualquier QA visual.
10. Con un ensayo respondido, la revisión muestra "Grade: Not yet graded" y **no** muestra Marks ni Feedback.

**Decisiones que cambié:** el modelo inicial de líneas base (el pipeline nunca toca una existente) bloqueaba al
spec 3, que cambia la pantalla de cierre a propósito; pasó a "propuesta pendiente de aprobación humana, solo para
pantallas declaradas en el plan". Los timeouts por prueba (180 s) hacían que cada fallo costara minutos; pasaron a
15 s por acción.
