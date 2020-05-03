const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTIme = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function breathAnimation() {
  container.className = 'container grow';
  text.innerText = 'Breathe In';
  setTimeout(() => {
    text.innerText = 'Hold';
    setTimeout(() => {
      container.className = 'container shrink';
      text.innerText = 'Breathe Out';
    }, holdTime);
  }, breatheTIme);
}

breathAnimation();
setInterval(breathAnimation, totalTime);
