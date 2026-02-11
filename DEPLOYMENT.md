# Deployment Guide

## Project Structure

This project is now structured for easy GitHub Pages deployment:

- `/src` - Source files (HTML, JS, CSS, data)
  - `/src/js` - JavaScript modules
  - `/src/data` - JSON configuration files
  - `/src/styles` - CSS files
  - `/src/index.html` - Source HTML
- `/public` - Static assets (models, etc.)
- **Root directory** - Built files (committed for GitHub Pages)
  - `/index.html` - Built HTML (DO NOT EDIT - auto-generated)
  - `/assets/` - Bundled JS and CSS (DO NOT EDIT - auto-generated)
  - `/data/` - Copied data files (DO NOT EDIT - auto-generated)

## GitHub Pages Deployment

For `username.github.io` repositories, GitHub Pages serves directly from the root of the `main` branch.

### Deployment Steps:

1. **Make changes to source files** in the `/src` directory

2. **Build the project:**
   ```bash
   npm run build
   ```
   This builds from `/src` and outputs to the root directory

3. **Commit and push ALL files:**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push
   ```

4. **Configure GitHub Pages** (one-time setup):
   - Go to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select branch: `main`, folder: `/ (root)`
   - Save

Your site will be live at: `https://k4kh4.github.io/`

## Local Development

**Development server** (with hot reload):
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Important Notes

- **Source files** are in `/src` - edit these files
- **Built files** are in root (`/index.html`, `/assets/`, `/data/`) - DO NOT edit these directly
- The built files are committed to git for GitHub Pages deployment
- Always run `npm run build` before committing if you made changes to source files
- The build process bundles all Three.js and GSAP dependencies into the output files

## How the Build Works

1. Vite reads source files from `/src`
2. Bundles all JavaScript (including Three.js, GSAP)
3. Bundles and minifies CSS
4. Copies data files
5. Outputs everything to the root directory
6. GitHub Pages serves the built files from root

## Troubleshooting

**Error: "Failed to resolve module specifier 'three'"**
- This means you're trying to run the source files directly
- Always use `npm run dev` for development
- Or run `npm run build` and serve the built files

**Changes not showing on GitHub Pages:**
- Make sure you ran `npm run build` before committing
- Verify you committed the `/index.html` and `/assets/` files in the root
- Check GitHub Pages settings point to `main` branch and `/ (root)` folder
- GitHub Pages can take 1-2 minutes to update after pushing
