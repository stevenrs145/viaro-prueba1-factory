---
id: spec-4
titulo: Intentos restantes en la página del quiz
naturaleza: agrega
---

# Spec 4 · Intentos restantes en la página del quiz

## Intención
Antes de empezar o retomar un quiz, el estudiante debe saber cuántos intentos le quedan, para decidir cuándo usarlos sin tener que contarlos por su cuenta.

## Criterios de aceptación
- CA-1: en un quiz con límite de intentos, la página del quiz muestra al estudiante **cuántos intentos le quedan**.
- CA-2: el número se actualiza después de **enviar un intento**.
- CA-3: cuando no le quedan intentos, el mensaje lo indica con claridad.
- CA-4: en un quiz sin límite de intentos, la página queda **idéntica** a la actual.
- CA-5: el cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, más evidencia de que el camino completo funciona.

## Escenarios
- Dado un quiz con 3 intentos permitidos y uno enviado, cuando el estudiante abre la página del quiz, entonces ve que le quedan 2.
- Dado un quiz con todos los intentos usados, cuando el estudiante abre la página del quiz, entonces ve que no le quedan intentos.
- Dado un quiz sin límite de intentos, cuando el estudiante abre la página del quiz, entonces no ve ningún mensaje nuevo.

## Fuera de alcance
Cambiar cuántos intentos se permiten, y lo que ve el profesor.

## Restricciones
Cambio aditivo: no romper el flujo actual. No tocar nada fuera del alcance.
