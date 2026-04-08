// Petal Falling Background Effect
function spawnPetal() {
    const container = document.getElementById('particles');
    let petal = document.createElement('div');
    petal.className = 'particle';
    
    const isRound = Math.random() > 0.5;
    if (isRound) petal.style.borderRadius = '50%';
    else petal.style.borderRadius = '15px 0px 15px 0px';
    
    const size = Math.random() * 8 + 6;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    
    const startX = Math.random() * 100 + 'vw';
    const duration = Math.random() * 5 + 6 + 's';
    
    petal.style.left = startX;
    petal.style.animationDuration = duration;
    
    container.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, parseFloat(duration) * 1000);
}
setInterval(spawnPetal, 300);

for(let i=0; i<15; i++) {
    setTimeout(spawnPetal, Math.random() * 1000);
}

// Typewriter Effect
const message = "I made this little something just for you...";
const typeText = document.getElementById('typewriter');
const startBtn = document.getElementById('start-btn');
let i = 0;

function typeWriter() {
    if (i < message.length) {
        typeText.innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
    } else {
        setTimeout(() => {
            startBtn.classList.remove('hidden');
        }, 500);
    }
}

window.onload = () => {
    setTimeout(typeWriter, 1000);
}

// Navigation logic
const sections = ['welcome', 'game', 'messages', 'letter-section', 'question'];

function showSection(index) {
    document.querySelectorAll('.glass-panel.active').forEach(panel => {
        panel.classList.remove('active');
        setTimeout(() => panel.classList.add('hidden'), 500);
    });
    
    setTimeout(() => {
        const nextPanel = document.getElementById(sections[index]);
        nextPanel.classList.remove('hidden');
        void nextPanel.offsetWidth;
        nextPanel.classList.add('active');
    }, 500);
}

startBtn.addEventListener('click', () => {
    showSection(1); // Go to game
});

// Game Logic
const heart = document.getElementById('moving-heart');
const scoreDisplay = document.getElementById('score-display');
const gameArea = document.querySelector('.game-area');
let score = 0;
const targetScore = 3;

function moveHeart() {
    const maxX = gameArea.clientWidth - heart.clientWidth;
    const maxY = gameArea.clientHeight - heart.clientHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    heart.style.left = randomX + 'px';
    heart.style.top = randomY + 'px';
    heart.style.transform = 'none';
}

heart.addEventListener('mouseover', () => {
    if(Math.random() > 0.3) {
        moveHeart();
    }
});

heart.addEventListener('click', () => {
    score++;
    scoreDisplay.innerText = `Score: ${score} / ${targetScore}`;
    
    createMiniHearts(heart.getBoundingClientRect());
    
    if (score >= targetScore) {
        heart.style.display = 'none';
        scoreDisplay.innerText = "Yay! You caught it! 💖";
        setTimeout(() => {
            showSection(2); // Go to messages
        }, 1500);
    } else {
        moveHeart();
    }
});

function createMiniHearts(rect) {
    for(let i=0; i<5; i++) {
        let h = document.createElement('div');
        h.innerHTML = '💖';
        h.style.position = 'fixed';
        h.style.left = (rect.left + 20) + 'px';
        h.style.top = (rect.top) + 'px';
        h.style.pointerEvents = 'none';
        h.style.transition = 'all 1s ease-out';
        h.style.opacity = '1';
        h.style.zIndex = '1000';
        document.body.appendChild(h);
        
        setTimeout(() => {
            h.style.transform = `translate(${(Math.random()-0.5)*100}px, -${Math.random()*100 + 50}px) scale(0)`;
            h.style.opacity = '0';
        }, 10);
        
        setTimeout(() => h.remove(), 1000);
    }
}

// Flip Cards Logic
const cards = document.querySelectorAll('.card');
let cardsFlipped = 0;
const nextBtn = document.getElementById('next-btn');

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
            cardsFlipped++;
            
            if (cardsFlipped === cards.length) {
                setTimeout(() => {
                    nextBtn.classList.remove('hidden');
                }, 800);
            }
        }
    });
});

nextBtn.addEventListener('click', () => {
    showSection(3); // Go to Letter Section
});

// Envelope Logic
const envelope = document.getElementById('envelope');
const nextToQuestionBtn = document.getElementById('next-to-question-btn');
const clickInstruction = document.querySelector('.click-instruction');
let isLetterOpen = false;

envelope.addEventListener('click', () => {
    if (!isLetterOpen) {
        envelope.classList.add('open');
        isLetterOpen = true;
        clickInstruction.innerText = "Scroll inside the letter to read! 📖";
        
        setTimeout(() => {
            nextToQuestionBtn.classList.remove('hidden');
        }, 3000);
    }
});

nextToQuestionBtn.addEventListener('click', () => {
    showSection(4); // Go to Question Section
});

// Runaway Button Logic
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const successScreen = document.getElementById('success');

function moveNoButton() {
    const maxX = window.innerWidth - noBtn.clientWidth - 20;
    const maxY = window.innerHeight - noBtn.clientHeight - 20;
    
    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveNoButton();
});

yesBtn.addEventListener('click', () => {
    successScreen.classList.remove('hidden');
    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const fakeRect = { left: x, top: window.innerHeight };
        createMiniHearts(fakeRect);
    }, 300);
});
