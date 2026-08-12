// Motor LOCAL del test. Calcula el perfil por clusters mientras el
// estudiante responde: progreso, nivel academico y estilo de aprendizaje.
//
// Lo que este archivo ya NO hace es decidir que carrera le corresponde.
// Antes tenia un careerMap propio con 39 nombres hardcodeados, del que
// solo 4 existian en el catalogo real del backend
// (futurepilot-IA/data/careers.json). El resultado era que la pantalla de
// resultados parciales prometia una carrera y la de resultados completos,
// calculada por el motor real, mostraba otra distinta. Dos veredictos
// incompatibles sobre el futuro del estudiante con minutos de diferencia.
//
// La unica autoridad sobre que carrera encaja es el backend
// (DecisionEngine, coseno contra los requisitos de cada carrera). Los
// clusters que se calculan aqui son los MISMOS ocho que usa el servidor,
// asi que son complementarios, no una segunda opinion.
const clusterNames = [
  "ANALYTICAL", "SCIENTIFIC", "TECHNICAL", "CREATIVE",
  "SOCIAL", "LEADERSHIP", "PRACTICAL", "ENTREPRENEURIAL",
];

// Solo clusters. Habia tambien mathScore, englishScore, learningStyle y
// universityGoal, alimentados por campos `math`/`english`/`learningStyle`
// en las respuestas de questions.json. Esos campos NO EXISTEN en el banco
// - ninguna de las 200 respuestas los trae - asi que los contadores se
// quedaban en cero y de ahi salian un "Math: Beginner / English: Beginner"
// identico para todos y un "Learning Style: null" literal en pantalla.
// Se eliminaron en vez de dejarlos: un dato inventado que parece personal
// es peor que no mostrar nada, y el estilo de aprendizaje de verdad ya lo
// calcula el backend (ReasoningEngine.infer_archetype).
function createInitialResults() {
  return {
    clusters: Object.fromEntries(clusterNames.map((cluster) => [cluster, 0])),
  };
}

function applyAnswer(results, answer) {
  if (!answer || !answer.cluster) return;
  const cluster = answer.cluster.toUpperCase();
  if (results.clusters[cluster] !== undefined) {
    results.clusters[cluster] += answer.points || 0;
  }
}

function calculateResults(questions, answers, savedResults = null) {
  const results = createInitialResults();
  const hasAnswerIndexes = answers.some((answer) => answer?.answerIndex !== null && answer?.answerIndex !== undefined);

  if (!hasAnswerIndexes && savedResults) return savedResults;

  answers.forEach((answer, index) => {
    const answerIndex = answer?.answerIndex;
    if (answerIndex !== null && answerIndex !== undefined) {
      applyAnswer(results, questions[index]?.answers?.[answerIndex]);
    }
  });

  return results;
}

function getTopClusters(results) {
  return Object.entries(results.clusters).sort((a, b) => b[1] - a[1]);
}

function buildAssessmentResult(results) {
  const sortedClusters = getTopClusters(results);
  const strongestCluster = sortedClusters[0][0];
  const clusterValues = Object.values(results.clusters);
  const max = Math.max(...clusterValues);
  const clusterPercentages = {};

  for (const cluster in results.clusters) {
    clusterPercentages[cluster] = max === 0 ? 0 : Math.round((results.clusters[cluster] / max) * 100);
  }

  // Sin topCareer ni recommendedCareers: los nombres de carrera vienen del
  // backend. Aqui solo se describe el PERFIL (que clusters dominan y con
  // que fuerza relativa), que es lo que este motor puede afirmar de verdad.
  return {
    cluster: strongestCluster,
    topThree: sortedClusters.slice(0, 3),
    clusterPercentages,
    allClusterScores: results.clusters,
  };
}

export {
  clusterNames,
  applyAnswer,
  buildAssessmentResult,
  calculateResults,
  createInitialResults,
  getTopClusters,
};
