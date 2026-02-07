# K4kh4's Interactive 3D Portfolio

[![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

An immersive 3D portfolio website featuring an interactive desk scene where each object tells a story about my work - from web games to mobile apps, Steam releases to creative projects.

## ✨ Features

- 🎮 **Interactive 3D Desk Scene** - Explore objects with hover effects and click interactions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎬 **Smooth Animations** - GSAP-powered transitions and camera movements
- 🎯 **Smart Object Detection** - Automatic categorization based on GLTF naming conventions
- 📊 **Project Showcase** - Modals with detailed portfolio information
- 💡 **Fun Interactions** - Toggle desk light, animated objects, and more
- 🚀 **Optimized Performance** - Fast loading and smooth 60fps rendering

## 🎯 Live Demo

[View Live Portfolio →](https://k4kh4.github.io)

## 🖼️ Preview

*Coming soon - Add screenshots/GIFs of your portfolio in action*

## 🏗️ Project Structure

```
📦 Portfolio
├── 📁 public/
│   └── 📁 models/          # GLTF 3D models
├── 📁 data/
│   └── portfolio.json      # Project data
├── 📁 js/
│   ├── main.js            # App entry point
│   ├── 📁 scene/          # Three.js scene setup
│   ├── 📁 loaders/        # GLTF loader
│   ├── 📁 interactions/   # User interactions
│   ├── 📁 animations/     # GSAP animations
│   └── 📁 ui/             # UI management
└── 📁 styles/
    └── main.css           # Styling
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/K4kh4/K4kh4.github.io.git

# Navigate to project directory
cd K4kh4.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization

### 1. Add Your 3D Scene

Create your desk scene in Blender following the naming conventions:

**Interactive Objects (Hover):**
- `InteractiveKeyboard`
- `InteractiveMouse`
- `InteractiveMacMini`

**Clickable Objects (Portfolio):**
- `ClickableMonitor` → Web Games
- `ClickablePhone` → Mobile Games
- `ClickableNotebook` → Other Projects
- `ClickablePoster1` → Steam Game 1
- `ClickablePoster2` → Steam Game 2
- `ClickablePoster3` → Steam Game 3

**Toggle Objects:**
- `ToggleDeskLight` → Interactive light

See `/public/models/README.md` for detailed GLTF setup instructions.

### 2. Update Portfolio Content

Edit `/data/portfolio.json` with your projects:

```json
{
  "monitor": {
    "category": "Web Games",
    "projects": [
      {
        "title": "Your Game",
        "description": "Game description",
        "logo": "/assets/logo.png",
        "tags": ["JavaScript", "WebGL"],
        "link": "https://your-game.com"
      }
    ]
  }
}
```

### 3. Customize Styling

Edit colors in `/styles/main.css`:

```css
:root {
  --color-primary: #00ff88;    /* Accent color */
  --color-secondary: #0066ff;  /* Secondary accent */
  --color-bg: #121218;         /* Background */
}
```

## 🎮 Object Interaction System

The portfolio uses a smart naming-based interaction system:

| Prefix | Behavior | Example |
|--------|----------|---------|
| `Interactive*` | Hover animation | Keyboard bounces |
| `Clickable*` | Opens modal + zoom | Monitor shows web games |
| `Toggle*` | On/off toggle | Desk light switches |

## 📊 Tech Stack

- **[Three.js](https://threejs.org/)** - 3D rendering engine
- **[GSAP](https://greensock.com/)** - Professional-grade animations
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **Vanilla JavaScript** - No framework bloat

## 📁 Key Files

| File | Purpose |
|------|---------|
| `/js/main.js` | Application initialization and event handling |
| `/js/loaders/GLTFLoader.js` | Loads and parses GLTF scene |
| `/js/interactions/InteractionManager.js` | Handles raycasting and hover effects |
| `/js/animations/AnimationManager.js` | Manages all animations |
| `/js/scene/CameraController.js` | Camera zoom and movement |
| `/js/ui/UIManager.js` | Tooltip and modal management |
| `/data/portfolio.json` | All portfolio project data |

## 🎯 Roadmap

- [ ] Add actual GLTF desk scene
- [ ] Populate portfolio with real projects
- [ ] Add sound effects for interactions
- [ ] Implement loading progress bar
- [ ] Add keyboard navigation
- [ ] Create mobile-optimized camera controls
- [ ] Add analytics tracking
- [ ] Implement i18n for multiple languages

## 🐛 Known Issues

- Placeholder scene is currently used (waiting for custom GLTF)
- Some project images are placeholders
- Mobile performance needs optimization

## 📝 Development Notes

See `PROJECT_GUIDE.md` for detailed development documentation, including:
- Complete project structure breakdown
- GLTF object naming conventions
- Data structure format
- Customization guide
- Troubleshooting tips

## 🤝 Contributing

This is a personal portfolio, but feel free to:
- Report bugs via issues
- Suggest improvements
- Fork for your own portfolio
- Star if you find it useful! ⭐

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Three.js community for amazing 3D engine
- GSAP for smooth animations
- Cursor AI for development assistance

---

**Built with 💚 by K4kh4**

[Portfolio](https://k4kh4.github.io) • [GitHub](https://github.com/K4kh4) • [Twitter](https://twitter.com/k4kh4)
