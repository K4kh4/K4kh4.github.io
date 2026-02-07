/**
 * Theme Manager
 * Loads color configuration from JSON and applies it to CSS variables
 */

import colorConfig from '../../data/colors.json';

export class ThemeManager {
  constructor() {
    this.colors = colorConfig.colors;
    this.theme = colorConfig.theme;
    this.root = document.documentElement;
  }

  /**
   * Apply theme colors to CSS custom properties
   */
  applyTheme() {
    // Primary colors
    this.root.style.setProperty('--color-primary', this.colors.primary.main);
    this.root.style.setProperty('--color-primary-rgb', this.colors.primary.rgb);
    this.root.style.setProperty('--color-secondary', this.colors.secondary.main);
    this.root.style.setProperty('--color-secondary-rgb', this.colors.secondary.rgb);
    
    // Background colors
    this.root.style.setProperty('--color-bg', this.colors.background.main);
    this.root.style.setProperty('--color-bg-dark', this.colors.background.dark);
    this.root.style.setProperty('--color-bg-light', this.colors.background.light);
    this.root.style.setProperty('--color-bg-gradient-start', this.colors.background.gradient.start);
    this.root.style.setProperty('--color-bg-gradient-end', this.colors.background.gradient.end);
    this.root.style.setProperty('--color-dark', this.colors.ui.dark);
    
    // Text colors
    this.root.style.setProperty('--color-text', this.colors.text.primary);
    this.root.style.setProperty('--color-text-secondary', this.colors.text.secondary);

    console.log(`✨ Theme applied: ${this.theme.name} v${this.theme.version}`);
    console.log(`🎨 Primary: ${this.colors.primary.main}, Secondary: ${this.colors.secondary.main}`);
  }

  /**
   * Get color value by path (e.g., 'primary.main')
   */
  getColor(path) {
    const parts = path.split('.');
    let value = this.colors;
    
    for (const part of parts) {
      value = value[part];
      if (value === undefined) return null;
    }
    
    return value;
  }

  /**
   * Get RGBA color string
   * @param {string} path - Color path (e.g., 'primary')
   * @param {number} alpha - Alpha value (0-1)
   */
  getRGBA(path, alpha = 1) {
    const color = this.getColor(`${path}.rgb`);
    if (!color) return null;
    return `rgba(${color}, ${alpha})`;
  }

  /**
   * Update a specific color
   */
  updateColor(path, value) {
    const parts = path.split('.');
    let obj = this.colors;
    
    for (let i = 0; i < parts.length - 1; i++) {
      obj = obj[parts[i]];
    }
    
    obj[parts[parts.length - 1]] = value;
    this.applyTheme();
  }

  /**
   * Get theme info
   */
  getThemeInfo() {
    return this.theme;
  }

  /**
   * Export current colors as JSON
   */
  exportColors() {
    return JSON.stringify({
      theme: this.theme,
      colors: this.colors
    }, null, 2);
  }

  /**
   * Get Three.js colors
   */
  getThreeJSColors() {
    return colorConfig.threejs;
  }
}

// Create and export a singleton instance
export const themeManager = new ThemeManager();
