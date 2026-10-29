// The Three.js stage: slides are CSS3D objects (crisp, selectable DOM) laid out in 3D space,
// rendered on top of a WebGL scene with the pixel grid and the 3D logomark.
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { PixelField } from './pixels.js';
import { createLogomark } from './logomark.js';

export const SLIDE_W = 1920;
export const SLIDE_H = 1080;
const FOV = 30;

const LIGHT_BG = new THREE.Color(0xf6f6f9);
const DIVIDER_BG = new THREE.Color(0x5307f9);

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutBack = (t) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

/**
 * A camera pose: {x, y, z} position, optional {tx, ty, tz} look-at target (defaults to straight ahead
 * onto the slide plane), divider (0..1 purple background), pixels (0..1), ripple, arc.
 */
function targetOf(pose) {
  return new THREE.Vector3(pose.tx ?? pose.x, pose.ty ?? pose.y, pose.tz ?? 0);
}

export class Stage {
  constructor(container) {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.clock = new THREE.Clock();

    this.webgl = new THREE.WebGLRenderer({ antialias: true });
    this.webgl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.webgl.shadowMap.enabled = true;
    this.webgl.shadowMap.type = THREE.PCFSoftShadowMap;
    this.webgl.domElement.className = 'tf-webgl';
    container.appendChild(this.webgl.domElement);

    this.css = new CSS3DRenderer();
    this.css.domElement.className = 'tf-css3d';
    container.appendChild(this.css.domElement);

    this.camera = new THREE.PerspectiveCamera(FOV, 1, 10, 200000);
    this.lookAt = new THREE.Vector3();
    this.scene = new THREE.Scene();
    this.cssScene = new THREE.Scene();

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xb9a8ff, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.8);
    key.position.set(-600, 900, 1400);
    this.scene.add(key);

    this.pixels = new PixelField(this.scene);
    this.background = LIGHT_BG.clone();
    this.divider = 0;
    this.pixelAmount = 1;
    this.logos = [];
    this.updaters = [];
    this.pointer = new THREE.Vector2();
    this.flight = null;
    this.follow = null;

    window.addEventListener('pointermove', (e) => {
      this.pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    });
    window.addEventListener('resize', () => this.resize());
    this.resize();
    this.webgl.setAnimationLoop(() => this.render());
  }

  /** Places a slide element in 3D space and returns its 3D object. */
  addSlide(el, x, y) {
    const object = new CSS3DObject(el);
    object.position.set(x, y, 0);
    this.cssScene.add(object);
    return object;
  }

  addLogo(x, y, { onDark = false } = {}) {
    const logo = createLogomark({ onDark });
    logo.position.set(x, y, 60);
    logo.userData.base = logo.position.clone();
    logo.userData.born = this.clock.getElapsedTime();
    logo.scale.setScalar(0.0001);
    this.scene.add(logo);
    this.logos.push(logo);
    return logo;
  }

  /** Camera distance at which a slide exactly fills the viewport. */
  restDistance(width = SLIDE_W, height = SLIDE_H) {
    const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    return Math.max(height / 2 / tan, width / 2 / (tan * this.camera.aspect));
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.webgl.setSize(w, h);
    this.css.setSize(w, h);
    this.pixels.resize(this.camera, this.restDistance() * 1.7);
    if (this.target && !this.follow) this.jumpTo(this.target);
  }

  /**
   * Flies the camera to a pose. The camera arcs up and back down,
   * so slides further away get a proportionally bigger zoom-out ("van Wijk" style).
   */
  flyTo(pose, { onArrive } = {}) {
    this.target = pose;
    if (this.reducedMotion) {
      this.jumpTo(pose);
      onArrive?.();
      return;
    }
    const from = this.camera.position.clone();
    const distance = Math.hypot(pose.x - from.x, pose.y - from.y);
    const duration = THREE.MathUtils.clamp(0.75 + Math.log10(1 + distance / 1500) * 0.55, 0.75, 1.6);
    this.flight = {
      from,
      fromTarget: this.lookAt.clone(),
      fromDivider: this.divider,
      fromPixels: this.pixelAmount,
      to: pose,
      toTarget: targetOf(pose),
      start: this.clock.getElapsedTime(),
      duration,
      arc: pose.arc ?? Math.min(distance * 0.42, 9000),
      dir: new THREE.Vector2(pose.x - from.x, pose.y - from.y).normalize(),
      onArrive,
    };
    if (pose.ripple) {
      this.pixels.ripple(pose.x, pose.y, this.flight.start + duration * 0.55);
    }
  }

  jumpTo(pose) {
    this.target = pose;
    this.flight = null;
    this.camera.position.set(pose.x, pose.y, pose.z);
    this.lookAt.copy(targetOf(pose));
    this.camera.lookAt(this.lookAt);
    this.divider = pose.divider ?? 0;
    this.pixelAmount = pose.pixels ?? 1;
  }

  render() {
    const dt = Math.min(this.clock.getDelta(), 0.1);
    const time = this.clock.getElapsedTime();
    const f = this.flight;
    if (f) {
      const t = Math.min((time - f.start) / f.duration, 1);
      const e = easeInOutCubic(t);
      const lift = Math.sin(Math.PI * e);
      this.camera.position.lerpVectors(f.from, new THREE.Vector3(f.to.x, f.to.y, f.to.z), e);
      this.camera.position.z += f.arc * lift;
      // Lean slightly into the direction of travel.
      this.lookAt.lerpVectors(f.fromTarget, f.toTarget, e);
      const lean = 0.09 * lift * (this.camera.position.z - this.lookAt.z);
      this.camera.lookAt(this.lookAt.x + f.dir.x * lean, this.lookAt.y + f.dir.y * lean, this.lookAt.z);
      const blend = THREE.MathUtils.smoothstep(t, 0.25, 0.75);
      this.divider = THREE.MathUtils.lerp(f.fromDivider, f.to.divider ?? 0, blend);
      this.pixelAmount = THREE.MathUtils.lerp(f.fromPixels, f.to.pixels ?? 1, blend);
      if (t >= 1) {
        this.flight = null;
        this.camera.lookAt(this.lookAt);
        f.onArrive?.();
      }
    } else if (this.follow) {
      // A 3D scene drives the camera: glide towards whatever it wants to look at.
      const pose = this.follow();
      const k = 1 - Math.exp(-dt * (pose.damping ?? 2.2));
      this.camera.position.lerp(new THREE.Vector3(pose.x, pose.y, pose.z), k);
      this.lookAt.lerp(targetOf(pose), k);
      this.camera.lookAt(this.lookAt);
    }

    for (const update of this.updaters) update(time, dt);

    this.background.copy(LIGHT_BG).lerp(DIVIDER_BG, this.divider);
    this.webgl.setClearColor(this.background);
    this.pixels.divider = this.divider;
    this.pixels.update(this.camera, time, this.restDistance(), this.pixelAmount);

    for (const logo of this.logos) {
      const age = Math.min((time - logo.userData.born - 0.3) / 1.4, 1);
      logo.scale.setScalar(Math.max(easeOutBack(Math.max(age, 0)), 0.0001) * 3.4);
      logo.rotation.set(
        Math.cos(time * 0.4) * 0.1 + this.pointer.y * 0.18,
        Math.sin(time * 0.5) * 0.32 + this.pointer.x * 0.35 + (1 - Math.max(age, 0)) * 2.5,
        0,
      );
      logo.position.y = logo.userData.base.y + Math.sin(time * 0.8) * 14;
    }

    this.webgl.render(this.scene, this.camera);
    this.css.render(this.cssScene, this.camera);
  }
}
