const main = document.querySelector('main');
const voicesSelect = document.querySelector('#voices');
const textArea = document.querySelector('#text');
const readBtn = document.querySelector('#read');
const toggleBtn = document.querySelector('#toggle');
const closeBtn = document.querySelector('#close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

data.forEach(createBox);

function createBox(item, index) {
  const box = document.createElement('div');
  box.classList.add('box');
  const { image, text } = item;
  box.innerHTML = `<img src='${image}' alt='${text}' />
  <p class='info'>${text}</p>`;
  main.appendChild(box);
}

let voices = [];

function getVoices() {
  voices = window.speechSynthesis.getVoices();
  console.log(speechSynthesis.getVoices());
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    console.log(option);
    voicesSelect.appendChild(option);
  });
  console.log(voices);
}

speechSynthesis.addEventListener('voicesChanged', getVoices);

toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

getVoices();
console.log('object');

const a = speechSynthesis.getVoices();
console.log(a);
