/**
 * Particles Component
 * Creates ambient floating particles around the scene
 */

import * as THREE from 'three';

export function createParticles() {
  const count = 2000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const color1 = new THREE.Color(0x00ff88);
  const color2 = new THREE.Color(0x0066ff);
  const color3 = new THREE.Color(0xffffff);

  for (let i = 0; i < count; i++) {
    // Random position in a sphere
    const radius = 5 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Random color
    const rand = Math.random();
    let color;
    if (rand < 0.33) {
      color = color1;
    } else if (rand < 0.66) {
      color = color2;
    } else {
      color = color3;
    }

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    // Random size
    sizes[i] = Math.random() * 2 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      pixelRatio: { value: window.devicePixelRatio },
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float pixelRatio;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        // Circular particle shape
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        
        if (dist > 0.5) {
          discard;
        }
        
        // Soft edges
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        alpha *= 0.6;
        
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}
