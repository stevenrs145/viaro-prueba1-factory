#!/usr/bin/env node
// Fábrica: un comando por spec.
//   node factory/cli.mjs run specs/spec-1-reconocimiento.md      pipeline completo -> rama + PR (sin merge)
//   node factory/cli.mjs suite                                   suite completa funcional + visual + honestidad
//   node factory/cli.mjs honestidad                              solo el control de verificación honesta
//   node factory/cli.mjs aprobar-linea-base <png|--pendientes> --razon "..."   (HUMANO)
//   node factory/cli.mjs aprobar-pruebas --razon "..."                          (HUMANO)
import fs from 'node:fs';
import path from 'node:path';
import { RAIZ, Corrida, sh, shOk, escribir, leer, existe, archivos } from './lib/util.mjs';
import { llamarIA, extraerJSON } from './lib/ia.mjs';
import * as moodle from './lib/moodle.mjs';
import { correrPruebas, resumen, contextoFallos, copiasDeHelpers } from './lib/pruebas.mjs';
import { auditar } from './lib/auditor.mjs';
import { generarTrazabilidad } from './lib/trazabilidad.mjs';
import { lineasBaseNuevas, registrarPendientes, proponerLineasBase, aprobarLineaBase } from './lib/lineas-base.mjs';

const MAX_REINTENTOS = Number(process.env.FACTORY_REINTENTOS || 3);
const [, , comando, ...resto] = process.argv;
const opt = (n) => { const i = resto.indexOf(n); return i >= 0 ? resto[i + 1] : null; };
const ETAPAS_RUN = ['precondicion', 'analisis', 'sondas', 'implementacion', 'pruebas', 'mutacion', 'regresion', 'alcance', 'honestidad', 'pr'];
// Reglas del auditor que se ven sin ejecutar nada: mejor corregirlas antes de gastar una corrida de pruebas.
const REGLAS_ESTATICAS = new Set(['SIN-ASSERTS', 'ASSERT-TRIVIAL', 'ASSERT-SIN-AWAIT', 'ERROR-TRAGADO', 'RED-SIMULADA', 'TEST-ONLY', 'OMISION-NUEVA', 'OMITIDA']);
const ETAPAS_SUITE = ['precondicion', 'pruebas', 'honestidad'];
let corridaActiva = null;

const comandos = { run, suite, honestidad, 'aprobar-linea-base': aprobarLB, 'aprobar-pruebas': aprobarPruebas };
if (!comandos[comando]) { console.error(`Uso: node factory/cli.mjs <${Object.keys(comandos).join('|')}> ...`); process.exit(2); }
try { process.exitCode = await comandos[comando](); } catch (e) {
  // Una excepción no debe dejar estado.json diciendo que la etapa sigue en curso.
  const enCurso = corridaActiva?.etapaEnCurso();
  if (e.limiteIA) {
    if (enCurso) corridaActiva.etapa(enCurso, 'BLOQUEADO', `Límite de uso de la IA: ${e.message}`);
    console.error(`\n⛔ ${e.message}\nLa corrida quedó en su rama. Cuando la IA vuelva a estar disponible:\n  node factory/cli.mjs run <spec> --reanudar $(git branch --show-current)`);
    process.exitCode = 3;
  } else {
    if (enCurso) corridaActiva.etapa(enCurso, 'FALLIDO', String(e.message || e).slice(0, 500));
    console.error(e.stack || e); process.exitCode = 1;
  }
}

