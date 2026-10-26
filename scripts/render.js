// scripts/render.js — arma el HTML de los bloques de contenido desde js/data/.
// Lo usa scripts/build.js (Node). NO se ejecuta en el navegador: el HTML que
// produce queda escrito de forma estática en las páginas, para que el sitio
// siga funcionando aunque el JavaScript falle.
//
// Convención: cada función recibe los datos y devuelve un string con la
// indentación "relativa" (el primer nivel sin espacios). build.js se encarga
// de indentar cada línea según el marcador donde se inyecta.
//
// Dos mecanismos de contenido, siempre desde js/data/<pagina>.data.js:
//   1) Bloques repetidos (tarjetas, listas, hitos, FAQ...): se inyectan entre
//      los marcadores <!-- build:clave --> ... <!-- /build:clave -->.
//   2) Textos fijos (`textos`): cada clave corresponde a un elemento con
//      data-tx="clave" (o data-tx-attr="nombre" para un atributo).
"use strict";

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escAttr = (value) => esc(value).replace(/"/g, "&quot;");

const join = (rows) => rows.join("\n");

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

const shortDate = (iso) => {
  const [, month, day] = String(iso).split("-");
  return `${day} ${MONTHS[Number(month) - 1] || ""}`.trim();
};

/* ----------------------------- Textos fijos ------------------------------- */
// Contrato de cada entrada de `textos` (una entrada = un texto de la pantalla):
//   {
//     titulo:    "Texto principal (encabezado)",   // contenido, se escapa
//     detalle:   "Texto secundario (párrafo)",     // contenido, se escapa
//     fecha:     "2026-03-02",                     // contenido, se escapa
//     html:      "<span>…</span>",                 // marcado interno, tal cual
//     tipoFuente: "--font-sans",                   // tipografía: familia
//     tamano:    "--fs-h1",                        // tipografía: tamaño
//     color:     "--text"                          // tipografía: color (opcional)
//   }
// El texto que se escribe en el elemento es, por orden: html → titulo → detalle
// → fecha. `tipoFuente`/`tamano`/`color` son opcionales: si el valor empieza con
// "--" se interpreta como variable de tokens.css (var(--x)); si no, como valor
// CSS literal. Sin campos de tipografía no se genera clase (no se toca el estilo
// del componente). El CSS generado vive en css/pages/<pagina>/tipografia.css.

const valorCss = (v) => (String(v).startsWith("--") ? `var(${v})` : String(v));

const textoDe = (entry) => {
  if (entry.html !== undefined) return String(entry.html);
  if (entry.titulo !== undefined) return esc(entry.titulo);
  if (entry.detalle !== undefined) return esc(entry.detalle);
  if (entry.fecha !== undefined) return esc(entry.fecha);
  return "";
};

const typoCss = (key, entry) => {
  const decls = [];
  if (entry.tipoFuente) decls.push(`font-family: ${valorCss(entry.tipoFuente)};`);
  if (entry.tamano) decls.push(`font-size: ${valorCss(entry.tamano)};`);
  if (entry.color) decls.push(`color: ${valorCss(entry.color)};`);
  return decls.length ? `.tx-${key} { ${decls.join(" ")} }` : "";
};

// Devuelve { textos: { clave: { texto, clase } }, css: [líneas de CSS] }.
function prepararTextos(textos) {
  const salida = { textos: {}, css: [] };
  for (const [key, entry] of Object.entries(textos || {})) {
    const css = typoCss(key, entry);
    salida.textos[key] = {
      texto: textoDe(entry),
      textoAttr: escAttr(entry.titulo ?? entry.detalle ?? entry.fecha ?? ""),
      clase: css ? `tx-${key}` : null,
    };
    if (css) salida.css.push(css);
  }
  return salida;
}

/* ---------------------------------- Inicio --------------------------------- */

const statItem = (s) =>
  join([`<div>`, `  <p class="stat__value">${esc(s.titulo)}</p>`, `  <p class="stat__label">${esc(s.detalle)}</p>`, `</div>`]);

const propuestaCard = (item) => {
  if (item.destacada) {
    return join([
      `<article class="card card--brand card--elevated">`,
      `  <span class="card__label">${esc(item.etiqueta)}</span>`,
      `  <h3>${esc(item.titulo)}</h3>`,
      `  <p class="card__text">${esc(item.detalle)}</p>`,
      `</article>`,
    ]);
  }
  const enlace = item.enlace
    ? [`  <a class="link-arrow" href="${esc(item.enlace.href)}">${esc(item.enlace.texto)} <span aria-hidden="true">→</span></a>`]
    : [];
  return join([
    `<article class="card card--elevated">`,
    `  <h3>${esc(item.titulo)}</h3>`,
    `  <p class="card__text">${esc(item.detalle)}</p>`,
    ...enlace,
    `</article>`,
  ]);
};

const pilarCard = (item, index) =>
  join([
    `<article class="card card--elevated card--accent pilar-card">`,
    `  <span class="pilar-card__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>`,
    `  <h3>${esc(item.titulo)}</h3>`,
    `  <p class="card__text">${esc(item.detalle)}</p>`,
    `</article>`,
  ]);

const testimonialCard = (item) =>
  join([
    `<figure class="testimonial testimonial--compact">`,
    `  <blockquote class="testimonial__quote">${esc(item.detalle)}</blockquote>`,
    `  <figcaption class="testimonial__author"><span class="avatar" aria-hidden="true">${esc(item.iniciales || "[IN]")}</span><span class="testimonial__name">${esc(item.autor)}</span></figcaption>`,
    `</figure>`,
  ]);

const newsCard = (n) =>
  join([
    `<article class="news-card">`,
    `  <div class="news-card__media">`,
    `    <span class="news-card__date">${esc(shortDate(n.fecha))}</span>`,
    `  </div>`,
    `  <div class="news-card__body">`,
    `    <span class="caption">${esc(n.tipo)}</span>`,
    `    <h3 class="news-card__title"><a class="news-card__link" href="noticias.html#noticia-${esc(n.id)}">${esc(n.titulo)}</a></h3>`,
    `    <p class="news-card__text">${esc(n.detalle)}</p>`,
    `  </div>`,
    `</article>`,
  ]);

/* ------------------------------ Institucional ------------------------------ */

const factItem = (f) => join([`<div>`, `  <dt>${esc(f.titulo)}</dt>`, `  <dd>${esc(f.detalle)}</dd>`, `</div>`]);

const hitoItem = (h) =>
  join([`<li class="timeline__item"><span class="timeline__year">${esc(h.fecha)}</span>`, `  <p>${esc(h.detalle)}</p>`, `</li>`]);

const miVisionCard = (item) =>
  join([`<article class="card card--elevated">`, `  <h3>${esc(item.titulo)}</h3>`, `  <p class="card__text">${esc(item.detalle)}</p>`, `</article>`]);

const valorCard = (v) =>
  join([
    `<article class="card card--elevated card--accent value-card">`,
    `  <span class="icon-tile" aria-hidden="true">${esc(v.icono)}</span>`,
    `  <h3>${esc(v.titulo)}</h3>`,
    `  <p class="card__text">${esc(v.detalle)}</p>`,
    `</article>`,
  ]);

const autoridadCard = (a) =>
  join([
    `<article class="card card--elevated profile-card">`,
    `  <span class="profile-card__avatar" aria-hidden="true">[IN]</span>`,
    `  <h3>${esc(a.titulo)}</h3>`,
    `  <p class="profile-card__role">${esc(a.cargo)}</p>`,
    `  <p class="card__text">${esc(a.detalle)}</p>`,
    `</article>`,
  ]);

const areaCard = (a) => join([`<article class="area-card">`, `  <h3>${esc(a.titulo)}</h3>`, `  <p>${esc(a.detalle)}</p>`, `</article>`]);

/* ------------------------------- Experiencias ------------------------------ */

const proyectoCard = (p) =>
  join([
    `<article class="card card--elevated project-card">`,
    `  <div class="project-card__media" aria-hidden="true">Imagen del proyecto</div>`,
    `  <div class="project-card__body">`,
    `    <span class="project-card__meta">${esc(p.tipo)}</span>`,
    `    <h3>${esc(p.titulo)}</h3>`,
    `    <p class="card__text">${esc(p.detalle)}</p>`,
    `  </div>`,
    `</article>`,
  ]);

const actividadItem = (a) =>
  join([
    `<article class="activity">`,
    `  <span class="activity__date">${esc(a.fecha)}</span>`,
    `  <div class="activity__body">`,
    `    <h3>${esc(a.titulo)}</h3>`,
    `    <p>${esc(a.detalle)}</p>`,
    `  </div>`,
    `</article>`,
  ]);

const experienciaTestimonio = (t) =>
  join([
    `<article class="card card--elevated testimonial testimonial--compact">`,
    `  <blockquote class="testimonial__quote">${esc(t.detalle)}</blockquote>`,
    `  <p class="testimonial__author"><span class="avatar" aria-hidden="true">${esc(t.iniciales || "[IN]")}</span> <span class="testimonial__name">${esc(t.autor)}</span></p>`,
    `</article>`,
  ]);

/* -------------------------------- Contacto --------------------------------- */

const datoItem = (d) => join([`<div class="contact-list__item">`, `  <dt>${esc(d.titulo)}</dt>`, `  <dd>${esc(d.detalle)}</dd>`, `</div>`]);

const faqItem = (f) =>
  join([`<details class="faq__item">`, `  <summary>${esc(f.titulo)}</summary>`, `  <p>${esc(f.detalle)}</p>`, `</details>`]);

/* -------------------------- Plan de estudios (pestañas) -------------------- */

const yearTab = (year, label, index) =>
  `<button class="year-tab${index === 0 ? " is-active" : ""}" role="tab" aria-selected="${index === 0}" data-year="${esc(year)}"${index === 0 ? "" : ' tabindex="-1"'}>${esc(label)}</button>`;

/* --------------------------------- Bloques --------------------------------- */

// Devuelve { "pagina.html": { claveDelMarcador: html } }.
function buildBlocks(data) {
  const inicio = data.inicioData || {};
  const institucional = data.institucionalData || {};
  const experiencias = data.experienciasData || {};
  const contacto = data.contactoData || {};
  const noticias = (data.noticiasData || {}).noticias || [];
  const plan = data.planEstudiosData || {};

  const recientes = [...noticias]
    .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)))
    .slice(0, inicio.noticiasRecientes || 3);

  return {
    "index.html": {
      "inicio-stats": (inicio.stats || []).map(statItem).join("\n"),
      "inicio-propuesta": (inicio.propuesta || []).map(propuestaCard).join("\n"),
      "inicio-pilares": (inicio.pilares || []).map(pilarCard).join("\n"),
      "inicio-testimonio": (inicio.testimonios || []).map(testimonialCard).join("\n"),
      "inicio-noticias": recientes.map(newsCard).join("\n"),
    },
    "institucional.html": {
      "inst-facts": (institucional.facts || []).map(factItem).join("\n"),
      "inst-hitos": (institucional.hitos || []).map(hitoItem).join("\n"),
      "inst-mv": [miVisionCard(institucional.mision), miVisionCard(institucional.vision)].join("\n"),
      "inst-valores": (institucional.valores || []).map(valorCard).join("\n"),
      "inst-autoridades": (institucional.autoridades || []).map(autoridadCard).join("\n"),
      "inst-areas": (institucional.areas || []).map(areaCard).join("\n"),
    },
    "experiencias.html": {
      "exp-proyectos": (experiencias.proyectos || []).map(proyectoCard).join("\n"),
      "exp-actividades": (experiencias.actividades || []).map(actividadItem).join("\n"),
      "exp-comunidad": (experiencias.testimonios || []).length
        ? (experiencias.testimonios || []).map(experienciaTestimonio).join("\n")
        : `<p class="community-note">${esc(experiencias.communityNote || "")}</p>`,
    },
    "contacto.html": {
      "contacto-datos": (contacto.datos || []).map(datoItem).join("\n"),
      "contacto-faq": (contacto.faq || []).map(faqItem).join("\n"),
    },
    "plan-estudios.html": {
      "plan-anios": Object.entries(plan.años || {})
        .map(([year, label], index) => yearTab(year, label, index))
        .join("\n"),
    },
  };
}

module.exports = { buildBlocks, prepararTextos, esc, escAttr, shortDate };
