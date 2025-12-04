import { AbstractComponent } from '../framework/view/abstract-component.js';

function createLoadingTemplate() {
  return `
    <div class="loading-container" style="text-align: center; padding: 40px;">
      <div class="loading-spinner" style="width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #4A6FA5; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
      <p style="margin-top: 20px; color: #6c757d;">Загрузка книг...</p>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
}

export default class LoadingComponent extends AbstractComponent {
  get template() {
    return createLoadingTemplate();
  }
}