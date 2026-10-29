// The Timefold "pixel grid" backdrop: a faint infinite grid of lines plus clusters of
// extruded square pixels. Everything is computed on the GPU from the world-space cell index,
// so the pattern is stable while the camera flies over it.
import * as THREE from 'three';

export const CELL = 64;
export const PLANE_Z = -320;

const NOISE_GLSL = /* glsl */ `
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  // 0 in the middle of the screen, 1 towards the edges: keeps the pixels away from the content.
  // Off-center, so the pixels gather on the right and at the bottom, away from titles in the top left.
  float edgeMask(vec2 world, vec3 cam, vec2 halfView) {
    vec2 d = (world - cam.xy) / halfView - vec2(-0.3, 0.25);
    return smoothstep(0.95, 1.35, length(d * vec2(0.85, 1.1)));
  }
`;

const sharedUniforms = {
  uTime: { value: 0 },
  uCam: { value: new THREE.Vector3() },
  uHalf: { value: new THREE.Vector2(1, 1) },
  uFade: { value: 1 },
  uDivider: { value: 0 },
  uRipple: { value: new THREE.Vector3(0, 0, -100) },
};

export class PixelField {
  constructor(scene) {
    this.uniforms = sharedUniforms;
    this.cols = 0;
    this.rows = 0;

    this.grid = this.createGrid();
    scene.add(this.grid);

    this.cubeUniforms = {
      ...sharedUniforms,
      uOrigin: { value: new THREE.Vector2() },
    };
    this.cubes = null;
    this.scene = scene;
  }

