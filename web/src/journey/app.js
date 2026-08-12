// JS propio de /journey, extraido del <script> incrustado en
// Frontend/journey.html. Vive aqui para poder compilarse con el
// resto y para que la pagina deje de necesitar scripts inline.

const career =
localStorage.getItem("selectedCareer");

if(career){

    document.getElementById(
        "careerTitle"
    ).innerText = career;

}

// Los titulos de cada checkpoint (h3 de cada .card) se completan con
// datos reales desde futurepilot-connector.js (roadmap.checkpoints de
// la respuesta de /api/v1/assess). Los titulos por defecto del HTML
// quedan como fallback honesto mientras esos datos llegan.

const pins =
document.querySelectorAll(".pin");

pins.forEach(pin => {

    pin.addEventListener("click", () => {

        const card =
        pin.parentElement.querySelector(".card");

        card.classList.toggle("active");

    });

});
const labels =
document.querySelectorAll(".card label");

labels.forEach(label => {

    const resources =
    document.createElement("div");

    resources.className =
    "resources";

    resources.innerHTML = `

        <a href="#">
            ▶ Video
        </a>

        <a href="#">
            📄 Notes
        </a>

        <a href="#">
            💻 Exercise
        </a>

    `;

    label.insertAdjacentElement(
        "afterend",
        resources
    );

});
