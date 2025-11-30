import { AbstractComponent } from '../framework/view/abstract-component.js';
import { getStatusLabel, BookStatus } from '../const.js';
import { calculateProgress } from '../utils.js';

function createBookComponentTemplate(book) {
  const progress = calculateProgress(book.readPages, book.totalPages);
  const ratingStars = '★'.repeat(book.rating || 0) + '☆'.repeat(5 - (book.rating || 0));
  const addedDate = book.addedDate.toLocaleDateString('ru-RU');
  const coverStyle = book.cover ? `style="background-image: url(${book.cover}); background-size: cover; background-position: center;"` : '';
  
  return (
    `<div class="book-card" data-book-id="${book.id}">
      <div class="book-header">
        <div class="book-cover" ${coverStyle}>
          ${book.cover ? '' : book.title.substring(0, 2)}
        </div>
        <div class="book-info">
          <div class="status-badge status-${book.status}">${getStatusLabel(book.status)}</div>
          <div class="book-title">${book.title}</div>
          <div class="book-author">${book.author}</div>
          <div class="book-meta">
            ${book.rating ? `<span class="rating">${ratingStars} <span class="rating-text">(${book.rating}/5)</span></span>` : ''}
            ${book.totalPages ? `<span class="progress">${progress}%</span>` : ''}
            ${book.totalPages ? `<span class="pages">${book.readPages || 0}/${book.totalPages} стр.</span>` : ''}
          </div>
          <div class="book-date">
            Добавлено: ${addedDate}
          </div>
        </div>
      </div>
      <div class="book-actions">
        <div class="action-buttons">
          <button class="action-btn" data-action="view">Информация о книге</button>
          <button class="action-btn" data-action="edit">Редактировать</button>
          <button class="action-btn" data-action="delete">Удалить</button>
        </div>
      </div>
    </div>`
  );
}

export default class BookComponent extends AbstractComponent {
  #book = null;
  #handleView = null;
  #handleEdit = null;
  #handleDelete = null;

  constructor(book, onView, onEdit, onDelete) {
    super();
    this.#book = book;
    this.#handleView = onView;
    this.#handleEdit = onEdit;
    this.#handleDelete = onDelete;
  }

  get template() {
    return createBookComponentTemplate(this.#book);
  }

  afterElementCreate() {
    this.element.querySelector('[data-action="view"]').addEventListener('click', () => {
      this.#handleView(this.#book);
    });

    this.element.querySelector('[data-action="edit"]').addEventListener('click', () => {
      this.#handleEdit(this.#book);
    });

    this.element.querySelector('[data-action="delete"]').addEventListener('click', () => {
      this.#handleDelete(this.#book.id);
    });
  }
}