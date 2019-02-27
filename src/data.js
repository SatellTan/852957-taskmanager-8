export default () => {
  const task = {
    title: [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`,
    ][Math.floor(Math.random() * 3)],
    dueDate: Date.now() + 1 + (Math.floor(Math.random() * 14) - 7) * 24 * 60 * 60 * 1000, // Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    tags: new Set([
      `homework`,
      `theory`,
      `practice`,
      `intensive`,
      `keks`,
    ]),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`,
    ][Math.floor(Math.random() * 5)], // Строка, описывающая цвет карточки. Один вариант из набора black, yellow, blue, green, pink
    repeatingDays: {
      'mo': true,
      'tu': false,
      'we': true,
      'th': false,
      'fr': false,
      'sa': true,
      'su': false,
    },
    isFavorite: (Math.floor(Math.random() * 2) === 0), // Булево значение сообщающее, добавлена ли задача в избранное.
    isDone: (Math.floor(Math.random() * 2) === 0), // Булево значение сообщающее, выполнена ли задача.
  };
  return task;
};