// ---------------------------------------------------------------------------------------------------------
async function run() {
  const specPath = resto.find((a) => !a.startsWith('--'));
  if (!specPath || !existe(specPath)) throw new Error(`Spec no encontrado: ${specPath}`);
  const specTxt = leer(specPath);
  const specId = (specTxt.match(/^id:\s*(\S+)/m) || [])[1] || path.basename(specPath, '.md');
  const specDir = `salidas/${specId}`;
  const c = corridaActiva = new Corrida(specId);
  // --reanudar <rama>: retoma una corrida interrumpida (p. ej. por límite de uso de la IA) reutilizando el plan
  // y el código ya generados en esa rama; vuelve a ejecutar TODAS las verificaciones desde la etapa 4.
  const reanudar = opt('--reanudar');
  const rama = reanudar || `factory/${specId}-${c.id.slice(0, 15)}`;
  c.iniciarEstado(ETAPAS_RUN, { spec: specPath, rama, reanudada: Boolean(reanudar) });
  c.log('inicio', `Spec ${specPath} (${specId}). Corrida ${c.dir}. Rama ${rama}${reanudar ? ' (REANUDADA)' : ''}.`);

  // 0. Precondiciones
  if (!moodle.moodleArriba()) return falla(c, 'precondicion', 'Moodle no responde en http://localhost:8090. Ejecutar: bash entorno/setup.sh');
  // La carpeta de esta misma corrida ya existe (es donde se escribe el log): no cuenta como cambio.
  const sucio = sh('git status --porcelain').out.split('\n').filter((l) => l && !l.slice(3).startsWith('corridas/')).join('\n');
  if (sucio) return falla(c, 'precondicion', 'El árbol de trabajo tiene cambios sin commit. La fábrica parte de un estado limpio.', sucio);
  if (reanudar) {
    shOk(`git checkout -q ${reanudar}`);
    // La fábrica de main (con sus correcciones) es la que verifica; la rama solo aporta plan, código y pruebas.
    shOk('git checkout -q main -- factory entorno playwright.config.ts package.json .gitignore');
    if (!existe(`${specDir}/plan.json`)) return falla(c, 'reanudar', `La rama ${reanudar} no tiene ${specDir}/plan.json.`);
  } else {
    shOk(`git checkout -q -b ${rama}`);
    fs.rmSync(path.join(RAIZ, specDir), { recursive: true, force: true });
    escribir(`${specDir}/spec.md`, specTxt);
  }
  c.etapa('precondicion', 'VALIDADO', 'Moodle responde y el árbol de trabajo está limpio.');

  // 1. Análisis: plan, capa, bordes, criterios -> pruebas
  let plan = reanudar ? validarPlan(JSON.parse(leer(`${specDir}/plan.json`)), specId) : null;
  if (reanudar) c.log('reanudar', `Se reutiliza ${specDir}/plan.json y el código/pruebas de la rama. Análisis e implementación no se repiten.`);
  let feedback = '';
  for (let i = 1; i <= 3 && !plan; i++) {
    const lineas_base = fs.readdirSync(path.join(RAIZ, 'visual/lineas-base')).filter((f) => f.endsWith('.png')).join(', ') || '(ninguna todavía)';
    const r = llamarIA(c, { rol: 'analista', plantilla: 'analista', vars: { spec: specTxt, spec_id: specId, conocimiento: leer('factory/conocimiento/moodle-5.3.md'), helpers: leer('factory/regresion/helpers.ts'), feedback, lineas_base } });
    try {
      plan = validarPlan(extraerJSON(r.texto), specId);
      c.log('analisis', `Plan válido en intento ${i}: capa ${plan.componente || '(solo pruebas)'} — ${plan.criterios.length} criterios, ${plan.bordes.length} bordes.`);
    } catch (e) {
      feedback = `Tu respuesta anterior no es un plan válido: ${e.message}. Devolvé SOLO el bloque \`\`\`json con el esquema pedido.`;
      c.log('analisis', `Plan inválido (intento ${i}), se reintenta.`, e.message);
    }
  }
  if (!plan) return falla(c, 'analisis', 'La IA no produjo un plan válido en 3 intentos.');
  escribir(`${specDir}/plan.json`, JSON.stringify(plan, null, 2));
  // Una ambigüedad que solo producto puede resolver detiene la corrida antes de gastar en construir.
  const bloqueantes = plan.bordes.filter((b) => b.bloqueante === true);
  if (bloqueantes.length) return bloquear(c, rama, specDir, specPath, bloqueantes);
  c.etapa('analisis', 'VALIDADO', `${reanudar ? 'Plan reutilizado de la rama' : 'Plan válido'}: ${plan.criterios.length} criterios, ${plan.bordes.length} bordes.`);

  // 2. Sondas: verificar contra la realidad antes de construir (contratos externos, comportamiento actual)
  const sondas = ejecutarSondas(c, plan.sondas || []);
  escribir(`${specDir}/sondas.json`, JSON.stringify(sondas, null, 2));
  c.etapa('sondas', 'EJECUTADO', `${sondas.length} sonda(s).`);

  // 3. Implementación (código + pruebas)
  const varsImpl = { spec: specTxt, spec_id: specId, plan, sondas, conocimiento: leer('factory/conocimiento/moodle-5.3.md'), helpers: leer('factory/regresion/helpers.ts'), spec_dir: specDir };
  if (!reanudar) llamarIA(c, { rol: 'implementador', plantilla: 'implementador', vars: varsImpl, escritura: specDir });
  const noAplicados = aplicarPruebasAfectadas(c, plan);
  if (noAplicados.length) return falla(c, 'implementacion', 'Una prueba declarada en pruebas_afectadas no se pudo actualizar.', noAplicados.join('\n'));
  c.etapa('implementacion', 'EJECUTADO', reanudar ? 'Código y pruebas reutilizados de la rama.' : 'Código y pruebas generados.');
  // Adelanta las llamadas caras sin usar Moodle: las pruebas se hacen después con --reanudar.
  if (process.env.FACTORY_SOLO_GENERAR) {
    shOk(`git add -A ${specDir} ${c.dir} ia/transcripciones`);
    shOk(`git commit -q -m "feat(${specId}): plan e implementación generados" -m "Corrida ${c.dir}. Pendiente de pruebas: --reanudar."`);
    shOk('git checkout -q main');
    return 0;
  }

  // 4. Bucle validar -> desplegar -> probar -> corregir
  let verde = false;
  let res = null;
  for (let intento = 1; intento <= MAX_REINTENTOS + 1; intento++) {
    const problemas = validacionesEstaticas(c, specDir, plan);
    let detalle = problemas.join('\n');
    if (!problemas.length) {
      const d = moodle.desplegar(specDir);
      c.log('despliegue', `Plugins: ${d.plugins.map((p) => p.componente).join(', ') || '(ninguno)'} — upgrade ${d.ok ? 'OK' : 'FALLÓ'}`, d.ok ? null : d.salida);
      if (!d.ok) detalle = `La actualización de Moodle falló:\n${d.salida}`;
      else {
        moodle.reset();
        const pruebasSpec = archivos(`${specDir}/pruebas`, (f) => f.endsWith('.spec.ts'));
        res = correrPruebas(pruebasSpec, c.ruta('spec'), { crearLineasBaseFaltantes: true });
        const s = resumen(res.resultados);
        c.log('pruebas', `Intento ${intento}: ${s.passed} OK, ${s.failed} fallidas, ${s.skipped} omitidas.`, s.failed ? contextoFallos(c.ruta('spec'), res.resultados) : null);
        if (s.failed === 0 && s.passed > 0) { verde = true; break; }
        detalle = s.passed + s.failed === 0 ? `No se ejecutó ninguna prueba.\n${res.salida.slice(-3000)}` : contextoFallos(c.ruta('spec'), res.resultados);
      }
    }
    if (intento > MAX_REINTENTOS) break;
    c.log('reintento', `Intento ${intento} no quedó verde. Se le pide a la IA que corrija (${intento}/${MAX_REINTENTOS}).`);
    llamarIA(c, { rol: 'corrector', plantilla: 'corrector', vars: { ...varsImpl, problemas: detalle, intento: String(intento) }, escritura: specDir });
  }
  if (!verde) return falla(c, 'pruebas', `Las pruebas del spec no quedaron en verde tras ${MAX_REINTENTOS} reintentos. Se detiene sin PR; la rama ${rama} queda para diagnóstico.`);
  c.etapa('pruebas', 'VALIDADO', 'Pruebas del spec en verde.');

  // 5. Mutación "sin la funcionalidad": las pruebas @requiere-feature deben fallar sin el plugin
  let sinFeature = null;
  const probarSinFuncionalidad = () => {
    if (!moodle.pluginsDe(specDir).length) { c.etapa('mutacion', 'EJECUTADO', 'No aplica: el spec no trae plugin.'); return; }
    const r = moodle.retirar(specDir);
    c.log('mutacion', `Plugin retirado para probar que las pruebas detectan su ausencia (${r.ok ? 'OK' : 'con avisos'}).`);
    moodle.reset();
    const pruebasSpec = archivos(`${specDir}/pruebas`, (f) => f.endsWith('.spec.ts'));
    sinFeature = correrPruebas(pruebasSpec, c.ruta('sin-feature'), { grep: '@requiere-feature' }).resultados;
    const s = resumen(sinFeature);
    c.log('mutacion', `Sin la funcionalidad: ${s.failed} fallan (esperado), ${s.passed} pasan (cada una es un hallazgo).`);
    moodle.desplegar(specDir);
    c.etapa('mutacion', s.passed ? 'EJECUTADO' : 'VALIDADO', `Sin la funcionalidad: ${s.failed} fallan, ${s.passed} pasan.`);
  };
  probarSinFuncionalidad();

  // 6. Regresión completa (nada de lo existente se rompió) + líneas base nuevas
  moodle.reset();
  let total = correrPruebas([], c.dir, { crearLineasBaseFaltantes: false });
  // Pantallas que el spec declara cambiar A PROPÓSITO: la imagen obtenida se PROPONE como nueva línea base,
  // pendiente de aprobación humana en el PR. Diferencias en pantallas NO declaradas siguen siendo fallos.
  const propuestas = proponerCambiosVisuales(c, plan, total.resultados);
  if (propuestas.length) {
    c.log('visual', `Cambios visuales declarados por el plan (${plan.pantallas_afectadas.join(', ')}): se proponen ${propuestas.length} líneas base, pendientes de aprobación humana.`, propuestas.join('\n'));
    copiarDiferencias(c);
    moodle.reset();
    total = correrPruebas([], c.dir, { crearLineasBaseFaltantes: false });
  }
  // Una prueba del propio spec que pasó sola y falla en la suite es inestable: va al corrector igual que en la etapa 4.
  // Los fallos de pruebas de otros specs no se corrigen aquí: son regresiones y detienen la corrida.
  for (let i = 1; i <= MAX_REINTENTOS; i++) {
    const propias = total.resultados.filter((r) => ['failed', 'timedOut', 'interrupted'].includes(r.estado) && (r.archivo || '').includes(specDir));
    if (!propias.length) break;
    c.log('reintento', `${propias.length} prueba(s) del spec fallaron en la suite completa. Se le pide a la IA que corrija (${i}/${MAX_REINTENTOS}).`);
    const problemas = `Estas pruebas pasaron ejecutadas solas y fallaron en la suite completa: son inestables. Buscá una carrera entre una acción y el JS de Moodle (usá esperarJS de los helpers).\nEl estado ARIA puede ser posterior a la limpieza de la prueba; guiate por la línea del error.\n\n${contextoFallos(c.dir, total.resultados)}`;
    llamarIA(c, { rol: 'corrector', plantilla: 'corrector', vars: { ...varsImpl, problemas, intento: `regresion-${i}` }, escritura: specDir });
    const estaticos = validacionesEstaticas(c, specDir, plan);
    if (estaticos.length) return falla(c, 'regresion', 'La corrección de la regresión no pasa las validaciones estáticas.', estaticos.join('\n'));
    moodle.desplegar(specDir);
    probarSinFuncionalidad(); // las pruebas cambiaron: el resultado anterior ya no vale
    moodle.reset();
    total = correrPruebas([], c.dir, { crearLineasBaseFaltantes: false });
  }
  const st = resumen(total.resultados);
  c.log('regresion', `Suite completa: ${st.passed} OK, ${st.failed} fallidas, ${st.skipped} omitidas.`, st.failed ? contextoFallos(c.dir, total.resultados) : null);
  c.etapa('regresion', st.failed ? 'EJECUTADO' : 'VALIDADO', `${st.passed} OK, ${st.failed} fallidas, ${st.skipped} omitidas.`);
  const nuevas = lineasBaseNuevas();
  if (nuevas.length) { registrarPendientes(nuevas, specId); c.log('visual', `Líneas base NUEVAS (pantallas que introduce el spec), pendientes de aprobación humana en el PR: ${nuevas.join(', ')}`); }

  // 7. Alcance: la IA solo pudo cambiar salidas/<spec>/ y líneas base nuevas; el core de Moodle intacto
  const fuera = sh('git status --porcelain').out.split('\n').filter(Boolean).map((l) => l.slice(3))
    .filter((f) => !(plan.pruebas_afectadas || []).some((d) => d.archivo === f))
    .filter((f) => !f.startsWith(specDir) && !f.startsWith('corridas/') && !f.startsWith('ia/transcripciones/') && !f.startsWith('visual/') && !f.startsWith('test-results'))
    // al reanudar, la fábrica se toma de main (no de la rama): esas diferencias no son obra de la IA
    .filter((f) => !(reanudar && sh(`git diff --quiet main -- '${f}'`).code === 0));
  const core = moodle.verificarCoreIntacto(rutasPluginsDesplegados());
  if (fuera.length || core.length) return falla(c, 'alcance', 'Cambios fuera del alcance permitido.', [...fuera.map((f) => `repo: ${f}`), ...core.map((x) => `core moodle: ${x}`)].join('\n'));
  c.log('alcance', 'Solo cambió salidas/ del spec; core de Moodle intacto (git status del árbol de Moodle).');
  c.etapa('alcance', 'VALIDADO', 'Solo cambió salidas/ del spec; core de Moodle intacto.');

  // 8. Control de verificación honesta (independiente). Bloquea.
  const { hallazgos: H, texto: txtH } = auditar({ resultados: total.resultados, sinFeature, plan });
  escribir(c.ruta('honestidad.log'), txtH);
  c.log('honestidad', H.length ? `BLOQUEADO con ${H.length} hallazgo(s).` : 'OK.', txtH);
  if (H.length) return falla(c, 'honestidad', 'El control de verificación honesta bloqueó la corrida. No se abre PR.');
  c.etapa('honestidad', 'VALIDADO', 'Sin hallazgos.');
  if (st.failed) return falla(c, 'regresion', 'La regresión completa tiene fallos. No se abre PR.');

  // 9. Evidencia, trazabilidad, diff, commit, PR (sin merge)
  generarTrazabilidad({ plan, specDir, resultados: total.resultados, corrida: c });
  shOk(`git add -A ${specDir} visual/lineas-base`);
  const diff = sh(`git diff --cached -- ${specDir}/codigo visual/lineas-base`).out;
  escribir(`${specDir}/cambios.diff`, diff || '(sin cambios de código: spec de solo pruebas)\n');
  shOk(`git add -A ${specDir} ${c.dir} ia/transcripciones visual/lineas-base`);
  shOk(`git commit -q -m "feat(${specId}): ${plan.titulo}" -m "Generado por la fábrica. Corrida ${c.dir}."`);
  const pr = abrirPR(c, rama, plan, specDir, st, txtH, nuevas);
  c.etapa('pr', 'EJECUTADO', `PR propuesto: ${pr}. Pendiente de aprobación humana.`);
  c.log('fin', `PR propuesto: ${pr}. El pipeline se detiene en aprobación humana: no mergea ni despliega.`);
  // El plugin vive en su rama: dejarlo instalado haría fallar el control de core del spec siguiente.
  moodle.retirar(specDir);
  sh(`git add -A ${c.dir} && git commit -q -m "chore(${specId}): log final de la corrida" && git push -q origin ${rama}`);
  shOk('git checkout -q main');
  return 0;
}

