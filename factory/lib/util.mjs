// Utilidades sin dependencias: shell, rutas, registro de corrida.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const MOODLE_SRC = path.join(RAIZ, 'entorno/.moodle-src');
export const DC = 'docker compose -f entorno/docker-compose.yml';

/** Ejecuta un comando bash en la raíz del repo. Nunca lanza: devuelve {code, out, err}. */
export function sh(cmd, { timeout = 15 * 60_000, input, cwd = RAIZ, env } = {}) {
  const r = spawnSync('bash', ['-c', cmd], {
    cwd, input, timeout, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024,
    env: { ...process.env, ...env },
  });
  return { code: r.status ?? (r.signal ? 124 : 1), out: r.stdout || '', err: (r.stderr || '') + (r.error ? String(r.error) : '') };
}

export function shOk(cmd, opts) {
  const r = sh(cmd, opts);
  if (r.code !== 0) throw new Error(`Falló: ${cmd}\n${r.err || r.out}`);
  return r.out;
}

export const sello = () => new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
export const leer = (p) => fs.readFileSync(path.resolve(RAIZ, p), 'utf8');
export const existe = (p) => fs.existsSync(path.resolve(RAIZ, p));
export function escribir(p, contenido) {
  const abs = path.resolve(RAIZ, p);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, contenido);
  return abs;
}

/** Lista archivos recursivamente (rutas relativas a RAIZ). */
export function archivos(dir, filtro = () => true) {
  const abs = path.resolve(RAIZ, dir);
  if (!fs.existsSync(abs)) return [];
  const out = [];
  for (const e of fs.readdirSync(abs, { withFileTypes: true, recursive: true })) {
    if (!e.isFile()) continue;
    const rel = path.relative(RAIZ, path.join(e.parentPath ?? e.path, e.name));
    if (filtro(rel)) out.push(rel);
  }
  return out.sort();
}

/**
 * Corrida: una carpeta corridas/<fecha-hora>[-etiqueta]/ con pipeline.log.
 * El log es la fuente de verdad de qué se pidió a la IA, qué se validó, qué falló y qué se reintentó.
 */
export class Corrida {
  constructor(etiqueta) {
    this.id = `${sello()}${etiqueta ? '-' + etiqueta : ''}`;
    this.dir = `corridas/${this.id}`;
    fs.mkdirSync(path.join(RAIZ, this.dir, 'ia'), { recursive: true });
    this.logPath = path.join(RAIZ, this.dir, 'pipeline.log');
    this.nIA = 0;
    this.estado = null;
  }
  /** Crea corridas/<id>/estado.json con todas las etapas en PENDIENTE. */
  iniciarEstado(etapas, datos = {}) {
    const inicial = Object.fromEntries(etapas.map((e) => [e, { estado: 'PENDIENTE', detalle: null, actualizado: null }]));
    this.estado = { corrida: this.id, ...datos, estado: 'PENDIENTE', etapas: inicial };
    this.guardarEstado();
  }
  /** Registra el estado de una etapa: EJECUTADO, VALIDADO, FALLIDO o BLOQUEADO. */
  etapa(nombre, estado, detalle = null) {
    if (!this.estado) return;
    this.estado.etapas[nombre] = { estado, detalle, actualizado: new Date().toISOString() };
    this.guardarEstado();
  }
  /** La primera etapa sin terminar: donde se detuvo la corrida si algo la interrumpe. */
  etapaEnCurso() {
    return Object.entries(this.estado?.etapas || {}).find(([, e]) => e.estado === 'PENDIENTE')?.[0] || null;
  }
  guardarEstado() {
    const v = Object.values(this.estado.etapas).map((e) => e.estado);
    this.estado.estado = v.includes('FALLIDO') ? 'FALLIDO'
      : v.includes('BLOQUEADO') ? 'BLOQUEADO'
        : v.includes('PENDIENTE') ? (v.every((x) => x === 'PENDIENTE') ? 'PENDIENTE' : 'EJECUTADO')
          : 'VALIDADO';
    fs.writeFileSync(path.join(RAIZ, this.dir, 'estado.json'), JSON.stringify(this.estado, null, 2) + '\n');
  }
  log(etapa, msg, detalle) {
    const linea = `[${new Date().toISOString()}] [${etapa}] ${msg}`;
    console.log(linea);
    fs.appendFileSync(this.logPath, linea + '\n' + (detalle ? indent(String(detalle)) + '\n' : ''));
  }
  ruta(rel) { return `${this.dir}/${rel}`; }
}

const indent = (s) => s.split('\n').slice(0, 400).map((l) => '    ' + l).join('\n');
