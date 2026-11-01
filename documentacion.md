# Documentación: cómo se construyó la fábrica

> Borrador vivo. Se completa al cierre; las secciones de bordes se escriben desde el inicio
> porque fueron lo primero que se analizó, antes de escribir código.

## Bordes de los specs detectados y criterio aplicado

Las preguntas se enviaron a Viaro el 2026-11-01 con una propuesta por cada una.
Si no hay respuesta antes de la entrega, se aplica la propuesta y queda declarada aquí.

| # | Spec | Borde | Decisión (pendiente de confirmación) | Por qué |
|---|---|---|---|---|
| B1 | 3 | El spec dice "retroalimentación general, texto único para todo el examen". En Moodle el bloque a nivel examen es *overall feedback* (retroalimentación global), que **no** es un texto único sino un texto por rango de calificación. Y en la UI en español "retroalimentación general" es el nombre de la retro **por pregunta**, que el spec declara fuera de alcance. | Se reemplaza *overall feedback*. La retro por pregunta no se toca. | La descripción funcional (nivel examen, al cierre del intento) solo coincide con overall feedback. Discrepancia documentado vs. real. |
| B2 | 3 | "Tema" no está definido. Moodle ofrece: categoría del banco, tags, secciones del quiz y *grade items* del quiz (MDL-74610). | Categoría del banco de preguntas. | Toda pregunta tiene una; no exige configuración nueva al profesor. |
| B3 | 3 | Overall feedback vive en varios lugares: revisión del intento, tabla de intentos en view.php, formulario del quiz y casillas "Retroalimentación global" de Opciones de revisión. CA-3 prohíbe opciones de UI que ya no hacen nada. | Retirar de todos esos puntos desde capa de plugin, sin tocar core. | CA-3 se verifica en el diff. |
| B4 | 3 | Si el profesor oculta calificaciones en Opciones de revisión, un resumen por tema con notas filtraría información. | El resumen respeta la opción de revisión de calificaciones (marks). | No introducir fuga de notas. |
| B5 | 2 | Con preguntas de ensayo, al enviar el intento la nota aún no existe. | Notificar al envío con nota "pendiente" y renotificar al calificar manualmente; id de intento como clave de idempotencia. | La regresión obliga a tener ensayo; reintentos no deben duplicar. |
| B6 | 2 | Identificador del estudiante no definido; enviar correo implica datos personales fuera de Moodle. | Enviar id de Moodle e idnumber, no el correo. Declarar en Privacy API. | Minimizar datos personales. |
| B7 | 2 | "Responde distinto a lo esperado" incluye 2xx con cuerpo de error, HTML de un proxy, timeouts. | Éxito = contrato verificado contra el receptor real, no solo el código HTTP. | Restricción explícita del spec. |
| B8 | 1 | Vigencia de la aceptación (¿por intento, por sesión?). Con límite de tiempo, ¿corre el reloj mientras se lee? | Por intento, antes de crearlo (preflight de regla de acceso); no se repite al retomar. | No consumir tiempo del examen; no alterar el flujo. |

## Entorno
- Moodle **5.3.0** (tag `v5.3.0`, rama `MOODLE_503_STABLE`), última estable al 2026-11-01.
  Desde 5.1 el código vive bajo `public/`: guías e imágenes previas no aplican tal cual.
- Construido y probado en Windows + WSL2 (Ubuntu) + Docker Desktop, igual que la máquina de evaluación.
