#!/usr/bin/env node
/*
 * scripts/serve.js — servidor estático mínimo para los tests E2E.
 *
 *   node scripts/serve.js [puerto]
 *
 * Sirve el sitio desde la raíz del repositorio, sin dependencias. Se usa como
 * `webServer` de Playwright (playwright.config.js) para que los tests naveguen
 * sobre http:// y para que los 404 sean 404 reales (file:// no los distingue).
 */
const fs = require("fs");
const http = require("http");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || process.argv[2] || 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const send = (res, status, body) => {
  res.writeHead(status, {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(body);
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${HOST}`).pathname);
  } catch {
    return send(res, 400, "Solicitud inválida");
  }

  const file = path.resolve(ROOT, `.${pathname}`);
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) {
    return send(res, 403, "Prohibido");
  }
  if (!fs.existsSync(file)) {
    return send(res, 404, `No encontrado: ${pathname}`);
  }

  const target = fs.statSync(file).isDirectory() ? path.join(file, "index.html") : file;
  if (!fs.existsSync(target)) {
    return send(res, 404, `No encontrado: ${pathname}`);
  }

  res.writeHead(200, {
    "content-type": MIME[path.extname(target).toLowerCase()] || "application/octet-stream",
    "cache-control": "no-store",
  });
  fs.createReadStream(target).pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor estático: http://${HOST}:${PORT}`);
});
