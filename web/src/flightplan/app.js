// JS propio de /flightplan, extraido del <script> incrustado en
// Frontend/flightplan.html. Vive aqui para poder compilarse con el resto y
// para que la pagina deje de necesitar scripts inline.
//
// Casi todo el contenido de la pagina lo rellena shared/apiConnector.js a
// partir del resultado real (nombre de carrera, justificacion, hubs, perfil
// cognitivo). Aqui solo queda el estado inicial y el boton de salida.

// Estado de partida mientras llega el resultado. El conector lo sustituye
// en cuanto lo tiene; si no hay ninguno, este texto es lo que se queda.
const NO_RESULT = "Todavía no has hecho el test";

document.getElementById("careerName").innerText =
  localStorage.getItem("selectedCareer") || NO_RESULT;

// Esta pagina no tiene una ciudad seleccionada, asi que no hay forma de
// saber que universidades mostrar (la fuente real es
// web/src/database/countries/**, indexada por ciudad). En vez de un listado
// hardcodeado que no coincide con datos reales, un estado honesto.
document.getElementById("universities").innerText = "Próximamente";

// El "Academic Profile" mostraba Math/English/Learning Style sacados del
// motor local. Ninguna pregunta del banco alimenta esos tres campos, asi
// que TODOS los estudiantes veian exactamente "Math: Beginner / English:
// Beginner / Learning Style: null" - dos niveles falsos con pinta de
// personalizados y un null literal. Ahora lo rellena el conector con el
// arquetipo y el estilo de aprendizaje que calcula el backend, que si son
// distintos para cada perfil.
document.getElementById("academicLevel").innerText = NO_RESULT;

document.getElementById("startJourneyBtn").addEventListener("click", () => {
  window.location.href = "/journey";
});
