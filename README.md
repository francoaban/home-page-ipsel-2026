# Sitio Web Institucional – Colegio Privado IPSEL

**Institución:** Colegio Privado IPSEL – Instituto Privado Secundario Latinoamericano (5 años, orientación en Informática)
**Curso:** 5.º Año · **Año:** 2026 · **Docente:** Franco Emanuel Aban Tejerina
**Tecnologías:** HTML5, CSS3, JavaScript mínimo, Git, GitHub.

> Este README es la **fuente única de verdad**. Lo demás se enlaza, no se copia:
> [`docs/evaluacion.md`](docs/evaluacion.md) · [`docs/guia-estilos.md`](docs/guia-estilos.md) · [`docs/cronograma.md`](docs/cronograma.md) · [`docs/despliegue.md`](docs/despliegue.md)

**Convención:** todo lo que aparece entre `[corchetes]` es un dato pendiente. Se completa **solo con información real validada por la institución**. No se inventan cifras, nombres ni fechas.

Para maquetar antes de recibir esos datos, se puede consultar [`docs/borradores/mock-contenido.md`](docs/borradores/mock-contenido.md). Su contenido es ficticio, solo sirve de referencia visual y debe reemplazarse o retirarse antes de publicar.

> **Estado actual: maqueta.** La información visible en las páginas es únicamente de ejemplo; no debe interpretarse como dato institucional confirmado.

---

## 1. Mapa del sitio

| Menú principal (6 ítems) | Archivo | Contenido |
| :--- | :--- | :--- |
| Inicio | `index.html` | Hero, propuesta, pilares, adelanto de experiencias y noticias |
| Institucional | `institucional.html` | Historia, misión, visión, autoridades y plantel docente |
| Plan de Estudios | `plan-estudios.html` | 5 años y orientación en Informática |
| Noticias | `noticias.html` | Listado y detalle de muestra en la misma página |
| Experiencias | `experiencias.html` | Proyectos, actividades, comunidad |
| Contacto | `contacto.html` | Datos pendientes, inscripciones y preguntas frecuentes de muestra; no envía datos |

El botón **Inscripciones** del header lleva a `contacto.html#inscripciones`.

---

## 2. Organización: los alumnos trabajan en grupos o individualmente

- **Máximo 4 integrantes por grupo.**
- Cada grupo tiene un **bloque** propio dentro de la página y trabaja en archivos propios (`css/pages/<pagina>/<bloque>.css`), para minimizar conflictos.
- Ninguna sección ni bloque puede quedar sin responsable.

### Asignación (completar por Pull Request)

| Grupo | Frente | Bloque asignado | Usuarios de GitHub (máx. 4) | Estado |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Inicio | Hero y estadísticas | | `Pendiente` |
| 2 | Inicio | Propuesta y pilares | | `Pendiente` |
| 3 | Inicio | Adelantos de experiencias y noticias | | `Pendiente` |
| 4 | Institucional | Historia, misión y visión | | `Pendiente` |
| 5 | Institucional | Autoridades (`institucional.html#autoridades`) | | `Pendiente` |
| 6 | Institucional | Plantel docente (`institucional.html#docentes`) | | `Pendiente` |
| 7 | Plan de Estudios | Vista general y 1.° y 2.° año | | `Pendiente` |
| 8 | Plan de Estudios | 3.° año y orientación en Informática | | `Pendiente` |
| 9 | Plan de Estudios | 4.° y 5.° año | | `Pendiente` |
| 10 | Noticias | Listado, grilla y filtros | | `Pendiente` |
| 11 | Noticias | Plantilla de nota y paginación | | `Pendiente` |
| 12 | Noticias | Redacción de noticias reales e imágenes | | `Pendiente` |
| 13 | Experiencias | Proyectos de la orientación en Informática | | `Pendiente` |
| 14 | Experiencias | Actividades y eventos | | `Pendiente` |
| 15 | Experiencias | Comunidad y testimonios (con autorización) | | `Pendiente` |
| 16 | Contacto | Formulario con validación (JS mínimo) | | `Pendiente` |
| 17 | Contacto | Datos de contacto, horarios y mapa | | `Pendiente` |
| 18 | Contacto | Inscripciones y preguntas frecuentes | | `Pendiente` |

Estados: `Pendiente` · `En curso` · `En revisión` · `Terminado`.

### Archivos compartidos y sus responsables

