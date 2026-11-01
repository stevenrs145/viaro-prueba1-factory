// Análisis estático de archivos de prueba Playwright, SIN IA y sin depender del generador.
// Extrae, por prueba: título, línea, cantidad de asserts, matchers usados, omisiones, opciones de captura.
// Es deliberadamente simple (léxico + balanceo de llaves) para que un humano pueda auditarlo línea por línea.

export const MATCHERS_DEBILES = new Set([
  'toBeTruthy', 'toBeFalsy', 'toBeDefined', 'toBeUndefined', 'toBeNull', 'toBeNaN', 'toBeAttached',
  'toBeGreaterThanOrEqual', 'toBeLessThanOrEqual', 'toBeInstanceOf', 'anything', 'any',
]);

/** Quita comentarios y contenido de strings (conserva longitudes para mapear líneas). */
function enmascarar(src) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    const c = src[i], n = src[i + 1];
    if (c === '/' && n === '/') { while (i < src.length && src[i] !== '\n') { out += ' '; i++; } continue; }
    if (c === '/' && n === '*') { while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) { out += src[i] === '\n' ? '\n' : ' '; i++; } out += '  '; i += 2; continue; }
    if (c === '"' || c === "'" || c === '`') {
      const q = c; out += q; i++;
      while (i < src.length && src[i] !== q) { if (src[i] === '\\') { out += '  '; i += 2; continue; } out += src[i] === '\n' ? '\n' : '_'; i++; }
      out += q; i++; continue;
    }
    out += c; i++;
  }
  return out;
}

const linea = (src, idx) => src.slice(0, idx).split('\n').length;

function cierre(m, desde) {
  // desde = índice de '(' ; devuelve índice del ')' que lo cierra
  let prof = 0;
  for (let i = desde; i < m.length; i++) {
    if (m[i] === '(' || m[i] === '{' || m[i] === '[') prof++;
    else if (m[i] === ')' || m[i] === '}' || m[i] === ']') { prof--; if (prof === 0) return i; }
  }
  return m.length - 1;
}

export function analizarArchivo(archivo, src) {
  const m = enmascarar(src);
  const pruebas = [];
  const re = /\b(test|it)(\.(only|skip|fixme|fail))?\s*\(\s*(['"`])/g;
  let x;
  while ((x = re.exec(m))) {
    const inicio = x.index;
    const parAbre = m.indexOf('(', inicio);
    const parCierra = cierre(m, parAbre);
    const q = x[4];
    const tIni = m.indexOf(q, parAbre) + 1;
    const tFin = m.indexOf(q, tIni);
    const titulo = src.slice(tIni, tFin);
    const cuerpoM = m.slice(parAbre, parCierra + 1);
    const cuerpo = src.slice(parAbre, parCierra + 1);
    const matchers = [...cuerpoM.matchAll(/\.\s*(not\s*\.\s*)?(to[A-Z]\w*)\s*\(/g)].map((y) => (y[1] ? 'not.' : '') + y[2]);
    pruebas.push({
      archivo, titulo, linea: linea(src, inicio),
      modificador: x[3] || null,
      asserts: (cuerpoM.match(/\bexpect\s*(\.\s*soft\s*)?\(/g) || []).length,
      soft: (cuerpoM.match(/\bexpect\s*\.\s*soft\s*\(/g) || []).length,
      matchers: matchers.sort(),
      fuertes: matchers.filter((k) => !MATCHERS_DEBILES.has(k.replace(/^not\./, ''))).length,
      capturas: (cuerpoM.match(/toHaveScreenshot\s*\(/g) || []).length,
      opcionesCaptura: [...cuerpo.matchAll(/(maxDiffPixels|maxDiffPixelRatio|threshold)\s*:\s*([\d.]+)/g)].map((y) => `${y[1]}=${y[2]}`),
      mascaras: (cuerpoM.match(/\bmask\s*:/g) || []).length,
      triviales: [...cuerpo.matchAll(/expect\s*\(\s*(true|false|null|undefined|\d+|'[^']*'|"[^"]*")\s*\)/g)].map((y) => y[0]),
      tragaErrores: /\.catch\s*\(\s*\(\s*\w*\s*\)\s*=>\s*(\{\s*\}|undefined|null|true|false)\s*\)|catch\s*(\(\s*\w*\s*\))?\s*\{\s*\}/.test(cuerpo),
      mockRed: /\b(route\.fulfill|page\.route|context\.route|routeFromHAR)\b/.test(cuerpoM),
      tags: [...titulo.matchAll(/(@[\w-]+|\[(CA-\d+|HUMO|REG-[\w-]+)\])/g)].map((y) => y[1]),
    });
  }
  // skip/fixme/only dinámicos o a nivel describe (dentro o fuera de pruebas)
  const omisiones = [...m.matchAll(/\b(test|describe|it)(\.describe)?\.(skip|fixme|only)\s*\(/g)].map((y) => ({ tipo: y[3], linea: linea(src, y.index), texto: src.slice(y.index, src.indexOf('\n', y.index)).trim() }));
  return { archivo, pruebas, omisiones };
}

export const idPrueba = (p) => `${p.archivo}::${p.titulo}`;
