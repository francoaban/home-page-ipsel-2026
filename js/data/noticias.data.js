// js/data/noticias.data.js — FUENTE DE INFORMACIÓN de la pantalla Noticias (mock).
// Responsable: Frente Noticias (grupos 10–12). Este archivo no contiene lógica.
//
// Lo consume scripts/build.js para las noticias recientes de inicio y también
// el navegador: js/pages/noticias/noticias.js lee `noticias` y `ui`.
//   · `noticias` → registros (título, detalle, fecha, tipo, autor, contenido).
//   · `ui`       → textos que la página escribe en tiempo de ejecución.
// Flujo: editar este archivo → `npm run build` → commitear index.html y
// cualquier otro archivo generado.
//
// Reemplazar por noticias reales validadas por la institución.
const noticiasData = {
  // Textos que la página escribe al interactuar (js/pages/noticias/noticias.js).
  ui: {
    verNoticia: "Ver noticia →",
    noticiaSingular: "noticia",
    noticiaPlural: "noticias",
    sinResultados: "No se encontraron noticias para los filtros seleccionados.",
    sinResultadosAyuda: "Probá cambiar la categoría, la fecha o las palabras de búsqueda.",
    publicado: "Publicado: {fecha}",
    categoria: "Categoría: {tipo}",
    por: "Por: {autor}",
    imagenPrincipal: "Imagen principal",
    imagenIlustrativa: "Imagen ilustrativa de {titulo}",
    sinImagen: "Sin imagen disponible",
    sinResultadosTitulo: "No hay noticias para mostrar",
    sinResultadosCategoria: "Sin resultados",
    enlaceCopiado: "Enlace copiado",
    enlaceManual: "Copiá el enlace desde la barra del navegador",
    seleccionada: "Noticia seleccionada: {titulo}",
    pagina: "Página {n}",
  },

  // Registros de noticias.
  noticias: [
    // js/data/noticias.data.js — FUENTE DE INFORMACIÓN de la pantalla Noticias.
// Colegio Privado IPSEL · Proyecto de Programación, 5.º año.
// Este archivo no contiene lógica.
//
// Lo consume scripts/build.js para las noticias recientes de inicio y también
// el navegador: js/pages/noticias/noticias.js lee `noticias`, `categorias` y `ui`.
//   · `noticias`   → registros (título, detalle, fecha, categoría, autor, imagen, contenido).
//   · `categorias` → lista de categorías para el filtro (debe coincidir con `tipo`).
//   · `ui`         → textos que la página escribe en tiempo de ejecución.
// Flujo: editar este archivo → `npm run build` → commitear index.html y
// cualquier otro archivo generado.
//
// IMPORTANTE (según el proyecto):
//   · Verificar con la institución fechas, hechos y participantes antes de publicar.
//   · Publicar fotos de estudiantes solo con las autorizaciones correspondientes.
//   · `imagen` debe ser una ruta local (ej. "img/noticias/expo-2026.jpg") o un enlace
//     directo a un archivo de imagen. Los enlaces "share.google" NO sirven como imagen:
//     descargá la foto, guardala en img/noticias/ y poné la ruta acá.
//     Si es null, la página muestra el texto `ui.sinImagen`.
//     Las imágenes actuales (img/noticias/*.svg) son ilustraciones provisorias sin personas.
const noticiasData = {
  // Textos que la página escribe al interactuar (js/pages/noticias/noticias.js).
  ui: {
    tituloSeccion: "Novedades del colegio",
    subtituloSeccion: "Actividades, proyectos y novedades de la comunidad IPSEL.",
    verNoticia: "Leer más →",
    volver: "← Volver a las novedades",
    noticiaSingular: "noticia",
    noticiaPlural: "noticias",
    todas: "Todas",
    sinResultados: "No se encontraron noticias para los filtros seleccionados.",
    sinResultadosAyuda: "Probá cambiar la categoría, la fecha o las palabras de búsqueda.",
    publicado: "Publicado: {fecha}",
    categoria: "Categoría: {tipo}",
    por: "Por: {autor}",
    imagenPrincipal: "Imagen principal",
    imagenIlustrativa: "Imagen ilustrativa de {titulo}",
    sinImagen: "Sin imagen disponible",
    sinResultadosTitulo: "No hay noticias para mostrar",
    sinResultadosCategoria: "Sin resultados",
    enlaceCopiado: "Enlace copiado",
    enlaceManual: "Copiá el enlace desde la barra del navegador",
    seleccionada: "Noticia seleccionada: {titulo}",
    pagina: "Página {n}",
  },

  // Categorías disponibles (coinciden con el campo `tipo` de cada noticia).
  categorias: [
    "Actividades escolares",
    "Tecnología e Informática",
    "Institucional",
  ],

  // Registros de noticias (de la más reciente a la más antigua).
  noticias: [
    {
      id: 1,
      titulo: "Estudiantes de IPSEL desarrollaron proyectos de programación y tecnología",
      tipo: "Tecnología e Informática",
      fecha: "2026-10-27",
      autor: "Área de Informática",
      detalle: "Los estudiantes aplicaron lo aprendido en clase para diseñar páginas y crear sus propios proyectos digitales.",
      imagen: "img/noticias/tecnologia.svg", // Ilustración provisoria. Reemplazar por la foto real (Imagen 2: estudiantes trabajando en computadoras o imagen sobre programación)
      imagenAlt: "Estudiantes trabajando en computadoras en un proyecto de programación",
      contenido: [
        "Los estudiantes trabajaron en proyectos relacionados con la programación y el diseño web. Durante el proceso, aplicaron conocimientos informáticos para organizar contenidos, diseñar interfaces y desarrollar propuestas digitales.",
        "Los proyectos fueron realizados por estudiantes del área de Informática, con la orientación del docente de la materia.",
        "El objetivo fue aplicar los conocimientos aprendidos en clase, desarrollar el pensamiento lógico y fomentar la creatividad. Como resultado, los estudiantes pudieron avanzar en la creación de sus propios proyectos tecnológicos."
      ]
    },
    {
      id: 2,
      titulo: "IPSEL celebró su Expo Anual 2026 con proyectos de todos los niveles",
      tipo: "Institucional",
      fecha: "2026-10-26",
      fechaTexto: "23 y 26 de octubre de 2026",
      autor: "Comunicaciones Institucionales",
      detalle: "Maquetas, experimentos, presentaciones digitales y producciones artísticas de alumnos de 1.º a 5.º año.",
      imagen: "img/noticias/expo.svg", // Ilustración provisoria. Reemplazar por la foto real (Imagen 3: stands de la Expo IPSEL 2026 con alumnos presentando sus proyectos)
      imagenAlt: "Stands de la Expo IPSEL 2026 con estudiantes presentando sus proyectos",
      contenido: [
        "El colegio IPSEL realizó su Expo Anual 2026 los días 23 y 26 de octubre. Durante el evento, los estudiantes presentaron distintos proyectos desarrollados a lo largo del año, como maquetas, experimentos, presentaciones digitales y producciones artísticas.",
        "Participaron alumnos de 1.º a 5.º año, junto con docentes de diferentes áreas y familiares que asistieron para conocer los trabajos.",
        "La Expo permitió compartir los aprendizajes y logros de los estudiantes, reconocer su esfuerzo y creatividad, y fortalecer el vínculo entre las familias y la comunidad educativa."
      ]
    },
    {
      id: 3,
      titulo: "Los estudiantes de IPSEL participaron en actividades educativas y recreativas",
      tipo: "Actividades escolares",
      fecha: "2026-10-20",
      autor: "Comunicaciones Institucionales",
      detalle: "Propuestas para aprender, crear y compartir experiencias con compañeros y docentes.",
      imagen: "img/noticias/actividades.svg", // Ilustración provisoria. Reemplazar por la foto real (Imagen 1: fotografía de una actividad escolar)
      imagenAlt: "Estudiantes de IPSEL participando en una actividad escolar",
      contenido: [
        "Los estudiantes participaron en diferentes actividades escolares destinadas a promover el aprendizaje, la creatividad y la participación. Estas propuestas permitieron poner en práctica conocimientos adquiridos en clase y compartir experiencias con sus compañeros.",
        "Participaron estudiantes y docentes del colegio, quienes colaboraron en el desarrollo de las actividades.",
        "La experiencia fue importante porque permitió fortalecer el aprendizaje, fomentar el compañerismo y desarrollar habilidades mediante experiencias prácticas y educativas."
      ]
    }
  ],
};
