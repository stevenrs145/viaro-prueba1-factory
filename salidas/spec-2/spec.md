---
id: spec-2
titulo: Notificación del resultado a un sistema externo
naturaleza: integra
---

# Spec 2 · Notificación del resultado a un sistema externo

## Intención
Cuando un estudiante envía un intento, el resultado debe llegar a un sistema externo de la institución, que hoy no existe en Moodle. El destino lo configura el administrador. El envío tiene que sobrevivir a que ese sistema externo esté caído o responda distinto a lo esperado.

## Criterios de aceptación
- CA-1: al enviarse un intento, se notifica al sistema externo con estudiante, examen, nota del intento, nota final y marca de tiempo.
- CA-2: el destino es **configurable por el administrador**.
- CA-3: un fallo del sistema externo **se reintenta**, y no rompe ni demora el envío del intento del estudiante.
- CA-4: el resultado de cada envío queda registrado de forma inspeccionable, incluyendo los fallos, **con la causa real visible** y no envuelta en un mensaje genérico.
- CA-5: el cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, incluyendo el camino de error.

## Escenarios
- Dado un destino configurado y disponible, cuando el estudiante envía el intento, entonces el resultado llega y queda registrado como exitoso.
- Dado un destino que responde con error, cuando el estudiante envía el intento, entonces el envío se reintenta, el estudiante no ve ninguna falla, y el registro muestra qué pasó.

## Fuera de alcance
Construir el sistema externo. Para la demo apuntalo a un receptor tuyo.

## Restricciones
No asumir el contrato del sistema externo: verificá contra la respuesta real antes de construir sobre ella.
