# Reporte de cobertura

> Las cifras de ejecución (pasan/fallan por spec) se completan con la última corrida de la suite:
> ver `corridas/` y la sección "Resultados" al final.

## 1. Qué cubre la suite

### Regresión del camino feliz (spec-0, generada por la fábrica)
| Criterio | Qué verifica | Rol | Prueba |
|---|---|---|---|
| CA-1 | Crear y configurar un examen (intentos permitidos, método de calificación) y que persista | Profesor | `salidas/spec-0/pruebas/01-profesor-examen.spec.ts` |
| CA-2 | Crear en el banco preguntas de opción múltiple, V/F y ensayo y agregarlas a un examen | Profesor | `01-profesor-examen.spec.ts` |
| CA-3 | Iniciar intento, responder, navegar adelante **y atrás** (respuestas persisten), enviar | Estudiante | `02-estudiante-sin-ensayo.spec.ts` |
| CA-4 | Calificación automática con valores exactos (`4.00/6.00`, `6.67 out of 10.00`) — incluye una respuesta incorrecta a propósito para detectar notas fijas | Estudiante | `02-estudiante-sin-ensayo.spec.ts` |
| CA-5 | Ver intentos, calificar manualmente el ensayo y que la nota del estudiante se actualice (`Not yet graded` → `9.17`) | Profesor + Estudiante | `03-calificacion-manual.spec.ts` |
| CA-6 | 7 pantallas completas × escritorio y móvil contra línea base aprobada | Ambos | los tres archivos |

Cada prueba corre en **escritorio (1366×900)** y **móvil (Pixel 7)**, con estudiantes distintos por viewport
para que el resultado no dependa del orden de ejecución.

### Specs 1–3
Ver `salidas/spec-N/trazabilidad.md`: cada criterio → archivos que lo implementan → pruebas que lo cubren → resultado.

### Infraestructura
`factory/regresion/humo-helpers.spec.ts` valida los helpers compartidos contra la instancia real: si un selector de
Moodle cambia, falla primero esta prueba y con un mensaje claro.

## 2. QA visual

### Pantallas cubiertas (conjunto de regresión base: 7, en 2 tamaños)
| Pantalla | Por qué |
|---|---|
| `spec-0-intento` | **Obligatoria.** Donde el estudiante rinde: botones de navegación y de envío, bloque de navegación del quiz. En móvil es donde más se rompe. |
| `spec-0-cierre` | **Obligatoria.** Revisión al terminar: nota, retroalimentación, revisión de respuestas. Es la pantalla que cambia el spec 3. |
| `spec-0-resumen-envio` | Confirmación antes de enviar: un botón "Submit all and finish" fuera de pantalla aquí bloquea el examen. |
| `spec-0-examen-estudiante` | Puerta de entrada del estudiante; es la pantalla donde el spec 1 intercala el reconocimiento. |
| `spec-0-crear-examen` | Formulario de configuración del profesor: los specs que agregan opciones por quiz cambian esta pantalla. |
| `spec-0-calificacion-manual` | Calificación del ensayo por el profesor. |
| `spec-0-cierre-calificado` | Resultado final tras la calificación manual. |

**Excluidas a propósito:** página del curso, informes overview/grading, banco y `edit.php`: muestran datos de pruebas
de otros specs (contadores, filas), que cambian entre la corrida de un spec y la suite completa; capturarlas generaría
ruido. Su comportamiento sí se verifica funcionalmente.

### Criterio de comparación
- `threshold: 0.2` (tolerancia de color por pixel, absorbe antialiasing) y `maxDiffPixelRatio: 0.002` (0,2 % de la
  pantalla). Una fila nueva o faltante, un botón desplazado o un cambio de color del tema superan con holgura ese
  umbral; el ruido de subpixel queda debajo.
- **Determinismo antes que tolerancia:** pruebas dentro de la imagen oficial de Playwright (mismas fuentes en cualquier
  máquina), zona horaria fija, opciones de respuesta **sin mezclar** (la mezcla aleatoria de Moodle rompía cualquier
  comparación; se desactivó en el sembrado, no se enmascaró), tours de usuario desactivados, foco y hover retirados.
- **Máscaras solo sobre el valor dinámico, nunca la fila:** fechas Started/Completed/Duration, columnas de tiempo de
  cualquier tabla (identificadas por el **texto del encabezado**, no por posición), temporizador, contador de
  notificaciones. Si la fila desaparece, la captura lo detecta.
- **Actualizar una línea base es una decisión explícita:** el pipeline nunca sobrescribe una existente; propone, y
  `aprobar-linea-base --razon` registra hash, autor, fecha y razón en `visual/lineas-base/APROBACIONES.json`.
- **Reporte inspeccionable:** `corridas/<id>/visual/index.html` (esperada / obtenida / diferencia) y copia de las
  imágenes en `visual/diferencias/<corrida>/`.

## 3. Control de verificación honesta: qué detecta y qué no

