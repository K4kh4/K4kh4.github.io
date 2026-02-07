/**
 * Lights Component
 * Creates and configures scene lighting
 */

import * as THREE from 'three';

export function createLights() {
  const lights = [];

  // Ambient light for base illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  lights.push(ambientLight);

  // Main directional light
  const mainLight = new THREE.DirectionalLight(0x00ff88, 1.5);
  mainLight.position.set(5, 5, 5);
  lights.push(mainLight);

  // Secondary accent light
  const accentLight = new THREE.DirectionalLight(0x0066ff, 1.0);
  accentLight.position.set(-5, -3, 3);
  lights.push(accentLight);

  // Point light for highlights
  const pointLight = new THREE.PointLight(0xffffff, 1, 20);
  pointLight.position.set(0, 5, 5);
  lights.push(pointLight);

  return lights;
}
