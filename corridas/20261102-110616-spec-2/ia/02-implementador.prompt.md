Sos el IMPLEMENTADOR de una fábrica de software sobre Moodle 5.3 (módulo Quiz).
Implementás el PLAN aprobado: código del plugin + pruebas automáticas. Escribís SOLO dentro de `salidas/spec-2/`.
Podés leer `entorno/.moodle-src/` (Moodle real) y `factory/regresion/` (helpers y pruebas existentes).

# Spec
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


# Plan (decisiones ya tomadas: respetalas)
```json
{
  "spec_id": "spec-2",
  "titulo": "Notificación del resultado del intento a un sistema externo",
  "naturaleza": "integra",
  "componente": "local_resultadoext",
  "ruta_moodle": "public/local/resultadoext",
  "capa_justificacion": "Plugin local con observer y tarea ad hoc: el spec reacciona a algo que ya pasó y depende de un tercero por HTTP. Una regla de acceso (quizaccess_*) sirve para condicionar intentos, no para esto. Nada toca el core. EVENTO: no se usa attempt_submitted, sino attempt_graded. attempt_submitted se dispara en public/mod/quiz/classes/quiz_attempt.php:1892, ANTES de calcular la nota; sumgrades se asigna en :1915, la nota final se recalcula en :1928 y attempt_graded se dispara en :1931. Si se escuchara attempt_submitted, CA-1 saldría sin notas. attempt_graded pasa por process_grade_submission(), que cubre el envío normal (:2251-2252) y los cierres automáticos (:1682-1683, :2039-2040). No se dispara en previsualizaciones (:1890, :1927). ENSAYOS: QUIZ-REG incluye un ensayo. get_total_mark() devuelve null mientras haya uno sin calificar (public/question/engine/questionusage.php:387-392), así que el primer aviso sale sin nota de intento. Para el aviso con nota se observa \\mod_quiz\\event\\question_manually_graded (public/mod/quiz/comment.php:98 y public/mod/quiz/report/grading/report.php:605-607, ambos después del commit). NO se usa attempt_manual_grading_completed, que el documento de conocimiento sugiere: lo dispara una tarea programada con minuto 'R' que corre una vez por hora (public/mod/quiz/db/tasks.php:39-41), y se omite si la opción de revisión manualcomment está oculta o el estudiante no tiene la capacidad (public/mod/quiz/classes/task/quiz_notify_attempt_manual_grading_completed.php:102-113). Por eso puede llegar muy tarde o no llegar nunca; conviene corregir ese punto en factory/conocimiento/moodle-5.3.md. AISLAMIENTO DEL ESTUDIANTE: los observers van con 'internal' => false y corren después del commit (public/lib/classes/event/manager.php:129-136), de modo que un fallo del plugin no afecta la transacción del intento. El observer solo guarda el registro y encola la tarea, sin HTTP. REINTENTO: \\core\\task\\adhoc_task + manager::queue_adhoc_task (public/lib/classes/task/manager.php:297). Lanzar una excepción aplica backoff nativo de 60 s que se duplica (manager.php:1381-1409). El tope por defecto es 12 ejecuciones (public/lib/classes/task/adhoc_task.php:49), o sea unas 34 h. HTTP: clase curl de Moodle (public/lib/filelib.php:4069), que expone la causa real en error/errno (:3830-3831) y también el bloqueo por seguridad (:3755). CONFIGURACIÓN: settings.php con PARAM_URL, que acepta hosts sin dominio como http://receptor/ (public/lib/validateurlsyntax.php:283-301). DATOS: tablas propias en db/install.xml y Privacy API con add_external_location_link().",
  "bordes": [
    {
      "descripcion": "CA-1 dice 'al enviarse', pero en attempt_submitted todavía no hay nota.",
      "decision": "Se notifica en attempt_graded, que ocurre en la misma petición de envío. Incluye los cierres automáticos por tiempo. Los intentos abandonados no se notifican porque no tienen nota, y las previsualizaciones tampoco.",
      "criterio": "CA-1 exige las notas. El estudiante no percibe diferencia, porque ambos eventos van seguidos.",
      "preguntaria": "¿Los intentos abandonados sin enviar también deben informarse al sistema externo?",
      "bloqueante": false
    },
    {
      "descripcion": "Con preguntas de ensayo no hay nota al enviar: queda pendiente de calificación manual.",
      "decision": "Hay dos avisos. El primero sale al enviar, con attempt_grade null y grade_status 'pending'. El segundo sale cuando la calificación manual deja sumgrades distinto de null, con grade_status 'graded'. Cada uno tiene su propia clave de idempotencia.",
      "criterio": "CA-1 pide notificar al enviar, pero si no hubiera un segundo aviso el sistema externo nunca recibiría la nota. Es reversible: quitar uno de los dos avisos es un cambio de una sola línea en el observer.",
      "preguntaria": "¿El sistema externo prefiere recibir dos avisos o solo uno cuando la nota esté completa?",
      "bloqueante": false
    },
    {
      "descripcion": "Una nota puede cambiar después de informada: el profesor corrige el ensayo o se recalifica el examen de forma masiva.",
      "decision": "La corrección manual de una pregunta se notifica de nuevo si cambia sumgrades; misma nota, misma clave, sin envío nuevo. La recalificación masiva (attempt_regraded) NO se notifica en esta versión.",
      "criterio": "El spec habla del envío del intento. La recalificación masiva podría generar muchos envíos y no está pedida.",
      "preguntaria": "¿Las recalificaciones masivas deben llegar al sistema externo?",
      "bloqueante": false
    },
    {
      "descripcion": "Contrato del sistema externo: campos, respuestas e idempotencia.",
      "decision": "Se hace POST JSON a la URL configurada, con idempotency_key, student, quiz, attempt, timestamp, attempt_grade, final_grade, max_grade y grade_status. Los nombres se confirman con las sondas; si la respuesta real contradice este plan, manda la respuesta real. La clave es estable entre reintentos (intento + sumgrades, o 'pendiente') y también va en la cabecera Idempotency-Key.",
      "criterio": "La restricción del spec es no asumir el contrato. Si un reintento sigue a un timeout en el que el receptor sí guardó el dato, no debe duplicarse.",
      "preguntaria": "¿El contrato de la demo es el definitivo o el sistema real tendrá otro formato?",
      "bloqueante": false
    },
    {
      "descripcion": "Qué cuenta como envío exitoso: un 200 puede traer un error en el cuerpo y un proxy puede responder HTML.",
      "decision": "Éxito solo con HTTP 2xx, cuerpo JSON válido y status == 'accepted' (duplicate true también es éxito). Se guarda el id externo. Cualquier otra respuesta es fallo y se registra con el código HTTP y el cuerpo crudo.",
      "criterio": "El spec exige sobrevivir a que el sistema 'responda distinto a lo esperado'. Mirar solo el código HTTP daría por entregado un resultado no guardado.",
      "preguntaria": "¿El sistema real siempre devuelve status 'accepted' al aceptar?",
      "bloqueante": false
    },
    {
      "descripcion": "Qué fallos se reintentan, cuántas veces y qué pasa al agotarse.",
      "decision": "Se reintenta todo fallo, incluidos 4xx, con el backoff nativo y el tope de 12 ejecuciones (unas 34 h). Al fallar la última ejecución, el envío queda en estado 'agotado' con la última causa. El destino se lee en cada ejecución, así que corregir la URL sirve para los envíos que siguen en cola.",
      "criterio": "CA-3 dice que un fallo se reintenta, sin excepciones. Un 404 o 422 puede deberse a una configuración mala que el administrador corrige. El límite evita reintentos infinitos.",
      "preguntaria": "¿Hay un plazo máximo aceptable para que el resultado llegue? ¿Alguien debe recibir un aviso al agotarse?",
      "bloqueante": false
    },
    {
      "descripcion": "Reenvío de envíos agotados.",
      "decision": "No hay botón de reenvío. El envío agotado queda en el registro con sus datos y su causa.",
      "criterio": "No está en el spec. Se evita ampliar el alcance y queda visible en el registro.",
      "preguntaria": "¿Producto necesita reenvío manual para los agotados?",
      "bloqueante": false
    },
    {
      "descripcion": "Límite de tiempo de cada llamada HTTP.",
      "decision": "5 s para conectar y 10 s en total por llamada, como constantes de la tarea. La llamada se hace en cron, nunca en la petición del estudiante.",
      "criterio": "Un destino colgado no debe retener al cron. El modo 'timeout' del receptor no responde nunca.",
      "preguntaria": "¿El sistema real puede tardar más de 10 s en responder?",
      "bloqueante": false
    },
    {
      "descripcion": "Destino sin configurar, o bloqueado por la seguridad de cURL de Moodle.",
      "decision": "Sin URL no se hace HTTP y queda una fila en estado 'omitido' con la causa 'destino no configurado', sin reintento. Si Moodle bloquea la URL, es un fallo normal: se reintenta y se registra el mensaje real de Moodle. No se usa ignoresecurity.",
      "criterio": "CA-4 pide que cada resultado sea inspeccionable. Saltarse curlsecurity abriría un riesgo de SSRF. Para la demo la URL es http://receptor/resultados, porque localhost:8091 solo existe desde el host.",
      "preguntaria": "¿Los intentos anteriores a configurar el destino deben enviarse después?",
      "bloqueante": false
    },
    {
      "descripcion": "Autenticación contra el sistema externo.",
      "decision": "Sin autenticación ni token en esta versión. El único ajuste de destino es la URL.",
      "criterio": "CA-2 solo pide el destino y el contrato conocido no exige autenticación. Agregar un secreto sin saber su esquema sería inventar contrato.",
      "preguntaria": "¿El sistema real exigirá autenticación? ¿De qué tipo?",
      "bloqueante": false
    },
    {
      "descripcion": "Datos personales que salen de Moodle e identificación del estudiante.",
      "decision": "student lleva id, username e idnumber; no se envían ni nombre ni correo. quiz lleva id, cmid y nombre. Se declara el envío externo y las tablas en la Privacy API, con exportación y borrado.",
      "criterio": "CA-1 pide identificar al estudiante, sin más detalle. Se envía lo mínimo. Los datos del entorno son sintéticos.",
      "preguntaria": "¿Con qué identificador reconoce al estudiante el sistema institucional?",
      "bloqueante": false
    },
    {
      "descripcion": "Alcance: si la notificación aplica a todos los exámenes o solo a algunos.",
      "decision": "Aplica a todos los exámenes del sitio cuando hay destino configurado. No hay opción por examen.",
      "criterio": "El spec habla de un único destino configurado por el administrador y no menciona opciones por examen.",
      "preguntaria": "¿Hay exámenes que no deban informarse?",
      "bloqueante": false
    },
    {
      "descripcion": "Quién ve el registro, qué guarda y cuánto se conserva.",
      "decision": "Página de administración protegida por la capacidad local/resultadoext:viewlog (manager y admin). Hay una fila por envío y otra por cada llamada: fecha, URL, código HTTP, errno y error de cURL, y cuerpo crudo hasta 2000 caracteres, siempre escapado al mostrarlo. No hay purga automática.",
      "criterio": "CA-4 exige la causa real. El cuerpo viene de un tercero: sin escapar sería un XSS en una página de administrador. El tope evita guardar respuestas enormes.",
      "preguntaria": "¿Hay una política de retención para este registro? ¿Los profesores deben verlo?",
      "bloqueante": false
    },
    {
      "descripcion": "Las sondas no cubren todos los modos de fallo. La fábrica ejecuta 8 como máximo y corta cada una a los 15 s.",
      "decision": "Las sondas verifican el contrato, el duplicado, el 200 con error y el HTML de proxy. http500 y timeout no se sondean: se fuerzan de verdad en las pruebas E2E. /_control y /_reset son herramientas de prueba, no contrato, y el plugin no depende de ellas.",
      "criterio": "Se priorizan las respuestas más engañosas. El tratamiento genérico de 'no éxito' cubre los otros dos casos.",
      "preguntaria": "¿Se conocen otros modos de fallo del sistema real?",
      "bloqueante": false
    }
  ],
  "criterios": [
    {
      "id": "CA-1",
      "texto": "Al enviarse un intento, se notifica al sistema externo con estudiante, examen, nota del intento, nota final y marca de tiempo.",
      "verificacion": "funcional",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "version.php",
        "db/events.php",
        "db/install.xml",
        "classes/observer.php",
        "classes/notificador.php",
        "classes/task/enviar_resultado.php",
        "classes/privacy/provider.php"
      ],
      "pruebas": [
        "Quiz sin ensayo, creado con un script PHP por stdin y limpiado por el reset: estudiante7 envía el intento y /_recibidos muestra un POST con estudiante, examen, attempt_grade y final_grade no nulos y coherentes con la nota de la revisión, y timestamp.",
        "QUIZ-REG con ensayo: estudiante8 envía y llega un aviso con grade_status 'pending' y attempt_grade null.",
        "Luego el profesor califica el ensayo en mode=grading y llega un segundo aviso con otra clave, grade_status 'graded' y notas no nulas.",
        "El registro muestra el envío como exitoso, con el id externo devuelto por el receptor."
      ]
    },
    {
      "id": "CA-2",
      "texto": "El destino es configurable por el administrador.",
      "verificacion": "funcional",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "settings.php",
        "classes/task/enviar_resultado.php",
        "lang/en/local_resultadoext.php",
        "lang/es/local_resultadoext.php"
      ],
      "pruebas": [
        "El admin guarda la URL en la página de ajustes del plugin, recarga y el valor persiste; un estudiante no puede abrir esa página.",
        "Al configurar http://receptor/resultados el envío llega; al cambiarla a http://receptor/ruta-inexistente, el registro muestra esa URL y un 404, lo que prueba que se usa el valor configurado.",
        "Con el destino vacío, enviar un intento no genera ningún POST y el registro queda 'omitido' con la causa 'destino no configurado'."
      ]
    },
    {
      "id": "CA-3",
      "texto": "Un fallo del sistema externo se reintenta, y no rompe ni demora el envío del intento del estudiante.",
      "verificacion": "funcional",
      "requiere_feature": true,
      "camino_error": true,
      "archivos": [
        "classes/observer.php",
        "classes/task/enviar_resultado.php",
        "classes/notificador.php"
      ],
      "pruebas": [
        "Con /_control {mode:'http500', times:1}: el estudiante envía, ve la revisión sin ningún error, el primer POST recibe 500 y el reintento real, tras el backoff nativo de unos 60 s, llega y queda exitoso. /_recibidos muestra dos POST con la misma idempotency_key. La prueba sondea el estado con timeout amplio y no acorta el backoff.",
        "Con mode 'timeout' mantenido: el clic final hasta review.php tarda menos que el timeout del cliente (10 s), lo que demuestra que no hay HTTP en la petición del estudiante, y el registro acaba mostrando el fallo por timeout.",
        "Con mode 'ok_with_error_body' y times:1: el 200 con status 'error' NO cuenta como éxito y se reintenta.",
        "Con el attemptsavailable de la tarea llevado a 1 y fallo mantenido: el envío termina en 'agotado', con la causa visible y sin más intentos.",
        "Todas las pruebas de este bloque corren en serie, porque el modo del receptor es global, y lo devuelven a 'ok' al terminar."
      ]
    },
    {
      "id": "CA-4",
      "texto": "El resultado de cada envío queda registrado de forma inspeccionable, incluyendo los fallos, con la causa real visible y no envuelta en un mensaje genérico.",
      "verificacion": "funcional",
      "requiere_feature": true,
      "camino_error": true,
      "archivos": [
        "db/install.xml",
        "db/access.php",
        "settings.php",
        "registro.php",
        "classes/notificador.php",
        "lang/en/local_resultadoext.php",
        "lang/es/local_resultadoext.php"
      ],
      "pruebas": [
        "Tras forzar http500, el admin ve en el registro HTTP 500 y el texto real 'database unavailable (simulated)'.",
        "Tras forzar html_proxy, el registro muestra 502 y '502 Bad Gateway' como texto escapado, sin interpretar el HTML.",
        "Tras forzar ok_with_error_body, el registro muestra 'queue full, not stored'.",
        "Tras forzar timeout, el registro muestra el error real de cURL.",
        "Tras un fallo seguido de éxito, el registro conserva cada llamada por separado.",
        "Un estudiante no puede abrir registro.php."
      ]
    },
    {
      "id": "CA-5",
      "texto": "El cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, incluyendo el camino de error.",
      "verificacion": "proceso",
      "requiere_feature": false,
      "camino_error": true,
      "archivos": [],
      "pruebas": [
        "Evidencia de la corrida: pruebas de CA-1 a CA-4 en verde, con errores forzados de verdad en el receptor.",
        "Etapa de mutación: las pruebas fallan con el plugin desinstalado."
      ]
    }
  ],
  "pantallas_afectadas": [],
  "sondas": [
    {
      "descripcion": "Cuerpo vacío: qué campos exige el receptor y con qué forma informa el rechazo.",
      "metodo": "POST",
      "url": "http://localhost:8091/resultados",
      "body": {}
    },
    {
      "descripcion": "Envío completo con la forma prevista: código y cuerpo de una aceptación, y si admite objetos y notas numéricas.",
      "metodo": "POST",
      "url": "http://localhost:8091/resultados",
      "body": {
        "idempotency_key": "sonda-spec2-0001",
        "student": {
          "id": 0,
          "username": "sonda",
          "idnumber": "SONDA"
        },
        "quiz": {
          "id": 0,
          "cmid": 0,
          "name": "Sonda"
        },
        "attempt": 0,
        "attempt_grade": 7.5,
        "final_grade": 7.5,
        "max_grade": 10,
        "grade_status": "graded",
        "timestamp": "2026-11-02T12:00:00Z"
      }
    },
    {
      "descripcion": "Misma idempotency_key: cómo responde a un reintento de algo ya aceptado.",
      "metodo": "POST",
      "url": "http://localhost:8091/resultados",
      "body": {
        "idempotency_key": "sonda-spec2-0001",
        "student": {
          "id": 0,
          "username": "sonda",
          "idnumber": "SONDA"
        },
        "quiz": {
          "id": 0,
          "cmid": 0,
          "name": "Sonda"
        },
        "attempt": 0,
        "attempt_grade": 7.5,
        "final_grade": 7.5,
        "max_grade": 10,
        "grade_status": "graded",
        "timestamp": "2026-11-02T12:00:00Z"
      }
    },
    {
      "descripcion": "Prepara una respuesta 200 con error en el cuerpo.",
      "metodo": "POST",
      "url": "http://localhost:8091/_control",
      "body": {
        "mode": "ok_with_error_body",
        "times": 1
      }
    },
    {
      "descripcion": "Respuesta real de un 200 que no guardó el dato.",
      "metodo": "POST",
      "url": "http://localhost:8091/resultados",
      "body": {
        "idempotency_key": "sonda-spec2-0002",
        "student": {
          "id": 0,
          "username": "sonda",
          "idnumber": "SONDA"
        },
        "quiz": {
          "id": 0,
          "cmid": 0,
          "name": "Sonda"
        },
        "attempt": 0,
        "timestamp": "2026-11-02T12:00:00Z"
      }
    },
    {
      "descripcion": "Prepara una respuesta HTML de proxy.",
      "metodo": "POST",
      "url": "http://localhost:8091/_control",
      "body": {
        "mode": "html_proxy",
        "times": 1
      }
    },
    {
      "descripcion": "Respuesta real no JSON: el código no debe romperse al interpretarla.",
      "metodo": "POST",
      "url": "http://localhost:8091/resultados",
      "body": {
        "idempotency_key": "sonda-spec2-0003",
        "student": {
          "id": 0,
          "username": "sonda",
          "idnumber": "SONDA"
        },
        "quiz": {
          "id": 0,
          "cmid": 0,
          "name": "Sonda"
        },
        "attempt": 0,
        "timestamp": "2026-11-02T12:00:00Z"
      }
    },
    {
      "descripcion": "Deja el receptor limpio: sin estado de las sondas para las pruebas.",
      "metodo": "POST",
      "url": "http://localhost:8091/_reset",
      "body": {}
    }
  ],
  "elimina": []
}
```

