#!/usr/bin/env node
// Prueba del auditor con sabotajes reales: cada caso altera de verdad un clon temporal del repo, ejecuta
// `node factory/cli.mjs honestidad` y exige que el auditor bloquee con la regla esperada.
// No toca este repo ni usa IA ni Moodle. Los casos de ejecución reciben resultados sintéticos: prueban la regla
// del auditor, no la corrida real de Playwright.
//
// Uso: node factory/sabotajes.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { RAIZ } from './lib/util.mjs';

const CLON = fs.mkdtempSync(path.join(os.tmpdir(), 'sabotajes-'));
const bash = (cmd, cwd = CLON) => spawnSync('bash', ['-c', cmd], { cwd, encoding: 'utf8' });
const ruta = (p) => path.join(CLON, p);
const editar = (p, fn) => { const a = fs.readFileSync(ruta(p), 'utf8'); const b = fn(a); if (a === b) throw new Error(`El sabotaje no cambió ${p}`); fs.writeFileSync(ruta(p), b); };
const json = (p, v) => fs.writeFileSync(ruta(p), JSON.stringify(v));

const PRUEBA = 'factory/regresion/sabotaje.spec.ts';
const TITULO = '[REG-sab] prueba de referencia @camino-error';
const CONFIG = 'playwright.config.ts';
const VERIFICAR = 'factory/honestidad/verificar.mjs';
const LB = 'visual/lineas-base';
const APROB = `${LB}/APROBACIONES.json`;
const nuevaPrueba = (cuerpo) => fs.writeFileSync(ruta('factory/regresion/nueva.spec.ts'), `import { test, expect } from '@playwright/test';\n${cuerpo}\n`);
const res = (titulo, estado, extra = {}) => ({ titulo, archivo: PRUEBA, proyecto: 'escritorio', estado, anotaciones: [], ...extra });

// Referencia aprobada en el main del clon: una prueba con captura y máscara, y una línea base firmada.
function prepararReferencia() {
  fs.writeFileSync(ruta(PRUEBA), `import { test, expect } from '@playwright/test';
test('${TITULO}', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Hola');
  await expect(page).toHaveScreenshot('sab.png', { mask: [page.locator('time')] });
});
`);
  fs.writeFileSync(ruta(`${LB}/sab--escritorio.png`), 'imagen-aprobada');
  const sha256 = crypto.createHash('sha256').update('imagen-aprobada').digest('hex');
  json(APROB, { 'sab--escritorio.png': { sha256, razon: 'referencia de sabotajes', origen: 'humano' } });
  const r = bash(`git config user.email a@example.invalid && git config user.name sabotaje && node factory/cli.mjs aprobar-pruebas --razon "referencia para los sabotajes" && git add -A && git commit -qm referencia`);
  if (r.status !== 0) throw new Error(r.stderr || r.stdout);
}

