/**
 * UI Manager
 * Handles tooltip and modal interactions
 */

import portfolioData from '../../data/portfolio.json';

export class UIManager {
  constructor() {
    this.tooltip = document.getElementById('tooltip');
    this.modal = document.getElementById('modal');
    this.modalBody = document.getElementById('modal-body');
    this.prevButton = document.getElementById('modal-prev');
    this.nextButton = document.getElementById('modal-next');
    
    this.currentObjectId = null;
    this.clickableObjectIds = [];
    this.onNavigate = null; // Callback for navigation
  }

  /**
   * Set the list of clickable objects for navigation
   */
  setClickableObjects(objectIds) {
    this.clickableObjectIds = objectIds;
  }

  /**
   * Set navigation callback
   */
  setNavigationCallback(callback) {
    this.onNavigate = callback;
    
    // Setup button listeners
    this.prevButton.addEventListener('click', () => this.navigatePrevious());
    this.nextButton.addEventListener('click', () => this.navigateNext());
  }

  showTooltip(text, x, y) {
    this.tooltip.textContent = `{${text}}`;
    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;
    this.tooltip.classList.add('visible');
  }

  hideTooltip() {
    this.tooltip.classList.remove('visible');
  }

  openModal(objectId) {
    const data = portfolioData[objectId];
    
    if (!data) {
      console.warn(`No data found for object: ${objectId}`);
      return;
    }

    this.currentObjectId = objectId;
    this.updateNavigationButtons();

    // Check if this object has projects (portfolio items)
    if (data.projects && data.projects.length > 0) {
      this.renderProjectModal(data);
    } else {
      // Simple info modal for non-portfolio objects
      this.renderInfoModal(data);
    }

    this.modal.classList.add('active');
  }

  /**
   * Navigate to previous clickable object
   */
  navigatePrevious() {
    const currentIndex = this.clickableObjectIds.indexOf(this.currentObjectId);
    if (currentIndex > 0) {
      const prevId = this.clickableObjectIds[currentIndex - 1];
      if (this.onNavigate) {
        this.onNavigate(prevId);
      }
    }
  }

  /**
   * Navigate to next clickable object
   */
  navigateNext() {
    const currentIndex = this.clickableObjectIds.indexOf(this.currentObjectId);
    if (currentIndex < this.clickableObjectIds.length - 1) {
      const nextId = this.clickableObjectIds[currentIndex + 1];
      if (this.onNavigate) {
        this.onNavigate(nextId);
      }
    }
  }

  /**
   * Update navigation button states
   */
  updateNavigationButtons() {
    const currentIndex = this.clickableObjectIds.indexOf(this.currentObjectId);
    
    // Disable prev button if at start
    this.prevButton.disabled = currentIndex <= 0;
    
    // Disable next button if at end
    this.nextButton.disabled = currentIndex >= this.clickableObjectIds.length - 1;
  }

  /**
   * Render modal for portfolio projects (monitor, phone, posters, notebook)
   */
  renderProjectModal(data) {
    let content = `
      <div class="modal-header">
        <h2 class="modal-title">${data.title}</h2>
        <p class="modal-subtitle">${data.description}</p>
      </div>
      <div class="modal-projects">
    `;

    data.projects.forEach(project => {
      content += `
        <div class="project-card">
          <div class="project-header">
            ${project.logo ? `<img src="${project.logo}" alt="${project.title}" class="project-logo" onerror="this.style.display='none'">` : ''}
            <h3 class="project-title">${project.title}</h3>
          </div>
          <p class="project-description">${project.description}</p>
          ${project.tags ? `
            <div class="project-tags">
              ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
          ${project.features ? `
            <ul class="project-features">
              ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          ` : ''}
          <div class="project-links">
            ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener" class="project-link primary">View Project</a>` : ''}
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="project-link secondary">GitHub</a>` : ''}
            ${project.playStore ? `<a href="${project.playStore}" target="_blank" rel="noopener" class="project-link secondary">Play Store</a>` : ''}
            ${project.trailer ? `<a href="${project.trailer}" target="_blank" rel="noopener" class="project-link secondary">Watch Trailer</a>` : ''}
          </div>
        </div>
      `;
    });

    content += `</div>`;
    this.modalBody.innerHTML = content;
  }

  /**
   * Render simple info modal (for keyboard, mouse, mac, etc.)
   */
  renderInfoModal(data) {
    let content = `
      <div class="modal-header">
        <h2 class="modal-title">${data.title}</h2>
        <p class="modal-description">${data.description}</p>
      </div>
    `;

    if (data.specs && data.specs.length > 0) {
      content += '<ul class="modal-specs">';
      data.specs.forEach(spec => {
        content += `<li><strong>${spec.label}:</strong> <span>${spec.value}</span></li>`;
      });
      content += '</ul>';
    }

    if (data.link) {
      content += `<a href="${data.link.url}" target="_blank" rel="noopener" class="modal-link">${data.link.text}</a>`;
    }

    this.modalBody.innerHTML = content;
  }

  closeModal() {
    this.modal.classList.remove('active');
    this.currentObjectId = null;
    // Reset scroll position
    setTimeout(() => {
      const wrapper = this.modal.querySelector('.modal-body-wrapper');
      if (wrapper) {
        wrapper.scrollTop = 0;
      }
    }, 300);
  }

  /**
   * Check if modal is currently open
   */
  isModalOpen() {
    return this.modal.classList.contains('active');
  }
}