# Respuestas reales de las sondas (contrato verificado; construí SOBRE ESTO, no sobre supuestos)
```json
[
  {
    "descripcion": "Cuerpo vacío: qué campos exige el receptor y con qué forma informa el rechazo.",
    "metodo": "POST",
    "url": "http://localhost:8091/resultados",
    "body": {},
    "respuesta": {
      "http": 422,
      "cuerpo": "{\"status\":\"error\",\"errors\":[\"missing_field: idempotency_key\",\"missing_field: student\",\"missing_field: quiz\",\"missing_field: attempt\",\"missing_field: timestamp\"]}"
    }
  },
  {
    "descripcion": "Envío completo con la forma prevista: código y cuerpo de una aceptación, y si admite objetos y notas numéricas.",
    "metodo": "POST",
    "url": "http://localhost:8091/resultados",
    "body": {
      "idempotency_key": "sonda-spec2-0001",
      "student": {
        "id": 0,
        "username": "sonda",
        "idnumber": "SONDA"
      },
      "quiz": {
        "id": 0,
        "cmid": 0,
        "name": "Sonda"
      },
      "attempt": 0,
      "attempt_grade": 7.5,
      "final_grade": 7.5,
      "max_grade": 10,
      "grade_status": "graded",
      "timestamp": "2026-11-02T12:00:00Z"
    },
    "respuesta": {
      "http": 201,
      "cuerpo": "{\"status\":\"accepted\",\"id\":\"f7c90c14-89eb-4f1b-bdfc-94a68cf32226\",\"duplicate\":false}"
    }
  },
  {
    "descripcion": "Misma idempotency_key: cómo responde a un reintento de algo ya aceptado.",
    "metodo": "POST",
    "url": "http://localhost:8091/resultados",
    "body": {
      "idempotency_key": "sonda-spec2-0001",
      "student": {
        "id": 0,
        "username": "sonda",
        "idnumber": "SONDA"
      },
      "quiz": {
        "id": 0,
        "cmid": 0,
        "name": "Sonda"
      },
      "attempt": 0,
      "attempt_grade": 7.5,
      "final_grade": 7.5,
      "max_grade": 10,
      "grade_status": "graded",
      "timestamp": "2026-11-02T12:00:00Z"
    },
    "respuesta": {
      "http": 200,
      "cuerpo": "{\"status\":\"accepted\",\"id\":\"f7c90c14-89eb-4f1b-bdfc-94a68cf32226\",\"duplicate\":true}"
    }
  },
  {
    "descripcion": "Prepara una respuesta 200 con error en el cuerpo.",
    "metodo": "POST",
    "url": "http://localhost:8091/_control",
    "body": {
      "mode": "ok_with_error_body",
      "times": 1
    },
    "respuesta": {
      "http": 200,
      "cuerpo": "{\"mode\":\"ok_with_error_body\",\"times\":1}"
    }
  },
  {
    "descripcion": "Respuesta real de un 200 que no guardó el dato.",
    "metodo": "POST",
    "url": "http://localhost:8091/resultados",
    "body": {
      "idempotency_key": "sonda-spec2-0002",
      "student": {
        "id": 0,
        "username": "sonda",
        "idnumber": "SONDA"
      },
      "quiz": {
        "id": 0,
        "cmid": 0,
        "name": "Sonda"
      },
      "attempt": 0,
      "timestamp": "2026-11-02T12:00:00Z"
    },
    "respuesta": {
      "http": 200,
      "cuerpo": "{\"status\":\"error\",\"message\":\"queue full, not stored\"}"
    }
  },
  {
    "descripcion": "Prepara una respuesta HTML de proxy.",
    "metodo": "POST",
    "url": "http://localhost:8091/_control",
    "body": {
      "mode": "html_proxy",
      "times": 1
    },
    "respuesta": {
      "http": 200,
      "cuerpo": "{\"mode\":\"html_proxy\",\"times\":1}"
    }
  },
  {
    "descripcion": "Respuesta real no JSON: el código no debe romperse al interpretarla.",
    "metodo": "POST",
    "url": "http://localhost:8091/resultados",
    "body": {
      "idempotency_key": "sonda-spec2-0003",
      "student": {
        "id": 0,
        "username": "sonda",
        "idnumber": "SONDA"
      },
      "quiz": {
        "id": 0,
        "cmid": 0,
        "name": "Sonda"
      },
      "attempt": 0,
      "timestamp": "2026-11-02T12:00:00Z"
    },
    "respuesta": {
      "http": 502,
      "cuerpo": "<html><body><h1>502 Bad Gateway</h1>nginx</body></html>"
    }
  },
  {
    "descripcion": "Deja el receptor limpio: sin estado de las sondas para las pruebas.",
    "metodo": "POST",
    "url": "http://localhost:8091/_reset",
    "body": {},
    "respuesta": {
      "http": 200,
      "cuerpo": "{\"ok\":true}"
    }
  }
]
```

