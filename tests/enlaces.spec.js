// tests/enlaces.spec.js — todos los enlaces internos del sitio.
const { test, expect } = require("@playwright/test");
const { PAGES, enlacesDe } = require("./helpers/sitio");

const EXTERNO = /^(https?:|mailto:|tel:)/i;
const ANCLA_DINAMICA = /^#noticia-\d+$/;

test.describe("enlaces internos", () => {
  for (const pagina of PAGES) {
    test(`${pagina}: cada enlace responde y su ancla existe`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop", "Se rastrea una sola vez (en escritorio).");

      const errores = [];
      page.on("console", (message) => {
        // El sitio todavía no publica favicon.ico; no es un enlace de la página.
        if (message.type() === "error" && !message.text().includes("favicon.ico")) {
          errores.push(message.text());
        }
      });

      await page.goto(pagina);
      const enlaces = await enlacesDe(page);
      expect(enlaces.length, `${pagina} no tiene enlaces`).toBeGreaterThan(0);

      for (const { href } of enlaces) {
        expect(href, `${pagina}: enlace vacío`).not.toBe("");
        expect(href, `${pagina}: enlace "#"`).not.toBe("#");
        if (EXTERNO.test(href)) continue;

        const destino = new URL(href, page.url());
        const respuesta = await page.request.get(
          `${destino.origin}${destino.pathname}${destino.search}`
        );
        expect(respuesta.status(), `${pagina} → ${href}`).toBe(200);

        if (destino.hash && !ANCLA_DINAMICA.test(destino.hash)) {
          const html = await respuesta.text();
          expect(
            html.includes(`id="${destino.hash.slice(1)}"`),
            `${pagina} → ${href}: no existe el id "${destino.hash.slice(1)}"`
          ).toBe(true);
        }
      }

      expect(errores, `Errores de consola en ${pagina}`).toEqual([]);
    });
  }

  test("el menú no repite ni omite enlaces", async ({ page }) => {
    for (const pagina of PAGES) {
      await page.goto(pagina);
      const hrefs = await page.$$eval("#menu a", (anchors) =>
        anchors.map((a) => a.getAttribute("href"))
      );
      expect(hrefs, `${pagina}: enlaces repetidos en el menú`).toEqual([...new Set(hrefs)]);
      expect(hrefs).toHaveLength(6);
    }
  });

  test("noticias.html#noticia-N abre el artículo indicado", async ({ page }) => {
    await page.goto("index.html");
    const tarjetas = page.locator(".news-card__link");
    const total = await tarjetas.count();
    expect(total).toBeGreaterThan(0);

    for (let i = 0; i < total; i++) {
      const titulo = (await page.locator(".news-card__title").nth(i).innerText()).trim();
      const href = await page.locator(".news-card__link").nth(i).getAttribute("href");
      expect(href).toMatch(/^noticias\.html#noticia-\d+$/);

      await page.goto(href);
      await expect(page).toHaveURL(new RegExp(`noticias\\.html#noticia-\\d+$`));
      await expect(page.locator("#detail-title")).toHaveText(titulo);
      await page.goto("index.html");
    }
  });
});
