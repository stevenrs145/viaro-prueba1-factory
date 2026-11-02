import { defineConfig, devices } from '@playwright/test';

// Corre SIEMPRE dentro de mcr.microsoft.com/playwright:v1.64.1-noble (ver factory/lib/suite.mjs),
// para que el renderizado (fuentes, antialiasing) sea idéntico en cualquier máquina.
const OUT = process.env.QA_OUT || 'test-results/ultima';

export default defineConfig({
  testDir: '.',
  testMatch: ['factory/regresion/**/*.spec.ts', 'salidas/*/pruebas/**/*.spec.ts'],
  // Estado compartido (un solo Moodle): secuencial y determinista.
  workers: 1,
  fullyParallel: false,
  // Sin reintentos: un reintento automático esconde pruebas inestables. Si algo es flaky, se arregla.
  retries: 0,
  timeout: 90_000,
  outputDir: `${OUT}/artefactos`,
  reporter: [
    ['list'],
    ['junit', { outputFile: `${OUT}/funcional.xml` }],
    ['json', { outputFile: `${OUT}/resultados.json` }],
    ['html', { outputFolder: `${OUT}/visual`, open: 'never' }],
  ],
  // Líneas base versionadas en el repo, un archivo por pantalla y viewport.
  snapshotPathTemplate: 'visual/lineas-base/{arg}--{projectName}{ext}',
  expect: {
    toHaveScreenshot: {
      // threshold: tolerancia de color POR PIXEL (YIQ, 0..1). 0.2 absorbe antialiasing de fuentes.
      // maxDiffPixelRatio: fracción de pixeles distintos tolerada en la pantalla. 0.002 = 0,2 %.
      //   Una fila nueva, un botón desplazado o un color de tema cambiado superan eso con holgura;
      //   el ruido de subpixel queda por debajo. Criterio y mediciones en cobertura.md.
      threshold: 0.2,
      maxDiffPixelRatio: 0.002,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    },
  },
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8090',
    locale: 'es-GT',
    timezoneId: 'America/Guatemala',
    // Una acción que no encuentra su elemento falla en 15 s, no al agotar el timeout de la prueba:
    // los fallos se diagnostican rápido y no consumen minutos del pipeline.
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 900 } } },
    { name: 'movil', use: { ...devices['Pixel 7'] } },
  ],
});
