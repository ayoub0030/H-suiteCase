// Game state
let score = 0;
let timer;
let gameInterval;
let currentAnswer;

// Function to load images from local folders
function loadGameImages() {
    const sauceImages = [];
    const sootImages = [];
    
    // Using absolute paths for images
    const sauceFiles = [
        'لقطة شاشة 2024-12-01 223546.png',
        'لقطة شاشة 2024-12-01 223554.png',
        'لقطة شاشة 2024-12-01 223602.png',
        'لقطة شاشة 2024-12-01 223615.png',
        'لقطة شاشة 2024-12-01 223637.png'
    ];
    
    const sootFiles = [
        'لقطة شاشة 2024-12-01 223450.png',
        'لقطة شاشة 2024-12-01 223507.png',
        'لقطة شاشة 2024-12-01 223520.png',
        'لقطة شاشة 2024-12-01 223528.png'
    ];
    
    // Create image objects for sauce images
    sauceFiles.forEach((filename, index) => {
        const img = new Image();
        img.src = './images/sauce/' + filename;
        sauceImages.push({
            url: './images/sauce/' + filename,
            answer: 'sauce',
            description: 'Sauce Image ' + (index + 1)
        });
    });
    
    // Create image objects for soot images
    sootFiles.forEach((filename, index) => {
        const img = new Image();
        img.src = './images/soot/' + filename;
        sootImages.push({
            url: './images/soot/' + filename,
            answer: 'soot',
            description: 'Soot Image ' + (index + 1)
        });
    });
    
    return [...sauceImages, ...sootImages];
}

// Initialize game images
const gameImages = loadGameImages();

// DOM Elements
const playButton = document.getElementById('playButton');
const aboutButton = document.getElementById('aboutButton');
const gameContainer = document.getElementById('gameContainer');
const resultsContainer = document.getElementById('resultsContainer');
const timerElement = document.getElementById('timer');
const gameImage = document.getElementById('gameImage');
const sauceButton = document.getElementById('sauceButton');
const sootButton = document.getElementById('sootButton');
const scoreElement = document.getElementById('score');
const finalScore = document.getElementById('finalScore');
const titleElement = document.getElementById('title');
const playAgainButton = document.getElementById('playAgain');
const secretButton = document.getElementById('secretButton');

// Audio for easter egg
const audioClip = new Audio('https://www.myinstants.com/media/sounds/vine-boom.mp3');

// Event Listeners
playButton.addEventListener('click', startGame);
sauceButton.addEventListener('click', () => checkAnswer('sauce'));
sootButton.addEventListener('click', () => checkAnswer('soot'));
playAgainButton.addEventListener('click', startGame);
secretButton.addEventListener('click', playEasterEgg);

function startGame() {
    score = 0;
    updateScore();
    gameContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    nextRound();
}

function nextRound() {
    let timeLeft = 3;
    timerElement.textContent = timeLeft;
    
    // Select random image
    const randomImage = gameImages[Math.floor(Math.random() * gameImages.length)];
    
    // Debug log
    console.log('Loading image:', randomImage.url);
    
    // Create a new image element to ensure loading
    const img = new Image();
    img.onload = function() {
        gameImage.style.backgroundImage = `url('${randomImage.url}')`;
    };
    img.onerror = function() {
        console.error('Error loading image:', randomImage.url);
    };
    img.src = randomImage.url;
    
    currentAnswer = randomImage.answer;
    
    // Start timer
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function checkAnswer(answer) {
    clearInterval(timer);
    if (answer === currentAnswer) {
        score += 100;
        updateScore();
    }
    nextRound();
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function getTitle(score) {
    if (score >= 500) return "Sauce Supreme / Soot Sovereign";
    if (score >= 300) return "Certified Sauce Sniffer";
    if (score >= 100) return "Amateur Sauce Spotter";
    return "Soot Rookie";
}

function endGame() {
    gameContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    finalScore.textContent = `Final Score: ${score}`;
    titleElement.textContent = `Your Title: ${getTitle(score)}`;
}

function playEasterEgg() {
    audioClip.play();
    secretButton.classList.add('shake');
    setTimeout(() => secretButton.classList.remove('shake'), 500);
}

// Add some CSS animation for the secret button
const style = document.createElement('style');
style.textContent = `
    .shake {
        animation: shake 0.5s;
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
