import generateDataTask from './data-task';
import generateDataFilter from './data-filter';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';

const FILTERS = [`ARCHIVE`, `TAGS`, `REPEATING`, `FAVORITES`, `TODAY`, `OVERDUE`, `ALL`];
const START_QUANTITY_TASKS = 7;

const tasksContainer = document.querySelector(`.board__tasks`);
const filtersContainer = document.querySelector(`.main__filter`);

const createFilters = () => {
  for (const element of FILTERS) {
    const data = generateDataFilter(element);
    const filterElement = new Filter(data);
    filterElement.render(filtersContainer);
  }
};

const createTask = () => {
  const data = generateDataTask();
  const taskComponent = new Task(data);
  const editTaskComponent = new TaskEdit(data);

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


export const createTasks = (number) => {
  tasksContainer.innerHTML = ``;
  for (let i = 0; i < number; i++) {
    createTask();
  }
};

createFilters();
createTasks(START_QUANTITY_TASKS);
