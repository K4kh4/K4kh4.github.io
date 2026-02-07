# Camera Position Configuration Guide

## Quick Reference

All camera positions are configured in: `/js/scene/CameraController.js`

Look for the `CAMERA_OFFSETS` object at the top of the file (around line 10).

## Understanding the Coordinates

```javascript
offset: new THREE.Vector3(X, Y, Z)
```

- **X axis** (left/right):
  - Negative values = LEFT (towards center)
  - Positive values = RIGHT (away from modal)
  - Example: `-2` means 2 units to the left

- **Y axis** (up/down):
  - Positive values = UP
  - Negative values = DOWN
  - Example: `0.5` means half a unit up

- **Z axis** (forward/back):
  - Positive values = CLOSER to object
  - Negative values = FURTHER from object
  - Example: `2.5` means 2.5 units away from object

## Current Configuration

```javascript
const CAMERA_OFFSETS = {
  'monitor': {
    offset: new THREE.Vector3(-2, 0.5, 2.5),  // Left, slightly up, medium distance
    duration: 1,      // Animation duration in seconds
    ease: 'power2.inOut'  // Animation easing
  },
  'phone': {
    offset: new THREE.Vector3(-1.5, 1, 2),    // Left, up, closer
    duration: 1,
    ease: 'power2.inOut'
  },
  'notebook': {
    offset: new THREE.Vector3(-1.5, 1.5, 2),  // Left, high, closer
    duration: 1,
    ease: 'power2.inOut'
  },
  'poster-1': {
    offset: new THREE.Vector3(-2, 0, 3.5),    // Left, center height, far
    duration: 1,
    ease: 'power2.inOut'
  },
  'poster-2': {
    offset: new THREE.Vector3(-2, 0, 3.5),    // Same as poster-1
    duration: 1,
    ease: 'power2.inOut'
  },
  'poster-3': {
    offset: new THREE.Vector3(-2, 0, 3.5),    // Same as poster-1
    duration: 1,
    ease: 'power2.inOut'
  },
  'default': {
    offset: new THREE.Vector3(-2, 1, 2.5),    // Default for unlisted objects
    duration: 1,
    ease: 'power2.inOut'
  }
};
```

## How to Adjust

### Example: Move Monitor Camera More to the Left

**Before:**
```javascript
'monitor': {
  offset: new THREE.Vector3(-2, 0.5, 2.5),
  duration: 1,
  ease: 'power2.inOut'
}
```

**After (more left):**
```javascript
'monitor': {
  offset: new THREE.Vector3(-3, 0.5, 2.5),  // Changed -2 to -3
  duration: 1,
  ease: 'power2.inOut'
}
```

### Example: Make Camera Closer to Phone

**Before:**
```javascript
'phone': {
  offset: new THREE.Vector3(-1.5, 1, 2),
  duration: 1,
  ease: 'power2.inOut'
}
```

**After (closer):**
```javascript
'phone': {
  offset: new THREE.Vector3(-1.5, 1, 1.5),  // Changed 2 to 1.5
  duration: 1,
  ease: 'power2.inOut'
}
```

### Example: Adjust Poster Height

**Before:**
```javascript
'poster-1': {
  offset: new THREE.Vector3(-2, 0, 3.5),
  duration: 1,
  ease: 'power2.inOut'
}
```

**After (higher):**
```javascript
'poster-1': {
  offset: new THREE.Vector3(-2, 1, 3.5),  // Changed 0 to 1
  duration: 1,
  ease: 'power2.inOut'
}
```

## Animation Settings

### Duration
Controls how long the camera takes to move:
- `0.5` = Fast (half second)
- `1` = Normal (one second) ← Default
- `1.5` = Slow (1.5 seconds)
- `2` = Very slow (2 seconds)

### Easing
Controls how the camera accelerates/decelerates:
- `'power2.inOut'` = Smooth start and end ← Default
- `'power2.out'` = Fast start, smooth end
- `'power2.in'` = Smooth start, fast end
- `'elastic.out'` = Bouncy effect
- `'back.out'` = Slight overshoot
- `'linear'` = Constant speed

See [GSAP Ease Visualizer](https://gsap.com/docs/v3/Eases/) for more options.

## Tips for Finding the Right Position

1. **Start with current values** and make small adjustments
2. **Refresh the page** after each change to see the effect
3. **Test navigation** between objects to ensure consistency
4. **Consider modal width** (600px) when positioning

### Good Starting Values

For objects that should be visible on the left side with modal on right:
- **X**: Start with `-2` and adjust (more negative = more left)
- **Y**: Match the object's actual height in your scene
- **Z**: Start with `2` to `3.5` depending on object size

### Quick Formula

```
Recommended X value = -(modal width / screen width) * distance
```

For a 600px modal on a 1920px screen at Z=2:
```
X = -(600/1920) * 2 = -0.625
```

But since we want objects more visible, use -1.5 to -3 range.

## Common Adjustments

### Object Too Hidden by Modal
**Solution:** Decrease X (more negative)
```javascript
offset: new THREE.Vector3(-3, 0.5, 2.5)  // Was -2, now -3
```

### Object Too Far Left
**Solution:** Increase X (less negative)
```javascript
offset: new THREE.Vector3(-1, 0.5, 2.5)  // Was -2, now -1
```

### Camera Too Close
**Solution:** Increase Z
```javascript
offset: new THREE.Vector3(-2, 0.5, 3.5)  // Was 2.5, now 3.5
```

### Camera Too Far
**Solution:** Decrease Z
```javascript
offset: new THREE.Vector3(-2, 0.5, 1.5)  // Was 2.5, now 1.5
```

### Wrong Vertical Angle
**Solution:** Adjust Y
```javascript
offset: new THREE.Vector3(-2, 2, 2.5)  // Was 0.5, now 2 (higher)
```

## Testing Your Changes

1. Save the file
2. Refresh your browser (or Vite will auto-reload)
3. Click on an object
4. Check if it's visible on the left side
5. Try navigation buttons to test other objects
6. Adjust and repeat

## Default Camera Position

When modal is closed, camera returns to:
```javascript
this.defaultPosition = new THREE.Vector3(0, 3, 8);
this.defaultTarget = new THREE.Vector3(0, 1, 0);
```

You can adjust these at line ~57 in CameraController.js.

## Pro Tips

1. **Keep it consistent**: Use similar X values for objects at similar distances
2. **Test with modal open**: Make sure objects are visible with the modal showing
3. **Account for object size**: Larger objects may need more distance (higher Z)
4. **Save your config**: Back up your values before experimenting

## Troubleshooting

**Camera doesn't move:**
- Check that object ID matches exactly (case-sensitive)
- Ensure GLTF object has the correct `userData.id`

**Object blocked by modal:**
- Decrease X value (make it more negative)
- Example: Change `-2` to `-3` or `-4`

**Animation too fast/slow:**
- Adjust `duration` value
- Try `0.8` for faster or `1.5` for slower

**Object looks weird from camera angle:**
- Adjust Y value to change vertical position
- Try different Z values to get better angle

---

**Location:** `/js/scene/CameraController.js` (Lines 10-48)

**No server restart needed** - Vite will hot-reload changes automatically! 🔥
