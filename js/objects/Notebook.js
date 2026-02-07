/**
 * Notebook Object
 */

import * as THREE from 'three';

export function createNotebook() {
  const group = new THREE.Group();
  group.userData = { id: 'notebook', interactive: true };
  group.name = 'Notebook';

  // Notebook cover
  const coverGeometry = new THREE.BoxGeometry(0.8, 0.03, 1.0);
  const coverMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.9,
    metalness: 0.0,
  });
  const cover = new THREE.Mesh(coverGeometry, coverMaterial);
  cover.position.y = 0.015;
  cover.castShadow = true;
  group.add(cover);

  // Pages
  const pagesGeometry = new THREE.BoxGeometry(0.78, 0.025, 0.98);
  const pagesMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5dc,
    roughness: 0.95,
  });
  const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
  pages.position.set(0.01, 0.0275, 0);
  group.add(pages);

  return group;
}
