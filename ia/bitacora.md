# Bitácora de dirección de IA

## 2026-11-01 — Análisis del enunciado

- **Pedí:** analizar el enunciado y proponer primeros pasos.
- **IA propuso:** preguntas de aclaración estándar (qué es "tema", formato del receptor).
- **Decidí yo:** rechazar esas preguntas por genéricas — es una prueba que reciben todos los candidatos — y pedir una segunda pasada buscando trampas contrastando el spec con el comportamiento real de Moodle.
- **Resultado de la segunda pasada:** bordes B1–B8 (ver `documentacion.md`). El más importante: el spec 3 nombra "retroalimentación general" pero describe la *overall feedback*; en Moodle en español "retroalimentación general" es la retro por pregunta, que está fuera de alcance.
- **Validación:** se verificó en fuentes (tracker MDL-74610) la existencia de grade items en el quiz; la terminología de la UI en español queda por confirmar en la instancia levantada.

## 2026-11-01 — Entorno

- Verificado: WSL2 + Ubuntu, Docker Desktop (backend WSL2), Node 24, Git, gh.
- Corregido: la distro arrancaba como root porque el UID por defecto (1000) no existía; el usuario real es 1001.
- Decidí construir dentro del filesystem de WSL (no en `/mnt/c`) por rendimiento de I/O de Moodle y porque replica la máquina de evaluación.
- Versión objetivo: Moodle 5.3.0, verificada con `git ls-remote` contra el repo oficial.

## 2026-11-01 — Levantar Moodle 5.3: lo que la documentación previa no dice

Cada punto fue un fallo real en una corrida del setup, diagnosticado y corregido (ver historial de git de `entorno/`):

1. **Composer obligatorio** desde 5.1: dependencias (php-di, slim...) en `vendor/` en la raíz, fuera de `public/`.
2. **Scripts CLI en `admin/cli` de la raíz**, no en `public/admin/cli` (la IA lo asumió mal la primera vez; se verificó listando el árbol).
3. **PostgreSQL 17 requerido** (con 16 el instalador lo rechaza en el chequeo de entorno).
4. **`install_database.php` y el manejador de excepciones CLI pueden salir con código 0 tras fallar.** Decisión: el setup verifica el resultado consultando la BD, no confía en el exit code.
5. Los generadores de datos de Moodle cargan PHPUnit: hacen falta dependencias de desarrollo de Composer para sembrar.
6. `quiz_update_sumgrades()` ya no existe: se usa `quiz_settings::get_grade_calculator()->recompute_quiz_sumgrades()`.
7. La imagen `moodlehq/moodle-php-apache` toma el DocumentRoot de `APACHE_DOCUMENT_ROOT`; un `sed` sobre el vhost no tiene efecto.
8. Moodle bloquea por defecto salidas HTTP a rangos privados y puertos != 80/443: relevante para el spec 2 (receptor en la red de Docker).

Decisión de QA visual tomada aquí: las pruebas corren dentro de la imagen oficial de Playwright (misma versión que el paquete npm)
y no en el navegador del host, para que fuentes y renderizado sean idénticos en cualquier máquina. Apache escucha también en 8090
para que ese contenedor use la misma URL (wwwroot) que el host.
