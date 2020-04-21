const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

toggle.addEventListener('click', function () {
  document.body.classList.toggle('showNav');
});

open.addEventListener('click', () => {
  modal.classList.add('showModal');
});

close.addEventListener('click', () => {
  modal.classList.remove('showModal');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('showModal');
  }
});
