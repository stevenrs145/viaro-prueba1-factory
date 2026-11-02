---
id: spec-1
titulo: Reconocimiento obligatorio antes de iniciar un quiz
naturaleza: agrega
---

# Spec 1 · Reconocimiento obligatorio antes de iniciar un quiz

## Intención
Antes de ver la primera pregunta de un quiz, el estudiante debe aceptar un breve reconocimiento (por ejemplo términos o instrucciones). Tanto el texto del reconocimiento como si es obligatorio deben poder configurarse **por quiz**. El objetivo es que un examen pueda exigir esa aceptación sin cambiar el resto del flujo del quiz.

## Criterios de aceptación
- CA-1: con el reconocimiento activado, el estudiante **no puede llegar a la primera pregunta** hasta aceptarlo.
- CA-2: con el reconocimiento desactivado, el flujo del quiz queda **idéntico** al actual.
- CA-3: el texto del reconocimiento es **configurable por quiz**.
- CA-4: el cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, más evidencia de que el camino completo funciona (configurar, el estudiante lo ve y acepta, llega al quiz).

## Escenarios
- Dado un quiz con el reconocimiento activado, cuando el estudiante entra, entonces ve el reconocimiento y la primera pregunta queda bloqueada hasta aceptar.
- Dado un quiz con el reconocimiento desactivado, cuando el estudiante entra, entonces empieza el quiz directamente.

## Fuera de alcance
Calificación, reportes, y cualquier tipo de actividad que no sea el quiz.

## Restricciones
Cambio aditivo: no romper el flujo cuando está desactivado. No tocar nada fuera del alcance.
