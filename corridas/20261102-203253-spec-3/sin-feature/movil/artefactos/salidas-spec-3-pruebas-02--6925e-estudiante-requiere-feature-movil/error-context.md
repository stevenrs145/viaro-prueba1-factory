# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-3/pruebas/02-retro-eliminada.spec.ts >> [CA-2] el profesor tampoco ve el bloque anterior en la revisión de un estudiante @requiere-feature
- Location: salidas/spec-3/pruebas/02-retro-eliminada.spec.ts:10:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('table.quizreviewsummary tr').filter({ has: locator('th').filter({ hasText: /^Retroalimentación$/ }) }).locator('td')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" locator('table.quizreviewsummary tr').filter({ has: locator('th').filter({ hasText: /^Retroalimentación$/ }) }).locator('td') with timeout 5000ms
  - waiting for locator('table.quizreviewsummary tr').filter({ has: locator('th').filter({ hasText: /^Retroalimentación$/ }) }).locator('td')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [active] [ref=f11e1]:
  - status
  - generic [ref=f11e2]:
    - link "Salta al contenido principal" [ref=f11e3] [cursor=pointer]:
      - /url: "#maincontent"
    - navigation "Navegación del sitio" [ref=f11e4]:
      - generic [ref=f11e5]:
        - button "Panel lateral" [ref=f11e6] [cursor=pointer]
        - text: 
        - generic [ref=f11e9]:
          - generic [ref=f11e12]:
            - switch "Modo de edición" [ref=f11e13] [cursor=pointer]
            - generic [ref=f11e14] [cursor=pointer]: Modo de edición
          - button "Mostrar la ventana de notificaciones cuando no hay ninguna" [ref=f11e24] [cursor=pointer]:
            - generic [aria-hidden] [ref=f11e25]: 
          - button "Mostrar/ocultar cajón de mensajería" [ref=f11e27] [cursor=pointer]:
            - generic [aria-hidden] [ref=f11e28]: 
          - button "Menú de usuario" [ref=f11e34] [cursor=pointer]:
            - img "Paula Profesora" [ref=f11e38]: PP
            - text: 
    - generic [ref=f11e39]:
      - generic [ref=f11e40]:
        - generic:
          - button "Abrir índice del curso" [ref=f11e42] [cursor=pointer]
          - button "Abrir cajón de bloques" [ref=f11e47] [cursor=pointer]
        - banner [ref=f11e51]:
          - generic [ref=f11e52]:
            - navigation "Camino de migas" [ref=f11e55]:
              - list [ref=f11e56]:
                - listitem [ref=f11e57]:
                  - link "QA101" [ref=f11e58] [cursor=pointer]:
                    - /url: http://localhost:8090/course/view.php?id=2
                - listitem [ref=f11e59]:
                  - text: /
                  - link "General" [ref=f11e60] [cursor=pointer]:
                    - /url: http://localhost:8090/course/section.php?id=1
                - listitem [ref=f11e61]:
                  - text: /
                  - generic [ref=f11e62]: Examen de regresión
            - heading "Examen de regresión" [level=1] [ref=f11e71]
        - navigation "Menú de Actividad" [ref=f11e74]:
          - menubar [ref=f11e75]:
            - menuitem "Cuestionario" [ref=f11e76] [cursor=pointer]
            - menuitem "Configuración" [ref=f11e79] [cursor=pointer]
            - menuitem "Más " [ref=f11e81] [cursor=pointer]:
              - generic [ref=f11e82]: Más
              - text: 
        - main [ref=f11e87]:
          - table [ref=f11e89]:
            - caption [ref=f11e90]: Resumen de intento 4
            - rowgroup [ref=f11e91]:
              - row [ref=f11e92]:
                - rowheader [ref=f11e93]:
                  - link [ref=f11e94] [cursor=pointer]:
                    - /url: http://localhost:8090/user/view.php?id=13&course=2
                    - img "Estudiante Número 10" [ref=f11e95]: EN
                - cell [ref=f11e96]:
                  - link "Estudiante Número 10" [ref=f11e97] [cursor=pointer]:
                    - /url: http://localhost:8090/user/view.php?id=13&course=2
              - row [ref=f11e98]:
                - rowheader "Intentos" [ref=f11e99]
                - cell [ref=f11e100]:
                  - link "1" [ref=f11e101] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/review.php?attempt=540&cmid=2
                  - text: ","
                  - link "2" [ref=f11e102] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/review.php?attempt=541&cmid=2
                  - text: ","
                  - link "3" [ref=f11e103] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/review.php?attempt=542&cmid=2
                  - text: ","
                  - strong [ref=f11e104]: "4"
              - row [ref=f11e105]:
                - rowheader "Estado" [ref=f11e106]
                - cell "Finalizado" [ref=f11e107]
              - row [ref=f11e108]:
                - rowheader "Comenzado" [ref=f11e109]
                - cell "lunes, 2 de noviembre de 2026, 20:46" [ref=f11e110]
              - row [ref=f11e111]:
                - rowheader "Completado" [ref=f11e112]
                - cell "lunes, 2 de noviembre de 2026, 20:47" [ref=f11e113]
              - row [ref=f11e114]:
                - rowheader "Duración" [ref=f11e115]
                - cell "7 segundos" [ref=f11e116]
              - row [ref=f11e117]:
                - rowheader "Puntos" [ref=f11e118]
                - cell "5,00/6,00" [ref=f11e119]
              - row [ref=f11e120]:
                - rowheader "Calificación" [ref=f11e121]
                - cell "8,33 de 10,00 (83,33%)" [ref=f11e122]
              - row [ref=f11e123]:
                - rowheader "Retroalimentación" [ref=f11e124]
                - 'cell "Retro global: aprobado." [ref=f11e125]'
          - generic [ref=f11e126]:
            - generic [ref=f11e127]:
              - heading "Pregunta 1" [level=3] [ref=f11e128]
              - generic [ref=f11e129]: Correcta
              - generic [ref=f11e130]: Se puntúa 1,00 sobre 1,00
              - generic [ref=f11e131]: Marcar pregunta
              - link [ref=f11e133] [cursor=pointer]:
                - /url: http://localhost:8090/question/bank/editquestion/question.php?cmid=2&returnurl=%2Fmod%2Fquiz%2Freview.php%3Fattempt%3D543%26cmid%3D2%23&id=1
                - img "Editar" [ref=f11e134]: 
                - text: Editar pregunta
              - generic [ref=f11e135]: v1 (última)
            - generic [ref=f11e136]:
              - generic [ref=f11e137]:
                - heading "Enunciado de la pregunta" [level=4] [ref=f11e138]
                - paragraph [ref=f11e141]: ¿Cuánto es 3 × 4?
                - group "Pregunta 1 Respuesta" [ref=f11e142]:
                  - generic [ref=f11e143]:
                    - generic [ref=f11e144]: Pregunta 1
                    - text: Respuesta
                  - generic [ref=f11e145]:
                    - generic [ref=f11e146]:
                      - radio "1. 12" [checked] [disabled] [ref=f11e147]
                      - generic [ref=f11e148]:
                        - generic [ref=f11e149]: "1."
                        - generic [ref=f11e150]: "12"
                      - img "Correcta" [ref=f11e152]: 
                      - generic [ref=f11e153]: 12 es el resultado de sumar cuatro veces el 3.
                    - generic [ref=f11e154]:
                      - radio "2. 7" [disabled] [ref=f11e155]
                      - generic [ref=f11e156]:
                        - generic [ref=f11e157]: "2."
                        - generic [ref=f11e158]: "7"
                    - generic [ref=f11e159]:
                      - radio "3. 9" [disabled] [ref=f11e160]
                      - generic [ref=f11e161]:
                        - generic [ref=f11e162]: "3."
                        - generic [ref=f11e163]: "9"
                    - generic [ref=f11e164]:
                      - radio "4. 10" [disabled] [ref=f11e165]
                      - generic [ref=f11e166]:
                        - generic [ref=f11e167]: "4."
                        - generic [ref=f11e168]: "10"
              - generic [ref=f11e169]:
                - heading "Retroalimentación" [level=4] [ref=f11e170]
                - generic [ref=f11e171]:
                  - generic [ref=f11e172]: Respuesta correcta.
                  - paragraph [ref=f11e175]: 3 × 4 = 12.
                  - generic [ref=f11e176]: "La respuesta correcta es: 12"
              - generic [ref=f11e177]:
                - heading "Comentarios" [level=4] [ref=f11e178]
                - link "Escribir comentario o corregir la calificación" [ref=f11e180] [cursor=pointer]:
                  - /url: http://localhost:8090/mod/quiz/comment.php?attempt=543&slot=1
              - generic [ref=f11e181]:
                - heading "Historial de respuestas" [level=4] [ref=f11e182]
                - table [ref=f11e185]:
                  - rowgroup [ref=f11e186]:
                    - row [ref=f11e187]:
                      - columnheader "Paso" [ref=f11e188]
                      - columnheader "Hora" [ref=f11e189]
                      - columnheader "Acción" [ref=f11e190]
                      - columnheader "Estado" [ref=f11e191]
                      - columnheader "Puntos" [ref=f11e192]
                  - rowgroup [ref=f11e193]:
                    - row [ref=f11e194]:
                      - cell [ref=f11e195]:
                        - link "1" [ref=f11e196] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=1&step=0
                      - cell "2/11/26, 20:46:58" [ref=f11e197]
                      - cell "Iniciado/a" [ref=f11e198]
                      - cell "Sin responder aún" [ref=f11e199]
                      - cell [ref=f11e200]
                    - row [ref=f11e201]:
                      - cell [ref=f11e202]:
                        - link "2" [ref=f11e203] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=1&step=1
                      - cell "2/11/26, 20:47:00" [ref=f11e204]
                      - 'cell "Guardada: 12" [ref=f11e205]'
                      - cell "Respuesta guardada" [ref=f11e206]
                      - cell [ref=f11e207]
                    - row [ref=f11e208]:
                      - cell "3" [ref=f11e209]
                      - cell "2/11/26, 20:47:05" [ref=f11e210]
                      - cell "Intento finalizado" [ref=f11e211]
                      - cell "Correcta" [ref=f11e212]
                      - cell "1,00" [ref=f11e213]
          - generic [ref=f11e214]:
            - generic [ref=f11e215]:
              - heading "Pregunta 2" [level=3] [ref=f11e216]
              - generic [ref=f11e217]: Correcta
              - generic [ref=f11e218]: Se puntúa 1,00 sobre 1,00
              - generic [ref=f11e219]: Marcar pregunta
              - link [ref=f11e221] [cursor=pointer]:
                - /url: http://localhost:8090/question/bank/editquestion/question.php?cmid=2&returnurl=%2Fmod%2Fquiz%2Freview.php%3Fattempt%3D543%26cmid%3D2%23question-543-2&id=2
                - img "Editar" [ref=f11e222]: 
                - text: Editar pregunta
              - generic [ref=f11e223]: v1 (última)
            - generic [ref=f11e224]:
              - generic [ref=f11e225]:
                - heading "Enunciado de la pregunta" [level=4] [ref=f11e226]
                - paragraph [ref=f11e229]: La suma de dos números pares siempre es par.
                - group "Pregunta 2 Respuesta" [ref=f11e230]:
                  - generic [ref=f11e231]:
                    - generic [ref=f11e232]: Pregunta 2
                    - text: Respuesta
                  - generic [ref=f11e233]:
                    - generic [ref=f11e234]:
                      - radio "Verdadero" [checked] [disabled] [ref=f11e235]
                      - text: Verdadero
                      - img "Correcta" [ref=f11e236]: 
                    - generic [ref=f11e237]:
                      - radio "Falso" [disabled] [ref=f11e238]
                      - text: Falso
              - generic [ref=f11e239]:
                - heading "Retroalimentación" [level=4] [ref=f11e240]
                - generic [ref=f11e241]:
                  - generic [ref=f11e242]: Correcto.
                  - paragraph [ref=f11e245]: Dos pares suman siempre un múltiplo de 2.
                  - generic [ref=f11e246]: La respuesta correcta es 'Verdadero'
              - generic [ref=f11e247]:
                - heading "Comentarios" [level=4] [ref=f11e248]
                - link "Escribir comentario o corregir la calificación" [ref=f11e250] [cursor=pointer]:
                  - /url: http://localhost:8090/mod/quiz/comment.php?attempt=543&slot=2
              - generic [ref=f11e251]:
                - heading "Historial de respuestas" [level=4] [ref=f11e252]
                - table [ref=f11e255]:
                  - rowgroup [ref=f11e256]:
                    - row [ref=f11e257]:
                      - columnheader "Paso" [ref=f11e258]
                      - columnheader "Hora" [ref=f11e259]
                      - columnheader "Acción" [ref=f11e260]
                      - columnheader "Estado" [ref=f11e261]
                      - columnheader "Puntos" [ref=f11e262]
                  - rowgroup [ref=f11e263]:
                    - row [ref=f11e264]:
                      - cell [ref=f11e265]:
                        - link "1" [ref=f11e266] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=2&step=0
                      - cell "2/11/26, 20:46:58" [ref=f11e267]
                      - cell "Iniciado/a" [ref=f11e268]
                      - cell "Sin responder aún" [ref=f11e269]
                      - cell [ref=f11e270]
                    - row [ref=f11e271]:
                      - cell [ref=f11e272]:
                        - link "2" [ref=f11e273] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=2&step=1
                      - cell "2/11/26, 20:47:00" [ref=f11e274]
                      - 'cell "Guardada: Verdadero" [ref=f11e275]'
                      - cell "Respuesta guardada" [ref=f11e276]
                      - cell [ref=f11e277]
                    - row [ref=f11e278]:
                      - cell "3" [ref=f11e279]
                      - cell "2/11/26, 20:47:05" [ref=f11e280]
                      - cell "Intento finalizado" [ref=f11e281]
                      - cell "Correcta" [ref=f11e282]
                      - cell "1,00" [ref=f11e283]
          - generic [ref=f11e284]:
            - generic [ref=f11e285]:
              - heading "Pregunta 3" [level=3] [ref=f11e286]
              - generic [ref=f11e287]: Correcta
              - generic [ref=f11e288]: Se puntúa 1,00 sobre 1,00
              - generic [ref=f11e289]: Marcar pregunta
              - link [ref=f11e291] [cursor=pointer]:
                - /url: http://localhost:8090/question/bank/editquestion/question.php?cmid=2&returnurl=%2Fmod%2Fquiz%2Freview.php%3Fattempt%3D543%26cmid%3D2%23question-543-3&id=3
                - img "Editar" [ref=f11e292]: 
                - text: Editar pregunta
              - generic [ref=f11e293]: v1 (última)
            - generic [ref=f11e294]:
              - generic [ref=f11e295]:
                - heading "Enunciado de la pregunta" [level=4] [ref=f11e296]
                - paragraph [ref=f11e299]: ¿Cuántos lados tiene un hexágono?
                - group "Pregunta 3 Respuesta" [ref=f11e300]:
                  - generic [ref=f11e301]:
                    - generic [ref=f11e302]: Pregunta 3
                    - text: Respuesta
                  - generic [ref=f11e303]:
                    - generic [ref=f11e304]:
                      - radio "1. 6" [checked] [disabled] [ref=f11e305]
                      - generic [ref=f11e306]:
                        - generic [ref=f11e307]: "1."
                        - generic [ref=f11e308]: "6"
                      - img "Correcta" [ref=f11e310]: 
                      - generic [ref=f11e311]: Hexa significa seis.
                    - generic [ref=f11e312]:
                      - radio "2. 4" [disabled] [ref=f11e313]
                      - generic [ref=f11e314]:
                        - generic [ref=f11e315]: "2."
                        - generic [ref=f11e316]: "4"
                    - generic [ref=f11e317]:
                      - radio "3. 5" [disabled] [ref=f11e318]
                      - generic [ref=f11e319]:
                        - generic [ref=f11e320]: "3."
                        - generic [ref=f11e321]: "5"
                    - generic [ref=f11e322]:
                      - radio "4. 8" [disabled] [ref=f11e323]
                      - generic [ref=f11e324]:
                        - generic [ref=f11e325]: "4."
                        - generic [ref=f11e326]: "8"
              - generic [ref=f11e327]:
                - heading "Retroalimentación" [level=4] [ref=f11e328]
                - generic [ref=f11e329]:
                  - generic [ref=f11e330]: Respuesta correcta.
                  - paragraph [ref=f11e333]: Un hexágono tiene seis lados.
                  - generic [ref=f11e334]: "La respuesta correcta es: 6"
              - generic [ref=f11e335]:
                - heading "Comentarios" [level=4] [ref=f11e336]
                - link "Escribir comentario o corregir la calificación" [ref=f11e338] [cursor=pointer]:
                  - /url: http://localhost:8090/mod/quiz/comment.php?attempt=543&slot=3
              - generic [ref=f11e339]:
                - heading "Historial de respuestas" [level=4] [ref=f11e340]
                - table [ref=f11e343]:
                  - rowgroup [ref=f11e344]:
                    - row [ref=f11e345]:
                      - columnheader "Paso" [ref=f11e346]
                      - columnheader "Hora" [ref=f11e347]
                      - columnheader "Acción" [ref=f11e348]
                      - columnheader "Estado" [ref=f11e349]
                      - columnheader "Puntos" [ref=f11e350]
                  - rowgroup [ref=f11e351]:
                    - row [ref=f11e352]:
                      - cell [ref=f11e353]:
                        - link "1" [ref=f11e354] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=3&step=0
                      - cell "2/11/26, 20:47:00" [ref=f11e355]
                      - cell "Iniciado/a" [ref=f11e356]
                      - cell "Sin responder aún" [ref=f11e357]
                      - cell [ref=f11e358]
                    - row [ref=f11e359]:
                      - cell [ref=f11e360]:
                        - link "2" [ref=f11e361] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=3&step=1
                      - cell "2/11/26, 20:47:01" [ref=f11e362]
                      - 'cell "Guardada: 6" [ref=f11e363]'
                      - cell "Respuesta guardada" [ref=f11e364]
                      - cell [ref=f11e365]
                    - row [ref=f11e366]:
                      - cell "3" [ref=f11e367]
                      - cell "2/11/26, 20:47:05" [ref=f11e368]
                      - cell "Intento finalizado" [ref=f11e369]
                      - cell "Correcta" [ref=f11e370]
                      - cell "1,00" [ref=f11e371]
          - generic [ref=f11e372]:
            - generic [ref=f11e373]:
              - heading "Pregunta 4" [level=3] [ref=f11e374]
              - generic [ref=f11e375]: Correcta
              - generic [ref=f11e376]: Se puntúa 1,00 sobre 1,00
              - generic [ref=f11e377]: Marcar pregunta
              - link [ref=f11e379] [cursor=pointer]:
                - /url: http://localhost:8090/question/bank/editquestion/question.php?cmid=2&returnurl=%2Fmod%2Fquiz%2Freview.php%3Fattempt%3D543%26cmid%3D2%23question-543-4&id=4
                - img "Editar" [ref=f11e380]: 
                - text: Editar pregunta
              - generic [ref=f11e381]: v1 (última)
            - generic [ref=f11e382]:
              - generic [ref=f11e383]:
                - heading "Enunciado de la pregunta" [level=4] [ref=f11e384]
                - paragraph [ref=f11e387]: Todo cuadrado es también un rectángulo.
                - group "Pregunta 4 Respuesta" [ref=f11e388]:
                  - generic [ref=f11e389]:
                    - generic [ref=f11e390]: Pregunta 4
                    - text: Respuesta
                  - generic [ref=f11e391]:
                    - generic [ref=f11e392]:
                      - radio "Verdadero" [checked] [disabled] [ref=f11e393]
                      - text: Verdadero
                      - img "Correcta" [ref=f11e394]: 
                    - generic [ref=f11e395]:
                      - radio "Falso" [disabled] [ref=f11e396]
                      - text: Falso
              - generic [ref=f11e397]:
                - heading "Retroalimentación" [level=4] [ref=f11e398]
                - generic [ref=f11e399]:
                  - generic [ref=f11e400]: Correcto.
                  - paragraph [ref=f11e403]: Un cuadrado tiene cuatro ángulos rectos.
                  - generic [ref=f11e404]: La respuesta correcta es 'Verdadero'
              - generic [ref=f11e405]:
                - heading "Comentarios" [level=4] [ref=f11e406]
                - link "Escribir comentario o corregir la calificación" [ref=f11e408] [cursor=pointer]:
                  - /url: http://localhost:8090/mod/quiz/comment.php?attempt=543&slot=4
              - generic [ref=f11e409]:
                - heading "Historial de respuestas" [level=4] [ref=f11e410]
                - table [ref=f11e413]:
                  - rowgroup [ref=f11e414]:
                    - row [ref=f11e415]:
                      - columnheader "Paso" [ref=f11e416]
                      - columnheader "Hora" [ref=f11e417]
                      - columnheader "Acción" [ref=f11e418]
                      - columnheader "Estado" [ref=f11e419]
                      - columnheader "Puntos" [ref=f11e420]
                  - rowgroup [ref=f11e421]:
                    - row [ref=f11e422]:
                      - cell [ref=f11e423]:
                        - link "1" [ref=f11e424] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=4&step=0
                      - cell "2/11/26, 20:47:00" [ref=f11e425]
                      - cell "Iniciado/a" [ref=f11e426]
                      - cell "Sin responder aún" [ref=f11e427]
                      - cell [ref=f11e428]
                    - row [ref=f11e429]:
                      - cell [ref=f11e430]:
                        - link "2" [ref=f11e431] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=4&step=1
                      - cell "2/11/26, 20:47:01" [ref=f11e432]
                      - 'cell "Guardada: Verdadero" [ref=f11e433]'
                      - cell "Respuesta guardada" [ref=f11e434]
                      - cell [ref=f11e435]
                    - row [ref=f11e436]:
                      - cell "3" [ref=f11e437]
                      - cell "2/11/26, 20:47:05" [ref=f11e438]
                      - cell "Intento finalizado" [ref=f11e439]
                      - cell "Correcta" [ref=f11e440]
                      - cell "1,00" [ref=f11e441]
          - generic [ref=f11e442]:
            - generic [ref=f11e443]:
              - heading "Pregunta 5" [level=3] [ref=f11e444]
              - generic [ref=f11e445]: Correcta
              - generic [ref=f11e446]: Se puntúa 1,00 sobre 1,00
              - generic [ref=f11e447]: Marcar pregunta
              - link [ref=f11e449] [cursor=pointer]:
                - /url: http://localhost:8090/question/bank/editquestion/question.php?cmid=2&returnurl=%2Fmod%2Fquiz%2Freview.php%3Fattempt%3D543%26cmid%3D2%23question-543-5&id=5
                - img "Editar" [ref=f11e450]: 
                - text: Editar pregunta
              - generic [ref=f11e451]: v1 (última)
            - generic [ref=f11e452]:
              - generic [ref=f11e453]:
                - heading "Enunciado de la pregunta" [level=4] [ref=f11e454]
                - paragraph [ref=f11e457]: Guatemala declaró su independencia en 1821.
                - group "Pregunta 5 Respuesta" [ref=f11e458]:
                  - generic [ref=f11e459]:
                    - generic [ref=f11e460]: Pregunta 5
                    - text: Respuesta
                  - generic [ref=f11e461]:
                    - generic [ref=f11e462]:
                      - radio "Verdadero" [checked] [disabled] [ref=f11e463]
                      - text: Verdadero
                      - img "Correcta" [ref=f11e464]: 
                    - generic [ref=f11e465]:
                      - radio "Falso" [disabled] [ref=f11e466]
                      - text: Falso
              - generic [ref=f11e467]:
                - heading "Retroalimentación" [level=4] [ref=f11e468]
                - generic [ref=f11e469]:
                  - generic [ref=f11e470]: Correcto.
                  - paragraph [ref=f11e473]: El Acta de Independencia se firmó el 15 de septiembre de 1821.
                  - generic [ref=f11e474]: La respuesta correcta es 'Verdadero'
              - generic [ref=f11e475]:
                - heading "Comentarios" [level=4] [ref=f11e476]
                - link "Escribir comentario o corregir la calificación" [ref=f11e478] [cursor=pointer]:
                  - /url: http://localhost:8090/mod/quiz/comment.php?attempt=543&slot=5
              - generic [ref=f11e479]:
                - heading "Historial de respuestas" [level=4] [ref=f11e480]
                - table [ref=f11e483]:
                  - rowgroup [ref=f11e484]:
                    - row [ref=f11e485]:
                      - columnheader "Paso" [ref=f11e486]
                      - columnheader "Hora" [ref=f11e487]
                      - columnheader "Acción" [ref=f11e488]
                      - columnheader "Estado" [ref=f11e489]
                      - columnheader "Puntos" [ref=f11e490]
                  - rowgroup [ref=f11e491]:
                    - row [ref=f11e492]:
                      - cell [ref=f11e493]:
                        - link "1" [ref=f11e494] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=5&step=0
                      - cell "2/11/26, 20:47:02" [ref=f11e495]
                      - cell "Iniciado/a" [ref=f11e496]
                      - cell "Sin responder aún" [ref=f11e497]
                      - cell [ref=f11e498]
                    - row [ref=f11e499]:
                      - cell [ref=f11e500]:
                        - link "2" [ref=f11e501] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=5&step=1
                      - cell "2/11/26, 20:47:03" [ref=f11e502]
                      - 'cell "Guardada: Verdadero" [ref=f11e503]'
                      - cell "Respuesta guardada" [ref=f11e504]
                      - cell [ref=f11e505]
                    - row [ref=f11e506]:
                      - cell "3" [ref=f11e507]
                      - cell "2/11/26, 20:47:05" [ref=f11e508]
                      - cell "Intento finalizado" [ref=f11e509]
                      - cell "Correcta" [ref=f11e510]
                      - cell "1,00" [ref=f11e511]
          - generic [ref=f11e512]:
            - generic [ref=f11e513]:
              - heading "Pregunta 6" [level=3] [ref=f11e514]
              - generic [ref=f11e515]: Sin contestar
              - generic [ref=f11e516]: Se puntúa como 0 sobre 1,00
              - generic [ref=f11e517]: Marcar pregunta
              - link [ref=f11e519] [cursor=pointer]:
                - /url: http://localhost:8090/question/bank/editquestion/question.php?cmid=2&returnurl=%2Fmod%2Fquiz%2Freview.php%3Fattempt%3D543%26cmid%3D2%23question-543-6&id=6
                - img "Editar" [ref=f11e520]: 
                - text: Editar pregunta
              - generic [ref=f11e521]: v1 (última)
            - generic [ref=f11e522]:
              - generic [ref=f11e523]:
                - heading "Enunciado de la pregunta" [level=4] [ref=f11e524]
                - paragraph [ref=f11e527]: Explica en un párrafo una consecuencia de la independencia de Centroamérica.
                - generic [ref=f11e529]:
                  - heading "Texto de la respuesta Pregunta 6" [level=4] [ref=f11e530]
                  - textbox "Texto de la respuesta Pregunta 6" [ref=f11e531]
              - generic [ref=f11e532]:
                - heading "Retroalimentación" [level=4] [ref=f11e533]
                - paragraph [ref=f11e537]: Una buena respuesta nombra la consecuencia y explica por qué ocurrió.
              - generic [ref=f11e538]:
                - heading "Comentarios" [level=4] [ref=f11e539]
                - link "Escribir comentario o corregir la calificación" [ref=f11e541] [cursor=pointer]:
                  - /url: http://localhost:8090/mod/quiz/comment.php?attempt=543&slot=6
              - generic [ref=f11e542]:
                - heading "Historial de respuestas" [level=4] [ref=f11e543]
                - table [ref=f11e546]:
                  - rowgroup [ref=f11e547]:
                    - row [ref=f11e548]:
                      - columnheader "Paso" [ref=f11e549]
                      - columnheader "Hora" [ref=f11e550]
                      - columnheader "Acción" [ref=f11e551]
                      - columnheader "Estado" [ref=f11e552]
                      - columnheader "Puntos" [ref=f11e553]
                  - rowgroup [ref=f11e554]:
                    - row [ref=f11e555]:
                      - cell [ref=f11e556]:
                        - link "1" [ref=f11e557] [cursor=pointer]:
                          - /url: http://localhost:8090/mod/quiz/reviewquestion.php?attempt=543&slot=6&step=0
                      - cell "2/11/26, 20:47:02" [ref=f11e558]
                      - cell "Iniciado/a" [ref=f11e559]
                      - cell "Sin responder aún" [ref=f11e560]
                      - cell [ref=f11e561]
                    - row [ref=f11e562]:
                      - cell "2" [ref=f11e563]
                      - cell "2/11/26, 20:47:05" [ref=f11e564]
                      - cell "Intento finalizado" [ref=f11e565]
                      - cell "Sin contestar" [ref=f11e566]
                      - cell [ref=f11e567]
          - link "Finalizar revisión" [ref=f11e569] [cursor=pointer]:
            - /url: http://localhost:8090/mod/quiz/view.php?id=2
      - contentinfo [ref=f11e570]:
        - generic: "?"
        - generic [ref=f11e571]:
          - generic [ref=f11e572]:
            - link "Documentación para esta página" [ref=f11e574] [cursor=pointer]:
              - /url: https://docs.moodle.org/503/es/mod/quiz/review
              - generic [aria-hidden] [ref=f11e575]: 
              - text: Documentación para esta página
            - link "Contactar con el soporte del sitio" [ref=f11e577] [cursor=pointer]:
              - /url: http://localhost:8090/user/contactsitesupport.php
              - generic [aria-hidden] [ref=f11e578]: 
              - text: Contactar con el soporte del sitio
          - generic [ref=f11e579]:
            - generic [ref=f11e581]:
              - text: Usted se ha identificado como
              - link "Paula Profesora" [ref=f11e582] [cursor=pointer]:
                - /url: http://localhost:8090/user/profile.php?id=3
              - text: (
              - link "Cerrar sesión" [ref=f11e583] [cursor=pointer]:
                - /url: http://localhost:8090/login/logout.php?sesskey=GamDT4sXQs
              - text: )
            - link "Resumen de retención de datos" [ref=f11e586] [cursor=pointer]:
              - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
            - link "Cambiar al tema estándar" [ref=f11e588] [cursor=pointer]:
              - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fmod%2Fquiz%2Freview.php%3Fattempt%3D543%26amp%3Bcmid%3D2&device=default&sesskey=GamDT4sXQs
          - generic [ref=f11e590]:
            - text: Desarrollado por
            - link "Moodle" [ref=f11e591] [cursor=pointer]:
              - /url: https://moodle.com
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
> 18 |   await expect(filaResumen(page, 'Retroalimentación')).toHaveCount(0);
     |                                                        ^ Error: expect(locator).toHaveCount(expected) failed
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
  77 |   await expect(page.locator('#id_s_quiz_initialnumfeedbacks')).toHaveCount(0);
  78 |   await expect(page.locator("[id^='id_s_quiz_reviewoverallfeedback']")).toHaveCount(0);
  79 | });
  80 | 
```