| Archivo | Responsable |
| :--- | :--- |
| `css/tokens.css`, `base.css`, `components.css`, `js/main.js` | Docente / Calidad |
| `partials/header.html`, `partials/footer.html`, `scripts/`, `package.json` | Docente / Calidad |
| Header y footer de todas las páginas (generados con `npm run build`) | Docente / Calidad |
| `<pagina>.html` | Frente de esa página |
| `css/pages/<pagina>/`, `js/pages/<pagina>/`, `img/<pagina>/` | Frente de esa página |
| `js/data/<pagina>.data.js` (contenido) | Frente de esa página |

Cualquier cambio a un archivo compartido se hace por PR y lo aprueba su responsable.

## 3. Estructura del proyecto

```text
/
├── index.html · institucional.html
├── plan-estudios.html · noticias.html
├── experiencias.html · contacto.html
├── plantilla.html            # base para cada página nueva
├── partials/
│   ├── header.html           # fuente única del header
│   └── footer.html           # fuente única del footer
├── scripts/
│   ├── build.js              # inyecta partials/ y bloques de js/data/ en cada página
│   ├── render.js             # arma el HTML de los bloques de contenido
│   └── check.js              # verificaciones de calidad
├── css/
│   ├── tokens.css            # variables: colores, tipografía, radios, degradados
│   ├── base.css              # reset, tipografía, layout
│   ├── components.css        # header, botones, tarjetas, footer...
│   ├── pages/<pagina>/<bloque>.css
│   └── pages/<pagina>/tipografia.css   # GENERADO: tipografía de los textos de la pantalla
├── js/
│   ├── main.js               # menú móvil y utilidades
│   ├── data/<pagina>.data.js # CONTENIDO editable (una fuente por página)
│   └── pages/<pagina>/<bloque>.js
├── img/
│   ├── shared/               # escudo, logo
│   └── <pagina>/
├── docs/
│   ├── evaluacion.md · guia-estilos.md · cronograma.md · despliegue.md
│   └── borradores/<pagina>/
├── .github/
│   ├── pull_request_template.md · CODEOWNERS
│   ├── workflows/quality.yml
│   └── ISSUE_TEMPLATE/tarea.md
├── package.json
└── README.md
```

`index.html` es un **ejemplo de referencia** con los bloques delimitados por comentarios (`BLOQUE: … | GRUPO N`). Cada grupo trabaja solo dentro de su bloque.

### Header, footer y contenido: una sola fuente

El **header y el footer** no se editan dentro de las páginas: se editan en `partials/header.html` y `partials/footer.html`.

El **contenido** de cada pantalla vive en `js/data/<pagina>.data.js` (una fuente por página) y se escribe en el HTML con dos mecanismos:

1. **Bloques repetidos** (tarjetas, listas, fichas, hitos, FAQ, pestañas, filtros…): se escriben dentro de los marcadores `<!-- build:clave --> … <!-- /build:clave -->` que ya tiene cada página.
2. **Textos fijos** (`textos`): cada clave corresponde a un elemento con `data-tx="clave"`. El build reemplaza el contenido del elemento (o un atributo, con `data-tx-attr="nombre"`) y le agrega la clase `.tx-<clave>`.

Cada entrada de `textos` define el contenido —`titulo`, `detalle` o `fecha` (se escapan) u `html` (marcado interno, tal cual)— y, **opcionalmente, su tipografía**: `tipoFuente`, `tamano` y `color`. Los valores que empiezan con `--` se resuelven como variables de `css/tokens.css`. Esa tipografía se genera en **`css/pages/<pagina>/tipografia.css`** (una hoja por pantalla, enlazada tras el CSS de la página); no se edita a mano.

Los textos que la página arma en tiempo de ejecución (mensajes de error, contadores, etiquetas) van en la sección `ui` de la misma fuente y los lee el JS de la página.

Ambos se regeneran con:

```bash
npm run build   # regenera header/footer, bloques, textos y tipografia.css (commitear los .html y el CSS)
npm run check   # valida imágenes ≤ 300 KB, un solo <h1>, estilos en línea, la tipografía generada y los enlaces internos
```

### Tests automáticos

```bash
npm run serve     # servidor estático local en http://127.0.0.1:4173 (opcional: Playwright lo levanta solo)
npm run test:e2e  # tests E2E del menú, los enlaces de la home y las anclas (Chromium escritorio + móvil)
npm test          # chequeos de calidad + enlaces + tests E2E (lo que corre el CI)
```

