/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
/* 1. Functions */

// Toggles between play and pause
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Updates the play/pause button icon
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Handles skipping (rewind/forward) based on data-skip value
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handles volume and playback rate slider changes
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Updates the progress bar width based on video time
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Allows scrubbing through the video via the progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* 2. Event Listeners */

// Play/Pause listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

// Progress bar listeners
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Slider listeners (Volume & Speed)
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

