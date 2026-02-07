/**
 * Keyboard Object
 */

import * as THREE from 'three';

export function createKeyboard() {
  const group = new THREE.Group();
  group.userData = { id: 'keyboard', interactive: true };
  group.name = 'Keyboard';

  // Keyboard base
  const baseGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.4);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.6,
    metalness: 0.4,
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = 0.025;
  base.castShadow = true;
  group.add(base);

  // Keys (simplified as small boxes)
  const keyMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.5,
    metalness: 0.3,
  });

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 12; col++) {
      const keyGeometry = new THREE.BoxGeometry(0.08, 0.02, 0.08);
      const key = new THREE.Mesh(keyGeometry, keyMaterial);
      key.position.set(
        col * 0.09 - 0.5,
        0.06,
        row * 0.09 - 0.18
      );
      key.castShadow = true;
      group.add(key);
    }
  }

  return group;
}
