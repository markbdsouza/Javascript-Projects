const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
  //   'application',
  //   'programming',
  //   'functions',
  //   'interface',
  'wizard',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetter = [];

//show hidden word
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class="letter"> ${
          correctLetters.includes(letter) ? letter : ''
        } </span>`
    )
    .join('')}`;
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations!';
    popup.style.display = 'flex';
  }
}

function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
   ${wrongLetter.length > 0 ? '<p>Wrong </p> <div>' : ''}
  ${wrongLetter.map((letter) => `<span>${letter}</span>`)} </div>`;

  figureParts.forEach((part, index) => {
    const errors = wrongLetter.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }

    if (wrongLetter.length === figureParts.length) {
      finalMessage.innerText = 'You have lost';
      popup.style.display = 'flex';
    }
  });
}

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetter.includes(letter)) {
        wrongLetter.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetter.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();
  popup.style.display = 'none';
});

displayWord();