# Conocimiento verificado de la plataforma
# Conocimiento de plataforma: Moodle 5.3 (módulo Quiz)

Este archivo se inyecta en cada corrida de la fábrica. Contiene hechos verificados en la instancia
(no supuestos). Si una afirmación de acá resulta falsa, se corrige acá, no en el prompt.

## Estructura de código (cambió en 5.1)
- Raíz del repo: `config.php`, `vendor/` (Composer, obligatorio), `admin/cli/*.php` (scripts CLI).
- `public/` es el webroot: todo el código de plugins vive bajo `public/`.
  - Regla de acceso de quiz: `public/mod/quiz/accessrule/<nombre>/`  (componente `quizaccess_<nombre>`)
  - Plugin local: `public/local/<nombre>/` (componente `local_<nombre>`)
  - Reporte de quiz: `public/mod/quiz/report/<nombre>/` (`quiz_<nombre>`)
  - Bloque: `public/blocks/<nombre>/` (`block_<nombre>`)
- CLI: `php admin/cli/upgrade.php --non-interactive`, `php admin/cli/purge_caches.php`,
  `php admin/cli/adhoc_task.php --execute`, `php admin/cli/uninstall_plugins.php --plugins=x --run`.
- PHP 8.3, PostgreSQL 17.

## Regla de oro
NUNCA se modifica nada fuera del directorio del plugin generado. El pipeline lo verifica con
`git status` sobre el código de Moodle y bloquea si hay cambios fuera de las rutas de plugins.

