const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
navigation.classList.add('is-enhanced');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const viewer = document.querySelector('.photo-viewer');
if (viewer && typeof viewer.showModal === 'function') {
  const viewerImage = viewer.querySelector('img');
  const viewerCaption = viewer.querySelector('figcaption');
  document.querySelectorAll('.photo-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      viewerImage.src = link.href;
      viewerImage.alt = link.dataset.caption;
      viewerCaption.textContent = link.dataset.caption;
      viewer.showModal();
      document.documentElement.classList.add('viewer-open');
    });
  });
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target === viewer) {
      const bounds = viewer.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
    }
  });
  viewer.addEventListener('close', () => document.documentElement.classList.remove('viewer-open'));
}
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-waiting');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('is-waiting');
    observer.observe(element);
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      document.querySelectorAll('.is-waiting').forEach(element => element.classList.remove('is-waiting'));
    }
  });
}
