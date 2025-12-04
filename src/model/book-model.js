import { generateID } from '../utils.js';
import { BookStatus, SortType } from '../const.js';
import Observable from '../framework/observable.js';

export default class BookModel extends Observable {
  #booksApiService = null;
  #books = [];
  #observers = [];
  #currentFilter = 'all';
  #currentSort = SortType.DATE;

  constructor({booksApiService}) {
    super();
    this.#booksApiService = booksApiService;
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
        return sortedBooks.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    }
  }

  async init() {
    try {
      const books = await this.#booksApiService.books;
      this.#books = books.map(book => ({
        ...book,
        addedDate: new Date(book.addedDate)
      }));
    } catch(err) {
      this.#books = [];
      console.error('Ошибка при загрузке книг:', err);
    }
    this._notify('INIT', null);
  }

  async addBook(bookData) {
    const newBook = {
      ...bookData,
      id: generateID(),
      addedDate: new Date(),
      readPages: bookData.readPages || 0
    };

    try {
      const createdBook = await this.#booksApiService.addBook(newBook);
      createdBook.addedDate = new Date(createdBook.addedDate);
      this.#books.push(createdBook);
      this._notify('ADD_BOOK', createdBook);
      return createdBook;
    } catch (err) {
      console.error('Ошибка при добавлении книги на сервер:', err);
      throw err;
    }
  }

  async updateBook(bookId, updatedData) {
    const bookIndex = this.#books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      const updatedBook = {
        ...this.#books[bookIndex],
        ...updatedData
      };

      try {
        const savedBook = await this.#booksApiService.updateBook(updatedBook);
        savedBook.addedDate = new Date(savedBook.addedDate);
        this.#books[bookIndex] = savedBook;
        this._notify('UPDATE_BOOK', savedBook);
      } catch (err) {
        console.error('Ошибка при обновлении книги на сервере:', err);
        throw err;
      }
    }
  }

  async deleteBook(bookId) {
    try {
      await this.#booksApiService.deleteBook(bookId);
      this.#books = this.#books.filter(book => book.id !== bookId);
      this._notify('DELETE_BOOK', { id: bookId });
    } catch (err) {
      console.error('Ошибка при удалении книги с сервера:', err);
      throw err;
    }
  }

  setFilter(status) {
    this.#currentFilter = status;
    this._notify('FILTER_CHANGE', status);
  }

  setSort(sortType) {
    this.#currentSort = sortType;
    this._notify('SORT_CHANGE', sortType);
  }
}