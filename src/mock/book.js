import { BookStatus } from '../const.js';
import { generateID } from '../utils.js';

const coverUrls = {
  '1984': 'https://imo10.labirint.ru/books/882183/cover.jpg/484-0',
  'Мастер и Маргарита': 'https://imo10.labirint.ru/books/893994/cover.jpg/242-0',
  'Atomic Habits': 'https://imo10.labirint.ru/books/727534/cover.jpg/242-0',
  'Преступление и наказание': 'https://www.kino-teatr.ru/movie/posters/big/4/3/8834.jpg',
  'Гарри Поттер и Узник Азкабана': 'https://imo10.labirint.ru/books/445211/cover.jpg/242-0',
  'Сто лет одиночества': 'https://imo10.labirint.ru/books/463785/cover.jpg/242-0',
};

export const mockBooks = [
  {
    id: generateID(),
    title: '1984',
    author: 'Джордж Оруэлл',
    status: BookStatus.READING,
    rating: 4,
    totalPages: 500,
    readPages: 213,
    genres: ['Фантастика', 'Антиутопия', 'Классика', 'Политический роман'],
    description: '«1984» — культовый антиутопический роман Джорджа Оруэлла, изображающий тоталитарное общество под постоянным контролем Большого Брата. Главный герой, Уинстон Смит, работает в Министерстве правды и начинает сомневаться в системе, что приводит к опасным последствиям.',
    cover: coverUrls['1984'],
    addedDate: new Date('2024-01-15')
  },
  {
    id: generateID(),
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    status: BookStatus.COMPLETED,
    rating: 5,
    totalPages: 384,
    readPages: 384,
    genres: ['Классика', 'Фэнтези', 'Роман'],
    description: 'Один из величайших романов XX века, сочетающий мистику, сатиру и философскую глубину. История о визите дьявола в Москву 1930-х годов и вечная любовная история мастера и Маргариты.',
    cover: coverUrls['Мастер и Маргарита'],
    addedDate: new Date('2024-01-10')
  },
  {
    id: generateID(),
    title: 'Atomic Habits',
    author: 'Джеймс Клир',
    status: BookStatus.WANT,
    rating: null,
    totalPages: 320,
    readPages: 0,
    genres: ['Саморазвитие', 'Психология'],
    description: 'Практическое руководство по формированию хороших привычек и избавлению от плохих. Автор предлагает систему из 4 законов изменения поведения.',
    cover: coverUrls['Atomic Habits'],
    addedDate: new Date('2024-01-05')
  },
  {
    id: generateID(),
    title: 'Преступление и наказание',
    author: 'Федор Достоевский',
    status: BookStatus.READING,
    rating: 5,
    totalPages: 672,
    readPages: 580,
    genres: ['Классика', 'Психологический роман', 'Философия'],
    description: 'Глубокий психологический роман о студенте Раскольникове, совершившем убийство из-за своей теории о "тварях дрожащих" и "право имеющих".',
    cover: coverUrls['Преступление и наказание'],
    addedDate: new Date('2023-12-20')
  },
  {
    id: generateID(),
    title: 'Гарри Поттер и Узник Азкабана',
    author: 'Джоан Роулинг',
    status: BookStatus.READING,
    rating: 3,
    totalPages: 512,
    readPages: 145,
    genres: ['Фэнтези', 'Приключения', 'Детская литература'],
    description: 'Третья книга о приключениях юного волшебника Гарри Поттера. В Хогвартсе объявляется опасный преступник Сириус Блэк, сбежавший из тюрьмы Азкабан.',
    cover: coverUrls['Гарри Поттер и Узник Азкабана'],
    addedDate: new Date('2024-01-20')
  },
  {
    id: generateID(),
    title: 'Сто лет одиночества',
    author: 'Габриэль Гарсиа Маркес',
    status: BookStatus.WANT,
    rating: null,
    totalPages: 416,
    readPages: 0,
    genres: ['Магический реализм', 'Классика', 'Роман'],
    description: 'Великий роман-легенда о семье Буэндиа и магическом городе Макондо, где реальность переплетается с фантастикой.',
    cover: coverUrls['Сто лет одиночества'],
    addedDate: new Date('2024-01-25')
  }
];

export default mockBooks;