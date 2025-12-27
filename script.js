const questions = [
    { q: "Dove è stato vinto matematicamente lo scudetto 2023?", options: ["Napoli", "Udine", "Roma", "Torino"], correct: 1 },
    { q: "Chi era l'allenatore del terzo scudetto?", options: ["Garcia", "Mazzarri", "Spalletti", "Conte"], correct: 2 },
    { q: "Capocannoniere del Napoli 2022/23?", options: ["Kvara", "Osimhen", "Simeone", "Zielinski"], correct: 1 },
    { q: "Chi è l'attuale allenatore (2024/25)?", options: ["Calzona", "Conte", "Italiano", "Mazzarri"], correct: 1 },
    { q: "Squadra di provenienza di McTominay?", options: ["Chelsea", "Arsenal", "Man. United", "Liverpool"], correct: 2 },
    { q: "Chi ha preso il posto di Kim in difesa nel 2024?", options: ["Buongiorno", "Natan", "Juan Jesus", "Rrahmani"], correct: 0 },
    { q: "Punti totali scudetto 2023?", options: ["86", "90", "95", "100"], correct: 1 },
    { q: "Chi è il nuovo DS del Napoli?", options: ["Giuntoli", "Manna", "Meluso", "Sartori"], correct: 1 },
    { q: "Squadra attuale di Victor Osimhen?", options: ["PSG", "Chelsea", "Galatasaray", "Al-Ahli"], correct: 2 },
    { q: "Chi è il capitano del Napoli?", options: ["Di Lorenzo", "Politano", "Lobotka", "Anguissa"], correct: 0 },
    { q: "Da dove arriva Romelu Lukaku?", options: ["Inter", "Roma (via Chelsea)", "Everton", "Juventus"], correct: 1 },
    { q: "Chi ha segnato il gol scudetto a Udine?", options: ["Kvara", "Osimhen", "Elmas", "Olivera"], correct: 1 },
    { q: "Squadra di provenienza di David Neres?", options: ["Ajax", "Benfica", "Porto", "Shakhtar"], correct: 1 },
    { q: "Nuovo centrocampista scozzese oltre McTominay?", options: ["Gilmour", "Adams", "McGinn", "Robertson"], correct: 0 },
    { q: "Nome dello stadio del Napoli?", options: ["San Paolo", "Diego Armando Maradona", "Vesuvio Arena", "Fuorigrotta"], correct: 1 }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const resultSection = document.getElementById('result-section');
const gameSection = document.getElementById('game-section');
const finalScoreText = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQ = questions[currentQuestionIndex];
    questionText.innerText = currentQ.q;
    optionsContainer.innerHTML = '';
    nextBtn.style.display = 'none';

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
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctIndex) btn.style.backgroundColor = "#4CAF50";
        else if (i === index) btn.style.backgroundColor = "#f44336";
    });

    if (index === correctIndex) score++;
    nextBtn.style.display = 'inline-block';
}

nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) showQuestion();
    else showResult();
};

function showResult() {
    gameSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
    finalScoreText.innerText = `Punteggio: ${score} / ${questions.length}`;
    restartBtn.style.display = "inline-block";
}

restartBtn.onclick = startQuiz;
startQuiz();
