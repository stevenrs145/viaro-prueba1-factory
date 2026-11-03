// Notificación del resultado a un sistema externo: envío real por cron hacia el receptor, con errores forzados en él.
// El modo del receptor es global y Playwright corre con un solo worker. Cada prueba espera a que su envío termine:
// si un reintento quedara en cola, podría consumir el fallo forzado por la prueba siguiente.
import { test, expect } from '@playwright/test';
import { enviarIntento, filaResumen, login, prepararCaptura, receptor } from '../../../factory/regresion/helpers';
import {
  abrirLlamadas, abrirRegistro, AJUSTES, ajustarPlugin, avisosDe, calificarEnsayo, campoDestino, DESTINO_INEXISTENTE, DESTINO_OK,
  DURACION_PRUEBA, ESPERA_ENVIO, ESPERA_REINTENTO, esperarEstado, filaEnvio, filasLlamadas, intentoEnRevision, REGISTRO,
  rendirExamen, responderExamen, tituloRegistro,
} from './apoyo';

const SONDEO = { timeout: ESPERA_REINTENTO, intervals: [2_000] };

test.setTimeout(DURACION_PRUEBA);

test.beforeEach(async ({ page }) => {
  await receptor(page, '/_control', { mode: 'ok' });
  await ajustarPlugin(page, { destino: DESTINO_OK });
});

test.afterEach(async ({ page }) => {
  await receptor(page, '/_control', { mode: 'ok' });
  await ajustarPlugin(page, { destino: '', maxintentos: 12 });
});

