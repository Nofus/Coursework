import { AbstractComponent } from '../framework/view/abstract-component.js';
import { getStatusLabel, BookStatus } from '../const.js';
import { calculateProgress } from '../utils.js';

function createBookDetailComponentTemplate(book) {
  const progress = calculateProgress(book.readPages, book.totalPages);
  const ratingStars = '★'.repeat(book.rating || 0) + '☆'.repeat(5 - (book.rating || 0));
  const coverStyle = book.cover ? `style="background-image: url(${book.cover}); background-size: cover; background-position: center;"` : '';
  
  return (
    `<div class="book-detail-container">
      <div class="book-detail-header">
        <div class="book-detail-cover" ${coverStyle}>
          ${book.cover ? '' : book.title.substring(0, 2)}
        </div>
        <div class="book-detail-info">
          <div class="status-badge status-${book.status}">${getStatusLabel(book.status)}</div>
          <h1 class="book-detail-title">${book.title}</h1>
          <div class="book-detail-author">${book.author}</div>
          
          <div class="book-detail-meta">
            ${book.rating ? `
            <div class="meta-item">
              <span class="meta-label">Рейтинг:</span>
              <span class="meta-value">
                <span class="rating">${ratingStars}</span>
                <span class="rating-text">(${book.rating}/5)</span>
              </span>
            </div>` : ''}
            
            ${book.totalPages ? `
            <div class="meta-item">
              <span class="meta-label">Страниц:</span>
              <span class="meta-value">${book.totalPages}</span>
            </div>` : ''}
            
            ${book.readPages ? `
            <div class="meta-item">
              <span class="meta-label">Прочитано:</span>
              <span class="meta-value">${book.readPages} страниц</span>
            </div>` : ''}
            
            <div class="meta-item">
              <span class="meta-label">Дата добавления:</span>
              <span class="meta-value">${book.addedDate.toLocaleDateString('ru-RU')}</span>
            </div>
          </div>

          ${book.genres?.length ? `
          <div class="genres-section">
            <div class="section-title">Жанры</div>
            <div class="genres-tags">
              ${book.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
            </div>
          </div>` : ''}
        </div>
      </div>

      ${book.totalPages ? `
      <div class="progress-section">
        <h3 class="progress-title">Прогресс чтения</h3>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="progress-stats">
          <span>0%</span>
          <span class="progress-percentage">${progress}%</span>
          <span>100%</span>
        </div>
      </div>` : ''}

      ${book.description ? `
      <div class="description-section">
        <h3 class="section-title">Заметки</h3>
        <div class="book-description">${book.description}</div>
      </div>` : ''}

      <div class="action-buttons-detail">
        <div class="left-actions">
          <button class="edit-btn" data-action="edit">Редактировать</button>
          <button class="delete-btn" data-action="delete">Удалить книгу</button>
        </div>
        <button class="back-btn" data-action="back">Назад к списку</button>
      </div>
    </div>`
  );
}

export default class BookDetailComponent extends AbstractComponent {
  #book = null;
  #handleEdit = null;
  #handleDelete = null;
  #handleBack = null;

  constructor({ book, onEdit, onDelete, onBack }) {
    super();
    this.#book = book;
    this.#handleEdit = onEdit;
    this.#handleDelete = onDelete;
    this.#handleBack = onBack;
  }

  get template() {
    return createBookDetailComponentTemplate(this.#book);
  }

  afterElementCreate() {
    this.element.querySelector('[data-action="edit"]').addEventListener('click', () => {
      this.#handleEdit(this.#book);
    });

    this.element.querySelector('[data-action="delete"]').addEventListener('click', () => {
      this.#handleDelete(this.#book.id);
    });

    this.element.querySelector('[data-action="back"]').addEventListener('click', () => {
      this.#handleBack();
    });
  }
}