## Elegir la capa (de más específica a más general)
| Necesidad | Capa | Punto de extensión |
|---|---|---|
| Condicionar/impedir el inicio o la continuación de un intento, pedir algo antes de empezar | Regla de acceso `quizaccess_*` | `mod_quiz\local\access_rule_base`: `make()`, `is_preflight_check_required()`, `add_preflight_check_form_fields()`, `validate_preflight_check()`, `notify_preflight_check_passed()`, `current_attempt_finished()`, `prevent_access()`, `description()`; configuración por quiz con `add_settings_form_fields()`, `save_settings()`, `delete_settings()`, `get_settings_sql()` |
| Reaccionar a algo que pasó (envío de intento, calificación) | `local_*` con observer | `db/events.php`. Eventos: `\mod_quiz\event\attempt_submitted`, `attempt_graded`, `attempt_manual_grading_completed`, `attempt_regraded`, `attempt_abandoned`, `attempt_becameoverdue`, `attempt_started`, `attempt_reviewed` |
| Trabajo lento o que depende de terceros (HTTP) | Tarea ad hoc | `\core\task\adhoc_task` + `\core\task\manager::queue_adhoc_task()`. El cron corre en un contenedor aparte. Reintento nativo: lanzar excepción => backoff; `set_attempts_available()` |
| Configuración del administrador | `settings.php` del plugin | `admin_setting_*` |
| Agregar/quitar campos del formulario de una actividad | Hooks de formulario | `core_course\hook\after_form_definition`, `after_form_definition_after_data`, `after_form_submission` (en `db/hooks.php`) |
| Agregar HTML a una página existente | Hooks de salida | `core\hook\output\before_footer_html_generation`, `after_standard_main_region_html_generation`, `before_standard_top_of_body_html_generation`. Filtrar por `$PAGE->pagetype` (p. ej. `mod-quiz-review`) |
| Persistencia propia | `db/install.xml` + `db/upgrade.php` | Tablas `<plugin>_*`. Limpieza en `db/uninstall.php` |
| Datos personales guardados o enviados fuera | Privacy API | `classes/privacy/provider.php`; envío externo => `add_external_location_link()` |

