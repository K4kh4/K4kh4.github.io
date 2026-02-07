/**
 * Interaction Manager
 * Handles raycasting, hover effects, and object interactions
 */

import * as THREE from 'three';

export class InteractionManager {
  constructor(camera, renderer, scene) {
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;
    
    this.raycaster = new THREE.Raycaster();
    this.interactiveObjects = [];
    this.hoveredObject = null;
    this.outlineMaterial = null;
    
    this.init();
  }

  init() {
    // Collect all interactive objects from the scene
    this.scene.traverse((object) => {
      if (object.userData.interactive) {
        this.interactiveObjects.push(object);
      }
    });

    // Create outline material
    this.outlineMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      side: THREE.BackSide,
    });
  }

  update(mouse) {
    // Update raycaster
    this.raycaster.setFromCamera(mouse, this.camera);

    // Get intersections
    const intersects = this.raycaster.intersectObjects(
      this.interactiveObjects,
      true
    );

    // Clear previous hover
    if (this.hoveredObject) {
      this.removeOutline(this.hoveredObject);
      this.hoveredObject = null;
    }

    // Check for new hover
    if (intersects.length > 0) {
      // Find the parent interactive group
      let object = intersects[0].object;
      while (object.parent && !object.userData.interactive) {
        object = object.parent;
      }

      if (object.userData.interactive) {
        this.hoveredObject = object;
        this.addOutline(object);
      }
    }
  }

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

  getHoveredObject() {
    return this.hoveredObject;
  }
}