function proponerCambiosVisuales(c, plan, resultados) {
  const afectadas = plan.pantallas_afectadas || [];
  if (!afectadas.length) return [];
  const art = path.join(RAIZ, c.dir, 'artefactos');
  if (!fs.existsSync(art)) return [];
  const hechas = [];
  for (const f of fs.readdirSync(art, { recursive: true }).filter((x) => x.endsWith('-actual.png'))) {
    // Playwright nombra el artefacto <nombre-captura>-actual.png; la línea base es <nombre>--<proyecto>.png
    const nombre = path.basename(f).replace(/-actual\.png$/, '');
    const proyecto = /-movil$/.test(path.dirname(f)) ? 'movil' : 'escritorio';
    if (!afectadas.some((p) => nombre.startsWith(p))) continue;
    const destino = `visual/lineas-base/${nombre}--${proyecto}.png`;
    if (!fs.existsSync(path.join(RAIZ, destino))) continue;
    fs.copyFileSync(path.join(art, f), path.join(RAIZ, destino));
    hechas.push(destino);
  }
  if (hechas.length) proponerLineasBase(hechas.map((h) => path.basename(h)), plan.spec_id);
  void resultados;
  return hechas;
}

function falla(c, etapa, msg, detalle) {
  c.log(etapa, `DETENIDO: ${msg}`, detalle);
  c.etapa(etapa === 'reanudar' ? 'precondicion' : etapa, 'FALLIDO', msg);
  return 1;
}

