const allTags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `fishing`,
  `skiing`,
  `examination`,
];

const generateRandomNumber = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber);
};

const createTags = (number) => {
  const tagsOfTask = new Set([]);

  for (let i = 0; i < number; i++) {
    tagsOfTask.add(allTags[generateRandomNumber(7)]);
  }
  return tagsOfTask;
};

export default () => {
  const task = {
    title: [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`,
    ][Math.floor(Math.random() * 3)],
    dueDate: new Date(Date.now() + 1 + (generateRandomNumber(14) - 7) * 24 * 60 * 60 * 1000),
    tags: createTags(generateRandomNumber(4)),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`,
    ][generateRandomNumber(5)], // Строка, описывающая цвет карточки. Один вариант из набора black, yellow, blue, green, pink
    repeatingDays: {
      'mo': false,
      'tu': (generateRandomNumber(2) === 0),
      'we': false,
      'th': false,
      'fr': (generateRandomNumber(2) === 0),
      'sa': false,
      'su': false,
    },
    isFavorite: (generateRandomNumber(2) === 0), // Булево значение сообщающее, добавлена ли задача в избранное.
    isDone: (generateRandomNumber(2) === 0), // Булево значение сообщающее, выполнена ли задача.
  };
  return task;
};
