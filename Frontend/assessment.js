// FuturePilot Assessment Engine
const careerMap = {

    ANALYTICAL: [
        "Data Science",
        "Economics",
        "Mathematics",
        "Physics",
        "Actuarial Science"
    ],

    SCIENTIFIC: [
        "Medicine",
        "Biotechnology",
        "Biochemistry",
        "Chemistry",
        "Biomedical Engineering"
    ],

    TECHNICAL: [
        "Software Engineering",
        "Computer Science",
        "Cybersecurity",
        "Artificial Intelligence",
        "Robotics"
    ],

    CREATIVE: [
        "Graphic Design",
        "Architecture",
        "Animation",
        "Digital Media",
        "Music Production"
    ],

    SOCIAL: [
        "Psychology",
        "Education",
        "Law",
        "International Relations",
        "Journalism"
    ],

    LEADERSHIP: [
        "Business Administration",
        "Finance",
        "Marketing",
        "Management",
        "Entrepreneurship"
    ],

    PRACTICAL: [
        "Mechanical Engineering",
        "Civil Engineering",
        "Construction",
        "Industrial Engineering",
        "Aviation Maintenance"
    ],

    ENTREPRENEURIAL: [
        "Entrepreneurship",
        "Business Innovation",
        "E-Commerce",
        "Startups",
        "Product Management"
    ]

};
let questions = [];
let currentQuestion = 0;
function goBack(){

    if(currentQuestion > 0){

        currentQuestion--;

        showQuestion();

    }

}

let results = {

   clusters: {

    ANALYTICAL:0,
    SCIENTIFIC:0,
    TECHNICAL:0,
    CREATIVE:0,
    SOCIAL:0,
    LEADERSHIP:0,
    PRACTICAL:0,
    ENTREPRENEURIAL:0

},

    learningStyle: null,

    mathScore: 0,

    englishScore: 0,

    teamwork: 0,

    creativity: 0,

    problemSolving: 0,

    universityGoal: null

};
function saveProgress(){

    localStorage.setItem(
        "futurePilotAssessment",
        JSON.stringify({
            currentQuestion,
            results
        })
    );

}
const questionContainer =
document.getElementById("question-container");

const progressText =
document.getElementById("progress-text");

const progressFill =
document.getElementById("progress-fill");

async function loadQuestions(){

    const response =
    await fetch("/Frontend/questions.json");

    questions =
    await response.json();

    showQuestion();
}

function showQuestion(){

    if(
        currentQuestion === 9 ||
        currentQuestion === 19 ||
        currentQuestion === 29 ||
        currentQuestion === 39
    ){
        showFlightTransition();
        return;
    }

    const q =
    questions[currentQuestion];


    const progress =
    ((currentQuestion + 1) / questions.length) * 100;

    progressFill.style.width =
    progress + "%";

    let flightName = "";

    if(currentQuestion < 10){

        flightName =
        "Flight 1 — Discover Your Path";

    }else if(currentQuestion < 20){

        flightName =
        "Flight 2 — Explore Your Interests";

    }else if(currentQuestion < 30){

        flightName =
        "Flight 3 — Understand Your Strengths";

    }else if(currentQuestion < 40){

        flightName =
        "Flight 4 — Build Your Profile";

    }else if(currentQuestion < 50){

        flightName =
        "Flight 5 — You have reached your destination!";

    }

    let section = "";

    if(q.type === "interest"){

        section =
        "Career Discovery";

    }else if(q.type === "personality"){

        section =
        "Personality Mapping";

    }else{

        section =
        "Student Profile";

    }

    progressText.innerHTML = `

        <div class="flight-title">
            ${flightName}
        </div>

        <div class="flight-section">
            ${section}
        </div>

        <div class="question-progress">
            Question ${currentQuestion + 1}
            of
            ${questions.length}
        </div>

    `;

    let html = `

        <div class="question-card fade-in">

            <h2>${q.question}</h2>

            <div class="answers">

    `;

    q.answers.forEach((answer,index)=>{

        html += `

            <button
                class="answer-btn"
                onclick="selectAnswer(this, ${index})">

                ${answer.text}

            </button>

        `;

    });

    html += `

            </div>

            <button
                class="skip-btn"
                onclick="skipQuestion()">

                Not Sure

            </button>

        </div>

    `;

    questionContainer.innerHTML =
    html;
}