/** Detiene la corrida en BLOQUEADO: deja pregunta.md y el plan en la rama, y vuelve a main sin construir nada. */
function bloquear(c, rama, specDir, specPath, bordes) {
  const preguntas = bordes.map((b, i) => `## ${i + 1}. ${b.descripcion}\n\n**Pregunta:** ${b.preguntaria}\n\n**Por qué bloquea:** ${b.criterio || '(sin criterio declarado)'}\n`).join('\n');
  const md = `# Corrida BLOQUEADA: ${specPath}\n\nLa fábrica no construyó nada: estas decisiones son de producto y no se pueden asumir.\n\n${preguntas}\n`
    + `## Cómo continuar\n\nResolver cada punto EN EL SPEC (\`${specPath}\`) y volver a ejecutar:\n\n    node factory/cli.mjs run ${specPath}\n`;
  escribir(c.ruta('pregunta.md'), md);
  c.etapa('analisis', 'BLOQUEADO', `${bordes.length} ambigüedad(es) bloqueante(s). Ver ${c.ruta('pregunta.md')}.`);
  c.log('analisis', `BLOQUEADO: ${bordes.length} ambigüedad(es) bloqueante(s). No se construye nada.`, md);
  shOk(`git add -A ${specDir} ${c.dir}${existe('ia/transcripciones') ? ' ia/transcripciones' : ''}`);
  shOk(`git commit -q -m "chore(${c.estado.corrida}): corrida bloqueada por ambigüedad" -m "Preguntas en ${c.ruta('pregunta.md')}."`);
  const p = sh(`git push -q origin ${rama}`);
  if (p.code !== 0) console.error(`Aviso: no se pudo subir la rama ${rama}; queda solo en local.`);
  shOk('git checkout -q main');
  return 4;
}

