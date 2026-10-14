const dialog = document.querySelector('#image-dialog');
let previousFocus;
if (dialog) {
  document.querySelectorAll('[data-lightbox]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault(); previousFocus = link;
    const image = dialog.querySelector('img');
    image.src = link.href; image.alt = link.dataset.label;
    dialog.querySelector('figcaption').textContent = link.dataset.label;
    dialog.showModal();
  }));
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => previousFocus?.focus());
}
const menu = document.querySelector('[data-menu]');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  document.querySelector('#navigation').classList.toggle('is-open', expanded);
});
