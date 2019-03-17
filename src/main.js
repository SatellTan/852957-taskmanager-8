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
  const task = new Task(data);
  const editTask = new TaskEdit(data, number);

  task.render(tasksContainer);

  task.onEdit = () => {
    editTask.render(tasksContainer);
    tasksContainer.replaceChild(editTask.element, task.element);
    task.unrender();
  };

  editTask.onSubmit = (newData) => {
    data.title = newData.title;
    data.tags = newData.tags;
    data.color = newData.color;
    data.repeatingDays = newData.repeatingDays;
    data.dueDate = newData.dueDate;

    task.update(data);
    task.render(tasksContainer);
    tasksContainer.replaceChild(task.element, editTask.element);
    editTask.unrender();
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
