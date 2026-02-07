# Modal System Guide

## Modal Behavior

### Layout
```
┌─────────────────────────────────────────┐
│                                    [×]  │ ← Close button
│  Portfolio Title                        │
│  Description text                       │
│                                         │
│  ┌───────────────────────────────┐    │
│  │ Project Card 1                 │    │ ← Scrollable
│  │ - Logo, title, description     │    │   content
│  │ - Tags, links                  │    │   area
│  └───────────────────────────────┘    │
│                                         │
│  ┌───────────────────────────────┐    │
│  │ Project Card 2                 │    │
│  │ ...                            │    │
│  └───────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │ [← Previous]   [Next →]         │  │ ← Navigation
│  └─────────────────────────────────┘  │   buttons
└─────────────────────────────────────────┘
```

### Features

✅ **Full Height**: Modal spans from top to bottom of screen
✅ **No Blur**: Clean dark background overlay (70% opacity)
✅ **Right Side**: Slides in from the right edge
✅ **Scrollable**: Content area scrolls independently
✅ **Navigation**: Previous/Next buttons at bottom
✅ **Blocks Interactions**: Can't click scene objects when modal is open

## Navigation Flow

```
Monitor → Phone → Notebook → Poster1 → Poster2 → Poster3
  ↑                                                   ↓
  └───────────────────────────────────────────────────┘
```

### Button States

**Previous Button:**
- Disabled when on first object (Monitor)
- Enabled on all other objects

**Next Button:**
- Enabled on all objects except last
- Disabled when on last object (Poster3)

## Click Behavior

| Location | Action |
|----------|--------|
| Object in scene | Opens modal + zooms camera |
| "Next" button | Moves to next object, camera zooms |
| "Previous" button | Moves to previous object, camera zooms |
| Close button (×) | Closes modal, resets camera |
| Escape key | Closes modal, resets camera |
| Modal background | Closes modal, resets camera |
| Objects (when modal open) | **NO ACTION** - Blocked |

## Object Order

The navigation follows this sequence:

1. **Monitor** - Web Games
2. **Phone** - Mobile Games  
3. **Notebook** - Other Projects
4. **Poster-1** - Steam Game 1
5. **Poster-2** - Steam Game 2
6. **Poster-3** - Steam Game 3

## Styling Details

### Modal Dimensions
- Width: 600px max
- Height: 100vh (full screen height)
- Position: Right edge of screen

### Colors
- Background overlay: `rgba(0, 0, 0, 0.7)` - No blur
- Modal background: Dark gradient `#1a1a24` to `#0f0f18`
- Border: 2px solid `rgba(0, 255, 136, 0.3)` (left only)
- Text: White `#ffffff`
- Accent: Green `#00ff88`

### Animations
- Slide in: 0.4s cubic-bezier easing
- Smooth transitions on all interactions
- Camera zoom: 1s ease

## Scene Blocking

When modal is open:
- ❌ Hover effects disabled
- ❌ Tooltips hidden
- ❌ Click events ignored
- ❌ Object outlines removed
- ✅ Camera still renders scene
- ✅ Modal navigation works

## Mobile Responsive

On smaller screens:
- Modal takes full width
- Navigation buttons stack
- Padding adjusts
- Scroll behavior optimized

## Testing Checklist

- [ ] Modal opens on object click
- [ ] Camera zooms to object
- [ ] Modal shows correct content
- [ ] Next button navigates forward
- [ ] Previous button navigates backward
- [ ] First object: Previous disabled
- [ ] Last object: Next disabled
- [ ] Close button works
- [ ] Escape key closes modal
- [ ] Background click closes modal
- [ ] Scene interactions blocked when open
- [ ] Tooltips hidden when open
- [ ] Camera resets on close
- [ ] Modal is full height
- [ ] No blur effect on background
- [ ] Scrolling works with multiple projects
