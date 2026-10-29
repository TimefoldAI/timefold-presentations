// The Timefold logomark, extruded into 3D.
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

// Same path as src/web/social/timefold-logomark.svg
const LOGOMARK_PATH =
  'M106,79 L106,54 L79,54 L79,79 L63.1,79 L54,104 L79,104 L79,154 L107.35,154 C112.605,154 117.3,150.7125 119.095,145.775 ' +
  'L124.56,130.76 C124.56,130.76 125.205,129 127.075,129 L166.7,129 L175.8,104 L143.0525,104 C137.7975,104 133.1025,107.2875 ' +
  '131.3075,112.225 L125.8425,127.2375 C125.8425,127.2375 125.2,129 123.3275,129 L106,129 L106,104 L125.55,104 C130.805,104 ' +
  '135.5,100.7125 137.295,95.775 L142.76,80.76 C142.76,80.76 143.405,79 145.275,79 L189.9,79 L199,54 L161.2525,54 ' +
  'C155.9975,54 151.3025,57.2875 149.5075,62.225 L144.0425,77.2375 C144.0425,77.2375 143.4,79 141.5275,79 L106.0025,79 L106,79 Z';

let geometry;

function logomarkGeometry() {
  if (geometry) return geometry;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${LOGOMARK_PATH}"/></svg>`;
  const { paths } = new SVGLoader().parse(svg);
  const shapes = paths.flatMap((path) => SVGLoader.createShapes(path));
  // Flip SVG's y-down into three's y-up. ExtrudeGeometry fixes the winding order itself.
  const points = new Set();
  shapes.forEach((shape) =>
    shape.curves.forEach((curve) => ['v0', 'v1', 'v2', 'v3'].forEach((key) => curve[key] && points.add(curve[key]))),
  );
  points.forEach((point) => (point.y *= -1));
  geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: 22,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 2,
    bevelSegments: 4,
  });
  geometry.center();
  return geometry;
}

export function createLogomark({ onDark = false } = {}) {
  const material = new THREE.MeshPhysicalMaterial({
    color: onDark ? 0xffffff : 0x5307f9,
    roughness: 0.32,
    metalness: 0.05,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25,
  });
  const mesh = new THREE.Mesh(logomarkGeometry(), material);
  const group = new THREE.Group();
  group.add(mesh);
  return group;
}
