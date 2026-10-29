// 3D scenes that can take over a slide: <section data-scene="airport">.
// Each scene has a number of steps, which the deck drives like fragments.
import { AirportScene, STEPS as AIRPORT_STEPS } from './airport.js';

export const SCENES = {
  airport: { steps: AIRPORT_STEPS, create: (stage, origin) => new AirportScene(stage, origin) },
};
