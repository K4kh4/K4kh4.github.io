# 3D Scene Objects - Naming Conventions

## Overview

The scene.glb file is loaded automatically by the GLTFLoader. Objects in your 3D scene are automatically detected and made interactive based on their names in Blender/3D software.

## File Location

- **Source file:** `/public/models/scene.glb`
- **Served from:** `/models/scene.glb` (after build)

## Naming Conventions

When creating objects in Blender or your 3D software, name them according to these conventions:

### 1. Interactive Objects (Hover Animation)
**Naming:** Include `Interactive` in the object name
- Example: `Interactive_Keyboard`, `InteractiveMouse`, `Interactive-Desk`
- **Behavior:** Object will have hover animation (slight bounce/scale)
- **Use for:** Decorative items, ambient objects

### 2. Clickable Objects (With Modal Content)
**Naming:** Include `Clickable` in the object name
- Example: `Clickable_Monitor`, `ClickablePhone`, `Clickable-Notebook`
- **Behavior:** 
  - Shows outline on hover
  - Shows tooltip with name
  - Opens modal with content when clicked
  - Camera zooms to object
- **Use for:** Portfolio items, project showcases

### 3. Toggleable Objects (Like Lights)
**Naming:** Include `Toggle`, `Light`, or `DeskLight` in the object name
- Example: `Toggle_DeskLight`, `DeskLight`, `Toggle-Lamp`
- **Behavior:**
  - Can be toggled on/off
  - Changes light intensity when clicked
- **Use for:** Lights, switches

### 4. Specific Named Objects (Auto-detected)

These object names are automatically detected and configured:

#### Portfolio/Clickable Items:
- **Monitor** - Main project display
  - Name contains: `monitor`
  - ID: `monitor`
  
- **Phone** - Mobile projects
  - Name contains: `phone`
  - ID: `phone`
  
- **Notebook** - Documentation/blog
  - Name contains: `notebook`
  - ID: `notebook`
  
- **Posters** - Individual projects
  - Name contains: `poster-1`, `poster-2`, `poster-3`
  - ID: `poster-1`, `poster-2`, `poster-3`

#### Interactive (Hover) Items:
- **Keyboard**
  - Name contains: `keyboard`
  - ID: `keyboard`
  
- **Mouse**
  - Name contains: `mouse` (but NOT `mousepad`)
  - ID: `mouse`
  
- **Mac Mini/Computer**
  - Name contains: `macmini` or `mac`
  - ID: `macmini`

## Example Object Names in Blender

```
✅ GOOD Examples:
- Clickable_Monitor
- Interactive_Keyboard
- Toggle_DeskLight
- Clickable_Phone
- poster-1
- poster-2
- Clickable_Notebook
- Interactive_Mouse
- DeskLight

❌ BAD Examples:
- Monitor (won't be detected)
- Key Board (space in name)
- light (generic, might not work)
```

## Content Configuration

After naming objects in your 3D file, configure their modal content in:
- `/src/data/portfolio.json`

Each clickable object needs a corresponding entry with the same ID:

```json
{
  "id": "monitor",
  "title": "My Project Name",
  "description": "Project description...",
  "image": "/assets/project-image.webp",
  ...
}
```

## Updating the Scene

1. **Edit your scene.glb file**
   - Open in Blender/3D software
   - Name objects according to conventions above
   - Export as `.glb`

2. **Replace the file:**
   ```bash
   # Copy your new scene.glb to:
   cp ~/Downloads/scene.glb public/models/scene.glb
   ```

3. **Test locally:**
   ```bash
   npm run dev
   # Open http://localhost:5173
   # Check browser console for loaded objects
   ```

4. **Build and deploy:**
   ```bash
   npm run build
   git add .
   git commit -m "Update 3D scene"
   git push
   ```

## Debugging

Open browser console to see loaded objects:
- `✅ GLTF Scene loaded successfully`
- `📦 Interactive objects: X`
- `🎯 Clickable objects: Y`

If objects aren't detected:
1. Check object names in Blender
2. Make sure names include the keywords (case-insensitive)
3. Check for typos in object names
4. Verify the object is a mesh (not empty, camera, light, etc.)

## Advanced: Custom Object Detection

To add custom object detection, edit:
- `/src/js/loaders/GLTFLoader.js`
- Look for the `categorizeObjects()` method
- Add custom name checks

Example:
```javascript
else if (name.includes('your-object')) {
  object.userData = { 
    ...object.userData, 
    id: 'your-object', 
    interactive: true, 
    clickable: true 
  };
  objects.clickable.push(object);
}
```
