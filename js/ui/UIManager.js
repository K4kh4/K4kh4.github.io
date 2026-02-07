/**
 * UI Manager
 * Handles tooltip and modal interactions
 */

import objectDetails from '../../data/objects.json';

export class UIManager {
  constructor() {
    this.tooltip = document.getElementById('tooltip');
    this.modal = document.getElementById('modal');
    this.modalBody = document.getElementById('modal-body');
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
    const data = objectDetails[objectId];
    
    if (!data) {
      console.warn(`No data found for object: ${objectId}`);
      return;
    }

    // Build modal content
    let content = `<h2 class="modal-title">${data.title}</h2>`;
    content += `<p class="modal-description">${data.description}</p>`;
    
    if (data.specs && data.specs.length > 0) {
      content += '<ul class="modal-specs">';
      data.specs.forEach(spec => {
        content += `<li><strong>${spec.label}:</strong> <span>${spec.value}</span></li>`;
      });
      content += '</ul>';
    }

    if (data.link) {
      content += `<a href="${data.link.url}" target="_blank" class="modal-link">${data.link.text}</a>`;
    }

    this.modalBody.innerHTML = content;
    this.modal.classList.add('active');
  }

  closeModal() {
    this.modal.classList.remove('active');
  }
}