const quitar = (txt) => (s) => s.replace(txt, '');
const CASOS = [
  ['Assert eliminado', 'ASSERTS-REDUCIDOS', () => editar(PRUEBA, quitar(`  await expect(page.locator('h1')).toHaveText('Hola');\n`))],
  ['Matcher debilitado', 'MATCHER-DEBILITADO', () => editar(PRUEBA, (s) => s.replace(`toHaveText('Hola')`, 'toBeAttached()'))],
  ['await quitado', 'ASSERT-SIN-AWAIT', () => editar(PRUEBA, (s) => s.replace(`await expect(page.locator('h1'))`, `expect(page.locator('h1'))`))],
  ['Assert sobre un literal', 'ASSERT-TRIVIAL', () => nuevaPrueba(`test('t', async () => { expect(true).toBe(true); });`)],
  ['Prueba sin asserts', 'SIN-ASSERTS', () => nuevaPrueba(`test('t', async ({ page }) => { await page.goto('/'); });`)],
  ['describe.skip nuevo', 'OMISION-NUEVA', () => nuevaPrueba(`test.describe.skip('d', () => { test('t', async () => { expect(1 + 1).toBe(2); }); });`)],
  ['test.skip nuevo', 'OMITIDA', () => nuevaPrueba(`test.skip('t', async ({ page }) => { await expect(page).toHaveTitle('x'); });`)],
  ['test.only', 'TEST-ONLY', () => editar(PRUEBA, (s) => s.replace(`test('${TITULO}'`, `test.only('${TITULO}'`))],
  ['Error tragado', 'ERROR-TRAGADO', () => editar(PRUEBA, (s) => s.replace(`toHaveText('Hola');`, `toHaveText('Hola').catch(() => {});`))],
  ['Respuesta inventada', 'RED-SIMULADA', () => editar(PRUEBA, (s) => s.replace(`await page.goto('/');`, `await page.route('**/*', (r) => r.fulfill({ body: 'x' }));\n  await page.goto('/');`))],
  ['expect.soft', 'ASSERT-SOFT', () => editar(PRUEBA, (s) => s.replace(`await expect(page.locator('h1'))`, `await expect.soft(page.locator('h1'))`))],
  ['Prueba renombrada', 'PRUEBA-ELIMINADA', () => editar(PRUEBA, (s) => s.replace(TITULO, '[REG-sab] otro nombre'))],
  ['Captura quitada', 'CAPTURA-ELIMINADA', () => editar(PRUEBA, quitar(`  await expect(page).toHaveScreenshot('sab.png', { mask: [page.locator('time')] });\n`))],
  ['Máscara nueva', 'MASCARA-AGREGADA', () => editar(PRUEBA, (s) => s.replace(`{ mask: [page.locator('time')] }`, `{ mask: [page.locator('time')] }, { mask: [] }`))],
  ['Umbral por prueba', 'UMBRAL-POR-PRUEBA', () => editar(PRUEBA, (s) => s.replace(`{ mask:`, `{ maxDiffPixels: 900, mask:`))],
  ['Umbral global relajado', 'UMBRAL-RELAJADO', () => editar(CONFIG, (s) => s.replace('maxDiffPixelRatio: 0.002', 'maxDiffPixelRatio: 0.2'))],
  ['Reintentos activados', 'REINTENTOS', () => editar(CONFIG, (s) => s.replace('retries: 0', 'retries: 2'))],
  ['Línea base alterada', 'LINEA-BASE-ALTERADA', () => fs.writeFileSync(ruta(`${LB}/sab--escritorio.png`), 'tapa-la-rotura')],
  ['Línea base borrada', 'LINEA-BASE-ELIMINADA', () => fs.rmSync(ruta(`${LB}/sab--escritorio.png`))],
  ['Línea base sin registro', 'LINEA-BASE-SIN-REGISTRO', () => fs.writeFileSync(ruta(`${LB}/nueva--escritorio.png`), 'x')],
  ['Línea base sin aprobar', 'LINEA-BASE-SIN-APROBAR', () => {
    fs.writeFileSync(ruta(`${LB}/nueva--escritorio.png`), 'x');
    const a = JSON.parse(fs.readFileSync(ruta(APROB), 'utf8'));
    a['nueva--escritorio.png'] = { sha256: crypto.createHash('sha256').update('x').digest('hex'), origen: 'pipeline', spec: 'spec-x' };
    json(APROB, a);
  }],
  // Reglas nuevas del blindaje
  ['Auditor anulado', 'AUDITOR-ALTERADO', () => editar(VERIFICAR, (s) => s.replace('  return H;\n}', '  return [];\n}'))],
  ['Auditor que termina con éxito al importarse', 'AUDITOR-ALTERADO', () => editar(VERIFICAR, (s) => `process.exit(0);\n${s}`)],
  ['Análisis del auditor alterado', 'AUDITOR-ALTERADO', () => editar('factory/honestidad/analisis.mjs', (s) => s.replace('toBeAttached', 'toHaveText'))],
  ['Archivo nuevo en el auditor', 'AUDITOR-ALTERADO', () => fs.writeFileSync(ruta('factory/honestidad/extra.mjs'), '// x\n')],
  ['Lanzador alterado', 'AUDITOR-ALTERADO', () => editar('factory/lib/auditor.mjs', (s) => s.replace('return noEjecutable', 'return { hallazgos: [], texto: "" }; noEjecutable'))],
  ['Auditor anulado + prueba debilitada: el auditor de main no se deja engañar', 'MATCHER-DEBILITADO', () => {
    editar(VERIFICAR, (s) => s.replace('  return H;\n}', '  return [];\n}'));
    editar(PRUEBA, (s) => s.replace(`toHaveText('Hola')`, 'toBeAttached()'));
  }],
  ['Prueba excluida con testIgnore (sabotaje #4)', 'CONFIG-PRUEBAS-ALTERADA', () => editar(CONFIG, (s) => s.replace(`testDir: '.',`, `testDir: '.',\n  testIgnore: ['**/sabotaje.spec.ts'],`))],
  ['testMatch reducido', 'CONFIG-PRUEBAS-ALTERADA', () => editar(CONFIG, (s) => s.replace(`'salidas/*/pruebas/**/*.spec.ts'`, `'salidas/spec-1/pruebas/**/*.spec.ts'`))],
  ['grep en la configuración', 'CONFIG-PRUEBAS-ALTERADA', () => editar(CONFIG, (s) => s.replace('workers: 1,', 'workers: 1,\n  grep: /HUMO/,'))],
  ['projects sin móvil', 'CONFIG-PRUEBAS-ALTERADA', () => editar(CONFIG, (s) => s.replace(`    { name: 'movil', use: { ...devices['Pixel 7'] } },\n`, ''))],
  // Reglas de ejecución (resultados sintéticos)
  ['Criterio sin prueba', 'CRITERIO-SIN-PRUEBA', () => ({ '--plan': { criterios: [{ id: 'CA-1', texto: 'x', verificacion: 'funcional' }] }, '--resultados': [res('[CA-10] otra', 'passed')] })],
  ['Prueba del criterio falló', 'CRITERIO-SIN-PRUEBA', () => ({ '--plan': { criterios: [{ id: 'CA-1', texto: 'x', verificacion: 'funcional' }] }, '--resultados': [res('[CA-1] la suya', 'failed')] })],
  ['Prueba del criterio omitida', 'CRITERIO-SIN-PRUEBA', () => ({ '--plan': { criterios: [{ id: 'CA-1', texto: 'x', verificacion: 'ambas' }] }, '--resultados': [res('[CA-1] la suya', 'skipped', { anotaciones: ['skip: razón declarada'] })] })],
  ['Omitida en ejecución sin razón', 'OMITIDA-EN-EJECUCION', () => ({ '--resultados': [res('t', 'skipped')] })],
  ['Camino de error no ejercitado', 'CAMINO-ERROR-NO-EJERCITADO', () => ({ '--resultados': [res(TITULO, 'skipped', { anotaciones: ['skip: razón declarada'] })] })],
  ['Pasa sin la funcionalidad', 'PASA-SIN-FUNCIONALIDAD', () => ({ '--sin-feature': [res('[CA-1] algo @requiere-feature', 'passed')] })],
];

