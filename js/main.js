/**
 * Main Application Entry Point
 * Initializes and manages the Three.js scene
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createGlobe } from './components/Globe.js';
import { createParticles } from './components/Particles.js';
import { createLights } from './components/Lights.js';

// ========================================
// APPLICATION STATE
// ========================================
const app = {
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  globe: null,
  particles: null,
  isPlaying: true,
  clock: new THREE.Clock(),
};

// ========================================
// INITIALIZATION
// ========================================
function init() {
  // Create scene
  app.scene = new THREE.Scene();
  app.scene.fog = new THREE.Fog(0x0a0a0f, 10, 50);

  // Create camera
  const aspect = window.innerWidth / window.innerHeight;
  app.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
  app.camera.position.z = 8;

  // Create renderer
  app.renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  app.renderer.setSize(window.innerWidth, window.innerHeight);
  app.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  app.renderer.setClearColor(0x0a0a0f, 1);
  
  const container = document.getElementById('canvas-container');
  container.appendChild(app.renderer.domElement);

  // Create controls
  app.controls = new OrbitControls(app.camera, app.renderer.domElement);
  app.controls.enableDamping = true;
  app.controls.dampingFactor = 0.05;
  app.controls.enableZoom = true;
  app.controls.enablePan = false;
  app.controls.minDistance = 5;
  app.controls.maxDistance = 15;
  app.controls.autoRotate = true;
  app.controls.autoRotateSpeed = 0.5;

  // Add scene elements
  app.globe = createGlobe();
  app.scene.add(app.globe);

  app.particles = createParticles();
  app.scene.add(app.particles);

  const lights = createLights();
  lights.forEach(light => app.scene.add(light));

  // Setup event listeners
  setupEventListeners();

  // Hide loading screen
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');
  }, 1000);

  // Start animation loop
  animate();
}

// ========================================
// ANIMATION LOOP
// ========================================
function animate() {
  requestAnimationFrame(animate);

  if (app.isPlaying) {
    const delta = app.clock.getDelta();
    const elapsed = app.clock.getElapsedTime();

    // Update globe rotation
    if (app.globe) {
      app.globe.rotation.y += delta * 0.1;
    }

    // Update particles
    if (app.particles) {
      app.particles.rotation.y -= delta * 0.05;
      
      // Animate particle positions
      const positions = app.particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Subtle wave motion
        positions[i + 1] = y + Math.sin(elapsed + x) * 0.002;
      }
      app.particles.geometry.attributes.position.needsUpdate = true;
    }

    // Update controls
    app.controls.update();
  }

  // Render scene
  app.renderer.render(app.scene, app.camera);
}

// ========================================
// EVENT HANDLERS
// ========================================
function setupEventListeners() {
  // Window resize
  window.addEventListener('resize', onWindowResize);

  // Play/Pause button
  const playPauseBtn = document.getElementById('play-pause');
  const playIcon = document.getElementById('play-icon');
  
  playPauseBtn.addEventListener('click', () => {
    app.isPlaying = !app.isPlaying;
    playIcon.textContent = app.isPlaying ? '⏸' : '▶';
    app.controls.autoRotate = app.isPlaying;
  });
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
init();
