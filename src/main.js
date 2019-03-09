import generateDataTask from './data-task';
import generateDataFilter from './data-filter';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';

const FILTERS = [`ARCHIVE`, `TAGS`, `REPEATING`, `FAVORITES`, `TODAY`, `OVERDUE`, `ALL`];
const START_QUANTITY_TASKS = 7;

const tasksContainer = document.querySelector(`.board__tasks`);
const filtersContainer = document.querySelector(`.main__filter`);

const createFilter = (name) => {
  const data = generateDataFilter(name);
  if (name === `ALL`) {
    data.count = START_QUANTITY_TASKS;
    data.checked = true;
  }
  const filterElement = new Filter(data);
  filterElement.render(filtersContainer);

  filterElement.onClick = () => {
    createTasks(filterElement._count);
  };
};

const createFilters = () => {
  for (const element of FILTERS) {
    createFilter(element);
  }
};

const createTask = (number) => {
  const data = generateDataTask();
  const taskComponent = new Task(data);
  const editTaskComponent = new TaskEdit(data, number);

  taskComponent.render(tasksContainer);

  taskComponent.onEdit = () => {
    editTaskComponent.render(tasksContainer);
    tasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onSubmit = () => {
    taskComponent.render(tasksContainer);
    tasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };
};


const createTasks = (number) => {
  tasksContainer.innerHTML = ``;
  for (let i = 0; i < number; i++) {
    createTask(i);
  }
};

createFilters();
createTasks(START_QUANTITY_TASKS);