/**
 * Pruebas de regresión aprobadas que el spec cambia a propósito (como pantallas_afectadas, pero para aserciones).
 * La fábrica aplica el reemplazo exacto del plan; la IA no edita esos archivos. El PR lo muestra y lo aprueba un humano.
 */
function aplicarPruebasAfectadas(c, plan) {
  const problemas = [];
  for (const d of plan.pruebas_afectadas || []) {
    const texto = leer(d.archivo);
    if (texto.includes(d.despues) && !texto.includes(d.antes)) continue; // ya aplicado en una corrida reanudada
    if (texto.split(d.antes).length !== 2) { problemas.push(`${d.archivo}: el texto a reemplazar debe aparecer exactamente una vez: ${d.antes}`); continue; }
    escribir(d.archivo, texto.replace(d.antes, d.despues));
    c.log('implementacion', `Prueba aprobada actualizada, pendiente de aprobación humana: ${d.archivo}`, `- ${d.antes}\n+ ${d.despues}\nMotivo: ${d.motivo}`);
  }
  return problemas;
}

function validarPlan(p, specId) {
  const req = ['spec_id', 'titulo', 'naturaleza', 'capa_justificacion', 'criterios', 'bordes'];
  for (const k of req) if (p[k] === undefined) throw new Error(`falta "${k}"`);
  for (const b of p.bordes) {
    if (b.bloqueante !== undefined && typeof b.bloqueante !== 'boolean') throw new Error(`bloqueante debe ser true o false: ${b.descripcion}`);
    if (b.bloqueante && !b.preguntaria) throw new Error(`borde bloqueante sin pregunta: ${b.descripcion}`);
  }
  for (const d of p.pruebas_afectadas || []) {
    if (!d.archivo || !d.antes || !d.despues || !d.motivo) throw new Error(`pruebas_afectadas incompleta: ${JSON.stringify(d)}`);
    if (!/^(salidas\/[^/]+\/pruebas|factory\/regresion)\//.test(d.archivo)) throw new Error(`pruebas_afectadas fuera de las pruebas: ${d.archivo}`);
    if (d.archivo.startsWith(`salidas/${specId}/`)) throw new Error(`pruebas_afectadas es para pruebas de otros specs: ${d.archivo}`);
  }
  if (p.spec_id !== specId) throw new Error(`spec_id debe ser "${specId}"`);
  if (!Array.isArray(p.criterios) || !p.criterios.length) throw new Error('criterios vacío');
  for (const ca of p.criterios) if (!ca.id || !ca.texto || !ca.verificacion) throw new Error(`criterio incompleto: ${JSON.stringify(ca)}`);
  if (p.componente && !/^(quizaccess|local|quiz|block|qbank|qtype|qbehaviour|report|tool|theme)_[a-z0-9_]+$/.test(p.componente)) throw new Error(`componente inválido: ${p.componente}`);
  if (p.componente && !/^public\//.test(p.ruta_moodle || '')) throw new Error('ruta_moodle debe empezar con public/ (Moodle >= 5.1)');
  return p;
}

function ejecutarSondas(c, sondas) {
  const out = [];
  for (const s of sondas.slice(0, 8)) {
    const body = s.body !== undefined ? `-H 'Content-Type: application/json' --data '${JSON.stringify(s.body).replace(/'/g, "'\\''")}'` : '';
    const r = sh(`curl -s -m 15 -X ${s.metodo || 'GET'} ${body} -w '\\n__HTTP__%{http_code}' '${s.url}'`);
    const [cuerpo, code] = r.out.split('\n__HTTP__');
    out.push({ ...s, respuesta: { http: Number(code), cuerpo: cuerpo.slice(0, 4000) } });
    c.log('sonda', `${s.metodo || 'GET'} ${s.url} -> HTTP ${code}`, `${s.descripcion || ''}\n${cuerpo.slice(0, 1500)}`);
  }
  return out;
}

function validacionesEstaticas(c, specDir, plan) {
  const p = [];
  const plugins = moodle.pluginsDe(specDir);
  if (plan.componente) {
    const esperado = plugins.find((x) => x.componente === plan.componente);
    if (!esperado) p.push(`No existe ${specDir}/codigo/${plan.ruta_moodle}/version.php con $plugin->component = '${plan.componente}'.`);
    else if (esperado.rel !== plan.ruta_moodle) p.push(`El plugin está en ${esperado.rel} pero el plan dice ${plan.ruta_moodle}.`);
  }
  p.push(...moodle.lintPHP(specDir).map((x) => `Error de sintaxis PHP: ${x}`));
  const pruebas = archivos(`${specDir}/pruebas`, (f) => f.endsWith('.spec.ts'));
  if (!pruebas.length) p.push(`No hay pruebas en ${specDir}/pruebas/*.spec.ts`);
  const textoPruebas = pruebas.map((f) => leer(f)).join('\n');
  p.push(...copiasDeHelpers(archivos(`${specDir}/pruebas`, (f) => f.endsWith('.ts')).map((f) => ({ archivo: f, texto: leer(f) }))));
  // El corrector puede resolverlas; si llegaran a la etapa 8 detendrían la corrida sin PR.
  p.push(...auditar({}).hallazgos.filter((h) => REGLAS_ESTATICAS.has(h.regla)).map((h) => `[${h.regla}] ${h.donde}: ${h.detalle}`));
  for (const ca of plan.criterios) {
    if (ca.verificacion === 'proceso') continue;
    if (!textoPruebas.includes(`[${ca.id}]`)) p.push(`Ninguna prueba cubre ${ca.id} (el título debe incluir "[${ca.id}]").`);
  }
  c.log('validacion', p.length ? `${p.length} problema(s) estáticos.` : 'Validaciones estáticas OK (estructura, sintaxis PHP, cobertura de criterios).', p.join('\n') || null);
  return p;
}

function rutasPluginsDesplegados() {
  return fs.readdirSync(path.join(RAIZ, 'salidas')).flatMap((s) => moodle.pluginsDe(`salidas/${s}`).map((p) => p.rel));
}

function abrirPR(c, rama, plan, specDir, st, txtH, nuevas) {
  const cuerpo = `## ${plan.titulo}\n\nPropuesto por la fábrica a partir de \`${specDir}/spec.md\`. **El pipeline se detiene aquí: requiere aprobación humana. No mergea ni despliega.**\n\n`
    + `### Capa elegida\n\`${plan.componente || 'solo pruebas'}\` (${plan.ruta_moodle || '—'})\n\n${plan.capa_justificacion}\n\n`
    + `### Bordes del spec y criterio aplicado\n${plan.bordes.map((b) => `- **${b.descripcion}** → ${b.decision} _(${b.criterio})_`).join('\n')}\n\n`
    + `### Evidencia\n- Trazabilidad: \`${specDir}/trazabilidad.md\`\n- Diff: \`${specDir}/cambios.diff\`\n- Corrida: \`${c.dir}/\` (pipeline.log, funcional.xml, visual/, honestidad.log)\n`
    + `- Suite completa: ${st.passed} OK, ${st.failed} fallidas, ${st.skipped} omitidas\n\n`
    + (nuevas.length ? `### ⚠️ Líneas base visuales NUEVAS — revisar y aprobar\n${nuevas.map((n) => `- \`visual/lineas-base/${n}\``).join('\n')}\nAprobar con: \`node factory/cli.mjs aprobar-linea-base --pendientes --razon "..."\`\n\n` : '')
    + ((plan.pruebas_afectadas || []).length ? `### ⚠️ Pruebas aprobadas modificadas — revisar y aprobar\n${plan.pruebas_afectadas.map((d) => `- \`${d.archivo}\`: ${d.motivo}\n\n  \`\`\`diff\n  - ${d.antes}\n  + ${d.despues}\n  \`\`\``).join('\n')}\n\n` : '')
    + `### Control de verificación honesta\n\`\`\`\n${txtH}\`\`\`\n`;
  escribir(c.ruta('pr.md'), cuerpo);
  const push = sh(`git push -q -u origin ${rama}`);
  if (push.code !== 0) { c.log('pr', 'No se pudo hacer push (¿sin remoto/credenciales?). El PR queda descrito en pr.md.', push.err); return `(local) ${c.ruta('pr.md')}`; }
  const r = sh(`gh pr create --base main --head ${rama} --title "[${plan.spec_id}] ${plan.titulo}" --body-file ${c.ruta('pr.md')}`);
  return r.code === 0 ? r.out.trim() : `(no creado: ${r.err.trim()}) ${c.ruta('pr.md')}`;
}

