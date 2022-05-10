//Globlas
// Available Levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
}

// To change level
let currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;
let maxScore;


// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highScoreElt = document.querySelector('#high-score');
const easyBtn = document.querySelector('#easy');
const mediumBtn = document.querySelector('#medium');
const hardBtn = document.querySelector('#hard');
const startButtonElement = document.getElementById ('startButton');

const words = [
    'manual',
    'slim',
    'muscle',
    'light',
    'keep',
    'healthy',
    'automatic',
    'cupboard',
    'skate',
    'travel',
    'holiday',
    'nothing',
    'clothes',
    'plant',
    'earth',
    'university',
    'universal',
    'breath',
    'fruits',
    'salary',
    'marriage',
    'curtain',
    'planet',
    'brilliant',
    'million',
    'close',
    'sky',
    'sleep',
    'shower',
    'towel',
    'tickets',
    'circle',
    'today',
    'camera',
    'photograph',
    'landmark',
    'policy',
    'condition',
    'nicely',
    'mushroom',
    'restaurant',
    'examination',
    'deploy',
    'condition',
    'trousers',
    'breakfast',
    'photograph',
    'success'
];
//option
const settingOption = document.getElementById('optionBtn');
const menuSlideElt = document.getElementById('menuSlide');

settingOption.addEventListener('click', function () {
    menuSlideElt.classList.toggle("slideIn");
});

startButtonElement.addEventListener('click', function() {
init();
startButtonElement.classList.add('hide');
})


// Seclect level
function setlevel(e) {
    if (e.target === easyBtn) {
        currentLevel = levels.easy;
    } else if (e.target === mediumBtn) {
        currentLevel = levels.medium;
    } else if (e.target === hardBtn) {
        currentLevel = levels.hard;
    }
    menuSlideElt.classList.toggle("slideIn");
    console.log(currentLevel);
   // init();
   document.querySelector('.game-instructions').classList.add('hide');
   document.getElementById('typing-area').classList.remove('hide');
}

// Initialize Game
function init() {
    // Show number of sec in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
    maxScore = localStorage.getItem('highScore');
    highScoreElt.innerHTML = maxScore;
}

//Start match
function startMatch() {
    wordInput.value = wordInput.value.toLowerCase();
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    // If score is -1 display zero
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
        highScoreElt.innerHTML = score;

        if (score >= maxScore) {
            localStorage.setItem('highScore', score);
        }
    }
    maxScore = localStorage.getItem('highScore');
    scoreDisplay.innerHTML = score;
    highScoreElt.innerHTML = maxScore;
}

// Match currentWord to wordInput
function matchWords() {

    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Great!';
        return true;
    } else {
        message.innerHTML = '...';
        return false;
    }
}

// Pick and show random word
function showWord(word) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}
// Countdown timer

function countdown() {
    // Make sure time is not runout
    if (time > 0) {
        // decrement
        time--;
    } else if (time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Your time is up!';
        score = -1;
        document.getElementById('typing-area').classList.add('hide');
        document.getElementById('game-over').classList.remove('hide');
    }
}

easyBtn.addEventListener('click', setlevel);
mediumBtn.addEventListener('click', setlevel);
hardBtn.addEventListener('click', setlevel);

document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    //menuSlideElt.classList.toggle("slideIn");
  });