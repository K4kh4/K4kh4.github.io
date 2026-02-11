/**
 * Camera Setup
 */

import * as THREE from 'three';

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  
  camera.position.set(0, 3, 8);
  camera.lookAt(0, 1, 0);
  
  return camera;
}
