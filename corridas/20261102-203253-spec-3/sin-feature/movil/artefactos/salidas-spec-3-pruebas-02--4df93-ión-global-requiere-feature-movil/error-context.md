# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-3/pruebas/02-retro-eliminada.spec.ts >> [CA-3] los ajustes del administrador ya no ofrecen la retroalimentación global @requiere-feature
- Location: salidas/spec-3/pruebas/02-retro-eliminada.spec.ts:73:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('#id_s_quiz_initialnumfeedbacks')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" locator('#id_s_quiz_initialnumfeedbacks') with timeout 5000ms
  - waiting for locator('#id_s_quiz_initialnumfeedbacks')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [active] [ref=f2e1]:
  - status
  - generic [ref=f2e2]:
    - link "Salta al contenido principal" [ref=f2e3] [cursor=pointer]:
      - /url: "#maincontent"
    - navigation "Navegación del sitio" [ref=f2e4]:
      - generic [ref=f2e5]:
        - button "Panel lateral" [ref=f2e6] [cursor=pointer]
        - text: 
        - generic [ref=f2e9]:
          - generic [ref=f2e12]:
            - switch "Modo de edición" [ref=f2e13] [cursor=pointer]
            - generic [ref=f2e14] [cursor=pointer]: Modo de edición
          - button "Mostrar la ventana de notificaciones cuando no hay ninguna" [ref=f2e24] [cursor=pointer]:
            - generic [aria-hidden] [ref=f2e25]: 
          - button "Mostrar/ocultar cajón de mensajería" [ref=f2e27] [cursor=pointer]:
            - generic [aria-hidden] [ref=f2e28]: 
          - button "Menú de usuario" [ref=f2e34] [cursor=pointer]:
            - img "Admin User" [ref=f2e38]: AU
            - text: 
    - generic [ref=f2e39]:
      - generic [ref=f2e40]:
        - button "Abrir cajón de bloques" [ref=f2e42] [cursor=pointer]
        - banner [ref=f2e46]:
          - generic [ref=f2e47]:
            - navigation "Camino de migas" [ref=f2e50]:
              - list [ref=f2e51]:
                - listitem [ref=f2e52]:
                  - link "Módulos de Actividad" [ref=f2e53] [cursor=pointer]:
                    - /url: http://localhost:8090/admin/category.php?category=modsettings
                - listitem [ref=f2e54]:
                  - text: /
                  - link "Cuestionario" [ref=f2e55] [cursor=pointer]:
                    - /url: http://localhost:8090/admin/category.php?category=modsettingsquizcat
                - listitem [ref=f2e56]:
                  - text: /
                  - generic [ref=f2e57]: Ajustes generales
            - generic [ref=f2e58]:
              - heading "Viaro Exámenes" [level=1] [ref=f2e63]
              - generic [ref=f2e68]:
                - textbox "Buscar" [ref=f2e69]
                - generic: Buscar
                - button "Buscar" [ref=f2e71] [cursor=pointer]:
                  - generic [aria-hidden] [ref=f2e72]: 
        - navigation "Site administration menu" [ref=f2e76]:
          - menubar [ref=f2e77]:
            - menuitem "General" [ref=f2e78] [cursor=pointer]
            - menuitem "Usuarios" [ref=f2e80] [cursor=pointer]
            - menuitem "Cursos" [ref=f2e82] [cursor=pointer]
            - menuitem "Más " [ref=f2e84] [cursor=pointer]:
              - generic [ref=f2e86]: Más
              - text: 
            - text: 
        - main [ref=f2e90]:
          - generic [ref=f2e93]:
            - heading "Ajustes generales" [level=2] [ref=f2e94]
            - group [ref=f2e95]:
              - paragraph [ref=f2e98]: Estos ajustes controlan el comportamiento de las actividades tipo cuestionario para todo el sitio.
              - generic [ref=f2e99]:
                - generic [ref=f2e100]:
                  - generic [ref=f2e101]: Retraso antes de enviar notificaciones de intento calificado
                  - generic [ref=f2e102]: quiz | notifyattemptgradeddelay
                - generic [ref=f2e103]:
                  - generic [ref=f2e105]:
                    - textbox "Retraso antes de enviar notificaciones de intento calificado" [ref=f2e106]: "5"
                    - generic [ref=f2e107]: unidades de duración
                    - combobox "unidades de duración" [ref=f2e108]:
                      - option "semanas"
                      - option "días"
                      - option "horas" [selected]
                      - option "minutos"
                      - option "segundos"
                  - generic [ref=f2e109]: "Valor por defecto: 5 horas"
                  - paragraph [ref=f2e111]: Se aplica un retraso antes de enviar un correo electrónico al estudiante para dar tiempo al profesor para editar la calificación.
              - generic [ref=f2e112]:
                - generic [ref=f2e113]:
                  - generic [ref=f2e114]: Periodo de creación previa
                  - generic [ref=f2e115]: quiz | precreateperiod
                - generic [ref=f2e116]:
                  - combobox "Periodo de creación previa" [ref=f2e118]:
                    - option "No crear intentos previamente" [selected]
                    - option "1 horas"
                    - option "2 horas"
                    - option "3 horas"
                    - option "4 horas"
                    - option "5 horas"
                    - option "6 horas"
                    - option "7 horas"
                    - option "8 horas"
                    - option "9 horas"
                    - option "10 horas"
                    - option "11 horas"
                    - option "12 horas"
                    - option "13 horas"
                    - option "14 horas"
                    - option "15 horas"
                    - option "16 horas"
                    - option "17 horas"
                    - option "18 horas"
                    - option "19 horas"
                    - option "20 horas"
                    - option "21 horas"
                    - option "22 horas"
                    - option "23 horas"
                    - option "24 horas"
                  - generic [ref=f2e119]: "Valor por defecto: No crear intentos previamente"
                  - paragraph [ref=f2e121]: Si su sitio tiene cuestionarios con fecha de apertura y muchos estudiantes empiezan a la vez, puede mejorar el rendimiento creando intentos previamente. Seleccione un periodo de tiempo previo al momento de apertura del cuestionario para crear intentos previamente. Se recomienda que sea corto, ya que las preguntas del cuestionario no podrán modificarse una vez que el cuestionario tenga intentos. Los intentos se generan mediante una tarea programada que se ejecuta cada hora por defecto. Para que los intentos previos se generen cuando el sistema tenga menos carga, como durante la noche, configure un periodo de 12 horas, y ajuste la tarea programada para que se ejecute durante horas de menos carga.
              - generic [ref=f2e122]:
                - generic [ref=f2e123]:
                  - generic [ref=f2e124]: Ultimo periodo de gracia para el envío
                  - generic [ref=f2e125]: quiz | graceperiodmin
                - generic [ref=f2e126]:
                  - generic [ref=f2e128]:
                    - textbox "Ultimo periodo de gracia para el envío" [ref=f2e129]: "1"
                    - generic [ref=f2e130]: unidades de duración
                    - combobox "unidades de duración" [ref=f2e131]:
                      - option "semanas"
                      - option "días"
                      - option "horas"
                      - option "minutos" [selected]
                      - option "segundos"
                  - generic [ref=f2e132]: "Valor por defecto: 1 minutos"
                  - paragraph [ref=f2e134]: Existe un problema potencial al final de la realización de los cuestionarios. Por un lado, queremos permitir a los estudiantes que trabajen hasta el último segundo de la prueba (con la ayuda del temporizador que envía automáticamente el cuestionario cuando finaliza el tiempo). Por otra parte, el servidor puede estar sobrecargado y entonces tardar algún tiempo para procesar las respuestas. Por lo tanto, aceptaremos las respuestas enviadas este número de segundos después de que el tiempo haya expirado, por lo que no se producirán sanciones por causa de un servidor lento. Sin embargo, el estudiante puede engañarnos y utilizar estos segundos extras para seguir contestando el cuestionario. Usted debe establecer el valor de esta compensación en función del nivel de confianza que tenga en el rendimiento del servidor durante la realización de los cuestionarios.
              - generic [ref=f2e135]:
                - generic [ref=f2e136]:
                  - generic [ref=f2e137]: Número inicial de campos de retroalimentación global
                  - generic [ref=f2e138]: quiz | initialnumfeedbacks
                - generic [ref=f2e139]:
                  - textbox "Número inicial de campos de retroalimentación global" [ref=f2e141]: "2"
                  - generic [ref=f2e142]: "Valor por defecto: 2"
                  - paragraph [ref=f2e144]: Al crear un nuevo cuestionario, proporcione este número de cajas de retroalimentación global vacías. Una vez que el cuestionario haya sido creado, el formulario muestra el número de campos requeridos para el número de retroalimentaciones en el examen. La configuración debe de ser al menos de 1.
              - generic [ref=f2e145]:
                - generic [ref=f2e146]:
                  - generic [ref=f2e147]: Retardo de guardado automático
                  - generic [ref=f2e148]: quiz | autosaveperiod
                - generic [ref=f2e149]:
                  - generic [ref=f2e151]:
                    - textbox "Retardo de guardado automático" [ref=f2e152]: "1"
                    - generic [ref=f2e153]: unidades de duración
                    - combobox "unidades de duración" [ref=f2e154]:
                      - option "semanas"
                      - option "días"
                      - option "horas"
                      - option "minutos" [selected]
                      - option "segundos"
                  - generic [ref=f2e155]: "Valor por defecto: 1 minutos"
                  - paragraph [ref=f2e157]: "Las respuestas de los estudiantes se pueden guardar automáticamente durante los intentos del cuestionario. Las respuestas se guardan cada vez que se cambie una, y entonces tras este lapso. Hay una contraprestación: un lapso menor aumenta la carga del servidor, pero reduce la probabilidad de que los estudiantes pierdan su trabajo. Si usted va a hacer este lapso mucho más breve, debería cambiarlo gradualmente y monitorizar la carga del servidor. Si la carga es demasiado alta, amplíe el lapso de nuevo. Ajustar el lapso a 0 desactiva el guardado automático."
              - heading "Ajustes de cuestionarios por defecto" [level=3] [ref=f2e158]
              - paragraph [ref=f2e160]: Los valores que especifique aquí definen los valores por defecto usados en el formulario de especificaciones cuando usted crea un nuevo cuestionario. Puede asimismo configurar qué ajustes de cuestionario se consideran avanzados.
              - generic [ref=f2e161]:
                - generic [ref=f2e162]:
                  - generic [ref=f2e163]: Límite de tiempo
                  - generic [ref=f2e164]: quiz | timelimit
                - generic [ref=f2e165]:
                  - generic [ref=f2e167]:
                    - textbox "Límite de tiempo" [ref=f2e168]: "0"
                    - generic [ref=f2e169]: unidades de duración
                    - combobox "unidades de duración" [ref=f2e170]:
                      - option "semanas"
                      - option "días"
                      - option "horas"
                      - option "minutos" [selected]
                      - option "segundos"
                  - generic [ref=f2e171]:
                    - checkbox "Avanzada" [ref=f2e172]
                    - generic [ref=f2e173]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e174]
                    - generic [ref=f2e175]: Bloqueado
                  - generic [ref=f2e176]: "Valor por defecto: Ninguno"
                  - paragraph [ref=f2e178]: Tiempo límite (en segundos) predeterminado para resolver los cuestionarios. '0' significa que no hay límite de tiempo.
              - generic [ref=f2e179]:
                - generic [ref=f2e180]:
                  - generic [ref=f2e181]: Cuando el tiempo ha terminado
                  - generic [ref=f2e182]: quiz | overduehandling
                - generic [ref=f2e183]:
                  - combobox "Cuando el tiempo ha terminado" [ref=f2e185]:
                    - option "El envío se realiza automáticamente" [selected]
                    - option "Hay un periodo de gracia para enviar el cuestionario, pero no para responder a más preguntas"
                    - option "El envío debe hacerse antes de que el tiempo termine, de lo contrario, no se contabilizará"
                  - generic [ref=f2e186]:
                    - checkbox "Avanzada" [ref=f2e187]
                    - generic [ref=f2e188]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e189]
                    - generic [ref=f2e190]: Bloqueado
                  - generic [ref=f2e191]: "Valor por defecto: El envío se realiza automáticamente"
                  - paragraph [ref=f2e193]: ¿Qué debe suceder por defecto si un estudiante no envía el cuestionario antes de que expire el plazo de entrega.?
              - generic [ref=f2e194]:
                - generic [ref=f2e195]:
                  - generic [ref=f2e196]: Periodo de gracia para el envío
                  - generic [ref=f2e197]: quiz | graceperiod
                - generic [ref=f2e198]:
                  - generic [ref=f2e200]:
                    - textbox "Periodo de gracia para el envío" [ref=f2e201]: "1"
                    - generic [ref=f2e202]: unidades de duración
                    - combobox "unidades de duración" [ref=f2e203]:
                      - option "semanas"
                      - option "días" [selected]
                      - option "horas"
                      - option "minutos"
                      - option "segundos"
                  - generic [ref=f2e204]:
                    - checkbox "Avanzada" [ref=f2e205]
                    - generic [ref=f2e206]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e207]
                    - generic [ref=f2e208]: Bloqueado
                  - generic [ref=f2e209]: "Valor por defecto: 1 días"
                  - paragraph [ref=f2e211]: Si se configura que cuando se agote el tiempo a "Hay un período de gracia para enviar el intento, pero no pueden cambiarse las respuestas", esta es la cantidad por defecto de tiempo extra que se permite, en segundos. 300 = 5 minutos; 86400 = 24 horas.
              - generic [ref=f2e212]:
                - generic [ref=f2e213]:
                  - generic [ref=f2e214]: Crear intentos previamente
                  - generic [ref=f2e215]: quiz | precreateattempts
                - generic [ref=f2e216]:
                  - checkbox "Crear intentos previamente" [ref=f2e218]
                  - generic [ref=f2e219]:
                    - checkbox "Avanzada" [checked] [ref=f2e220]
                    - generic [ref=f2e221]: Avanzada
                    - checkbox "Bloqueado" [checked] [ref=f2e222]
                    - generic [ref=f2e223]: Bloqueado
                  - generic [ref=f2e224]: "Valor por defecto: No, Avanzada, Bloqueado"
                  - paragraph [ref=f2e226]: Crear intentos previamente ayuda a optimizar el rendimiento del sitio. Las preguntas no se podrán modificar una vez que el cuestionario tenga intentos.
              - generic [ref=f2e227]:
                - generic [ref=f2e228]:
                  - generic [ref=f2e229]: Intentos permitidos
                  - generic [ref=f2e230]: quiz | attempts
                - generic [ref=f2e231]:
                  - combobox "Intentos permitidos" [ref=f2e233]:
                    - option "Sin límite" [selected]
                    - option "1"
                    - option "2"
                    - option "3"
                    - option "4"
                    - option "5"
                    - option "6"
                    - option "7"
                    - option "8"
                    - option "9"
                    - option "10"
                  - generic [ref=f2e234]:
                    - checkbox "Avanzada" [ref=f2e235]
                    - generic [ref=f2e236]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e237]
                    - generic [ref=f2e238]: Bloqueado
                  - generic [ref=f2e239]: "Valor por defecto: Sin límite"
                  - paragraph [ref=f2e241]: Restricción del número de intentos que los estudiantes tienen para resolver el cuestionario.
              - generic [ref=f2e242]:
                - generic [ref=f2e243]:
                  - generic [ref=f2e244]: Método de calificación
                  - generic [ref=f2e245]: quiz | grademethod
                - generic [ref=f2e246]:
                  - combobox "Método de calificación" [ref=f2e248]:
                    - option "Calificación más alta" [selected]
                    - option "Promedio de calificaciones"
                    - option "Primer intento"
                    - option "Último intento"
                  - generic [ref=f2e249]:
                    - checkbox "Avanzada" [ref=f2e250]
                    - generic [ref=f2e251]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e252]
                    - generic [ref=f2e253]: Bloqueado
                  - generic [ref=f2e254]: "Valor por defecto: Calificación más alta"
                  - paragraph [ref=f2e256]: Método que se usará para calcular la calificación final del estudiante en el cuestionario cuando se permiten múltiples intentos.
              - generic [ref=f2e257]:
                - generic [ref=f2e258]:
                  - generic [ref=f2e259]: Calificación máxima
                  - generic [ref=f2e260]: quiz | maximumgrade
                - generic [ref=f2e261]:
                  - textbox "Calificación máxima" [ref=f2e263]: "10"
                  - generic [ref=f2e264]:
                    - checkbox "Bloqueado" [ref=f2e265]
                    - generic [ref=f2e266]: Bloqueado
                  - generic [ref=f2e267]: "Valor por defecto: 10"
                  - paragraph [ref=f2e269]: Valor por defecto a la que se ajustará la calificación del cuestionario.
              - generic [ref=f2e270]:
                - generic [ref=f2e271]:
                  - generic [ref=f2e272]: Comenzar automáticamente una nueva página
                  - generic [ref=f2e273]: quiz | questionsperpage
                - generic [ref=f2e274]:
                  - combobox "Comenzar automáticamente una nueva página" [ref=f2e276]:
                    - option "Nunca"
                    - option "Después de agregar cada pregunta" [selected]
                    - option "Después de agregar 2 preguntas"
                    - option "Después de agregar 3 preguntas"
                    - option "Después de agregar 4 preguntas"
                    - option "Después de agregar 5 preguntas"
                    - option "Después de agregar 6 preguntas"
                    - option "Después de agregar 7 preguntas"
                    - option "Después de agregar 8 preguntas"
                    - option "Después de agregar 9 preguntas"
                    - option "Después de agregar 10 preguntas"
                    - option "Después de agregar 11 preguntas"
                    - option "Después de agregar 12 preguntas"
                    - option "Después de agregar 13 preguntas"
                    - option "Después de agregar 14 preguntas"
                    - option "Después de agregar 15 preguntas"
                    - option "Después de agregar 16 preguntas"
                    - option "Después de agregar 17 preguntas"
                    - option "Después de agregar 18 preguntas"
                    - option "Después de agregar 19 preguntas"
                    - option "Después de agregar 20 preguntas"
                    - option "Después de agregar 21 preguntas"
                    - option "Después de agregar 22 preguntas"
                    - option "Después de agregar 23 preguntas"
                    - option "Después de agregar 24 preguntas"
                    - option "Después de agregar 25 preguntas"
                    - option "Después de agregar 26 preguntas"
                    - option "Después de agregar 27 preguntas"
                    - option "Después de agregar 28 preguntas"
                    - option "Después de agregar 29 preguntas"
                    - option "Después de agregar 30 preguntas"
                    - option "Después de agregar 31 preguntas"
                    - option "Después de agregar 32 preguntas"
                    - option "Después de agregar 33 preguntas"
                    - option "Después de agregar 34 preguntas"
                    - option "Después de agregar 35 preguntas"
                    - option "Después de agregar 36 preguntas"
                    - option "Después de agregar 37 preguntas"
                    - option "Después de agregar 38 preguntas"
                    - option "Después de agregar 39 preguntas"
                    - option "Después de agregar 40 preguntas"
                    - option "Después de agregar 41 preguntas"
                    - option "Después de agregar 42 preguntas"
                    - option "Después de agregar 43 preguntas"
                    - option "Después de agregar 44 preguntas"
                    - option "Después de agregar 45 preguntas"
                    - option "Después de agregar 46 preguntas"
                    - option "Después de agregar 47 preguntas"
                    - option "Después de agregar 48 preguntas"
                    - option "Después de agregar 49 preguntas"
                    - option "Después de agregar 50 preguntas"
                  - generic [ref=f2e277]:
                    - checkbox "Avanzada" [ref=f2e278]
                    - generic [ref=f2e279]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e280]
                    - generic [ref=f2e281]: Bloqueado
                  - generic [ref=f2e282]: "Valor por defecto: Después de agregar cada pregunta"
                  - paragraph [ref=f2e284]: Cuando se agregan preguntas al cuestionario, los saltos de página se insertarán automáticamente de acuerdo con el valor que elija aquí.
              - generic [ref=f2e285]:
                - generic [ref=f2e286]:
                  - generic [ref=f2e287]: Método de navegación
                  - generic [ref=f2e288]: quiz | navmethod
                - generic [ref=f2e289]:
                  - combobox "Método de navegación" [ref=f2e291]:
                    - option "Libre" [selected]
                    - option "Secuencial"
                  - generic [ref=f2e292]:
                    - checkbox "Avanzada" [checked] [ref=f2e293]
                    - generic [ref=f2e294]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e295]
                    - generic [ref=f2e296]: Bloqueado
                  - generic [ref=f2e297]: "Valor por defecto: Libre, Avanzada"
                  - paragraph [ref=f2e299]: En navegación libre, las preguntas pueden ser contestadas en cualquier orden utilizando la navegación. En navegación secuencial, las preguntas deben ser contestadas en la secuencia establecida.
              - generic [ref=f2e300]:
                - generic [ref=f2e301]:
                  - generic [ref=f2e302]: Ordenar al azar las respuestas
                  - generic [ref=f2e303]: quiz | shuffleanswers
                - generic [ref=f2e304]:
                  - checkbox "Ordenar al azar las respuestas" [checked] [ref=f2e306]
                  - generic [ref=f2e307]:
                    - checkbox "Avanzada" [ref=f2e308]
                    - generic [ref=f2e309]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e310]
                    - generic [ref=f2e311]: Bloqueado
                  - generic [ref=f2e312]: "Valor por defecto: Sí"
                  - paragraph [ref=f2e314]: Si habilita esta opción, las respuestas se ordenarán al azar cada vez que un estudiante intente resolver este cuestionario, en el supuesto de que la opción esté también habilitada en los ajustes de la pregunta.
              - generic [ref=f2e315]:
                - generic [ref=f2e316]:
                  - generic [ref=f2e317]: Comportamiento de las preguntas
                  - generic [ref=f2e318]: quiz | preferredbehaviour
                - generic [ref=f2e319]:
                  - combobox "Comportamiento de las preguntas" [ref=f2e321]:
                    - option "Interactiva con varios intentos"
                    - option "Modo adaptativo"
                    - option "Modo adaptativo (sin penalización)"
                    - option "Retroalimentación diferida" [selected]
                    - option "Retroalimentación diferida con CBM"
                    - option "Retroalimentación inmediata"
                    - option "Retroalimentación inmediata con CBM"
                  - generic [ref=f2e322]:
                    - checkbox "Bloqueado" [ref=f2e323]
                    - generic [ref=f2e324]: Bloqueado
                  - generic [ref=f2e325]: "Valor por defecto: Retroalimentación diferida"
                  - paragraph [ref=f2e327]: Configuración predeterminada del comportamiento de las preguntas en un cuestionario.
              - generic [ref=f2e328]:
                - generic [ref=f2e329]:
                  - generic [ref=f2e330]: Habilitar la opción de rehacer en un intento
                  - generic [ref=f2e331]: quiz | canredoquestions
                - generic [ref=f2e332]:
                  - combobox "Habilitar la opción de rehacer en un intento" [ref=f2e334]:
                    - option "No" [selected]
                    - option "Sí, proporcionar la opción de intentar otra pregunta"
                  - generic [ref=f2e335]:
                    - checkbox "Avanzada" [checked] [ref=f2e336]
                    - generic [ref=f2e337]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e338]
                    - generic [ref=f2e339]: Bloqueado
                  - generic [ref=f2e340]: "Valor por defecto: No, Avanzada"
                  - generic [ref=f2e341]:
                    - paragraph [ref=f2e342]: Si esta opción está habilitada, cuando los estudiantes hayan terminado de realizar un intento en una pregunta concreta, verán un botón de interrogación denominado "Probar otra pregunta similar". Este botón les permitirá realizar un intento con una versión similar de la misma pregunta (seleccionada aleatoriamente), o la misma pregunta otra vez, sin tener que enviar el intento del cuestionario completo e iniciar uno nuevo. Esta opción resulta útil principalmente para los cuestionarios de práctica.
                    - paragraph [ref=f2e343]: Esta configuración solo afecta a las preguntas (p. ej., las preguntas que no sean ensayos) y las actuaciones (por ejemplo, los comentarios inmediatos o los interactivos con múltiples intentos) en las que el estudiante puede finalizar la pregunta antes de que se envíe el intento.
              - generic [ref=f2e344]:
                - generic [ref=f2e345]:
                  - generic [ref=f2e346]: Cada intento se basa en el anterior
                  - generic [ref=f2e347]: quiz | attemptonlast
                - generic [ref=f2e348]:
                  - checkbox "Cada intento se basa en el anterior" [ref=f2e350]
                  - generic [ref=f2e351]:
                    - checkbox "Avanzada" [checked] [ref=f2e352]
                    - generic [ref=f2e353]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e354]
                    - generic [ref=f2e355]: Bloqueado
                  - generic [ref=f2e356]: "Valor por defecto: No, Avanzada"
                  - paragraph [ref=f2e358]: Si se permiten múltiples intentos, cada nuevo intento contendrá los resultados del intento previo.
              - heading "Opciones de revisión" [level=3] [ref=f2e359]
              - generic [ref=f2e360]:
                - generic [ref=f2e361]:
                  - generic [ref=f2e362]: El intento
                  - generic [ref=f2e363]: quiz | reviewattempt
                - generic [ref=f2e364]:
                  - generic [ref=f2e365]:
                    - generic [ref=f2e366]:
                      - checkbox "Durante el intento" [checked] [disabled] [ref=f2e367]
                      - generic [ref=f2e368]: Durante el intento
                    - generic [ref=f2e369]:
                      - checkbox "Inmediatamente después de cada intento" [checked] [ref=f2e370]
                      - generic [ref=f2e371]: Inmediatamente después de cada intento
                    - generic [ref=f2e372]:
                      - checkbox "Más tarde, mientras el cuestionario está aún abierto" [checked] [ref=f2e373]
                      - generic [ref=f2e374]: Más tarde, mientras el cuestionario está aún abierto
                    - generic [ref=f2e375]:
                      - checkbox "Después de cerrar el cuestionario" [checked] [ref=f2e376]
                      - generic [ref=f2e377]: Después de cerrar el cuestionario
                  - generic [ref=f2e378]: "Valor por defecto: Todo activado"
              - generic [ref=f2e379]:
                - generic [ref=f2e380]:
                  - generic [ref=f2e381]: Si fue correcta
                  - generic [ref=f2e382]: quiz | reviewcorrectness
                - generic [ref=f2e383]:
                  - generic [ref=f2e384]:
                    - generic [ref=f2e385]:
                      - checkbox "Durante el intento" [checked] [ref=f2e386]
                      - generic [ref=f2e387]: Durante el intento
                    - generic [ref=f2e388]:
                      - checkbox "Inmediatamente después de cada intento" [checked] [ref=f2e389]
                      - generic [ref=f2e390]: Inmediatamente después de cada intento
                    - generic [ref=f2e391]:
                      - checkbox "Más tarde, mientras el cuestionario está aún abierto" [checked] [ref=f2e392]
                      - generic [ref=f2e393]: Más tarde, mientras el cuestionario está aún abierto
                    - generic [ref=f2e394]:
                      - checkbox "Después de cerrar el cuestionario" [checked] [ref=f2e395]
                      - generic [ref=f2e396]: Después de cerrar el cuestionario
                  - generic [ref=f2e397]: "Valor por defecto: Todo activado"
              - generic [ref=f2e398]:
                - generic [ref=f2e399]:
                  - generic [ref=f2e400]: Puntuación máxima
                  - generic [ref=f2e401]: quiz | reviewmaxmarks
                - generic [ref=f2e402]:
                  - generic [ref=f2e403]:
                    - generic [ref=f2e404]:
                      - checkbox "Durante el intento" [checked] [ref=f2e405]
                      - generic [ref=f2e406]: Durante el intento
                    - generic [ref=f2e407]:
                      - checkbox "Inmediatamente después de cada intento" [checked] [ref=f2e408]
                      - generic [ref=f2e409]: Inmediatamente después de cada intento
                    - generic [ref=f2e410]:
                      - checkbox "Más tarde, mientras el cuestionario está aún abierto" [checked] [ref=f2e411]
                      - generic [ref=f2e412]: Más tarde, mientras el cuestionario está aún abierto
                    - generic [ref=f2e413]:
                      - checkbox "Después de cerrar el cuestionario" [checked] [ref=f2e414]
                      - generic [ref=f2e415]: Después de cerrar el cuestionario
                  - generic [ref=f2e416]: "Valor por defecto: Todo activado"
              - generic [ref=f2e417]:
                - generic [ref=f2e418]:
                  - generic [ref=f2e419]: Puntos
                  - generic [ref=f2e420]: quiz | reviewmarks
                - generic [ref=f2e421]:
                  - generic [ref=f2e422]:
                    - generic [ref=f2e423]:
                      - checkbox "Durante el intento" [checked] [ref=f2e424]
                      - generic [ref=f2e425]: Durante el intento
                    - generic [ref=f2e426]:
                      - checkbox "Inmediatamente después de cada intento" [checked] [ref=f2e427]
                      - generic [ref=f2e428]: Inmediatamente después de cada intento
                    - generic [ref=f2e429]:
                      - checkbox "Más tarde, mientras el cuestionario está aún abierto" [checked] [ref=f2e430]
                      - generic [ref=f2e431]: Más tarde, mientras el cuestionario está aún abierto
                    - generic [ref=f2e432]:
                      - checkbox "Después de cerrar el cuestionario" [checked] [ref=f2e433]
                      - generic [ref=f2e434]: Después de cerrar el cuestionario
                  - generic [ref=f2e435]: "Valor por defecto: Todo activado"
              - generic [ref=f2e436]:
                - generic [ref=f2e437]:
                  - generic [ref=f2e438]: Retroalimentación específica
                  - generic [ref=f2e439]: quiz | reviewspecificfeedback
                - generic [ref=f2e440]:
                  - generic [ref=f2e441]:
                    - generic [ref=f2e442]:
                      - checkbox "Durante el intento" [checked] [ref=f2e443]
                      - generic [ref=f2e444]: Durante el intento
                    - generic [ref=f2e445]:
                      - checkbox "Inmediatamente después de cada intento" [checked] [ref=f2e446]
                      - generic [ref=f2e447]: Inmediatamente después de cada intento
                    - generic [ref=f2e448]:
                      - checkbox "Más tarde, mientras el cuestionario está aún abierto" [checked] [ref=f2e449]
                      - generic [ref=f2e450]: Más tarde, mientras el cuestionario está aún abierto
                    - generic [ref=f2e451]:
                      - checkbox "Después de cerrar el cuestionario" [checked] [ref=f2e452]
                      - generic [ref=f2e453]: Después de cerrar el cuestionario
                  - generic [ref=f2e454]: "Valor por defecto: Todo activado"
              - generic [ref=f2e455]:
                - generic [ref=f2e456]:
                  - generic [ref=f2e457]: Retroalimentación general
                  - generic [ref=f2e458]: quiz | reviewgeneralfeedback
                - generic [ref=f2e459]:
                  - generic [ref=f2e460]:
                    - generic [ref=f2e461]:
                      - checkbox "Durante el intento" [checked] [ref=f2e462]
                      - generic [ref=f2e463]: Durante el intento
                    - generic [ref=f2e464]:
                      - checkbox "Inmediatamente después de cada intento" [checked] [ref=f2e465]
                      - generic [ref=f2e466]: Inmediatamente después de cada intento
                    - generic [ref=f2e467]:
                      - checkbox "Más tarde, mientras el cuestionario está aún abierto" [checked] [ref=f2e468]
                      - generic [ref=f2e469]: Más tarde, mientras el cuestionario está aún abierto
                    - generic [ref=f2e470]:
                      - checkbox "Después de cerrar el cuestionario" [checked] [ref=f2e471]
                      - generic [ref=f2e472]: Después de cerrar el cuestionario
                  - generic [ref=f2e473]: "Valor por defecto: Todo activado"
              - generic [ref=f2e474]:
                - generic [ref=f2e475]:
                  - generic [ref=f2e476]: Respuesta correcta
                  - generic [ref=f2e477]: quiz | reviewrightanswer
                - generic [ref=f2e478]:
                  - generic [ref=f2e479]:
                    - generic [ref=f2e480]:
                      - checkbox "Durante el intento" [checked] [ref=f2e481]
                      - generic [ref=f2e482]: Durante el intento
                    - generic [ref=f2e483]:
                      - checkbox "Inmediatamente después de cada intento" [checked] [ref=f2e484]
                      - generic [ref=f2e485]: Inmediatamente después de cada intento
                    - generic [ref=f2e486]:
                      - checkbox "Más tarde, mientras el cuestionario está aún abierto" [checked] [ref=f2e487]
                      - generic [ref=f2e488]: Más tarde, mientras el cuestionario está aún abierto
                    - generic [ref=f2e489]:
                      - checkbox "Después de cerrar el cuestionario" [checked] [ref=f2e490]
                      - generic [ref=f2e491]: Después de cerrar el cuestionario
                  - generic [ref=f2e492]: "Valor por defecto: Todo activado"
              - generic [ref=f2e493]:
                - generic [ref=f2e494]:
                  - generic [ref=f2e495]: Retroalimentación global
                  - generic [ref=f2e496]: quiz | reviewoverallfeedback
                - generic [ref=f2e497]:
                  - generic [ref=f2e498]:
                    - generic [ref=f2e499]:
                      - checkbox "Durante el intento" [disabled] [ref=f2e500]
                      - generic [ref=f2e501]: Durante el intento
                    - generic [ref=f2e502]:
                      - checkbox "Inmediatamente después de cada intento" [checked] [ref=f2e503]
                      - generic [ref=f2e504]: Inmediatamente después de cada intento
                    - generic [ref=f2e505]:
                      - checkbox "Más tarde, mientras el cuestionario está aún abierto" [checked] [ref=f2e506]
                      - generic [ref=f2e507]: Más tarde, mientras el cuestionario está aún abierto
                    - generic [ref=f2e508]:
                      - checkbox "Después de cerrar el cuestionario" [checked] [ref=f2e509]
                      - generic [ref=f2e510]: Después de cerrar el cuestionario
                  - generic [ref=f2e511]: "Valor por defecto: Todo activado"
              - generic [ref=f2e512]:
                - generic [ref=f2e513]:
                  - generic [ref=f2e514]: Mostrar la imagen del usuario
                  - generic [ref=f2e515]: quiz | showuserpicture
                - generic [ref=f2e516]:
                  - combobox "Mostrar la imagen del usuario" [ref=f2e518]:
                    - option "sin imagen" [selected]
                    - option "Imagen pequeña"
                    - option "Imagen grande"
                  - generic [ref=f2e519]:
                    - checkbox "Avanzada" [ref=f2e520]
                    - generic [ref=f2e521]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e522]
                    - generic [ref=f2e523]: Bloqueado
                  - generic [ref=f2e524]: "Valor por defecto: sin imagen"
                  - paragraph [ref=f2e526]: Mostrar en pantalla la imagen del usuario durante los intentos.
              - generic [ref=f2e527]:
                - generic [ref=f2e528]:
                  - generic [ref=f2e529]: Decimales en las calificaciones
                  - generic [ref=f2e530]: quiz | decimalpoints
                - generic [ref=f2e531]:
                  - combobox "Decimales en las calificaciones" [ref=f2e533]:
                    - option "0"
                    - option "1"
                    - option "2" [selected]
                    - option "3"
                    - option "4"
                    - option "5"
                  - generic [ref=f2e534]:
                    - checkbox "Avanzada" [ref=f2e535]
                    - generic [ref=f2e536]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e537]
                    - generic [ref=f2e538]: Bloqueado
                  - generic [ref=f2e539]: "Valor por defecto: 2"
                  - paragraph [ref=f2e541]: Número de dígitos a mostrar después del punto decimal cuando se muestren las calificaciones del cuestionario.
              - generic [ref=f2e542]:
                - generic [ref=f2e543]:
                  - generic [ref=f2e544]: Decimales en las calificaciones de las preguntas
                  - generic [ref=f2e545]: quiz | questiondecimalpoints
                - generic [ref=f2e546]:
                  - combobox "Decimales en las calificaciones de las preguntas" [ref=f2e548]:
                    - option "Los mismos que para las calificaciones" [selected]
                    - option "0"
                    - option "1"
                    - option "2"
                    - option "3"
                    - option "4"
                    - option "5"
                    - option "6"
                    - option "7"
                  - generic [ref=f2e549]:
                    - checkbox "Avanzada" [ref=f2e550]
                    - generic [ref=f2e551]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e552]
                    - generic [ref=f2e553]: Bloqueado
                  - generic [ref=f2e554]: "Valor por defecto: Los mismos que para las calificaciones"
                  - paragraph [ref=f2e556]: Número de dígitos a mostrar después de la coma decimal cuando se muestren las calificaciones de las preguntas individuales.
              - generic [ref=f2e557]:
                - generic [ref=f2e558]:
                  - generic [ref=f2e559]: Mostrar bloques durante los intentos
                  - generic [ref=f2e560]: quiz | showblocks
                - generic [ref=f2e561]:
                  - checkbox "Mostrar bloques durante los intentos" [ref=f2e563]
                  - generic [ref=f2e564]:
                    - checkbox "Avanzada" [checked] [ref=f2e565]
                    - generic [ref=f2e566]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e567]
                    - generic [ref=f2e568]: Bloqueado
                  - generic [ref=f2e569]: "Valor por defecto: No, Avanzada"
                  - paragraph [ref=f2e571]: Mostrar bloques durante los intentos de responder al cuestionario.
              - generic [ref=f2e572]:
                - generic [ref=f2e573]:
                  - generic [ref=f2e574]: Se requiere contraseña
                  - generic [ref=f2e575]: quiz | quizpassword
                - generic [ref=f2e576]:
                  - generic [ref=f2e578]:
                    - link [ref=f2e579] [cursor=pointer]:
                      - /url: "#"
                      - emphasis [ref=f2e582]: Haz click para insertar texto
                      - img "Editar contraseña" [ref=f2e583]: 
                    - link [ref=f2e584] [cursor=pointer]:
                      - /url: "#"
                      - img "Revelar" [ref=f2e585]: 
                  - generic [ref=f2e586]:
                    - checkbox "Avanzada" [ref=f2e587]
                    - generic [ref=f2e588]: Avanzada
                    - checkbox "Requerido" [ref=f2e589]
                    - generic [ref=f2e590]: Requerido
                    - checkbox "Bloqueado" [ref=f2e591]
                    - generic [ref=f2e592]: Bloqueado
                  - paragraph [ref=f2e594]: Los estudiantes deben escribir su contraseña antes de intentar resolver el cuestionario.
              - generic [ref=f2e595]:
                - generic [ref=f2e596]:
                  - generic [ref=f2e597]: Se requiere dirección de red
                  - generic [ref=f2e598]: quiz | subnet
                - generic [ref=f2e599]:
                  - textbox "Se requiere dirección de red" [ref=f2e601]
                  - generic [ref=f2e602]:
                    - checkbox "Avanzada" [checked] [ref=f2e603]
                    - generic [ref=f2e604]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e605]
                    - generic [ref=f2e606]: Bloqueado
                  - generic [ref=f2e607]: "Valor por defecto: Vacío, Avanzada"
                  - paragraph [ref=f2e609]: Los estudiantes únicamente pueden intentar resolver el cuestionario desde estos ordenadores.
              - generic [ref=f2e610]:
                - generic [ref=f2e611]:
                  - generic [ref=f2e612]: Forzar demora entre los intentos primero y segundo
                  - generic [ref=f2e613]: quiz | delay1
                - generic [ref=f2e614]:
                  - generic [ref=f2e616]:
                    - textbox "Forzar demora entre los intentos primero y segundo" [ref=f2e617]: "0"
                    - generic [ref=f2e618]: unidades de duración
                    - combobox "unidades de duración" [ref=f2e619]:
                      - option "semanas"
                      - option "días"
                      - option "horas"
                      - option "minutos" [selected]
                      - option "segundos"
                  - generic [ref=f2e620]:
                    - checkbox "Avanzada" [checked] [ref=f2e621]
                    - generic [ref=f2e622]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e623]
                    - generic [ref=f2e624]: Bloqueado
                  - generic [ref=f2e625]: "Valor por defecto: Ninguno, Avanzada"
                  - paragraph [ref=f2e627]: Si aquí se fija un tiempo de demora, el estudiante no puede comenzar su segundo intento hasta que haya transcurrido ese tiempo después de terminar su primer intento.
              - generic [ref=f2e628]:
                - generic [ref=f2e629]:
                  - generic [ref=f2e630]: Forzar demora entre intentos posteriores
                  - generic [ref=f2e631]: quiz | delay2
                - generic [ref=f2e632]:
                  - generic [ref=f2e634]:
                    - textbox "Forzar demora entre intentos posteriores" [ref=f2e635]: "0"
                    - generic [ref=f2e636]: unidades de duración
                    - combobox "unidades de duración" [ref=f2e637]:
                      - option "semanas"
                      - option "días"
                      - option "horas"
                      - option "minutos" [selected]
                      - option "segundos"
                  - generic [ref=f2e638]:
                    - checkbox "Avanzada" [checked] [ref=f2e639]
                    - generic [ref=f2e640]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e641]
                    - generic [ref=f2e642]: Bloqueado
                  - generic [ref=f2e643]: "Valor por defecto: Ninguno, Avanzada"
                  - paragraph [ref=f2e645]: Si aquí se fija un tiempo de demora, el estudiante no puede comenzar su tercero, cuarto... intento hasta que haya transcurrido ese tiempo después de terminar su anterior intento.
              - generic [ref=f2e646]:
                - generic [ref=f2e647]:
                  - generic [ref=f2e648]: Utilizar una ventana emergente 'segura'
                  - generic [ref=f2e649]: quiz | browsersecurity
                - generic [ref=f2e650]:
                  - combobox "Utilizar una ventana emergente 'segura'" [ref=f2e652]:
                    - option "Ninguno" [selected]
                    - option "Ventana emergente a pantalla completa con alguna seguridad JavaScript"
                  - generic [ref=f2e653]:
                    - checkbox "Avanzada" [checked] [ref=f2e654]
                    - generic [ref=f2e655]: Avanzada
                    - checkbox "Bloqueado" [ref=f2e656]
                    - generic [ref=f2e657]: Bloqueado
                  - generic [ref=f2e658]: "Valor por defecto: Ninguno, Avanzada"
                  - paragraph [ref=f2e660]: Usar 'tricks' de JavaScript para tratar de restringir copiar y pegar, etc., durante los intentos de resolver este cuestionario.
            - button "Guardar cambios" [ref=f2e663] [cursor=pointer]
      - contentinfo [ref=f2e664]:
        - generic: "?"
        - generic [ref=f2e665]:
          - generic [ref=f2e666]:
            - link "Documentación para esta página" [ref=f2e668] [cursor=pointer]:
              - /url: https://docs.moodle.org/503/es/admin/setting/modsettingquiz
              - generic [aria-hidden] [ref=f2e669]: 
              - text: Documentación para esta página
            - link [ref=f2e671] [cursor=pointer]:
              - /url: https://moodle.com/help/?utm_source=CTA-banner&utm_medium=platform&utm_campaign=name~Moodle4+cat~lms+mp~no
              - generic [aria-hidden] [ref=f2e672]: 
              - text: Soporte y servicios
              - img "Abrir en una nueva ventana" [ref=f2e673]: 
            - link "Contactar con el soporte del sitio" [ref=f2e675] [cursor=pointer]:
              - /url: http://localhost:8090/user/contactsitesupport.php
              - generic [aria-hidden] [ref=f2e676]: 
              - text: Contactar con el soporte del sitio
          - generic [ref=f2e677]:
            - generic [ref=f2e679]:
              - text: Usted se ha identificado como
              - link "Admin User" [ref=f2e680] [cursor=pointer]:
                - /url: http://localhost:8090/user/profile.php?id=2
              - text: (
              - link "Cerrar sesión" [ref=f2e681] [cursor=pointer]:
                - /url: http://localhost:8090/login/logout.php?sesskey=2ItogZG8AX
              - text: )
            - link "Resumen de retención de datos" [ref=f2e684] [cursor=pointer]:
              - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
            - link "Cambiar al tema estándar" [ref=f2e686] [cursor=pointer]:
              - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fadmin%2Fsettings.php%3Fsection%3Dmodsettingquiz&device=default&sesskey=2ItogZG8AX
          - generic [ref=f2e687]:
            - generic [ref=f2e688]:
              - text: Desarrollado por
              - link "Moodle" [ref=f2e689] [cursor=pointer]:
                - /url: https://moodle.com
            - generic [ref=f2e690]: "Versión 5.3 (Build: 20261005)"
        - generic [ref=f2e692]:
          - link "Purgar todas las cachés" [ref=f2e694] [cursor=pointer]:
            - /url: http://localhost:8090/admin/purgecaches.php?confirm=1&sesskey=2ItogZG8AX&returnurl=%2Fadmin%2Fsettings.php%3Fsection%3Dmodsettingquiz
          - generic [ref=f2e696]:
            - text: "Instancias reactivas:"
            - generic [ref=f2e697]: Esta página no tiene instancias reactivas.
