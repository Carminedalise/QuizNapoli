// Aggiungi questo in cima al tuo script.js su GitHub
window.onload = () => {
    startQuiz();
};

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultSection = document.getElementById('result-section');
const gameSection = document.getElementById('game-section');
const finalScoreText = document.getElementById('final-score');
const timeDisplay = document.getElementById('time-left');
const logo = document.getElementById('napoli-logo');

function startTimer() {
    timeLeft = 10;
    if(timeDisplay) timeDisplay.innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        if(timeDisplay) timeDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNext(); 
        }
    }, 1000);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
    document.getElementById("timer-container").classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    startTimer();
    const currentQ = questions[currentQuestionIndex];
    questionText.innerText = `${currentQuestionIndex + 1}. ${currentQ.q}`;
    optionsContainer.innerHTML = '';
    nextBtn.classList.add('hidden');

    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
}

function selectOption(index) {
    clearInterval(timer);
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll('.option-btn');
    
    if(logo) logo.classList.remove('bounce');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctIndex) {
            btn.style.backgroundColor = "#4CAF50";
            btn.style.color = "white";
        } else if (i === index) {
            btn.style.backgroundColor = "#f44336";
            btn.style.color = "white";
        }
    });

    if (index === correctIndex) {
        score++;
        if(logo) setTimeout(() => logo.classList.add('bounce'), 10);
    }
    
    nextBtn.classList.remove('hidden');
}

function handleNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

nextBtn.onclick = handleNext;

function showResults() {
    gameSection.classList.add("hidden");
    document.getElementById("timer-container").classList.add("hidden");
    resultSection.classList.remove("hidden");
    
    let messaggioSpeciale = "";
    
    if (score === questions.length) {
        messaggioSpeciale = `
            <div class="video-container">
                <p>CAMPIONE! Sei un vero Ultras! 🏆💙</p>
                <iframe width="100%" height="200" src="https://www.youtube.com/embed/NbdBh9iTlio" 
                        title="Napoli Campione" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            </div>`;
    } else {
        messaggioSpeciale = `<p>Bravo, ma puoi fare di meglio per la maglia! ⚽</p>`;
    }

    finalScoreText.innerHTML = `Hai totalizzato ${score} su ${questions.length}! ${messaggioSpeciale}`;
}

document.getElementById("restart-btn").onclick = () => {
    startQuiz();
};

startQuiz();
