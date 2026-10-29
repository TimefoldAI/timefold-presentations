// "The world is full of planning problems": a traveller's trip through Zaventem airport,
// as a 3D diorama. Based on the hand-drawn content/static/airport-story/zaventem*.svg.
// Every step (fragment) moves the story on and points out one more scheduling problem.
import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const INK = 0x12131c;
const PURPLE = 0x5307f9;
const LIGHT_PURPLE = 0x9677ff;
const LAVENDER = 0xe4dcff;
const FLOOR = 0xf7f6fc;
const WALL = 0xeeeaf9;
const CONCRETE = 0xe2e1ea;
const ORANGE = 0xff7a1a;
const TEAL = 0x18c6b7;
const YELLOW = 0xf4be18;
const RED = 0xe5484d;
const NAVY = 0x1f2a6b;

const UPPER = 300; // floor height of the departures hall
const WALK_SPEED = 430;

// The traveller's route, and where they stop at every step.
const ROUTE = [
  [600, 0, 80], // 0: platform
  [1380, 0, 60], // 1: escalator up
  [1770, UPPER, 60],
  [2150, UPPER, 60], // 3: departures board
  [2830, UPPER, 60], // 4: check-in desk
  [3430, UPPER, 60], // 5: escalator down
  [3790, 0, 60],
  [4220, 0, 60], // 7: security
  [4420, 0, 60],
  [5150, 0, 60], // 9: gate, looking at the apron
  [5330, 0, 60], // 10: boarding desk
  [5730, 0, 40],
  [5730, 0, -240], // 12: jet bridge door
].map(([x, y, z]) => new THREE.Vector3(x, y, z));
const STOP_AT_STEP = [0, 0, 3, 4, 4, 7, 9, 9, 9, 10, 12];

// Labels: [text, step at which it is shown, anchor point, stem length, stem length in the finale].
// In the finale all labels show at once; their stems are staggered so they don't overlap.
const LABELS = [
  ['Train scheduling', 1, [650, 240, -150], 120, 60],
  ['Flight scheduling', 2, [2250, UPPER + 470, -250], 60, 60],
  ['Desk scheduling', 3, [3060, UPPER + 110, -10], 140, 60],
  ['Shift scheduling', 4, [2980, UPPER + 205, -150], 120, 230],
  ['Shift scheduling', 5, [3980, 205, -160], 140, 60],
  ['Maintenance scheduling', 6, [4800, 140, -470], 300, 230],
  ['Aircraft scheduling', 7, [6300, 265, -870], 220, 400],
  ['Gate scheduling', 8, [5730, 240, -400], 200, 230],
  ['Shift scheduling', 9, [5480, 205, -150], 140, 60],
];

export const STEPS = 10;

const easeOutBack = (t) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (t) => Math.min(Math.max(t, 0), 1);

/******************************************************************************
* Building blocks
******************************************************************************/

const materials = new Map();
function mat(color, options) {
  const key = `${color}-${JSON.stringify(options || {})}`;
  if (!materials.has(key)) {
    materials.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, ...options }));
  }
  return materials.get(key);
}

const EDGES = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.45 });

function mesh(geometry, color, { edges = false, shadow = true, options } = {}) {
  const m = new THREE.Mesh(geometry, mat(color, options));
  m.castShadow = shadow;
  m.receiveShadow = true;
  // Thin ink outlines, a nod to the hand-drawn original.
  if (edges) m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 25), EDGES));
  return m;
}

/** A box standing on y (its bottom), centered on x and z. */
function block(w, h, d, color, x, y, z, options = {}) {
  const m = mesh(new THREE.BoxGeometry(w, h, d), color, { edges: true, ...options });
  m.position.set(x, y + h / 2, z);
  return m;
}

/** A group whose origin is on the floor, so it can grow out of the ground. */
function part(x, y, z, ...children) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  children.forEach((c) => g.add(c));
  return g;
}

