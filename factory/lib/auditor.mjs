// Lanzador del control de verificación honesta.
// El auditor que se ejecuta es el de la rama main, extraído a un directorio temporal: la copia de trabajo es lo
// auditado y no puede ser también quien audita. Si no se puede ejecutar, el resultado es un hallazgo (nunca "OK").
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { RAIZ, sh } from './util.mjs';

const ARCHIVOS = ['verificar.mjs', 'analisis.mjs'];

const noEjecutable = (regla, detalle) => {
  const hallazgos = [{ regla, donde: 'factory/lib/auditor.mjs', detalle }];
  return { hallazgos, texto: `HONESTIDAD: BLOQUEADO — 1 hallazgo(s). El pipeline no puede llegar al pull request.\n\n1. [${regla}] ${detalle}\n` };
};

export function auditar({ resultados, sinFeature, plan } = {}) {
  const ref = process.env.HONESTIDAD_REF || 'main';
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'auditor-'));
  try {
    for (const f of ARCHIVOS) {
      const r = sh(`git show ${ref}:factory/honestidad/${f}`);
      if (r.code !== 0) return noEjecutable('AUDITOR-NO-DISPONIBLE', `No se pudo extraer factory/honestidad/${f} de ${ref}.`);
      fs.writeFileSync(path.join(tmp, f), r.out);
    }
    const args = [];
    const pasar = (bandera, nombre, valor) => {
      if (valor === undefined || valor === null) return;
      fs.writeFileSync(path.join(tmp, nombre), JSON.stringify(valor));
      args.push(bandera, path.join(tmp, nombre));
    };
    pasar('--resultados', 'resultados.json', resultados);
    pasar('--sin-feature', 'sin-feature.json', sinFeature);
    pasar('--plan', 'plan.json', plan);
    const salida = path.join(tmp, 'hallazgos.json');
    const r = spawnSync(process.execPath, [path.join(tmp, 'verificar.mjs'), ...args, '--json', salida], {
      cwd: RAIZ, encoding: 'utf8', env: { ...process.env, HONESTIDAD_RAIZ: RAIZ, HONESTIDAD_REF: ref },
    });
    if (![0, 1].includes(r.status) || !fs.existsSync(salida)) {
      return noEjecutable('AUDITOR-NO-EJECUTABLE', `El auditor de ${ref} terminó con código ${r.status}: ${(r.stderr || '').slice(0, 500)}`);
    }
    return { hallazgos: JSON.parse(fs.readFileSync(salida, 'utf8')), texto: r.stdout };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}
