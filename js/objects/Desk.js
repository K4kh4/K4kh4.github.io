/**
 * Desk and all desk objects
 */

import * as THREE from 'three';
import { createMonitor } from './Monitor.js';
import { createKeyboard } from './Keyboard.js';
import { createMouse } from './Mouse.js';
import { createPhone } from './Phone.js';
import { createNotebook } from './Notebook.js';
import { createWall } from './Wall.js';

export async function createDesk() {
  const group = new THREE.Group();

  // Desk surface
  const deskGeometry = new THREE.BoxGeometry(6, 0.1, 3);
  const deskMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d2f24,
    roughness: 0.8,
    metalness: 0.1,
  });
  const desk = new THREE.Mesh(deskGeometry, deskMaterial);
  desk.position.y = 0;
  desk.receiveShadow = true;
  group.add(desk);

  // Floor
  const floorGeometry = new THREE.PlaneGeometry(20, 20);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.9,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.05;
  floor.receiveShadow = true;
  group.add(floor);

  // Wall
  const wall = createWall();
  wall.position.set(0, 2.5, -1.4);
  group.add(wall);

  // Monitor
  const monitor = createMonitor();
  monitor.position.set(0, 0.05, -0.3);
  group.add(monitor);

  // Keyboard
  const keyboard = createKeyboard();
  keyboard.position.set(0, 0.05, 0.6);
  group.add(keyboard);

  // Mouse
  const mouse = createMouse();
  mouse.position.set(0.8, 0.05, 0.5);
  group.add(mouse);

  // Phone
  const phone = createPhone();
  phone.position.set(-1.5, 0.05, 0.3);
  group.add(phone);

  // Notebook
  const notebook = createNotebook();
  notebook.position.set(-1.8, 0.05, -0.4);
  group.add(notebook);

  return group;
}
