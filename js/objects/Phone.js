/**
 * Phone Object
 */

import * as THREE from 'three';

export function createPhone() {
  const group = new THREE.Group();
  group.userData = { id: 'phone', interactive: true };
  group.name = 'Phone';

  // Phone body
  const bodyGeometry = new THREE.BoxGeometry(0.3, 0.02, 0.6);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.2,
    metalness: 0.9,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.01;
  body.castShadow = true;
  group.add(body);

  // Screen
  const screenGeometry = new THREE.PlaneGeometry(0.28, 0.58);
  const screenMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    emissive: 0x001133,
    emissiveIntensity: 0.5,
    roughness: 0.1,
  });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.rotation.x = -Math.PI / 2;
  screen.position.y = 0.021;
  group.add(screen);

  return group;
}
