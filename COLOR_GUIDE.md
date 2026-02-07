# Color Configuration Guide

## Overview

All UI colors are now stored in a JSON file for easy customization. Change the entire look of your portfolio by editing one file!

## Files

- **`/data/colors.json`** - Color configuration file
- **`/js/utils/ThemeManager.js`** - Loads and applies colors
- **`/styles/main.css`** - Uses CSS variables from ThemeManager

## Quick Start

### Changing the Color Scheme

Edit `/data/colors.json`:

```json
{
  "colors": {
    "primary": {
      "main": "#00ff88",  // Change this!
      "rgb": "0, 255, 136"
    },
    "secondary": {
      "main": "#0066ff",  // And this!
      "rgb": "0, 102, 255"
    }
  }
}
```

**Save and refresh** - colors update automatically!

## Color Structure

### Primary Colors

```json
"primary": {
  "main": "#00ff88",              // Main accent color
  "rgb": "0, 255, 136",           // RGB values for alpha blending
  "description": "Primary accent color"
}
```

**Used for:**
- Buttons and links
- Borders and outlines
- Interactive element highlights
- Tooltips
- Navigation buttons

### Secondary Colors

```json
"secondary": {
  "main": "#0066ff",              // Secondary accent
  "rgb": "0, 102, 255",
  "description": "Secondary accent color"
}
```

**Used for:**
- Gradient endpoints
- Secondary buttons
- Hover states
- Scrollbar hover

### Background Colors

```json
"background": {
  "main": "#121218",              // Main scene background
  "dark": "#0a0a0f",              // Darkest areas
  "light": "#1a1a24",             // Lighter panels
  "gradient": {
    "start": "#1a1a24",           // Modal gradient start
    "end": "#0f0f18"              // Modal gradient end
  }
}
```

**Used for:**
- Scene background
- Modal panels
- Loading screen
- Dark overlays

### Text Colors

```json
"text": {
  "primary": "#ffffff",           // Main text
  "secondary": "#a0a0b0",         // Muted text
  "description": "Text colors"
}
```

**Used for:**
- Headers and titles
- Body text
- Descriptions
- Labels

### UI Elements

```json
"ui": {
  "modalBorder": {
    "color": "#00ff88",
    "alpha": 0.3                  // 30% opacity
  },
  "button": {
    "background": { "alpha": 0.1 },
    "backgroundHover": { "alpha": 0.2 },
    "border": { "alpha": 0.3 }
  }
}
```

**Alpha values** control transparency (0 = invisible, 1 = solid).

## Color Mapping

### Where Each Color is Used

| Color | CSS Variable | Usage |
|-------|--------------|-------|
| `primary.main` | `--color-primary` | Buttons, borders, highlights |
| `secondary.main` | `--color-secondary` | Gradients, secondary actions |
| `background.main` | `--color-bg` | Scene background |
| `ui.dark` | `--color-dark` | Dark elements |
| `text.primary` | `--color-text` | Main text |
| `text.secondary` | `--color-text-secondary` | Muted text |

### Hard-coded Colors in CSS

Some colors are directly in CSS with alpha values:

```css
/* Tooltip background */
background: rgba(0, 0, 0, 0.9);

/* Modal border */
border-left: 2px solid rgba(0, 255, 136, 0.3);

/* Button background */
background: rgba(0, 255, 136, 0.1);
```

**To change these:** Update the RGB values in colors.json, then update the corresponding rgba() values in main.css.

## Preset Color Schemes

### Dark Green (Default)

```json
"primary": { "main": "#00ff88" },
"secondary": { "main": "#0066ff" }
```

### Purple Theme

```json
"primary": { "main": "#9d4edd", "rgb": "157, 78, 221" },
"secondary": { "main": "#c77dff", "rgb": "199, 125, 255" }
```

### Orange Theme

```json
"primary": { "main": "#ff6b35", "rgb": "255, 107, 53" },
"secondary": { "main": "#f7931e", "rgb": "247, 147, 30" }
```

### Cyan Theme

