# Quick Start Guide

## 🚀 Getting Your Portfolio Running

### Step 1: Install & Run

```bash
# Make sure you have the dependencies
npm install

# Start the development server
npm run dev
```

The site should open automatically at `http://localhost:5173`

### Step 2: What You'll See

Right now, you'll see a **placeholder desk scene** with geometric shapes representing each object. This is intentional - it's a fully functional version while you prepare your custom GLTF file.

**Working Features:**
- ✅ Hover over objects (keyboard, mouse, mac) - they animate
- ✅ Click on monitor, phone, notebook, or posters - camera zooms and modal opens
- ✅ Click desk light - toggles on/off
- ✅ Close modal - camera resets
- ✅ All interactions work with placeholder geometry

### Step 3: Add Your GLTF File

#### In Blender:

1. **Create Your Desk Scene**
   - Model: desk, monitor, keyboard, mouse, phone, notebook, mac mini, desk light, wall, 3 posters
   
2. **Name Objects Correctly** (VERY IMPORTANT!)
   ```
   ClickableMonitor
   ClickablePhone
   ClickableNotebook
   ClickablePoster1
   ClickablePoster2
   ClickablePoster3
   InteractiveKeyboard
   InteractiveMouse
   InteractiveMacMini
   ToggleDeskLight
   Desk
   Wall
   Floor
   ```

3. **Export as GLTF**
   - File → Export → glTF 2.0
   - Format: glTF Embedded (.gltf)
   - Include: Check "Apply Modifiers"
   - Geometry: Check "UVs", "Normals"
   - Materials: Check "Export"
   - Save to: `/public/models/mydesk.gltf`

4. **Update main.js**
   
   Open `/js/main.js` and find line ~75:
   
   ```javascript
   // REPLACE THIS:
   app.deskObjects = app.sceneLoader.createPlaceholderScene();
   
   // WITH THIS:
   app.deskObjects = await app.sceneLoader.load('/models/mydesk.gltf');
   ```

5. **Refresh** - Your custom scene should load!

### Step 4: Add Your Project Data

Edit `/data/portfolio.json`:

```json
{
  "monitor": {
    "projects": [
      {
        "title": "Your Awesome Game",
        "description": "What makes it awesome...",
        "logo": "/assets/game-logo.png",
        "tags": ["JavaScript", "WebGL", "Multiplayer"],
        "link": "https://yourgame.com",
        "github": "https://github.com/you/game"
      }
    ]
  }
}
```

**Categories:**
- `monitor` → Web Games
- `phone` → Mobile Games
- `poster-1`, `poster-2`, `poster-3` → Steam Games
- `notebook` → Other Projects (T-shirts, art, etc.)

### Step 5: Add Images

1. Create folder: `/public/assets/`
2. Add your logos and images
3. Reference them in portfolio.json: `"/assets/your-image.png"`

## 🎨 Customization

### Change Colors

Edit `/styles/main.css`:

```css
:root {
  --color-primary: #00ff88;    /* Green accent - change this! */
  --color-secondary: #0066ff;  /* Blue accent */
  --color-bg: #121218;         /* Dark background */
}
```

### Adjust Camera Position

Edit `/js/scene/CameraController.js`:

```javascript
// Line ~10
this.defaultPosition = new THREE.Vector3(0, 3, 8);
// Change: x (left/right), y (up/down), z (forward/back)
```

### Adjust Zoom Distance

Edit `/js/scene/CameraController.js`, find the `zoomToObject` method and adjust the `offset` values for each object.

## ✅ Testing Checklist

Before you deploy:

- [ ] All objects in GLTF are named correctly
- [ ] Hover animations work (keyboard, mouse, mac)
- [ ] Click interactions work (monitor, phone, notebook, posters)
- [ ] Desk light toggles on/off
- [ ] Modal opens with correct content for each object
- [ ] Camera zooms smoothly to objects
- [ ] Camera resets when modal closes
- [ ] All project links work
- [ ] Images load correctly
- [ ] Responsive on mobile (test with browser dev tools)

## 🐛 Troubleshooting

**Objects don't appear after loading GLTF:**
- Check object names match exactly (case-sensitive)
- Ensure objects aren't hidden in Blender
- Check browser console for errors

**Animations don't work:**
- Verify object names include "Interactive", "Clickable", or "Toggle"
- Check that GSAP is installed: `npm list gsap`

**Modal doesn't show content:**
- Check object IDs in portfolio.json match exactly
- Open browser console to see which ID is being used

**GLTF file too large:**
- Use Draco compression in Blender export
- Optimize textures (1K-2K resolution)
- Reduce polygon count

## 📚 Next Steps

1. Read `/public/models/README.md` for detailed GLTF instructions
2. Check `PROJECT_GUIDE.md` for complete documentation
3. Start modeling your desk in Blender!
4. Add your real project data

## 🆘 Need Help?

- Check the browser console for errors (F12)
- Review the example placeholder code in GLTFLoader.js
- Compare your object names with the examples
- Make sure all dependencies are installed: `npm install`

---

Happy building! 🚀
