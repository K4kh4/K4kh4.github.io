/**
 * Main Application Entry Point
 * Manages the interactive 3D desk scene
 */

import * as THREE from 'three';
import { createScene } from './scene/Scene.js';
import { createCamera } from './scene/Camera.js';
import { createRenderer } from './scene/Renderer.js';
import { createLights } from './scene/Lights.js';
import { DeskSceneLoader } from './loaders/GLTFLoader.js';
import { InteractionManager } from './interactions/InteractionManager.js';
import { AnimationManager } from './animations/AnimationManager.js';
import { CameraController } from './scene/CameraController.js';
import { UIManager } from './ui/UIManager.js';
import { themeManager } from './utils/ThemeManager.js';

// ========================================
// APPLICATION STATE
// ========================================
const app = {
  scene: null,
  camera: null,
  renderer: null,
  cameraController: null,
  interactionManager: null,
  animationManager: null,
  uiManager: null,
  sceneLoader: null,
  clock: new THREE.Clock(),
  mouse: new THREE.Vector2(),
  deskObjects: null,
};

// ========================================
// INITIALIZATION
// ========================================
async function init() {
  console.log('🚀 Initializing K4kh4 Portfolio...');

  // Apply theme colors
  themeManager.applyTheme();

  // Create core Three.js components
  app.scene = createScene();
  app.camera = createCamera();
  app.renderer = createRenderer();

  const container = document.getElementById('canvas-container');
  container.appendChild(app.renderer.domElement);

  // Add lighting
  const lights = createLights();
  lights.forEach(light => app.scene.add(light));

  // Initialize managers
  app.animationManager = new AnimationManager();
  app.cameraController = new CameraController(app.camera, app.scene);
  app.uiManager = new UIManager();
  app.sceneLoader = new DeskSceneLoader();

  // Initialize camera
  app.cameraController.init();

  // Load desk scene
  try {
    // Try to load actual GLTF file
    // For now, use placeholder scene
    console.log('📦 Loading desk scene...');
    app.deskObjects = app.sceneLoader.createPlaceholderScene();
    app.scene.add(app.deskObjects.scene);
    
    // Setup shadows
    app.sceneLoader.setupShadows(app.deskObjects.scene);

    // Initialize interaction manager with loaded objects
    app.interactionManager = new InteractionManager(
      app.camera,
      app.renderer,
      app.scene,
      app.animationManager
    );
    
    app.interactionManager.setInteractiveObjects(app.deskObjects);

    // Setup UI manager with clickable objects list
    const clickableIds = app.deskObjects.clickable.map(obj => obj.userData.id).filter(Boolean);
    app.uiManager.setClickableObjects(clickableIds);
    
    // Set navigation callback
    app.uiManager.setNavigationCallback((objectId) => {
      navigateToObject(objectId);
    });

    console.log('✅ Scene loaded successfully');
  } catch (error) {
    console.error('❌ Failed to load scene:', error);
    
    // Fallback to placeholder
    app.deskObjects = app.sceneLoader.createPlaceholderScene();
    app.scene.add(app.deskObjects.scene);
    
    app.interactionManager = new InteractionManager(
      app.camera,
      app.renderer,
      app.scene,
      app.animationManager
    );
    
    app.interactionManager.setInteractiveObjects(app.deskObjects);
    
    const clickableIds = app.deskObjects.clickable.map(obj => obj.userData.id).filter(Boolean);
    app.uiManager.setClickableObjects(clickableIds);
    app.uiManager.setNavigationCallback((objectId) => {
      navigateToObject(objectId);
    });
  }

  // Setup event listeners
  setupEventListeners();

  // Hide loading screen
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');
  }, 1000);

  // Start animation loop
  animate();
  
  console.log('✨ Portfolio initialized!');
}

// ========================================
// ANIMATION LOOP
// ========================================
function animate() {
  requestAnimationFrame(animate);

  const delta = app.clock.getDelta();

  // Update camera controller (handles both free movement and zoom)
  app.cameraController.update(app.mouse.x, app.mouse.y);

  // Update interaction manager (block if modal is open)
  const isModalOpen = app.uiManager.isModalOpen();
  app.interactionManager.update(app.mouse, isModalOpen);

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
  document.getElementById('modal-close').addEventListener('click', onModalClose);

  // Close modal on background click
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
      onModalClose();
    }
  });

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      onModalClose();
    }
  });
}

function onMouseMove(event) {
  // Don't update interactions if modal is open
  if (app.uiManager.isModalOpen()) {
    app.uiManager.hideTooltip();
    return;
  }

  // Normalize mouse coordinates (-1 to +1)
  app.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  app.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update tooltip position
  const hoveredObject = app.interactionManager.getHoveredObject();
  if (hoveredObject && hoveredObject.userData.clickable) {
    const displayName = getDisplayName(hoveredObject);
    app.uiManager.showTooltip(displayName, event.clientX, event.clientY);
  } else {
    app.uiManager.hideTooltip();
  }
}

function onClick() {
  // Block interactions if modal is open
  if (app.uiManager.isModalOpen()) {
    return;
  }

  const hoveredObject = app.interactionManager.getHoveredObject();
  
  if (!hoveredObject) {
    // Click on empty space - reset camera if zoomed
    if (app.cameraController.getIsZoomed()) {
      app.cameraController.resetCamera();
      app.uiManager.closeModal();
    }
    return;
  }

  // Handle toggleable objects (like desk light)
  if (hoveredObject.userData.toggleable) {
    const newState = app.animationManager.toggleLight(hoveredObject);
    console.log(`💡 Light ${newState ? 'ON' : 'OFF'}`);
    return;
  }

  // Handle clickable objects
  if (hoveredObject.userData.clickable) {
    openObjectModal(hoveredObject);
  }
}

/**
 * Open modal for a specific object
 */
function openObjectModal(object) {
  // Zoom camera to object
  app.cameraController.zoomToObject(object);
  
  // Open modal with project info
  app.uiManager.openModal(object.userData.id);
}

/**
 * Navigate to a different object (used by modal navigation buttons)
 */
function navigateToObject(objectId) {
  // Find the object by ID
  const object = app.deskObjects.clickable.find(obj => obj.userData.id === objectId);
  
  if (object) {
    // Zoom to new object
    app.cameraController.zoomToObject(object);
    
    // Update modal content
    app.uiManager.openModal(objectId);
  }
}

function onModalClose() {
  app.uiManager.closeModal();
  
  // Reset camera zoom
  if (app.cameraController.getIsZoomed()) {
    app.cameraController.resetCamera();
  }
}

function onWindowResize() {
  // Update camera
  app.cameraController.onResize();

  // Update renderer
  app.renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Get display name for tooltip
 */
function getDisplayName(object) {
  const id = object.userData.id;
  
  const displayNames = {
    'monitor': 'Web Games',
    'phone': 'Mobile Games',
    'notebook': 'Other Projects',
    'poster-1': 'Cyber Nexus',
    'poster-2': 'Mystic Realms',
    'poster-3': 'Void Station',
    'keyboard': 'Keyboard',
    'mouse': 'Mouse',
    'macmini': 'Mac Mini',
    'desklight': 'Desk Light'
  };
  
  return displayNames[id] || object.userData.originalName || id;
}

// ========================================
// START APPLICATION
// ========================================
init().catch(error => {
  console.error('Failed to initialize application:', error);
  document.getElementById('loading-screen').querySelector('.loading-text').textContent = 
    'Failed to load. Please refresh the page.';
});
