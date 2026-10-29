// Navigation, fragments, overview mode and the HUD (progress bar, footer, slide counter).
import { Stage, SLIDE_W, SLIDE_H } from './stage.js';
import { SCENES } from './scenes/index.js';

const GAP_X = 480;
const GAP_Y = 420;

const LOGOMARK_SVG =
  '<svg viewBox="54 54 145 100" aria-hidden="true"><path fill="currentColor" d="M106,79 L106,54 L79,54 L79,79 L63.1,79 L54,104 L79,104 L79,154 L107.35,154 C112.605,154 117.3,150.7125 119.095,145.775 L124.56,130.76 C124.56,130.76 125.205,129 127.075,129 L166.7,129 L175.8,104 L143.0525,104 C137.7975,104 133.1025,107.2875 131.3075,112.225 L125.8425,127.2375 C125.8425,127.2375 125.2,129 123.3275,129 L106,129 L106,104 L125.55,104 C130.805,104 135.5,100.7125 137.295,95.775 L142.76,80.76 C142.76,80.76 143.405,79 145.275,79 L189.9,79 L199,54 L161.2525,54 C155.9975,54 151.3025,57.2875 149.5075,62.225 L144.0425,77.2375 C144.0425,77.2375 143.4,79 141.5275,79 L106.0025,79 L106,79 Z"/></svg>';

export class Deck {
  constructor(root, slides) {
    this.slides = slides;
    this.index = 0;
    this.fragment = 0;
    this.overview = false;

    const container = document.createElement('div');
    container.className = 'tf-stage';
    document.body.appendChild(container);
    this.stage = new Stage(container);

    for (const slide of slides) {
      slide.x = slide.col * (SLIDE_W + GAP_X);
      slide.y = -slide.row * (SLIDE_H + GAP_Y);
      slide.divider = slide.el.classList.contains('divider');
      slide.object = this.stage.addSlide(slide.el, slide.x, slide.y);
      const scene = SCENES[slide.el.dataset.scene];
      if (scene) slide.scene = scene.create(this.stage, slide.object.position);
      slide.el.addEventListener('click', () => this.overview && this.closeOverview(slides.indexOf(slide)));
      if (slide.el.classList.contains('title') || slide.el.hasAttribute('data-logo')) {
        this.stage.addLogo(slide.x + 470, slide.y - 10, { onDark: slide.divider });
      }
    }
    root.remove();

    this.createHud(root.dataset.footer);
    this.bindInput();

    const [index, fragment] = this.readHash();
    this.show(index, fragment, { instant: true });
  }

  createHud(footer) {
    this.hud = document.createElement('div');
    this.hud.className = 'tf-hud';
    this.hud.innerHTML = `
      <div class="tf-progress"><span></span></div>
      <div class="tf-footer">${LOGOMARK_SVG}<span></span></div>
      <div class="tf-counter"></div>
      <div class="tf-blackout"></div>`;
    this.hud.querySelector('.tf-footer span').textContent = footer || '';
    document.body.appendChild(this.hud);
  }

  bindInput() {
    document.addEventListener('keydown', (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.target.closest?.('input, textarea, [contenteditable]')) return;
      const actions = {
        ArrowRight: () => this.next(),
        ArrowDown: () => this.next(),
        PageDown: () => this.next(),
        ' ': () => (e.shiftKey ? this.prev() : this.next()),
        n: () => this.next(),
        ArrowLeft: () => this.prev(),
        ArrowUp: () => this.prev(),
        PageUp: () => this.prev(),
        Backspace: () => this.prev(),
        p: () => this.prev(),
        Home: () => this.show(0, 0),
        End: () => this.show(this.slides.length - 1, Infinity),
        o: () => (this.overview ? this.closeOverview() : this.openOverview()),
        Escape: () => (this.overview ? this.closeOverview() : this.openOverview()),
        f: () => this.toggleFullscreen(),
        b: () => this.hud.classList.toggle('blackout'),
        '.': () => this.hud.classList.toggle('blackout'),
      };
      const action = actions[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (!action) return;
      e.preventDefault();
      action();
    });

    let touch = null;
    window.addEventListener('touchstart', (e) => (touch = e.touches[0]), { passive: true });
    window.addEventListener('touchend', (e) => {
      if (!touch) return;
      const dx = e.changedTouches[0].clientX - touch.clientX;
      if (Math.abs(dx) > 60) (dx < 0 ? this.next() : this.prev());
      touch = null;
    });

    window.addEventListener('hashchange', () => {
      const [index, fragment] = this.readHash();
      if (index !== this.index || fragment !== this.fragment) this.show(index, fragment);
    });
  }

