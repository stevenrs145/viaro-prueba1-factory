# Corrida BLOQUEADA: specs/spec-3-resumen-por-tema.md

La fábrica no construyó nada: estas decisiones son de producto y no se pueden asumir.

## 1. CONFLICTO QUE IMPIDE ENTREGAR: dos pruebas aprobadas de spec-0 exigen el bloque que este spec ordena quitar. salidas/spec-0/pruebas/02-estudiante-sin-ensayo.spec.ts:55 y 03-calificacion-manual.spec.ts:70 afirman filaResumen('Retroalimentación') = 'Retro global: aprobado.'. Con el plugin instalado fallan en escritorio y móvil, así que cuatro ejecuciones quedan en rojo. pantallas_afectadas no lo resuelve: cubre líneas base, no aserciones, y como la aserción está justo antes de toHaveScreenshot (:56 y :72), las capturas spec-0-cierre y spec-0-cierre-calificado ni siquiera se generan. La IA no puede corregirlo: el reintento solo atiende pruebas del propio spec (cli.mjs:171), tocar salidas/spec-0 es violación de alcance (cli.mjs:190-195) y una suite con fallos no abre PR (cli.mjs:205). Cambiarlo en main tampoco sirve: el PR de spec-3 no se mergea, así que main quedaría en rojo sin el plugin.

**Pregunta:** Spec-3 ordena quitar la fila 'Retroalimentación', pero dos pruebas aprobadas de spec-0 la exigen. ¿Autorizan que, solo con spec-3 instalado, esas dos aserciones pasen a exigir que la fila ya no exista (toHaveCount(0)), sin bajar la cantidad de asserts? Para aplicarlo hace falta cambiar la fábrica: que un plan pueda declarar pruebas de regresión afectadas, igual que pantallas_afectadas, visibles en el PR y pendientes de aprobación humana. Sin ese cambio la fábrica no puede abrir el PR de spec-3.

**Por qué bloquea:** Rompe un requisito sin decisión reversible al alcance de la fábrica: CA-2 contradice una prueba aprobada, CA-5 exige la suite en verde y las reglas duras prohíben debilitar pruebas. Cambiar una prueba aprobada es decisión humana. Lo que ya no se puede afirmar es el texto viejo; el resto de esas pruebas (Estado, Puntos, Calificación, tabla de view.php) sí sigue valiendo y es justo lo que protege CA-4.

## Cómo continuar

Resolver cada punto EN EL SPEC (`specs/spec-3-resumen-por-tema.md`) y volver a ejecutar:

    node factory/cli.mjs run specs/spec-3-resumen-por-tema.md
