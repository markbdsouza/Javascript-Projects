const video = document.getElementById('video');
const play = document.getElementById('play');
// const pause = document.getElementById('pause');
const stopvideoEl = document.getElementById('stop');
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timeStamp');

function toggleVideoPlaying(e) {
  console.log(video.duration);
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updatePlayIcon(e) {
  if (!video.paused) {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  }
}
function updateTimeStamp(e) {
  percntDone = video.currentTime / video.duration;
  progress.value = percntDone * 100;

  let mins = Math.floor(video.currentTime / 60);
  let seconds = Math.floor(video.currentTime % 60);
  timeStamp.textContent = `${mins}:${seconds}`;
}
function stopVideo(e) {
  video.pause();
  video.currentTime = 0;
}
function setVideoProgress(e) {
  const setTime = (progress.value / 100) * video.duration;
  video.currentTime = setTime;
  console.log(setTime);
}

video.addEventListener('click', toggleVideoPlaying);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateTimeStamp);
play.addEventListener('click', toggleVideoPlaying);
stopvideoEl.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