## Hechos del Quiz verificados en 5.3
- Retroalimentación global (overall feedback): tabla `quiz_feedback` (rangos de nota: `mingrade`, `maxgrade`,
  `feedbacktext`). Se muestra SOLO si la opción de revisión `overallfeedback` está activa en el momento
  correspondiente (campo `quiz.reviewoverallfeedback`, bitmask de momentos). Lugares donde aparece:
  1. Revisión del intento: `mod_quiz\output\attempt_summary_information::create_for_attempt()` fila `feedback`.
  2. Página del quiz (view.php): columna de la tabla de intentos (`renderer.php` ~l.1212) y bloque bajo el resultado (~l.1305).
  3. Formulario del quiz: sección de retroalimentación global y casillas "Retroalimentación global" en Opciones de revisión.
- Retroalimentación POR PREGUNTA (en la UI en español "Retroalimentación general") es otra cosa: es del banco de preguntas.
- Bancos de preguntas en 5.x son instancias de `mod_qbank`; las categorías cuelgan del contexto del banco.
- Calificación por elementos (grade items del quiz, `quiz_grade_items`) existe de forma nativa.
- Con preguntas de ensayo, al enviar el intento la nota queda pendiente hasta la calificación manual
  (`attempt_manual_grading_completed`).
- Moodle bloquea por defecto peticiones salientes a rangos privados y a puertos distintos de 80/443
  (`curlsecurityblockedhosts`, `curlsecurityallowedport`). Usar la clase `curl` de Moodle o `\core\http_client`.

