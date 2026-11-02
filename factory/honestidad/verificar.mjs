// CONTROL DE VERIFICACIÓN HONESTA
// Independiente de quien genera las pruebas: no usa IA, no importa nada del generador, y compara contra
// referencias que el pipeline NO puede escribir solo:
//   - factory/honestidad/manifiesto.json TAL COMO ESTÁ EN LA RAMA main (git show main:...), no la copia de trabajo
//   - visual/lineas-base/APROBACIONES.json TAL COMO ESTÁ EN main + aprobaciones nuevas firmadas por humano
// Bloquea (exit 1) ante cualquier hallazgo. No advierte: o pasa, o no hay pull request.
//
// Se ejecuta desde la versión de main (factory/lib/auditor.mjs), no desde la copia de trabajo auditada.
//
// Uso: node factory/honestidad/verificar.mjs [--resultados <resultados.json>] [--sin-feature <resultados.json>]
//                                            [--plan <plan.json>] [--salida <honestidad.log>] [--json <hallazgos.json>]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { analizarArchivo, idPrueba } from './analisis.mjs';

const RAIZ = process.env.HONESTIDAD_RAIZ || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const REF = process.env.HONESTIDAD_REF || 'main';
const MANIFIESTO = 'factory/honestidad/manifiesto.json';
const APROBACIONES = 'visual/lineas-base/APROBACIONES.json';
const CONFIG = 'playwright.config.ts';
const DIR_AUDITOR = 'factory/honestidad';
const LANZADOR = 'factory/lib/auditor.mjs';
// Datos, no código: `aprobar-pruebas` los escribe en la rama y el auditor siempre los lee de main.
const DATOS_AUDITOR = new Set([MANIFIESTO, `${DIR_AUDITOR}/aprobaciones.log`]);

const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
const enRef = (p) => { try { return execSync(`git show ${REF}:${p}`, { cwd: RAIZ, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); } catch { return null; } };
const json = (s, def) => { try { return s ? JSON.parse(s) : def; } catch { return def; } };
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

function listarPruebas() {
  const out = [];
  const recorrer = (d) => {
    const abs = path.join(RAIZ, d);
    if (!fs.existsSync(abs)) return;
    for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
      const rel = path.join(d, e.name);
      if (e.isDirectory() && e.name !== 'node_modules') recorrer(rel);
      else if (e.name.endsWith('.spec.ts')) out.push(rel);
    }
  };
  recorrer('factory/regresion');
  for (const s of fs.existsSync(path.join(RAIZ, 'salidas')) ? fs.readdirSync(path.join(RAIZ, 'salidas')) : []) recorrer(`salidas/${s}/pruebas`);
  return out.sort();
}

export function construirManifiesto() {
  const pruebas = {};
  const omisiones = {};
  for (const f of listarPruebas()) {
    const a = analizarArchivo(f, fs.readFileSync(path.join(RAIZ, f), 'utf8'));
    for (const p of a.pruebas) pruebas[idPrueba(p)] = { asserts: p.asserts, fuertes: p.fuertes, soft: p.soft, matchers: p.matchers, capturas: p.capturas, mascaras: p.mascaras, opcionesCaptura: p.opcionesCaptura, modificador: p.modificador, tags: p.tags };
    if (a.omisiones.length) omisiones[f] = a.omisiones.map((o) => o.texto);
  }
  const cfg = fs.readFileSync(path.join(RAIZ, CONFIG), 'utf8');
  return { pruebas, omisiones, umbralVisual: umbral(cfg) };
}

const umbral = (cfg) => ({
  threshold: Number((cfg.match(/threshold:\s*([\d.]+)/) || [])[1]),
  maxDiffPixelRatio: Number((cfg.match(/maxDiffPixelRatio:\s*([\d.]+)/) || [])[1]),
  retries: Number((cfg.match(/retries:\s*(\d+)/) || [])[1]),
});

/** Texto de la configuración sin comentarios ni diferencias de espacios: cambiar un comentario no es un cambio. */
const normalizarConfig = (s) => s.replace(/^\s*\/\/.*$/gm, '').replace(/\s\/\/.*$/gm, '').replace(/\s+/g, ' ').trim();

