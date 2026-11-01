---
id: spec-3
titulo: Reemplazo del cierre del intento por un resumen por tema
naturaleza: reemplaza
---

# Spec 3 · Reemplazo del cierre del intento por un resumen por tema

## Intención
Hoy, al terminar un intento, el estudiante ve el bloque de retroalimentación general que trae Moodle de fábrica, que es un texto único para todo el examen. Ese bloque **ya no sirve** y queremos otro en su lugar: un resumen que le muestre cómo le fue **agrupado por el tema al que pertenece cada pregunta**, para que sepa qué estudiar.

Esto **no es agregar una sección más**. Lo viejo se va y lo nuevo ocupa su lugar.

## Criterios de aceptación
- CA-1: al terminar el intento, el estudiante ve su desempeño agrupado por tema.
- CA-2: el bloque de retroalimentación general anterior **ya no aparece** donde aparecía.
- CA-3: **no queda nada muerto del bloque anterior**: ni código sin uso, ni configuración huérfana, ni una opción en la interfaz que ya no hace nada. Esto se verifica en el diff.
- CA-4: el resto de la pantalla de cierre del intento (nota, revisión de respuestas, navegación) sigue funcionando igual.
- CA-5: se entrega con pruebas automáticas derivadas de estos criterios, funcionales y visuales, ejecutadas y en verde.

## Escenarios
- Dado un examen con preguntas de tres temas distintos, cuando el estudiante termina el intento, entonces ve su resultado desglosado por esos tres temas y no ve el bloque anterior.
- Dado un examen ya existente que tenía retroalimentación general configurada, cuando el estudiante termina el intento, entonces ve el resumen por tema.

## Fuera de alcance
La retroalimentación por pregunta, que es otra cosa y se queda como está. Reportes del profesor.

## Bordes
Hay decisiones acá que el spec no resuelve a propósito. Resolvelas con criterio explícito o preguntá.

## Restricciones
Reemplazo, no adición. Que las dos cosas convivan detrás de una opción de configuración **no cumple** el CA-2.
