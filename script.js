// Aggiungi questo in cima al tuo script.js su GitHub
window.onload = () => {
    startQuiz();
};

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const resultSection = document.getElementById('result-section');
const gameSection = document.getElementById('game-section');
const finalScoreText = document.getElementById('final-score');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    if (resultSection) resultSection.classList.add('hidden');
    if (gameSection) gameSection.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQ = questions[currentQuestionIndex];
    questionText.innerText = currentQ.q;
    optionsContainer.innerHTML = '';

    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
}

function selectOption(index) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (index === correctIndex) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    gameSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    finalScoreText.innerText = `Hai totalizzato ${score} su ${questions.length}!`;
}

// Avvio automatico per la versione Web
window.onload = startQuiz;
