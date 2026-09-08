
let timerInterval = null;
let endTimestamp = null;

function startTimer(durationSeconds, onTimeUp) {
  endTimestamp = Date.now() + durationSeconds * 1000;
  updateTimerDisplay(durationSeconds);

  timerInterval = setInterval(() => {
    const remaining = Math.max(0, (endTimestamp - Date.now()) / 1000);
    updateTimerDisplay(remaining);

    if (remaining <= 0) {
      stopTimer();
      onTimeUp();
    }
  }, 100);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function updateTimerDisplay(seconds) {
  document.getElementById('hud-time').textContent = seconds.toFixed(1);
}

function isTimeUp() {
  return endTimestamp !== null && Date.now() > endTimestamp;
}