# K4kh4's Portfolio - 3D Interactive Desk

An interactive 3D portfolio website featuring a desk scene where each object represents different categories of work (web games, mobile games, Steam games, and other projects).

## 🎯 Project Overview

This portfolio uses Three.js to create an immersive 3D desk environment where visitors can explore your work by interacting with objects on the desk. Each object is clickable and opens a modal with detailed project information.

## 📁 Project Structure

```
K4kh4.github.io/
├── index.html                      # Main HTML file
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── public/
│   └── models/
│       ├── mydesk.gltf            # Your custom desk scene (TO ADD)
│       └── README.md              # GLTF setup instructions
├── data/
│   └── portfolio.json             # Portfolio project data
├── js/
│   ├── main.js                    # Application entry point
│   ├── scene/
│   │   ├── Scene.js              # Scene setup
│   │   ├── Camera.js             # Camera creation
│   │   ├── CameraController.js   # Camera zoom & movement
│   │   ├── Renderer.js           # WebGL renderer
│   │   └── Lights.js             # Scene lighting
│   ├── loaders/
│   │   └── GLTFLoader.js         # GLTF loader with object parsing
│   ├── interactions/
│   │   └── InteractionManager.js # Raycasting & hover effects
│   ├── animations/
│   │   └── AnimationManager.js   # Object animations
│   ├── ui/
│   │   └── UIManager.js          # Tooltip & modal management
│   └── utils/
│       └── helpers.js            # Utility functions
└── styles/
    └── main.css                  # Styles for UI elements
```

## 🎮 Object Interaction System

### Object Types

The system recognizes three types of objects based on naming conventions in your GLTF file:

#### 1. **Interactive Objects** (Hover Animation)
- **Naming:** Include "Interactive" in the name
- **Examples:** `InteractiveKeyboard`, `InteractiveMouse`, `InteractiveMacMini`
- **Behavior:** Hover animation only, no click functionality

#### 2. **Clickable Objects** (Portfolio Items)
- **Naming:** Include "Clickable" in the name
- **Examples:** `ClickableMonitor`, `ClickablePhone`, `ClickableNotebook`
- **Behavior:** 
  - Green outline on hover
  - Tooltip with name
  - Camera zooms to object on click
  - Opens modal with portfolio projects

#### 3. **Toggle Objects** (Interactive Elements)
- **Naming:** Include "Toggle" or "Light" in the name
- **Example:** `ToggleDeskLight`
- **Behavior:** Click to toggle on/off (changes emissive properties)

## 📊 Portfolio Data Structure

Portfolio data is stored in `/data/portfolio.json`. Each object maps to categories:

### Categories

| Object | Category | Content |
|--------|----------|---------|
| Monitor | Web Games | Browser-based games |
| Phone | Mobile Games | iOS/Android games |
| Poster 1-3 | Steam Games | Individual Steam games (each poster = 1 game) |
| Notebook | Other Projects | T-shirt designs, artwork, non-game projects |
| Desk Light | Interactive | Toggle on/off for fun |
| Keyboard/Mouse/Mac | Hover Only | Simple hover animations |

### Data Format

```json
{
  "monitor": {
    "id": "monitor",
    "category": "Web Games",
    "title": "Web Games Portfolio",
    "description": "My collection of browser-based games",
    "projects": [
      {
        "id": "web-game-1",
        "title": "Game Title",
        "description": "Game description...",
        "logo": "/assets/logo.png",
        "tags": ["JavaScript", "HTML5"],
        "link": "https://game-url.com",
        "github": "https://github.com/user/repo"
      }
    ]
  }
}
```

## 🎨 Features

### Camera System
- **Free Movement:** Camera follows mouse when not zoomed
- **Zoom:** Automatically zooms to objects when clicked
- **Reset:** Click empty space or close modal to reset camera

### Animation System
- **Bounce Animation:** Objects lift up and down (keyboard, mac)
- **Move Animation:** Simple forward/backward movement (mouse)
- **Scale Animation:** Subtle scale up on hover
- **Toggle:** Light switches on/off with emissive changes

### Modal System
- **Right-side Panel:** Slides in from the right
- **Scrollable Content:** Can display multiple projects per category
- **Project Cards:** Each project has logo, description, tags, and links
- **Responsive:** Works on desktop and mobile

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding Your GLTF File

1. Create your desk scene in Blender following naming conventions (see `/public/models/README.md`)
2. Export as GLTF 2.0 with embedded textures
3. Save to `/public/models/mydesk.gltf`
4. Update `/js/main.js` to load your GLTF:

```javascript
// Line ~75, replace:
app.deskObjects = app.sceneLoader.createPlaceholderScene();

// With:
app.deskObjects = await app.sceneLoader.load('/models/mydesk.gltf');
```

### Updating Portfolio Content

Edit `/data/portfolio.json` to add your projects:

1. **Web Games:** Add to `monitor.projects[]`
2. **Mobile Games:** Add to `phone.projects[]`
3. **Steam Games:** Update `poster-1`, `poster-2`, `poster-3`
4. **Other Projects:** Add to `notebook.projects[]`

## 🎯 Required GLTF Objects

Your GLTF file must contain these objects:

- `ClickableMonitor` - Web games category
- `ClickablePhone` - Mobile games category
- `ClickableNotebook` - Other projects category
- `ClickablePoster1` - Steam game 1
- `ClickablePoster2` - Steam game 2
- `ClickablePoster3` - Steam game 3
- `InteractiveKeyboard` - Hover animation
- `InteractiveMouse` - Hover animation
- `InteractiveMacMini` - Hover animation
- `ToggleDeskLight` - On/off toggle
- `Desk` - Desk surface
- `Floor` - Floor plane
- `Wall` - Back wall

## 🛠 Technologies Used

- **Three.js** - 3D rendering
- **GSAP** - Smooth animations
- **Vite** - Build tool and dev server
- **Vanilla JavaScript** - No framework dependencies

## 📝 TODO

- [ ] Create GLTF desk scene in Blender
- [ ] Add actual project data to portfolio.json
- [ ] Add project logos/images to `/public/assets/`
- [ ] Test all interactions
- [ ] Optimize GLTF file size
- [ ] Add loading progress indicator
- [ ] Test on mobile devices

## 🎨 Customization

### Colors
Edit CSS variables in `/styles/main.css`:

```css
:root {
  --color-primary: #00ff88;      /* Green accent */
  --color-secondary: #0066ff;    /* Blue accent */
  --color-bg: #121218;           /* Background */
  --color-text: #ffffff;         /* Text color */
}
```

### Camera Position
Edit `/js/scene/CameraController.js`:

```javascript
this.defaultPosition = new THREE.Vector3(0, 3, 8); // x, y, z
```

### Animation Timings
Edit `/js/animations/AnimationManager.js` to adjust animation durations and easing.

## 📄 License

MIT License - Feel free to use this for your own portfolio!

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and adapt for your own use!

---

**Made with ❤️ by K4kh4**
