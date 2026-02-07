/**
 * Mouse Object
 */

import * as THREE from 'three';

export function createMouse() {
  const group = new THREE.Group();
  group.userData = { id: 'mouse', interactive: true };
  group.name = 'Mouse';

  // Mouse body
  const bodyGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.2);
  bodyGeometry.translate(0, 0.025, 0);
  
  // Round the top
  const body = new THREE.Mesh(
    bodyGeometry,
    new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.4,
      metalness: 0.6,
    })
  );
  body.castShadow = true;
  group.add(body);

  // Mouse scroll wheel
  const wheelGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.06, 8);
  const wheel = new THREE.Mesh(
    wheelGeometry,
    new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.6,
    })
  );
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0, 0.055, -0.03);
  group.add(wheel);

  return group;
}
