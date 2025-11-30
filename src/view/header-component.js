import { AbstractComponent } from '../framework/view/abstract-component.js';

function createHeaderComponentTemplate() {
  return (
    `<div class="header">
      <div class="logo" data-action="go-home">Список чтения</div>
      
      <div class="search-section">
        <input type="text" class="search-box" id="searchInput" placeholder="Введите название книги или автора...">
        <button class="search-btn" data-action="search">Поиск</button>
      </div>
      
      <button class="add-btn" data-action="add-book">Добавить книгу</button>
    </div>`
  );
}

export default class HeaderComponent extends AbstractComponent {
  #handleAddBook = null;
  #handleSearch = null;
  #handleGoHome = null;

  constructor({ onAddBook, onSearch, onGoHome }) {
    super();
    this.#handleAddBook = onAddBook;
    this.#handleSearch = onSearch;
    this.#handleGoHome = onGoHome;
  }

  get template() {
    return createHeaderComponentTemplate();
  }

  afterElementCreate() {
    this.element.querySelector('[data-action="add-book"]').addEventListener('click', this.#handleAddBook);
    this.element.querySelector('[data-action="go-home"]').addEventListener('click', this.#handleGoHome);
    this.element.querySelector('[data-action="search"]').addEventListener('click', this.#searchHandler);
  
    this.element.querySelector('#searchInput').addEventListener('keypress', (evt) => {
      if (evt.key === 'Enter') {
        this.#searchHandler();
      }
    });
  }

  #searchHandler = () => {
    const searchInput = this.element.querySelector('#searchInput');
    const searchTerm = searchInput.value.trim();
    this.#handleSearch(searchTerm);
  };

  clearSearch() {
    this.element.querySelector('#searchInput').value = '';
  }
}