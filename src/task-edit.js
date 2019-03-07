import {ALL_COLORS, WEEK_DAYS} from './data-task';
import Component from './component';

export default class TaskEdit extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;

    this._element = null;
    this._state = Object.assign({}, data.state);
    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  _isRepeated() {
    return Object.keys(this._repeatingDays).some((key)=>this._repeatingDays[key]);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {

    const monthOfTask = this._dueDate.toLocaleString(`en-us`, {month: `long`});
    const dateOfTask = `${this._dueDate.getDate()} ${monthOfTask}`;
    const timeOfTask = this._dueDate.toLocaleString(`en-US`, {hour12: true, hour: `2-digit`, minute: `2-digit`});

    let repeatDaysBlock = ``;
    for (const element of WEEK_DAYS) {
      repeatDaysBlock +=
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${element}-4"
        name="repeat"
        value="${element}"
        ${this._repeatingDays[element] ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${element}-4"
        >${element}</label
      >`;
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
        ${this._color === element ? `checked` : ``}
      />
      <label
        for="color-${element}-4"
        class="card__color card__color--${element}"
        >${element}</label
      >`;
    }

    return `<article class="card card--edit card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">${this._state.isDone ? `archive` : ``}</button>
            <button type="button" class="card__btn card__btn--favorites card__btn--disabled">${this._state.isFavorite ? `favorites` : ``}</button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
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
                    <input class="card__date" type="text" placeholder="23 September" name="date" value="${dateOfTask}"/>
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="11:15 PM" name="time" value="${timeOfTask}"/>
                  </label>
                </fieldset>
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._isRepeated() ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${repeatDaysBlock}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${(Array.from(this._tags).map((tag) => (`
                  <span class="card__hashtag-inner">
                      <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input"/>
                      <button type="button" class="card__hashtag-name">#${tag}</button>
                      <button type="button" class="card__hashtag-delete">delete</button>
                    </span>`.trim()))).join(``)}
                </div>

                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here"/>
                </label>
              </div>
            </div>

            <label class="card__img-wrap">
              <input type="file" class="card__img-input visually-hidden" name="img"/>
              <img src=${this._picture} alt="task picture" class="card__img"/>
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
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._onSubmitButtonClick = null;
  }
}