/** A flat panel with text drawn on a canvas, e.g. signs and the departures board. */
function textPanel(width, height, draw) {
  const scale = 3;
  const canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);
  draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ map: texture }));
  panel.add(new THREE.LineSegments(new THREE.EdgesGeometry(panel.geometry), EDGES));
  return panel;
}

function sign(text, width, { background = '#ffffff', color = '#12131c', size = 34 } = {}) {
  return textPanel(width, 70, (ctx, w, h) => {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = color;
    ctx.font = `600 ${size}px "Inter Tight", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, w / 2, h / 2 + 2);
  });
}

function departuresBoard() {
  const rows = [['BALENCIA', '2'], ['ROAM', '2'], ['SPARIS', '2'], ['OSAKE', '2'], ['NEW YOLK', '2']];
  return textPanel(420, 260, (ctx, w, h) => {
    ctx.fillStyle = '#12131c';
    ctx.fillRect(0, 0, w, h);
    ctx.font = '600 18px "Inter Tight", sans-serif';
    ctx.fillStyle = '#9677ff';
    ctx.fillText('DEPARTURES', 28, 40);
    ctx.fillText('GATE', w - 80, 40);
    rows.forEach(([city, gate], i) => {
      const y = 82 + i * 38;
      const highlight = city === 'ROAM';
      ctx.font = `${highlight ? 600 : 400} 26px "JetBrains Mono", monospace`;
      ctx.fillStyle = highlight ? '#f4be18' : '#e6e6ef';
      ctx.fillText(city, 28, y);
      ctx.fillText(gate, w - 62, y);
    });
  });
}

function person({ body = LIGHT_PURPLE, cap = null } = {}) {
  const g = new THREE.Group();
  const legs = [-1, 1].map((side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 9, 70, 0);
    const leg = mesh(new THREE.CapsuleGeometry(7, 50, 4, 8), INK);
    leg.position.y = -36;
    pivot.add(leg);
    g.add(pivot);
    return pivot;
  });
  const torso = mesh(new THREE.CapsuleGeometry(25, 46, 6, 16), body);
  torso.position.y = 110;
  const head = mesh(new THREE.SphereGeometry(25, 24, 16), 0xffffff);
  head.position.y = 170;
  [-1, 1].forEach((side) => {
    const eye = mesh(new THREE.SphereGeometry(3.5, 8, 8), INK, { shadow: false });
    eye.position.set(side * 8, 4, 23);
    head.add(eye);
  });
  g.add(torso, head);
  if (cap) {
    const crown = mesh(new THREE.CylinderGeometry(23, 25, 14, 20), cap);
    crown.position.y = 192;
    const visor = mesh(new THREE.BoxGeometry(34, 4, 18), cap);
    visor.position.set(0, 186, 24);
    g.add(crown, visor);
  }
  g.userData = { legs, head, torso, phase: Math.random() * 10 };
  return g;
}

function suitcase() {
  const g = new THREE.Group();
  const body = block(34, 50, 22, RED, 0, 6, 0);
  const handle = block(4, 34, 4, INK, 0, 56, 0, { edges: false });
  const wheel = mesh(new THREE.CylinderGeometry(5, 5, 24, 10), INK);
  wheel.rotation.x = Math.PI / 2;
  wheel.position.y = 5;
  g.add(body, handle, wheel);
  return g;
}

function train() {
  const g = new THREE.Group();
  const length = 1100;
  g.add(block(length, 210, 140, PURPLE, 0, 20, 0));
  g.add(block(length, 16, 142, 0xffffff, 0, 70, 0, { edges: false }));
  const nose = mesh(new THREE.CylinderGeometry(70, 70, 210, 20, 1, false, 0, Math.PI), PURPLE, { edges: true });
  nose.position.set(length / 2, 125, 0);
  g.add(nose);
  for (let i = 0; i < 6; i++) {
    const x = -length / 2 + 120 + i * 170;
    g.add(block(120, 70, 4, 0xcfe9f7, x, 120, 71, { edges: true }));
    if (i % 2 === 0) {
      const head = mesh(new THREE.SphereGeometry(16, 12, 10), 0xffffff, { shadow: false });
      head.position.set(x - 20 + i * 6, 152, 62);
      g.add(head);
    }
  }
  g.add(block(length - 80, 20, 100, INK, 0, 0, 0, { edges: false }));
  return g;
}

function plane(tail) {
  const g = new THREE.Group();
  const length = 520;
  const radius = 40;
  const y = 70 + radius;
  const fuselage = mesh(new THREE.CylinderGeometry(radius, radius, length, 24), 0xffffff, { edges: false });
  fuselage.rotation.x = Math.PI / 2;
  fuselage.position.y = y;
  const nose = mesh(new THREE.SphereGeometry(radius, 24, 16), 0xffffff);
  nose.scale.z = 1.8;
  nose.position.set(0, y, length / 2);
  const back = mesh(new THREE.ConeGeometry(radius, 120, 24), 0xffffff);
  back.rotation.x = -Math.PI / 2;
  back.position.set(0, y + 6, -length / 2 - 58);
  const cockpit = mesh(new THREE.BoxGeometry(44, 12, 20), INK);
  cockpit.position.set(0, y + 22, length / 2 + 40);
  const wings = mesh(new THREE.BoxGeometry(580, 10, 110), 0xf1f1f6, { edges: true });
  wings.position.set(0, y - 18, -20);
  const fin = mesh(new THREE.BoxGeometry(10, 130, 100), tail, { edges: true });
  fin.position.set(0, y + 90, -length / 2 - 20);
  const stabilizer = mesh(new THREE.BoxGeometry(220, 8, 60), 0xf1f1f6, { edges: true });
  stabilizer.position.set(0, y + 20, -length / 2 - 40);
  g.add(fuselage, nose, back, cockpit, wings, fin, stabilizer);
  [-1, 1].forEach((side) => {
    const engine = mesh(new THREE.CylinderGeometry(20, 22, 80, 16), tail);
    engine.rotation.x = Math.PI / 2;
    engine.position.set(side * 140, y - 40, 10);
    g.add(engine);
  });
  [-1, 0, 1].forEach((side) => {
    const gear = mesh(new THREE.CylinderGeometry(8, 8, 50, 8), INK);
    gear.position.set(side * 60, 25, side === 0 ? length / 2 - 40 : -40);
    g.add(gear);
  });
  return g;
}

function escalator(x0, y0, x1, y1) {
  const g = new THREE.Group();
  const dx = x1 - x0;
  const dy = y1 - y0;
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);
  const ramp = new THREE.Group();
  ramp.position.set(x0, y0, 60);
  ramp.rotation.z = angle;
  ramp.add(block(length, 16, 150, 0xdedbe9, length / 2, -16, 0));
  [-1, 1].forEach((side) => {
    ramp.add(block(length, 70, 12, LAVENDER, length / 2, 0, side * 81, { options: { transparent: true, opacity: 0.85 } }));
    ramp.add(block(length + 30, 8, 16, INK, length / 2, 70, side * 81, { edges: false }));
  });
  for (let i = 1; i < 12; i++) {
    ramp.add(block(2, 2, 140, INK, (length * i) / 12, 0, 0, { edges: false, shadow: false }));
  }
  g.add(ramp);
  return g;
}

/******************************************************************************
* The scene
******************************************************************************/

export class AirportScene {
  constructor(stage, origin) {
    this.stage = stage;
    this.origin = origin.clone().add(new THREE.Vector3(-700, -300, 1350));
    this.group = new THREE.Group();
    this.group.position.copy(this.origin);
    this.cssGroup = new THREE.Group();
    this.cssGroup.position.copy(this.origin);
    this.group.visible = this.cssGroup.visible = false;
    stage.scene.add(this.group);
    stage.cssScene.add(this.cssGroup);

    this.parts = [];
    this.step = 0;
    this.stepTime = 0;
    this.activeTime = 0;
    this.active = false;

    this.routeLengths = [0];
    for (let i = 1; i < ROUTE.length; i++) {
      this.routeLengths.push(this.routeLengths[i - 1] + ROUTE[i].distanceTo(ROUTE[i - 1]));
    }
    this.distance = 0;
    this.follow = () => this.cameraPose();

    this.build();
    stage.updaters.push((time, dt) => this.update(time, dt));
  }

  add(object, delay = null) {
    object.userData.delay = delay ?? 0.15 + (object.position.x / 6600) * 1.1;
    this.parts.push(object);
    this.group.add(object);
    return object;
  }

  build() {
    const light = new THREE.DirectionalLight(0xffffff, 1.6);
    light.position.set(2400, 2600, 1800);
    light.target.position.set(3300, 0, -300);
    light.castShadow = true;
    light.shadow.mapSize.set(4096, 4096);
    Object.assign(light.shadow.camera, { left: -4200, right: 4200, top: 2600, bottom: -2600, near: 100, far: 8000 });
    light.shadow.bias = -0.0005;
    light.shadow.radius = 3;
    this.group.add(light, light.target);

    // Ground floor, the raised departures hall and the back wall.
    this.add(part(0, 0, 0, block(6800, 30, 640, FLOOR, 3350, -30, -10)), 0);
    this.add(part(0, 0, 0, block(1750, UPPER, 560, WALL, 2600, 0, 20)), 0.3);
    this.add(part(0, 0, 0, block(1750, 12, 560, FLOOR, 2600, UPPER - 12, 20, { edges: false })), 0.35);
    this.add(part(0, 0, 0, block(4700, 900, 30, 0xffffff, 2350, 0, -275)), 0.1);
    // Gate: a window onto the apron.
    this.add(part(0, 0, 0,
      block(2100, 70, 30, 0xffffff, 5750, 0, -275),
      block(2100, 160, 30, 0xffffff, 5750, 740, -275),
      block(2100, 670, 6, 0xcfe9f7, 5750, 70, -275, { options: { transparent: true, opacity: 0.18 }, shadow: false }),
      ...[4720, 5420, 6100, 6780].map((x) => block(24, 670, 34, 0xffffff, x, 70, -275)),
    ), 0.7);
    this.add(part(0, 0, 0, block(2400, 20, 1300, CONCRETE, 5800, -20, -940)), 0.6);
    [5000, 5650, 6300].forEach((x) => {
      this.add(part(0, 0, 0, block(8, 2, 900, YELLOW, x, 0, -760, { edges: false, shadow: false })), 0.7);
    });

    // Station.
    this.add(part(0, 0, 0, block(1500, 20, 150, 0xd7d4e3, 700, -20, -150)), 0.1);
    this.trainPart = this.add(part(0, 0, -150, train()), 0.2);
    const station = sign('ZAVENTEM', 320);
    station.position.set(650, 500, -258);
    this.add(part(0, 0, 0, station), 0.2);

    this.add(escalator(1380, 0, 1770, UPPER), 0.3);
    this.add(escalator(3430, UPPER, 3790, 0), 0.6);

    // Departures hall.
    const board = departuresBoard();
    board.position.set(2250, UPPER + 340, -258);
    this.add(part(0, 0, 0, board), 0.45);
    this.add(part(2980, UPPER, -40, block(240, 110, 80, 0xffffff, 0, 0, 0), block(244, 10, 84, PURPLE, 0, 110, 0)));
    this.add(part(2980, UPPER, -150, person({ body: PURPLE })));
    const rianna = sign('RIANNA AIR', 280, { background: '#5307f9', color: '#ffffff' });
    rianna.position.set(2980, UPPER + 380, -200);
    this.add(part(0, 0, 0, rianna, block(6, 345, 6, INK, 2860, UPPER, -205, { edges: false }),
      block(6, 345, 6, INK, 3100, UPPER, -205, { edges: false })), 0.55);
    this.add(part(3240, UPPER, -170, block(380, 40, 70, 0xb8b4c8, 0, 0, 0), block(380, 4, 60, INK, 0, 40, 0, { edges: false })));
    this.add(part(3440, UPPER, -170, block(60, 160, 100, INK, 0, 0, 0)));
    [[2480, -120, TEAL], [2560, -60, ORANGE], [2680, -150, YELLOW]].forEach(([x, z, color]) => {
      this.add(part(x, UPPER, z, person({ body: color })));
    });

    // Security.
    this.add(part(4130, 0, -120, block(280, 80, 90, 0xb8b4c8, 0, 0, 0), block(130, 130, 110, 0xffffff, 0, 80, 0)));
    this.add(part(4350, 0, 60, block(16, 230, 30, INK, -70, 0, 0), block(16, 230, 30, INK, 70, 0, 0),
      block(156, 18, 30, PURPLE, 0, 230, 0)));
    this.add(part(3980, 0, -160, person({ body: NAVY, cap: NAVY })));
    this.add(part(4500, 0, -40, person({ body: NAVY, cap: NAVY })));

    // Gate.
    const gate = sign('GATE 2', 220, { background: '#12131c', color: '#f4be18', size: 38 });
    gate.position.set(5650, 640, -255);
    this.add(part(0, 0, 0, gate), 0.75);
    for (let i = 0; i < 4; i++) {
      this.add(part(4880 + i * 70, 0, -150, block(56, 45, 56, LAVENDER, 0, 0, 0), block(56, 50, 10, LAVENDER, 0, 45, -23)));
    }
    this.add(part(4950, 0, -150, person({ body: ORANGE })));
    this.add(part(5480, 0, -60, block(200, 105, 70, 0xffffff, 0, 0, 0), block(204, 10, 74, PURPLE, 0, 105, 0)));
    this.add(part(5430, 0, -150, person({ body: PURPLE })));
    this.add(part(5530, 0, -150, person({ body: PURPLE })));
    const boarding = sign('ROAM · Boarding', 260, { size: 30 });
    boarding.position.set(5480, 380, -200);
    this.add(part(0, 0, 0, boarding, block(6, 345, 6, INK, 5370, 0, -205, { edges: false }),
      block(6, 345, 6, INK, 5590, 0, -205, { edges: false })), 0.8);
    this.add(part(0, 0, 0, block(140, 250, 40, LAVENDER, 5730, 0, -250), block(90, 200, 6, INK, 5730, 0, -228, { edges: false })), 0.8);
    this.add(part(5730, 0, -400, block(80, 90, 250, 0xdedbe9, 0, 150, 0), block(30, 150, 30, 0xb8b4c8, 0, 0, 40)));

    // Apron: aircraft, and a maintenance van.
    this.planes = [
      this.add(part(5000, 0, -590, plane(TEAL)), 0.9),
      this.add(part(5650, 0, -590, plane(PURPLE)), 1.0),
      this.add(part(6300, 0, -590, plane(ORANGE)), 1.1),
    ];
    this.gatePlane = this.planes[1];
    this.add(part(4800, 0, -470, block(170, 110, 90, 0xffffff, 0, 14, 0), block(172, 18, 92, ORANGE, 0, 60, 0),
      block(56, 80, 90, 0xcfe9f7, 100, 14, 0), block(60, 60, 60, YELLOW, -40, 124, 0)), 1.0);

    // The traveller and their suitcase.
    this.traveller = person({ body: PURPLE });
    this.suitcase = suitcase();
    this.travellerPart = this.add(part(0, 0, 0, this.traveller, this.suitcase), 0.6);
    this.suitcase.position.set(-38, 0, -6);
    this.suitcase.rotation.z = -0.35;

    this.headline = document.createElement('div');
    this.headline.className = 'tf-scene-headline';
    this.headline.innerHTML = 'Every step is a <span class="highlight">scheduling problem</span>';
    const headline = new CSS3DObject(this.headline);
    headline.position.set(3400, 1900, -300);
    headline.scale.setScalar(3.2);
    this.cssGroup.add(headline);

    this.labels = LABELS.map(([text, from, [x, y, z], stem, finaleStem]) => this.label(text, from, x, y, z, stem, finaleStem));
  }

  label(text, from, x, y, z, stem, finaleStem) {
    const el = document.createElement('div');
    el.className = 'tf-scene-label';
    el.innerHTML = `<div class="inner"><span class="pill"></span><span class="stem" style="height:${stem}px"></span><span class="tip"></span></div>`;
    el.querySelector('.pill').textContent = text;
    const object = new CSS3DObject(el);
    object.userData = { from, stem, finaleStem, anchor: new THREE.Vector3(x, y, z), height: 60 + stem + 16 };
    this.cssGroup.add(object);
    return object;
  }

  /** Called when the slide is shown (true) or left (false). */
  setActive(active) {
    if (active && !this.active) this.activeTime = this.stage.clock.getElapsedTime();
    this.active = active;
    this.group.visible = this.cssGroup.visible = active;
    if (active) this.stage.follow = this.follow;
    else if (this.stage.follow === this.follow) this.stage.follow = null;
  }

  setStep(step, { instant = false } = {}) {
    this.step = step;
    this.stepTime = this.stage.clock.getElapsedTime();
    if (instant) this.distance = this.routeLengths[STOP_AT_STEP[step]];
    const finale = step >= STEPS;
    this.headline.classList.toggle('visible', finale);
    this.labels.forEach((label) => {
      const { from, stem, finaleStem } = label.userData;
      label.element.classList.toggle('visible', finale || step === from);
      const height = finale ? finaleStem : stem;
      label.element.querySelector('.stem').style.height = `${height}px`;
      label.userData.height = 60 + height + 16;
    });
  }

  /** Where the camera wants to be, given the step and where the traveller is. */
  cameraPose() {
    const t = this.travellerPart.position;
    let cam;
    let target;
    let damping = 2.2;
    if (this.step >= STEPS) {
      // Finale: the whole terminal, slowly dollying in, with the headline above it.
      const drift = easeInOut(clamp01((this.stage.clock.getElapsedTime() - this.stepTime) / 14));
      cam = new THREE.Vector3(3400 + drift * 150, 2000, 7000 - drift * 450);
      target = new THREE.Vector3(3400, 950, -400);
      damping = 1.3;
    } else if (this.step >= 6 && this.step <= 8) {
      const focusX = [4950, 6050, 5650][this.step - 6];
      cam = new THREE.Vector3(focusX - 100, 620, 1600);
      target = new THREE.Vector3(focusX, 170, -500);
    } else {
      const ahead = this.step <= 1 ? 250 : 150;
      cam = new THREE.Vector3(t.x + ahead, t.y + 380, 1500);
      target = new THREE.Vector3(t.x + ahead, t.y + 200, -150);
    }
    cam.add(this.origin);
    target.add(this.origin);
    return { x: cam.x, y: cam.y, z: cam.z, tx: target.x, ty: target.y, tz: target.z, pixels: 0, divider: 0, damping };
  }

  routePoint(distance) {
    let i = 1;
    while (i < ROUTE.length - 1 && this.routeLengths[i] < distance) i++;
    const a = ROUTE[i - 1];
    const b = ROUTE[i];
    const t = clamp01((distance - this.routeLengths[i - 1]) / (this.routeLengths[i] - this.routeLengths[i - 1]));
    return a.clone().lerp(b, t);
  }

  update(time, dt) {
    if (!this.active) return;
    const age = time - this.activeTime;

    // Everything grows out of the floor when the slide appears.
    for (const p of this.parts) {
      const k = Math.max(easeOutBack(clamp01((age - p.userData.delay) / 0.7)), 0.0001);
      p.scale.set(1, k, 1);
    }

    // The traveller walks to the stop of the current step.
    const goal = this.routeLengths[STOP_AT_STEP[this.step]];
    const delta = goal - this.distance;
    const walking = Math.abs(delta) > 1;
    this.distance += Math.sign(delta) * Math.min(Math.abs(delta), WALK_SPEED * dt);
    this.travellerPart.position.copy(this.routePoint(this.distance));
    const boarded = this.step >= STEPS ? clamp01((time - this.stepTime - 1.4) / 0.5) : 0;
    this.traveller.scale.setScalar(1 - boarded + 0.0001);
    this.animatePerson(this.traveller, time, walking);
    this.parts.forEach((p) => p.children.forEach((c) => c.userData.legs && c !== this.traveller && this.animatePerson(c, time, false)));

    // The suitcase rolls along until check-in, then rides the belt.
    const checkedIn = this.step >= 4;
    if (checkedIn) {
      const k = clamp01((time - this.stepTime) / 2.2);
      const beltTime = this.step === 4 ? k : 1;
      this.suitcase.visible = beltTime < 1;
      this.suitcase.rotation.z = 0;
      this.suitcase.position.set(3040 + beltTime * 400, UPPER + 40, -170).sub(this.travellerPart.position);
    } else {
      this.suitcase.visible = true;
      this.suitcase.rotation.z = -0.35;
      this.suitcase.position.set(-38, 0, -6);
    }

    // The train pulls in, and leaves once the traveller is upstairs.
    const arrive = easeInOut(clamp01((age - 0.2) / 2.4));
    const leave = this.step >= 2 ? easeInOut(clamp01((time - this.stepTime) / 3)) : 0;
    this.trainPart.position.x = -1500 + arrive * 2200 - leave * 3200;

    // Final step: the flight to Roam pushes back and takes off.
    const flight = this.step >= STEPS ? time - this.stepTime - 2.2 : -1;
    const p = this.gatePlane;
    p.visible = true;
    if (flight <= 0) {
      p.position.set(5650, 0, -590);
      p.rotation.set(0, 0, 0);
    } else {
      const push = easeInOut(clamp01(flight / 2.2));
      const turn = easeInOut(clamp01((flight - 2.2) / 1.6));
      const roll = clamp01((flight - 3.8) / 5);
      p.position.set(5650 + turn * 120 + 4200 * roll * roll, 520 * Math.max(roll - 0.45, 0) ** 1.5 * 3, -590 - push * 450);
      p.rotation.set(0, turn * Math.PI * 0.5, 0);
      p.rotateX(-0.16 * clamp01((roll - 0.45) * 4));
      p.visible = roll < 1;
    }

    // Labels: pinned to their anchor, and growing when seen from afar so they stay readable.
    const camera = this.stage.camera;
    for (const label of this.labels) {
      const world = label.userData.anchor.clone().add(this.origin);
      const scale = THREE.MathUtils.clamp(camera.position.distanceTo(world) / 1600, 1, 2.4);
      label.scale.setScalar(scale);
      label.position.copy(label.userData.anchor);
      label.position.y += (label.userData.height / 2) * scale;
    }
  }

  animatePerson(figure, time, walking) {
    const { legs, torso, head, phase } = figure.userData;
    const swing = walking ? Math.sin(time * 11) * 0.55 : 0;
    legs[0].rotation.z = swing;
    legs[1].rotation.z = -swing;
    const bob = walking ? Math.abs(Math.sin(time * 11)) * 6 : Math.sin(time * 1.6 + phase) * 1.5;
    torso.position.y = 110 + bob;
    head.position.y = 170 + bob;
  }
}
