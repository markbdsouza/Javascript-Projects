const audioEl = document.getElementById('audio');
const prev = document.getElementById('prev');
const playBtn = document.getElementById('play');
const next = document.getElementById('next');
const playIcon = document.getElementById('playIcon');
const img = document.getElementById('img');
const title = document.getElementById('title');
const progress = document.getElementById('progress');
const musicList = [
  {
    id: 1,
    audioLink: './music/hey.mp3',
    img: './images/hey.jpg',
    title: 'Hey!!!',
  },
  {
    id: 2,
    audioLink: './music/summer.mp3',
    img: './images/summer.jpg',
    title: 'Summer',
  },
  {
    id: 3,
    audioLink: './music/ukulele.mp3',
    img: './images/ukulele.jpg',
    title: 'Ukulele',
  },
];

function loadMusic(index) {
  audioEl.src = musicList[index].audioLink;
  img.src = musicList[index].img;
  audioEl.dataset.index = index;
  title.textContent = musicList[index].title;
}

function restartSong() {
  audioEl.currentTime = 0;
}

function playClicked() {
  if (audioEl.paused) {
    audioEl.play();
    playBtn.classList.remove('paused');
    title.classList.add('show');
    changeIcontoPause();
  } else {
    audioEl.pause();
    playBtn.classList.add('paused');
    title.classList.remove('show');
    changeIconToPlay();
  }
}

function changeIconToPlay() {
  img.classList.remove('rotate');
  playIcon.classList.add('fa-play');
  playIcon.classList.remove('fa-pause');
}

function changeIcontoPause() {
  img.classList.add('rotate');
  playIcon.classList.add('fa-pause');
  playIcon.classList.remove('fa-play');
}

function prevClicked() {
  const isPaused = audioEl.paused;
  const newIndex =
    +audioEl.dataset.index === 0
      ? musicList.length - 1
      : audioEl.dataset.index - 1;
  loadMusic(newIndex);
  if (!isPaused) {
    changeIcontoPause();
    audioEl.play();
  }
}

function nextClicked() {
  const isPaused = audioEl.paused;
  const newIndex =
    +audioEl.dataset.index === musicList.length - 1
      ? 0
      : +audioEl.dataset.index + 1;
  loadMusic(newIndex);
  if (!isPaused) {
    changeIcontoPause();
    audioEl.play();
  }
}

function check(e) {
  if (audioEl.currentTime > 0 && audioEl.duration > 0) {
    progress.style.width = `${(audioEl.currentTime / audioEl.duration) * 100}%`;
  }
}

loadMusic(1);
playBtn.addEventListener('click', playClicked);
prev.addEventListener('click', prevClicked);
next.addEventListener('click', nextClicked);
audioEl.addEventListener('timeupdate', check);
console.log(audioEl.paused);
