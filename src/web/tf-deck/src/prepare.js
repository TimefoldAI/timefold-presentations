// Turns the authored <section> markup into a flat list of slides,
// and decorates them (eyebrows, statement detection, image layers, code highlighting).
// Used by both the live 3D deck and the print (PDF) mode.
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import kotlin from 'highlight.js/lib/languages/kotlin';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import properties from 'highlight.js/lib/languages/properties';
import plaintext from 'highlight.js/lib/languages/plaintext';
import { SCENES } from './scenes/index.js';

hljs.registerLanguage('java', java);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('properties', properties);
hljs.registerLanguage('plaintext', plaintext);

const HEADINGS = ['H1', 'H2', 'H3', 'H4'];

/**
 * Top-level sections are slides; a top-level section that contains sections is a chapter
 * (like reveal.js vertical stacks). Returns [{el, col, row, chapter}].
 */
export function collectSlides(root) {
  const slides = [];
  const topLevel = [...root.children].filter((el) => el.tagName === 'SECTION');
  topLevel.forEach((section, col) => {
    const children = [...section.children].filter((el) => el.tagName === 'SECTION');
    if (children.length === 0) {
      slides.push({ el: section, col, row: 0, chapter: section.dataset.chapter || null });
      return;
    }
    const chapter = section.dataset.chapter || headingText(children[0]);
    children.forEach((el, row) => slides.push({ el, col, row, chapter }));
  });
  return slides;
}

function headingText(el) {
  const heading = el.querySelector('h1, h2, h3');
  return heading ? heading.textContent.replace(/\s+/g, ' ').trim() : null;
}

export function decorate(slide) {
  const el = slide.el;
  el.classList.add('tf-slide');
  // Keep the reveal.js attribute working, so old decks port with less effort.
  if (el.dataset.backgroundColor) el.classList.add('divider');

  const content = [...el.children].filter((c) => !c.matches('aside.notes, style'));
  if (content.length === 1 && HEADINGS.includes(content[0].tagName)) {
    el.classList.add('statement');
  }

  // A 3D scene: its steps are driven like fragments; the slide's own content is the print/overview fallback.
  const scene = SCENES[el.dataset.scene];
  if (scene) {
    el.classList.add('scene');
    for (let i = 0; i < scene.steps; i++) {
      const step = document.createElement('span');
      step.className = 'fragment tf-step';
      el.appendChild(step);
    }
  }

  if (slide.chapter && !el.classList.contains('divider') && !el.classList.contains('title') && !scene) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'tf-eyebrow';
    eyebrow.textContent = slide.chapter;
    el.prepend(eyebrow);
  }

  if (el.classList.contains('layers')) {
    const stack = document.createElement('div');
    stack.className = 'tf-layers';
    el.querySelectorAll(':scope > img').forEach((img) => stack.appendChild(img));
    el.appendChild(stack);
  }

  el.querySelectorAll('pre code').forEach((code) => {
    code.textContent = dedent(code.textContent);
    code.removeAttribute('style');
    hljs.highlightElement(code);
  });

  slide.fragments = [...el.querySelectorAll('.fragment')];
}

function dedent(text) {
  const lines = text.replace(/\t/g, '    ').split('\n');
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(indent).trimEnd()).join('\n');
}

/** Shrinks code blocks until the slide no longer overflows. Needs the slide to be laid out. */
export function fitCode(el) {
  const pres = [...el.querySelectorAll('pre')];
  if (!pres.length) return;
  const overflows = () =>
    el.scrollHeight > el.clientHeight + 1 || pres.some((pre) => pre.scrollWidth > pre.clientWidth + 1);
  for (let size = 34; size >= 12; size--) {
    pres.forEach((pre) => (pre.style.fontSize = `${size}px`));
    if (!overflows()) return;
  }
}
