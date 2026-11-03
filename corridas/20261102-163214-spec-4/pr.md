## Intentos restantes en la página del quiz

Propuesto por la fábrica a partir de `salidas/spec-4/spec.md`. **El pipeline se detiene aquí: requiere aprobación humana. No mergea ni despliega.**

### Capa elegida
`quizaccess_attemptsremaining` (public/mod/quiz/accessrule/attemptsremaining)

Regla de acceso de quiz usada solo por su descripción: no impide ni condiciona nada. Es la capa más específica, porque el mensaje entra en la lista de información que view.php ya muestra al estudiante, junto a 'Intentos permitidos' del core. Verificado: access_manager.php:78-83 instancia toda clase quizaccess_* con make() y descarta las que devuelven null; access_manager.php:103 las descubre por rule.php; access_rule_base.php:174 define description(); access_manager.php:321-326 acumula las descripciones; view.php:214 las pasa a infomessages; renderer.php:910 y renderer.php:1063 las pintan en el recuadro .quizinfo. Precedente directo: accessrule/numattempts/rule.php:29-40, que usa get_num_attempts_allowed() == 0 en make() para no actuar en quizzes sin límite. Eso resuelve CA-4 sin ramas de presentación: sin regla no hay salida. Se descarta un hook de salida (before_footer_html_generation y similares): obligaría a filtrar por pagetype, a recalcular quiz, overrides y capacidades, y a inyectar HTML fuera del recuadro de información. Se descarta local_* con observer: CA-2 no necesita reaccionar a un evento, porque el conteo se calcula en vivo en cada carga. No hace falta persistencia propia: el dato sale de quiz_attempts, así que no hay db/ ni tablas. El proveedor de privacidad es null_provider. Restricciones verificadas: la regla no recibe userid (usar $USER, el usuario actual) y describe_rules también lo usa la API externa (external.php:2133).

