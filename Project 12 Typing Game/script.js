const difficultyBar = document.getElementById('settings');
const settingBtn = document.getElementById('setting-btn');
const word = document.getElementById('word');
const scoreSpan = document.querySelector('.score');
const wordInput = document.getElementById('wordInput');
const timeSpan = document.getElementById('time');
const difficultySelect = document.getElementById('difficulty');
const endContainer = document.querySelector('.end-game-container');
const paragraph = `Written work is divided into paragraphs in a meaningful way. A paragraph is a group of sentences that develop one topic or idea. The topic of one paragraph should follow logically from the topic of the last paragraph and should lead on to the topic of the next paragraph. The paragraphs have different functions, but all develop an idea - that is, they add information, explanation, examples and illustrations to the central theme or idea until the theme is fully developed. Correlation is a statistical technique that is used to measure and describe a relationship between two variables. Usually the two variables are simply observed as they exist naturally in the environment - there is no attempt to control or manipulate the variables. For example, a researcher interested in the relationship between nutrition and IQ could observe (and record) the dietary patterns for a group of preschool children and then measure IQ scores for the same group. Notice that the researcher is not trying to manipulate the children's diet or IQ, but is simply observing what occurs naturally. You also should notice that a correlation requires two scores for each individual (one score from each of the two variables). These scores normally are identified as X and Y. The pairs of scores can be listed in a table, or they can be presented graphically in a scatterplot. In the scatterplot, the X values are placed on the horizontal axis of a graph, and the V values are placed on the vertical axis. Each individual is then identified by a single point on the graph so that the coordinates of the point (the X and V values) match the individual's X score and Y score. The value of the scatterplot is that it allows you to see the nature of the relationship.`;
const words = paragraph.split(' ').filter((word) => word.length > 3);
const startingTime = 5;
let countDownInterval;
let wordPicked;
let timeLeft;
let score;
let difficulty;

let options = { easy: 3, medium: 2, hard: 1 };

function addToTimeCounter() {
  timeLeft += options[difficulty];
  updateTimerinDOM(timeLeft);
}

function updateTimerinDOM(time) {
  timeSpan.innerText = `${time}s`;
}

function updateScoreinDOM() {
  scoreSpan.innerText = `${score}`;
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
      endGame();
    }
  }, 1000);
}

function pickRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function endGame() {
  wordInput.disabled = true;
  wordInput.innerText = '';
  loadEndContainerToDOM(score);
}

function loadWord() {
  wordPicked = pickRandomWord();
  word.innerText = wordPicked;
}

function checkWord(e) {
  if (e.target.value === wordPicked) {
    score++;
    updateScoreinDOM();
    e.target.value = '';
    addToTimeCounter();
    loadWord();
  }
}

function difficultyChanged() {
  difficulty = difficultySelect.value;
  endGame();
  clearInterval(countDownInterval);
}

settingBtn.addEventListener('click', () => {
  difficultyBar.classList.toggle('visible');
});

function startGame() {
  endContainer.classList.remove('visible');
  score = 0;
  timeLeft = startingTime;
  difficulty = difficultySelect.value;
  wordInput.disabled = false;
  updateScoreinDOM();
  loadWord();
  wordInput.addEventListener('input', checkWord);
  countDown();
}

function loadEndContainerToDOM(score) {
  endContainer.innerHTML = ` <h3>Time ran out</h3> You have scored a score of ${score} points in ${difficulty} difficulty. Nice Job!
    <button onClick='startGame()'> Play Again </button>`;
  endContainer.classList.add('visible');
}

loadEndContainerToDOM(0);
difficultySelect.addEventListener('change', difficultyChanged);
