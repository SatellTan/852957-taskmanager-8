const ALL_TITLES = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const ALL_TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `fishing`,
  `skiing`,
  `examination`,
];

export const ALL_COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const MAX_TAGS = 3;

export const WEEK_DAYS = [
  `mo`,
  `tu`,
  `we`,
  `th`,
  `fr`,
  `sa`,
  `su`,
];

const generateRandomNumber = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber);
};

const generateRepeatingDays = () => {
  return WEEK_DAYS.reduce((res, day)=>{
    res[day] = (generateRandomNumber(2) === 0);
    return res;
  }, {});
};

const createTags = (number) => {
  const tagsOfTask = new Set([]);
  const tmpAllTags = ALL_TAGS.slice();
  for (let i = 0; i < number; i++) {
    const tagIndex = generateRandomNumber(tmpAllTags.length);
    const tag = tmpAllTags[tagIndex];
    tagsOfTask.add(tag);
    tmpAllTags.splice(tagIndex, 1);
  }
  return tagsOfTask;
};

export default () => {
  const createdData = new Date(Date.now() + 1 + (generateRandomNumber(14) - 7) * 24 * 60 * 60 * 1000);
  const createdRepeatingDays = generateRepeatingDays();
  const task = {
    title: ALL_TITLES[generateRandomNumber(ALL_TITLES.length)],
    dueDate: createdData,
    tags: createTags(generateRandomNumber(MAX_TAGS)),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: ALL_COLORS[generateRandomNumber(ALL_COLORS.length)],
    repeatingDays: createdRepeatingDays,
    isFavorite: (generateRandomNumber(2) === 0),
    isDone: (generateRandomNumber(2) === 0),
    state: {
      isDate: () => {
        if (createdData) {
          return true;
        }
        return false;
      },
      isRepeated: () => {
        if (createdRepeatingDays) {
          return true;
        }
        return false;
      },
    },
  };

  return task;
};