```

# Test source

```ts
  1  | // CA-2 y CA-3: el bloque anterior se fue de verdad, no solo de la vista del estudiante. El profesor es la prueba de que se
  2  | // fue el dato: para él locallib.php:1220 fuerza overallfeedback, así que un simple cambio de opción no se la ocultaría.
  3  | import { test, expect } from '@playwright/test';
  4  | import { abrirQuiz, filaResumen, login, prepararCaptura } from '../../../factory/regresion/helpers';
  5  | import {
  6  |   abrirFormularioExamen, cerrarIndiceCurso, crearExamen, eliminarExamen, idCursoQA101, nombreUnico,
  7  | } from '../../spec-0/pruebas/soporte';
  8  | import { abrirEdicion, estudianteDe, filasTemas, hacerIntento, OPCIONES_RETIRADAS, seccionTemas } from './soporte';
  9  | 
  10 | test('[CA-2] el profesor tampoco ve el bloque anterior en la revisión de un estudiante @requiere-feature', async ({ page, isMobile }) => {
  11 |   test.setTimeout(180_000);
  12 |   await login(page, estudianteDe(isMobile));
  13 |   const intento = await hacerIntento(page, '6');
  14 | 
  15 |   await login(page, 'profesor');
  16 |   await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  17 |   await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');
  18 |   await expect(filaResumen(page, 'Retroalimentación')).toHaveCount(0);
  19 |   await expect(page.getByText('Retro global')).toHaveCount(0);
  20 |   await expect(filasTemas(page)).toHaveCount(3);
  21 | });
  22 | 
  23 | test('[CA-2] la página del examen ya no muestra el bloque anterior y conserva la nota @requiere-feature', async ({ page, isMobile }) => {
  24 |   test.setTimeout(180_000);
  25 |   await login(page, estudianteDe(isMobile));
  26 |   const intento = await hacerIntento(page, '6');
  27 | 
  28 |   await abrirQuiz(page);
  29 |   // Hay una tabla por intento y el más reciente va primero: el recién hecho es el primero.
  30 |   await expect(page.locator('li .card table').first()).toContainText('Finalizado');
  31 |   await expect(page.locator('li .card table thead th', { hasText: 'Retroalimentación' })).toHaveCount(0);
  32 |   await expect(page.getByText('Retro global')).toHaveCount(0);
  33 |   // La nota depende de los intentos previos del estudiante: se comprueba que sigue ahí, no su valor.
  34 |   await expect(page.locator('#feedback')).toContainText(/\d+,\d+\s*\/\s*10,00/);
  35 | 
  36 |   await page.goto(`/mod/quiz/review.php?attempt=${intento}`);
  37 |   await expect(seccionTemas(page)).toHaveCount(1);
  38 | });
  39 | 
  40 | test('[CA-3] el formulario del examen ya no ofrece nada de la retroalimentación global @requiere-feature', async ({ page, isMobile }) => {
  41 |   test.setTimeout(180_000);
  42 |   await login(page, 'profesor');
  43 |   await abrirFormularioExamen(page, await idCursoQA101(page));
  44 |   if (!isMobile) await cerrarIndiceCurso(page);
  45 | 
  46 |   for (const selector of OPCIONES_RETIRADAS) await expect(page.locator(selector)).toHaveCount(0);
  47 |   // La retroalimentación por pregunta y el resto de la revisión quedan fuera de alcance: siguen.
  48 |   await expect(page.locator('#id_marksimmediately')).toHaveCount(1);
  49 |   await expect(page.locator('#id_generalfeedbackimmediately')).toHaveCount(1);
  50 | 
  51 |   await expect(page).toHaveScreenshot('spec-3-formulario.png', { fullPage: true, mask: await prepararCaptura(page) });
  52 | });
  53 | 
  54 | test('[CA-3] un examen nuevo se guarda sin error con ese formulario y sigue sin esas opciones @requiere-feature', async ({ page }, testInfo) => {
  55 |   test.setTimeout(180_000);
  56 |   const nombre = nombreUnico('Spec3', testInfo.project.name);
  57 |   await login(page, 'profesor');
  58 |   const curso = await idCursoQA101(page);
  59 | 
  60 |   let cmid = 0;
  61 |   try {
  62 |     cmid = await crearExamen(page, curso, nombre);
  63 |     await expect(page).toHaveTitle(new RegExp(nombre));
  64 | 
  65 |     await abrirEdicion(page, cmid);
  66 |     await expect(page.locator('#id_name')).toHaveValue(nombre);
  67 |     for (const selector of OPCIONES_RETIRADAS) await expect(page.locator(selector)).toHaveCount(0);
  68 |   } finally {
  69 |     if (cmid) await eliminarExamen(page, cmid);
  70 |   }
  71 | });
  72 | 
  73 | test('[CA-3] los ajustes del administrador ya no ofrecen la retroalimentación global @requiere-feature', async ({ page }) => {
  74 |   await login(page, 'admin');
  75 |   await page.goto('/admin/settings.php?section=modsettingquiz');
  76 |   await expect(page.locator("[id^='id_s_quiz_reviewmarks']").first()).toBeVisible();
> 77 |   await expect(page.locator('#id_s_quiz_initialnumfeedbacks')).toHaveCount(0);
     |                                                                ^ Error: expect(locator).toHaveCount(expected) failed
  78 |   await expect(page.locator("[id^='id_s_quiz_reviewoverallfeedback']")).toHaveCount(0);
  79 | });
  80 | 
```