/**
 * Animation Manager
 * Handles hover animations and interactive object animations
 */

import * as THREE from 'three';
import { gsap } from 'gsap';

export class AnimationManager {
  constructor() {
    this.activeAnimations = new Map();
    this.hoveredObjects = new Set();
  }

  /**
   * Play hover animation based on object type
   * @param {THREE.Object3D} object - The object to animate
   * @param {string} animationType - Type of animation (bounce, move, etc.)
   */
  playHoverAnimation(object, animationType = 'scale') {
    if (this.hoveredObjects.has(object)) return;
    
    this.hoveredObjects.add(object);
    const key = `hover_${object.uuid}`;

    // Store original position
    if (!object.userData.originalPosition) {
      object.userData.originalPosition = object.position.clone();
    }

    switch (animationType) {
      case 'bounce':
        this.bounceAnimation(object, key);
        break;
      case 'move':
        this.moveAnimation(object, key);
        break;
      case 'scale':
        this.scaleAnimation(object, key);
        break;
      default:
        this.bounceAnimation(object, key);
    }
  }

  /**
   * Stop hover animation and return to original state
   */
  stopHoverAnimation(object) {
    if (!this.hoveredObjects.has(object)) return;
    
    this.hoveredObjects.delete(object);
    const key = `hover_${object.uuid}`;
    
    // Kill existing animation
    if (this.activeAnimations.has(key)) {
      this.activeAnimations.get(key).kill();
      this.activeAnimations.delete(key);
    }

    // Return to original state
    if (object.userData.originalPosition) {
      gsap.to(object.position, {
        x: object.userData.originalPosition.x,
        y: object.userData.originalPosition.y,
        z: object.userData.originalPosition.z,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    }

    gsap.to(object.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  }

  /**
   * Bounce animation - lifts object up and down
   */
  bounceAnimation(object, key) {
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    
    timeline.to(object.position, {
      y: object.userData.originalPosition.y + 0.1,
      duration: 0.6,
      ease: 'back.out(2.7)'
    });

    this.activeAnimations.set(key, timeline);
  }

  /**
   * Move animation - simple forward/backward movement
   */
  moveAnimation(object, key) {
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    
    timeline.to(object.position, {
      x: object.userData.originalPosition.x + 0.05,
      duration: 0.5,
      ease: 'sine.inOut'
    });

    this.activeAnimations.set(key, timeline);
  }

  /**
   * Scale animation - subtle scale up
   */
  scaleAnimation(object, key) {
    const timeline = gsap.timeline();
    
    timeline.to(object.scale, {
      x: 1.25,
      y: 1.25,
      z: 1.25,
      duration: 0.5,
      ease: "back.Out(1.7)"
    });

    this.activeAnimations.set(key, timeline);
  }

  /**
   * Toggle light on/off
   */
  toggleLight(lightObject) {
    const isOn = lightObject.userData.isOn || false;
    lightObject.userData.isOn = !isOn;

    // Find the light head mesh
    let lightHead = null;
    lightObject.traverse((child) => {
      if (child.name === 'LightHead' || child.isMesh) {
        lightHead = child;
      }
    });

    if (lightHead && lightHead.material) {
      if (!isOn) {
        // Turn on
        gsap.to(lightHead.material, {
          emissiveIntensity: 1,
          duration: 0.3
        });
        gsap.to(lightHead.material.emissive, {
          r: 1,
          g: 0.8,
          b: 0.3,
          duration: 0.3
        });
      } else {
        // Turn off
        gsap.to(lightHead.material, {
          emissiveIntensity: 0,
          duration: 0.3
        });
        gsap.to(lightHead.material.emissive, {
          r: 0,
          g: 0,
          b: 0,
          duration: 0.3
        });
      }
    }

    return !isOn;
  }

  /**
   * Cleanup all animations
   */
  dispose() {
    this.activeAnimations.forEach(animation => animation.kill());
    this.activeAnimations.clear();
    this.hoveredObjects.clear();
  }
}