### Bordes del spec y criterio aplicado
- **Intento en curso: el spec habla de 'empezar o retomar', pero no dice si un intento sin enviar cuenta como usado.** → Cuenta como usado, igual que el core: view.php:86-106 suma terminados y no terminados en numattempts, y numattempts/rule.php:42-50 compara contra ese total. Con un intento en curso el mensaje lo aclara: 'Te quedan N intentos además del que está en curso', 'Te queda 1 intento además del que está en curso' o 'No te quedan intentos después del que está en curso'. _(El número debe coincidir con los intentos nuevos que Moodle realmente va a permitir. La aclaración evita decir 'no te quedan intentos' mientras la página ofrece 'Continuar el último intento'.)_
- **Qué estados de intento se cuentan.** → Contar quiz_get_user_attempts(quizid, userid, 'finished', true) más 'unfinished', igual que view.php:86 y :91. No usar 'all': incluiría NOT_STARTED (quiz_attempt.php:57), que el core no cuenta. Finished incluye SUBMITTED y ABANDONED (lib.php:544-547). El resultado se acota con max(0, permitidos - usados). _(Misma cuenta que la regla nativa. Un intento abandonado consume cupo en el core, así que acá también.)_
- **Overrides de usuario o de grupo que cambian el límite de intentos.** → Usar el límite efectivo del estudiante con $quizobj->get_num_attempts_allowed(), que ya trae el override aplicado (quiz_settings.php:103-104 y :256). Si el override deja el quiz sin límite, make() devuelve null. Si el límite efectivo es menor que lo usado, muestra el mensaje de 'no te quedan intentos'. _(El estudiante debe ver su propio límite real. El override no se modifica.)_
- **Quién ve el mensaje. Lo que ve el profesor está fuera de alcance, pero describe_rules corre para todos los roles (view.php:214).** → make() devuelve null si el usuario no tiene mod/quiz:attempt o si tiene mod/quiz:preview (profesor, administrador). Se usa $quizobj->has_capability (quiz_settings.php:415). Invitados y no matriculados tampoco lo ven. _(Respeta el 'fuera de alcance': la página del profesor no cambia. Las previsualizaciones no son intentos reales del estudiante.)_
- **Mensaje del core cuando se agotan los intentos: Moodle ya muestra nomoreattempts al pie (numattempts/rule.php:44, renderer.php:961).** → Se agrega 'No te quedan intentos.' en .quizinfo y se conserva el mensaje del core. Ambos pueden convivir en pantalla. _(Cambio aditivo: no se toca el flujo actual ni se quita nada. El mensaje nuevo queda arriba, junto a los datos del quiz, y la prueba de CA-3 lo distingue del nativo.)_
- **Quiz cerrado, todavía no abierto o sin preguntas: quedan intentos, pero no se pueden usar ahora.** → El mensaje informa el saldo igual, sin mirar fechas ni contenido. Los avisos propios de Moodle siguen indicando que el quiz no está disponible. _(El spec pide saber cuántos quedan, no si se pueden usar hoy. Mezclar disponibilidad agregaría reglas no pedidas.)_
- **Redacción, singular/plural e idioma.** → Cadenas en lang/en (obligatorio) y lang/es. El plugin puede traer su español: string_manager_standard.php:188 carga lang/<idioma> del plugin. Textos en español: 'Te quedan {$a} intentos.', 'Te queda 1 intento.', 'No te quedan intentos.', más las variantes con intento en curso. El estilo es el de un párrafo más de .quizinfo, sin notificación de color. _(Coherencia con la UI en español y con el bloque de información existente. Se evita un 'Te quedan 1 intentos'.)_
- **Activación: el spec no pide una opción por quiz.** → Sin ajustes por quiz ni de administrador: aplica a todo quiz con límite. Se desactiva retirando la regla de acceso. _(Cambio mínimo. Una opción nueva agregaría formulario, tabla y alcance no pedidos.)_
- **Efecto colateral: mod_quiz_get_quiz_access_information también usa describe_rules (external.php:2133), así que la app móvil recibiría el mensaje entre sus reglas de acceso.** → Se acepta sin código adicional y se declara en el PR. _(Es el mismo dato para el mismo estudiante, sin cambios en el contrato de la API. Filtrarlo exigiría distinguir el origen de la llamada.)_
- **Datos de prueba: QUIZ-REG es sin límite (seed.php:71, attempts=0), es compartido, y spec-4 solo tiene a estudiante11, que corre en escritorio y móvil.** → CA-1, CA-2 y CA-3 ponen el límite con un override de usuario para estudiante11 sobre QUIZ-REG, desde la UI como profesor (overrides.php, overrideedit.php). No se cambia el ajuste general del quiz. Cada prueba arranca sin intentos de estudiante11 (borrados como profesor en el informe mode=overview) y sin override, y termina dejándolo igual. CA-4 usa QUIZ-REG tal cual. _(Si la limpieza falla, solo afecta a estudiante11 y no a la regresión de otros specs. El reset entre corridas no alcanza, porque cada prueba corre en dos proyectos con el mismo estudiante. El override llega al mismo campo quiz->attempts que usa un límite general (quiz_settings.php:104 y :256) y además verifica el límite efectivo. Limitación que el PR debe declarar: el límite configurado a nivel de quiz no se prueba por separado.)_

### Evidencia
- Trazabilidad: `salidas/spec-4/trazabilidad.md`
- Diff: `salidas/spec-4/cambios.diff`
- Corrida: `corridas/20261102-163214-spec-4/` (pipeline.log, funcional.xml, visual/, honestidad.log)
- Suite completa: 21 OK, 0 fallidas, 1 omitidas

### ⚠️ Líneas base visuales NUEVAS — revisar y aprobar
- `visual/lineas-base/spec-4-quedan-intentos--escritorio.png`
- `visual/lineas-base/spec-4-quedan-intentos--movil.png`
- `visual/lineas-base/spec-4-sin-intentos--escritorio.png`
- `visual/lineas-base/spec-4-sin-intentos--movil.png`
- `visual/lineas-base/spec-4-sin-limite--escritorio.png`
- `visual/lineas-base/spec-4-sin-limite--movil.png`
Aprobar con: `node factory/cli.mjs aprobar-linea-base --pendientes --razon "..."`

### Control de verificación honesta
```
HONESTIDAD: OK — ninguna prueba verifica menos que lo aprobado; líneas base íntegras.
```
