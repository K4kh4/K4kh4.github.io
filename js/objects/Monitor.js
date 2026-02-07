/**
 * Monitor Object
 */

import * as THREE from 'three';

export function createMonitor() {
  const group = new THREE.Group();
  group.userData = { id: 'monitor', interactive: true };
  group.name = 'Monitor';

  // Stand
  const standGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.3, 16);
  const standMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.5,
    metalness: 0.7,
  });
  const stand = new THREE.Mesh(standGeometry, standMaterial);
  stand.position.y = 0.15;
  stand.castShadow = true;
  group.add(stand);

  // Screen frame
  const frameGeometry = new THREE.BoxGeometry(1.6, 1, 0.05);
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.3,
    metalness: 0.8,
  });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.set(0, 0.8, 0);
  frame.castShadow = true;
  group.add(frame);

  // Screen
  const screenGeometry = new THREE.PlaneGeometry(1.5, 0.9);
  const screenMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    emissive: 0x003366,
    emissiveIntensity: 0.3,
    roughness: 0.1,
    metalness: 0.9,
  });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.set(0, 0.8, 0.026);
  group.add(screen);

  return group;
}
