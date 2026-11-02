// Motor de IA de la fábrica: Claude Code en modo headless (`claude -p`).
// - Cada llamada usa una plantilla versionada de factory/prompts/ (no prompts improvisados).
// - El prompt renderizado y la transcripción completa (stream-json) quedan en la corrida y en ia/transcripciones/.
// - Herramientas restringidas por rol: el analista solo lee; el implementador solo escribe en salidas/<spec>/.
//   La restricción real se verifica DESPUÉS con git (ver cli.mjs: verificarAlcance), no se confía en la IA.
import fs from 'node:fs';
import path from 'node:path';
import { RAIZ, sh, escribir, leer } from './util.mjs';

const ROLES = {
  analista: { tools: ['Read', 'Glob', 'Grep'], maxTurns: 40 },
  implementador: { tools: ['Read', 'Glob', 'Grep', 'Write', 'Edit'], maxTurns: 120 },
  corrector: { tools: ['Read', 'Glob', 'Grep', 'Write', 'Edit'], maxTurns: 80 },
};

export function renderizar(plantilla, vars) {
  return leer(`factory/prompts/${plantilla}.md`).replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (!(k in vars)) throw new Error(`Plantilla ${plantilla}: falta la variable {{${k}}}`);
    return typeof vars[k] === 'string' ? vars[k] : JSON.stringify(vars[k], null, 2);
  });
}

/**
 * Llama a la IA. Devuelve { ok, texto, transcripcion }.
 * @param corrida  Corrida (para log y artefactos)
 * @param rol      analista | implementador | corrector
 * @param plantilla nombre en factory/prompts/
 * @param vars     variables de la plantilla
 * @param escritura prefijo de ruta donde puede escribir (relativo a la raíz)
 */
export function llamarIA(corrida, { rol, plantilla, vars, escritura }) {
  const cfg = ROLES[rol];
  const n = String(++corrida.nIA).padStart(2, '0');
  const prompt = renderizar(plantilla, vars);
  const base = corrida.ruta(`ia/${n}-${rol}`);
  escribir(`${base}.prompt.md`, prompt);

  const permitidas = cfg.tools.map((t) => (['Write', 'Edit'].includes(t) && escritura ? `${t}(${escritura}/**)` : t));
  const args = [
    '-p', '--output-format', 'stream-json', '--verbose',
    '--max-turns', String(cfg.maxTurns),
    '--permission-mode', 'acceptEdits',
    '--allowedTools', permitidas.join(','),
    '--disallowedTools', 'Bash,WebFetch,WebSearch,Task',
  ].map((a) => `'${a.replace(/'/g, "'\\''")}'`).join(' ');

  corrida.log(`ia:${rol}`, `Llamada ${n} con plantilla ${plantilla}.md (herramientas: ${permitidas.join(', ')})`, `prompt: ${base}.prompt.md`);
  const t0 = Date.now();
  const r = sh(`claude ${args}`, { input: prompt, timeout: 45 * 60_000 });
  const segs = Math.round((Date.now() - t0) / 1000);
  escribir(`${base}.transcripcion.jsonl`, r.out);
  // Copia en ia/ (rastro de dirección de IA exigido en la entrega).
  escribir(`ia/transcripciones/${corrida.id}/${n}-${rol}.jsonl`, r.out);
  escribir(`ia/transcripciones/${corrida.id}/${n}-${rol}.prompt.md`, prompt);

  let texto = '';
  let costo = null;
  let limite = null;
  for (const linea of r.out.split('\n')) {
    try {
      const ev = JSON.parse(linea);
      if (ev.type === 'result') { texto = ev.result || ''; costo = ev.total_cost_usd; }
      if (ev.api_error_status === 429 || ev.api_error === 'usage_limit_reached') limite = ev.message?.content?.[0]?.text || 'límite de uso (429)';
    } catch { /* línea no JSON */ }
  }
  if (limite) {
    // No es un fallo de la implementación: la IA no está disponible. No se consume un reintento.
    corrida.log(`ia:${rol}`, `LÍMITE DE USO DE LA IA en llamada ${n}: ${limite}`);
    const e = new Error(`Límite de uso de la IA: ${limite}`);
    e.limiteIA = true;
    throw e;
  }
  const ok = r.code === 0 && texto !== '';
  corrida.log(`ia:${rol}`, `Fin llamada ${n}: ${ok ? 'OK' : 'ERROR'} en ${segs}s${costo != null ? `, costo USD ${costo.toFixed(2)}` : ''}`,
    ok ? `respuesta final:\n${texto.slice(0, 3000)}` : `stderr:\n${r.err.slice(0, 3000)}`);
  return { ok, texto, transcripcion: `${base}.transcripcion.jsonl` };
}

/** Extrae el primer bloque ```json ... ``` de un texto. */
export function extraerJSON(texto) {
  const m = texto.match(/```json\s*([\s\S]*?)```/);
  const crudo = m ? m[1] : texto;
  return JSON.parse(crudo);
}

export { RAIZ };
