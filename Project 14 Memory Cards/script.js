const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

let currentActiveCard = 0;

const cardsEl = [];

const cardsData = getCardsData();
// const cardsData = [
//   {
//     question: 'whats your name',
//     answer: 'Mark',
//   },
//   {
//     question: 'whats your age',
//     answer: '30',
//   },
//   {
//     question: 'whats your wifes name',
//     answer: 'Mishael',
//   },
// ];

//Create all cards
function createCards() {
  cardsData.forEach((card, index) => createCard(card, index));
}

//create singe cardi n DOM
function createCard(card, index) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  if (index === 0) {
    cardEl.classList.add('active');
  }
  cardEl.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
      <p>${card.question}</p>
  </div>
  <div class="inner-card-back">
      <p>${card.answer}</p>
  </div>
    </div>`;
  cardEl.addEventListener('click', () =>
    cardEl.classList.toggle('show-answer')
  );
  cardsEl.push(cardEl);

  cardsContainer.appendChild(cardEl);

  updateCurrentText();
}

function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

function getCardsData() {
  return JSON.parse(localStorage.getItem('cards')) === null
    ? []
    : JSON.parse(localStorage.getItem('cards'));
}

function saveCardsData() {
  localStorage.setItem('cards', JSON.stringify(cardsData));
  window.location.reload();
}

function nextClick() {
  cardsEl[currentActiveCard].className = 'card left';
  currentActiveCard++;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
}

function prevClick() {
  cardsEl[currentActiveCard].className = 'card right';
  currentActiveCard--;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
}

function addNewCard() {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (answer.trim() !== '' && question.trim() !== '') {
    const newCard = { question, answer };
    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');
    cardsData.push(newCard);
    saveCardsData();
  }
}

function clearHistory() {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
}

nextBtn.addEventListener('click', nextClick);
prevBtn.addEventListener('click', prevClick);
showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));
addCardBtn.addEventListener('click', addNewCard);
createCards();
clearBtn.addEventListener('click', clearHistory);
