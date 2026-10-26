// tests/regresiones.spec.js — bugs corregidos que no deben volver.
const { test, expect } = require("@playwright/test");
const { PAGES } = require("./helpers/sitio");

test.describe("regresiones", () => {
  test("institucional.html se sirve con doctype y en modo estándar", async ({ page }) => {
    await page.goto("institucional.html");

    expect(await page.evaluate(() => document.compatMode)).toBe("CSS1Compat");
    const inicioDelCuerpo = await page.evaluate(() => document.body.innerText.trim().slice(0, 40));
    expect(inicioDelCuerpo.toLowerCase()).not.toContain("doctype");
  });

  test("el pie muestra el año actual en todas las páginas", async ({ page }) => {
    const año = String(new Date().getFullYear());
    for (const pagina of PAGES) {
      await page.goto(pagina);
      const añoPie = await page
        .locator("footer [data-year], footer [data-current-year]")
        .first()
        .innerText();
      expect(añoPie.trim(), `Año incorrecto en ${pagina}`).toBe(año);
    }
  });

  test("las pestañas de plan-estudios conservan su etiqueta", async ({ page }) => {
    await page.goto("plan-estudios.html");
    await expect(page.locator(".year-tab")).toHaveText([
      "1.er año",
      "2.º año",
      "3.er año",
      "4.º año",
      "5.º año",
    ]);
    await expect(page.locator("#study-title")).toContainText("1.er año");
  });

  test("título y metadatos de noticias van en líneas separadas", async ({ page }) => {
    await page.goto("noticias.html");

    const medir = (contenedor, titulo, meta) =>
      page.locator(contenedor).first().evaluate(
        (el, [sTitulo, sMeta]) => {
          const t = el.querySelector(sTitulo).getBoundingClientRect();
          const m = el.querySelector(sMeta).getBoundingClientRect();
          return { finTitulo: t.bottom, inicioMeta: m.top };
        },
        [titulo, meta]
      );

    const lista = await medir(".news-item", ".news-item__title", ".news-item__meta");
    expect(lista.inicioMeta).toBeGreaterThanOrEqual(lista.finTitulo - 1);

    const relacionada = await medir(".related-card", ".related-card__title", ".related-card__meta");
    expect(relacionada.inicioMeta).toBeGreaterThanOrEqual(relacionada.finTitulo - 1);
  });

  test("el hero del detalle de noticias no desborda su panel", async ({ page }) => {
    for (const width of [320, 390, 768]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("noticias.html");

      const medidas = await page.evaluate(() => ({
        hero: document.querySelector("#detail-hero").getBoundingClientRect().width,
        panel: document.querySelector(".news-detail-panel").getBoundingClientRect().width,
      }));
      expect(medidas.hero, `A ${width}px el hero desborda el panel`).toBeLessThanOrEqual(
        medidas.panel + 1
      );
    }
  });

  test("el encabezado no desborda en pantallas angostas", async ({ page }) => {
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("index.html");

      const medidas = await page.evaluate(() => {
        const toggle = document.querySelector(".nav__toggle").getBoundingClientRect();
        return {
          cta: getComputedStyle(document.querySelector(".site-header__cta")).display,
          toggleDerecha: toggle.right,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      });

      expect(medidas.cta, `El CTA sigue visible a ${width}px`).toBe("none");
      expect(medidas.scrollWidth, `Scroll horizontal a ${width}px`).toBe(medidas.clientWidth);
      expect(medidas.toggleDerecha).toBeLessThanOrEqual(medidas.clientWidth + 0.5);
    }

    // Desde 48em el CTA vuelve a mostrarse.
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto("index.html");
    await expect(page.locator(".site-header__cta")).toBeVisible();
  });

  test("todos los filtros de noticias devuelven resultados", async ({ page }) => {
    await page.goto("noticias.html");
    const total = async () => {
      const texto = await page.locator("#result-count").innerText();
      return Number(texto.split(" ")[0]);
    };

    const categorias = await page.$$eval("#category-filter option", (opciones) =>
      opciones.map((o) => o.value).filter((v) => v !== "all")
    );
    expect(categorias.length).toBeGreaterThan(0);
    for (const categoria of categorias) {
      await page.selectOption("#category-filter", categoria);
      expect(await total(), `La categoría "${categoria}" no devuelve noticias`).toBeGreaterThan(0);
    }

    await page.selectOption("#category-filter", "all");
    const fechas = await page.$$eval("#date-filter option", (opciones) =>
      opciones.map((o) => o.value).filter((v) => v !== "all")
    );
    expect(fechas.length).toBeGreaterThan(0);
    for (const fecha of fechas) {
      await page.selectOption("#date-filter", fecha);
      expect(await total(), `La fecha "${fecha}" no devuelve noticias`).toBeGreaterThan(0);
    }
  });
});