## Entorno de la fábrica
- Moodle: http://localhost:8090 — admin / Viaro.2026 ; profesor ; estudiante1..12 (misma clave).
- Estudiantes por spec (para que las pruebas de distintos specs no compartan intentos):
  regresión (spec-0): estudiante1..4 · spec-1: estudiante5..6 · spec-2: estudiante7..8 · spec-3: estudiante9..10 ·
  cualquier spec nuevo: estudiante11 · prueba de humo: estudiante12.
- La UI está en español (es), con coma decimal: "9,17 de 10,00 (91,67%)", "1,00/6,00". Botones verificados: "Intento de cuestionario",
  "Continuar el último intento", "Reintentar el cuestionario", "Siguiente página", "Página anterior", "Terminar intento...", "Enviar todo y terminar"
  (y de nuevo en el modal de confirmación). Revisión: tabla `table.quizreviewsummary` con filas Estado/Comenzado/Completado/Duración/Puntos/Calificación/Retroalimentación.
  Con un ensayo sin calificar: Calificación = "Sin calificar aún" y NO aparecen Puntos ni Retroalimentación. V/F: "Verdadero"/"Falso".
  Las preguntas sembradas tienen la opción correcta primero: ALG-1 "12", GEO-1 "6"; ALG-2, GEO-2 e HIS-1 son "Verdadero".
