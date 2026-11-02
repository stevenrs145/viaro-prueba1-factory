// Ejecuta Playwright dentro del contenedor oficial (renderizado idéntico entre máquinas) y normaliza resultados.
import fs from 'node:fs';
import path from 'node:path';
import { RAIZ, DC, sh } from './util.mjs';

/**
 * @param archivos  rutas de .spec.ts (relativas a la raíz) o [] para toda la suite
 * @param out       carpeta de salida relativa a la raíz (allí quedan funcional.xml, resultados.json, visual/)
 * @param opciones  { crearLineasBaseFaltantes, grep }
 */
export function correrPruebas(archivos, out, { crearLineasBaseFaltantes = false, grep } = {}) {
  fs.rmSync(path.join(RAIZ, out, 'artefactos'), { recursive: true, force: true });
  const flags = [
    // Solo se crean líneas base que NO existen (pantallas nuevas). Una línea base existente nunca se
    // sobrescribe desde el pipeline: eso es una decisión humana (factory/cli.mjs aprobar-linea-base).
    crearLineasBaseFaltantes ? '--update-snapshots=missing' : '--update-snapshots=none',
    grep ? `--grep '${grep}'` : '',
  ].join(' ');
  // Con el UID/GID del usuario: si no, los artefactos quedan como root y el siguiente intento no puede limpiarlos.
  const cmd = `${DC} --profile qa run --rm -T --user "$(id -u):$(id -g)" -e HOME=/tmp -e QA_OUT=${out} qa npx playwright test ${archivos.join(' ')} ${flags}`;
  const r = sh(cmd, { timeout: 60 * 60_000 });
  const resultados = leerResultados(path.join(RAIZ, out, 'resultados.json'));
  return { code: r.code, salida: (r.out + r.err).replace(/^.*Container .*$/gm, '').trim(), resultados };
}

/** Aplana el reporte JSON de Playwright: [{titulo, archivo, proyecto, estado, error, tags, anotaciones}] */
export function leerResultados(ruta) {
  if (!fs.existsSync(ruta)) return [];
  const json = JSON.parse(fs.readFileSync(ruta, 'utf8'));
  const out = [];
  const recorrer = (suite, prefijo) => {
    for (const s of suite.suites || []) recorrer(s, [...prefijo, s.title].filter(Boolean));
    for (const spec of suite.specs || []) {
      for (const t of spec.tests || []) {
        const res = t.results?.[t.results.length - 1] || {};
        out.push({
          titulo: [...prefijo.slice(1), spec.title].join(' › '),
          archivo: spec.file,
          proyecto: t.projectName,
          estado: res.status || t.status, // passed | failed | timedOut | skipped | interrupted
          error: res.error?.message?.slice(0, 2500) || null,
          anotaciones: (t.annotations || []).map((a) => `${a.type}: ${a.description || ''}`),
        });
      }
    }
  };
  for (const s of json.suites || []) recorrer(s, [s.title]);
  return out;
}

export function resumen(resultados) {
  const c = { passed: 0, failed: 0, skipped: 0, otros: 0 };
  for (const r of resultados) {
    if (r.estado === 'passed') c.passed++;
    else if (r.estado === 'skipped') c.skipped++;
    else if (['failed', 'timedOut', 'interrupted'].includes(r.estado)) c.failed++;
    else c.otros++;
  }
  return c;
}

/** Contexto de fallo para la IA correctora: error + snapshot ARIA de la página al fallar (error-context.md). */
export function contextoFallos(out, resultados, max = 6) {
  const fallidas = resultados.filter((r) => !['passed', 'skipped'].includes(r.estado)).slice(0, max);
  const dirArt = path.join(RAIZ, out, 'artefactos');
  const contextos = fs.existsSync(dirArt)
    ? fs.readdirSync(dirArt).map((d) => path.join(dirArt, d, 'error-context.md')).filter((f) => fs.existsSync(f))
    : [];
  return fallidas.map((f) => `### ${f.proyecto} · ${f.titulo}\n${f.error}`).join('\n\n')
    + (contextos.length ? `\n\n## Estado de la página al fallar (ARIA)\n${contextos.slice(0, 3).map((c) => fs.readFileSync(c, 'utf8').slice(0, 6000)).join('\n---\n')}` : '');
}
