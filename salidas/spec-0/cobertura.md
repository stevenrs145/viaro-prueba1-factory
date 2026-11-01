# Cobertura — spec-0: Regresión del camino feliz del módulo de exámenes

Este reporte declara lo que la regresión NO verifica y qué se propone hacer con cada hueco. Lo que sí verifica está en
`pruebas/`. El resultado de cada corrida queda en `trazabilidad.md`.

## Fuera de alcance por el spec

| Área | Por qué queda afuera | Plan |
|---|---|---|
| Preguntas aleatorias | El spec la excluye. QUIZ-REG usa preguntas fijas para que nota y capturas sean deterministas. | Prueba propia con un examen creado por la prueba y un banco controlado, cuando un spec toque preguntas aleatorias. |
| Opciones de revisión | El spec las excluye. Solo se ejercitan los valores por defecto del examen sembrado. | Matriz por momento (durante, inmediatamente, después, al cerrar) en un examen propio, cuando un spec cambie la revisión. |
| Límite de tiempo y auto envío | El spec los excluye. Dependen del reloj y del cron. | Prueba de spec con límite corto y examen propio, ejecutando la tarea de cierre de intentos. |
| Overrides de notas | El spec los excluye. CA-5 solo cubre la calificación manual del ensayo. | Prueba de override desde el libro de calificaciones cuando un spec toque notas. |
| Reportes avanzados | El spec los excluye. Solo se comprueba que el estudiante aparece en `overview` y que el ensayo aparece en `grading`. | Pruebas de `statistics` y `responses` con datos aislados, porque sus totales dependen de todos los intentos del examen. |
| Restricciones de acceso | El spec las excluye. | Cubrir por regla de acceso en el spec que la introduzca o la modifique. |

## Huecos decididos en el plan

| Hueco | Riesgo que queda | Plan |
|---|---|---|
| Selector de actividades | Se entra directo a `modedit.php`. Una rotura del selector no se detecta. | Decidir con producto si es parte del camino feliz. Si lo es, agregar una prueba por viewport. |
| Calificación masiva por `mode=grading` | La calificación se hace por intento en `comment.php`. Una rotura del formulario masivo no se detecta. | Agregar un recorrido con un estudiante propio, si se amplía el rango de spec-0. |
| Informes sin línea base visual | `overview`, `grading`, el banco, `edit.php` y la vista del profesor en `view.php` no tienen captura, porque muestran datos de otras pruebas. | Capturarlos con un examen y usuarios aislados si producto los quiere en la línea base. |
| Rol administrador y profesor sin edición | Solo se cubren profesor con edición y estudiante. | Confirmar qué significa "para cada rol" y agregar los roles que correspondan. |
| Nota en el libro de calificaciones | Se comprueba en `review.php` y `view.php`, no en el libro de calificaciones. | Agregar la comprobación si producto la considera parte de CA-4 y CA-5. |
| Ejecución mensual | La suite se ejecuta con `node factory/cli.mjs suite`. No se agregó programación. | Definir quién la dispara y dónde. |

## Límites de esta entrega

- **Líneas base:** las 14 imágenes (7 pantallas por 2 viewports) quedan pendientes de aprobación humana en el PR. La primera corrida las crea, así que esa comparación no prueba que la pantalla sea correcta. Las siguientes prueban estabilidad contra lo aprobado.
- **Detección de roturas funcionales:** se apoya en valores exactos (`4.00/6.00`, `6.67 out of 10.00 (66.67%)`, `5.50/6.00`, `9.17 out of 10.00 (91.67%)`). Sin plugin no corre la mutación "sin la funcionalidad", así que no hay una rotura deliberada que lo demuestre.
- **Acoplamiento de criterios:** CA-3 y CA-4 están en un solo recorrido. Si falla CA-3, CA-4 no se evalúa en esa corrida.
- **Residuos si una prueba se corta:** pueden quedar un examen, una categoría o preguntas con prefijo `Spec0`, porque `reset.php` solo borra intentos. Un examen residual puede aparecer en el índice del curso y cambiar las capturas de escritorio de las páginas que lo muestran (riesgo sin confirmar en una corrida real). Si pasa, hay que borrarlo a mano o agregar la limpieza por prefijo a `reset.php`.
- **Papelera de reciclaje:** cada examen borrado deja una copia en la papelera del curso hasta que caduca. No afecta a las pruebas.
- **Máscara faltante en `helpers.ts`:** `prepararCaptura` no cubre la columna `Time` del historial de respuestas. Spec-0 la enmascara localmente. Se recomienda agregar `time` a esa expresión en un cambio aparte.
- **Consolidación:** este archivo vive en `salidas/spec-0/`. Pasarlo al `cobertura.md` de la raíz queda como tarea humana.
