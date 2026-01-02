const questions = [
    { q: "Dove è stato vinto lo scudetto il 4 maggio 2023?", options: ["Napoli", "Udine", "Salerno", "Roma"], correct: 1 },
    { q: "Chi era l'allenatore dello scudetto 2023?", options: ["Garcia", "Spalletti", "Mazzarri", "Conte"], correct: 1 },
    { q: "Chi è stato il capocannoniere 2022/23?", options: ["Kvara", "Simeone", "Osimhen", "Lozano"], correct: 2 },
    { q: "Chi è l'attuale allenatore del Napoli?", options: ["Calzona", "Conte", "Manna", "De Rossi"], correct: 1 },
    { q: "Squadra di provenienza di McTominay?", options: ["Chelsea", "Man. United", "Arsenal", "Celtic"], correct: 1 },
    { q: "Chi è il nuovo difensore centrale dal Torino?", options: ["Rafa Marin", "Buongiorno", "Natan", "Hermoso"], correct: 1 },
    { q: "Punti fatti nel campionato dello scudetto?", options: ["86", "90", "91", "88"], correct: 2 },
    { q: "Contro chi ha debuttato Conte in Serie A col Napoli?", options: ["Modena", "Verona", "Bologna", "Parma"], correct: 1 },
    { q: "In che squadra gioca ora Victor Osimhen?", options: ["PSG", "Galatasaray", "Chelsea", "Al-Ahli"], correct: 1 },
    { q: "Chi è il capitano del Napoli?", options: ["Di Lorenzo", "Lobotka", "Rrahmani", "Politano"], correct: 0 },
    { q: "Da dove è stato acquistato Lukaku?", options: ["Inter", "Chelsea", "Roma", "Everton"], correct: 1 },
    { q: "Chi ha segnato il gol del pareggio a Udine?", options: ["Osimhen", "Kvara", "Zielinski", "Di Lorenzo"], correct: 0 },
    { q: "Il nuovo esterno arrivato dal Benfica?", options: ["Neres", "Spinazzola", "Mazzocchi", "Politano"], correct: 0 },
    { q: "Il nome del nuovo DS azzurro?", options: ["Giuntoli", "Manna", "Meluso", "Sartori"], correct: 1 },
    { q: "Il nome dello stadio oggi?", options: ["San Paolo", "Diego Armando Maradona", "Vesuvio", "Fuorigrotta"], correct: 1 }
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
const logo = document.getElementById('napoli-logo');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultSection.classList.add('hidden');
    gameSection.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQ = questions[currentQuestionIndex];
    questionText.innerText = `${currentQuestionIndex + 1}. ${currentQ.q}`;
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
    
    // Rimuove l'animazione precedente per poterla riattivare
    logo.classList.remove('bounce');

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
        // Attiva l'animazione del logo se la risposta è giusta!
        setTimeout(() => logo.classList.add('bounce'), 10);
    }
    
    nextBtn.style.display = 'inline-block';
}

nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResults() {
    gameSection.classList.add("hidden");
    document.getElementById("timer-container").classList.add("hidden");
    resultSection.classList.remove("hidden");
    
    let messaggioSpeciale = "";
    
    // Se il punteggio è 15 su 15
    if (score === domande.length) {
        messaggioSpeciale = `
            <div class="video-container">
                <p>CAMPIONE! Sei un vero Ultras! 🏆💙</p>
                <iframe src="https://www.youtube.com/watch?v=NbdBh9iTlio" 
                        title="Napoli Campione" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            </div>`;
    } else {
        messaggioSpeciale = `<p>Bravo, ma puoi fare di meglio per la maglia! ⚽</p>`;
    }

document.getElementById("restart-btn").onclick = () => {
    location.reload();
};

restartBtn.onclick = startQuiz;
startQuiz();
