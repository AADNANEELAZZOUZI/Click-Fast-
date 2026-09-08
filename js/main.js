
const views = ['home', 'config', 'game', 'results', 'history'];

function showView(name) {
  views.forEach(v => {
    document.getElementById(`view-${v}`).classList.toggle('active', v === name);
  });
}

document.querySelectorAll('[data-nav]').forEach(el => {
  el.addEventListener('click', () => showView(el.dataset.nav));
});

document.querySelectorAll('.pill-group').forEach(group => {
  group.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
});

document.getElementById('config-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const config = {
    pseudo: document.getElementById('pseudo').value.trim(),
    mode: document.querySelector('#mode-group .pill.active').dataset.value,
    duration: Number(document.querySelector('#duration-group .pill.active').dataset.value),
    difficulty: document.querySelector('#difficulty-group .pill.active').dataset.value
  };

  showView('game');
  startGame(config);
});