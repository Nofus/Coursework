import BookComponent from '../view/book-component.js';
import BookFormComponent from '../view/book-form-component.js';
import BookDetailComponent from '../view/book-detail-component.js';
import NullBookComponent from '../view/null-book-component.js';
import LoadingComponent from '../view/loading-component.js';
import { render } from '../framework/render.js';

export default class BooksPresenter {
  #booksContainer = null;
  #bookModel = null;
  #headerComponent = null;
  #currentView = 'list';
  #currentBook = null;
  #isSearching = false;
  #searchTerm = '';
  #loadingComponent = new LoadingComponent();
  #isLoading = true;

  constructor(booksContainer, bookModel, headerComponent) {
    this.#booksContainer = booksContainer;
    this.#bookModel = bookModel;
    this.#headerComponent = headerComponent;
    this.#bookModel.addObserver(this.#handleModelChange.bind(this));
  }

  async init() {
    this.#renderLoading();
    await this.#bookModel.init();
    this.#isLoading = false;
    this.#loadingComponent.removeElement();
    this.#renderBookList();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#booksContainer);
  }

  showAddForm() {
    if (this.#isLoading) return;
    this.#clearContainer();
    this.#currentView = 'add';
    
    const bookFormComponent = new BookFormComponent({
      onSubmit: this.#handleAddBook.bind(this),
      onCancel: this.#showBookList.bind(this)
    });
    render(bookFormComponent, this.#booksContainer);
  }

  showEditForm(book) {
    if (this.#isLoading) return;
    this.#clearContainer();
    this.#currentView = 'edit';
    this.#currentBook = book;
    
    const bookFormComponent = new BookFormComponent({
      book: book,
      onSubmit: this.#handleEditBook.bind(this),
      onCancel: this.#showBookList.bind(this),
      isEdit: true
    });
    render(bookFormComponent, this.#booksContainer);
  }

  showBookDetail(book) {
    if (this.#isLoading) return;
    this.#clearContainer();
    this.#currentView = 'detail';
    this.#currentBook = book;
    
    const bookDetailComponent = new BookDetailComponent({
      book: book,
      onEdit: this.showEditForm.bind(this),
      onDelete: this.#handleDeleteBook.bind(this),
      onBack: this.#showBookList.bind(this)
    });
    render(bookDetailComponent, this.#booksContainer);
  }

  filterBooks(status) {
    this.#bookModel.setFilter(status);
  }

  sortBooks(sortType) {
    this.#bookModel.setSort(sortType);
  }

  searchBooks(searchTerm) {
    this.#searchTerm = searchTerm.toLowerCase();
    this.#isSearching = !!searchTerm;
    this.#handleModelChange();
  }

  goHome() {
    this.#isSearching = false;
    this.#searchTerm = '';
    this.#headerComponent.clearSearch();
    this.#bookModel.setFilter('all');
    this.#showBookList();
  }

  #showBookList() {
    this.#clearContainer();
    this.#currentView = 'list';
    this.#renderBookList();
  }

  #renderBookList() {
    if (this.#isLoading) return;
    
    let books = this.#bookModel.books;
    
    if (this.#isSearching && this.#searchTerm) {
      books = books.filter(book => 
        book.title.toLowerCase().includes(this.#searchTerm) ||
        book.author.toLowerCase().includes(this.#searchTerm)
      );
    }
    
    if (books.length === 0) {
      this.#renderNullBook();
    } else {
      books.forEach(book => {
        const bookComponent = new BookComponent(
          book,
          this.showBookDetail.bind(this),
          this.showEditForm.bind(this),
          this.#handleDeleteBook.bind(this)
        );
        render(bookComponent, this.#booksContainer);
      });
    }
  }

  #renderNullBook() {
    const nullBookComponent = new NullBookComponent();
    if (this.#isSearching && this.#searchTerm) {
      nullBookComponent.element.innerHTML = `
        <div class="book-card">
          <div class="book-header">
            <div class="book-info" style="text-align: center; width: 100%;">
              <div class="book-title" style="color: #6c757d; font-style: italic;">
                Книги не найдены
              </div>
              <div class="book-author" style="margin-top: 10px;">
                По запросу "${this.#searchTerm}" ничего не найдено
              </div>
            </div>
          </div>
        </div>
      `;
    }
    render(nullBookComponent, this.#booksContainer);
  }

  #handleModelChange(event, payload) {
    if (this.#currentView === 'list' && !this.#isLoading) {
      this.#clearContainer();
      this.#renderBookList();
    }
  }

  async #handleAddBook(bookData) {
    try {
      await this.#bookModel.addBook(bookData);
      this.#showBookList();
    } catch (err) {
      console.error('Ошибка при добавлении книги:', err);
      alert('Не удалось добавить книгу. Попробуйте еще раз.');
    }
  }

  async #handleEditBook(bookData) {
    try {
      await this.#bookModel.updateBook(this.#currentBook.id, bookData);
      this.#showBookList();
    } catch (err) {
      console.error('Ошибка при редактировании книги:', err);
      alert('Не удалось сохранить изменения. Попробуйте еще раз.');
    }
  }

  async #handleDeleteBook(bookId) {
    if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
      try {
        await this.#bookModel.deleteBook(bookId);
      } catch (err) {
        console.error('Ошибка при удалении книги:', err);
        alert('Не удалось удалить книгу. Попробуйте еще раз.');
      }
    }
  }

  #clearContainer() {
    this.#booksContainer.innerHTML = '';
  }
}