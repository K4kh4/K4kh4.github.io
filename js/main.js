/**
 * Main Application Entry Point
 * Manages the interactive 3D desk scene
 */

import * as THREE from 'three';
import { createScene } from './scene/Scene.js';
import { createCamera } from './scene/Camera.js';
import { createRenderer } from './scene/Renderer.js';
import { createLights } from './scene/Lights.js';
import { createDesk } from './objects/Desk.js';
import { InteractionManager } from './interactions/InteractionManager.js';
import { UIManager } from './ui/UIManager.js';

// ========================================
// APPLICATION STATE
// ========================================
const app = {
  scene: null,
  camera: null,
  renderer: null,
  interactionManager: null,
  uiManager: null,
  clock: new THREE.Clock(),
  mouse: new THREE.Vector2(),
};

// ========================================
// INITIALIZATION
// ========================================
async function init() {
  // Create core Three.js components
  app.scene = createScene();
  app.camera = createCamera();
  app.renderer = createRenderer();

  const container = document.getElementById('canvas-container');
  container.appendChild(app.renderer.domElement);

  // Add lighting
  const lights = createLights();
  lights.forEach(light => app.scene.add(light));

  // Create desk and objects
  const deskGroup = await createDesk();
  app.scene.add(deskGroup);

  // Initialize managers
  app.interactionManager = new InteractionManager(
    app.camera,
    app.renderer,
    app.scene
  );

  app.uiManager = new UIManager();

  // Setup event listeners
  setupEventListeners();

  // Hide loading screen
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');
  }, 500);

  // Start animation loop
  animate();
}

// ========================================
// ANIMATION LOOP
// ========================================
function animate() {
  requestAnimationFrame(animate);

  const delta = app.clock.getDelta();

  // Update camera to follow mouse
  const targetX = app.mouse.x * 0.5;
  const targetY = -app.mouse.y * 0.3;
  
  app.camera.position.x += (targetX - app.camera.position.x) * 0.05;
  app.camera.position.y += (targetY - app.camera.position.y + 3) * 0.05;
  app.camera.lookAt(0, 1, 0);

  // Update interaction manager
  app.interactionManager.update(app.mouse);

  // Render scene
  app.renderer.render(app.scene, app.camera);
}

// ========================================
// EVENT HANDLERS
// ========================================
function setupEventListeners() {
  // Mouse move
  window.addEventListener('mousemove', onMouseMove);

  // Mouse click
  window.addEventListener('click', onClick);

  // Window resize
  window.addEventListener('resize', onWindowResize);

  // Modal close
  document.getElementById('modal-close').addEventListener('click', () => {
    app.uiManager.closeModal();
  });

  // Close modal on background click
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
      app.uiManager.closeModal();
    }
  });

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      app.uiManager.closeModal();
    }
  });
}

function onMouseMove(event) {
  // Normalize mouse coordinates (-1 to +1)
  app.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  app.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update tooltip position
  const hoveredObject = app.interactionManager.getHoveredObject();
  if (hoveredObject) {
    app.uiManager.showTooltip(hoveredObject.name, event.clientX, event.clientY);
  } else {
    app.uiManager.hideTooltip();
  }
}

function onClick() {
  const hoveredObject = app.interactionManager.getHoveredObject();
  if (hoveredObject) {
    app.uiManager.openModal(hoveredObject.userData.id);
  }
}

function onWindowResize() {
  // Update camera
  app.camera.aspect = window.innerWidth / window.innerHeight;
  app.camera.updateProjectionMatrix();

  // Update renderer
  app.renderer.setSize(window.innerWidth, window.innerHeight);
}

// ========================================
// START APPLICATION
// ========================================
init().catch(error => {
  console.error('Failed to initialize application:', error);
});
