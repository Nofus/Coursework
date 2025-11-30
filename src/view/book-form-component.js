import { AbstractComponent } from '../framework/view/abstract-component.js';
import { BookStatus } from '../const.js';

function createBookFormComponentTemplate(book = null, isEdit = false) {
  const title = isEdit ? 'Редактировать книгу' : 'Добавить новую книгу';
  const buttonText = isEdit ? 'Сохранить изменения' : 'Добавить книгу';
  const coverPreview = book?.cover ? `style="background-image: url(${book.cover}); background-size: cover; background-position: center;"` : '';
  
  return (
    `<div class="add-book-container">
      <div class="form-title">${title}</div>
      
      <form class="book-form" id="bookForm">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label required">Название книги</label>
            <input type="text" class="form-input" id="bookTitle" 
                   value="${book?.title || ''}" placeholder="Введите название книги" required>
          </div>
          
          <div class="form-group">
            <label class="form-label required">Автор</label>
            <input type="text" class="form-input" id="bookAuthor" 
                   value="${book?.author || ''}" placeholder="Введите имя автора" required>
          </div>
          
          <div class="form-group full-width">
            <label class="form-label">Жанры</label>
            <div class="genres-grid" id="genresGrid">
              ${createGenresGrid(book?.genres || [])}
            </div>
            
            <div class="custom-genre-input">
              <input type="text" class="form-input" id="customGenreInput" placeholder="Введите свой жанр...">
              <button type="button" class="add-custom-genre" id="addCustomGenre">Добавить</button>
            </div>
            
            <div class="selected-genres" id="selectedGenres">
              ${createSelectedGenres(book?.genres || [])}
            </div>
          </div>
          
          <div class="form-row full-width">
            <div class="form-group">
              <label class="form-label required">Статус чтения</label>
              <select class="form-select" id="bookStatus" required>
                <option value="">Выберите статус</option>
                <option value="${BookStatus.WANT}" ${book?.status === BookStatus.WANT ? 'selected' : ''}>Хочу прочитать</option>
                <option value="${BookStatus.READING}" ${book?.status === BookStatus.READING ? 'selected' : ''}>Читаю</option>
                <option value="${BookStatus.COMPLETED}" ${book?.status === BookStatus.COMPLETED ? 'selected' : ''}>Завершено</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Рейтинг</label>
              <select class="form-select" id="bookRating">
                <option value="">Без рейтинга</option>
                <option value="1" ${book?.rating === 1 ? 'selected' : ''}>★ (1/5)</option>
                <option value="2" ${book?.rating === 2 ? 'selected' : ''}>★★ (2/5)</option>
                <option value="3" ${book?.rating === 3 ? 'selected' : ''}>★★★ (3/5)</option>
                <option value="4" ${book?.rating === 4 ? 'selected' : ''}>★★★★ (4/5)</option>
                <option value="5" ${book?.rating === 5 ? 'selected' : ''}>★★★★★ (5/5)</option>
              </select>
            </div>
          </div>
          
          <div class="form-row full-width">
            <div class="form-group">
              <label class="form-label">Общее количество страниц</label>
              <input type="number" class="form-input" id="totalPages" 
                     value="${book?.totalPages || ''}" placeholder="Введите количество страниц" min="1">
            </div>
            
            <div class="form-group">
              <label class="form-label">Прочитано страниц</label>
              <input type="number" class="form-input" id="readPages" 
                     value="${book?.readPages || ''}" placeholder="Введите количество прочитанных страниц" min="0">
            </div>
          </div>
          
          <div class="form-group full-width">
            <label class="form-label">Заметки</label>
            <textarea class="form-textarea" id="bookDescription" 
                      placeholder="Введите описание книги (необязательно)">${book?.description || ''}</textarea>
          </div>
          
          <div class="form-group full-width">
            <label class="form-label">Обложка книги</label>
            <div class="cover-input-section">
              <input type="url" class="form-input" id="coverUrl" 
                     value="${book?.cover || ''}" placeholder="Введите URL обложки...">
              <button type="button" class="preview-cover-btn" id="previewCover">Просмотреть</button>
            </div>
            <div class="cover-preview" id="coverPreview" ${coverPreview}>
              ${book?.cover ? '' : 'Превью обложки'}
            </div>
            ${book?.cover ? '<button type="button" class="remove-cover-btn" id="removeCover">Удалить обложку</button>' : ''}
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-btn" id="cancelBtn">Отмена</button>
          <button type="submit" class="submit-btn">${buttonText}</button>
        </div>
      </form>
    </div>`
  );
}

function createGenresGrid(selectedGenres) {
  const predefinedGenres = [
    'Фантастика', 'Фэнтези', 'Детектив', 'Роман', 'Триллер', 
    'Ужасы', 'Приключения', 'Научная литература', 'Биография',
    'Исторический', 'Психология', 'Саморазвитие', 'Поэзия',
    'Драма', 'Классика', 'Юмор', 'Кулинария', 'Путешествия'
  ];
  
  return predefinedGenres.map(genre => `
    <label class="genre-checkbox ${selectedGenres.includes(genre) ? 'selected' : ''}">
      <input type="checkbox" value="${genre}" ${selectedGenres.includes(genre) ? 'checked' : ''}>
      ${genre}
    </label>
  `).join('');
}

function createSelectedGenres(genres) {
  return genres.map(genre => `
    <div class="selected-genre-tag">
      ${genre}
      <span class="remove-genre" data-genre="${genre}">×</span>
    </div>
  `).join('');
}

export default class BookFormComponent extends AbstractComponent {
  #handleSubmit = null;
  #handleCancel = null;
  #book = null;
  #isEdit = false;
  #selectedGenres = [];
  #coverUrl = null;

