# GLTF Model Instructions

## File Location
Place your GLTF file here: `/public/models/mydesk.gltf`

## Object Naming Conventions

Your GLTF file should contain objects with specific naming patterns. The system automatically detects and categorizes objects based on their names:

### 1. **Interactive Objects** (Hover Animation Only)
Objects that respond to hover with animations but are not clickable.

**Naming Pattern:** Include "Interactive" in the name
- Examples: `InteractiveKeyboard`, `InteractiveMouse`, `InteractiveMacMini`

**Behavior:**
- Plays hover animation (bounce/move)
- No outline
- No modal on click

### 2. **Clickable Objects** (Portfolio Items)
Objects that show outline on hover, open modal with portfolio content when clicked.

**Naming Pattern:** Include "Clickable" in the name
- Examples: `ClickableMonitor`, `ClickablePhone`, `ClickableNotebook`

**Behavior:**
- Shows green outline on hover
- Displays tooltip with name
- Camera zooms to object on click
- Opens modal with portfolio projects

**Required Objects:**
- `ClickableMonitor` - Web Games portfolio
- `ClickablePhone` - Mobile Games portfolio
- `ClickableNotebook` - Other Projects (T-shirts, artwork)
- `ClickablePoster1` or `ClickablePoster-1` - Steam Game 1
- `ClickablePoster2` or `ClickablePoster-2` - Steam Game 2
- `ClickablePoster3` or `ClickablePoster-3` - Steam Game 3

### 3. **Toggle Objects** (Interactive Elements)
Objects that can be toggled on/off (like lights).

**Naming Pattern:** Include "Toggle" or "Light" in the name
- Examples: `ToggleDeskLight`, `DeskLight`

**Behavior:**
- Clickable
- Shows outline on hover
- Toggles on/off when clicked
- Changes emissive properties

### 4. **Recommended Object Names**

#### Interactive (Hover Only):
```
InteractiveKeyboard
InteractiveMouse
InteractiveMacMini
```

#### Clickable (Portfolio):
```
ClickableMonitor
ClickablePhone
ClickableNotebook
ClickablePoster1
ClickablePoster2
ClickablePoster3
```

#### Toggle:
```
ToggleDeskLight
```

#### Static (No Interaction):
```
Desk
DeskSurface
Floor
Wall
```

## Example Blender Setup

In Blender, organize your objects like this:

```
Scene
├── Desk
├── Floor
├── Wall
├── InteractiveKeyboard
│   ├── KeyboardBase (mesh)
│   └── Keys (mesh)
├── InteractiveMouse
│   └── MouseBody (mesh)
├── InteractiveMacMini
│   └── MacBody (mesh)
├── ClickableMonitor
│   ├── MonitorStand (mesh)
│   ├── MonitorFrame (mesh)
│   └── Screen (mesh)
├── ClickablePhone
│   ├── PhoneBody (mesh)
│   └── PhoneScreen (mesh)
├── ClickableNotebook
│   ├── NotebookCover (mesh)
│   └── Pages (mesh)
├── ClickablePoster1
│   └── PosterMesh (mesh)
├── ClickablePoster2
│   └── PosterMesh (mesh)
├── ClickablePoster3
│   └── PosterMesh (mesh)
└── ToggleDeskLight
    ├── LightBase (mesh)
    ├── LightArm (mesh)
    └── LightHead (mesh)  ← Important: Name this "LightHead" for toggle to work
```

## Material Setup

### Emissive Materials (for screens and lights)
Objects that should glow (like monitor screens, phone screens, and lights):
1. Add Emission shader or set emissive properties
2. Set base emissive color
3. The system will automatically control emissive intensity for lights

### PBR Materials
For realistic rendering:
- Use Roughness and Metallic properties
- Add Normal maps for detail
- Use appropriate Base Color textures

## Loading Your GLTF

Once your file is ready, update this line in `/js/main.js`:

```javascript
// Change from:
app.deskObjects = app.sceneLoader.createPlaceholderScene();

// To:
app.deskObjects = await app.sceneLoader.load('/models/mydesk.gltf');
```

## Testing Checklist

- [ ] All objects are named correctly
- [ ] Interactive objects have hover animations
- [ ] Clickable objects show outline and open modal
- [ ] Poster numbers match (poster-1, poster-2, poster-3)
- [ ] Light head is named "LightHead" for toggle functionality
- [ ] All materials are properly set up
- [ ] File size is optimized (use Draco compression if needed)
- [ ] Textures are embedded or referenced correctly

## Optimization Tips

1. **Reduce Polygon Count:** Keep objects under 50k triangles total
2. **Texture Size:** Use 2K textures max, 1K for smaller objects
3. **Compression:** Use Draco compression for smaller file size
4. **Combine Meshes:** Merge static objects where possible
5. **Remove Hidden Faces:** Delete faces that aren't visible

## File Size Guidelines

Target file sizes:
- **Without textures:** < 5 MB
- **With textures:** < 20 MB
- **With Draco compression:** Can reduce by 50-70%

## Troubleshooting

**Objects not appearing:**
- Check object names match the conventions
- Ensure objects are visible in Blender (eye icon)
- Check scale (shouldn't be too large or too small)

**Animations not working:**
- Verify naming includes "Interactive", "Clickable", or "Toggle"
- Check that parent groups are named, not just child meshes

**Textures missing:**
- Embed textures in GLTF on export
- Or ensure texture files are in `/public/models/` folder
- Use relative paths for textures

**Performance issues:**
- Reduce polygon count
- Optimize texture sizes
- Use Draco compression
- Combine static meshes