function archivosDelAuditor() {
  const enTrabajo = fs.readdirSync(path.join(RAIZ, DIR_AUDITOR), { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile()).map((e) => path.relative(RAIZ, path.join(e.parentPath ?? e.path, e.name)));
  const enMain = execSync(`git ls-tree -r --name-only ${REF} -- ${DIR_AUDITOR}`, { cwd: RAIZ, encoding: 'utf8' }).split('\n').filter(Boolean);
  return [...new Set([...enTrabajo, ...enMain, LANZADOR])].filter((f) => !DATOS_AUDITOR.has(f)).sort();
}

export function verificar({ resultados, sinFeature, plan } = {}) {
  const H = [];
  const hallazgo = (regla, donde, detalle) => H.push({ regla, donde, detalle });
  const ref = json(enRef(MANIFIESTO), null);
  const actual = construirManifiesto();

  // 0) Las herramientas de verificación son las de main: quien se audita no puede cambiar al auditor ni qué se ejecuta.
  for (const f of archivosDelAuditor()) {
    const abs = path.join(RAIZ, f);
    const copia = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null;
    if (copia !== enRef(f)) hallazgo('AUDITOR-ALTERADO', f, `Difiere de ${REF}. Los cambios al auditor se hacen en ${REF}, no en la rama que se audita.`);
  }
  const cfgRef = enRef(CONFIG);
  if (cfgRef === null || normalizarConfig(cfgRef) !== normalizarConfig(fs.readFileSync(path.join(RAIZ, CONFIG), 'utf8'))) {
    hallazgo('CONFIG-PRUEBAS-ALTERADA', CONFIG, `Difiere de ${REF}: podría excluir pruebas (testMatch, testIgnore, grep, projects) o alterar cómo se reportan.`);
  }

  if (!ref) hallazgo('SIN-REFERENCIA', `${REF}:${MANIFIESTO}`, `No existe manifiesto aprobado en ${REF}. Sin referencia no se puede afirmar que nada se debilitó.`);
  const base = ref || { pruebas: {}, omisiones: {}, umbralVisual: actual.umbralVisual };

  // 1) Pruebas aprobadas que desaparecieron o verifican menos que antes.
  for (const [id, a] of Object.entries(base.pruebas)) {
    const b = actual.pruebas[id];
    if (!b) { hallazgo('PRUEBA-ELIMINADA', id, 'Estaba en el manifiesto aprobado y ya no existe (¿renombrada o borrada?).'); continue; }
    if (b.asserts < a.asserts) hallazgo('ASSERTS-REDUCIDOS', id, `Tenía ${a.asserts} expect(), ahora ${b.asserts}.`);
    if (b.fuertes < a.fuertes) hallazgo('MATCHER-DEBILITADO', id, `Matchers fuertes: ${a.fuertes} -> ${b.fuertes}. Antes: [${a.matchers.join(', ')}] Ahora: [${b.matchers.join(', ')}]`);
    if (b.soft > a.soft) hallazgo('ASSERT-SOFT', id, `expect.soft no detiene la prueba: ${a.soft} -> ${b.soft}.`);
    if (b.capturas < a.capturas) hallazgo('CAPTURA-ELIMINADA', id, `Comparaciones visuales: ${a.capturas} -> ${b.capturas}.`);
    if (b.mascaras > a.mascaras) hallazgo('MASCARA-AGREGADA', id, `Máscaras en capturas: ${a.mascaras} -> ${b.mascaras}. Una máscara nueva puede tapar una rotura.`);
    if (JSON.stringify(b.opcionesCaptura) !== JSON.stringify(a.opcionesCaptura)) hallazgo('UMBRAL-POR-PRUEBA', id, `Opciones de tolerancia: [${a.opcionesCaptura}] -> [${b.opcionesCaptura}].`);
    if (b.modificador && b.modificador !== a.modificador) hallazgo('OMITIDA', id, `Ahora es test.${b.modificador}().`);
  }

  // 1b) Una prueba aprobada no cambia en silencio: el archivo debe ser el de main, salvo los reemplazos exactos declarados
  // en el plan del spec. Detecta también un valor esperado cambiado por otro igual de fuerte.
  const declarados = (plan?.pruebas_afectadas || []);
  for (const f of listarPruebas()) {
    const aprobado = enRef(f);
    if (aprobado === null) continue;
    const esperado = declarados.filter((d) => d.archivo === f).reduce((t, d) => t.replace(d.antes, d.despues), aprobado);
    if (fs.readFileSync(path.join(RAIZ, f), 'utf8') !== esperado) hallazgo('PRUEBA-APROBADA-MODIFICADA', f, 'Difiere de la versión aprobada en main y no coincide con los cambios declarados en pruebas_afectadas.');
  }

  // 2) Reglas que aplican a TODAS las pruebas (también a las nuevas que trae un spec).
  for (const f of listarPruebas()) {
    const a = analizarArchivo(f, fs.readFileSync(path.join(RAIZ, f), 'utf8'));
    for (const o of a.omisiones) {
      if (o.tipo === 'only') hallazgo('TEST-ONLY', `${f}:${o.linea}`, `${o.texto} — excluye al resto de la suite.`);
      else if (!(base.omisiones[f] || []).includes(o.texto)) hallazgo('OMISION-NUEVA', `${f}:${o.linea}`, `${o.texto} — omisión no aprobada.`);
    }
    for (const p of a.pruebas) {
      const donde = `${f}:${p.linea} «${p.titulo}»`;
      if (p.asserts === 0) hallazgo('SIN-ASSERTS', donde, 'La prueba no tiene ningún expect(): no puede fallar por comportamiento.');
      if (p.triviales.length) hallazgo('ASSERT-TRIVIAL', donde, `Afirma sobre un literal: ${p.triviales.join(' ; ')}`);
      if (p.sinAwait.length) hallazgo('ASSERT-SIN-AWAIT', donde, `Aserción asíncrona sin await (${p.sinAwait.join(', ')}): nunca hace fallar la prueba.`);
      if (p.tragaErrores) hallazgo('ERROR-TRAGADO', donde, 'Un .catch/try vacío puede convertir un fallo en éxito.');
      if (p.mockRed) hallazgo('RED-SIMULADA', donde, 'page.route/route.fulfill: la prueba verificaría una respuesta inventada, no Moodle.');
      if (p.modificador && !base.pruebas[idPrueba(p)]) hallazgo('OMITIDA', donde, `test.${p.modificador}() en prueba nueva.`);
    }
  }

  // 3) Configuración global de la suite.
  const u0 = base.umbralVisual, u1 = actual.umbralVisual;
  if (u1.threshold > u0.threshold || u1.maxDiffPixelRatio > u0.maxDiffPixelRatio) hallazgo('UMBRAL-RELAJADO', CONFIG, `threshold ${u0.threshold}->${u1.threshold}, maxDiffPixelRatio ${u0.maxDiffPixelRatio}->${u1.maxDiffPixelRatio}`);
  if (u1.retries > u0.retries) hallazgo('REINTENTOS', CONFIG, `retries ${u0.retries}->${u1.retries}: los reintentos esconden pruebas inestables.`);

  // 4) Líneas base visuales: toda imagen debe coincidir con una aprobación firmada.
  const aprobRef = json(enRef(APROBACIONES), {});
  const aprobAct = json(fs.existsSync(path.join(RAIZ, APROBACIONES)) ? fs.readFileSync(path.join(RAIZ, APROBACIONES), 'utf8') : null, {});
  const dirLB = path.join(RAIZ, 'visual/lineas-base');
  for (const png of fs.existsSync(dirLB) ? fs.readdirSync(dirLB).filter((f) => f.endsWith('.png')) : []) {
    const h = sha(path.join(dirLB, png));
    const aR = aprobRef[png], aA = aprobAct[png];
    if (aR && aR.sha256 === h) continue; // idéntica a la aprobada en main
    if (aR && aR.sha256 !== h) {
      // Cambió una línea base existente. Dos únicos caminos legítimos:
      //  a) aprobación humana nueva (origen humano, razón, hash exacto);
      //  b) DENTRO del pipeline de un spec que DECLARÓ esa pantalla como afectada: queda "propuesta-cambio",
      //     visible en el PR con su diferencia, y requiere aprobación humana antes de mergear.
      const humano = aA && aA.sha256 === h && aA.razon && aA.origen === 'humano';
      const propuestaDeclarada = plan && aA && aA.sha256 === h && aA.origen === 'pipeline' && aA.estado === 'propuesta-cambio'
        && (plan.pantallas_afectadas || []).some((s) => png.startsWith(s));
      if (!humano && !propuestaDeclarada) hallazgo('LINEA-BASE-ALTERADA', `visual/lineas-base/${png}`, `El hash cambió (${aR.sha256.slice(0, 12)} -> ${h.slice(0, 12)}) sin aprobación humana con razón${plan ? ` y sin que el spec ${plan.spec_id} declare esta pantalla como afectada` : ''}. Actualizar una línea base para que una prueba pase es la forma más barata de tapar una rotura.`);
      continue;
    }
    // Línea base nueva (pantalla nueva): la crea el pipeline y queda PENDIENTE de aprobación humana en el PR.
    if (!aA || aA.sha256 !== h) hallazgo('LINEA-BASE-SIN-REGISTRO', `visual/lineas-base/${png}`, 'Imagen nueva sin entrada en APROBACIONES.json.');
    else if (!plan && aA.origen !== 'humano') hallazgo('LINEA-BASE-SIN-APROBAR', `visual/lineas-base/${png}`, `Registrada por el pipeline (${aA.spec}) pero todavía sin aprobación humana.`);
  }
  for (const [png, a] of Object.entries(aprobRef)) if (!fs.existsSync(path.join(dirLB, png))) hallazgo('LINEA-BASE-ELIMINADA', `visual/lineas-base/${png}`, `Estaba aprobada (${a.razon}) y ya no existe.`);

  // 5) Lo que se ejecutó: pruebas aprobadas que no corrieron, caminos de error que no se ejercitaron.
  if (resultados) {
    const corrio = new Map(resultados.map((r) => [`${r.archivo}::${r.titulo.split(' › ').pop()}`, r]));
    for (const [id, a] of Object.entries(actual.pruebas)) {
      const [archivo, titulo] = id.split('::');
      const r = [...corrio.entries()].find(([k]) => k.endsWith(`${path.basename(archivo)}::${titulo}`))?.[1];
      if (!r) continue; // no estaba en el alcance de esta corrida
      if ((a.tags || []).includes('@camino-error') && r.estado !== 'passed') hallazgo('CAMINO-ERROR-NO-EJERCITADO', id, `Estado: ${r.estado}. El camino de error debe ejecutarse y pasar.`);
    }
    for (const r of resultados) if (r.estado === 'skipped' && !r.anotaciones.some((x) => x.startsWith('skip:') && x.length > 8)) hallazgo('OMITIDA-EN-EJECUCION', `${r.archivo} «${r.titulo}» [${r.proyecto}]`, 'Se omitió sin razón declarada.');
  }

  // 5b) Cobertura real: cada criterio verificable debe tener una prueba [CA-n] que corrió y pasó.
  if (plan) {
    for (const ca of (plan.criterios || []).filter((x) => x.verificacion !== 'proceso')) {
      const suyas = (resultados || []).filter((r) => r.titulo.includes(`[${ca.id}]`));
      if (!suyas.some((r) => r.estado === 'passed')) {
        hallazgo('CRITERIO-SIN-PRUEBA', ca.id, suyas.length
          ? `Sus ${suyas.length} prueba(s) no pasaron: ${[...new Set(suyas.map((r) => r.estado))].join(', ')}.`
          : `Ninguna prueba ejecutada lleva [${ca.id}] en el título: «${ca.texto}».`);
      }
    }
  }

  // 6) Prueba de mutación "sin la funcionalidad": las pruebas @requiere-feature deben FALLAR sin el plugin.
  if (sinFeature) {
    for (const r of sinFeature.filter((x) => /@requiere-feature/.test(x.titulo))) {
      if (r.estado === 'passed') hallazgo('PASA-SIN-FUNCIONALIDAD', `${r.archivo} «${r.titulo}» [${r.proyecto}]`, 'Pasa con el plugin desinstalado: no verifica lo que dice verificar.');
    }
  }
  return H;
}

export function informe(H) {
  if (!H.length) return 'HONESTIDAD: OK — ninguna prueba verifica menos que lo aprobado; líneas base íntegras.\n';
  return `HONESTIDAD: BLOQUEADO — ${H.length} hallazgo(s). El pipeline no puede llegar al pull request.\n\n`
    + H.map((h, i) => `${i + 1}. [${h.regla}] ${h.donde}\n   ${h.detalle}`).join('\n') + '\n';
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const leerRes = (p) => (p && fs.existsSync(p) ? (await_import_resultados(p)) : null);
  const H = verificar({ resultados: leerRes(arg('--resultados')), sinFeature: leerRes(arg('--sin-feature')), plan: arg('--plan') ? JSON.parse(fs.readFileSync(arg('--plan'), 'utf8')) : null });
  const txt = informe(H);
  if (arg('--salida')) fs.writeFileSync(arg('--salida'), txt);
  if (arg('--json')) fs.writeFileSync(arg('--json'), JSON.stringify(H));
  process.stdout.write(txt);
  process.exit(H.length ? 1 : 0);
}

function await_import_resultados(p) {
  // resultados en formato aplanado ([{titulo, archivo, ...}]) o reporte JSON crudo de Playwright
  const crudo = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (Array.isArray(crudo)) return crudo;
  const out = [];
  const rec = (s, pre) => { for (const x of s.suites || []) rec(x, [...pre, x.title]); for (const sp of s.specs || []) for (const t of sp.tests || []) { const r = t.results?.at(-1) || {}; out.push({ titulo: [...pre.slice(1), sp.title].join(' › '), archivo: sp.file, proyecto: t.projectName, estado: r.status, anotaciones: (t.annotations || []).map((a) => `${a.type}: ${a.description || ''}`) }); } };
  for (const s of crudo.suites || []) rec(s, [s.title]);
  return out;
}
