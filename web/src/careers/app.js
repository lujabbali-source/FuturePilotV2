// JS propio de la pagina, extraido del <script> incrustado en
// Frontend/careers.html.

// Fuente unica de verdad: el catalogo de carreras vive en
// futurepilot-IA/data/careers.json y se sirve via /api/v1/careers.
// Antes esta pagina tenia su propio careerMap hardcodeado (con nombres
// que no coincidian con el catalogo real que usa la IA para el matching),
// lo que ademas causaba un ReferenceError porque 'careers' nunca se
// definia.
let careers = [];

const grid = document.getElementById("careerGrid");

function renderCareers(list){

grid.innerHTML="";

list.forEach(career=>{

grid.innerHTML += `

<div class="career-card">

<span style="color:#00FFB3;font-size:.8rem;text-transform:uppercase;">${career.category}</span>

<h3>${career.title}</h3>

<p>
${career.description}
</p>

<button
class="build-btn"
onclick="openCareer('${career.id}')">

Build My Flight Plan

</button>

</div>

`;

});

}

function openCareer(careerId){

const career = careers.find(c => c.id === careerId);
if(!career) return;

localStorage.setItem(
"selectedCareer",
career.title
);

window.location.href=
"/flightplan";

}

async function loadCareers(){

try {
    const response = await fetch("/api/v1/careers");
    const data = await response.json();
    careers = data.careers || [];
    renderCareers(careers);
} catch (error) {
    grid.innerHTML = "<p>No pudimos cargar el catalogo de carreras. Intenta recargar la pagina.</p>";
}

}

document
.getElementById("searchInput")
.addEventListener("input",e=>{

const search =
e.target.value.toLowerCase();

const filtered =
careers.filter(career=>

career.title.toLowerCase().includes(search) ||
career.category.toLowerCase().includes(search)

);

renderCareers(filtered);

});

loadCareers();