- Informe de intentos del profesor: /mod/quiz/report.php?id=<cmid>&mode=overview ; calificación manual: mode=grading.
- Curso `QA101`; examen `QUIZ-REG` (6 preguntas: 3 temas = categorías Álgebra/Geometría/Historia; incluye ensayo;
  tiene retroalimentación global configurada).
- Receptor externo de pruebas: desde Moodle `http://receptor/`, desde el host `http://localhost:8091/`.
  `POST /_control {"mode": "...", "times": N}` fuerza fallos; `GET /_recibidos` muestra lo recibido.
- Ejecutar PHP dentro de Moodle: `docker compose -f entorno/docker-compose.yml exec -T -u www-data web php <script>`.

## Pruebas en Moodle 5.3 (verificado)
- Nunca esperar `'networkidle'`: el índice del curso hace peticiones periódicas y no se cumple.
- El login se hace SIEMPRE con `login()`: `core/togglesensitive` reemplaza el input de la clave y borra lo escrito, y una
  petición de la página anterior puede invalidar el `logintoken`. Por eso Moodle responde "Unable to log in" con la clave correcta.
- Una página tiene su JS listo cuando `M.util.pending_js` está vacío: usar `esperarJS()` de los helpers al cargar y tras acciones con JS (filtros, autocompletar, modales). Hacer clic antes puede saltarse el manejador.