```json
"primary": { "main": "#00d9ff", "rgb": "0, 217, 255" },
"secondary": { "main": "#7000ff", "rgb": "112, 0, 255" }
```

### Red Theme

```json
"primary": { "main": "#ff0055", "rgb": "255, 0, 85" },
"secondary": { "main": "#ff006e", "rgb": "255, 0, 110" }
```

## Three.js Colors

Colors used in the 3D scene:

```json
"threejs": {
  "scene": {
    "background": "#121218",
    "fog": {
      "color": "#121218",
      "near": 8,
      "far": 20
    }
  },
  "objects": {
    "outline": {
      "color": "#00ff88"
    }
  }
}
```

**Update Scene.js** if you want to load these dynamically:

```javascript
import colorConfig from '../../data/colors.json';

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(colorConfig.threejs.scene.background);
  scene.fog = new THREE.Fog(
    colorConfig.threejs.scene.fog.color,
    colorConfig.threejs.scene.fog.near,
    colorConfig.threejs.scene.fog.far
  );
  return scene;
}
```

## Advanced Usage

### Using ThemeManager in JavaScript

```javascript
import { themeManager } from './utils/ThemeManager.js';

// Get a color
const primary = themeManager.getColor('primary.main');
console.log(primary); // "#00ff88"

// Get RGBA color
const buttonBg = themeManager.getRGBA('primary', 0.2);
console.log(buttonBg); // "rgba(0, 255, 136, 0.2)"

// Update a color dynamically
themeManager.updateColor('primary.main', '#ff0055');

// Get theme info
const info = themeManager.getThemeInfo();
console.log(info.name); // "Default Theme"

// Export colors
const json = themeManager.exportColors();
console.log(json);
```

### Programmatic Theme Switching

Create multiple theme files:

```
/data/
  colors.json          (default)
  colors-dark.json     (dark theme)
  colors-light.json    (light theme)
  colors-custom.json   (your custom theme)
```

Load different themes at runtime (would require additional code).

## Tips for Choosing Colors

### Good Contrast

Ensure text is readable against backgrounds:
- Light text on dark backgrounds
- Dark text on light backgrounds
- Check contrast ratio: https://contrast-ratio.com/

### Color Harmony

Use tools to find complementary colors:
- https://coolors.co/ - Color scheme generator
- https://colorhunt.co/ - Color palettes
- https://paletton.com/ - Advanced color wheel

### Accessibility

Consider colorblind users:
- Don't rely only on color to convey information
- Use sufficient contrast
- Test with colorblind simulators

### Brand Consistency

Match your brand colors:
1. Extract hex codes from your logo
2. Set as primary/secondary colors
3. Adjust brightness for backgrounds

## Updating CSS to Use JSON Colors

Currently, CSS uses variables that are set by ThemeManager:

```css
/* CSS reads from CSS variables */
.button {
  color: var(--color-primary);
  background: rgba(0, 255, 136, 0.1);
}
```

**To fully sync with JSON:**

1. Update RGB values in JSON
2. Update matching rgba() in CSS
3. Or generate CSS dynamically (advanced)

## Color Naming Convention

```json
"element": {
  "main": "#hexcode",           // Main color
  "rgb": "r, g, b",             // RGB values
  "alpha": 0.5,                 // Optional alpha
  "description": "Usage info"
}
```

## Troubleshooting

**Colors not updating:**
- Clear browser cache (Cmd/Ctrl + Shift + R)
- Check console for errors
- Verify JSON syntax is valid

**Colors look wrong:**
- Check RGB values match hex code
- Verify alpha values (0-1 range)
- Ensure CSS variables are correct

**Theme not applying:**
- Check ThemeManager is imported in main.js
- Verify applyTheme() is called
- Look for console log: "✨ Theme applied"

## Future Enhancements

Potential additions:
- [ ] Multiple theme files
- [ ] Theme switcher UI
- [ ] Dark/light mode toggle
- [ ] Custom theme editor
- [ ] Theme preview
- [ ] Export/import themes
- [ ] Generate CSS from JSON automatically

---

**Location:** `/data/colors.json`

**Auto-reloads:** Yes, with Vite hot reload! 🔥
