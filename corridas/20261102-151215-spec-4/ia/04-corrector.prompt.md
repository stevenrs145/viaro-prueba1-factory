Sos el CORRECTOR de una fábrica de software sobre Moodle 5.3. La implementación de `salidas/spec-4/` no pasó la validación
(intento 2). Escribís SOLO dentro de `salidas/spec-4/`. Podés leer `entorno/.moodle-src/` y `factory/regresion/`.

# Qué falló (salida real del pipeline)
### escritorio · [CA-1] @requiere-feature con límite 3 y sin intentos, el estudiante ve que le quedan 3
Error: [2mexpect([22m[31mpage[39m[2m).[22mtoHaveScreenshot[2m([22m[32mexpected[39m[2m)[22m failed

  32279 pixels (ratio 0.03 of all image pixels) are different.

  Snapshot: spec-4-quedan-intentos.png

Call log:
[2m  - Expect "toHaveScreenshot(spec-4-quedan-intentos.png)" with timeout 5000ms[22m
[2m    - verifying given screenshot expectation[22m
[2m  - taking page screenshot[22m
[2m    - disabled all CSS animations[22m
[2m  - waiting for fonts to load...[22m
[2m  - fonts loaded[22m
[2m  - 32279 pixels (ratio 0.03 of all image pixels) are different.[22m
[2m  - waiting 100ms before taking screenshot[22m
[2m  - taking page screenshot[22m
[2m    - disabled all CSS animations[22m
[2m  - waiting for fonts to load...[22m
[2m  - fonts loaded[22m
[2m  - captured a stable screenshot[22m
[2m  - 32279 pixels (ratio 0.03 of all image pixels) are different.[22m


## Estado de la página al fallar (ARIA)
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-4/pruebas/intentos-restantes.spec.ts >> [CA-1] @requiere-feature con límite 3 y sin intentos, el estudiante ve que le quedan 3
- Location: salidas/spec-4/pruebas/intentos-restantes.spec.ts:98:1

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  32279 pixels (ratio 0.03 of all image pixels) are different.

  Snapshot: spec-4-quedan-intentos.png

Call log:
  - Expect "toHaveScreenshot(spec-4-quedan-intentos.png)" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 32279 pixels (ratio 0.03 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 32279 pixels (ratio 0.03 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=f22e1]:
  - status
  - generic [ref=f22e2]:
    - link "Salta al contenido principal" [ref=f22e3] [cursor=pointer]:
      - /url: "#maincontent"
    - navigation "Navegación del sitio" [ref=f22e4]:
      - generic [ref=f22e5]:
        - link "Viaro" [ref=f22e6] [cursor=pointer]:
          - /url: http://localhost:8090/my/
        - menubar [ref=f22e9]:
          - menuitem "Área personal" [ref=f22e10] [cursor=pointer]
          - text: 
        - generic [ref=f22e12]:
          - generic [ref=f22e15]:
            - switch "Modo de edición" [ref=f22e16] [cursor=pointer]
            - generic [ref=f22e17] [cursor=pointer]: Modo de edición
          - button "Mostrar la ventana de notificaciones cuando no hay ninguna" [ref=f22e27] [cursor=pointer]:
            - generic [aria-hidden] [ref=f22e28]: 
          - button "Mostrar/ocultar cajón de mensajería" [ref=f22e30] [cursor=pointer]:
            - generic [aria-hidden] [ref=f22e31]: 
          - button "Menú de usuario" [ref=f22e37] [cursor=pointer]:
            - img "Paula Profesora" [ref=f22e41]: PP
            - generic [aria-hidden] [ref=f22e42]: Paula
            - text: 
    - generic [ref=f22e43]:
      - generic [ref=f22e44]:
        - button "Abrir índice del curso" [ref=f22e46] [cursor=pointer]
        - banner [ref=f22e50]:
          - generic [ref=f22e51]:
            - navigation "Camino de migas" [ref=f22e54]:
              - list [ref=f22e55]:
                - listitem [ref=f22e56]:
                  - link "QA101" [ref=f22e57] [cursor=pointer]:
                    - /url: http://localhost:8090/course/view.php?id=2
                - listitem [ref=f22e58]:
                  - text: /
                  - link "General" [ref=f22e59] [cursor=pointer]:
                    - /url: http://localhost:8090/course/section.php?id=1
                - listitem [ref=f22e60]:
                  - text: /
                  - link "Examen de regresión" [ref=f22e61] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/view.php?id=2
                - listitem [ref=f22e62]:
                  - text: /
                  - generic [ref=f22e63]: Excepciones
            - heading "Examen de regresión" [level=1] [ref=f22e72]
        - navigation "Menú de Actividad" [ref=f22e75]:
          - menubar [ref=f22e76]:
            - menuitem "Cuestionario" [ref=f22e77] [cursor=pointer]
            - menuitem "Configuración" [ref=f22e79] [cursor=pointer]
            - menuitem "Preguntas" [ref=f22e81] [cursor=pointer]
            - menuitem "Resultados" [ref=f22e83] [cursor=pointer]
            - menuitem "Banco de preguntas" [ref=f22e85] [cursor=pointer]
            - menuitem "Más " [ref=f22e87] [cursor=pointer]:
              - generic [ref=f22e89]: Más
              - text: 
            - text: 
        - main [ref=f22e94]:
          - generic [ref=f22e96]:
            - navigation [ref=f22e98]:
              - generic [ref=f22e99]:
                - generic [ref=f22e100]: Excepciones
                - combobox "Excepciones" [ref=f22e101] [cursor=pointer]: Excepciones de usuario 
                - text: 
            - button "Agregar excepción de usuario" [ref=f22e105] [cursor=pointer]
          - heading "Excepciones de usuario" [level=2] [ref=f22e106]
          - alert [ref=f22e108]: No se han creado anulaciones de configuración de usuario para este cuestionario.
      - contentinfo:
        - button "Mostrar pie de página" [ref=f22e109] [cursor=pointer]:
          - generic [aria-hidden] [ref=f22e110]: "?"
        - text:  
```

# Test source

```ts
  3   | // como profesor, sin tocar el ajuste general del quiz. reset.php no borra overrides y cada prueba corre en dos proyectos
  4   | // con el mismo estudiante: por eso cada prueba arranca y termina sin override y sin intentos de estudiante11.
  5   | import { test, expect, type Page } from '@playwright/test';
  6   | import {
  7   |   login, abrirQuiz, botonIntento, enviarIntento, esperarJS, prepararCaptura, siguientePagina,
  8   | } from '../../../factory/regresion/helpers';
  9   | 
  10  | const ESTUDIANTE = 'estudiante11';
  11  | const APELLIDO = 'Número 11'; // Identifica su fila en informes y overrides; no coincide con "Número 1".
  12  | 
  13  | let cmid: number;
  14  | 
  15  | /** El mensaje del plugin dentro del recuadro de información. El aviso nativo de intentos agotados va al pie, fuera de .quizinfo. */
  16  | const mensajeIntentos = (page: Page) => page.locator('.quizinfo p', { hasText: /\bte quedan?\s/i });
  17  | 
  18  | /** Cualquier rastro del mensaje en toda la página, dentro o fuera del recuadro. */
  19  | const mensajeEnLaPagina = (page: Page) => page.getByText(/\bte quedan?\s/i);
  20  | 
  21  | /** Como profesor: borra los intentos de estudiante11 en el informe

# Plan vigente
```json
{
  "spec_id": "spec-4",
  "titulo": "Intentos restantes en la página del quiz",
  "naturaleza": "agrega",
  "componente": "quizaccess_attemptsremaining",
  "ruta_moodle": "public/mod/quiz/accessrule/attemptsremaining",
  "capa_justificacion": "Regla de acceso de quiz usada solo por su descripción: no impide ni condiciona nada. Es la capa más específica, porque el mensaje entra en la lista de información que view.php ya muestra al estudiante, junto a 'Intentos permitidos' del core. Verificado: access_manager.php:78-83 instancia toda clase quizaccess_* con make() y descarta las que devuelven null; access_manager.php:103 las descubre por rule.php; access_rule_base.php:174 define description(); access_manager.php:321-326 acumula las descripciones; view.php:214 las pasa a infomessages; renderer.php:910 y renderer.php:1063 las pintan en el recuadro .quizinfo. Precedente directo: accessrule/numattempts/rule.php:29-40, que usa get_num_attempts_allowed() == 0 en make() para no actuar en quizzes sin límite. Eso resuelve CA-4 sin ramas de presentación: sin regla no hay salida. Se descarta un hook de salida (before_footer_html_generation y similares): obligaría a filtrar por pagetype, a recalcular quiz, overrides y capacidades, y a inyectar HTML fuera del recuadro de información. Se descarta local_* con observer: CA-2 no necesita reaccionar a un evento, porque el conteo se calcula en vivo en cada carga. No hace falta persistencia propia: el dato sale de quiz_attempts, así que no hay db/ ni tablas. El proveedor de privacidad es null_provider. Restricciones verificadas: la regla no recibe userid (usar $USER, el usuario actual) y describe_rules también lo usa la API externa (external.php:2133).",
  "bordes": [
    {
      "descripcion": "Intento en curso: el spec habla de 'empezar o retomar', pero no dice si un intento sin enviar cuenta como usado.",
      "decision": "Cuenta como usado, igual que el core: view.php:86-106 suma terminados y no terminados en numattempts, y numattempts/rule.php:42-50 compara contra ese total. Con un intento en curso el mensaje lo aclara: 'Te quedan N intentos además del que está en curso', 'Te queda 1 intento además del que está en curso' o 'No te quedan intentos después del que está en curso'.",
      "criterio": "El número debe coincidir con los intentos nuevos que Moodle realmente va a permitir. La aclaración evita decir 'no te quedan intentos' mientras la página ofrece 'Continuar el último intento'.",
      "preguntaria": "Con un intento abierto, ¿el contador debe descontarlo ya o solo al enviarlo? ¿Sirve la aclaración 'además del que está en curso'?",
      "bloqueante": false
    },
    {
      "descripcion": "Qué estados de intento se cuentan.",
      "decision": "Contar quiz_get_user_attempts(quizid, userid, 'finished', true) más 'unfinished', igual que view.php:86 y :91. No usar 'all': incluiría NOT_STARTED (quiz_attempt.php:57), que el core no cuenta. Finished incluye SUBMITTED y ABANDONED (lib.php:544-547). El resultado se acota con max(0, permitidos - usados).",
      "criterio": "Misma cuenta que la regla nativa. Un intento abandonado consume cupo en el core, así que acá también.",
      "preguntaria": "¿Un intento abandonado por vencimiento debe restar del contador, como ya lo hace Moodle al impedir nuevos intentos?",
      "bloqueante": false
    },
    {
      "descripcion": "Overrides de usuario o de grupo que cambian el límite de intentos.",
      "decision": "Usar el límite efectivo del estudiante con $quizobj->get_num_attempts_allowed(), que ya trae el override aplicado (quiz_settings.php:103-104 y :256). Si el override deja el quiz sin límite, make() devuelve null. Si el límite efectivo es menor que lo usado, muestra el mensaje de 'no te quedan intentos'.",
      "criterio": "El estudiante debe ver su propio límite real. El override no se modifica.",
      "preguntaria": "¿Algún caso en que el mensaje deba ignorar un override?",
      "bloqueante": false
    },
    {
      "descripcion": "Quién ve el mensaje. Lo que ve el profesor está fuera de alcance, pero describe_rules corre para todos los roles (view.php:214).",
      "decision": "make() devuelve null si el usuario no tiene mod/quiz:attempt o si tiene mod/quiz:preview (profesor, administrador). Se usa $quizobj->has_capability (quiz_settings.php:415). Invitados y no matriculados tampoco lo ven.",
      "criterio": "Respeta el 'fuera de alcance': la página del profesor no cambia. Las previsualizaciones no son intentos reales del estudiante.",
      "preguntaria": "¿Confirmamos que el profesor no vea este mensaje ni siquiera en previsualización?",
      "bloqueante": false
    },
    {
      "descripcion": "Mensaje del core cuando se agotan los intentos: Moodle ya muestra nomoreattempts al pie (numattempts/rule.php:44, renderer.php:961).",
      "decision": "Se agrega 'No te quedan intentos.' en .quizinfo y se conserva el mensaje del core. Ambos pueden convivir en pantalla.",
      "criterio": "Cambio aditivo: no se toca el flujo actual ni se quita nada. El mensaje nuevo queda arriba, junto a los datos del quiz, y la prueba de CA-3 lo distingue del nativo.",
      "preguntaria": "¿Molesta ver dos mensajes parecidos? Quitar el nativo implicaría ocultar comportamiento del core y hoy quedaría fuera de alcance.",
      "bloqueante": false
    },
    {
      "descripcion": "Quiz cerrado, todavía no abierto o sin preguntas: quedan intentos, pero no se pueden usar ahora.",
      "decision": "El mensaje informa el saldo igual, sin mirar fechas ni contenido. Los avisos propios de Moodle siguen indicando que el quiz no está disponible.",
      "criterio": "El spec pide saber cuántos quedan, no si se pueden usar hoy. Mezclar disponibilidad agregaría reglas no pedidas.",
      "preguntaria": "¿Hay que ocultar el contador cuando el quiz está cerrado?",
      "bloqueante": false
    },
    {
      "descripcion": "Redacción, singular/plural e idioma.",
      "decision": "Cadenas en lang/en (obligatorio) y lang/es. El plugin puede traer su español: string_manager_standard.php:188 carga lang/<idioma> del plugin. Textos en español: 'Te quedan {$a} intentos.', 'Te queda 1 intento.', 'No te quedan intentos.', más las variantes con intento en curso. El estilo es el de un párrafo más de .quizinfo, sin notificación de color.",
      "criterio": "Coherencia con la UI en español y con el bloque de información existente. Se evita un 'Te quedan 1 intentos'.",
      "preguntaria": "¿Producto tiene un texto preferido o quiere destacar visualmente el caso sin intentos?",
      "bloqueante": false
    },
    {
      "descripcion": "Activación: el spec no pide una opción por quiz.",
      "decision": "Sin ajustes por quiz ni de administrador: aplica a todo quiz con límite. Se desactiva retirando la regla de acceso.",
      "criterio": "Cambio mínimo. Una opción nueva agregaría formulario, tabla y alcance no pedidos.",
      "preguntaria": "¿Debe poder apagarse por curso o por quiz?",
      "bloqueante": false
    },
    {
      "descripcion": "Efecto colateral: mod_quiz_get_quiz_access_information también usa describe_rules (external.php:2133), así que la app móvil recibiría el mensaje entre sus reglas de acceso.",
      "decision": "Se acepta sin código adicional y se declara en el PR.",
      "criterio": "Es el mismo dato para el mismo estudiante, sin cambios en el contrato de la API. Filtrarlo exigiría distinguir el origen de la llamada.",
      "preguntaria": "¿Hay objeción a que la app móvil muestre el mismo dato?",
      "bloqueante": false
    },
    {
      "descripcion": "Datos de prueba: QUIZ-REG es sin límite (seed.php:71, attempts=0), es compartido, y spec-4 solo tiene a estudiante11, que corre en escritorio y móvil.",
      "decision": "CA-1, CA-2 y CA-3 ponen el límite con un override de usuario para estudiante11 sobre QUIZ-REG, desde la UI como profesor (overrides.php, overrideedit.php). No se cambia el ajuste general del quiz. Cada prueba arranca sin intentos de estudiante11 (borrados como profesor en el informe mode=overview) y sin override, y termina dejándolo igual. CA-4 usa QUIZ-REG tal cual.",
      "criterio": "Si la limpieza falla, solo afecta a estudiante11 y no a la regresión de otros specs. El reset entre corridas no alcanza, porque cada prueba corre en dos proyectos con el mismo estudiante. El override llega al mismo campo quiz->attempts que usa un límite general (quiz_settings.php:104 y :256) y además verifica el límite efectivo. Limitación que el PR debe declarar: el límite configurado a nivel de quiz no se prueba por separado.",
      "preguntaria": "¿Hace falta una prueba adicional con límite configurado en el propio quiz?",
      "bloqueante": false
    }
  ],
  "criterios": [
    {
      "id": "CA-1",
      "texto": "En un quiz con límite de intentos, la página del quiz muestra al estudiante cuántos intentos le quedan.",
      "verificacion": "ambas",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "rule.php",
        "version.php",
        "lang/en/quizaccess_attemptsremaining.php",
        "lang/es/quizaccess_attemptsremaining.php",
        "classes/privacy/provider.php"
      ],
      "pruebas": [
        "[CA-1] @requiere-feature Con límite efectivo 3 y sin intentos, estudiante11 ve 'Te quedan 3 intentos.' en .quizinfo. Captura spec-4-quedan-intentos.png.",
        "[CA-1] @requiere-feature Con límite 3 y un intento enviado, estudiante11 ve 'Te quedan 2 intentos.' en .quizinfo. La aserción apunta al mensaje propio, no a 'Intentos permitidos'.",
        "[CA-1] @requiere-feature Con límite 2 y un intento enviado, ve el singular 'Te queda 1 intento.'.",
        "[CA-1] @requiere-feature Con límite 3 y un intento en curso, ve 'Te quedan 2 intentos además del que está en curso' y el botón 'Continuar el último intento'."
      ]
    },
    {
      "id": "CA-2",
      "texto": "El número se actualiza después de enviar un intento.",
      "verificacion": "funcional",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "rule.php"
      ],
      "pruebas": [
        "[CA-2] @requiere-feature Con límite 3, estudiante11 ve 3, inicia un intento, lo envía con enviarIntento(), vuelve a la página del quiz y ve 'Te quedan 2 intentos.'. El mensaje con 3 ya no aparece."
      ]
    },
    {
      "id": "CA-3",
      "texto": "Cuando no le quedan intentos, el mensaje lo indica con claridad.",
      "verificacion": "ambas",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "rule.php",
        "lang/en/quizaccess_attemptsremaining.php",
        "lang/es/quizaccess_attemptsremaining.php"
      ],
      "pruebas": [
        "[CA-3] @requiere-feature Con límite 1 y ese intento enviado, estudiante11 ve exactamente 'No te quedan intentos.' en .quizinfo y no hay botón de intento. Debe fallar sin el plugin aunque exista el mensaje nativo del pie. Captura spec-4-sin-intentos.png.",
        "[CA-3] @requiere-feature Con límite 1 y ese intento en curso, ve 'No te quedan intentos después del que está en curso' y puede continuar el intento."
      ]
    },
    {
      "id": "CA-4",
      "texto": "En un quiz sin límite de intentos, la página queda idéntica a la actual.",
      "verificacion": "ambas",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [
        "rule.php"
      ],
      "pruebas": [
        "[CA-4] En QUIZ-REG sin límite ni override, estudiante11 no ve ningún mensaje de intentos restantes en .quizinfo ni en el resto de la página, y el botón de intento funciona como siempre. Captura spec-4-sin-limite.png.",
        "[CA-4] En un quiz sin límite, tras enviar un intento, sigue sin aparecer ningún mensaje nuevo.",
        "[CA-4] Fuera de alcance: con el override de límite vigente para estudiante11, el profesor abre la página del quiz y no ve el mensaje de intentos restantes."
      ]
    },
    {
      "id": "CA-5",
      "texto": "El cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, más evidencia de que el camino completo funciona.",
      "verificacion": "proceso",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "Evidencia de corrida: funcional.xml en verde en escritorio y móvil, mutación (las pruebas @requiere-feature fallan sin el plugin), regresión, control de alcance, auditor de honestidad y trazabilidad.md. La prueba [CA-2] recorre el camino completo: abrir, intentar, enviar y volver."
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


# Cómo corregir
1. Diagnosticá la CAUSA antes de editar: ¿es el código del plugin o es la prueba? Leé el estado ARIA de la página al fallar.
2. Si el plugin no hace lo que el criterio pide, arreglá el PLUGIN. Nunca "arregles" una prueba para que acepte un comportamiento
   que no cumple el criterio: debilitar, borrar o saltar asserts está prohibido y el control de honestidad lo bloquea.
3. Si la prueba usa un selector o un flujo equivocado (verificá contra el estado ARIA real), corregí la prueba manteniendo
   la misma intensidad de verificación.
4. Mismas reglas de pruebas que en la implementación (títulos `[CA-n]`, `@requiere-feature`, `@camino-error`, sin mocks de red,
   sin skip/only/soft, helpers de `factory/regresion/helpers.ts`).
5. Nunca reimplementes `login()` ni `prepararCaptura()`, ni los envuelvas con reintentos o esperas propias, y no uses `'networkidle'`.
   Si ya existe una copia en `salidas/spec-4/pruebas/`, bórrala y usá el helper. Si un helper es la causa, decilo en tu respuesta:
   lo arregla la fábrica, no la prueba.
6. Cada `test(...)` necesita al menos un `expect(` en su propio cuerpo: el auditor no cuenta los de funciones auxiliares.

Respondé con: causa raíz encontrada, qué cambiaste y por qué.