# Dónde va cada cosa
- Código del plugin: `salidas/spec-2/codigo/<ruta_moodle>/` (espejo del árbol de Moodle; p. ej. `salidas/spec-2/codigo/public/mod/quiz/accessrule/x/version.php`).
  Plugin completo e instalable: `version.php` (component, version AAAAMMDDXX, requires 2026100500 = Moodle 5.3, maturity MATURITY_STABLE), `lang/en/<componente>.php` con `pluginname`,
  `db/` si hay tablas/eventos/hooks/tareas, `classes/` con namespaces correctos, `classes/privacy/provider.php`.
  Si el plan dice `naturaleza: reemplaza`, el plugin debe ELIMINAR lo viejo de verdad (UI, configuración y datos huérfanos, con `db/install.php`/`db/upgrade.php`), no ocultarlo detrás de una opción.
- Pruebas: `salidas/spec-2/pruebas/*.spec.ts` (Playwright, TypeScript). Importá helpers con `import { ... } from '../../../factory/regresion/helpers';`

# Reglas de las pruebas (el control de verificación honesta las audita; violarlas BLOQUEA la entrega)
- Cada prueba lleva en el título el criterio que cubre: `[CA-1] ...`. Etiquetas en el título:
  `@requiere-feature` (debe fallar sin el plugin) y `@camino-error` (fuerza un error real).
- Infraestructura: usá `login()`, `prepararCaptura()` y `enviarIntento()` de los helpers. No escribas tu propia versión ni un
  envoltorio con reintentos, y no uses `'networkidle'`, que en Moodle nunca se cumple. Si un helper falla, es un defecto de la
  fábrica: reportalo en tu respuesta. La validación estática rechaza `'networkidle'`, `#loginbtn` y `/login/index.php`.
- Cada `test(...)` debe tener al menos un `expect(` en su propio cuerpo: el auditor no cuenta los que están dentro de funciones auxiliares.
- Comportamiento real: nada de `page.route`/`route.fulfill`, nada de `expect(true)`, nada de `.catch(() => {})`,
  nada de `test.skip/fixme/only`, nada de `expect.soft`. Matchers concretos (`toHaveText`, `toHaveCount`, `toBeVisible`, `toHaveURL`, `toEqual`), no `toBeTruthy`.
- Datos: usá el curso QA101, el examen "Examen de regresión" y los usuarios sembrados. Si necesitás configurar algo
  (activar una opción en un quiz, configurar un ajuste de admin), hacelo DESDE LA UI en la prueba (como profesor/admin) y
  dejalo como estaba al final. La configuración que dejes cambiada afecta a las pruebas de otros specs.
- Usuarios: usá SOLO los estudiantes asignados a este spec (ver "Estudiantes por spec" en el conocimiento), uno distinto por prueba cuando haya intentos.
- Visual: `await expect(page).toHaveScreenshot('<spec_id>-<pantalla>.png', { fullPage: true, mask: await prepararCaptura(page) })`.
  Nombres de captura con prefijo `spec-2-`. Toda pantalla que el spec introduce o cambia lleva su verificación visual.
- Las pruebas corren en escritorio y móvil. Si una prueba solo tiene sentido en un viewport, NO uses skip: dividí en archivos o
  hacé la prueba robusta en ambos.
- Cada prueba debe poder correr sola y en cualquier orden; el estado se resetea antes de cada corrida (se borran intentos).

# Al terminar
Respondé con un resumen breve: archivos creados, qué criterio cubre cada prueba, y cualquier decisión que tomaste fuera del plan (con su razón).
