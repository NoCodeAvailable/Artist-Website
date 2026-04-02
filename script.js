function show(page, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  if (btn) btn.classList.add('active');
}

const audio = document.getElementById('solo-track');
const playBtn = document.getElementById('play-btn');
const seekBar = document.getElementById('seek-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '&#9646;&#9646;';
  } else {
    audio.pause();
    playBtn.innerHTML = '&#9654;';
  }
}

function seekTo(val) {
  audio.currentTime = val;
}

audio.addEventListener('loadedmetadata', () => {
  seekBar.max = audio.duration;
  durationEl.textContent = fmt(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  seekBar.value = audio.currentTime;
  currentTimeEl.textContent = fmt(audio.currentTime);
});

audio.addEventListener('ended', () => {
  playBtn.innerHTML = '&#9654;';
  seekBar.value = 0;
  currentTimeEl.textContent = '0:00';
});