function auditar(extras = {}) {
  const args = Object.entries(extras).map(([bandera, valor]) => {
    const f = path.join(CLON, `.extra${bandera}.json`);
    fs.writeFileSync(f, JSON.stringify(valor));
    return `${bandera} ${JSON.stringify(path.relative(CLON, f))}`;
  });
  return bash(`node factory/cli.mjs honestidad ${args.join(' ')}`);
}

const limpiar = () => bash('git checkout -q . && git clean -fdq');
let fallos = 0;
const fila = (ok, nombre, regla, nota) => { console.log(`${ok ? '✅' : '❌'} ${nombre.padEnd(72)} ${regla}${nota ? `  ${nota}` : ''}`); if (!ok) fallos++; };

try {
  const c = spawnSync('git', ['clone', '-q', '--branch', 'main', RAIZ, CLON], { encoding: 'utf8' });
  if (c.status !== 0) throw new Error(c.stderr);
  prepararReferencia();

  const control = auditar();
  fila(control.status === 0, 'Control: sin sabotaje el auditor deja pasar', 'exit 0', control.status === 0 ? '' : control.stdout);
  const comentario = (editar(CONFIG, (s) => s.replace('export default', '// comentario inofensivo\nexport default')), auditar());
  fila(comentario.status === 0, 'Control: un comentario en la configuración no bloquea', 'exit 0', comentario.status === 0 ? '' : comentario.stdout);
  limpiar();
  const datos = (fs.appendFileSync(ruta('factory/honestidad/aprobaciones.log'), 'x\n'), auditar());
  fila(datos.status === 0, 'Control: aprobaciones.log (dato de aprobar-pruebas) no bloquea', 'exit 0', datos.status === 0 ? '' : datos.stdout);
  limpiar();

  for (const [nombre, regla, sabotear] of CASOS) {
    const extras = sabotear() || {};
    const r = auditar(extras);
    fila(r.status === 1 && r.stdout.includes(`[${regla}]`), nombre, regla, r.status === 1 && r.stdout.includes(`[${regla}]`) ? '' : `exit=${r.status} ${r.stdout.slice(0, 300)}${r.stderr.slice(0, 300)}`);
    limpiar();
  }

  // Sin auditor en main no hay "OK": falla cerrado.
  bash(`git rm -q factory/honestidad/verificar.mjs && git commit -qm x`);
  const sin = auditar();
  fila(sin.status === 1 && sin.stdout.includes('[AUDITOR-NO-DISPONIBLE]'), 'Auditor ausente en main: falla cerrado', 'AUDITOR-NO-DISPONIBLE');
} finally {
  fs.rmSync(CLON, { recursive: true, force: true });
}
console.log(`\n${CASOS.length + 4 - fallos}/${CASOS.length + 4} casos correctos.`);
process.exitCode = fallos ? 1 : 0;