// ---------------------------------------------------------------------------------------------------------
async function suite() {
  const c = corridaActiva = new Corrida('suite');
  c.iniciarEstado(ETAPAS_SUITE);
  if (!moodle.moodleArriba()) return falla(c, 'precondicion', 'Moodle no responde. Ejecutar: bash entorno/setup.sh');
  c.etapa('precondicion', 'VALIDADO', 'Moodle responde.');
  for (const s of fs.readdirSync(path.join(RAIZ, 'salidas'))) if (moodle.pluginsDe(`salidas/${s}`).length) {
    const d = moodle.desplegar(`salidas/${s}`);
    c.log('despliegue', `${s}: ${d.ok ? 'OK' : 'FALLÓ'}`, d.ok ? null : d.salida);
  }
  moodle.reset();
  const r = correrPruebas(resto.filter((a) => !a.startsWith('--')), c.dir);
  const s = resumen(r.resultados);
  c.log('suite', `Funcional + visual: ${s.passed} OK, ${s.failed} fallidas, ${s.skipped} omitidas. Reporte: ${c.dir}/visual/index.html`, s.failed ? contextoFallos(c.dir, r.resultados) : null);
  if (s.failed) copiarDiferencias(c);
  c.etapa('pruebas', s.failed ? 'FALLIDO' : 'VALIDADO', `${s.passed} OK, ${s.failed} fallidas, ${s.skipped} omitidas.`);
  const { hallazgos: H, texto: txtH } = auditar({ resultados: r.resultados });
  escribir(c.ruta('honestidad.log'), txtH);
  c.log('honestidad', H.length ? `BLOQUEADO con ${H.length} hallazgo(s).` : 'OK.', txtH);
  c.etapa('honestidad', H.length ? 'FALLIDO' : 'VALIDADO', H.length ? `${H.length} hallazgo(s).` : 'Sin hallazgos.');
  return s.failed || H.length ? 1 : 0;
}

