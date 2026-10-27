// js/data/experiencias.data.js — FUENTE DE INFORMACIÓN de la pantalla Experiencias (mock).
// Responsable: Frente Experiencias (grupos 13–15). Este archivo no contiene lógica.
//
// Lo consume scripts/build.js (ver el contrato en scripts/render.js):
//   · `textos` → textos fijos. Cada clave corresponde a un data-tx="clave" de
//                experiencias.html y define, opcionalmente, su tipografía.
//   · bloques  → contenido repetido (proyectos, actividades, testimonios).
// Flujo: editar este archivo → `npm run build` → commitear experiencias.html y
// css/pages/experiencias/tipografia.css.
const experienciasData = {
  // Identidad de la pantalla (<title> y <meta name="description">).
  textos: {
    "pantalla-titulo": { titulo: "Experiencias | IPSEL" },
    "pantalla-descripcion": { detalle: "Experiencias de demostración para la maqueta del sitio IPSEL." },

    aviso: {
      detalle:
        "Contenido de demostración: los proyectos y actividades de esta página son ejemplos, no relatos de experiencias reales.",
      tipoFuente: "--font-sans",
      tamano: "--fs-base",
      color: "--text",
    },

    // Encabezado de la pantalla.
    "page-eyebrow": {
      titulo: "Experiencias · ejemplo",
      tipoFuente: "--font-sans",
      tamano: "--fs-xs",
      color: "--accent",
    },
    "page-titulo": {
      titulo: "Aprender haciendo",
      tipoFuente: "--font-sans",
      tamano: "--fs-h1",
      color: "--text",
    },
    "page-lead": {
      detalle:
        "Proyectos, actividades y voces de la comunidad. Los contenidos definitivos se publican cuando exista información confirmada y autorización.",
      tipoFuente: "--font-sans",
      tamano: "--fs-base",
      color: "--text-muted",
    },
    "page-cta": { titulo: "Ver noticias" },

    // Proyectos.
    "proyectos-eyebrow": {
      titulo: "Proyectos · muestra",
      tipoFuente: "--font-sans",
      tamano: "--fs-xs",
      color: "--accent",
    },
    "proyectos-titulo": {
      titulo: "Ideas para explorar",
      tipoFuente: "--font-sans",
      tamano: "--fs-h2",
      color: "--text",
    },
    "proyectos-lead": {
      detalle: "Ejemplos editoriales para mostrar cómo se presentaría una iniciativa de aula.",
      tipoFuente: "--font-sans",
      tamano: "--fs-base",
      color: "--text-muted",
    },

    // Actividades.
    "actividades-eyebrow": {
      titulo: "Actividades · muestra",
      tipoFuente: "--font-sans",
      tamano: "--fs-xs",
      color: "--accent",
    },
    "actividades-titulo": {
      titulo: "Encuentros y eventos",
      tipoFuente: "--font-sans",
      tamano: "--fs-h2",
      color: "--text",
    },
    "actividades-lead": {
      detalle: "Fechas y descripciones pendientes de confirmación institucional.",
      tipoFuente: "--font-sans",
      tamano: "--fs-base",
      color: "--text-muted",
    },

    // Comunidad.
    "comunidad-eyebrow": {
      titulo: "Comunidad",
      tipoFuente: "--font-sans",
      tamano: "--fs-xs",
      color: "--accent",
    },
    "comunidad-titulo": {
      titulo: "Voces de la comunidad",
      tipoFuente: "--font-sans",
      tamano: "--fs-h2",
      color: "--text",
    },
  },

  // Proyectos (bloque 13). Ejemplos editoriales, no relatos reales.
  proyectos: [
    {
      tipo: "Proyecto · orientación Informática",
      titulo: "Prototipo digital",
      detalle: "Ejemplo editorial para mostrar cómo podría presentarse una iniciativa de aula. No corresponde a un proyecto realizado.",
    },
    {
      tipo: "Actividad · talleres",
      titulo: "Exploración colaborativa",
      detalle: "Texto de muestra para ensayar la presentación de una actividad. No describe un evento real.",
    },
    {
      tipo: "Experiencia · comunidad",
      titulo: "Laboratorio de ideas",
      detalle: "Contenido ilustrativo pendiente de reemplazo por información validada.",
    },
  ],

  // Actividades y eventos (bloque 14). Fechas pendientes de confirmación.
  actividades: [
    {
      fecha: "[Fecha]",
      titulo: "[Actividad pendiente de confirmación]",
      detalle: "[Descripción de la actividad, a completar con información validada.]",
    },
    {
      fecha: "[Fecha]",
      titulo: "[Actividad pendiente de confirmación]",
      detalle: "[Descripción de la actividad, a completar con información validada.]",
    },
  ],

  // Testimonios (bloque 15). Vacío a propósito: no se publican testimonios ficticios.
  // Completar solo con autorización escrita; sin datos personales de menores.
  testimonios: [],

  communityNote:
    "No se muestran testimonios ficticios atribuidos a estudiantes, familias o personal. Este bloque queda como marcador de posición hasta contar con testimonios autorizados por escrito.",
};
const experiencias = [
  {
    titulo: "Viaje a la montaña",
    descripcion: "Una experiencia inolvidable",
    imagen: "/imagenes/montana.jpg"
  },
  {
    titulo: "Aventura en el río",
    descripcion: "Un día lleno de diversión",
    imagen: "/imagenes/rio.jpg"
  }
];

export default experiencias;