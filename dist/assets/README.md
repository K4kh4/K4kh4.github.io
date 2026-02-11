# Assets Folder

Place your project images, logos, and other media files here.

## Recommended Structure

```
assets/
├── logos/
│   ├── game-1-logo.png
│   ├── game-2-logo.png
│   └── ...
├── screenshots/
│   ├── game-1-screen.jpg
│   └── ...
├── posters/
│   ├── steam-game-1.png
│   └── ...
└── misc/
    ├── tshirt-design-1.png
    └── ...
```

## Image Guidelines

### Logos
- **Format:** PNG with transparency
- **Size:** 512x512px or 1024x1024px
- **Max file size:** 200KB

### Screenshots
- **Format:** JPG or PNG
- **Size:** 1920x1080px (or aspect ratio friendly)
- **Max file size:** 500KB
- **Optimize:** Use tools like TinyPNG or Squoosh

### Posters
- **Format:** PNG or JPG
- **Size:** 1080x1920px (portrait for wall posters)
- **Max file size:** 500KB

## Optimization Tips

1. **Compress images** before adding them
   - Use https://tinypng.com/
   - Or https://squoosh.app/

2. **Use appropriate formats**
   - PNG for logos and transparency
   - JPG for photos and screenshots
   - WebP for best compression (with PNG fallback)

3. **Responsive images**
   - Consider providing multiple sizes
   - Let the browser choose the best one

4. **Lazy loading**
   - Images in modals are loaded on-demand
   - Keep initial bundle small

## Referencing in portfolio.json

```json
{
  "logo": "/assets/logos/my-game.png",
  "images": [
    "/assets/screenshots/game-screen-1.jpg",
    "/assets/screenshots/game-screen-2.jpg"
  ]
}
```

Note: Paths are relative to the `public` directory.
