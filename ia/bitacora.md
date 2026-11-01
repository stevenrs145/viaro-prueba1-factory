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
