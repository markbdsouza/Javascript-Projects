import { typerSettings } from './wordHandling';

const difficultyBar = document.getElementById('settings');
const settingBtn = document.getElementById('setting-btn');
const word = document.getElementById('word');
const scoreSpan = document.querySelector('.score');
const wordInput = document.getElementById('wordInput');
const timeSpan = document.getElementById('time');
const difficultySelect = document.getElementById('difficulty');
const endContainer = document.querySelector('.end-game-container');
const wordContainer = document.querySelector('.word-container');
const gameTypeSelect = document.getElementById('gameType');
const startingTime = 10;
const defaultOptions = { easy: 3, medium: 2, hard: 1 };

let paragraphWords;
let countDownInterval;
let wordPicked;
let timeLeft;
let score;
let difficulty;
let gameType;
let paraWordIndex;
let options;

/* Time related functions */
function addToTimeCounter() {
  timeLeft += options[difficulty];
  updateTimerinDOM(timeLeft);
}
function updateTimerinDOM(time) {
  timeSpan.innerText = `${time}s`;
}
function updateBodyBasedOnTime(time) {
  let color;
  if (time >= 6 || time === 0) {
    color = 'rgb(240, 165, 0)';
  } else if (time >= 3) {
    color = 'rgb(255, 115, 0)';
  } else if (time > 0) {
    color = 'rgb(248, 39, 22)';
  }
  document.body.style.background = color;
}
function countDown() {
  updateTimerinDOM(startingTime);
  countDownInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft >= 0) {
      updateTimerinDOM(timeLeft);
    } else {
      clearInterval(countDownInterval);
      wordInput.removeEventListener('input', checkWord);
      endGame((isTimeOver = true));
    }
    updateBodyBasedOnTime(timeLeft);
  }, 1000);
}

function updateScoreinDOM() {
  scoreSpan.innerText = `${score}`;
}

function loadWord() {
  wordPicked = typerSettings['wordTyper'].pickRandomWord();
  wordContainer.innerHTML = `<h1 class="word">${wordPicked}</h1>`;
}

function checkWord(e) {
  if (e.target.value === wordPicked) {
    score++;
    updateScoreinDOM();
    e.target.value = '';
    addToTimeCounter();
    if (gameType === 'wordTyper') {
      loadWord();
    } else if (gameType === 'paraTyper' || gameType === 'alphabetTyper') {
      loadPara();
    }
  }
}

function difficultyChanged() {
  difficulty = difficultySelect.value;
  restartGame();
  clearInterval(countDownInterval);
}

function gameTypeChanged() {
  gameType = gameTypeSelect.value;
  if (gameType === 'paraTyper') {
    paragraphWords = typerSettings['paraTyper'].returnParagraphArray();
  }
  restartGame();
  clearInterval(countDownInterval);
}
function loadPara() {
  paraWordIndex = paraWordIndex + 1 || 0;
  if (paraWordIndex === 0) {
    wordsDisplayed = paragraphWords.slice(paraWordIndex, paraWordIndex + 2);
    wordPicked = wordsDisplayed[0];
    wordContainer.innerHTML = `<h1 class="word prev"></h1><h1 class="word">${wordPicked}</h1> <h1 class="word next">${wordsDisplayed[1]} </h1>`;
  } else if (paraWordIndex < paragraphWords.length) {
    wordsDisplayed = paragraphWords.slice(paraWordIndex - 1, paraWordIndex + 2);
    wordPicked = wordsDisplayed[1];
    wordContainer.innerHTML = `<h1 class="word prev">${
      wordsDisplayed[0]
    } </h1><h1 class="word">${wordPicked}</h1> <h1 class="word next">${
      wordsDisplayed[2] || ''
    } </h1>`;
  } else if (paraWordIndex === paragraphWords.length) {
    endGame((isTimeOver = false));
  }
}

function init() {
  endContainer.classList.remove('visible');
  gameType = gameTypeSelect.value;
  score = 0;
  paraWordIndex = undefined;
  timeLeft = startingTime;
  difficulty = difficultySelect.value;
  wordInput.disabled = false;
  wordContainer.innerHTML = '';
  console.log(gameType);
  options = typerSettings[gameType].difficulty || defaultOptions;
  if (gameType !== 'wordTyper') {
    const isHard = difficulty === 'hard';
    paragraphWords = typerSettings[gameType].returnParagraphArray(isHard);
  }
  wordInput.focus();
}

function startGame() {
  console.log('+', paragraphWords);
  init();
  updateScoreinDOM();
  if (gameType === 'wordTyper') {
    wordContainer.style['justify-content'] = 'center';
    loadWord();
  } else if (gameType === 'paraTyper' || gameType === 'alphabetTyper') {
    wordContainer.style['justify-content'] = 'space-between';
    loadPara();
  }
  wordInput.addEventListener('input', checkWord);
  countDown();
}

function restartGame() {
  wordInput.disabled = true;
  wordInput.value = '';
  loadEndContainerToDOM((isEnd = false));
}

function endGame(isTimeOver = true) {
  wordInput.disabled = true;
  wordInput.value = '';
  loadEndContainerToDOM(true, score, isTimeOver);
}

function loadEndContainerToDOM(isEnd, score, isOutOfTime) {
  if (isEnd) {
    endContainer.innerHTML = ` <h3>${
      isOutOfTime ? `Time ran out!` : `Game Over`
    }</h3> You have scored a score of ${score} points in ${difficulty} difficulty. 
    ${isOutOfTime ? `Try harder!` : `Nice Job!`} 
    <button onClick='startGame()'> Play Again </button>`;
  } else {
    endContainer.innerHTML = ` <h3>Welcome to the Speed Typing game</h3> 
    <div> There are 3 modes of gameplay with 3 difficulty levels. All modes have a countdown timer. 
    Depending on the mode & difficulty chosen, typing the right word will add seconds to the clock. 
    Let's see how quickly you can type!
    </div>    
    <button onClick='startGame()'> Play </button>`;
  }
  endContainer.classList.add('visible');
}

loadEndContainerToDOM((isEnd = false));
difficultySelect.addEventListener('change', difficultyChanged);
gameTypeSelect.addEventListener('change', gameTypeChanged);
settingBtn.addEventListener('click', () => {
  difficultyBar.classList.toggle('visible');
});
