# Three.js Interactive Globe Portfolio

A modern, interactive 3D globe experience built with Three.js, inspired by the Shopify BFCM globe.

## Features

- 🌍 Interactive 3D globe with custom shaders
- ✨ Particle system with ambient animations
- 🎨 Gradient materials and fresnel effects
- 🎮 Orbital controls with auto-rotation
- 📱 Fully responsive design
- ♿ Accessibility features (keyboard navigation, reduced motion)
- 🎯 Clean, modular architecture

## Project Structure

```
K4kh4.github.io/
├── index.html              # Main HTML entry point
├── styles/
│   └── main.css           # All styling (reset, layout, animations)
├── js/
│   ├── main.js            # Application initialization & animation loop
│   ├── components/
│   │   ├── Globe.js       # 3D globe with wireframe & dots
│   │   ├── Particles.js   # Ambient particle system
│   │   └── Lights.js      # Scene lighting setup
│   └── utils/
│       └── helpers.js     # Utility functions
├── assets/                # (Reserved for future images/models)
└── README.md              # This file
```

## Getting Started

### Option 1: Quick Start (No Build Required)

Simply open `index.html` in a modern web browser. The project uses ES modules and CDN imports for Three.js, so no build step is needed.

### Option 2: Local Development Server

For a better development experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Usage

- **Click and Drag**: Rotate the globe
- **Scroll**: Zoom in/out
- **Play/Pause Button**: Toggle animation
- **Auto-Rotation**: Enabled by default

## Customization

### Colors

Edit CSS variables in `styles/main.css`:

```css
:root {
  --color-primary: #00ff88;
  --color-secondary: #0066ff;
  --color-dark: #0a0a0f;
}
```

### Globe Appearance

Modify shader uniforms in `js/components/Globe.js`:

```javascript
uniforms: {
  color1: { value: new THREE.Color(0x0066ff) },
  color2: { value: new THREE.Color(0x00ff88) },
}
```

### Animation Speed

Adjust rotation speeds in `js/main.js`:

```javascript
app.globe.rotation.y += delta * 0.1;  // Globe speed
app.particles.rotation.y -= delta * 0.05;  // Particles speed
app.controls.autoRotateSpeed = 0.5;  // Auto-rotate speed
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Opera 76+

Requires ES6 modules and WebGL support.

## Performance

- Optimized for 60 FPS on modern devices
- Adaptive pixel ratio for high-DPI displays
- Efficient particle rendering with instancing
- Damped controls for smooth interactions

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Credits

- Inspired by [Shopify BFCM Globe](https://bfcm.shopify.com/)
- Built with [Three.js](https://threejs.org/)
- Created by K4kh4

## Future Enhancements

- [ ] Add data visualization on globe surface
- [ ] Interactive hotspots/markers
- [ ] Multiple globe themes
- [ ] Post-processing effects (bloom, SSAO)
- [ ] Touch gesture support
- [ ] Animation timeline controls
