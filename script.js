let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const timeDisplay = document.getElementById('time-left');

function startTimer() {
    timeLeft = 10;
    if(timeDisplay) timeDisplay.innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        if(timeDisplay) timeDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); // Passa alla domanda successiva se il tempo scade
        }
    }, 1000);
}

function showQuestion() {
    startTimer(); // Fai partire il timer ogni volta che mostri una domanda
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
    clearInterval(timer); // Ferma il timer quando l'utente risponde
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

// Avvio automatico al caricamento della pagina
window.onload = () => {
    startQuiz();
};