function selectAnswer(button,index){

    button.style.borderColor =
    "#00FFB3";

    button.style.boxShadow =
    "0 0 25px rgba(0,255,179,.8)";

    button.style.background =
    "rgba(0,255,179,.15)";

    button.classList.add("selected");

    const q =
    questions[currentQuestion];

    const answer =
    q.answers[index];

if (answer.cluster) {

    const cluster = answer.cluster.toUpperCase();

    const points = answer.points || 0;

    if (results.clusters[cluster] !== undefined) {

        results.clusters[cluster] += points;

    }

}

    if(answer.learningStyle){

        results.learningStyle =
        answer.learningStyle;

    }

    if(answer.math){

        results.mathScore +=
        answer.math;

    }

    if(answer.english){

        results.englishScore +=
        answer.english;

    }

    if(answer.universityGoal){

        results.universityGoal =
        answer.universityGoal;

    }

setTimeout(()=>{

    currentQuestion++;

    saveProgress();

    if(
        currentQuestion <
        questions.length
    ){

        showQuestion();

    }else{

        finishAssessment();

    }

},500);
}

function skipQuestion(){

    currentQuestion++;

    saveProgress();

    if(
        currentQuestion <
        questions.length
    ){

        showQuestion();

    }else{

        finishAssessment();

    }
}

function showFlightTransition(){

    const flightNumber =
    Math.floor(currentQuestion / 10) + 1;

    questionContainer.innerHTML = `

<div class="flight-complete">

    <div class="radar-bg"></div>

    <div class="radar-sweep"></div>

    <div class="stars"></div>

    <div class="flight-header">

        <div class="flight-label">
            FLIGHT ${flightNumber}
        </div>

        <h1>COMPLETED</h1>

        <p>
            Great job! You've completed this stage of your journey.
        </p>

    </div>

    <div class="flight-dot"></div>

    <button
        class="answer-btn"
        onclick="continueFlight()">

        Continue Journey →

    </button>

</div>

`;
}

function continueFlight(){

    console.log(
        "CONTINUE CLICKED",
        currentQuestion
    );

    currentQuestion++;

    showQuestion();
}

function getTopClusters() {

    return Object.entries(results.clusters)
        .sort((a, b) => b[1] - a[1]);

}

function getDominantCluster() {

    return getTopClusters()[0][0];

}

function getTopThree() {

    return getTopClusters().slice(0, 3);

}

function getClusterPercentages() {

    const values = Object.values(results.clusters);

    const max = Math.max(...values);

    let percentages = {};

    for (const cluster in results.clusters) {

        percentages[cluster] = max === 0
            ? 0
            : Math.round((results.clusters[cluster] / max) * 100);

    }

    return percentages;

}

function finishAssessment(){

const sortedClusters = getTopClusters();

const strongestCluster = getDominantCluster();

const topThree = getTopThree();

const clusterPercentages = getClusterPercentages();

const recommendedCareers =
careerMap[strongestCluster];

const topCareer =
recommendedCareers[0];

    let mathLevel =
    "Beginner";

    if(results.mathScore >= 4)
        mathLevel = "Intermediate";

    if(results.mathScore >= 5)
        mathLevel = "Advanced";

    let englishLevel =
    "Beginner";

    if(results.englishScore >= 3)
        englishLevel = "Intermediate";

    if(results.englishScore >= 5)
        englishLevel = "Advanced";

    const assessmentResult = {

    topCareer,

    cluster:
    strongestCluster,

    recommendedCareers,

      topThree,

    clusterPercentages,

    allClusterScores: results.clusters,

    learningStyle:
    results.learningStyle,

    mathLevel,

    englishLevel,

    universityGoal:
    results.universityGoal

};

    localStorage.setItem(
        "futurePilotResults",
        JSON.stringify(
            assessmentResult
        )
    );

   localStorage.setItem(
    "selectedCareer",
    topCareer
);

    localStorage.setItem(
        "academicLevel",
        `${mathLevel} / ${englishLevel}`
    );

   localStorage.removeItem(
    "futurePilotAssessment"
);

window.location.href =
"/flightplan";
}
const savedProgress = JSON.parse(
    localStorage.getItem("futurePilotAssessment")
);

if(savedProgress){

    currentQuestion = savedProgress.currentQuestion;
    results = savedProgress.results;

}

loadQuestions();