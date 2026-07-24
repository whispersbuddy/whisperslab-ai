const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

/* Toolkit marquee — wrap icons in a clipping viewport + duplicated, looping track */
document.querySelectorAll('.toolkit-icons').forEach(viewport => {
  if (viewport.dataset.marqueeReady) return;
  viewport.dataset.marqueeReady = 'true';

  const icons = [...viewport.children];
  const track = document.createElement('div');
  track.className = 'marquee-track';
  icons.forEach(icon => track.appendChild(icon));
  icons.forEach(icon => track.appendChild(icon.cloneNode(true)));

  viewport.classList.add('marquee-viewport');
  viewport.appendChild(track);
});
