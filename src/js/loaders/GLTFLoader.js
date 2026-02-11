/**
 * GLTF Loader and Object Manager
 * Loads the desk scene GLTF and categorizes objects by naming convention
 */

import * as THREE from 'three';
import { GLTFLoader as ThreeGLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class DeskSceneLoader {
  constructor() {
    this.loader = new ThreeGLTFLoader();
    this.interactiveObjects = [];
    this.clickableObjects = [];
    this.toggleObjects = [];
  }

  /**
   * Load the desk GLTF file and parse objects
   * @param {string} path - Path to the GLTF file
   * @returns {Promise<Object>} Object containing scene and categorized objects
   */
  async load(path) {
    try {
      const gltf = await this.loader.loadAsync(path);
      const scene = gltf.scene;
      
      // Parse objects based on naming convention
      const categorizedObjects = this.categorizeObjects(scene);
      
      console.log('✅ GLTF Scene loaded successfully');
      console.log('📦 Interactive objects:', this.interactiveObjects.length);
      console.log('🎯 Clickable objects:', this.clickableObjects.length);
      
      return {
        scene,
        ...categorizedObjects,
        animations: gltf.animations || []
      };
    } catch (error) {
      console.error('❌ Failed to load GLTF:', error);
      throw error;
    }
  }

  /**
   * Categorize objects based on their names
   * Naming conventions:
   * - "Interactive*" - Objects with hover animation
   * - "Clickable*" - Objects with outline, tooltip, and click functionality
   * - "Toggle*" - Objects that can be toggled (like lights)
   */
  categorizeObjects(scene) {
    const objects = {
      interactive: [],
      clickable: [],
      toggleable: [],
      all: []
    };

    scene.traverse((object) => {
      if (!object.name) return;

      const name = object.name.toLowerCase();
      const userData = {
        originalName: object.name,
        id: this.getObjectId(object.name)
      };

      // Check for Interactive objects (hover animations)
      if (name.includes('interactive')) {
        userData.interactive = true;
        userData.hoverAnimation = true;
        object.userData = { ...object.userData, ...userData };
        objects.interactive.push(object);
        this.interactiveObjects.push(object);
      }

      // Check for Clickable objects (outline, tooltip, modal)
      if (name.includes('clickable')) {
        userData.clickable = true;
        userData.interactive = true; // Clickable objects are also interactive
        object.userData = { ...object.userData, ...userData };
        objects.clickable.push(object);
        this.clickableObjects.push(object);
      }

      // Check for Toggle objects (like lights)
      if (name.includes('toggle') || name.includes('desklight') || name.includes('light')) {
        userData.toggleable = true;
        userData.clickable = true;
        userData.interactive = true;
        userData.isOn = false; // Default state
        object.userData = { ...object.userData, ...userData };
        objects.toggleable.push(object);
        this.toggleObjects.push(object);
      }

      // Store specific object references by name
      if (name.includes('monitor')) {
        object.userData = { ...object.userData, id: 'monitor', interactive: true, clickable: true };
        objects.clickable.push(object);
      } else if (name.includes('phone')) {
        object.userData = { ...object.userData, id: 'phone', interactive: true, clickable: true };
        objects.clickable.push(object);
      } else if (name.includes('notebook')) {
        object.userData = { ...object.userData, id: 'notebook', interactive: true, clickable: true };
        objects.clickable.push(object);
      } else if (name.includes('poster')) {
        // Extract poster number (poster-1, poster-2, poster-3)
        const posterMatch = name.match(/poster[-_]?(\d+)/);
        const posterId = posterMatch ? `poster-${posterMatch[1]}` : 'poster-1';
        object.userData = { ...object.userData, id: posterId, interactive: true, clickable: true };
        objects.clickable.push(object);
      } else if (name.includes('keyboard')) {
        object.userData = { ...object.userData, id: 'keyboard', interactive: true, hoverAnimation: true };
        objects.interactive.push(object);
      } else if (name.includes('mouse') && !name.includes('pad')) {
        object.userData = { ...object.userData, id: 'mouse', interactive: true, hoverAnimation: true };
        objects.interactive.push(object);
      } else if (name.includes('macmini') || name.includes('mac')) {
        object.userData = { ...object.userData, id: 'macmini', interactive: true, hoverAnimation: true };
        objects.interactive.push(object);
      }

      objects.all.push(object);
    });

    // Remove duplicates
    objects.interactive = [...new Set(objects.interactive)];
    objects.clickable = [...new Set(objects.clickable)];
    objects.toggleable = [...new Set(objects.toggleable)];

    return objects;
  }

  /**
   * Extract a clean ID from object name
   */
  getObjectId(name) {
    return name
      .toLowerCase()
      .replace(/interactive/gi, '')
      .replace(/clickable/gi, '')
      .replace(/toggle/gi, '')
      .replace(/[_-]/g, '')
      .trim();
  }

  /**
   * Setup shadows for all meshes in the scene
   */
  setupShadows(scene) {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }

  /**
   * Create a placeholder desk scene for development
   * This creates simple geometry until the actual GLTF is ready
   */
  createPlaceholderScene() {
    const group = new THREE.Group();
    group.name = 'DeskScene';

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
    desk.name = 'Desk';
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
    floor.name = 'Floor';
    group.add(floor);

    // Wall
    const wallGeometry = new THREE.BoxGeometry(8, 5, 0.2);
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2a35,
      roughness: 0.9,
    });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(0, 2.5, -1.4);
    wall.receiveShadow = true;
    wall.name = 'Wall';
    group.add(wall);

    // Monitor (Clickable)
    const monitorGroup = new THREE.Group();
    monitorGroup.name = 'ClickableMonitor';
    const monitorGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.05);
    const monitorMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
    monitor.castShadow = true;
    
    const screenGeometry = new THREE.BoxGeometry(1.1, 0.7, 0.02);
    const screenMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a3a5a,
      emissive: 0x0a1a2a,
      emissiveIntensity: 0.5
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.025;
    
    const standGeometry = new THREE.CylinderGeometry(0.05, 0.1, 0.3);
    const stand = new THREE.Mesh(standGeometry, monitorMaterial);
    stand.position.set(0, -0.55, -0.1);
    
    monitorGroup.add(monitor);
    monitorGroup.add(screen);
    monitorGroup.add(stand);
    monitorGroup.position.set(0, 0.5, -0.3);
    monitorGroup.userData = { id: 'monitor', clickable: true, interactive: true };
    group.add(monitorGroup);

    // Keyboard (Interactive)
    const keyboardGroup = new THREE.Group();
    keyboardGroup.name = 'InteractiveKeyboard';
    const keyboardGeometry = new THREE.BoxGeometry(0.8, 0.05, 0.4);
    const keyboardMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.castShadow = true;
    keyboardGroup.add(keyboard);
    keyboardGroup.position.set(0, 0.08, 0.6);
    keyboardGroup.userData = { id: 'keyboard', interactive: true, hoverAnimation: true };
    group.add(keyboardGroup);

    // Mouse (Interactive)
    const mouseGroup = new THREE.Group();
    mouseGroup.name = 'InteractiveMouse';
    const mouseGeometry = new THREE.CapsuleGeometry(0.04, 0.06, 4, 8);
    const mouseMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const mouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    mouse.rotation.z = Math.PI / 2;
    mouse.castShadow = true;
    mouseGroup.add(mouse);
    mouseGroup.position.set(0.8, 0.08, 0.5);
    mouseGroup.userData = { id: 'mouse', interactive: true, hoverAnimation: true };
    group.add(mouseGroup);

    // Phone (Clickable)
    const phoneGroup = new THREE.Group();
    phoneGroup.name = 'ClickablePhone';
    const phoneGeometry = new THREE.BoxGeometry(0.15, 0.01, 0.3);
    const phoneMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
    const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
    phone.castShadow = true;
    
    const phoneScreenGeometry = new THREE.BoxGeometry(0.14, 0.005, 0.28);
    const phoneScreenMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x0a2a4a,
      emissive: 0x0a1a2a,
      emissiveIntensity: 0.3
    });
    const phoneScreen = new THREE.Mesh(phoneScreenGeometry, phoneScreenMaterial);
    phoneScreen.position.y = 0.01;
    
    phoneGroup.add(phone);
    phoneGroup.add(phoneScreen);
    phoneGroup.position.set(-1.5, 0.08, 0.3);
    phoneGroup.userData = { id: 'phone', clickable: true, interactive: true };
    group.add(phoneGroup);

    // Notebook (Clickable)
    const notebookGroup = new THREE.Group();
    notebookGroup.name = 'ClickableNotebook';
    const notebookGeometry = new THREE.BoxGeometry(0.4, 0.02, 0.5);
    const notebookMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const notebook = new THREE.Mesh(notebookGeometry, notebookMaterial);
    notebook.castShadow = true;
    notebookGroup.add(notebook);
    notebookGroup.position.set(-1.8, 0.06, -0.4);
    notebookGroup.rotation.y = Math.PI / 6;
    notebookGroup.userData = { id: 'notebook', clickable: true, interactive: true };
    group.add(notebookGroup);

    // Mac Mini (Interactive)
    const macGroup = new THREE.Group();
    macGroup.name = 'InteractiveMacMini';
    const macGeometry = new THREE.BoxGeometry(0.3, 0.08, 0.3);
    const macMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc,
      metalness: 0.7,
      roughness: 0.3
    });
    const mac = new THREE.Mesh(macGeometry, macMaterial);
    mac.castShadow = true;
    macGroup.add(mac);
    macGroup.position.set(1.8, 0.09, -0.5);
    macGroup.userData = { id: 'macmini', interactive: true, hoverAnimation: true };
    group.add(macGroup);

    // Desk Light (Toggle)
    const lightGroup = new THREE.Group();
    lightGroup.name = 'ToggleDeskLight';
    const lightBaseGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.02);
    const lightBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    const lightBase = new THREE.Mesh(lightBaseGeometry, lightBaseMaterial);
    
    const lightArmGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.6);
    const lightArm = new THREE.Mesh(lightArmGeometry, lightBaseMaterial);
    lightArm.position.y = 0.3;
    
    const lightHeadGeometry = new THREE.ConeGeometry(0.1, 0.15, 8);
    const lightHeadMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2a2a2a,
      emissive: 0x000000,
      emissiveIntensity: 0
    });
    const lightHead = new THREE.Mesh(lightHeadGeometry, lightHeadMaterial);
    lightHead.position.y = 0.65;
    lightHead.rotation.x = Math.PI;
    lightHead.name = 'LightHead';
    
    lightGroup.add(lightBase);
    lightGroup.add(lightArm);
    lightGroup.add(lightHead);
    lightGroup.position.set(-2.3, 0.05, 0.8);
    lightGroup.userData = { id: 'desklight', toggleable: true, clickable: true, interactive: true, isOn: false };
    group.add(lightGroup);

    // Posters (Clickable)
    for (let i = 1; i <= 3; i++) {
      const posterGroup = new THREE.Group();
      posterGroup.name = `ClickablePoster${i}`;
      const posterGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.02);
      const posterMaterial = new THREE.MeshStandardMaterial({ 
        color: [0x1a3a5a, 0x5a1a3a, 0x3a5a1a][i - 1]
      });
      const poster = new THREE.Mesh(posterGeometry, posterMaterial);
      poster.castShadow = true;
      posterGroup.add(poster);
      posterGroup.position.set(-2.5 + (i * 1.5), 3, -1.3);
      posterGroup.userData = { id: `poster-${i}`, clickable: true, interactive: true };
      group.add(posterGroup);
    }

    console.log('📦 Created placeholder desk scene');
    
    return {
      scene: group,
      interactive: group.children.filter(c => c.userData.interactive),
      clickable: group.children.filter(c => c.userData.clickable),
      toggleable: group.children.filter(c => c.userData.toggleable),
      all: group.children
    };
  }
}
