/**
 * Globe Component
 * Creates an interactive 3D globe with wireframe styling
 */

import * as THREE from 'three';

export function createGlobe() {
  const group = new THREE.Group();

  // Main sphere with gradient material
  const geometry = new THREE.SphereGeometry(2, 64, 64);
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(0x0066ff) },
      color2: { value: new THREE.Color(0x00ff88) },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        // Fresnel effect
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        
        // Gradient based on position
        float mixValue = (vPosition.y + 2.0) / 4.0;
        vec3 color = mix(color1, color2, mixValue);
        
        // Combine with fresnel
        vec3 finalColor = color * (0.3 + fresnel * 0.7);
        
        gl_FragColor = vec4(finalColor, 0.9);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const sphere = new THREE.Mesh(geometry, material);
  group.add(sphere);

  // Wireframe overlay
  const wireframeGeometry = new THREE.IcosahedronGeometry(2.02, 2);
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
  group.add(wireframe);

  // Add latitude/longitude lines
  const latLonGroup = createLatLonLines();
  group.add(latLonGroup);

  // Add dots/points on surface
  const dots = createSurfaceDots();
  group.add(dots);

  return group;
}

function createLatLonLines() {
  const group = new THREE.Group();
  const radius = 2.01;
  const segments = 64;

  // Latitude lines
  for (let i = 0; i <= 8; i++) {
    const lat = (Math.PI / 8) * i - Math.PI / 2;
    const circleRadius = Math.cos(lat) * radius;
    const y = Math.sin(lat) * radius;

    const geometry = new THREE.CircleGeometry(circleRadius, segments);
    geometry.vertices.shift(); // Remove center vertex
    
    const material = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.15,
    });

    const points = [];
    for (let j = 0; j <= segments; j++) {
      const angle = (j / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * circleRadius,
          y,
          Math.sin(angle) * circleRadius
        )
      );
    }

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, material);
    group.add(line);
  }

  // Longitude lines
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const points = [];

    for (let j = 0; j <= segments; j++) {
      const lat = (j / segments) * Math.PI - Math.PI / 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * Math.cos(lat) * radius,
          Math.sin(lat) * radius,
          Math.sin(angle) * Math.cos(lat) * radius
        )
      );
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.15,
    });
    const line = new THREE.Line(geometry, material);
    group.add(line);
  }

  return group;
}

function createSurfaceDots() {
  const count = 500;
  const radius = 2.03;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const color1 = new THREE.Color(0x00ff88);
  const color2 = new THREE.Color(0x0066ff);

  for (let i = 0; i < count; i++) {
    // Random position on sphere surface
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Random color between color1 and color2
    const mixRatio = Math.random();
    const color = color1.clone().lerp(color2, mixRatio);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  });

  return new THREE.Points(geometry, material);
}
