const startScreen = document.getElementById("startScreen");
const testScreen = document.getElementById("testScreen");
const finishScreen = document.getElementById("finishScreen");
const candidateSelect = document.getElementById("candidateSelect");
const startBtn = document.getElementById("startBtn");
const startError = document.getElementById("startError");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const timerEl = document.getElementById("timer");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answersEl = document.getElementById("answers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const finishMessage = document.getElementById("finishMessage");

let currentQuestion = 0;
let selectedCandidate = "";
let answers = [];
let timerInterval = null;
let timeLeft = CONFIG.durationMinutes * 60;
let submitted = false;

CONFIG.candidates.forEach(name => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  candidateSelect.appendChild(option);
});

function showScreen(screen) {
  [startScreen, testScreen, finishScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

function getOptions(question) {
  return question.options === "candidates" ? CONFIG.candidates : question.options;
}

function startTimer() {
  updateTimer();

  timerInterval = setInterval(() => {
    timeLeft -= 1;
    updateTimer();

    if (timeLeft <= 0) {
      submitTest(true);
    }
  }, 1000);
}

function updateTimer() {
  const min = Math.max(0, Math.floor(timeLeft / 60));
  const sec = Math.max(0, timeLeft % 60);
  timerEl.textContent = `${min}:${String(sec).padStart(2, "0")}`;
}

function renderQuestion() {
  const q = CONFIG.questions[currentQuestion];
  const total = CONFIG.questions.length;

  progressText.textContent = `Vraag ${currentQuestion + 1} van ${total}`;
  progressFill.style.width = `${((currentQuestion + 1) / total) * 100}%`;
  questionNumber.textContent = `Vraag ${currentQuestion + 1}`;
  questionText.textContent = q.question;

  answersEl.innerHTML = "";
  getOptions(q).forEach(optionText => {
    const btn = document.createElement("button");
    btn.className = "answer";
    if (answers[currentQuestion] === optionText) btn.classList.add("selected");
    btn.textContent = optionText;
    btn.onclick = () => {
      answers[currentQuestion] = optionText;
      renderQuestion();
    };
    answersEl.appendChild(btn);
  });

  prevBtn.disabled = currentQuestion === 0;
  nextBtn.textContent = currentQuestion === total - 1 ? "Test inleveren" : "Volgende";
}

startBtn.addEventListener("click", () => {
  if (!candidateSelect.value) {
    startError.textContent = "Kies eerst je naam.";
    return;
  }

  selectedCandidate = candidateSelect.value;
  answers = new Array(CONFIG.questions.length).fill("");
  showScreen(testScreen);
  renderQuestion();
  startTimer();
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion -= 1;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (!answers[currentQuestion]) {
    alert("Kies eerst een antwoord.");
    return;
  }

  if (currentQuestion === CONFIG.questions.length - 1) {
    submitTest(false);
  } else {
    currentQuestion += 1;
    renderQuestion();
  }
});

function calculateScore() {
  let score = 0;

  CONFIG.questions.forEach((q, index) => {
    if (answers[index] === q.correctAnswer) {
      score += 1;
    }
  });

  return score;
}

async function submitTest(timeExpired) {
  if (submitted) return;
  submitted = true;

  if (timerInterval) clearInterval(timerInterval);

  const score = calculateScore();

  const payload = {
    testName: CONFIG.testName,
    kandidaat: selectedCandidate,
    tijdstip: new Date().toISOString(),
    score: score,
    totaal: CONFIG.questions.length,
    tijdOverSeconden: Math.max(0, timeLeft),
    tijdVerstrekenSeconden: (CONFIG.durationMinutes * 60) - Math.max(0, timeLeft),
    automatischIngeleverd: timeExpired,
    antwoorden: answers,
    vragen: CONFIG.questions.map(q => q.question),
    juisteAntwoorden: CONFIG.questions.map(q => q.correctAnswer)
  };

  showScreen(finishScreen);
  finishMessage.textContent = "Je antwoorden worden verzonden...";

  if (!CONFIG.googleScriptUrl) {
    console.log("Test payload:", payload);
    finishMessage.textContent = `Test lokaal voltooid. Score: ${score}/${CONFIG.questions.length}. Voeg nog een Google Apps Script URL toe om online op te slaan.`;
    return;
  }

  try {
    await fetch(CONFIG.googleScriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });

    finishMessage.textContent = "Je antwoorden zijn verstuurd. Je mag dit scherm sluiten.";
  } catch (error) {
    console.error(error);
    finishMessage.textContent = "Verzenden is mislukt. Laat de spelleiding dit scherm controleren.";
  }
}
