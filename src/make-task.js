import {ALL_COLORS, WEEK_DAYS} from './data';

const boardTasks = document.querySelector(`.board__tasks`);

export default (task) => {

  const monthOfTask = task.dueDate.toLocaleString(`en-us`, {month: `long`});
  const dateOfTask = `${task.dueDate.getDate()} ${monthOfTask}`;
  const timeOfTask = task.dueDate.toLocaleString(`en-US`, {hour12: true, hour: `2-digit`, minute: `2-digit`});

  const obj = task.repeatingDays;
  const isRepeating = Object.keys(obj).some((key)=>obj[key]);

  let tagsBlock = ``;
  for (const element of task.tags) {
    tagsBlock +=
      `<span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="repeat"
        class="card__hashtag-hidden-input"
        />
        <button type="button" class="card__hashtag-name">
          #${element}
        </button>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>`;
  }

  let colorsBlock = ``;
  for (const element of ALL_COLORS) {
    colorsBlock +=
    `<input
      type="radio"
      id="color-${element}-4"
      class="card__color-input card__color-input--${element} visually-hidden"
      name="color"
      value="${element}"
      ${task.color === element ? `checked` : ``}
    />
    <label
      for="color-${element}-4"
      class="card__color card__color--${element}"
      >${element}</label
    >`;
  }

  let repeatDaysBlock = ``;
  for (const element of WEEK_DAYS) {
    repeatDaysBlock +=
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${element}-4"
      name="repeat"
      value="${element}"
      ${task.repeatingDays[element] ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${element}-4"
      >${element}</label
    >`;
  }


  const templateCardText = `<article class="card card--${task.color} ${isRepeating ? `card--repeat` : ``}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    ${task.isDone ? `` : `edit`}
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    ${task.isDone ? `archive` : ``}
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites card__btn--disabled"
                  >
                    ${task.isFavorite ? `favorites` : ``}
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >
${task.title}</textarea
                    >
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${dateOfTask === `` ? `no` : `yes`}</span>
                      </button>

                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder="23 September"
                            name="date"
                            value="${dateOfTask}"
                          />
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__time"
                            type="text"
                            placeholder="11:15 PM"
                            name="time"
                            value="${timeOfTask}"
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                          ${repeatDaysBlock}
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${tagsBlock}
                      </div>

                      <label>
                        <input
                          type="text"
                          class="card__hashtag-input"
                          name="hashtag-input"
                          placeholder="Type new hashtag here"
                        />
                      </label>
                    </div>
                  </div>

                  <label class="card__img-wrap">
                    <input
                      type="file"
                      class="card__img-input visually-hidden"
                      name="img"
                    />
                    <img
                      src=${task.picture}
                      alt="task picture"
                      class="card__img"
                    />
                  </label>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      ${colorsBlock}
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`;

  boardTasks.insertAdjacentHTML(`afterbegin`, templateCardText);
};
