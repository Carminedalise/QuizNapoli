let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const timeDisplay = document.getElementById('time-left');

// Funzione per far partire il quiz (Mancava nel tuo snippet)
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    showQuestion();
}

function startTimer() {
    timeLeft = 10;
    if(timeDisplay) timeDisplay.innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        if(timeDisplay) timeDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); 
        }
    }, 1000);
}

function showQuestion() {
    startTimer();
    const currentQ = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQ.q;
    const container = document.getElementById('options-container');
    container.innerHTML = '';

    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.onclick = () => selectOption(index);
        container.appendChild(button);
    });
}

function selectOption(index) {
    clearInterval(timer);
    const correctIndex = questions[currentQuestionIndex].correct;
    if (index === correctIndex) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Funzione per mostrare i risultati (Mancava nel tuo snippet)
function showResults() {
    document.getElementById('game-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
    document.getElementById('final-score').innerText = `Hai totalizzato ${score} su ${questions.length}!`;
}

window.onload = () => {
    startQuiz();
};
