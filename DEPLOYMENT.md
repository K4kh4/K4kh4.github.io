# Deployment Guide

## GitHub Pages Deployment

This project uses Vite and is configured to deploy to GitHub Pages automatically.

### Option 1: Automatic Deployment with GitHub Actions (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys your site when you push to the `main` branch.

**Setup Steps:**

1. Go to your repository settings on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Push your changes to the `main` branch
5. The workflow will automatically build and deploy your site

Your site will be available at: `https://k4kh4.github.io/`

### Option 2: Manual Deployment

If you prefer to deploy manually:

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` folder

3. Commit and push the `dist` folder:
   ```bash
   git add dist
   git commit -m "Build for deployment"
   git push
   ```

4. Configure GitHub Pages to serve from the `dist` folder:
   - Go to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select branch: `main`, folder: `/dist`

## Local Development

Run the development server:

```bash
npm run dev
```

## Build

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `/js` - Source JavaScript files (ES modules)
- `/data` - JSON configuration files
- `/public` - Static assets (models, etc.)
- `/styles` - CSS files
- `/dist` - Built files (generated, auto-deployed)

## Dependencies

- **Three.js** - 3D graphics library
- **GSAP** - Animation library
- **Vite** - Build tool and dev server

## Important Notes

- The project uses ES modules with `import` statements
- All imports are bundled during the build process
- The `dist` folder contains all bundled dependencies (Three.js, GSAP)
- Data files are automatically copied to `dist/data` during build
