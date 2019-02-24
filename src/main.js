import makeFilter from './make-filter.js';
import makeTask from './make-task.js';

const FILTERS = [`ALL`, `OVERDUE`, `TODAY`, `FAVORITES`, `REPEATING`, `TAGS`, `ARCHIVE`];
const START_QUANTITY_TASKS = 7;
const MAX_TASKS = 10;

const boardTasks = document.querySelector(`.board__tasks`);

const onFilterClick = (evt) => {
  boardTasks.innerHTML = ``;
  const filterCountOfTasks = document.querySelector(`.${evt.currentTarget.id}-count`).textContent;
  createTasks(filterCountOfTasks);
};

const addHandlerOnFilters = () => {
  const filterElements = document.querySelectorAll(`.filter__input`);
  for (const element of filterElements) {
    element.addEventListener(`click`, onFilterClick);
  }
};

const createFilters = () => {
  for (const element of FILTERS) {
    let filterCount = Math.floor(Math.random() * (MAX_TASKS + 1));
    makeFilter(element, filterCount, true);
  }
};

const createTasks = (number) => {
  for (let i = 0; i < number; i++) {
    makeTask();
  }
};

createFilters();
createTasks(START_QUANTITY_TASKS);
addHandlerOnFilters();
