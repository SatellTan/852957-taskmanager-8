import makeFilter from './make-filter.js';
import makeTask from './make-task.js';
import generateData from './data.js';

const FILTERS = [`ARCHIVE`, `TAGS`, `REPEATING`, `FAVORITES`, `TODAY`, `OVERDUE`, `ALL`];
const START_QUANTITY_TASKS = 7;
const MAX_TASKS = 10;

const boardTasks = document.querySelector(`.board__tasks`);
let arrayTasks = [];

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
  arrayTasks = [];
  for (let i = 0; i < number; i++) {
    arrayTasks.push(generateData());
  }

  for (const element of arrayTasks) {
    makeTask(element);
  }
};

createFilters();
createTasks(START_QUANTITY_TASKS);
addHandlerOnFilters();
