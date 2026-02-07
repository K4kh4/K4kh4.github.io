/**
 * Interaction Manager
 * Handles raycasting, hover effects, and object interactions
 */

import * as THREE from 'three';

export class InteractionManager {
  constructor(camera, renderer, scene, animationManager = null) {
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;
    this.animationManager = animationManager;
    
    this.raycaster = new THREE.Raycaster();
    this.interactiveObjects = [];
    this.clickableObjects = [];
    this.hoveredObject = null;
    this.outlineMaterial = null;
    
    this.init();
  }

  init() {
    // Create outline material
    this.outlineMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      side: THREE.BackSide,
    });
  }

  /**
   * Set the interactive objects (called after loading scene)
   */
  setInteractiveObjects(objects) {
    this.interactiveObjects = objects.interactive || [];
    this.clickableObjects = objects.clickable || [];
    console.log(`🎯 Set ${this.interactiveObjects.length} interactive and ${this.clickableObjects.length} clickable objects`);
  }

  /**
   * Update raycasting and hover states
   */
  update(mouse, isBlocked = false) {
    // Don't update if interactions are blocked (e.g., modal is open)
    if (isBlocked) {
      // Clear any existing hover state
      if (this.hoveredObject) {
        this.handleHoverEnd(this.hoveredObject);
        this.hoveredObject = null;
      }
      return;
    }

    // Update raycaster
    this.raycaster.setFromCamera(mouse, this.camera);

    // Get all interactive objects (both hover and clickable)
    const allInteractive = [
      ...this.interactiveObjects,
      ...this.clickableObjects
    ].filter((obj, index, self) => self.indexOf(obj) === index); // Remove duplicates

    // Get intersections
    const intersects = this.raycaster.intersectObjects(
      allInteractive,
      true
    );

    // Clear previous hover
    if (this.hoveredObject) {
      this.handleHoverEnd(this.hoveredObject);
      this.hoveredObject = null;
    }

    // Check for new hover
    if (intersects.length > 0) {
      // Find the parent interactive group
      let object = intersects[0].object;
      while (object.parent && !object.userData.interactive && !object.userData.clickable) {
        object = object.parent;
      }

      if (object.userData.interactive || object.userData.clickable) {
        this.hoveredObject = object;
        this.handleHoverStart(object);
      }
    }
  }

  /**
   * Handle hover start - add outline and play animation
   */
  handleHoverStart(object) {
    // Add outline only for clickable objects
    if (object.userData.clickable) {
      this.addOutline(object);
    }

    // Play hover animation for interactive objects
    if (object.userData.hoverAnimation && this.animationManager) {
      const animType = this.getAnimationType(object);
      this.animationManager.playHoverAnimation(object, animType);
    }

    // Change cursor
    document.body.style.cursor = object.userData.clickable ? 'pointer' : 'default';
  }

  /**
   * Handle hover end - remove outline and stop animation
   */
  handleHoverEnd(object) {
    // Remove outline
    if (object.userData.clickable) {
      this.removeOutline(object);
    }

    // Stop hover animation
    if (object.userData.hoverAnimation && this.animationManager) {
      this.animationManager.stopHoverAnimation(object);
    }

    // Reset cursor
    document.body.style.cursor = 'default';
  }

  /**
   * Get animation type based on object
   */
  getAnimationType(object) {
    const id = object.userData.id;
    
    if (id === 'keyboard' || id === 'macmini') {
      return 'bounce';
    } else if (id === 'mouse') {
      return 'move';
    }
    
    return 'bounce';
  }

  /**
   * Add outline to clickable objects
   */
  addOutline(object) {
    // Add outline to all meshes in the group
    object.traverse((child) => {
      if (child.isMesh && !child.userData.isOutline) {
        // Store original material
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material;
        }

        // Create outline
        const outlineGeometry = child.geometry.clone();
        const outlineMesh = new THREE.Mesh(outlineGeometry, this.outlineMaterial);
        outlineMesh.scale.multiplyScalar(1.05);
        outlineMesh.userData.isOutline = true;
        child.add(outlineMesh);
      }
    });
  }

  /**
   * Remove outline from objects
   */
  removeOutline(object) {
    // Remove outline from all meshes
    object.traverse((child) => {
      if (child.isMesh) {
        // Find and remove outline children
        const outlines = child.children.filter(c => c.userData.isOutline);
        outlines.forEach(outline => child.remove(outline));
      }
    });
  }

  /**
   * Get the currently hovered object
   */
  getHoveredObject() {
    return this.hoveredObject;
  }

  /**
   * Check if an object is clickable
   */
  isClickable(object) {
    return object && object.userData.clickable;
  }

  /**
   * Cleanup
   */
  dispose() {
    this.interactiveObjects = [];
    this.clickableObjects = [];
    this.hoveredObject = null;
  }
}
