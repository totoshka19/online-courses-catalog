// =================================================================================
// 1. ДАННЫЕ (ЕДИНЫЙ ИСТОЧНИК ПРАВДЫ)
// =================================================================================

const coursesData = [
  { id: 1, category: 'Marketing', image: 'images/course-01.jpg', title: 'The Ultimate Google Ads Training Course', price: 100, author: 'Jerome Bell' },
  { id: 2, category: 'Management', image: 'images/course-02.jpg', title: 'Product Management Fundamentals', price: 480, author: 'Marvin McKinney' },
  { id: 3, category: 'HR & Recruiting', image: 'images/course-03.jpg', title: 'HR Management and Analytics', price: 200, author: 'Leslie Alexander Li' },
  { id: 4, category: 'Marketing', image: 'images/course-04.jpg', title: 'Brand Management & PR Communications', price: 530, author: 'Kristin Watson' },
  { id: 5, category: 'Design', image: 'images/course-05.jpg', title: 'Graphic Design Basic', price: 500, author: 'Guy Hawkins' },
  { id: 6, category: 'Management', image: 'images/course-06.jpg', title: 'Business Development Management', price: 400, author: 'Dianne Russell' },
  { id: 7, category: 'Development', image: 'images/course-07.jpg', title: 'Highload Software Architecture', price: 600, author: 'Brooklyn Simmons' },
  { id: 8, category: 'HR & Recruiting', image: 'images/course-08.jpg', title: 'Human Resources - Selection and Recruitment', price: 150, author: 'Kathryn Murphy' },
  { id: 9, category: 'Design', image: 'images/course-09.jpg', title: 'User Experience. Human-centered Design', price: 240, author: 'Cody Fisher' },
];

// =================================================================================
// 2. ПОЛУЧЕНИЕ DOM-ЭЛЕМЕНТОВ
// =================================================================================

const gridContainer = document.querySelector('.courses__grid');
const filterList = document.querySelector('.courses__filter-list');
const searchInput = document.querySelector('.courses__search-input');
const cardTemplate = document.getElementById('course-card-template');

// =================================================================================
// 3. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// =================================================================================

// Храним текущие значения фильтра и поиска, чтобы их можно было комбинировать
let currentFilter = 'all';
let currentSearchTerm = '';

// =================================================================================
// 4. ОСНОВНЫЕ ФУНКЦИИ
// =================================================================================

/**
 * Функция для отрисовки карточек курсов в DOM.
 * @param {Array} courses - Массив объектов курсов для отрисовки.
 */
function renderCourses(courses) {
  // Очищаем контейнер перед отрисовкой новых карточек
  gridContainer.innerHTML = '';

  // Для каждой карточки создаем DOM-элемент и добавляем в контейнер
  courses.forEach(course => {
    // Клонируем содержимое template-тега. true - для глубокого клонирования.
    const cardClone = cardTemplate.content.cloneNode(true);

    // Находим элементы внутри клонированного шаблона
    const cardElement = cardClone.querySelector('.course-card');
    const imageEl = cardClone.querySelector('.course-card__image');
    const categoryEl = cardClone.querySelector('.course-card__category');
    const titleEl = cardClone.querySelector('.course-card__title');
    const priceEl = cardClone.querySelector('.course-card__price');
    const authorEl = cardClone.querySelector('.course-card__author');

    // Заполняем элементы данными из объекта курса
    imageEl.src = course.image;
    imageEl.alt = course.title;
    categoryEl.textContent = course.category;
    titleEl.textContent = course.title;
    priceEl.textContent = `$${course.price}`;
    authorEl.textContent = `by ${course.author}`;

    // Добавляем модификатор класса для стилизации тега категории
    // Например, для "Marketing" будет добавлен класс "course-card__category--marketing"
    // Не забудьте добавить стили для этих классов в SCSS!
    const categorySlug = course.category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
    categoryEl.classList.add(`course-card__category--${categorySlug}`);

    // Добавляем готовую карточку в грид-контейнер
    gridContainer.appendChild(cardClone);
  });
}

/**
 * Главная функция, которая применяет фильтрацию и поиск, а затем вызывает рендер.
 */
function applyFiltersAndSearch() {
  // Начинаем с полного массива данных
  let filteredCourses = [...coursesData];

  // 1. Применяем фильтр по категории
  if (currentFilter !== 'all') {
    filteredCourses = filteredCourses.filter(course => course.category === currentFilter);
  }

  // 2. Применяем фильтр по поисковому запросу (к уже отфильтрованному по категории массиву)
  if (currentSearchTerm) {
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(currentSearchTerm)
    );
  }

  // 3. Отрисовываем итоговый отфильтрованный массив
  renderCourses(filteredCourses);
}

// =================================================================================
// 5. ОБРАБОТЧИКИ СОБЫТИЙ
// =================================================================================

// Обработчик кликов на кнопки фильтров (используем делегирование событий)
filterList.addEventListener('click', (event) => {
  const clickedButton = event.target.closest('.courses__filter-btn');

  // Если клик был не по кнопке, ничего не делаем
  if (!clickedButton) return;

  // Обновляем состояние текущего фильтра
  currentFilter = clickedButton.dataset.filter;

  // Управляем активным классом для кнопок
  filterList.querySelector('.courses__filter-btn--active').classList.remove('courses__filter-btn--active');
  clickedButton.classList.add('courses__filter-btn--active');

  // Перерисовываем курсы с учетом нового фильтра
  applyFiltersAndSearch();
});

// Обработчик ввода в поле поиска
searchInput.addEventListener('input', () => {
  // Обновляем состояние текущего поискового запроса
  currentSearchTerm = searchInput.value.toLowerCase().trim();

  // Перерисовываем курсы с учетом нового поискового запроса
  applyFiltersAndSearch();
});

// =================================================================================
// 6. ПЕРВИЧНАЯ ЗАГРУЗКА
// =================================================================================

// При первой загрузке страницы отрисовываем все курсы
applyFiltersAndSearch();
