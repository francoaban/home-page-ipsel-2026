// tests/inicio.spec.js — enlaces de la página principal.
const { test, expect } = require("@playwright/test");
const { esperarUrl } = require("./helpers/sitio");

// Enlaces propios de la home (el menú y el pie se prueban aparte).
const DESTACADOS = [
  {
    selector: '.hero__actions a[href="contacto.html#inscripciones"]',
    href: "contacto.html#inscripciones",
    ancla: "#inscripciones",
  },
  {
    selector: '.hero__actions a[href="plan-estudios.html"]',
    href: "plan-estudios.html",
    h1: "Bachiller con Orientación en Informática",
  },
  {
    selector: '.link-arrow[href="institucional.html"]',
    href: "institucional.html",
    h1: "Conocé nuestra institución",
  },
  {
    selector: '.link-arrow[href="experiencias.html"]',
    href: "experiencias.html",
    h1: "Aprender haciendo",
  },
  {
    selector: '.link-arrow[href="noticias.html"]',
    href: "noticias.html",
    h1: "Novedades del colegio",
  },
];

test.describe("enlaces de la página principal", () => {
  for (const enlace of DESTACADOS) {
    test(`${enlace.href} responde desde el inicio`, async ({ page }) => {
      await page.goto("index.html");
      const link = page.locator(enlace.selector);
      await expect(link).toHaveCount(1);
      await expect(link).toBeVisible();

      await link.click();
      await esperarUrl(page, enlace.href);
      if (enlace.h1) await expect(page.locator("main h1")).toContainText(enlace.h1);
      if (enlace.ancla) await expect(page.locator(enlace.ancla)).toBeVisible();
    });
  }

  test("las tarjetas de noticias abren su artículo", async ({ page }) => {
    await page.goto("index.html");
    const total = await page.locator(".news-card__title a").count();
    expect(total).toBeGreaterThan(0);

    for (let i = 0; i < total; i++) {
      await page.goto("index.html");
      const enlace = page.locator(".news-card__title a").nth(i);
      const titulo = (await enlace.innerText()).trim();
      await enlace.click();
      await expect(page.locator("#detail-title")).toHaveText(titulo);
      await expect(page).toHaveURL(/noticias\.html#noticia-\d+$/);
    }
  });

  test("los enlaces del pie funcionan", async ({ page }) => {
    const esperados = [
      ["institucional.html#historia", "Historia y misión", "main h1"],
      ["institucional.html#autoridades", "Autoridades", "#autoridades"],
      ["institucional.html#docentes", "Plantel docente", "#docentes"],
      ["plan-estudios.html", "Plan de Estudios", "main h1"],
      ["noticias.html", "Noticias", "main h1"],
      ["experiencias.html", "Experiencias", "main h1"],
    ];

    for (const [href, texto, destino] of esperados) {
      await page.goto("index.html");
      const link = page.locator(`footer a[href="${href}"]`);
      await expect(link, `Falta el enlace del pie a ${href}`).toHaveCount(1);
      expect((await link.innerText()).trim()).toBe(texto);

      await link.click();
      await esperarUrl(page, href);
      await expect(page.locator(destino)).toBeVisible();
    }
  });

  test('el enlace "Saltar al contenido" lleva al main', async ({ page }) => {
    await page.goto("index.html");
    const saltar = page.locator(".skip-link");
    await saltar.focus();
    await expect(saltar).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#contenido$/);

    const enPantalla = await page.locator("#contenido").evaluate((main) => {
      const caja = main.getBoundingClientRect();
      return caja.top < window.innerHeight && caja.bottom > 0;
    });
    expect(enPantalla).toBe(true);
  });
});
