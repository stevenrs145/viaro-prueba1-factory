# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salidas/spec-2/pruebas/spec-2-notificacion.spec.ts >> [CA-3] [CA-4] con el destino colgado el envío no demora al estudiante y el registro muestra el error real de cURL @requiere-feature @camino-error
- Location: salidas/spec-2/pruebas/spec-2-notificacion.spec.ts:153:1

# Error details

```
TimeoutError: locator.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#id_s_local_resultadoext_destino')

```

```
TimeoutError: locator.fill: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('#id_s_local_resultadoext_destino')

```

# Page snapshot

```yaml
- generic [active] [ref=f5e1]:
  - status
  - generic [ref=f5e2]:
    - link "Salta al contenido principal" [ref=f5e3] [cursor=pointer]:
      - /url: "#maincontent"
    - generic [ref=f5e4]:
      - heading "Información de la versión" [level=1] [ref=f5e7]
      - main [ref=f5e10]:
        - 'heading "Moodle 5.3 (Build: 20261005)" [level=2] [ref=f5e12]'
        - generic [ref=f5e13]:
          - text: Si desea información sobre esta versión de Moodle, por favor vea
          - link "Release Notes" [ref=f5e14] [cursor=pointer]:
            - /url: https://moodledev.io/general/releases
        - heading "Comprobaciones del servidor" [level=2] [ref=f5e15]
        - table [ref=f5e17]:
          - rowgroup [ref=f5e18]:
            - row [ref=f5e19]:
              - columnheader "Nombre" [ref=f5e20]
              - columnheader "Información" [ref=f5e21]
              - columnheader "Informe" [ref=f5e22]
              - columnheader "Complemento" [ref=f5e23]
              - columnheader "Estado" [ref=f5e24]
          - rowgroup [ref=f5e25]:
            - row [ref=f5e26]:
              - cell "moodle" [ref=f5e27]
              - cell [ref=f5e28]
              - cell [ref=f5e29]:
                - link [ref=f5e30] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/moodle
                  - generic [aria-hidden] [ref=f5e31]: 
                  - text: "versión 4.4 es obligatoria y está ejecutando 5.3 (Build: 20261005)"
                  - img "Abrir en una nueva ventana" [ref=f5e32]: 
              - cell [ref=f5e33]
              - cell "OK" [ref=f5e34]
            - row [ref=f5e36]:
              - cell "unicode" [ref=f5e37]
              - cell [ref=f5e38]
              - cell [ref=f5e39]:
                - link [ref=f5e40] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/unicode
                  - generic [aria-hidden] [ref=f5e41]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e42]: 
              - cell [ref=f5e43]
              - cell "OK" [ref=f5e44]
            - row [ref=f5e46]:
              - cell "database" [ref=f5e47]
              - cell "postgres (17.11)" [ref=f5e48]
              - cell [ref=f5e49]:
                - link [ref=f5e50] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/database/postgres (17.11)
                  - generic [aria-hidden] [ref=f5e51]: 
                  - text: versión 17 es obligatoria y está ejecutando 17.11
                  - img "Abrir en una nueva ventana" [ref=f5e52]: 
              - cell [ref=f5e53]
              - cell "OK" [ref=f5e54]
            - row [ref=f5e56]:
              - cell "php" [ref=f5e57]
              - cell [ref=f5e58]
              - cell [ref=f5e59]:
                - link [ref=f5e60] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php
                  - generic [aria-hidden] [ref=f5e61]: 
                  - text: versión 8.3.0 es obligatoria y está ejecutando 8.3.36
                  - img "Abrir en una nueva ventana" [ref=f5e62]: 
              - cell [ref=f5e63]
              - cell "OK" [ref=f5e64]
            - row [ref=f5e66]:
              - cell "pcreunicode" [ref=f5e67]
              - cell [ref=f5e68]
              - cell [ref=f5e69]:
                - link [ref=f5e70] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/pcreunicode
                  - generic [aria-hidden] [ref=f5e71]: 
                  - text: debería estar instalado y activado para conseguir los mejores resultados
                  - img "Abrir en una nueva ventana" [ref=f5e72]: 
              - cell [ref=f5e73]
              - cell "OK" [ref=f5e74]
            - row [ref=f5e76]:
              - cell "php_extension" [ref=f5e77]
              - cell "iconv" [ref=f5e78]
              - cell [ref=f5e79]:
                - link [ref=f5e80] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/iconv
                  - generic [aria-hidden] [ref=f5e81]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e82]: 
              - cell [ref=f5e83]
              - cell "OK" [ref=f5e84]
            - row [ref=f5e86]:
              - cell "php_extension" [ref=f5e87]
              - cell "mbstring" [ref=f5e88]
              - cell [ref=f5e89]:
                - link [ref=f5e90] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/mbstring
                  - generic [aria-hidden] [ref=f5e91]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e92]: 
              - cell [ref=f5e93]
              - cell "OK" [ref=f5e94]
            - row [ref=f5e96]:
              - cell "php_extension" [ref=f5e97]
              - cell "curl" [ref=f5e98]
              - cell [ref=f5e99]:
                - link [ref=f5e100] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/curl
                  - generic [aria-hidden] [ref=f5e101]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e102]: 
              - cell [ref=f5e103]
              - cell "OK" [ref=f5e104]
            - row [ref=f5e106]:
              - cell "php_extension" [ref=f5e107]
              - cell "openssl" [ref=f5e108]
              - cell [ref=f5e109]:
                - link [ref=f5e110] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/openssl
                  - generic [aria-hidden] [ref=f5e111]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e112]: 
              - cell [ref=f5e113]
              - cell "OK" [ref=f5e114]
            - row [ref=f5e116]:
              - cell "php_extension" [ref=f5e117]
              - cell "tokenizer" [ref=f5e118]
              - cell [ref=f5e119]:
                - link [ref=f5e120] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/tokenizer
                  - generic [aria-hidden] [ref=f5e121]: 
                  - text: debería estar instalado y activado para conseguir los mejores resultados
                  - img "Abrir en una nueva ventana" [ref=f5e122]: 
              - cell [ref=f5e123]
              - cell "OK" [ref=f5e124]
            - row [ref=f5e126]:
              - cell "php_extension" [ref=f5e127]
              - cell "soap" [ref=f5e128]
              - cell [ref=f5e129]:
                - link [ref=f5e130] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/soap
                  - generic [aria-hidden] [ref=f5e131]: 
                  - text: debería estar instalado y activado para conseguir los mejores resultados
                  - img "Abrir en una nueva ventana" [ref=f5e132]: 
              - cell [ref=f5e133]
              - cell "OK" [ref=f5e134]
            - row [ref=f5e136]:
              - cell "php_extension" [ref=f5e137]
              - cell "ctype" [ref=f5e138]
              - cell [ref=f5e139]:
                - link [ref=f5e140] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/ctype
                  - generic [aria-hidden] [ref=f5e141]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e142]: 
              - cell [ref=f5e143]
              - cell "OK" [ref=f5e144]
            - row [ref=f5e146]:
              - cell "php_extension" [ref=f5e147]
              - cell "zip" [ref=f5e148]
              - cell [ref=f5e149]:
                - link [ref=f5e150] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/zip
                  - generic [aria-hidden] [ref=f5e151]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e152]: 
              - cell [ref=f5e153]
              - cell "OK" [ref=f5e154]
            - row [ref=f5e156]:
              - cell "php_extension" [ref=f5e157]
              - cell "zlib" [ref=f5e158]
              - cell [ref=f5e159]:
                - link [ref=f5e160] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/zlib
                  - generic [aria-hidden] [ref=f5e161]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e162]: 
              - cell [ref=f5e163]
              - cell "OK" [ref=f5e164]
            - row [ref=f5e166]:
              - cell "php_extension" [ref=f5e167]
              - cell "gd" [ref=f5e168]
              - cell [ref=f5e169]:
                - link [ref=f5e170] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/gd
                  - generic [aria-hidden] [ref=f5e171]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e172]: 
              - cell [ref=f5e173]
              - cell "OK" [ref=f5e174]
            - row [ref=f5e176]:
              - cell "php_extension" [ref=f5e177]
              - cell "simplexml" [ref=f5e178]
              - cell [ref=f5e179]:
                - link [ref=f5e180] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/simplexml
                  - generic [aria-hidden] [ref=f5e181]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e182]: 
              - cell [ref=f5e183]
              - cell "OK" [ref=f5e184]
            - row [ref=f5e186]:
              - cell "php_extension" [ref=f5e187]
              - cell "spl" [ref=f5e188]
              - cell [ref=f5e189]:
                - link [ref=f5e190] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/spl
                  - generic [aria-hidden] [ref=f5e191]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e192]: 
              - cell [ref=f5e193]
              - cell "OK" [ref=f5e194]
            - row [ref=f5e196]:
              - cell "php_extension" [ref=f5e197]
              - cell "pcre" [ref=f5e198]
              - cell [ref=f5e199]:
                - link [ref=f5e200] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/pcre
                  - generic [aria-hidden] [ref=f5e201]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e202]: 
              - cell [ref=f5e203]
              - cell "OK" [ref=f5e204]
            - row [ref=f5e206]:
              - cell "php_extension" [ref=f5e207]
              - cell "dom" [ref=f5e208]
              - cell [ref=f5e209]:
                - link [ref=f5e210] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/dom
                  - generic [aria-hidden] [ref=f5e211]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e212]: 
              - cell [ref=f5e213]
              - cell "OK" [ref=f5e214]
            - row [ref=f5e216]:
              - cell "php_extension" [ref=f5e217]
              - cell "xml" [ref=f5e218]
              - cell [ref=f5e219]:
                - link [ref=f5e220] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/xml
                  - generic [aria-hidden] [ref=f5e221]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e222]: 
              - cell [ref=f5e223]
              - cell "OK" [ref=f5e224]
            - row [ref=f5e226]:
              - cell "php_extension" [ref=f5e227]
              - cell "xmlreader" [ref=f5e228]
              - cell [ref=f5e229]:
                - link [ref=f5e230] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/xmlreader
                  - generic [aria-hidden] [ref=f5e231]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e232]: 
              - cell [ref=f5e233]
              - cell "OK" [ref=f5e234]
            - row [ref=f5e236]:
              - cell "php_extension" [ref=f5e237]
              - cell "intl" [ref=f5e238]
              - cell [ref=f5e239]:
                - link [ref=f5e240] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/intl
                  - generic [aria-hidden] [ref=f5e241]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e242]: 
              - cell [ref=f5e243]
              - cell "OK" [ref=f5e244]
            - row [ref=f5e246]:
              - cell "php_extension" [ref=f5e247]
              - cell "json" [ref=f5e248]
              - cell [ref=f5e249]:
                - link [ref=f5e250] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/json
                  - generic [aria-hidden] [ref=f5e251]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e252]: 
              - cell [ref=f5e253]
              - cell "OK" [ref=f5e254]
            - row [ref=f5e256]:
              - cell "php_extension" [ref=f5e257]
              - cell "hash" [ref=f5e258]
              - cell [ref=f5e259]:
                - link [ref=f5e260] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/hash
                  - generic [aria-hidden] [ref=f5e261]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e262]: 
              - cell [ref=f5e263]
              - cell "OK" [ref=f5e264]
            - row [ref=f5e266]:
              - cell "php_extension" [ref=f5e267]
              - cell "fileinfo" [ref=f5e268]
              - cell [ref=f5e269]:
                - link [ref=f5e270] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/fileinfo
                  - generic [aria-hidden] [ref=f5e271]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e272]: 
              - cell [ref=f5e273]
              - cell "OK" [ref=f5e274]
            - row [ref=f5e276]:
              - cell "php_extension" [ref=f5e277]
              - cell "sodium" [ref=f5e278]
              - cell [ref=f5e279]:
                - link [ref=f5e280] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/sodium
                  - generic [aria-hidden] [ref=f5e281]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e282]: 
              - cell [ref=f5e283]
              - cell "OK" [ref=f5e284]
            - row [ref=f5e286]:
              - cell "php_extension" [ref=f5e287]
              - cell "exif" [ref=f5e288]
              - cell [ref=f5e289]:
                - link [ref=f5e290] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/exif
                  - generic [aria-hidden] [ref=f5e291]: 
                  - text: debería estar instalado y activado para conseguir los mejores resultados
                  - img "Abrir en una nueva ventana" [ref=f5e292]: 
              - cell [ref=f5e293]
              - cell "OK" [ref=f5e294]
            - row [ref=f5e296]:
              - cell "php_extension" [ref=f5e297]
              - cell "filter" [ref=f5e298]
              - cell [ref=f5e299]:
                - link [ref=f5e300] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_extension/filter
                  - generic [aria-hidden] [ref=f5e301]: 
                  - text: debe estar instalado/activado
                  - img "Abrir en una nueva ventana" [ref=f5e302]: 
              - cell [ref=f5e303]
              - cell "OK" [ref=f5e304]
            - row [ref=f5e306]:
              - cell "php_setting" [ref=f5e307]
              - cell "memory_limit" [ref=f5e308]
              - cell [ref=f5e309]:
                - link [ref=f5e310] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_setting/memory_limit
                  - generic [aria-hidden] [ref=f5e311]: 
                  - text: detectado ajuste recomendado
                  - img "Abrir en una nueva ventana" [ref=f5e312]: 
              - cell [ref=f5e313]
              - cell "OK" [ref=f5e314]
            - row [ref=f5e316]:
              - cell "php_setting" [ref=f5e317]
              - cell "file_uploads" [ref=f5e318]
              - cell [ref=f5e319]:
                - link [ref=f5e320] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_setting/file_uploads
                  - generic [aria-hidden] [ref=f5e321]: 
                  - text: detectado ajuste recomendado
                  - img "Abrir en una nueva ventana" [ref=f5e322]: 
              - cell [ref=f5e323]
              - cell "OK" [ref=f5e324]
            - row [ref=f5e326]:
              - cell "php_setting" [ref=f5e327]
              - cell "opcache.enable" [ref=f5e328]
              - cell [ref=f5e329]:
                - link [ref=f5e330] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_setting/opcache.enable
                  - generic [aria-hidden] [ref=f5e331]: 
                  - text: detectado ajuste recomendado
                  - img "Abrir en una nueva ventana" [ref=f5e332]: 
              - cell [ref=f5e333]
              - cell "OK" [ref=f5e334]
            - row [ref=f5e336]:
              - cell "php_setting" [ref=f5e337]
              - cell "zend.exception_ignore_args" [ref=f5e338]
              - cell [ref=f5e339]:
                - link [ref=f5e340] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/php_setting/zend.exception_ignore_args
                  - generic [aria-hidden] [ref=f5e341]: 
                  - text: detectado ajuste recomendado
                  - img "Abrir en una nueva ventana" [ref=f5e342]: 
              - cell [ref=f5e343]
              - cell "OK" [ref=f5e344]
        - heading "Otras comprobaciones" [level=2] [ref=f5e346]
        - table [ref=f5e348]:
          - rowgroup [ref=f5e349]:
            - row [ref=f5e350]:
              - columnheader "Información" [ref=f5e351]
              - columnheader "Informe" [ref=f5e352]
              - columnheader "Complemento" [ref=f5e353]
              - columnheader "Estado" [ref=f5e354]
          - rowgroup [ref=f5e355]:
            - row [ref=f5e356]:
              - cell "Router not configured" [ref=f5e357]
              - cell [ref=f5e358]:
                - link [ref=f5e359] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/custom_check/Router not configured
                  - generic [aria-hidden] [ref=f5e360]: 
                  - text: Si esta comprobación falla, ello indica un problema potencial
                  - img "Abrir en una nueva ventana" [ref=f5e361]: 
                - paragraph [ref=f5e362]: El router no está configurado.
              - cell [ref=f5e363]
              - cell "Revisar" [ref=f5e364]
            - row [ref=f5e366]:
              - cell "site not https" [ref=f5e367]
              - cell [ref=f5e368]:
                - link [ref=f5e369] [cursor=pointer]:
                  - /url: https://docs.moodle.org/503/es/admin/environment/custom_check/site not https
                  - generic [aria-hidden] [ref=f5e370]: 
                  - text: Si esta comprobación falla, ello indica un problema potencial
                  - img "Abrir en una nueva ventana" [ref=f5e371]: 
                - paragraph [ref=f5e372]: Se ha detectado que su sitio no se comunica a través de HTTPS. Se recomienda migrar su sitio a HTTPS para incrementar la seguridad y mejorar la integración con otros sistemas.
              - cell [ref=f5e373]
              - cell "Revisar" [ref=f5e374]
        - alert [ref=f5e376]:
          - text: Su entorno de servidor cumple todos los requerimientos mínimos.
          - button "Descartar esta notificación" [ref=f5e377] [cursor=pointer]
        - generic [ref=f5e379]: "NOTA: Moodle intentará descargar actualizaciones para sus paquetes de idioma durante la actualización."
        - button "Continuar" [ref=f5e382] [cursor=pointer]
    - contentinfo [ref=f5e383]:
      - generic: "?"
      - generic [ref=f5e384]:
        - generic [ref=f5e385]:
          - link "Documentación para esta página" [ref=f5e387] [cursor=pointer]:
            - /url: https://docs.moodle.org/503/es/admin/index
            - generic [aria-hidden] [ref=f5e388]: 
            - text: Documentación para esta página
          - link [ref=f5e390] [cursor=pointer]:
            - /url: https://moodle.com/help/?utm_source=CTA-banner&utm_medium=platform&utm_campaign=name~Moodle4+cat~lms+mp~no
            - generic [aria-hidden] [ref=f5e391]: 
            - text: Soporte y servicios
            - img "Abrir en una nueva ventana" [ref=f5e392]: 
          - link "Contactar con el soporte del sitio" [ref=f5e394] [cursor=pointer]:
            - /url: http://localhost:8090/user/contactsitesupport.php
            - generic [aria-hidden] [ref=f5e395]: 
            - text: Contactar con el soporte del sitio
        - generic [ref=f5e396]:
          - link "Resumen de retención de datos" [ref=f5e400] [cursor=pointer]:
            - /url: http://localhost:8090/admin/tool/dataprivacy/summary.php
          - link "Cambiar al tema estándar" [ref=f5e402] [cursor=pointer]:
            - /url: http://localhost:8090/theme/switchdevice.php?url=http%3A%2F%2Flocalhost%3A8090%2Fadmin%2Findex.php%3Fcache%3D0%26amp%3Bconfirmrelease%3D0%26amp%3Bconfirmplugincheck%3D0&device=default&sesskey=z0OP92kKEk
        - generic [ref=f5e403]:
          - generic [ref=f5e404]:
            - text: Desarrollado por
            - link "Moodle" [ref=f5e405] [cursor=pointer]:
              - /url: https://moodle.com
          - generic [ref=f5e406]: "Versión 5.3 (Build: 20261005)"
      - generic [ref=f5e408]:
        - link "Purgar todas las cachés" [ref=f5e410] [cursor=pointer]:
          - /url: http://localhost:8090/admin/purgecaches.php?confirm=1&sesskey=z0OP92kKEk&returnurl=%2Fadmin%2Findex.php%3Fcache%3D0%26confirmrelease%3D0%26confirmplugincheck%3D0
        - generic [ref=f5e412]:
          - text: "Instancias reactivas:"
          - generic [ref=f5e413]: Esta página no tiene instancias reactivas.
```

