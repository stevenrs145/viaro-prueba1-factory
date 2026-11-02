Sos el CORRECTOR de una fábrica de software sobre Moodle 5.3. La implementación de `salidas/spec-1/` no pasó la validación
(intento 1). Escribís SOLO dentro de `salidas/spec-1/`. Podés leer `entorno/.moodle-src/` y `factory/regresion/`.

# Qué falló (salida real del pipeline)
### movil · [Spec 1] reconocimiento obligatorio › [CA-1] con el reconocimiento activado el botón de intento abre el diálogo y no muestra preguntas @requiere-feature
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
[2m  - waiting for locator('#id_submitbutton')[22m
[2m    - locator resolved to <input type="submit" name="submitbutton" id="id_submitbutton" value="Guardar cambios y mostrar" class="btn↵                        btn-primary↵                        ↵                    ↵                    "/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not stable[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is not stable[22m
[2m  2 × retrying click action[22m
[2m      - waiting 100ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - element is outside of the viewport[22m
[2m  28 × retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - element is outside of the viewport[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m


### movil · [Spec 1] reconocimiento obligatorio › [CA-1] enviar sin marcar la casilla muestra el error y no crea intento @requiere-feature @camino-error
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
[2m  - waiting for locator('#id_submitbutton')[22m
[2m    - locator resolved to <input type="submit" name="submitbutton" id="id_submitbutton" value="Guardar cambios y mostrar" class="btn↵                        btn-primary↵                        ↵                    ↵                    "/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not stable[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is not stable[22m
[2m  2 × retrying click action[22m
[2m      - waiting 100ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - element is outside of the viewport[22m
[2m  28 × retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - element is outside of the viewport[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m


### movil · [Spec 1] reconocimiento obligatorio › [CA-1] abrir startattempt.php directamente muestra el formulario y no la pregunta @requiere-feature @camino-error
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
[2m  - waiting for locator('#id_submitbutton')[22m
[2m    - locator resolved to <input type="submit" name="submitbutton" id="id_submitbutton" value="Guardar cambios y mostrar" class="btn↵                        btn-primary↵                        ↵                    ↵                    "/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not stable[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is not stable[22m
[2m  2 × retrying click action[22m
[2m      - waiting 100ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - element is outside of the viewport[22m
[2m  28 × retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - element is outside of the viewport[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m


### movil · [Spec 1] reconocimiento obligatorio › [CA-1] cancelar el diálogo deja al estudiante en la página del quiz sin intento @requiere-feature
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
[2m  - waiting for locator('#id_submitbutton')[22m
[2m    - locator resolved to <input type="submit" name="submitbutton" id="id_submitbutton" value="Guardar cambios y mostrar" class="btn↵                        btn-primary↵                        ↵                    ↵                    "/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not stable[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is not stable[22m
[2m  2 × retrying click action[22m
[2m      - waiting 100ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - element is outside of the viewport[22m
[2m  28 × retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - element is outside of the viewport[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m


### movil · [Spec 1] reconocimiento obligatorio › [CA-1] al aceptar se llega a la primera pregunta @requiere-feature
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
[2m  - waiting for locator('#id_submitbutton')[22m
[2m    - locator resolved to <input type="submit" name="submitbutton" id="id_submitbutton" value="Guardar cambios y mostrar" class="btn↵                        btn-primary↵                        ↵                    ↵                    "/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not stable[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    - waiting for element to be visible, enabled and stable[22m
[2m    - element is not stable[22m
[2m  2 × retrying click action[22m
[2m      - waiting 100ms[22m
[2m      - waiting for element to be visible, enabled and stable[22m
[2m      - element is visible, enabled and stable[22m
[2m      - scrolling into view if needed[22m
[2m      - done scrolling[22m
[2m      - element is outside of the viewport[22m
[2m  28 × retrying click action[22m
[2m       - waiting 500ms[22m
[2m       - waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - element is outside of the viewport[22m
[2m  - retrying click action[22m
[2m    - waiting 500ms[22m


### movil · [Spec 1] reconocimiento obligatorio › [CA-1] captura del formulario de prechequeo @requiere-feature
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
[2m  - waiting for locator('#id_submitbutton')[22m
[2m    - locator resolved to <input type="submit" name="submitbutton" id="id_submitbutton" value="Guardar cambios y mostrar" class="btn↵                        btn-primary↵                        ↵                    ↵                    "/>[22m
[2m  - attempting click action[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not stable[22m
[2m    - retrying click action[22m
[2m    - waiting 20ms[22m
[2m    2 × waiting for element to be visible, enabled and stable[22m
[2m      - element is not stable[22m
[2m    - retrying click action[22m
[2m      - waiting 100ms[22m
[2m    29 × waiting for element to be visible, enabled and stable[22m
[2m       - element is visible, enabled and stable[22m
[2m       - scrolling into view if needed[22m
[2m       - done scrolling[22m
[2m       - element is outside of the viewport[22m
[2m     - retrying click action[22m
[2m       - waiting 500ms[22m


## Estado de la página al fallar (ARIA)
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-1/pruebas/reconocimiento.spec.ts >> [Spec 1] reconocimiento obligatorio >> [CA-1] con el reconocimiento activado el botón de intento abre el diálogo y no muestra preguntas @requiere-feature
- Location: salidas/spec-1/pruebas/reconocimiento.spec.ts:92:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#id_submitbutton')
    - locator resolved to <input type="submit" name="submitbutton" id="id_submitbutton" value="Guardar cambios y mostrar" class="btn↵                        btn-primary↵                        ↵                    ↵                    "/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
  28 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - element is outside of the viewport
  - retrying click action
    - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=f11e1]:
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
        - button "Abrir índice del curso" [ref=f11e42] [cursor=pointer]
        - banner [ref=f11e46]:
          - generic [ref=f11e47]:
            - navigation "Camino de migas" [ref=f11e50]:
              - list [ref=f11e51]:
                - listitem [ref=f11e52]:
                  - link "QA101" [ref=f11e53] [cursor=pointer]:
                    - /url: http://localhost:8090/course/view.php?id=2
                - listitem [ref=f11e54]:
                  - text: /
                  - link "General" [ref=f11e55] [cursor=pointer]:
                    - /url: http://localhost:8090/course/section.php?id=1
                - listitem [ref=f11e56]:
                  - text: /
                  - link "Examen de regresión" [ref=f11e57] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/view.php?id=2
                - listitem [ref=f11e58]:
                  - text: /
                  - generic [ref=f11e59]: Configuración
            - heading "Examen de regresión" [level=1] [ref=f11e68]
        - navigation "Menú de Actividad" [ref=f11e71]:
          - menubar [ref=f11e72]:
            - menuitem "Cuestionario" [ref=f11e73] [cursor=pointer]
            - menuitem "Configuración" [ref=f11e75] [cursor=pointer]
            - menuitem "Más " [ref=f11e78] [cursor=pointer]:
              - generic [ref=f11e79]: Más
              - text: 
        - main [ref=f11e84]:
          - heading "Editar ajustes" [level=2] [ref=f11e85]
          - generic [ref=f11e86]:
            - button "Expandir todo" [ref=f11e88] [cursor=pointer]
            - group "General" [ref=f11e90]:
              - generic [ref=f11e93]:
                - button "General" [expanded] [ref=f11e94] [cursor=pointer]:
                  - generic "Colapsar" [ref=f11e95]:
                    - generic [aria-hidden] [ref=f11e96]: 
                  - text:  
                - heading [level=3] [aria-hidden] [ref=f11e98]: General
              - generic [ref=f11e99]:
                - generic [ref=f11e100]:
                  - generic [ref=f11e101]:
                    - generic [ref=f11e102]: Nombre
                    - generic [aria-hidden] [ref=f11e105]: 
                  - textbox "Nombre" [ref=f11e107]: Examen de regresión
                - generic [ref=f11e108]:
                  - generic [ref=f11e109]: Descripción
                  - generic [ref=f11e112]:
                    - textbox "Descripción" [ref=f11e114]: <p>Examen de práctica con preguntas de álgebra, geometría e historia.</p>
                    - generic [ref=f11e115]:
                      - generic [ref=f11e116]: Formato Descripción
                      - combobox "Formato Descripción" [ref=f11e117]:
                        - option "Formato HTML"
                        - option "Formato automático" [selected]
                        - option "Formato de texto plano"
                        - option "Formato Markdown"
                - generic [ref=f11e120]:
                  - checkbox "Muestra la descripción en la página del curso" [ref=f11e121]
                  - generic [ref=f11e122]: Muestra la descripción en la página del curso
                  - button "Ayuda" [ref=f11e124] [cursor=pointer]:
                    - img "Ayuda con Muestra la descripción en 
---
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-1/pruebas/reconocimiento.spec.ts >> [Spec 1] reconocimiento obligatorio >> [CA-1] enviar sin marcar la casilla muestra el error y no crea intento @requiere-feature @camino-error
- Location: salidas/spec-1/pruebas/reconocimiento.spec.ts:105:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#id_submitbutton')
    - locator resolved to <input type="submit" name="submitbutton" id="id_submitbutton" value="Guardar cambios y mostrar" class="btn↵                        btn-primary↵                        ↵                    ↵                    "/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
  28 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - element is outside of the viewport
  - retrying click action
    - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=f11e1]:
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
        - button "Abrir índice del curso" [ref=f11e42] [cursor=pointer]
        - banner [ref=f11e46]:
          - generic [ref=f11e47]:
            - navigation "Camino de migas" [ref=f11e50]:
              - list [ref=f11e51]:
                - listitem [ref=f11e52]:
                  - link "QA101" [ref=f11e53] [cursor=pointer]:
                    - /url: http://localhost:8090/course/view.php?id=2
                - listitem [ref=f11e54]:
                  - text: /
                  - link "General" [ref=f11e55] [cursor=pointer]:
                    - /url: http://localhost:8090/course/section.php?id=1
                - listitem [ref=f11e56]:
                  - text: /
                  - link "Examen de regresión" [ref=f11e57] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/view.php?id=2
                - listitem [ref=f11e58]:
                  - text: /
                  - generic [ref=f11e59]: Configuración
            - heading "Examen de regresión" [level=1] [ref=f11e68]
        - navigation "Menú de Actividad" [ref=f11e71]:
          - menubar [ref=f11e72]:
            - menuitem "Cuestionario" [ref=f11e73] [cursor=pointer]
            - menuitem "Configuración" [ref=f11e75] [cursor=pointer]
            - menuitem "Más " [ref=f11e78] [cursor=pointer]:
              - generic [ref=f11e79]: Más
              - text: 
        - main [ref=f11e84]:
          - heading "Editar ajustes" [level=2] [ref=f11e85]
          - generic [ref=f11e86]:
            - button "Expandir todo" [ref=f11e88] [cursor=pointer]
            - group "General" [ref=f11e90]:
              - generic [ref=f11e93]:
                - button "General" [expanded] [ref=f11e94] [cursor=pointer]:
                  - generic "Colapsar" [ref=f11e95]:
                    - generic [aria-hidden] [ref=f11e96]: 
                  - text:  
                - heading [level=3] [aria-hidden] [ref=f11e98]: General
              - generic [ref=f11e99]:
                - generic [ref=f11e100]:
                  - generic [ref=f11e101]:
                    - generic [ref=f11e102]: Nombre
                    - generic [aria-hidden] [ref=f11e105]: 
                  - textbox "Nombre" [ref=f11e107]: Examen de regresión
                - generic [ref=f11e108]:
                  - generic [ref=f11e109]: Descripción
                  - generic [ref=f11e112]:
                    - textbox "Descripción" [ref=f11e114]: <p>Examen de práctica con preguntas de álgebra, geometría e historia.</p>
                    - generic [ref=f11e115]:
                      - generic [ref=f11e116]: Formato Descripción
                      - combobox "Formato Descripción" [ref=f11e117]:
                        - option "Formato HTML"
                        - option "Formato automático" [selected]
                        - option "Formato de texto plano"
                        - option "Formato Markdown"
                - generic [ref=f11e120]:
                  - checkbox "Muestra la descripción en la página del curso" [ref=f11e121]
                  - generic [ref=f11e122]: Muestra la descripción en la página del curso
                  - button "Ayuda" [ref=f11e124] [cursor=pointer]:
                    - img "Ayuda con Muestra la descripción en la página d
---
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-1/pruebas/reconocimiento.spec.ts >> [Spec 1] reconocimiento obligatorio >> [CA-3] el texto se guarda por quiz y el estudiante ve siempre el último @requiere-feature
- Location: salidas/spec-1/pruebas/reconocimiento.spec.ts:218:3

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#id_submitbutton')
    - locator resolved to <input type="submit" name="submitbutton" id="id_submitbutton" value="Guardar cambios y mostrar" class="btn↵                        btn-primary↵                        ↵                    ↵                    "/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
      - waiting 100ms
    29 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - element is outside of the viewport
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=f11e1]:
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
        - button "Abrir índice del curso" [ref=f11e42] [cursor=pointer]
        - banner [ref=f11e46]:
          - generic [ref=f11e47]:
            - navigation "Camino de migas" [ref=f11e50]:
              - list [ref=f11e51]:
                - listitem [ref=f11e52]:
                  - link "QA101" [ref=f11e53] [cursor=pointer]:
                    - /url: http://localhost:8090/course/view.php?id=2
                - listitem [ref=f11e54]:
                  - text: /
                  - link "General" [ref=f11e55] [cursor=pointer]:
                    - /url: http://localhost:8090/course/section.php?id=1
                - listitem [ref=f11e56]:
                  - text: /
                  - link "Examen de regresión" [ref=f11e57] [cursor=pointer]:
                    - /url: http://localhost:8090/mod/quiz/view.php?id=2
                - listitem [ref=f11e58]:
                  - text: /
                  - generic [ref=f11e59]: Configuración
            - heading "Examen de regresión" [level=1] [ref=f11e68]
        - navigation "Menú de Actividad" [ref=f11e71]:
          - menubar [ref=f11e72]:
            - menuitem "Cuestionario" [ref=f11e73] [cursor=pointer]
            - menuitem "Configuración" [ref=f11e75] [cursor=pointer]
            - menuitem "Más " [ref=f11e78] [cursor=pointer]:
              - generic [ref=f11e79]: Más
              - text: 
        - main [ref=f11e84]:
          - heading "Editar ajustes" [level=2] [ref=f11e85]
          - generic [ref=f11e86]:
            - button "Expandir todo" [ref=f11e88] [cursor=pointer]
            - group "General" [ref=f11e90]:
              - generic [ref=f11e93]:
                - button "General" [expanded] [ref=f11e94] [cursor=pointer]:
                  - generic "Colapsar" [ref=f11e95]:
                    - generic [aria-hidden] [ref=f11e96]: 
                  - text:  
                - heading [level=3] [aria-hidden] [ref=f11e98]: General
              - generic [ref=f11e99]:
                - generic [ref=f11e100]:
                  - generic [ref=f11e101]:
                    - generic [ref=f11e102]: Nombre
                    - generic [aria-hidden] [ref=f11e105]: 
                  - textbox "Nombre" [ref=f11e107]: Examen de regresión
                - generic [ref=f11e108]:
                  - generic [ref=f11e109]: Descripción
                  - generic [ref=f11e112]:
                    - textbox "Descripción" [ref=f11e114]: <p>Examen de práctica con preguntas de álgebra, geometría e historia.</p>
                    - generic [ref=f11e115]:
                      - generic [ref=f11e116]: Formato Descripción
                      - combobox "Formato Descripción" [ref=f11e117]:
                        - option "Formato HTML"
                        - option "Formato automático" [selected]
                        - option "Formato de texto plano"
                        - option "Formato Markdown"
                - generic [ref=f11e120]:
                  - checkbox "Muestra la descripción en la página del curso" [ref=f11e121]
                  - generic [ref=f11e122]: Muestra la descripción en la página del curso
                  - button "Ayuda" [ref=f11e124] [cursor=pointer]:
                    - img "Ayuda con Muestra la descripción en la página del curso" [ref=f11e125]: 
            - group "Temporalización" [ref=f11e126]:
              - generic [ref=f11e129]:
                - button "Te

# Plan vigente
```json
{
  "spec_id": "spec-1",
  "titulo": "Reconocimiento obligatorio antes de iniciar un quiz",
  "naturaleza": "agrega",
  "componente": "quizaccess_reconocimiento",
  "ruta_moodle": "public/mod/quiz/accessrule/reconocimiento",
  "capa_justificacion": "Regla de acceso quizaccess_*: es la capa más específica para pedir algo antes de iniciar un intento y no toca el core. Un local_* con hooks de salida solo agregaría HTML y no bloquearía startattempt.php; un observer de attempt_started llegaría tarde. Puntos de extensión verificados en entorno/.moodle-src/public/mod/quiz: las reglas se descubren por rule.php (classes/access_manager.php:103) y se instancian con make() (classes/access_manager.php:79; base en classes/local/access_rule_base.php:77). El prechequeo está en access_rule_base.php:111 (is_preflight_check_required), :124 (add_preflight_check_form_fields), :142 (validate_preflight_check) y :152 (notify_preflight_check_passed). El bloqueo real es del servidor: startattempt.php:76-101 no crea el intento hasta que el formulario valida, y startattempt.php:103-104 lo crea o arranca después; attempt.php:96-98 y summary.php:72 vuelven a comprobar; classes/external.php:1029-1037 aplica lo mismo a servicios web. La configuración por quiz usa access_rule_base.php:272 (add_settings_form_fields, llamado en mod_form.php:330, sección 'security'), :285 (validate_settings_form_fields), :307 (save_settings), :318 (delete_settings) y :342 (get_settings_sql); mod_form.php:517-520 copia a $toform lo que devuelve load_settings. Si make() devuelve null, la regla no existe para ese quiz: es la base de CA-2. Referencia de casilla obligatoria: accessrule/offlineattempts/rule.php:58-81. Trampa verificada: NO copiar is_preflight_check_required de timelimit (`$attemptid === null`, accessrule/timelimit/rule.php:64-67). Un intento precreado llega con id y estado NOT_STARTED (mod/quiz/locallib.php:1980-1985), startattempt.php:76 no validaría y startattempt.php:103 lo arrancaría sin aceptación.",
  "bordes": [
    {
      "descripcion": "Frecuencia de la aceptación: el spec no dice si es una vez por quiz, por sesión o por intento.",
      "decision": "Una vez por cada intento nuevo, incluido cada reintento. is_preflight_check_required devuelve true si $attemptid es null o si el intento está en estado NOT_STARTED (consultado en quiz_attempts), y false si ya está IN_PROGRESS u OVERDUE.",
      "criterio": "El spec habla de aceptar antes de ver la primera pregunta. Ligarlo al arranque del intento lo garantiza siempre y no depende de la sesión: el patrón de password con $SESSION volvería a pedir la aceptación a mitad de intento tras expirar la sesión.",
      "preguntaria": "¿Debe aceptarse en cada intento o basta una vez por estudiante y quiz?",
      "bloqueante": false
    },
    {
      "descripcion": "Intentos precreados (precreateattempts): existen en estado NOT_STARTED antes de que el estudiante entre.",
      "decision": "Se tratan como intento nuevo: exigen aceptación.",
      "criterio": "Si no, CA-1 se podría saltar: view.php mostraría el formulario, pero startattempt.php:76 no lo validaría y :103 arrancaría el intento.",
      "preguntaria": "Ninguna: lo exige CA-1.",
      "bloqueante": false
    },
    {
      "descripcion": "Intentos ya en curso al activar el reconocimiento, o al cambiar su texto.",
      "decision": "No se interrumpen ni se pide aceptar de nuevo; la regla aplica desde el siguiente intento.",
      "criterio": "CA-1 protege la llegada a la primera pregunta y ese estudiante ya pasó por ella. Interrumpir un examen en curso sería un cambio de flujo no pedido.",
      "preguntaria": "¿Un cambio del texto debe forzar una nueva aceptación en intentos abiertos?",
      "bloqueante": false
    },
    {
      "descripcion": "Registro de la aceptación: el spec no pide guardar quién aceptó ni cuándo.",
      "decision": "No se guarda ningún dato personal. La tabla del plugin solo contiene configuración por quiz y el provider de privacidad es null_provider. Mientras la regla esté activa, un intento arrancado implica aceptación, salvo los que ya estaban en curso al activarla.",
      "criterio": "Mínimo que cumple el spec; 'reportes' está fuera de alcance. Es reversible: una tabla de aceptaciones se puede agregar luego, aunque no recupera aceptaciones pasadas.",
      "preguntaria": "¿Hace falta constancia auditable (usuario, fecha y versión del texto), por ejemplo por motivos legales? Si es así, debe definirse antes de usarlo en producción.",
      "bloqueante": false
    },
    {
      "descripcion": "Formato del texto: el spec dice 'breve' y no menciona texto enriquecido.",
      "decision": "textarea de texto plano, renderizado con format_text(..., FORMAT_PLAIN) en el contexto del módulo; respeta saltos de línea y escapa HTML. Sin editor ni archivos.",
      "criterio": "load_settings entrega escalares (mod_form.php:517-520), mientras que un editor necesita un arreglo text/format y gestión de archivos. Para un texto breve no se justifica, y evita inyectar HTML en la página de inicio.",
      "preguntaria": "¿Producto necesita enlaces o formato en el texto?",
      "bloqueante": false
    },
    {
      "descripcion": "Reconocimiento activado con texto vacío.",
      "decision": "El formulario del quiz no guarda: validate_settings_form_fields devuelve error en el campo de texto si, tras recortar espacios, queda vacío. No hay texto por defecto.",
      "criterio": "Una aceptación sin contenido no significa nada, y un texto genérico podría hacer aceptar algo que el docente nunca escribió.",
      "preguntaria": "¿Debe existir un texto por defecto a nivel de sitio?",
      "bloqueante": false
    },
    {
      "descripcion": "Valor por defecto y desactivación posterior.",
      "decision": "Desactivado por defecto, sin filas para quizzes no configurados (LEFT JOIN; make() devuelve null). Al desactivar se conserva el texto con enabled=0. save_settings no hace nada si los campos del plugin no vienen en $quiz (generadores, servicios web), para no pisar la configuración. delete_settings borra la fila.",
      "criterio": "Cambio aditivo: los quizzes existentes no cambian (CA-2). Reactivar no obliga a reescribir el texto.",
      "preguntaria": "¿Debe poder activarse por defecto en todo el sitio?",
      "bloqueante": false
    },
    {
      "descripcion": "Dónde ve el estudiante el reconocimiento y qué pasa si no acepta.",
      "decision": "Se muestra en el formulario de prechequeo: el diálogo que abre el botón de intento y, sin JS, la página completa de startattempt.php. Se acepta con una casilla obligatoria validada en el servidor con empty(), sin regla de cliente. Además, description() muestra en view.php un aviso breve de que se pedirá aceptar. Cancelar vuelve a la página del quiz sin crear intento. Enviar sin marcar vuelve a mostrar el formulario con error, sin crear intento.",
      "criterio": "Es el camino nativo de Moodle. Validar en el servidor también cubre POST directos y servicios web. El tiempo límite no corre mientras se lee, porque el intento se crea después (startattempt.php:103-104).",
      "preguntaria": "¿El texto completo debe verse ya en la página del quiz, antes de pulsar el botón?",
      "bloqueante": false
    },
    {
      "descripcion": "Convivencia con otras reglas con prechequeo (contraseña, tiempo límite).",
      "decision": "Sin tratamiento especial: los campos se acumulan en el mismo formulario (preflight_check_form.php:46-51) y todas las validaciones deben pasar. El plugin no se declara reemplazo de otras reglas: get_superceded_rules queda vacío.",
      "criterio": "Comportamiento nativo y aditivo.",
      "preguntaria": "Ninguna necesaria.",
      "bloqueante": false
    },
    {
      "descripcion": "Profesores en vista previa.",
      "decision": "También ven y deben aceptar el reconocimiento; make() ignora $canignoretimelimits.",
      "criterio": "Así el docente comprueba lo que verá el estudiante, igual que con la contraseña. El spec no define ninguna excepción por rol.",
      "preguntaria": "¿Algún rol debe quedar exento?",
      "bloqueante": false
    },
    {
      "descripcion": "Respaldo, restauración y duplicado del quiz.",
      "decision": "Se incluyen backup_quizaccess_reconocimiento_subplugin y restore_quizaccess_reconocimiento_subplugin, mapeando quizid al quiz nuevo.",
      "criterio": "La configuración vive en tabla propia. Sin esto, un quiz duplicado o restaurado perdería el reconocimiento en silencio y dejaría de exigirse. El mecanismo está verificado en mod/quiz/backup/moodle2/backup_quiz_stepslib.php:47 y restore_quiz_stepslib.php:57.",
      "preguntaria": "Ninguna necesaria.",
      "bloqueante": false
    },
    {
      "descripcion": "App móvil y servicios web: el cliente no conoce este campo de prechequeo.",
      "decision": "Falla cerrado: sin preflightdata de aceptación, start_attempt devuelve error de validación. No se desarrolla soporte específico para la app.",
      "criterio": "CA-1 no admite una vía sin aceptación (external.php:1029-1037). Las pruebas E2E cubren la web; este camino queda como borde declarado y no se prueba contra la app.",
      "preguntaria": "¿Los estudiantes rinden estos quizzes desde la app móvil? De ser así, hace falta un spec aparte.",
      "bloqueante": false
    },
    {
      "descripcion": "Idioma: la instancia está en español y el plugin debe verse así.",
      "decision": "Se entregan lang/en/quizaccess_reconocimiento.php (obligatorio) y lang/es/quizaccess_reconocimiento.php con las mismas claves.",
      "criterio": "El gestor de cadenas carga lang/<idioma> del plugin (public/lib/classes/string_manager_standard.php:188-189).",
      "preguntaria": "Ninguna necesaria.",
      "bloqueante": false
    },
    {
      "descripcion": "Las pruebas comparten 'Examen de regresión' con otros specs, y escritorio y móvil reutilizan a estudiante5 y estudiante6.",
      "decision": "Cada prueba configura desde la UI como profesor, usa `finally` para restaurar el valor previo (por defecto, desactivado) y termina el intento que abrió. Un intento abierto haría que la siguiente pasada viera 'Continuar el último intento' sin prechequeo y fallaría en falso. Hay workers: 1 y fullyParallel: false (playwright.config.ts:11-12), así que no hay configuración concurrente.",
      "criterio": "Reglas del implementador: usar datos sembrados, dejar todo como estaba y garantizar pruebas independientes del orden.",
      "preguntaria": "Ninguna necesaria.",
      "bloqueante": false
    }
  ],
  "criterios": [
    {
      "id": "CA-1",
      "texto": "Con el reconocimiento activado, el estudiante no puede llegar a la primera pregunta hasta aceptarlo.",
      "verificacion": "ambas",
      "requiere_feature": true,
      "camino_error": true,
      "archivos": [
        "rule.php",
        "db/install.xml",
        "lang/en/quizaccess_reconocimiento.php",
        "lang/es/quizaccess_reconocimiento.php"
      ],
      "pruebas": [
        "Con el reconocimiento activado, estudiante5 pulsa el botón de intento: se abre el diálogo (.mod_quiz_preflight_popup, formulario #mod_quiz_preflight_form) con el texto configurado y la URL sigue en view.php, sin .que visible.",
        "@camino-error: enviar el formulario sin marcar la casilla (botón [name=\"submitbutton\"]) muestra el error en startattempt.php, sin preguntas. Al volver a view.php no hay 'Continuar el último intento', o sea, no se creó intento.",
        "@camino-error: con sesión de estudiante, abrir directamente /mod/quiz/startattempt.php?cmid=<cmid>&sesskey=<M.cfg.sesskey> muestra el formulario y no la pregunta; no se crea intento.",
        "Cancelar (#id_cancel) deja al estudiante en la página del quiz, sin intento.",
        "Tras marcar la casilla y enviar, se llega a attempt.php con la pregunta 1 visible. El intento se termina con enviarIntento().",
        "Visual: captura 'spec-1-prechequeo' del diálogo con el reconocimiento."
      ]
    },
    {
      "id": "CA-2",
      "texto": "Con el reconocimiento desactivado, el flujo del quiz queda idéntico al actual.",
      "verificacion": "funcional",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [
        "rule.php"
      ],
      "pruebas": [
        "Sin configurar el reconocimiento, estudiante6 ve en view.php el botón de intento, sin aviso del plugin y con #mod_quiz_preflight_form en 0. Un clic lo lleva directo a attempt.php con la pregunta 1 visible, y completa el intento con enviarIntento().",
        "Tras activar, guardar y desactivar desde la UI, el flujo vuelve a ser directo y el texto guardado sigue en el formulario de ajustes."
      ]
    },
    {
      "id": "CA-3",
      "texto": "El texto del reconocimiento es configurable por quiz.",
      "verificacion": "ambas",
      "requiere_feature": true,
      "camino_error": false,
      "archivos": [
        "rule.php",
        "db/install.xml",
        "backup/moodle2/backup_quizaccess_reconocimiento_subplugin.class.php",
        "backup/moodle2/restore_quizaccess_reconocimiento_subplugin.class.php",
        "lang/en/quizaccess_reconocimiento.php",
        "lang/es/quizaccess_reconocimiento.php"
      ],
      "pruebas": [
        "Como profesor, en los ajustes del quiz (sección 'security' desplegada) se activa la opción y se guarda un texto A. Al reabrir los ajustes siguen la opción y el texto, y el estudiante ve A en el diálogo.",
        "Se cambia a un texto B: el estudiante ve B y el diálogo ya no contiene A.",
        "Activar con el texto vacío no guarda y muestra el error en el campo.",
        "El texto con etiquetas HTML se muestra escapado, sin crear elementos en el diálogo.",
        "Visual: captura 'spec-1-ajustes' de la sección de ajustes con el reconocimiento activado."
      ]
    },
    {
      "id": "CA-4",
      "texto": "El cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, más evidencia de que el camino completo funciona (configurar, el estudiante lo ve y acepta, llega al quiz).",
      "verificacion": "proceso",
      "requiere_feature": false,
      "camino_error": false,
      "archivos": [],
      "pruebas": [
        "Evidencia de la corrida: suite de CA-1 a CA-3 en verde en escritorio y móvil, con la comprobación sin plugin para las pruebas @requiere-feature.",
        "El camino completo queda en una sola prueba titulada [CA-1][CA-3]: el profesor configura, estudiante5 ve y acepta, llega a la pregunta 1 y envía; luego se restaura la configuración."
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
id: spec-1
titulo: Reconocimiento obligatorio antes de iniciar un quiz
naturaleza: agrega
---

# Spec 1 · Reconocimiento obligatorio antes de iniciar un quiz

## Intención
Antes de ver la primera pregunta de un quiz, el estudiante debe aceptar un breve reconocimiento (por ejemplo términos o instrucciones). Tanto el texto del reconocimiento como si es obligatorio deben poder configurarse **por quiz**. El objetivo es que un examen pueda exigir esa aceptación sin cambiar el resto del flujo del quiz.

## Criterios de aceptación
- CA-1: con el reconocimiento activado, el estudiante **no puede llegar a la primera pregunta** hasta aceptarlo.
- CA-2: con el reconocimiento desactivado, el flujo del quiz queda **idéntico** al actual.
- CA-3: el texto del reconocimiento es **configurable por quiz**.
- CA-4: el cambio se entrega con pruebas automáticas derivadas de estos criterios, ejecutadas y en verde, más evidencia de que el camino completo funciona (configurar, el estudiante lo ve y acepta, llega al quiz).

## Escenarios
- Dado un quiz con el reconocimiento activado, cuando el estudiante entra, entonces ve el reconocimiento y la primera pregunta queda bloqueada hasta aceptar.
- Dado un quiz con el reconocimiento desactivado, cuando el estudiante entra, entonces empieza el quiz directamente.

## Fuera de alcance
Calificación, reportes, y cualquier tipo de actividad que no sea el quiz.

## Restricciones
Cambio aditivo: no romper el flujo cuando está desactivado. No tocar nada fuera del alcance.


# Cómo corregir
1. Diagnosticá la CAUSA antes de editar: ¿es el código del plugin o es la prueba? Leé el estado ARIA de la página al fallar.
2. Si el plugin no hace lo que el criterio pide, arreglá el PLUGIN. Nunca "arregles" una prueba para que acepte un comportamiento
   que no cumple el criterio: debilitar, borrar o saltar asserts está prohibido y el control de honestidad lo bloquea.
3. Si la prueba usa un selector o un flujo equivocado (verificá contra el estado ARIA real), corregí la prueba manteniendo
   la misma intensidad de verificación.
4. Mismas reglas de pruebas que en la implementación (títulos `[CA-n]`, `@requiere-feature`, `@camino-error`, sin mocks de red,
   sin skip/only/soft, helpers de `factory/regresion/helpers.ts`).
5. Nunca reimplementes `login()` ni `prepararCaptura()`, ni los envuelvas con reintentos o esperas propias, y no uses `'networkidle'`.
   Si ya existe una copia en `salidas/spec-1/pruebas/`, bórrala y usá el helper. Si un helper es la causa, decilo en tu respuesta:
   lo arregla la fábrica, no la prueba.

Respondé con: causa raíz encontrada, qué cambiaste y por qué.
