/**
 * Lighting Setup
 */

import * as THREE from 'three';

export function createLights() {
  const lights = [];

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  lights.push(ambientLight);

  // Main directional light (key light)
  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(5, 8, 5);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 20;
  mainLight.shadow.camera.left = -10;
  mainLight.shadow.camera.right = 10;
  mainLight.shadow.camera.top = 10;
  mainLight.shadow.camera.bottom = -10;
  lights.push(mainLight);

  // Fill light
  const fillLight = new THREE.DirectionalLight(0x6699ff, 0.3);
  fillLight.position.set(-5, 4, -3);
  lights.push(fillLight);

  // Accent light
  const accentLight = new THREE.PointLight(0x00ff88, 0.5, 10);
  accentLight.position.set(-2, 2, 3);
  lights.push(accentLight);

  return lights;
}
