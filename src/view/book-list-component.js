import { AbstractComponent } from '../framework/view/abstract-component.js';

function createBookListComponentTemplate() {
  return (
    `<div class="books-grid" id="booksGrid">

    </div>`
  );
}

export default class BookListComponent extends AbstractComponent {
  get template() {
    return createBookListComponentTemplate();
  }
}