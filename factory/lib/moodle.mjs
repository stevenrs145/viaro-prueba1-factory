// Operaciones sobre la instancia de Moodle: desplegar/retirar plugins generados, verificar que el core
// quedó intacto, resetear estado y validar sintaxis PHP. Todo determinista, sin IA.
import fs from 'node:fs';
import path from 'node:path';
import { RAIZ, MOODLE_SRC, DC, sh, archivos } from './util.mjs';

const php = (args) => sh(`${DC} exec -T -u www-data web php ${args}`, { timeout: 10 * 60_000 });

/** Plugins presentes en salidas/<spec>/codigo: directorios con version.php. Devuelve [{componente, rel}] */
export function pluginsDe(specDir) {
  const base = `${specDir}/codigo`;
  return archivos(base, (f) => f.endsWith('/version.php')).map((f) => {
    const rel = path.relative(base, path.dirname(f)); // p. ej. public/mod/quiz/accessrule/reconocimiento
    const src = fs.readFileSync(path.join(RAIZ, f), 'utf8');
    const m = src.match(/\$plugin->component\s*=\s*['"]([a-z0-9_]+)['"]/);
    return { componente: m ? m[1] : null, rel, versionFile: f };
  });
}

export function lintPHP(specDir) {
  const fallos = [];
  for (const f of archivos(`${specDir}/codigo`, (x) => x.endsWith('.php'))) {
    // El contenedor web no monta la raíz del repo: se pasa el contenido por stdin (php -l lee stdin).
    const r = sh(`${DC} exec -T web php -l`, { input: fs.readFileSync(path.join(RAIZ, f), 'utf8') });
    if (r.code !== 0) fallos.push(`${f}: ${(r.out + r.err).trim()}`);
  }
  return fallos;
}

/** Copia los plugins generados al árbol de Moodle y corre la actualización. */
export function desplegar(specDir) {
  const plugins = pluginsDe(specDir);
  for (const p of plugins) {
    const destino = path.join(MOODLE_SRC, p.rel);
    fs.rmSync(destino, { recursive: true, force: true });
    fs.cpSync(path.join(RAIZ, specDir, 'codigo', p.rel), destino, { recursive: true });
  }
  const up = php('admin/cli/upgrade.php --non-interactive --allow-unstable');
  const purge = php('admin/cli/purge_caches.php');
  return { plugins, ok: up.code === 0 && !/error|exception/i.test(up.out.slice(-2000)), salida: (up.out + up.err).slice(-6000), purge: purge.code === 0 };
}

/** Desinstala y quita del árbol los plugins de un spec (para la prueba "sin la funcionalidad"). */
export function retirar(specDir) {
  const plugins = pluginsDe(specDir).filter((p) => p.componente);
  if (!plugins.length) return { ok: true, salida: 'sin plugins' };
  const r = php(`admin/cli/uninstall_plugins.php --plugins=${plugins.map((p) => p.componente).join(',')} --run`);
  for (const p of plugins) fs.rmSync(path.join(MOODLE_SRC, p.rel), { recursive: true, force: true });
  php('admin/cli/purge_caches.php');
  return { ok: r.code === 0, salida: (r.out + r.err).slice(-4000) };
}

/**
 * El core de Moodle no se toca: en el árbol de Moodle solo pueden aparecer directorios NUEVOS que sean
 * plugins generados por la fábrica. Cualquier archivo modificado/borrado del core => violación.
 */
export function verificarCoreIntacto(rutasPermitidas) {
  const r = sh('git status --porcelain --untracked-files=normal', { cwd: MOODLE_SRC });
  const violaciones = [];
  for (const linea of r.out.split('\n').filter(Boolean)) {
    const estado = linea.slice(0, 2);
    const ruta = linea.slice(3).replace(/\/$/, '');
    if (ruta === 'vendor' || ruta.startsWith('vendor/')) continue; // Composer
    const permitido = estado === '??' && rutasPermitidas.some((p) => ruta === p || ruta.startsWith(p + '/') || p.startsWith(ruta + '/'));
    if (!permitido) violaciones.push(linea);
  }
  return violaciones;
}

export function reset() {
  const a = sh(`${DC} exec -T -u www-data web php /opt/seed/reset.php`);
  // Tareas ad hoc en cola (p. ej. limpieza tras borrar actividades, migraciones de mod_qbank) se ejecutan ahora,
  // no a mitad de una prueba: el estado inicial de cada corrida es siempre el mismo.
  const t = sh(`${DC} exec -T -u www-data web php admin/cli/adhoc_task.php --execute`);
  const b = sh(`${DC} exec -T web curl -s -X POST http://receptor/_reset`);
  return { ok: a.code === 0 && b.code === 0, salida: a.out + a.err + b.out + (t.code ? t.err : '') };
}

export function moodleArriba() {
  return sh('curl -s -o /dev/null -w "%{http_code}" http://localhost:8090/login/index.php').out === '200';
}
