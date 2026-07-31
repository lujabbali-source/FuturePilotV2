(() => {
// The assessment engine stays intentionally close to the original MVP logic.
// The new UI only supplies answer indexes; scoring and recommendations remain here.
const careerMap = {
  ANALYTICAL: ["Data Science", "Economics", "Mathematics", "Physics", "Actuarial Science"],
  SCIENTIFIC: ["Medicine", "Biotechnology", "Biochemistry", "Chemistry", "Biomedical Engineering"],
  TECHNICAL: ["Software Engineering", "Computer Science", "Cybersecurity", "Artificial Intelligence", "Robotics"],
  CREATIVE: ["Graphic Design", "Architecture", "Animation", "Digital Media", "Music Production"],
  SOCIAL: ["Psychology", "Education", "Law", "International Relations", "Journalism"],
  LEADERSHIP: ["Business Administration", "Finance", "Marketing", "Management", "Entrepreneurship"],
  PRACTICAL: ["Mechanical Engineering", "Civil Engineering", "Construction", "Industrial Engineering", "Aviation Maintenance"],
  ENTREPRENEURIAL: ["Entrepreneurship", "Business Innovation", "E-Commerce", "Startups", "Product Management"],
};

const clusterNames = Object.keys(careerMap);

function createInitialResults() {
  return {
    clusters: Object.fromEntries(clusterNames.map((cluster) => [cluster, 0])),
    learningStyle: null,
    mathScore: 0,
    englishScore: 0,
    teamwork: 0,
    creativity: 0,
    problemSolving: 0,
    universityGoal: null,
  };
}

// This is the same answer application used by the previous assessment.js.
function applyAnswer(results, answer) {
  if (!answer) return;

  if (answer.cluster) {
    const cluster = answer.cluster.toUpperCase();
    const points = answer.points || 0;
    if (results.clusters[cluster] !== undefined) results.clusters[cluster] += points;
  }

  if (answer.learningStyle) results.learningStyle = answer.learningStyle;
  if (answer.math) results.mathScore += answer.math;
  if (answer.english) results.englishScore += answer.english;
  if (answer.universityGoal) results.universityGoal = answer.universityGoal;
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

  const recommendedCareers = careerMap[strongestCluster];
  const mathLevel = results.mathScore >= 5 ? "Advanced" : results.mathScore >= 4 ? "Intermediate" : "Beginner";
  const englishLevel = results.englishScore >= 5 ? "Advanced" : results.englishScore >= 3 ? "Intermediate" : "Beginner";

  return {
    topCareer: recommendedCareers[0],
    cluster: strongestCluster,
    recommendedCareers,
    topThree: sortedClusters.slice(0, 3),
    clusterPercentages,
    allClusterScores: results.clusters,
    learningStyle: results.learningStyle,
    mathLevel,
    englishLevel,
    universityGoal: results.universityGoal,
  };
}

window.FuturePilotAssessmentEngine = {
  careerMap,
  applyAnswer,
  buildAssessmentResult,
  calculateResults,
  createInitialResults,
  getTopClusters,
};
})();
