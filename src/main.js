import makeFilter from './make-filter';
// import makeTask from './make-task';
import generateData from './data';
import Task from './task';
import TaskEdit from './task-edit';

const FILTERS = [`ARCHIVE`, `TAGS`, `REPEATING`, `FAVORITES`, `TODAY`, `OVERDUE`, `ALL`];
const START_QUANTITY_TASKS = 7;
const MAX_TASKS = 10;

const tasksContainer = document.querySelector(`.board__tasks`);
let arrayTasks = [];

const onFilterClick = (evt) => {
  tasksContainer.innerHTML = ``;
  const filterCountOfTasks = document.querySelector(`.${evt.currentTarget.id}-count`).textContent;
  //createArrayTasks(filterCountOfTasks);
  //createTasks(arrayTasks);
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

/*
const createTasks = (tasks) => {
  for (const element of tasks) {
    makeTask(element);
  }
};*/

/*
const createArrayTasks = (number) => {
  arrayTasks = [];
  for (let i = 0; i < number; i++) {
    arrayTasks.push(generateData());
  }
};*/

createFilters();
addHandlerOnFilters();
//createArrayTasks(START_QUANTITY_TASKS);
//createTasks(arrayTasks);


const data = generateData();
const taskComponent = new Task(data);
const editTaskComponent = new TaskEdit(data);

tasksContainer.appendChild(taskComponent.render());

taskComponent.onEdit = () => {
  editTaskComponent.render();
  tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
  taskComponent.unrender();
};

editTaskComponent.onSubmit = () => {
  taskComponent.render();
  tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
  editTaskComponent.unrender();
};
