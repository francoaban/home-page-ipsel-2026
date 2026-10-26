// js/data/plan-estudios.data.js — FUENTE DE INFORMACIÓN de la pantalla Plan de Estudios (mock).
// Responsable: Frente Plan de Estudios (grupos 7–9). Este archivo no contiene lógica.
//
// Lo consume scripts/build.js para generar las pestañas de años y también el
// navegador: js/pages/plan-estudios/plan-estudios.js lee `materias`, `años` y `ui`.
//   · `años`     → etiqueta de cada año de cursado (pestañas).
//   · `materias` → materias por año.
//   · `ui`       → textos que la página escribe en tiempo de ejecución.
// Flujo: editar este archivo → `npm run build` → commitear plan-estudios.html y
// cualquier otro archivo generado.
//
// Reemplazar por el plan real validado por la institución.
const planEstudiosData = {
  // Textos que la página escribe al interactuar (js/pages/plan-estudios/plan-estudios.js).
  ui: {
    verDetalle: "+ Ver",
    verDetalleAria: "Ver detalle de {materia}",
    codigoPrefijo: "CÓDIGO: {codigo}",
    horasResumen: "Horas: {semanal} · {tipo}",
    materiaSingular: "materia",
    materiaPlural: "materias",
    sinResultados: "No se encontraron materias con esos criterios.",
    tituloMaterias: "{año} — Materias",
    detalleTitulo: "{materia} ({codigo})",
    totales: "{horas} totales",
    descripcionPrefijo: "Descripción: ",
    correlativasPrefijo: "Correlativas: ",
    pagina: "Página {n}",
  },

  // Etiqueta de cada año de cursado (pestañas). Las genera build.js.
  años: {
    1: "1.er año",
    2: "2.º año",
    3: "3.er año",
    4: "4.º año",
    5: "5.º año",
  },

  // Materias por año.
  materias: {
    1: [
      { codigo: "MAT101", titulo: "Matemática I", horas: "64 hs", semanal: "4 hs/sem", tipo: "Obligatoria", periodo: "Cuatrimestral", detalle: "Fundamentos de álgebra, funciones, estadística descriptiva y resolución de problemas.", correlativas: "Sin correlativas" },
      { codigo: "LEN101", titulo: "Lengua", horas: "48 hs", semanal: "3 hs/sem", tipo: "Obligatoria", periodo: "Cuatrimestral", detalle: "Lectura comprensiva, producción escrita y herramientas de comunicación académica.", correlativas: "Sin correlativas" },
      { codigo: "INT101", titulo: "Introducción a las Ciencias de la Educación", horas: "56 hs", semanal: "4 hs/sem", tipo: "Obligatoria", periodo: "Cuatrimestral", detalle: "Conceptos introductorios sobre educación, instituciones y prácticas educativas.", correlativas: "Sin correlativas" },
      { codigo: "PSI101", titulo: "Psicología del Desarrollo I", horas: "48 hs", semanal: "3 hs/sem", tipo: "Obligatoria", periodo: "Cuatrimestral", detalle: "Principales enfoques del desarrollo humano y sus implicancias educativas.", correlativas: "Sin correlativas" }
    ],
    2: [
      { codigo: "PED201", titulo: "Pedagogía General", horas: "64 hs", semanal: "4 hs/sem", tipo: "Obligatoria", periodo: "Anual", detalle: "Principales teorías pedagógicas y su relación con las prácticas de enseñanza.", correlativas: "A confirmar según plan oficial" },
      { codigo: "PSI201", titulo: "Psicología del Desarrollo II", horas: "48 hs", semanal: "3 hs/sem", tipo: "Obligatoria", periodo: "Cuatrimestral", detalle: "Procesos del desarrollo y aprendizaje en distintos contextos.", correlativas: "A confirmar según plan oficial" },
      { codigo: "HIS201", titulo: "Historia de la Educación", horas: "56 hs", semanal: "4 hs/sem", tipo: "Obligatoria", periodo: "Cuatrimestral", detalle: "Recorrido histórico de las instituciones y las ideas educativas.", correlativas: "A confirmar según plan oficial" }
    ],
    3: [
      { codigo: "DID301", titulo: "Didáctica General", horas: "64 hs", semanal: "4 hs/sem", tipo: "Obligatoria", periodo: "Anual", detalle: "Planificación, estrategias de enseñanza, evaluación y diseño didáctico.", correlativas: "A confirmar según plan oficial" },
      { codigo: "INV301", titulo: "Metodología de la Investigación", horas: "56 hs", semanal: "4 hs/sem", tipo: "Obligatoria", periodo: "Cuatrimestral", detalle: "Introducción al diseño de investigaciones en el campo educativo.", correlativas: "A confirmar según plan oficial" },
      { codigo: "SOC301", titulo: "Sociología de la Educación", horas: "48 hs", semanal: "3 hs/sem", tipo: "Optativa", periodo: "Cuatrimestral", detalle: "Relaciones entre educación, sociedad, cultura y desigualdad.", correlativas: "A confirmar según plan oficial" }
    ],
    4: [
      { codigo: "GES401", titulo: "Gestión de Instituciones Educativas", horas: "64 hs", semanal: "4 hs/sem", tipo: "Obligatoria", periodo: "Anual", detalle: "Organización institucional, planificación y gestión de proyectos educativos.", correlativas: "A confirmar según plan oficial" },
      { codigo: "EVA401", titulo: "Evaluación Educativa", horas: "48 hs", semanal: "3 hs/sem", tipo: "Obligatoria", periodo: "Cuatrimestral", detalle: "Enfoques, instrumentos y criterios para evaluar aprendizajes y programas.", correlativas: "A confirmar según plan oficial" },
      { codigo: "INC401", titulo: "Educación Inclusiva", horas: "56 hs", semanal: "4 hs/sem", tipo: "Optativa", periodo: "Cuatrimestral", detalle: "Estrategias para favorecer la participación y el aprendizaje de todos los estudiantes.", correlativas: "A confirmar según plan oficial" }
    ],
    5: [
      { codigo: "PRA501", titulo: "Práctica Profesional", horas: "96 hs", semanal: "6 hs/sem", tipo: "Obligatoria", periodo: "Anual", detalle: "Integración de saberes en experiencias de intervención y práctica profesional.", correlativas: "A confirmar según plan oficial" },
      { codigo: "TES501", titulo: "Seminario de Trabajo Final", horas: "64 hs", semanal: "4 hs/sem", tipo: "Obligatoria", periodo: "Anual", detalle: "Desarrollo y presentación de un proyecto final vinculado al campo educativo.", correlativas: "A confirmar según plan oficial" },
      { codigo: "POL501", titulo: "Política y Legislación Educativa", horas: "48 hs", semanal: "3 hs/sem", tipo: "Obligatoria", periodo: "Cuatrimestral", detalle: "Normativa, políticas públicas y organización del sistema educativo.", correlativas: "A confirmar según plan oficial" }
    ]
  },
};
