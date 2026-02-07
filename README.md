# Three.js Interactive Desk Portfolio

A modern, interactive 3D desk workspace built with Three.js. Explore a virtual desk with clickable objects, hover effects, and detailed information modals.

## Features

- 🖥️ Interactive 3D desk scene with realistic objects
- 🎯 Hover effects with outline highlighting
- 💬 Tooltip that follows cursor showing object names
- 📱 Click objects to open detailed information modals
- 📝 Editable object data via JSON files
- 🎨 Dynamic camera that follows mouse movement
- 🌟 Realistic lighting and shadows
- 🎯 Clean, modular architecture

## Project Structure

```
K4kh4.github.io/
├── index.html              # Main HTML entry point
├── styles/
│   └── main.css           # Complete styling (tooltip, modal, animations)
├── js/
│   ├── main.js            # Application initialization & animation loop
│   ├── scene/
│   │   ├── Scene.js       # Scene setup
│   │   ├── Camera.js      # Camera configuration
│   │   ├── Renderer.js    # WebGL renderer setup
│   │   └── Lights.js      # Lighting setup
│   ├── objects/
│   │   ├── Desk.js        # Main desk and layout
│   │   ├── Monitor.js     # Monitor object
│   │   ├── Keyboard.js    # Keyboard object
│   │   ├── Mouse.js       # Mouse object
│   │   ├── Phone.js       # Phone object
│   │   ├── Notebook.js    # Notebook object
│   │   └── Wall.js        # Wall with posters
│   ├── interactions/
│   │   └── InteractionManager.js  # Raycasting & hover effects
│   ├── ui/
│   │   └── UIManager.js   # Tooltip & modal management
│   └── utils/
│       └── helpers.js     # Utility functions
├── data/
│   └── objects.json       # Object details (EDIT THIS!)
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

This will open the project at `http://localhost:3000` with automatic browser refresh on file changes.

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` folder.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Usage

- **Move Mouse**: Camera follows your cursor movement
- **Hover Objects**: See object name in tooltip and outline effect
- **Click Objects**: Open detailed information modal
- **ESC Key**: Close modal
- **Click Outside Modal**: Close modal

## Customization

### Edit Object Details

All object information is stored in `data/objects.json`. Edit this file to update:
- Titles and descriptions
- Specifications
- Links

```json
{
  "monitor": {
    "title": "Monitor",
    "description": "Your description here",
    "specs": [
      { "label": "Resolution", "value": "2560 x 1440" }
    ],
    "link": { "text": "View Specs", "url": "#" }
  }
}
```

### Colors

Edit CSS variables in `styles/main.css`:

```css
:root {
  --color-primary: #00ff88;
  --color-secondary: #0066ff;
}
```

### Camera Sensitivity

Adjust in `js/main.js`:

```javascript
const targetX = app.mouse.x * 0.5;  // Change 0.5 to adjust horizontal sensitivity
const targetY = -app.mouse.y * 0.3; // Change 0.3 to adjust vertical sensitivity
```

### Object Positions

Edit object positions in `js/objects/Desk.js`:

```javascript
monitor.position.set(0, 0.05, -0.3);  // x, y, z coordinates
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

## Interactive Objects

The desk includes:
- 🖥️ **Monitor** - Your main display
- ⌨️ **Keyboard** - Mechanical keyboard
- 🖱️ **Mouse** - Precision gaming mouse
- 📱 **Phone** - Mobile device
- 📓 **Notebook** - Paper notebook
- 🖼️ **Posters** (3x) - Wall decorations

All objects are clickable and have detailed information!

## Credits

- Built with [Three.js](https://threejs.org/)
- Bundled with [Vite](https://vitejs.dev/)
- Created by K4kh4

## Future Enhancements

- [ ] Add GLTF model loading for more realistic objects
- [ ] Implement post-processing effects (bloom, SSAO)
- [ ] Add background music/ambient sounds
- [ ] Create multiple desk themes
- [ ] Add animated transitions between views
- [ ] Implement touch controls for mobile
