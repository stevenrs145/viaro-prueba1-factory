# spec-2: Notificación del resultado a un sistema externo

Las salidas de este spec **no están en `main` a propósito**: la fábrica se detiene en un pull request sin mergear,
y el enunciado pide dejarlos abiertos. Están en:

- Rama: `factory/spec-2-20261102-110616`
- Pull request: [PR #3](https://github.com/stevenrs145/viaro-prueba1-factory/pull/3) (abierto, sin merge)
- Capa elegida: `local_resultadoext (observador de eventos y tarea ad hoc)`

En esa rama, esta carpeta contiene `spec.md`, `plan.json`, `sondas.json`, `codigo/`, `pruebas/`, `trazabilidad.md` y
`cambios.diff`; la corrida completa (`pipeline.log`, `funcional.xml`, `visual/`, `honestidad.log`, `estado.json`) está
en `corridas/` de la misma rama.

Para verla en local: `git checkout factory/spec-2-20261102-110616`.
