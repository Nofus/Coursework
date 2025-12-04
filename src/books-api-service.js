import ApiService from './framework/view/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class BooksApiService extends ApiService {
  get books() {
    return this._load({url: 'books'})
      .then(ApiService.parseResponse);
  }

  async addBook(book) {
    const response = await this._load({
      url: 'books',
      method: Method.POST,
      body: JSON.stringify(book),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return ApiService.parseResponse(response);
  }

  async updateBook(book) {
    const response = await this._load({
      url: `books/${book.id}`,
      method: Method.PUT,
      body: JSON.stringify(book),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deleteBook(bookId) {
    await this._load({
      url: `books/${bookId}`,
      method: Method.DELETE,
    });
  }
}