Implementación: `factory/honestidad/` (≈250 líneas, sin IA, sin dependencias, auditable línea por línea). Referencias:
el manifiesto de pruebas y el registro de líneas base **tal como están en `main`** (`git show main:...`), no la copia de
trabajo que se audita. Corre en cada `run` (etapa 8) y en cada `suite`. Ante cualquier hallazgo sale con código 1 y el
pipeline no llega al PR.

| Sabotaje | Regla | Verificado con un sabotaje real |
|---|---|---|
| Assert eliminado | `ASSERTS-REDUCIDOS` | |
| Assert debilitado (`toHaveText` → `toBeDefined`/`toBeTruthy`) | `MATCHER-DEBILITADO` | ✅ |
| `await` quitado de un assert web-first (nunca falla) | `ASSERT-SIN-AWAIT` | ✅ |
| Assert sobre un literal (`expect(true).toBe(true)`) | `ASSERT-TRIVIAL` | |
| Prueba sin asserts | `SIN-ASSERTS` | |
| `test.skip/fixme` o `describe.skip` nuevo, skip condicional | `OMISION-NUEVA` / `OMITIDA` | ✅ |
| Omitida en ejecución sin razón declarada | `OMITIDA-EN-EJECUCION` | |
| `test.only` (apaga el resto de la suite) | `TEST-ONLY` | ✅ |
| Error tragado (`.catch(() => {})`, `catch {}`) | `ERROR-TRAGADO` | ✅ |
| Respuesta inventada (`page.route`/`route.fulfill`) | `RED-SIMULADA` | |
| `expect.soft` | `ASSERT-SOFT` | |
| Prueba borrada o renombrada | `PRUEBA-ELIMINADA` | |
| Camino de error que ya no se ejercita | `CAMINO-ERROR-NO-EJERCITADO` | |
| Prueba que pasa **sin** la funcionalidad | `PASA-SIN-FUNCIONALIDAD` (mutación: se desinstala el plugin) | |
| Umbral visual relajado (global o por prueba), reintentos activados | `UMBRAL-RELAJADO` / `UMBRAL-POR-PRUEBA` / `REINTENTOS` | |
| Máscara nueva o captura quitada | `MASCARA-AGREGADA` / `CAPTURA-ELIMINADA` | |
| **Línea base actualizada para tapar una rotura** | `LINEA-BASE-ALTERADA`: el hash debe coincidir con una aprobación humana con razón, o con una propuesta del pipeline para una pantalla que el spec **declaró** afectada | ✅ |
| Línea base borrada / nueva sin aprobar | `LINEA-BASE-ELIMINADA` / `LINEA-BASE-SIN-APROBAR` | |

### Límites (lo que NO detecta)
- **Asserts dentro de funciones auxiliares**: se cuentan los `expect` del cuerpo de cada prueba; si la verificación vive
  en un helper y se debilita ahí, el conteo no cambia (la mutación sí lo atrapa si la prueba es `@requiere-feature`).
  _Este límite lo señaló la propia IA analista al planificar spec-0._
- **Valor esperado cambiado por otro igual de fuerte** (`toHaveText('9.17')` → `toHaveText('6.67')`). Plan: firmar los
  literales esperados en el manifiesto.
- **Datos fijados de forma coherente**: si alguien cambia el sembrado y la expectativa a la vez, no se detecta. El
  pipeline bloquea cambios fuera de `salidas/<spec>/`, pero quien escribe en `main` podría hacerlo.
- **Quien escribe en `main` puede cambiar las referencias.** El control protege contra debilitamiento silencioso en
  ramas y PR, no contra un administrador malicioso. Plan: branch protection + CODEOWNERS sobre `factory/honestidad/` y
  `visual/lineas-base/APROBACIONES.json`.
- Análisis léxico, no AST: asserts generados dinámicamente u ofuscados pueden escapar.

## 4. Qué queda fuera y plan (en orden de prioridad)
| # | Área | Por qué esa prioridad | Plan |
|---|---|---|---|
| 1 | Límite de tiempo y auto envío | El fallo con más daño para un estudiante: pierde el examen | Quiz con límite corto; `page.clock` para adelantar el tiempo; verificar envío automático y estado `overdue`/`finished`; capturar el temporizador en móvil |
| 2 | Opciones de revisión | Fuga de notas o respuestas correctas antes de tiempo | Matriz de momentos (durante / inmediatamente / después / al cerrar) × qué se muestra |
| 3 | Restricciones de acceso (contraseña, fechas, red) | Un examen que no abre en el horario es una incidencia mayor | Una prueba por regla nativa, con fechas fijas |
| 4 | Preguntas aleatorias | No deterministas por diseño | Forzar la pregunta con `forcedrandomquestions` del generador; validar que la nota no dependa de la elegida |
| 5 | Overrides de usuario/grupo | Afecta a pocos estudiantes | Override de tiempo para un estudiante; verificar que solo a él le cambia |
| 6 | Reportes avanzados | Lo usa el profesor, no rompe el examen | Verificación funcional de totales; sin línea base visual (datos variables) |
| — | Selector de actividades, calificación masiva, rol administrador | Huecos detectados por la IA al planificar spec-0 | Agregar como criterios de un spec de regresión ampliado |
