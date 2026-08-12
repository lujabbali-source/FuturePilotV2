// JS propio de /flightplan, extraido del <script> incrustado en
// Frontend/flightplan.html. Vive aqui para poder compilarse con el
// resto y para que la pagina deje de necesitar scripts inline.

const career =
localStorage.getItem(
"selectedCareer"
)       
;

document.getElementById(
"careerName"
).innerText =
career || "No Career Selected";

// Esta pagina estatica no tiene una ciudad seleccionada, asi que no hay
// forma de saber que universidades mostrar (la fuente real de datos es
// web/src/database/countries/**, indexada por ciudad). En
// vez de un listado hardcodeado que no coincide con datos reales, dejamos
// un estado honesto.
document.getElementById("universities").innerText = "Proximamente";

const results =
JSON.parse(
    localStorage.getItem(
        "futurePilotResults"
    )
);

if(results){

    document.getElementById(
        "academicLevel"
    ).innerHTML = `

        Math: ${results.mathLevel}<br>
        English: ${results.englishLevel}<br>
        Learning Style: ${results.learningStyle}

    `;

}
// #aiRecommendation y #countries se completan con datos reales desde
// futurepilot-connector.js (justification / recommended_hubs de la
// respuesta de /api/v1/assess) - no se hardcodean aqui para evitar una
// segunda fuente de verdad que pueda desalinearse del catalogo real.

document
.getElementById("startJourneyBtn")
.addEventListener("click",()=>{

    window.location.href =
    "/journey";

});
