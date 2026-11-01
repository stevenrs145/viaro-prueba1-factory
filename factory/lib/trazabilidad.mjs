// Trazabilidad: criterio de aceptación -> archivos que lo implementan -> pruebas que lo cubren -> resultado.
// Se construye a partir del plan (lo que la IA declaró) CRUZADO con lo que realmente existe y corrió.
import { escribir, archivos, leer } from './util.mjs';

export function generarTrazabilidad({ plan, specDir, resultados, corrida }) {
  const codigo = archivos(`${specDir}/codigo`);
  const pruebas = archivos(`${specDir}/pruebas`, (f) => f.endsWith('.spec.ts'));
  const filas = plan.criterios.map((ca) => {
    const declarados = (ca.archivos || []).map((a) => {
      const real = codigo.find((f) => f.endsWith(a.replace(/^\/+/, '')));
      return real ? `\`${real.replace(`${specDir}/codigo/`, '')}\`` : `~~${a}~~ (declarado, no existe)`;
    });
    const deCA = resultados.filter((r) => r.titulo.includes(`[${ca.id}]`));
    const archivosPrueba = [...new Set(deCA.map((r) => r.archivo))];
    const estados = deCA.map((r) => `${r.proyecto}: ${r.estado === 'passed' ? '✅' : r.estado === 'skipped' ? '⏭️' : '❌'}`);
    const verificacion = ca.verificacion === 'proceso' ? 'proceso (evidencia en corrida)' : ca.verificacion;
    return `| ${ca.id} | ${ca.texto.replace(/\|/g, '/')} | ${declarados.join('<br>') || '—'} | ${archivosPrueba.map((a) => `\`${a}\``).join('<br>') || (ca.verificacion === 'proceso' ? '—' : '**SIN PRUEBA**')} | ${verificacion} | ${estados.join(' · ') || '—'} |`;
  });
  const md = `# Trazabilidad — ${plan.spec_id}: ${plan.titulo}

Generado por la fábrica en la corrida \`${corrida.dir}\`. Cruza lo que el plan declaró con lo que existe y corrió.

**Capa:** \`${plan.componente || 'solo pruebas'}\` → \`${plan.ruta_moodle || '—'}\`

| Criterio | Texto | Archivos que lo implementan | Pruebas que lo cubren | Tipo | Resultado |
|---|---|---|---|---|---|
${filas.join('\n')}

## Bordes resueltos
${plan.bordes.map((b) => `- **${b.descripcion}** → ${b.decision}. _Criterio:_ ${b.criterio}${b.preguntaria ? ` _(Habría preguntado: ${b.preguntaria})_` : ''}`).join('\n')}

## Archivos generados
${codigo.map((f) => `- \`${f}\``).join('\n') || '- (ninguno: spec de solo pruebas)'}
${pruebas.map((f) => `- \`${f}\``).join('\n')}
`;
  escribir(`${specDir}/trazabilidad.md`, md);
  return md;
}

export { leer };
