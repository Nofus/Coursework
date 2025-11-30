const BookStatus = {
  WANT: 'want',
  READING: 'reading',
  COMPLETED: 'completed'
};

const StatusLabel = {
  [BookStatus.WANT]: 'Хочу прочитать',
  [BookStatus.READING]: 'Читаю',
  [BookStatus.COMPLETED]: 'Завершено'
};

const getStatusLabel = (statusKey) => {
  return StatusLabel[statusKey] || statusKey;
};

const SortType = {
  DATE: 'date',
  TITLE: 'title',
  RATING: 'rating',
  AUTHOR: 'author'
};

export { BookStatus, StatusLabel, getStatusLabel, SortType };