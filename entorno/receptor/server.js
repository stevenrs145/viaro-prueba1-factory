// Receptor que simula el "sistema externo de la institución" (spec 2). Sin dependencias.
//
// Contrato real (el pipeline lo descubre sondeando, no lo asume):
//   POST /resultados  JSON
//     - faltan campos o JSON inválido -> 422 {"status":"error","errors":[...campos faltantes...]}
//     - ok                             -> 201 {"status":"accepted","id":"<uuid>","duplicate":false}
//     - repetido (misma idempotency_key o cabecera Idempotency-Key) -> 200 {"status":"accepted","id":..., "duplicate":true}
//
// Control de fallos para pruebas (NO es parte del contrato del sistema externo):
//   POST /_control {"mode":"ok"|"http500"|"timeout"|"ok_with_error_body"|"html_proxy","times":N}
//   GET  /_recibidos   todo lo recibido y lo respondido
//   POST /_reset       limpia estado
const http = require('http');
const crypto = require('crypto');

const REQUIRED = ['idempotency_key', 'student', 'quiz', 'attempt', 'timestamp'];
let mode = 'ok';
let remaining = Infinity;
let recibidos = [];
let accepted = new Map();

const send = (res, code, body, type = 'application/json') => {
  res.writeHead(code, { 'Content-Type': type });
  res.end(type === 'application/json' ? JSON.stringify(body) : body);
};
const readBody = (req) => new Promise((ok) => { let d = ''; req.on('data', (c) => (d += c)); req.on('end', () => ok(d)); });

function nextMode() {
  if (remaining <= 0) { mode = 'ok'; remaining = Infinity; }
  const m = mode;
  if (remaining !== Infinity) remaining--;
  return m;
}

async function resultados(req, res) {
  const raw = await readBody(req);
  const entry = { at: new Date().toISOString(), headers: req.headers, raw, mode: null, status: null, response: null };
  recibidos.push(entry);
  const m = nextMode();
  entry.mode = m;
  const reply = (code, body, type) => { entry.status = code; entry.response = body; send(res, code, body, type); };

  if (m === 'timeout') return; // nunca responde: el cliente debe cortar por timeout
  if (m === 'http500') return reply(500, { status: 'error', message: 'database unavailable (simulated)' });
  if (m === 'html_proxy') return reply(502, '<html><body><h1>502 Bad Gateway</h1>nginx</body></html>', 'text/html');
  if (m === 'ok_with_error_body') return reply(200, { status: 'error', message: 'queue full, not stored' });

  let body;
  try { body = JSON.parse(raw); } catch (e) { return reply(422, { status: 'error', errors: ['invalid_json: ' + e.message] }); }
  const key = body.idempotency_key || req.headers['idempotency-key'];
  const missing = REQUIRED.filter((f) => body[f] === undefined && !(f === 'idempotency_key' && key));
  if (missing.length) return reply(422, { status: 'error', errors: missing.map((f) => 'missing_field: ' + f) });
  if (accepted.has(key)) return reply(200, { status: 'accepted', id: accepted.get(key), duplicate: true });
  const id = crypto.randomUUID();
  accepted.set(key, id);
  return reply(201, { status: 'accepted', id, duplicate: false });
}

http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];
  if (req.method === 'POST' && url === '/resultados') return resultados(req, res);
  if (req.method === 'GET' && url === '/_recibidos') return send(res, 200, recibidos);
  if (req.method === 'POST' && url === '/_reset') { recibidos = []; accepted = new Map(); mode = 'ok'; remaining = Infinity; return send(res, 200, { ok: true }); }
  if (req.method === 'POST' && url === '/_control') {
    const c = JSON.parse((await readBody(req)) || '{}');
    mode = c.mode || 'ok';
    remaining = Number.isInteger(c.times) ? c.times : Infinity;
    return send(res, 200, { mode, times: c.times ?? null });
  }
  if (req.method === 'GET' && url === '/health') return send(res, 200, { ok: true });
  send(res, 404, { status: 'error', errors: ['not_found'] });
}).listen(80, () => console.log('receptor escuchando en :80'));
