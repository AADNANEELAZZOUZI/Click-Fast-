let gameState = {
  mode: null,          
  difficulty: null,    
  duration: null,      
  pseudo: null,
  score: 0,
  misses: 0,
  isRunning: false,    
  isLocked: false       
};

function startGame(config) {

  gameState = {
    ...config,
    score: 0,
    misses: 0,
    isRunning: true,
    isLocked: false
  };

  updateHUD();
  resetHudMode(); 

  placeTarget();
  startTimer(gameState.duration, endGame);
}

function handleTargetHit() {
  if (!gameState.isRunning || isTimeUp()) return;

  gameState.score += 1;
  updateHUD();

  placeTarget();
}

function handleArenaMiss() {
  if (!gameState.isRunning || isTimeUp()) return;


  if (gameState.mode === 'precision') {
    gameState.misses += 1;
  }

  updateHUD();
}

function computeAccuracy() {
  const total = gameState.score + gameState.misses;
  if (total === 0) return 0;
  return Math.round((gameState.score / total) * 1000) / 10;
}

function updateHUD() {
  document.getElementById('hud-score').textContent = gameState.score;
  document.getElementById('hud-misses').textContent = gameState.misses;

  const accuracyEl = document.getElementById('hud-accuracy');
  if (gameState.mode === 'precision') {
    accuracyEl.textContent = computeAccuracy() + '%';
  } else {
    accuracyEl.textContent = '—'; 
  }

}

function resetHudMode() {
  const showPrecisionStats = gameState.mode === 'precision';
}

function endGame() {
  if (gameState.isLocked) return;
  gameState.isLocked = true;
  gameState.isRunning = false;
  stopTimer();

  const accuracy = gameState.mode === 'precision' ? computeAccuracy() : null;



  document.getElementById('result-score').textContent = gameState.score;
  document.getElementById('result-mode').textContent = gameState.mode;
  document.getElementById('result-difficulty').textContent = gameState.difficulty;
  document.getElementById('result-misses').textContent =
    gameState.mode === 'precision' ? gameState.misses : 'Non mesuré';
  document.getElementById('result-accuracy').textContent =
    accuracy !== null ? accuracy + '%' : 'Non mesuré';

  showView('results');
}

document.getElementById('target').addEventListener('click', (e) => {
  e.stopPropagation(); 
  handleTargetHit();
});

document.getElementById('arena').addEventListener('click', () => {
  handleArenaMiss();
});