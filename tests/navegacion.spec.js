// tests/navegacion.spec.js — el menú principal y los enlaces del encabezado.
const { test, expect } = require("@playwright/test");
const { MENU, PAGES_CON_MENU, esMovil, abrirMenu, esperarUrl } = require("./helpers/sitio");

test.describe("menú de navegación", () => {
  for (const item of MENU) {
    test(`"${item.texto}" lleva a ${item.href}`, async ({ page }, testInfo) => {
      await page.goto("index.html");
      await abrirMenu(page);

      await page.locator("#menu a", { hasText: item.texto }).click();

      await esperarUrl(page, item.href);
      await expect(page.locator("main h1")).toContainText(item.h1);

      // La página actual queda marcada una sola vez, en el ítem correcto.
      const actual = page.locator('.nav__link[aria-current="page"]');
      await expect(actual).toHaveCount(1);
      await expect(actual).toHaveText(item.texto);
    });
  }

  test("el logo vuelve al inicio", async ({ page }) => {
    await page.goto("contacto.html");
    await page.locator(".site-header .brand").click();
    await esperarUrl(page, "index.html");
    await expect(page.locator("main h1")).toContainText("Instituto Privado");
  });

  test("el CTA del encabezado va a inscripciones", async ({ page }, testInfo) => {
    test.skip(esMovil(testInfo), "En móvil el CTA se oculta por diseño (solo hamburguesa).");
    await page.goto("index.html");
    await page.locator(".site-header__cta").click();
    await esperarUrl(page, "contacto.html#inscripciones");
    await expect(page.locator("#inscripciones")).toBeVisible();
  });

  test("el menú es idéntico en todas las páginas", async ({ page }) => {
    await page.goto("index.html");
    const esperado = await page.$$eval("#menu a", (anchors) =>
      anchors.map((a) => ({ href: a.getAttribute("href"), texto: a.textContent.trim() }))
    );
    expect(esperado).toHaveLength(MENU.length);

    for (const pagina of PAGES_CON_MENU) {
      await page.goto(pagina);
      const actual = await page.$$eval("#menu a", (anchors) =>
        anchors.map((a) => ({ href: a.getAttribute("href"), texto: a.textContent.trim() }))
      );
      expect(actual, `El menú cambió en ${pagina}`).toEqual(esperado);

      const actuales = await page.$$eval('.nav__link[aria-current="page"]', (anchors) =>
        anchors.map((a) => a.getAttribute("href"))
      );
      expect(actuales, `aria-current incorrecto en ${pagina}`).toEqual([pagina]);
    }
  });

  test("en escritorio la navegación está a la vista", async ({ page }, testInfo) => {
    test.skip(esMovil(testInfo), "En móvil el menú está colapsado.");
    await page.goto("index.html");
    await expect(page.locator("#menu")).toBeVisible();
    await expect(page.locator(".nav__toggle")).toBeHidden();
    for (const item of MENU) {
      await expect(page.locator("#menu a", { hasText: item.texto })).toBeVisible();
    }
  });

  test("la hamburguesa abre, cierra con Escape y actualiza aria-expanded", async ({ page }, testInfo) => {
    test.skip(!esMovil(testInfo), "Solo aplica al menú colapsado (móvil).");
    await page.goto("index.html");

    const toggle = page.getByRole("button", { name: "Menú" });
    const menu = page.locator("#menu");
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    for (const item of MENU) {
      await expect(page.locator("#menu a", { hasText: item.texto })).toBeVisible();
    }

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