test('[CA-1] un intento con nota llega con estudiante, examen, notas y marca de tiempo, y queda exitoso @requiere-feature', async ({ page }) => {
  await login(page, 'estudiante7');
  const intento = await rendirExamen(page);
  await expect(filaResumen(page, 'Calificación')).toContainText('8,33 de 10,00');
  const notaRevision = Number((await filaResumen(page, 'Calificación').innerText()).split(' ')[0].replace(',', '.'));

  await expect.poll(async () => (await avisosDe(page, intento)).length, SONDEO).toEqual(1);
  const [aviso] = await avisosDe(page, intento);
  expect(aviso.status).toEqual(201);
  expect(aviso.cuerpo.student).toEqual({ id: expect.any(Number), username: 'estudiante7', idnumber: 'ESTUDIANTE7' });
  expect(aviso.cuerpo.quiz).toEqual({ id: expect.any(Number), cmid: expect.any(Number), name: 'Examen de regresión' });
  expect(aviso.cuerpo.grade_status).toEqual('graded');
  expect(aviso.cuerpo.attempt_grade).toBeCloseTo(notaRevision, 2);
  expect(aviso.cuerpo.final_grade).toBeCloseTo(notaRevision, 2);
  expect(aviso.cuerpo.max_grade).toEqual(10);
  expect(aviso.cuerpo.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
  expect(Math.abs(Date.now() - Date.parse(aviso.cuerpo.timestamp))).toBeLessThan(ESPERA_REINTENTO + 60_000);

  await login(page, 'admin');
  await esperarEstado(page, intento, 'Exitoso', ESPERA_ENVIO);
  const idExterno = JSON.parse(JSON.stringify(aviso)).response.id as string;
  await expect(filaEnvio(page)).toContainText(idExterno);
  await expect(filaEnvio(page)).toContainText('estudiante7');
});

test('[CA-1] con ensayo sale un aviso pendiente y otro con nota al calificarlo a mano @requiere-feature', async ({ page }) => {
  const textoEnsayo = `Ensayo de spec-2 ${Date.now()}`;
  await login(page, 'estudiante8');
  const cmid = await responderExamen(page, textoEnsayo);
  await enviarIntento(page);
  const intento = intentoEnRevision(page);
  await expect(filaResumen(page, 'Calificación')).toHaveText('Sin calificar aún');

  await expect.poll(async () => (await avisosDe(page, intento)).length, SONDEO).toEqual(1);
  const [pendiente] = await avisosDe(page, intento);
  expect(pendiente.cuerpo.grade_status).toEqual('pending');
  expect(pendiente.cuerpo.attempt_grade).toEqual(null);

  await login(page, 'profesor');
  await calificarEnsayo(page, cmid, textoEnsayo);

  await expect.poll(async () => (await avisosDe(page, intento)).length, SONDEO).toEqual(2);
  const [, calificado] = await avisosDe(page, intento);
  expect(calificado.cuerpo.idempotency_key).not.toEqual(pendiente.cuerpo.idempotency_key);
  expect(calificado.cuerpo.grade_status).toEqual('graded');
  expect(calificado.cuerpo.attempt_grade).toBeCloseTo(10, 2);
  expect(calificado.cuerpo.final_grade).toBeCloseTo(10, 2);

  await login(page, 'admin');
  await abrirRegistro(page, intento);
  await expect(filaEnvio(page).filter({ hasText: 'pending' })).toContainText('Exitoso');
  await expect(filaEnvio(page).filter({ hasText: 'graded' })).toContainText('Exitoso');
});

test('[CA-2] el admin guarda el destino, persiste al recargar y un estudiante no puede abrir los ajustes @requiere-feature', async ({ page }) => {
  await ajustarPlugin(page, { destino: 'http://receptor/otra-ruta' });
  await page.reload();
  await expect(campoDestino(page)).toHaveValue('http://receptor/otra-ruta');

  await login(page, 'estudiante7');
  await page.goto(AJUSTES);
  await expect(campoDestino(page)).toHaveCount(0);
});

test('[CA-2] pantalla de ajustes del plugin @requiere-feature', async ({ page }) => {
  await page.goto(AJUSTES);
  await expect(campoDestino(page)).toHaveValue(DESTINO_OK);
  await expect(page).toHaveScreenshot('spec-2-ajustes.png', { fullPage: true, mask: await prepararCaptura(page) });
});

test('[CA-2] se usa la URL configurada: la ruta mala da 404 y al corregirla sale el envío en cola @requiere-feature @camino-error', async ({ page }) => {
  await ajustarPlugin(page, { destino: DESTINO_INEXISTENTE });
  await login(page, 'estudiante7');
  const intento = await rendirExamen(page);

  await login(page, 'admin');
  await esperarEstado(page, intento, 'Reintentando', ESPERA_ENVIO);
  await expect(filaEnvio(page)).toContainText('HTTP 404');
  await abrirLlamadas(page, intento);
  await expect(filasLlamadas(page)).toHaveCount(1);
  await expect(filasLlamadas(page)).toContainText(DESTINO_INEXISTENTE);
  await expect(filasLlamadas(page)).toContainText('404');

  await ajustarPlugin(page, { destino: DESTINO_OK });
  await esperarEstado(page, intento, 'Exitoso', ESPERA_REINTENTO);
  await abrirLlamadas(page, intento);
  await expect(filasLlamadas(page).last()).toContainText(DESTINO_OK);
});

test('[CA-2] con el destino vacío no hay POST y el registro queda omitido @requiere-feature', async ({ page }) => {
  await ajustarPlugin(page, { destino: '' });
  await login(page, 'estudiante7');
  const intento = await rendirExamen(page);

  await login(page, 'admin');
  await abrirRegistro(page, intento);
  await expect(filaEnvio(page)).toContainText('Omitido');
  await expect(filaEnvio(page)).toContainText('destino no configurado');
  await expect(await avisosDe(page, intento)).toHaveLength(0);
});

test('[CA-3] [CA-4] un 500 se reintenta con la misma clave, sin error para el estudiante, y el registro conserva cada llamada @requiere-feature @camino-error', async ({ page }) => {
  await receptor(page, '/_control', { mode: 'http500', times: 1 });
  await login(page, 'estudiante7');
  const intento = await rendirExamen(page);
  await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');
  await expect(page.locator('.alert-danger')).toHaveCount(0);

  await login(page, 'admin');
  await esperarEstado(page, intento, 'Reintentando', ESPERA_ENVIO);
  await expect(filaEnvio(page)).toContainText('HTTP 500');
  await expect(filaEnvio(page)).toContainText('database unavailable (simulated)');

  await esperarEstado(page, intento, 'Exitoso', ESPERA_REINTENTO);
  const avisos = await avisosDe(page, intento);
  expect(avisos.map((a) => a.status)).toEqual([500, 201]);
  expect(avisos[1].cuerpo.idempotency_key).toEqual(avisos[0].cuerpo.idempotency_key);
  expect(avisos[1].headers['idempotency-key']).toEqual(avisos[0].cuerpo.idempotency_key);

  await abrirLlamadas(page, intento);
  await expect(filasLlamadas(page)).toHaveCount(2);
  await expect(filasLlamadas(page).first()).toContainText('database unavailable (simulated)');
  await expect(filasLlamadas(page).first()).toContainText('Fallida');
  await expect(filasLlamadas(page).last()).toContainText('201');
  await expect(filasLlamadas(page).last()).toContainText('Aceptada');
});

test('[CA-3] [CA-4] con el destino colgado el envío no demora al estudiante y el registro muestra el error real de cURL @requiere-feature @camino-error', async ({ page }) => {
  await receptor(page, '/_control', { mode: 'timeout' });
  await login(page, 'estudiante7');
  await responderExamen(page);
  const inicio = Date.now();
  await enviarIntento(page);
  // Si la llamada HTTP estuviera en esta petición, tardaría al menos los 10 s del timeout del cliente.
  expect(Date.now() - inicio).toBeLessThan(10_000);
  const intento = intentoEnRevision(page);
  await expect(filaResumen(page, 'Estado')).toHaveText('Finalizado');

  await login(page, 'admin');
  await esperarEstado(page, intento, 'Reintentando', ESPERA_ENVIO);
  await expect(filaEnvio(page)).toContainText('cURL errno 28');
  await expect(filaEnvio(page)).toContainText('timed out');

  await receptor(page, '/_control', { mode: 'ok' });
  await esperarEstado(page, intento, 'Exitoso', ESPERA_REINTENTO);
  const avisos = await avisosDe(page, intento);
  expect(avisos.map((a) => a.status)).toEqual([null, 201]);
});

test('[CA-3] [CA-4] un 200 con error en el cuerpo no cuenta como éxito y se reintenta @requiere-feature @camino-error', async ({ page }) => {
  await receptor(page, '/_control', { mode: 'ok_with_error_body', times: 1 });
  await login(page, 'estudiante7');
  const intento = await rendirExamen(page);

  await login(page, 'admin');
  await esperarEstado(page, intento, 'Reintentando', ESPERA_ENVIO);
  await expect(filaEnvio(page)).toContainText('queue full, not stored');

  await esperarEstado(page, intento, 'Exitoso', ESPERA_REINTENTO);
  const avisos = await avisosDe(page, intento);
  expect(avisos.map((a) => a.status)).toEqual([200, 201]);
});

test('[CA-4] una respuesta HTML de proxy se muestra como texto escapado @requiere-feature @camino-error', async ({ page }) => {
  await receptor(page, '/_control', { mode: 'html_proxy', times: 1 });
  await login(page, 'estudiante7');
  const intento = await rendirExamen(page);

  await login(page, 'admin');
  await esperarEstado(page, intento, 'Reintentando', ESPERA_ENVIO);
  await expect(filaEnvio(page)).toContainText('HTTP 502');
  await expect(filaEnvio(page)).toContainText('<h1>502 Bad Gateway</h1>');
  await expect(filaEnvio(page).locator('h1')).toHaveCount(0);

  await abrirLlamadas(page, intento);
  await expect(filasLlamadas(page)).toContainText('502');
  await expect(filasLlamadas(page)).toContainText('<h1>502 Bad Gateway</h1>');
  await expect(filasLlamadas(page).locator('h1')).toHaveCount(0);

  await esperarEstado(page, intento, 'Exitoso', ESPERA_REINTENTO);
  await expect(filaEnvio(page)).toContainText('Exitoso');
});

test('[CA-3] al fallar la última ejecución el envío queda agotado, con la causa y sin más intentos @requiere-feature @camino-error', async ({ page }) => {
  await ajustarPlugin(page, { maxintentos: 1 });
  await receptor(page, '/_control', { mode: 'http500' });
  await login(page, 'estudiante7');
  const intento = await rendirExamen(page);

  await login(page, 'admin');
  await esperarEstado(page, intento, 'Agotado', ESPERA_ENVIO);
  await expect(filaEnvio(page)).toContainText('database unavailable (simulated)');

  // Más que el backoff de 60 s y una vuelta del cron: si quedara un reintento, ya habría llegado.
  await page.waitForTimeout(75_000);
  await expect(await avisosDe(page, intento)).toHaveLength(1);
  await abrirLlamadas(page, intento);
  await expect(filasLlamadas(page)).toHaveCount(1);
});

test('[CA-4] el admin abre el registro y un estudiante no puede @requiere-feature', async ({ page }) => {
  await page.goto(REGISTRO);
  await expect(tituloRegistro(page)).toBeVisible();

  await login(page, 'estudiante7');
  await page.goto(REGISTRO);
  await expect(tituloRegistro(page)).toHaveCount(0);
  await expect(page.locator('body')).toContainText('Ver el registro de envíos al sistema externo');
});

test('[CA-4] pantalla del registro sin envíos @requiere-feature', async ({ page }) => {
  // Las filas con datos llevan fechas e identificadores de cada corrida: la captura estable es la del filtro sin resultados.
  await abrirRegistro(page, -1);
  await expect(page.locator('#region-main')).toContainText('No hay envíos para mostrar.');
  await expect(page).toHaveScreenshot('spec-2-registro-vacio.png', { fullPage: true, mask: await prepararCaptura(page) });
});
