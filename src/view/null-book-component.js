import { AbstractComponent } from '../framework/view/abstract-component.js';

function createNullBookTemplate() {
  return `
    <div class="book-card">
      <div class="book-header">
        <div class="book-info" style="text-align: center; width: 100%;">
          <div class="book-title" style="color: #6c757d; font-style: italic;">
            Нет книг для отображения
          </div>
          <div class="book-author" style="margin-top: 10px;">
            Добавьте первую книгу, нажав кнопку "Добавить книгу"
          </div>
        </div>
      </div>
    </div>
  `;
}

export default class NullBookComponent extends AbstractComponent {
  get template() {
    return createNullBookTemplate();
  }
}