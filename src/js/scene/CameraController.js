/**
 * Camera Controller
 * Handles camera movements, zoom, and focus animations
 */

import * as THREE from 'three';
import { gsap } from 'gsap';

// ========================================
// CAMERA ROTATION LIMITS
// Edit these values to control how far the camera can rotate
// Values are in screen space units (0 to 1 range from mouse position)
// ========================================
const ROTATION_LIMITS = {
  // Horizontal rotation limits (left/right)
  horizontal: {
    min: -0.1,  // Maximum rotation to the left
    max: 0.1    // Maximum rotation to the right
  },
  // Vertical rotation limits (up/down)
  vertical: {
    min: 0,  // Maximum rotation downward
    max: 0.2    // Maximum rotation upward
  },
  // Rotation speed multiplier (how much mouse movement affects camera)
  sensitivity: 0.3
};

// ========================================
// CAMERA OFFSET CONFIGURATION
// Edit these values to adjust camera position for each object
// Positive X = right, Negative X = left
// Positive Y = up, Negative Y = down
// Positive Z = closer, Negative Z = further
// ========================================
const CAMERA_OFFSETS = {
  'monitor': {
    offset: new THREE.Vector3(.5, 0.7,1.5),  // Shifted left
    duration: 1,
    ease: 'back.inOut'
  },
  'phone': {
    offset: new THREE.Vector3(.5, 1, 2),    // Shifted left
    duration: 1,
    ease: 'back.inOut'
  },
  'notebook': {
    offset: new THREE.Vector3(.5, 1.5, 2),  // Shifted left
    duration: 1,
    ease: 'back.inOut'
  },
  'poster-1': {
    offset: new THREE.Vector3(0, 0, 3.5),    // Shifted left
    duration: 1,
    ease: 'back.inOut'
  },
  'poster-2': {
    offset: new THREE.Vector3(0, 0, 3.5),    // Shifted left
    duration: 1,
    ease: 'back.inOut'
  },
  'poster-3': {
    offset: new THREE.Vector3(0, 0, 3.5),    // Shifted left
    duration: 1,
    ease: 'back.inOut'
  },
  'desklight': {
    offset: new THREE.Vector3(.5, 1, 2),    // Shifted left
    duration: 1,
    ease: 'back.inOut'
  },
  // Default for any other object
  'default': {
    offset: new THREE.Vector3(-2, 1, 2.5),    // Shifted left
    duration: 1,
    ease: 'power2.inOut'
  }
};

export class CameraController {
  constructor(camera, scene) {
    this.camera = camera;
    this.scene = scene;
    
    // Default camera position
    this.defaultPosition = new THREE.Vector3(0, 1.2, 1.25);
    this.defaultTarget = new THREE.Vector3(0, 1, 0);
    
    // Current state
    this.currentTarget = this.defaultTarget.clone();
    this.isZoomed = false;
    this.focusedObject = null;
    
    // Animation state
    this.animation = null;
  }

  /**
   * Initialize camera position
   */
  init() {
    this.camera.position.copy(this.defaultPosition);
    this.camera.lookAt(this.defaultTarget);
    this.camera.fov = 31;
  }

  /**
   * Zoom camera to focus on a specific object
   * @param {THREE.Object3D} object - The object to focus on
   */
  zoomToObject(object) {
    if (!object) return;
    
    // Allow re-zooming even if already zoomed (for navigation)
    this.isZoomed = true;
    this.focusedObject = object;

    // Calculate position for the object
    const worldPosition = new THREE.Vector3();
    object.getWorldPosition(worldPosition);

    // Get camera configuration for this object (or use default)
    const objectId = object.userData.id;
    const config = CAMERA_OFFSETS[objectId] || CAMERA_OFFSETS['default'];

    const targetPosition = worldPosition.clone().add(config.offset);
    const lookAtTarget = worldPosition.clone();

    // Kill existing animation
    if (this.animation) {
      this.animation.kill();
    }

    // Animate camera
    this.animation = gsap.timeline({
      onUpdate: () => {
        this.camera.lookAt(this.currentTarget);
      }
    });

    this.animation.to(this.camera.position, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration: config.duration,
      ease: config.ease
    }, 0);

    this.animation.to(this.currentTarget, {
      x: lookAtTarget.x,
      y: lookAtTarget.y,
      z: lookAtTarget.z,
      duration: config.duration,
      ease: config.ease
    }, 0);

    return this.animation;
  }

  /**
   * Reset camera to default position
   */
  resetCamera() {
    if (!this.isZoomed) return;
    
    this.isZoomed = false;
    this.focusedObject = null;

    // Kill existing animation
    if (this.animation) {
      this.animation.kill();
    }

    // Animate back to default
    this.animation = gsap.timeline({
      onUpdate: () => {
        this.camera.lookAt(this.currentTarget);
      }
    });

    this.animation.to(this.camera.position, {
      x: this.defaultPosition.x,
      y: this.defaultPosition.y,
      z: this.defaultPosition.z,
      duration: 1,
      ease: 'power2.inOut'
    }, 0);

    this.animation.to(this.currentTarget, {
      x: this.defaultTarget.x,
      y: this.defaultTarget.y,
      z: this.defaultTarget.z,
      duration: 1,
      ease: 'power2.inOut'
    }, 0);

    return this.animation;
  }

  /**
   * Update camera to follow mouse (when not zoomed)
   */
  update(mouseX, mouseY) {
    if (this.isZoomed) return;

    // Apply rotation limits and sensitivity
    const targetX = THREE.MathUtils.clamp(
      -mouseX * ROTATION_LIMITS.sensitivity,
      ROTATION_LIMITS.horizontal.min,
      ROTATION_LIMITS.horizontal.max
    );
    
    const targetY = THREE.MathUtils.clamp(
      -mouseY * ROTATION_LIMITS.sensitivity,
      ROTATION_LIMITS.vertical.min,
      ROTATION_LIMITS.vertical.max
    );

    // Smoothly interpolate camera position
    this.camera.position.x += (targetX - this.camera.position.x + this.defaultPosition.x) * 0.05;
    this.camera.position.y += (targetY - this.camera.position.y + this.defaultPosition.y) * 0.05;
    this.camera.lookAt(this.currentTarget);
  }

  /**
   * Handle window resize
   */
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Check if camera is currently zoomed
   */
  getIsZoomed() {
    return this.isZoomed;
  }

  /**
   * Get the currently focused object
   */
  getFocusedObject() {
    return this.focusedObject;
  }
}