  createGrid() {
    const material = new THREE.ShaderMaterial({
      uniforms: sharedUniforms,
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        varying vec2 vWorld;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vWorld = world.xy;
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uCam;
        uniform vec2 uHalf;
        uniform float uFade;
        uniform float uDivider;
        varying vec2 vWorld;
        ${NOISE_GLSL}
        void main() {
          vec2 p = vWorld / ${CELL.toFixed(1)};
          vec2 fw = fwidth(p);
          vec2 g = abs(fract(p) - 0.5);
          vec2 l = smoothstep(vec2(0.5) - fw * 1.1, vec2(0.5), g);
          float line = max(l.x, l.y);
          // Lines vanish when they get denser than a few pixels (overview) to avoid moiré.
          line *= 1.0 - smoothstep(0.08, 0.3, max(fw.x, fw.y));
          float mask = mix(0.35, 1.0, edgeMask(vWorld, uCam, uHalf));
          vec3 color = mix(vec3(0.80, 0.80, 0.86), vec3(1.0), uDivider);
          float alpha = mix(0.55, 0.16, uDivider) * line * mask;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    plane.scale.set(400000, 400000, 1);
    plane.position.z = PLANE_Z - 0.5;
    plane.renderOrder = -1;
    return plane;
  }

  /** (Re)creates the instanced cubes so they cover the view at the given camera distance. */
  resize(camera, maxDistance) {
    const halfH = (maxDistance - PLANE_Z) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const halfW = halfH * camera.aspect;
    const cols = Math.ceil((2 * halfW) / CELL) + 4;
    const rows = Math.ceil((2 * halfH) / CELL) + 4;
    if (cols === this.cols && rows === this.rows) return;
    this.cols = cols;
    this.rows = rows;

    if (this.cubes) {
      this.scene.remove(this.cubes);
      this.cubes.geometry.dispose();
    }

    const box = new THREE.BoxGeometry(1, 1, 1);
    const geometry = new THREE.InstancedBufferGeometry();
    geometry.index = box.index;
    geometry.attributes.position = box.attributes.position;
    geometry.attributes.normal = box.attributes.normal;
    const cells = new Float32Array(cols * rows * 2);
    let i = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cells[i++] = x;
        cells[i++] = y;
      }
    }
    geometry.setAttribute('aCell', new THREE.InstancedBufferAttribute(cells, 2));
    geometry.instanceCount = cols * rows;

    const material = this.cubes?.material ?? this.createCubeMaterial();
    this.cubes = new THREE.Mesh(geometry, material);
    this.cubes.frustumCulled = false;
    this.scene.add(this.cubes);
  }

  createCubeMaterial() {
    return new THREE.ShaderMaterial({
      uniforms: this.cubeUniforms,
      vertexShader: /* glsl */ `
        attribute vec2 aCell;
        uniform vec2 uOrigin;
        uniform float uTime;
        uniform vec3 uCam;
        uniform vec2 uHalf;
        uniform float uFade;
        uniform float uDivider;
        uniform vec3 uRipple;
        varying vec3 vColor;
        varying vec3 vNormal;
        ${NOISE_GLSL}

        vec3 lightPalette(float r) {
          if (r < 0.34) return vec3(0.878, 0.851, 1.000);  // lavender
          if (r < 0.60) return vec3(0.588, 0.467, 1.000);  // light purple
          if (r < 0.82) return vec3(0.325, 0.027, 0.976);  // #5307F9 brand purple
          if (r < 0.88) return vec3(1.000, 0.478, 0.102);  // #ff7a1a orange
          if (r < 0.94) return vec3(0.094, 0.776, 0.718);  // #18c6b7 teal
          if (r < 0.98) return vec3(0.957, 0.745, 0.094);  // #f4be18 yellow
          return vec3(0.098, 0.788, 0.420);                // #19c96b green
        }
        vec3 dividerPalette(float r) {
          if (r < 0.35) return vec3(0.420, 0.180, 1.000);
          if (r < 0.65) return vec3(0.560, 0.420, 1.000);
          if (r < 0.88) return vec3(0.250, 0.000, 0.800);
          return vec3(1.0);
        }

        void main() {
          vec2 cell = uOrigin + aCell;
          vec2 center = (cell + 0.5) * ${CELL.toFixed(1)};
          float h = hash(cell);
          float h2 = hash(cell + 17.31);

          float cloud = vnoise(cell * 0.09 + 3.7);
          float lit = step(0.84, cloud * 0.75 + h * 0.4);
          // A few loose pixels blink on and off.
          float phase = fract(uTime * 0.11 + h2 * 9.0);
          float blink = step(0.93, h2) * smoothstep(0.0, 0.08, phase) * smoothstep(0.45, 0.35, phase);
          lit = max(lit, blink);

          float mask = edgeMask(center, uCam, uHalf);
          float size = lit * mask * uFade;

          float rt = uTime - uRipple.z;
          float wave = rt * 2400.0;
          float rr = length(center - uRipple.xy);
          float ripple = step(0.0, rt) * exp(-pow((rr - wave) / 240.0, 2.0)) * exp(-rt * 1.2);

          float height = (0.12 + h * 0.35 + ripple * 2.2 + 0.08 * sin(uTime * 0.9 + h * 30.0)) * ${CELL.toFixed(1)};
          vec3 p = position;
          p.xy *= ${(CELL * 0.86).toFixed(1)} * size;
          p.z = (p.z + 0.5) * height * size;
          vec3 world = vec3(center + p.xy, ${PLANE_Z.toFixed(1)} + p.z);

          vColor = mix(lightPalette(h2), dividerPalette(h2), uDivider);
          vNormal = normal;
          gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying vec3 vNormal;
        void main() {
          vec3 l = normalize(vec3(-0.45, 0.6, 1.0));
          float shade = 0.58 + 0.42 * max(dot(normalize(vNormal), l), 0.0);
          gl_FragColor = vec4(vColor * shade, 1.0);
        }
      `,
    });
  }

  update(camera, time, restDistance, amount = 1) {
    const distance = camera.position.z - PLANE_Z;
    const halfH = distance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    sharedUniforms.uTime.value = time;
    sharedUniforms.uCam.value.copy(camera.position);
    sharedUniforms.uHalf.value.set(halfH * camera.aspect, halfH);
    sharedUniforms.uFade.value =
      amount * (1 - THREE.MathUtils.smoothstep(camera.position.z, restDistance * 1.25, restDistance * 1.6));
    this.cubeUniforms.uOrigin.value.set(
      Math.floor(camera.position.x / CELL) - Math.floor(this.cols / 2),
      Math.floor(camera.position.y / CELL) - Math.floor(this.rows / 2),
    );
  }

  ripple(x, y, startTime) {
    sharedUniforms.uRipple.value.set(x, y, startTime);
  }

  set divider(value) {
    sharedUniforms.uDivider.value = value;
  }
}
