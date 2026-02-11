/**
 * Scene Setup
 */

import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121218);
  scene.fog = new THREE.Fog(0x121218, 8, 20);
  
  return scene;
}
