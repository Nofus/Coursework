import HeaderComponent from './view/header-component.js';
import ContainerComponent from './view/container-component.js';
import BookListComponent from './view/book-list-component.js';
import BookFilterComponent from './view/book-filter-component.js';
import BooksPresenter from './presenter/book-presenter.js';
import BookModel from './model/book-model.js';
import { render, RenderPosition } from './framework/render.js';

const bookModel = new BookModel();

const bodyContainer = document.querySelector('body');
const mainContainer = document.querySelector('main');

// Контейнер
const containerComponent = new ContainerComponent();
render(containerComponent, mainContainer);

// Заголовок
const headerComponent = new HeaderComponent({
  onAddBook: () => booksPresenter.showAddForm(),
  onSearch: (searchTerm) => booksPresenter.searchBooks(searchTerm),
  onGoHome: () => booksPresenter.goHome()
});
render(headerComponent, containerComponent.element, RenderPosition.AFTERBEGIN);

// Фильтр и сортировка
const bookFilterComponent = new BookFilterComponent({
  onFilterChange: (status) => booksPresenter.filterBooks(status),
  onSortChange: (sortType) => booksPresenter.sortBooks(sortType)
});
render(bookFilterComponent, containerComponent.element);

// Список книг
const bookListComponent = new BookListComponent();
render(bookListComponent, containerComponent.element);

// Презентер
const booksPresenter = new BooksPresenter(
  bookListComponent.element,
  bookModel,
  headerComponent
);

booksPresenter.init();