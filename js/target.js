const TARGET_SIZES = {
  facile: 80,
  moyenne: 60,
  difficile: 40
};

function placeTarget() {
  const arena = document.getElementById('arena');
  const target = document.getElementById('target');

  const size = TARGET_SIZES[gameState.difficulty] || TARGET_SIZES.moyenne;
  target.style.width = size + 'px';
  target.style.height = size + 'px';

  const arenaWidth = arena.clientWidth;
  const arenaHeight = arena.clientHeight;

  const maxX = arenaWidth - size;
  const maxY = arenaHeight - size;

  const x = Math.floor(Math.random() * (maxX + 1));
  const y = Math.floor(Math.random() * (maxY + 1));

  target.style.left = x + 'px';
  target.style.top = y + 'px';
}