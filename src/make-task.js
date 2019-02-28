const boardTasks = document.querySelector(`.board__tasks`);

export default (task) => {

  const monthOfTask = task.dueDate.toLocaleString(`en-us`, {month: `long`});
  const dateOfTask = `${task.dueDate.getDate()} ${monthOfTask} ${task.dueDate.getFullYear()}`;
  const timeOfTask = task.dueDate.toLocaleString(`en-US`, {hour12: true, hour: `2-digit`, minute: `2-digit`});

  // console.log(dateOfTask);
  // console.log(task.dueDate.toLocaleTimeString('en-US'));
  // console.log(task.dueDate.getDate() + " " + monthOfTask + " " + task.dueDate.getFullYear() + " " + task.dueDate);

  const obj = task.repeatingDays;
  const isRepeating = Object.keys(obj).some((key)=>obj[key]);

  let tagsOfTask = ``;

  for (const element of task.tags) {
    tagsOfTask +=
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


  const templateCardText = `<article class="card card--edit card--${task.color} ${isRepeating ? `card--repeat` : ``}">
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
                            value=${dateOfTask}
                          />
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__time"
                            type="text"
                            placeholder="11:15 PM"
                            name="time"
                            value=${timeOfTask}
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-mo-4"
                            name="repeat"
                            value="mo"
                            ${task.repeatingDays.mo ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-mo-4"
                            >mo</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-tu-4"
                            name="repeat"
                            value="tu"
                            ${task.repeatingDays.tu ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-tu-4"
                            >tu</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-we-4"
                            name="repeat"
                            value="we"
                            ${task.repeatingDays.we ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-we-4"
                            >we</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-th-4"
                            name="repeat"
                            value="th"
                            ${task.repeatingDays.th ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-th-4"
                            >th</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-fr-4"
                            name="repeat"
                            value="fr"
                            ${task.repeatingDays.fr ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-fr-4"
                            >fr</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            name="repeat"
                            value="sa"
                            id="repeat-sa-4"
                            ${task.repeatingDays.sa ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-sa-4"
                            >sa</label
                          >
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-su-4"
                            name="repeat"
                            value="su"
                            ${task.repeatingDays.su ? `checked` : ``}
                          />
                          <label class="card__repeat-day" for="repeat-su-4"
                            >su</label
                          >
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${tagsOfTask}
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
                      <input
                        type="radio"
                        id="color-black-4"
                        class="card__color-input card__color-input--black visually-hidden"
                        name="color"
                        value="black"
                        ${task.color === `black` ? `checked` : ``}
                      />
                      <label
                        for="color-black-4"
                        class="card__color card__color--black"
                        >black</label
                      >
                      <input
                        type="radio"
                        id="color-yellow-4"
                        class="card__color-input card__color-input--yellow visually-hidden"
                        name="color"
                        value="yellow"
                        ${task.color === `yellow` ? `checked` : ``}
                      />
                      <label
                        for="color-yellow-4"
                        class="card__color card__color--yellow"
                        >yellow</label
                      >
                      <input
                        type="radio"
                        id="color-blue-4"
                        class="card__color-input card__color-input--blue visually-hidden"
                        name="color"
                        value="blue"
                        ${task.color === `blue` ? `checked` : ``}
                      />
                      <label
                        for="color-blue-4"
                        class="card__color card__color--blue"
                        >blue</label
                      >
                      <input
                        type="radio"
                        id="color-green-4"
                        class="card__color-input card__color-input--green visually-hidden"
                        name="color"
                        value="green"
                        ${task.color === `green` ? `checked` : ``}
                      />
                      <label
                        for="color-green-4"
                        class="card__color card__color--green"
                        >green</label
                      >
                      <input
                        type="radio"
                        id="color-pink-4"
                        class="card__color-input card__color-input--pink visually-hidden"
                        name="color"
                        value="pink"
                        ${task.color === `pink` ? `checked` : ``}
                      />
                      <label
                        for="color-pink-4"
                        class="card__color card__color--pink"
                        >pink</label
                      >
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
