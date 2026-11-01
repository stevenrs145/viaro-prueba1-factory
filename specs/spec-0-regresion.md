---
id: spec-0
titulo: Regresión del camino feliz del módulo de exámenes
naturaleza: solo-pruebas
---

# Spec 0 · Regresión del camino feliz del módulo de exámenes

## Intención
Cada mes, antes y después de cada cambio, tiene que poder comprobarse automáticamente que el uso básico del módulo
de exámenes sigue funcionando y se ve bien, para cada rol, en escritorio y en celular. Este spec no cambia el
comportamiento de Moodle: produce la regresión que protege todo lo demás.

## Criterios de aceptación
- CA-1: un profesor puede crear y configurar un examen nuevo en el curso.
- CA-2: un profesor puede crear preguntas en el banco (opción múltiple, verdadero o falso y ensayo) y agregarlas a un examen.
- CA-3: un estudiante puede iniciar un intento, responder, navegar entre preguntas (hacia adelante y hacia atrás) y enviarlo.
- CA-4: al enviar, las preguntas automáticas se califican solas y el estudiante ve su resultado.
- CA-5: un profesor puede ver los intentos y calificar manualmente una pregunta de ensayo; la nota del estudiante se actualiza.
- CA-6: las pantallas principales del recorrido se ven como en la línea base aprobada, en escritorio y en celular.
  Entre 5 y 8 pantallas completas; obligatorias: la pantalla del intento del estudiante y la pantalla de cierre del intento.

## Escenarios
- Dado el examen sembrado, cuando un estudiante lo responde completo sin ensayo y lo envía, entonces ve su nota calculada.
- Dado un intento con ensayo enviado, cuando el profesor lo califica manualmente, entonces el estudiante ve la nota final actualizada.

## Fuera de alcance
Preguntas aleatorias, opciones de revisión, límite de tiempo y auto envío, overrides de notas, reportes avanzados,
restricciones de acceso. (Se declaran en el reporte de cobertura con su plan.)

## Restricciones
No modifica código de Moodle ni plugins: solo pruebas. Usa el examen y los usuarios sembrados.
