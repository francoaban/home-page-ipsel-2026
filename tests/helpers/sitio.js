// Helpers compartidos por los tests E2E.
const { expect } = require("@playwright/test");

const PAGES = [
  "index.html",
  "institucional.html",
  "plan-estudios.html",
  "noticias.html",
  "experiencias.html",
  "contacto.html",
  "plantilla.html",
];

// plantilla.html es un esqueleto: no tiene aria-current ni contenido propio.
const PAGES_CON_MENU = PAGES.filter((page) => page !== "plantilla.html");

// Menú principal, en el orden en que se muestra.
const MENU = [
  { texto: "Inicio", href: "index.html", h1: "Instituto Privado" },
  { texto: "Institucional", href: "institucional.html", h1: "Conocé nuestra institución" },
  { texto: "Plan de Estudios", href: "plan-estudios.html", h1: "Bachiller con Orientación en Informática" },
  { texto: "Noticias", href: "noticias.html", h1: "Novedades del colegio" },
  { texto: "Experiencias", href: "experiencias.html", h1: "Aprender haciendo" },
  { texto: "Contacto", href: "contacto.html", h1: "Estamos para orientarte" },
];

const esMovil = (testInfo) => testInfo.project.name === "mobile";

// En móvil el menú está colapsado detrás de la hamburguesa.
async function abrirMenu(page) {
  const toggle = page.getByRole("button", { name: "Menú" });
  if (!(await toggle.isVisible())) return;
  if ((await toggle.getAttribute("aria-expanded")) !== "true") await toggle.click();
}

// Compara ruta y hash sin depender del origen ni de la barra final.
async function esperarUrl(page, href) {
  const esperado = new URL(href, "http://sitio.local/");
  await expect
    .poll(() => {
      const actual = new URL(page.url());
      return actual.pathname === esperado.pathname && actual.hash === esperado.hash;
    }, { message: `Se esperaba ${href}, se obtuvo ${page.url()}` })
    .toBe(true);
}

async function enlacesDe(page) {
  return page.$$eval("a[href]", (anchors) =>
    anchors.map((a) => ({
      href: a.getAttribute("href"),
      texto: (a.textContent || "").replace(/\s+/g, " ").trim(),
    }))
  );
}

module.exports = { PAGES, PAGES_CON_MENU, MENU, esMovil, abrirMenu, esperarUrl, enlacesDe };