- `scripts/check-links.js` valida, sin dependencias, que cada enlace interno apunte a un archivo y a un `id` existente (incluidos los `noticias.html#noticia-<id>`, que resuelve JavaScript).
- `tests/` usa [Playwright](https://playwright.dev/). La primera vez: `npm install` y `npx playwright install chromium`.
- `tests/regresiones.spec.js` cubre los errores corregidos (doctype, pestaña del plan, filtros de noticias, desbordes en pantallas angostas): si alguno vuelve, el test falla.

- `js/data/noticias.data.js`, `js/data/plan-estudios.data.js` y `js/data/contacto.data.js` también los usa el navegador (esas páginas son interactivas).
- El resto de los `js/data/*.data.js` los usa solo el build: el HTML inyectado queda **estático**, así el sitio funciona aunque falle el JavaScript.
- **No editar a mano** lo que está entre marcadores `build:` ni los elementos `data-tx` (se sobrescriben en el próximo `npm run build`).

La integración continua (`.github/workflows/quality.yml`) falla si `partials/`, `js/data/` y las páginas quedan desincronizados.

---

## 4. Flujo de trabajo con Git (obligatorio)

1. **`main` protegida:** solo código probado y aprobado.
2. **Una rama por tarea:** `feature/<frente>-<grupo>-<tarea>` (ej.: `feature/contacto-g16-validacion-formulario`).
3. **Todo entra por Pull Request.** Nadie sube directo a `main`.
4. **Revisión cruzada:** al menos 1 aprobación de un integrante de **otro** grupo, más el responsable del archivo si es compartido.
5. **PRs chicos y frecuentes.** Antes de subir: `git pull --rebase origin main`.
6. **No reformatear archivos enteros** ni mover bloques ajenos.
7. **Commits convencionales:** `feat:` · `fix:` · `docs:` · `style:`.
8. **Trabajo en pareja:** `Co-authored-by: Nombre <correo>` en el commit.
9. **Una Issue por tarea**, con etiqueta de nivel de rúbrica.

```bash
git checkout main && git pull
git checkout -b feature/inicio-g1-hero
git add .
git commit -m "feat: agrega bloque hero"
git pull --rebase origin main
git push origin feature/inicio-g1-hero
# Luego crear el Pull Request en GitHub
```

### Reglas de HTML, CSS y JavaScript

- **HTML5 semántico:** `header`, `nav`, `main`, `section`, `article`, `footer`. Un solo `<h1>` por página.
- **CSS:** usar variables de `tokens.css` y componentes de `components.css`. Estilo: bordes redondeados y degradados. Puntos de corte: `40em`, `48em` (tablet) y `64em` (desktop); ver [`DESIGN.md`](DESIGN.md#puntos-de-corte-responsive).
- **JavaScript mínimo permitido:** menú, validación de formulario, acordeón, pestañas, filtros. JS vanilla, con `<script defer>`, sin frameworks ni librerías externas salvo autorización. El sitio debe seguir siendo usable si el JS falla.
- **Formulario de contacto (implementado en `js/pages/contacto/formulario.js`):** el hosting es estático, sin backend. Validación en el cliente con HTML semántico y mensajes accesibles; si JavaScript falla, valida el navegador. Mientras el `<form id="contact-form">` no tenga `data-contact-email="correo@dominio"`, avisa que el canal no está habilitado y **no envía nada**. Al completar ese dato con un correo validado por la institución, abre el cliente de correo (`mailto:`).
- **Imágenes:** ≤ 300 KB cada una (WebP o JPG comprimido), sitio completo < 5 MB, siempre con `alt`.

---

## 5. Evaluación

La calificación es **individual** y se basa en el aporte comprobable en GitHub. **Generar un aporte comprobable es condición para aprobar; la no participación implica desaprobación.** Detalle en [`docs/evaluacion.md`](docs/evaluacion.md).

---

## 6. Repositorio, despliegue y privacidad

Ver [`docs/despliegue.md`](docs/despliegue.md). Resumen:

- Despliegue en **Vercel**. La configuración está en [`vercel.json`](vercel.json); pasos y consideraciones en [`docs/despliegue.md`](docs/despliegue.md).
- Prohibido publicar datos personales. Las fotos requieren autorización firmada. Usar usuarios de GitHub y correo `noreply`.
- El contenido institucional (logo, escudo, textos) se publica solo con validación del colegio.

---

## 7. Checklist de entrega final

- [ ] Los 6 ítems del menú y los enlaces de secciones funcionan en todas las páginas
- [ ] Todos los `[corchetes]` reemplazados por datos reales validados
- [ ] Responsive en 360, 640, 768, 1024 y 1200 px (incluye la versión tablet)
- [ ] Todas las imágenes con `alt`, cada una ≤ 300 KB, sitio < 5 MB
- [ ] Contraste AA y navegación con teclado verificados
- [ ] Sin enlaces rotos
- [ ] Sin datos personales de menores; autorizaciones archivadas
- [ ] Historial limpio y PRs aprobados
- [ ] Cada alumno con al menos 1 PR propio y su ficha de aporte
- [ ] Sitio desplegado y probado en la URL de Vercel
