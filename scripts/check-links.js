#!/usr/bin/env node
/*
 * scripts/check-links.js — verifica que los enlaces internos del sitio no estén
 * rotos. Sin dependencias (solo Node): pensado para `npm run check` y el CI.
 *
 *   1) Cada <a href="..."> local apunta a un archivo existente.
 *   2) Cada ancla (#id, pagina.html#id) existe en la página destino.
 *   3) Los enlaces dinámicos noticias.html#noticia-<id> se validan contra
 *      js/data/noticias.data.js (los resuelve JS, no hay id en el HTML).
 *   4) Los assets referenciados (link/script/img) existen en disco.
 *
 * Los enlaces externos (http, mailto, tel) se omiten por defecto para que el CI
 * no dependa de terceros. Con CHECK_EXTERNAL=1 se comprueba su estado HTTP.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const PAGES = [
  "index.html",
  "institucional.html",
  "plan-estudios.html",
  "noticias.html",
  "experiencias.html",
  "contacto.html",
  "plantilla.html",
];
const EXTERNAL = /^(https?:|mailto:|tel:|data:|javascript:)/i;
const ANCHOR_RE = /<a\b[^>]*\bhref="([^"]*)"/gi;
const ASSET_RE = /<(?:link|script|img)\b[^>]*\b(?:href|src)="([^"]+)"/gi;
const ID_RE = /\bid="([^"]+)"/g;

const problems = [];
const count = { enlaces: 0, anclas: 0, assets: 0, externos: 0 };
const htmlByPage = new Map();
const idsByPage = new Map();

const abs = (rel) => path.join(ROOT, rel);
const exists = (rel) => fs.existsSync(abs(rel));
const read = (rel) => fs.readFileSync(abs(rel), "utf8");

for (const page of PAGES) {
  if (!exists(page)) continue;
  const html = read(page);
  htmlByPage.set(page, html);
  idsByPage.set(page, new Set([...html.matchAll(ID_RE)].map((m) => m[1])));
}

// Anclas que resuelve JavaScript en lugar de un id real.
function jsAnchors(page) {
  if (page !== "noticias.html") return new Set();
  const source = "js/data/noticias.data.js";
  if (!exists(source)) return new Set();
  try {
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(read(source), sandbox, { filename: source });
    const data = vm.runInContext("noticiasData", sandbox);
    return new Set((data.noticias || []).map((n) => `noticia-${n.id}`));
  } catch {
    return new Set();
  }
}

// Normaliza un href relativo a la página que lo contiene (todas las páginas
// viven en la raíz, pero se resuelve igual por si alguna se mueve a una carpeta).
function resolveTarget(page, ref) {
  const clean = ref.split("?")[0].split("#")[0];
  if (!clean) return page;
  if (clean.endsWith("/")) return path.posix.join(clean, "index.html");
  return path.posix.normalize(path.posix.join(path.posix.dirname(page), clean));
}

function checkAnchor(page, target, hash) {
  const id = hash.slice(1);
  if (!id) return;
  const ids = idsByPage.get(target);
  const dynamic = jsAnchors(target);
  const ok = ids ? ids.has(id) : false;
  if (!ok && !dynamic.has(id)) {
    problems.push(`${page}: ancla rota "${page === target ? "#" + id : target + "#" + id}" (no existe el id "${id}" en ${target})`);
  } else {
    count.anclas += 1;
  }
}

async function checkExternal(page, ref) {
  const url = ref.startsWith("//") ? `https:${ref}` : ref;
  if (!/^https?:/i.test(url)) return;
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(10000) });
    // 403/405: algunos servidores rechazan HEAD; no lo tomamos como enlace roto.
    if (res.status >= 400 && ![403, 405].includes(res.status)) {
      problems.push(`${page}: enlace externo "${ref}" responde ${res.status}`);
    }
  } catch (error) {
    problems.push(`${page}: enlace externo "${ref}" inaccesible (${error.message})`);
  }
}

async function main() {
  for (const [page, html] of htmlByPage) {
    // Los comentarios pueden contener ejemplos de markup (p. ej. la imagen del
    // hero todavía no reemplazada): no son enlaces reales.
    const visible = html.replace(/<!--[\s\S]*?-->/g, "");
    const refs = [
      ...[...visible.matchAll(ANCHOR_RE)].map((m) => ({ ref: m[1], kind: "enlace" })),
      ...[...visible.matchAll(ASSET_RE)].map((m) => ({ ref: m[1], kind: "asset" })),
    ];

    for (const { ref, kind } of refs) {
      const value = ref.trim();
      if (!value) {
        problems.push(`${page}: ${kind} con href/src vacío`);
        continue;
      }
      if (EXTERNAL.test(value)) {
        count.externos += 1;
        if (process.env.CHECK_EXTERNAL === "1") await checkExternal(page, value);
        continue;
      }
      if (value.startsWith("//")) {
        count.externos += 1;
        if (process.env.CHECK_EXTERNAL === "1") await checkExternal(page, value);
        continue;
      }

      const [target, hash] = value.split("#");
      const file = resolveTarget(page, target || page);
      if (!exists(file)) {
        problems.push(`${page}: ${kind} roto "${value}" (no existe ${file})`);
        continue;
      }

      if (kind === "asset") {
        count.assets += 1;
        continue;
      }
      count.enlaces += 1;
      if (hash !== undefined) checkAnchor(page, target ? file : page, `#${hash}`);
    }
  }

  const total = count.enlaces + count.assets;
  console.log(
    `Enlaces verificados: ${total} (${count.enlaces} enlaces, ${count.assets} assets, ${count.anclas} anclas)` +
      (count.externos ? ` — ${count.externos} externos omitidos` : "")
  );

  if (problems.length) {
    console.error("Enlaces con problemas:\n - " + problems.join("\n - "));
    process.exit(1);
  }
  console.log("Chequeo de enlaces: OK");
}

main();
