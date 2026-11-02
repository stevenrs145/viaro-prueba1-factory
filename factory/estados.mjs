#!/usr/bin/env node
// Prueba de estado.json y de la detención BLOQUEADO, en un clon temporal y sin IA.
// Usa --reanudar con un plan fijado para llegar a la etapa de análisis sin llamar al analista.
// Necesita Moodle en marcha (precondición de `run`), pero no lo modifica: se detiene antes de desplegar.
//
// Uso: node factory/estados.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { RAIZ } from './lib/util.mjs';

const CLON = fs.mkdtempSync(path.join(os.tmpdir(), 'estados-'));
const bash = (cmd) => spawnSync('bash', ['-c', cmd], { cwd: CLON, encoding: 'utf8' });
const SPEC = 'specs/spec-prueba.md';
const RAMA = 'factory/spec-prueba-bloqueo';
const DIR = 'salidas/spec-prueba';
let fallos = 0;
const comprobar = (ok, texto, nota = '') => { console.log(`${ok ? '✅' : '❌'} ${texto}${ok || !nota ? '' : `\n   ${nota}`}`); if (!ok) fallos++; };

const plan = (bloqueante) => ({
  spec_id: 'spec-prueba', titulo: 'prueba', naturaleza: 'agrega', capa_justificacion: 'prueba', componente: null,
  criterios: [{ id: 'CA-1', texto: 'x', verificacion: 'funcional' }],
  bordes: [{ descripcion: '¿Se puede reintentar?', decision: '', criterio: 'Cambia lo prometido al estudiante.', preguntaria: '¿Cuántos reintentos permite producto?', bloqueante }],
});
const ultimaCorrida = () => { const d = path.join(CLON, 'corridas'); return fs.readdirSync(d).filter((x) => x.endsWith('-spec-prueba')).sort().at(-1); };

try {
  const c = spawnSync('git', ['clone', '-q', '--branch', 'main', RAIZ, CLON], { encoding: 'utf8' });
  if (c.status !== 0) throw new Error(c.stderr);
  // Sin origin: ninguna rama de esta prueba puede llegar al repo real.
  bash(`git remote remove origin && git config user.email a@example.invalid && git config user.name estados`);
  fs.writeFileSync(path.join(CLON, SPEC), 'id: spec-prueba\n\nSpec de prueba.\n');
  bash(`git add -A && git commit -qm spec`);

  // 1) Ambigüedad bloqueante: se detiene, explica y no construye.
  bash(`git checkout -q -b ${RAMA}`);
  fs.mkdirSync(path.join(CLON, DIR), { recursive: true });
  fs.writeFileSync(path.join(CLON, DIR, 'plan.json'), JSON.stringify(plan(true)));
  bash(`git add -A && git commit -qm plan && git checkout -q main`);
  const r = bash(`node factory/cli.mjs run ${SPEC} --reanudar ${RAMA}`);
  comprobar(r.status === 4, 'Borde bloqueante: exit 4', `exit=${r.status} ${r.stdout.slice(-400)}${r.stderr.slice(-400)}`);
  comprobar(bash('git branch --show-current').stdout.trim() === 'main', 'Vuelve a main');
  comprobar(bash('git status --porcelain').stdout.trim() === '', 'Árbol limpio tras detenerse');
  bash(`git checkout -q ${RAMA}`);
  const id = ultimaCorrida();
  const e = JSON.parse(fs.readFileSync(path.join(CLON, 'corridas', id, 'estado.json'), 'utf8'));
  const pregunta = fs.readFileSync(path.join(CLON, 'corridas', id, 'pregunta.md'), 'utf8');
  console.log(`   estado.json: global=${e.estado} ${Object.entries(e.etapas).map(([k, v]) => `${k}=${v.estado}`).join(' ')}`);
  comprobar(e.estado === 'BLOQUEADO', 'estado.json global BLOQUEADO');
  comprobar(e.etapas.precondicion.estado === 'VALIDADO' && e.etapas.analisis.estado === 'BLOQUEADO', 'precondicion VALIDADO y analisis BLOQUEADO');
  comprobar(['sondas', 'implementacion', 'pruebas', 'mutacion', 'regresion', 'alcance', 'honestidad', 'pr'].every((k) => e.etapas[k].estado === 'PENDIENTE'), 'Las etapas siguientes siguen PENDIENTE: no se construyó nada');
  comprobar(pregunta.includes('¿Cuántos reintentos permite producto?'), 'pregunta.md trae la pregunta a producto');
  bash('git checkout -q main');

  // 2) Fallo de precondición: FALLIDO, sin tocar la rama actual.
  fs.writeFileSync(path.join(CLON, 'sucio.txt'), 'x');
  const s = bash(`node factory/cli.mjs run ${SPEC}`);
  const f = JSON.parse(fs.readFileSync(path.join(CLON, 'corridas', ultimaCorrida(), 'estado.json'), 'utf8'));
  console.log(`   estado.json: global=${f.estado} precondicion=${f.etapas.precondicion.estado}`);
  comprobar(s.status === 1 && f.estado === 'FALLIDO' && f.etapas.precondicion.estado === 'FALLIDO', 'Árbol sucio: exit 1 y estado FALLIDO en precondicion', `exit=${s.status}`);
  fs.rmSync(path.join(CLON, 'sucio.txt'));
  fs.rmSync(path.join(CLON, 'corridas', ultimaCorrida()), { recursive: true });

  // 3) Plan inválido: bloqueante sin pregunta no llega a usarse como plan.
  bash(`git checkout -q ${RAMA}`);
  const malo = plan(true); delete malo.bordes[0].preguntaria;
  fs.writeFileSync(path.join(CLON, DIR, 'plan.json'), JSON.stringify(malo));
  bash(`git add -A && git commit -qm malo && git checkout -q main`);
  const i = bash(`node factory/cli.mjs run ${SPEC} --reanudar ${RAMA}`);
  const g = JSON.parse(fs.readFileSync(path.join(CLON, 'corridas', ultimaCorrida(), 'estado.json'), 'utf8'));
  console.log(`   estado.json: global=${g.estado} analisis=${g.etapas.analisis.estado} detalle=${g.etapas.analisis.detalle}`);
  comprobar(i.status === 1 && g.etapas.analisis.estado === 'FALLIDO', 'Excepción: la etapa en curso queda FALLIDO (no PENDIENTE para siempre)', `exit=${i.status}`);
} finally {
  fs.rmSync(CLON, { recursive: true, force: true });
}
console.log(fallos ? `\n${fallos} comprobación(es) fallaron.` : '\nTodas las comprobaciones pasaron.');
process.exitCode = fallos ? 1 : 0;
