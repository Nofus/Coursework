import { AbstractComponent } from '../framework/view/abstract-component.js';
import { BookStatus, getStatusLabel } from '../const.js';
import { SortType } from '../const.js';

function createBookFilterComponentTemplate() {
  return (
    `<div class="controls">
      <div class="tabs" id="statusTabs">
        <div class="tab active" data-status="all">Все книги</div>
        <div class="tab" data-status="${BookStatus.WANT}">${getStatusLabel(BookStatus.WANT)}</div>
        <div class="tab" data-status="${BookStatus.READING}">${getStatusLabel(BookStatus.READING)}</div>
        <div class="tab" data-status="${BookStatus.COMPLETED}">${getStatusLabel(BookStatus.COMPLETED)}</div>
      </div>
      
      <div class="sort-section">
        <span class="sort-label">Сортировка:</span>
        <select class="sort-select" id="sortSelect">
          <option value="${SortType.DATE}">По дате добавления</option>
          <option value="${SortType.TITLE}">По названию</option>
          <option value="${SortType.RATING}">По рейтингу</option>
          <option value="${SortType.AUTHOR}">По автору</option>
        </select>
      </div>
    </div>`
  );
}

export default class BookFilterComponent extends AbstractComponent {
  #handleFilterChange = null;
  #handleSortChange = null;

  constructor({ onFilterChange, onSortChange }) {
    super();
    this.#handleFilterChange = onFilterChange;
    this.#handleSortChange = onSortChange;
  }

  get template() {
    return createBookFilterComponentTemplate();
  }

  afterElementCreate() {
    this.element.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', this.#filterChangeHandler);
    });

    this.element.querySelector('#sortSelect').addEventListener('change', this.#sortChangeHandler);
  }

  #filterChangeHandler = (evt) => {
    const status = evt.target.dataset.status;
    
    this.element.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });
    evt.target.classList.add('active');
    
    this.#handleFilterChange(status);
  };

  #sortChangeHandler = (evt) => {
    const sortType = evt.target.value;
    this.#handleSortChange(sortType);
  };
}