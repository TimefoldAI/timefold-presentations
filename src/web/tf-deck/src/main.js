// Entry point. Finds the <div class="tf-deck"> and turns it into a 3D deck,
// or into a flat, printable page stack when the URL contains ?print-pdf.
import { collectSlides, decorate, fitCode } from './prepare.js';
import { Deck } from './deck.js';

async function boot() {
  const root = document.querySelector('.tf-deck');
  if (!root) return;
  const print = /print-pdf/i.test(location.search);
  document.documentElement.classList.add(print ? 'tf-print' : 'tf-live');

  const slides = collectSlides(root);
  slides.forEach(decorate);

  // Code is sized to fit once the fonts are in, while the slides are still laid out flat.
  await Promise.all([
    document.fonts.load('400 32px "JetBrains Mono"'),
    document.fonts.load('600 32px "Inter Tight"'),
  ]).catch(() => {});
  slides.forEach((slide) => fitCode(slide.el));

  if (print) {
    // One page per slide, every fragment visible.
    slides.forEach((slide) => {
      slide.fragments.forEach((el) => el.classList.add('visible'));
      root.appendChild(slide.el);
    });
    root.querySelectorAll(':scope > section:not(.tf-slide)').forEach((chapter) => chapter.remove());
    return;
  }

  window.tfDeck = new Deck(root, slides);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
