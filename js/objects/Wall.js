/**
 * Wall with Posters
 */

import * as THREE from 'three';

export function createWall() {
  const group = new THREE.Group();

  // Main wall
  const wallGeometry = new THREE.BoxGeometry(10, 5, 0.2);
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.9,
  });
  const wall = new THREE.Mesh(wallGeometry, wallMaterial);
  wall.receiveShadow = true;
  group.add(wall);

  // Poster 1
  const poster1 = createPoster(0xff6b6b, 'Poster 1');
  poster1.position.set(-2, 0, 0.11);
  group.add(poster1);

  // Poster 2
  const poster2 = createPoster(0x4ecdc4, 'Poster 2');
  poster2.position.set(0, 0, 0.11);
  group.add(poster2);

  // Poster 3
  const poster3 = createPoster(0xffe66d, 'Poster 3');
  poster3.position.set(2, 0, 0.11);
  group.add(poster3);

  return group;
}

function createPoster(color, name) {
  const group = new THREE.Group();
  group.userData = { id: name.toLowerCase().replace(' ', '-'), interactive: true };
  group.name = name;

  // Poster frame
  const frameGeometry = new THREE.BoxGeometry(0.8, 1.0, 0.02);
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.5,
    metalness: 0.5,
  });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.castShadow = true;
  group.add(frame);

  // Poster content
  const contentGeometry = new THREE.PlaneGeometry(0.7, 0.9);
  const contentMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.8,
  });
  const content = new THREE.Mesh(contentGeometry, contentMaterial);
  content.position.z = 0.011;
  group.add(content);

  return group;
}
