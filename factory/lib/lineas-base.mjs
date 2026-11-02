// Registro de líneas base visuales. Actualizar una línea base es una decisión EXPLÍCITA y trazable:
//  - el pipeline solo puede CREAR líneas base de pantallas nuevas, y quedan "pendiente" (origen: pipeline)
//  - cambiar una existente o aprobar una pendiente requiere `aprobar-linea-base --razon` (origen: humano)
// El control de honestidad compara contra APROBACIONES.json de main.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { RAIZ } from './util.mjs';

const DIR = 'visual/lineas-base';
const REG = `${DIR}/APROBACIONES.json`;
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(path.join(RAIZ, f))).digest('hex');
const leerReg = () => (fs.existsSync(path.join(RAIZ, REG)) ? JSON.parse(fs.readFileSync(path.join(RAIZ, REG), 'utf8')) : {});
const guardar = (r) => fs.writeFileSync(path.join(RAIZ, REG), JSON.stringify(Object.fromEntries(Object.entries(r).sort()), null, 2) + '\n');

/** PNG en visual/lineas-base sin entrada en el registro: una corrida reanudada puede traerlos ya versionados en su rama. */
export function lineasBaseNuevas() {
  const r = leerReg();
  return fs.readdirSync(path.join(RAIZ, DIR)).filter((f) => f.endsWith('.png') && !r[f]);
}

export function registrarPendientes(pngs, specId) {
  const r = leerReg();
  for (const p of pngs) r[p] = { sha256: sha(`${DIR}/${p}`), origen: 'pipeline', estado: 'pendiente-aprobacion-humana', spec: specId, razon: `Pantalla nueva introducida por ${specId}`, fecha: new Date().toISOString() };
  guardar(r);
}

/** Línea base EXISTENTE que el spec cambia a propósito: propuesta del pipeline, no aprobada. */
export function proponerLineasBase(pngs, specId) {
  const r = leerReg();
  for (const p of pngs) r[p] = { ...(r[p] || {}), sha256: sha(`${DIR}/${p}`), origen: 'pipeline', estado: 'propuesta-cambio', spec: specId, reemplaza: r[p]?.sha256, razon: `Cambio visual declarado por ${specId} (pantallas_afectadas)`, fecha: new Date().toISOString() };
  guardar(r);
}

export function aprobarLineaBase(objetivos, razon, quien) {
  const r = leerReg();
  const todos = fs.readdirSync(path.join(RAIZ, DIR)).filter((f) => f.endsWith('.png'));
  const lista = objetivos?.length ? objetivos.map((o) => path.basename(o))
    : todos.filter((p) => !r[p] || r[p].estado !== 'aprobada' || r[p].sha256 !== sha(`${DIR}/${p}`));
  const hechos = [];
  for (const p of lista) {
    if (!todos.includes(p)) throw new Error(`No existe ${DIR}/${p}`);
    const anterior = r[p]?.sha256;
    r[p] = { sha256: sha(`${DIR}/${p}`), origen: 'humano', estado: 'aprobada', aprobado_por: quien, razon, fecha: new Date().toISOString(), ...(anterior && anterior !== sha(`${DIR}/${p}`) ? { reemplaza: anterior } : {}) };
    hechos.push(`${p}  (${r[p].sha256.slice(0, 12)}${r[p].reemplaza ? `, reemplaza ${r[p].reemplaza.slice(0, 12)}` : ''})`);
  }
  guardar(r);
  return hechos;
}
