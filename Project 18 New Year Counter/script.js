const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const loading = document.getElementById('loading');
const year = document.getElementById('year');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
year.innerText = currentYear + 1;

function updateCountDown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const totalNoOfSeconds = diff / 1000;
  const totalMinutes = totalNoOfSeconds / 60;
  const totalHours = totalMinutes / 60;
  const totalDays = totalHours / 24;

  days.innerText = Math.floor(totalDays);
  hours.innerText =
    Math.floor(totalHours % 24) < 10
      ? '0' + Math.floor(totalHours % 24)
      : Math.floor(totalHours % 24);
  minutes.innerText =
    Math.floor(totalMinutes % 60) < 10
      ? '0' + Math.floor(totalMinutes % 60)
      : Math.floor(totalMinutes % 60);
  seconds.innerText =
    Math.floor(totalNoOfSeconds % 60) < 10
      ? '0' + Math.floor(totalNoOfSeconds % 60)
      : Math.floor(totalNoOfSeconds % 60);
}

setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

setInterval(updateCountDown, 1000);