# Test source

```ts
  1   | // Pasos propios de spec-2: ajustes del plugin, examen de punta a punta y lectura del receptor y del registro.
  2   | import { expect, type Locator, type Page } from '@playwright/test';
  3   | import { abrirQuiz, botonIntento, elegir, enviarIntento, escribirEnsayo, esperarJS, login, receptor, siguientePagina } from '../../../factory/regresion/helpers';
  4   | 
  5   | export const AJUSTES = '/admin/settings.php?section=local_resultadoext';
  6   | export const REGISTRO = '/local/resultadoext/registro.php';
  7   | export const DESTINO_OK = 'http://receptor/resultados';
  8   | export const DESTINO_INEXISTENTE = 'http://receptor/ruta-inexistente';
  9   | 
  10  | // El cron corre cada 15 s, pero una vuelta puede tardar más si tiene otras tareas.
  11  | export const ESPERA_ENVIO = 120_000;
  12  | // El reintento es real: 60 s de backoff nativo, más la vuelta del cron y el timeout de 10 s de la llamada.
  13  | export const ESPERA_REINTENTO = 150_000;
  14  | // Prueba con un fallo y su reintento, más los inicios de sesión y el envío del examen.
  15  | export const DURACION_PRUEBA = 360_000;
  16  | 
  17  | export const campoDestino = (page: Page): Locator => page.locator('#id_s_local_resultadoext_destino');
  18  | export const campoMaxIntentos = (page: Page): Locator => page.locator('#id_s_local_resultadoext_maxintentos');
  19  | export const filaEnvio = (page: Page): Locator => page.locator('#local-resultadoext-envios tbody tr');
  20  | export const filasLlamadas = (page: Page): Locator => page.locator('#local-resultadoext-llamadas tbody tr');
  21  | export const tituloRegistro = (page: Page): Locator => page.locator('#region-main').getByRole('heading', { name: 'Registro de envíos al sistema externo' });
  22  | 
  23  | /** Inicia sesión como admin y guarda los ajustes indicados desde la UI. Al volver a abrir la página confirma que persistieron. */
  24  | export async function ajustarPlugin(page: Page, ajustes: { destino?: string; maxintentos?: number }) {
  25  |   await login(page, 'admin');
  26  |   await page.goto(AJUSTES);
  27  |   await esperarJS(page);
> 28  |   if (ajustes.destino !== undefined) await campoDestino(page).fill(ajustes.destino);
      |                                                               ^ TimeoutError: locator.fill: Timeout 15000ms exceeded.
  29  |   if (ajustes.maxintentos !== undefined) await campoMaxIntentos(page).selectOption(String(ajustes.maxintentos));
  30  |   const guardado = page.waitForResponse((r) => r.request().method() === 'POST' && r.url().includes('/admin/settings.php'));
  31  |   await page.locator('#adminsettings button[type="submit"]').click();
  32  |   await guardado;
  33  |   await page.goto(AJUSTES);
  34  |   if (ajustes.destino !== undefined) await expect(campoDestino(page)).toHaveValue(ajustes.destino);
  35  |   if (ajustes.maxintentos !== undefined) await expect(campoMaxIntentos(page)).toHaveValue(String(ajustes.maxintentos));
  36  | }
  37  | 
  38  | /**
  39  |  * Empieza un intento y responde bien las 5 preguntas automáticas. Devuelve el cmid.
  40  |  * Sin texto de ensayo, la pregunta queda en blanco: Moodle la cierra sin calificación manual (question_state::$gaveup),
  41  |  * así que get_total_mark() no es null y el intento tiene nota al enviarse. Con 5 de 6 puntos son 8,33 sobre 10.
  42  |  */
  43  | export async function responderExamen(page: Page, ensayo?: string): Promise<number> {
  44  |   const cmid = await abrirQuiz(page);
  45  |   await botonIntento(page).click();
  46  |   await elegir(page, 1, '12');
  47  |   await elegir(page, 2, 'Verdadero');
  48  |   await siguientePagina(page);
  49  |   await elegir(page, 3, '6');
  50  |   await elegir(page, 4, 'Verdadero');
  51  |   await siguientePagina(page);
  52  |   await elegir(page, 5, 'Verdadero');
  53  |   if (ensayo) await escribirEnsayo(page, 6, ensayo);
  54  |   return cmid;
  55  | }
  56  | 
  57  | /** Id del intento mostrado en la página de revisión. */
  58  | export const intentoEnRevision = (page: Page): number => Number(new URL(page.url()).searchParams.get('attempt'));
  59  | 
  60  | /** Responde, envía y devuelve el id del intento. */
  61  | export async function rendirExamen(page: Page): Promise<number> {
  62  |   await responderExamen(page);
  63  |   await enviarIntento(page);
  64  |   return intentoEnRevision(page);
  65  | }
  66  | 
  67  | export type Aviso = { cuerpo: any; headers: Record<string, string>; status: number | null; mode: string };
  68  | 
  69  | /** POST que llegaron al receptor para un intento. Filtrar por intento aísla la prueba de lo recibido antes. */
  70  | export async function avisosDe(page: Page, intento: number): Promise<Aviso[]> {
  71  |   const recibidos: Array<Omit<Aviso, 'cuerpo'> & { raw: string }> = await receptor(page, '/_recibidos');
  72  |   return recibidos.map((r) => ({ ...r, cuerpo: JSON.parse(r.raw) })).filter((a) => a.cuerpo.attempt === intento);
  73  | }
  74  | 
  75  | export const abrirRegistro = (page: Page, intento: number) => page.goto(`${REGISTRO}?intento=${intento}`);
  76  | 
  77  | /** Recarga el registro hasta que el envío del intento muestre ese estado. No acorta el backoff: solo observa. */
  78  | export async function esperarEstado(page: Page, intento: number, estado: string, espera: number) {
  79  |   await expect(async () => {
  80  |     await abrirRegistro(page, intento);
  81  |     await expect(filaEnvio(page)).toContainText(estado, { timeout: 1_000 });
  82  |   }).toPass({ timeout: espera, intervals: [3_000] });
  83  | }
  84  | 
  85  | export async function abrirLlamadas(page: Page, intento: number) {
  86  |   await abrirRegistro(page, intento);
  87  |   await page.locator('#local-resultadoext-envios').getByRole('link', { name: 'Ver llamadas' }).click();
  88  |   await expect(page.locator('#local-resultadoext-envio')).toBeVisible();
  89  | }
  90  | 
  91  | /** Como profesor, abre mode=grading y le pone 1 punto al ensayo con ese texto. Pueden convivir ensayos de otras pruebas. */
  92  | export async function calificarEnsayo(page: Page, cmid: number, texto: string) {
  93  |   await page.goto(`/mod/quiz/report.php?id=${cmid}&mode=grading`);
  94  |   const pregunta = page.getByRole('row', { name: /HIS-2 Ensayo/ });
  95  |   const enlace = await pregunta.locator('a[href*="grade=needsgrading"]').getAttribute('href');
  96  |   await page.goto(`${enlace}&pagesize=100`);
  97  |   await esperarJS(page);
  98  |   const ensayo = page.locator('#manualgradingform .que').filter({ hasText: texto });
  99  |   await ensayo.locator('input[name$="_-mark"]').fill('1');
  100 |   const guardado = page.waitForResponse((r) => r.request().method() === 'POST' && r.url().includes('/mod/quiz/report.php'));
  101 |   await page.locator('#manualgradingform input[type="submit"]').click();
  102 |   await guardado;
  103 | }
  104 | 
```