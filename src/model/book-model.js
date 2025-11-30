import { generateID } from '../utils.js';
import { BookStatus, SortType } from '../const.js';
import mockBooks from '../mock/book.js';

export default class BookModel {
  #books = [];
  #observers = [];
  #currentFilter = 'all';
  #currentSort = SortType.DATE;

  constructor() {
    this.#books = mockBooks;
  }

  get books() {
    let filteredBooks = this.#books;
    
    if (this.#currentFilter !== 'all') {
      filteredBooks = filteredBooks.filter(book => book.status === this.#currentFilter);
    }
    
    return this.#sortBooks(filteredBooks);
  }

  #sortBooks(books) {
    const sortedBooks = [...books];
    
    switch (this.#currentSort) {
      case SortType.TITLE:
        return sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
      case SortType.AUTHOR:
        return sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
      case SortType.RATING:
        return sortedBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case SortType.DATE:
      default:
        return sortedBooks.sort((a, b) => b.addedDate - a.addedDate);
    }
  }

  addBook(bookData) {
    const newBook = {
      ...bookData,
      id: generateID(),
      addedDate: new Date(),
      readPages: bookData.readPages || 0
    };
    this.#books.push(newBook);
    this._notifyObservers();
    return newBook;
  }

  updateBook(bookId, updatedData) {
    const bookIndex = this.#books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      this.#books[bookIndex] = { ...this.#books[bookIndex], ...updatedData };
      this._notifyObservers();
    }
  }

  deleteBook(bookId) {
    this.#books = this.#books.filter(book => book.id !== bookId);
    this._notifyObservers();
  }

  setFilter(status) {
    this.#currentFilter = status;
    this._notifyObservers();
  }

  setSort(sortType) {
    this.#currentSort = sortType;
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}