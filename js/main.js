// main.js – JavaScript común (mínimo). Cargar con <script defer>.
// Responsable: docente / Comisión de Calidad. Cambios solo por PR aprobado.

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav__toggle");
  const list = document.querySelector(".nav__list");

  const setMenu = (open) => {
    if (!toggle || !list) return;
    list.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  if (toggle && list) {
    toggle.addEventListener("click", () => setMenu(!list.classList.contains("is-open")));
    list.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    window.matchMedia("(min-width: 64em)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });
  }

  // Año actual en el footer. Se limita al pie: en plan-estudios.html el primer
  // [data-year] del documento es la pestaña "1.er año", no el copyright.
  document.querySelectorAll("footer [data-year]").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });
});
