Sos el CORRECTOR de una fábrica de software sobre Moodle 5.3. La implementación de `salidas/spec-0/` no pasó la validación
(intento 1). Escribís SOLO dentro de `salidas/spec-0/`. Podés leer `entorno/.moodle-src/` y `factory/regresion/`.

# Qué falló (salida real del pipeline)
salidas/spec-0/pruebas/soporte.ts: 'networkidle': en Moodle nunca se cumple (peticiones periódicas). Usar prepararCaptura() de factory/regresion/helpers.ts.
salidas/spec-0/pruebas/soporte.ts: login propio: usar login() de factory/regresion/helpers.ts.

# Plan vigente
```json
{
  "spec_id": "spec-0",
  "titulo": "Regresión del camino feliz del módulo de exámenes",
  "naturaleza": "solo-pruebas",
  "componente": null,
  "ruta_moodle": null,
  "capa_justificacion": "No se necesita plugin: el spec prohíbe modificar Moodle y pide proteger comportamiento nativo, así que la capa más específica son pruebas E2E de Playwright en salidas/spec-0/pruebas/. No hay punto de extensión; se verificó que existen las superficies que se van a ejercitar: creación por public/course/modedit.php:34 y :70 (add, course) con section obligatorio si no hay sectionid (:72-74); banco en public/question/banks.php:35 (courseid); composición en public/mod/quiz/edit.php:53; intento, resumen y revisión en public/mod/quiz/attempt.php:142, summary.php:99 y review.php:116; calificación manual en public/mod/quiz/comment.php:81-102 e informe public/mod/quiz/report/grading/report.php:78-92. Lógica de notas verificada: public/question/engine/questionusage.php:387-395 y public/question/behaviour/manualgraded/behaviour.php:112-116. Filas de la revisión: public/mod/quiz/classes/output/attempt_summary_information.php:305-329. Las pruebas son compatibles con el control de honestidad si cada test conserva sus expect en el cuerpo del test (factory/honestidad/analisis.mjs:59 no cuenta los que estén en funciones auxiliares). Con componente null, la mutación sin funcionalidad no aplica (factory/cli.mjs:99).",
  "bordes": [
    {
      "descripcion": "La restricción dice 'usa el examen sembrado', pero CA-1 y CA-2 piden crear un examen y agregarle preguntas.",
      "decision": "CA-1 y CA-2 crean y luego eliminan un examen propio llamado 'Spec0 <proyecto> <timestamp>', que no contiene el texto 'Examen de regresión'. CA-3, CA-4, CA-5 y las capturas de estudiante usan QUIZ-REG.",
      "criterio": "No se puede crear un examen ya sembrado. Cambiar QUIZ-REG afectaría a todos los specs y sus preguntas se bloquean en cuanto tiene intentos. El nombre evita que abrirQuiz, que filtra con hasText y first(), tome el examen equivocado.",
      "preguntaria": "¿La restricción de usar datos sembrados excluye a CA-1 y CA-2, o esperan otro mecanismo?"
    },
    {
      "descripcion": "El escenario 'responde completo sin ensayo' no se puede cumplir con otro examen, porque QUIZ-REG incluye un ensayo en la pregunta 6.",
      "decision": "El estudiante responde las preguntas 1 a 5 y deja el ensayo vacío.",
      "criterio": "Un ensayo vacío queda en estado gaveup, no needsgrading (behaviour.php:112-113), y get_total_mark solo devuelve null ante needsgrading (questionusage.php:390). La nota se calcula sin calificación manual y el ensayo vale 0.",
      "preguntaria": "¿'Sin ensayo' significa dejarlo en blanco o se necesita un examen sembrado sin ensayo?"
    },
    {
      "descripcion": "El spec no fija qué nota debe verse.",
      "decision": "Se comparan valores exactos. Sin ensayo se responde One, True, Two (incorrecta), True, True: Marks '4.00/6.00', Grade '6.67 out of 10.00 (66.67%)'. Con ensayo se responden las cinco bien y el profesor pone 0.5: Marks '5.50/6.00', Grade '9.17 out of 10.00 (91.67%)'. En ambos casos Feedback 'Retro global: aprobado.'.",
      "criterio": "Las 6 preguntas valen 1 y el examen vale 10 (seed.php; helpers de pregunta con defaultmark 1; grade_out_of.php:88-92). Una respuesta incorrecta y una nota fraccionaria detectan una nota fija, un ensayo ignorado o un reescalado roto. La opción de retroalimentación global está activa en todos los momentos (tests/generator/lib.php:62,70,78), así que el resultado no depende del tiempo transcurrido.",
      "preguntaria": "¿Alcanza con la nota del intento y view.php, o también debe verificarse en el libro de calificaciones?"
    },
    {
      "descripcion": "Hay 4 estudiantes para 2 proyectos, y el sembrado usa 'calificación más alta' con intentos ilimitados.",
      "decision": "Recorrido sin ensayo: estudiante1 en escritorio y estudiante2 en móvil. Recorrido con ensayo: estudiante3 en escritorio y estudiante4 en móvil. Se elige con el fixture isMobile, sin skip. Cada estudiante hace un solo intento por corrida.",
      "criterio": "Compartir estudiante entre proyectos permitiría que un intento anterior tape una nota no actualizada y haría que view.php dependiera del orden de ejecución. Las pruebas de ambos proyectos corren en secuencia y sin reintentos (playwright.config.ts:11-14).",
      "preguntaria": "Ninguna: es una decisión técnica para que el resultado sea fiable."
    },
    {
      "descripcion": "Con un intento por estudiante, CA-3 y CA-4 no pueden ser pruebas independientes sin compartir usuario entre recorridos.",
      "decision": "Se usa un único recorrido de estudiante titulado [CA-3] [CA-4] [CA-6]. Otro recorrido cubre [CA-5] [CA-6], y la captura del formulario va en la prueba [CA-1] [CA-6].",
      "criterio": "La trazabilidad acepta varios criterios en un título (factory/lib/trazabilidad.mjs:13). El costo es que una rotura en CA-3 impide evaluar CA-4 en esa corrida; se acepta para mantener el determinismo y el rango de estudiantes asignado.",
      "preguntaria": "¿Quieren ampliar el rango de estudiantes de spec-0 para separar esas pruebas?"
    },
    {
      "descripcion": "'Pantalla de cierre del intento' puede ser summary.php o review.php.",
      "decision": "Se capturan ambas: spec-0-resumen-envio (summary.php) y spec-0-cierre (review.php). Para capturar el resumen, la prueba vuelve con 'Return to attempt' y después usa enviarIntento.",
      "criterio": "helpers.ts llama 'cierre/revisión' a review.php y spec-3 la trata como la pantalla de nota y revisión, pero cubrir ambas elimina la ambigüedad.",
      "preguntaria": "¿Cuál de las dos pantallas es la que producto llama 'cierre'?"
    },
    {
      "descripcion": "CA-6 pide entre 5 y 8 pantallas, sin decir cuáles aparte de las obligatorias.",
      "decision": "Son 7 pantallas por 2 viewports, es decir 14 PNG: spec-0-crear-examen, spec-0-examen-estudiante, spec-0-intento, spec-0-resumen-envio, spec-0-cierre, spec-0-calificacion-manual y spec-0-cierre-calificado. Quedan afuera la página del curso, los informes overview y grading, el banco, la vista del profesor en view.php y edit.php.",
      "criterio": "Las pantallas excluidas muestran datos de otras pruebas (intentos de estudiante12 y de otros specs, contadores o residuos), que cambian entre la corrida del spec y la suite completa. spec-0-intento se captura en la página 1, sin editor TinyMCE y sin respuestas.",
      "preguntaria": "¿Hay alguna pantalla de profesor que deba estar en la línea base aunque requiera datos aislados?"
    },
    {
      "descripcion": "La calificación manual puede hacerse desde mode=grading o desde comment.php; el primero lista intentos de varios estudiantes y el segundo solo funciona como ventana emergente.",
      "decision": "La prueba verifica que overview muestra al estudiante y que mode=grading muestra 'HIS-2 Ensayo'. Luego abre review.php con el id del intento, usa 'Make comment or override mark' con page.waitForEvent('popup'), guarda comentario y nota 0.5, y espera el cierre del popup.",
      "criterio": "comment.php es la calificación manual real para un solo intento. Al guardar llama a window.opener.location.reload (comment.php:102 y weblib.php:331), por lo que un page.goto directo no tendría opener y dejaría la pantalla en un estado no representativo.",
      "preguntaria": "¿Debe cubrirse además la calificación masiva desde mode=grading?"
    },
    {
      "descripcion": "comment.php muestra al profesor el historial de respuestas con la columna Time, que prepararCaptura no enmascara.",
      "decision": "La captura spec-0-calificacion-manual agrega al arreglo de máscaras solo las celdas de la columna Time del historial, y se toma antes de guardar.",
      "criterio": "El historial es visible para profesores (locallib.php:1221) y la columna es Time (question/engine/renderer.php:444), mientras que la expresión de prepararCaptura no la cubre. La fábrica no puede editar helpers.ts desde este spec, y enmascarar la celda conserva el principio de tapar solo el valor dinámico.",
      "preguntaria": "Ninguna; se recomienda agregar 'time' a prepararCaptura en un cambio aparte."
    },
    {
      "descripcion": "CA-1 y CA-2 dejan datos en el curso y reset.php solo borra intentos.",
      "decision": "Al final, en try/finally, la prueba elimina el examen con la confirmación de /course/mod.php?delete=<cmid>&sesskey=<M.cfg.sesskey> y las preguntas con el borrado del banco. Verifica que el examen ya no esté en el curso y que las preguntas no se listen. Las preguntas van en una categoría distinta de Álgebra, Geometría e Historia.",
      "criterio": "implementador.md exige dejar la configuración como estaba y spec-3 usa esas categorías como temas. Si una prueba se corta, pueden quedar residuos; los nombres únicos y la exclusión del curso y del banco de la línea base evitan falsos fallos.",
      "preguntaria": "¿Aceptan agregar a reset.php la limpieza de datos con prefijo Spec0?"
    },
    {
      "descripcion": "Crear el examen desde el selector de actividades cambia mucho entre escritorio y móvil.",
      "decision": "El profesor entra directo a /course/modedit.php?add=quiz&course=<id>&section=0, en ambos viewports. Las preguntas se crean desde /question/banks.php?courseid=<id>, no con 'a new question' desde el examen.",
      "criterio": "El spec exige crear en el banco y luego agregar al examen. El formulario y su guardado son lo que se quiere proteger. El selector de actividades queda sin cubrir y se declara en la cobertura.",
      "preguntaria": "¿El selector de actividades es parte del camino feliz que quieren proteger?"
    },
    {
      "descripcion": "'Para cada rol' no enumera los roles.",
      "decision": "Se cubren profesor con edición y estudiante. Administrador queda afuera.",
      "criterio": "Son los únicos roles que aparecen en los criterios y CA-1 a CA-6 no asignan acción alguna al administrador.",
      "preguntaria": "¿Debe cubrirse algún otro rol, por ejemplo profesor sin permiso de edición?"
    },
    {
      "descripcion": "'Cada mes, antes y después de cada cambio' sugiere una ejecución programada que este spec no pide construir.",
      "decision": "Se entrega la suite ejecutable con 'node factory/cli.mjs suite' y no se agrega programación.",
      "criterio": "El spec es solo-pruebas y las pruebas de salidas/*/pruebas ya entran en testMatch (playwright.config.ts:9), así que corren con cada spec posterior.",
      "preguntaria": "¿Quién dispara la corrida mensual y dónde?"
    },
    {
      "descripcion": "Sin línea base aprobada ni plugin, la primera corrida no demuestra que las pruebas detecten una rotura.",
      "decision": "Las 14 imágenes quedan pendientes de aprobación humana en el PR. La comparación de la regresión completa solo demuestra estabilidad, no que la imagen sea correcta. La detección funcional se apoya en valores exactos.",
      "criterio": "Con componente null, cli.mjs:99 no ejecuta la mutación y --update-snapshots=missing escribe y pasa cuando falta la imagen (node_modules/playwright/lib/matchers/expect.js:12485-12487).",
      "preguntaria": "¿Quieren una mutación deliberada puntual para demostrar la detección antes de aprobar?"
    },
    {
      "descripcion": "Los helpers solo tienen prueba de humo en escritorio y con el ensayo respondido.",
      "decision": "Se usan igual en móvil. Si enviarIntento falla con el ensayo vacío o en móvil, se resuelve con una variante en salidas/spec-0/pruebas/soporte.ts, sin debilitar aserciones. Los recorridos con varias capturas pueden usar test.setTimeout(180_000).",
      "criterio": "humo-helpers.spec.ts:7 omite móvil y helpers.ts no puede editarse desde este spec. Los recorridos con varios inicios de sesión y networkidle pueden superar el límite global de 90 segundos.",
      "preguntaria": "Ninguna: se resuelve con el resultado real de la primera corrida."
    },
    {
      "descripcion": "El spec manda declarar lo que queda fuera de alcance en el reporte de cobertura, pero la IA solo puede escribir en salidas/spec-0/.",
      "decision": "Se escribe salidas/spec-0/cobertura.md con cada exclusión y su plan. Pasarlo al cobertura.md raíz queda como tarea humana.",
      "criterio": "implementador.md limita la escritura a spec_dir y cobertura.md raíz no existe aún como archivo de la fábrica.",
      "preguntaria": "¿El reporte final debe consolidarse en el cobertura.md raíz antes de aprobar el PR?"
    }
  ],
  "criterios": [
    {
      "id": "CA-1",
      "texto": "Un profesor puede crear y configurar un examen nuevo en el curso.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-1] [CA-6] En 01-profesor-examen.spec.ts, profesor abre /course/modedit.php?add=quiz&course=<id>&section=0, captura spec-0-crear-examen antes de completar, crea 'Spec0 <proyecto> <timestamp>' con Attempts allowed 2 y Grading method First attempt, guarda y verifica en view.php el nombre, 'Attempts allowed: 2' y 'Grading method: First attempt'. Reabre con update=<cmid> y verifica que los valores persisten. Limpia el examen y verifica que ya no aparece en el curso."
      ]
    },
    {
      "id": "CA-2",
      "texto": "Un profesor puede crear preguntas en el banco (opción múltiple, verdadero o falso y ensayo) y agregarlas a un examen.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-2] En 01-profesor-examen.spec.ts, profesor crea un examen propio, crea desde el banco de QA101 una pregunta de cada tipo con nombre único y las agrega con Add > from question bank > Add selected questions to the quiz, cambiando de banco si hace falta. Verifica en /mod/quiz/edit.php?cmid=<cmid> que hay exactamente 3 preguntas con esos nombres y que el total de puntos es 3.00. Elimina examen y preguntas y verifica su ausencia."
      ]
    },
    {
      "id": "CA-3",
      "texto": "Un estudiante puede iniciar un intento, responder, navegar entre preguntas (hacia adelante y hacia atrás) y enviarlo.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-3] [CA-4] [CA-6] En 02-estudiante-sin-ensayo.spec.ts, con estudiante1 en escritorio y estudiante2 en móvil: captura spec-0-examen-estudiante e inicia el intento; captura spec-0-intento en la página 1; responde 1 y 2; avanza y responde 3 y 4; retrocede con Previous page y verifica toBeChecked en las respuestas 1 y 2; avanza de nuevo hasta la página 3, verifica toBeChecked en 3 y 4 al pasar por la página 2, y responde 5. Verifica en summary.php cinco respuestas guardadas y el ensayo sin responder, captura spec-0-resumen-envio, vuelve con Return to attempt y envía."
      ]
    },
    {
      "id": "CA-4",
      "texto": "Al enviar, las preguntas automáticas se califican solas y el estudiante ve su resultado.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-3] [CA-4] [CA-6] Mismo recorrido, escenario sin ensayo: tras enviar, en review.php verifica con filaResumen Status 'Finished', Marks '4.00/6.00', Grade '6.67 out of 10.00 (66.67%)' y Feedback 'Retro global: aprobado.'. Captura spec-0-cierre y verifica que view.php muestra el intento con nota 6.67."
      ]
    },
    {
      "id": "CA-5",
      "texto": "Un profesor puede ver los intentos y calificar manualmente una pregunta de ensayo; la nota del estudiante se actualiza.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-5] [CA-6] En 03-calificacion-manual.spec.ts, con estudiante3 en escritorio y estudiante4 en móvil: responde bien las preguntas 1 a 5, escribe el ensayo, envía y guarda el id del intento. Verifica Grade 'Not yet graded' y toHaveCount(0) en la fila Marks. Como profesor, verifica la fila de 'Estudiante Número N' en mode=overview y 'HIS-2 Ensayo' en mode=grading. Abre review.php del intento y luego el popup de calificación; captura spec-0-calificacion-manual enmascarando también la columna Time; guarda un comentario fijo y nota 0.5. Como estudiante, en review.php verifica Marks '5.50/6.00', Grade '9.17 out of 10.00 (91.67%)', Feedback 'Retro global: aprobado.' y el comentario. Captura spec-0-cierre-calificado y verifica que view.php muestra 9.17."
      ]
    },
    {
      "id": "CA-6",
      "texto": "Las pantallas principales del recorrido se ven como en la línea base aprobada, en escritorio y en celular. Entre 5 y 8 pantallas completas; obligatorias: la pantalla del intento del estudiante y la pantalla de cierre del intento.",
      "verificacion": "visual",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "[CA-1] [CA-6], [CA-3] [CA-4] [CA-6] y [CA-5] [CA-6]: las 7 pantallas se comparan con toHaveScreenshot('spec-0-<pantalla>.png', { fullPage: true, mask }) en ambos proyectos, usando prepararCaptura y sin tolerancias por prueba: spec-0-crear-examen, spec-0-examen-estudiante, spec-0-intento, spec-0-resumen-envio, spec-0-cierre, spec-0-calificacion-manual y spec-0-cierre-calificado."
      ]
    },
    {
      "id": "PROC-1",
      "texto": "Lo que queda fuera de alcance se declara en el reporte de cobertura con su plan.",
      "verificacion": "proceso",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "Evidencia en salidas/spec-0/cobertura.md: una entrada con plan para preguntas aleatorias, opciones de revisión, límite de tiempo y auto envío, overrides de notas, reportes avanzados y restricciones de acceso, más los huecos decididos en este plan: selector de actividades, calificación masiva por mode=grading, informes sin línea base y rol administrador."
      ]
    }
  ],
  "pantallas_afectadas": [],
  "sondas": [],
  "elimina": []
}
```

# Spec
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


# Cómo corregir
1. Diagnosticá la CAUSA antes de editar: ¿es el código del plugin o es la prueba? Leé el estado ARIA de la página al fallar.
2. Si el plugin no hace lo que el criterio pide, arreglá el PLUGIN. Nunca "arregles" una prueba para que acepte un comportamiento
   que no cumple el criterio: debilitar, borrar o saltar asserts está prohibido y el control de honestidad lo bloquea.
3. Si la prueba usa un selector o un flujo equivocado (verificá contra el estado ARIA real), corregí la prueba manteniendo
   la misma intensidad de verificación.
4. Mismas reglas de pruebas que en la implementación (títulos `[CA-n]`, `@requiere-feature`, `@camino-error`, sin mocks de red,
   sin skip/only/soft, helpers de `factory/regresion/helpers.ts`).
5. Nunca reimplementes `login()` ni `prepararCaptura()`, ni los envuelvas con reintentos o esperas propias, y no uses `'networkidle'`.
   Si ya existe una copia en `salidas/spec-0/pruebas/`, bórrala y usá el helper. Si un helper es la causa, decilo en tu respuesta:
   lo arregla la fábrica, no la prueba.

Respondé con: causa raíz encontrada, qué cambiaste y por qué.