  constructor({ book = null, onSubmit, onCancel, isEdit = false }) {
    super();
    this.#book = book;
    this.#handleSubmit = onSubmit;
    this.#handleCancel = onCancel;
    this.#isEdit = isEdit;
    this.#selectedGenres = book?.genres || [];
    this.#coverUrl = book?.cover || null;
  }

  get template() {
    return createBookFormComponentTemplate(this.#book, this.#isEdit);
  }

  afterElementCreate() {
    this.element.querySelector('#bookForm').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('#cancelBtn').addEventListener('click', this.#cancelHandler);
    this.element.querySelector('#addCustomGenre').addEventListener('click', this.#addCustomGenre);
    this.element.querySelector('#previewCover').addEventListener('click', this.#previewCover);
    

    this.element.querySelectorAll('.genre-checkbox input').forEach(checkbox => {
      checkbox.addEventListener('change', this.#toggleGenre.bind(this));
    });
    
    this.element.querySelectorAll('.remove-genre').forEach(button => {
      button.addEventListener('click', this.#removeGenre.bind(this));
    });

    const removeCoverBtn = this.element.querySelector('#removeCover');
    if (removeCoverBtn) {
      removeCoverBtn.addEventListener('click', this.#removeCover.bind(this));
    }

    this.element.querySelector('#coverUrl').addEventListener('input', this.#debounce(this.#autoPreviewCover, 500));
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    
    const formData = {
      title: this.element.querySelector('#bookTitle').value.trim(),
      author: this.element.querySelector('#bookAuthor').value.trim(),
      status: this.element.querySelector('#bookStatus').value,
      rating: this.element.querySelector('#bookRating').value ? parseInt(this.element.querySelector('#bookRating').value) : null,
      totalPages: this.element.querySelector('#totalPages').value ? parseInt(this.element.querySelector('#totalPages').value) : null,
      readPages: this.element.querySelector('#readPages').value ? parseInt(this.element.querySelector('#readPages').value) : 0,
      genres: this.#selectedGenres,
      description: this.element.querySelector('#bookDescription').value.trim(),
      cover: this.#coverUrl
    };

    if (formData.title && formData.author && formData.status) {
      this.#handleSubmit(formData);
    }
  };

  #cancelHandler = () => {
    this.#handleCancel();
  };

  #previewCover = () => {
    const urlInput = this.element.querySelector('#coverUrl');
    const url = urlInput.value.trim();
    
    if (url) {
      this.#updateCoverPreview(url);
    } else {
      alert('Введите URL обложки');
    }
  };

  #autoPreviewCover = (evt) => {
    const url = evt.target.value.trim();
    if (url && this.#isValidUrl(url)) {
      this.#updateCoverPreview(url);
    }
  };

  #updateCoverPreview = (url) => {
    const coverPreview = this.element.querySelector('#coverPreview');
    
    const img = new Image();
    img.onload = () => {
      this.#coverUrl = url;
      coverPreview.style.backgroundImage = `url(${url})`;
      coverPreview.style.backgroundSize = 'cover';
      coverPreview.style.backgroundPosition = 'center';
      coverPreview.textContent = '';
      
      if (!this.element.querySelector('#removeCover')) {
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-cover-btn';
        removeBtn.id = 'removeCover';
        removeBtn.textContent = 'Удалить обложку';
        removeBtn.addEventListener('click', this.#removeCover.bind(this));
        coverPreview.after(removeBtn);
      }
    };
    
    img.onerror = () => {
      alert('Не удалось загрузить изображение по указанному URL. Проверьте ссылку.');
    };
    
    img.src = url;
  };

  #removeCover = () => {
    this.#coverUrl = null;
    
    const coverPreview = this.element.querySelector('#coverPreview');
    coverPreview.style.backgroundImage = '';
    coverPreview.textContent = 'Превью обложки';
    
    const urlInput = this.element.querySelector('#coverUrl');
    urlInput.value = '';
    
    const removeBtn = this.element.querySelector('#removeCover');
    if (removeBtn) {
      removeBtn.remove();
    }
  };

  #isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  #debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  #toggleGenre = (evt) => {
    const genre = evt.target.value;
    const label = evt.target.parentElement;
    
    if (evt.target.checked) {
      if (!this.#selectedGenres.includes(genre)) {
        this.#selectedGenres.push(genre);
        label.classList.add('selected');
      }
    } else {
      this.#selectedGenres = this.#selectedGenres.filter(g => g !== genre);
      label.classList.remove('selected');
    }
    this.#updateSelectedGenresDisplay();
  };

  #addCustomGenre = () => {
    const input = this.element.querySelector('#customGenreInput');
    const genre = input.value.trim();
    
    if (genre && !this.#selectedGenres.includes(genre)) {
      this.#selectedGenres.push(genre);
      this.#updateSelectedGenresDisplay();
      input.value = '';
    }
  };

  #removeGenre = (evt) => {
    const genre = evt.target.dataset.genre;
    this.#selectedGenres = this.#selectedGenres.filter(g => g !== genre);
    
    const checkbox = this.element.querySelector(`input[value="${genre}"]`);
    if (checkbox) {
      checkbox.checked = false;
      checkbox.parentElement.classList.remove('selected');
    }
    
    this.#updateSelectedGenresDisplay();
  };

  #updateSelectedGenresDisplay() {
    const container = this.element.querySelector('#selectedGenres');
    container.innerHTML = this.#selectedGenres.map(genre => `
      <div class="selected-genre-tag">
        ${genre}
        <span class="remove-genre" data-genre="${genre}">×</span>
      </div>
    `).join('');
    
    container.querySelectorAll('.remove-genre').forEach(button => {
      button.addEventListener('click', this.#removeGenre.bind(this));
    });
  }
}