  next() {
    if (this.overview) return this.closeOverview();
    if (this.fragment < this.slides[this.index].fragments.length) {
      this.setFragment(this.fragment + 1);
    } else if (this.index < this.slides.length - 1) {
      this.show(this.index + 1, 0);
    }
  }

  prev() {
    if (this.overview) return this.closeOverview();
    if (this.fragment > 0) {
      this.setFragment(this.fragment - 1);
    } else if (this.index > 0) {
      this.show(this.index - 1, Infinity);
    }
  }

  setFragment(count, { instant = false } = {}) {
    this.fragment = count;
    const slide = this.slides[this.index];
    slide.fragments.forEach((el, i) => {
      el.classList.toggle('visible', i < count);
      el.classList.toggle('current-fragment', i === count - 1);
    });
    slide.scene?.setStep(count, { instant });
    this.writeHash();
  }

  show(index, fragment = 0, { instant = false } = {}) {
    index = Math.max(0, Math.min(index, this.slides.length - 1));
    const previous = this.slides[this.index];
    const slide = this.slides[index];
    this.index = index;

    // Slides before the current one show all their fragments, later ones none (like reveal.js).
    this.slides.forEach((s, i) => {
      if (i !== index) s.fragments.forEach((el) => el.classList.toggle('visible', i < index));
    });
    // Only the current slide's scene may steer the camera. Scenes we leave stay visible during the flight
    // and are hidden on arrival, but they let go of the camera right away.
    this.stage.follow = null;
    slide.scene?.setActive(true);
    this.setFragment(Math.min(fragment, slide.fragments.length), { instant: true });

    this.slides.forEach((s) => s.el.classList.remove('present', 'leaving'));
    slide.el.classList.add('present');
    if (previous !== slide && !instant) previous.el.classList.add('leaving');

    const pose = slide.scene
      ? slide.scene.cameraPose()
      : { x: slide.x, y: slide.y, z: this.stage.restDistance(), divider: slide.divider ? 1 : 0, ripple: true };
    // A newer flight replaces this one's onArrive, so clean up every other scene, not just the previous one.
    const hideOtherScenes = () => this.slides.forEach((s) => s !== this.slides[this.index] && s.scene?.setActive(false));
    const arrive = () => {
      previous.el.classList.remove('leaving');
      hideOtherScenes();
    };
    if (instant) {
      hideOtherScenes();
      this.stage.jumpTo(pose);
    } else {
      this.stage.flyTo(pose, { onArrive: arrive });
    }

    this.updateHud();
  }

  openOverview() {
    this.overview = true;
    this.slides.forEach((s) => s.scene?.setActive(false));
    document.documentElement.classList.add('tf-overview');
    const xs = this.slides.map((s) => s.x);
    const ys = this.slides.map((s) => s.y);
    const width = Math.max(...xs) - Math.min(...xs) + SLIDE_W;
    const height = Math.max(...ys) - Math.min(...ys) + SLIDE_H;
    this.stage.flyTo({
      x: (Math.max(...xs) + Math.min(...xs)) / 2,
      y: (Math.max(...ys) + Math.min(...ys)) / 2,
      z: this.stage.restDistance(width * 1.08, height * 1.12),
      divider: 0,
    });
  }

  closeOverview(index = this.index) {
    this.overview = false;
    document.documentElement.classList.remove('tf-overview');
    this.show(index, index === this.index ? this.fragment : 0);
  }

  toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.();
  }

  updateHud() {
    const slide = this.slides[this.index];
    const total = this.slides.length;
    this.hud.classList.toggle('on-dark', slide.divider);
    this.hud.querySelector('.tf-progress span').style.transform = `scaleX(${total > 1 ? this.index / (total - 1) : 1})`;
    this.hud.querySelector('.tf-counter').textContent =
      `${String(this.index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }

  readHash() {
    const match = location.hash.match(/^#\/(\d+)(?:\/(\d+))?/);
    return match ? [Number(match[1]) - 1, Number(match[2] || 0)] : [0, 0];
  }

  writeHash() {
    const hash = `#/${this.index + 1}${this.fragment ? `/${this.fragment}` : ''}`;
    if (location.hash !== hash) history.replaceState(null, '', hash);
  }
}