/** Copia esperada/obtenida/diferencia de las comparaciones visuales fallidas a visual/diferencias/<corrida>/ */
function copiarDiferencias(c) {
  const art = path.join(RAIZ, c.dir, 'artefactos');
  if (!fs.existsSync(art)) return;
  for (const f of fs.readdirSync(art, { recursive: true }).filter((x) => /-(expected|actual|diff)\.png$/.test(x))) {
    fs.mkdirSync(path.join(RAIZ, 'visual/diferencias', c.id), { recursive: true });
    fs.copyFileSync(path.join(art, f), path.join(RAIZ, 'visual/diferencias', c.id, path.basename(path.dirname(f)) + '--' + path.basename(f)));
  }
  c.log('visual', `Imágenes esperada/obtenida/diferencia copiadas a visual/diferencias/${c.id}/`);
}

async function honestidad() {
  const cargar = (bandera) => { const p = opt(bandera); return p ? JSON.parse(leer(p)) : undefined; };
  const { hallazgos: H, texto } = auditar({ resultados: cargar('--resultados'), sinFeature: cargar('--sin-feature'), plan: cargar('--plan') });
  process.stdout.write(texto);
  return H.length ? 1 : 0;
}

async function aprobarLB() {
  const razon = opt('--razon');
  if (!razon || razon.length < 15) throw new Error('Aprobar una línea base exige --razon "<qué cambió a propósito y por qué>" (mín. 15 caracteres).');
  const quien = sh('git config user.name').out.trim() || process.env.USER;
  const objetivos = resto.includes('--pendientes') ? null : resto.filter((a) => a.endsWith('.png'));
  const hechos = aprobarLineaBase(objetivos, razon, quien);
  console.log(hechos.length ? `Aprobadas por ${quien}:\n${hechos.join('\n')}` : 'Nada que aprobar.');
  return 0;
}

async function aprobarPruebas() {
  const razon = opt('--razon');
  if (!razon || razon.length < 15) throw new Error('Aprobar el manifiesto de pruebas exige --razon (mín. 15 caracteres).');
  // Importación dinámica a propósito: nada de la copia de trabajo de factory/honestidad/ se carga al auditar.
  const { construirManifiesto } = await import('./honestidad/verificar.mjs');
  const m = construirManifiesto();
  escribir('factory/honestidad/manifiesto.json', JSON.stringify(m, null, 2) + '\n');
  fs.appendFileSync(path.join(RAIZ, 'factory/honestidad/aprobaciones.log'), `${new Date().toISOString()} ${sh('git config user.name').out.trim()}: ${Object.keys(m.pruebas).length} pruebas — ${razon}\n`);
  console.log(`Manifiesto actualizado (${Object.keys(m.pruebas).length} pruebas). Se vuelve referencia cuando se mergea a main.`);
  return 0;
}
