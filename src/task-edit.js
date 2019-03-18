import moment from 'moment';
import flatpickr from 'flatpickr';
import {ALL_COLORS, WEEK_DAYS} from './data-task';
import Component from './component';

export default class TaskEdit extends Component {
  constructor(data, number) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
    this._number = number;
    this._element = null;
    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);

    this._state.isDate = data.state.isDate;
    this._onChangeDate = this._onChangeDate.bind(this);

    this._state.isRepeated = data.state.isRepeated;
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };
    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _isRepeated() {
    return Object.keys(this._repeatingDays).some((key)=>this._repeatingDays[key]);
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return this._element;
  }

  get template() {

    let repeatDaysBlock = ``;
    for (const element of WEEK_DAYS) {
      repeatDaysBlock +=
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${element}-${this._number}"
        name="repeat"
        value="${element}"
        ${this._repeatingDays[element] ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${element}-${this._number}"
        >${element}</label
      >`;
    }

    let colorsBlock = ``;
    for (const element of ALL_COLORS) {
      colorsBlock +=
      `<input
        type="radio"
        id="color-${element}-${this._number}"
        class="card__color-input card__color-input--${element} visually-hidden"
        name="color"
        value="${element}"
        ${this._color === element ? `checked` : ``}
      />
      <label
        for="color-${element}-${this._number}"
        class="card__color card__color--${element}"
        >${element}</label
      >`;
    }

    return `<article class="card card--edit card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            ${this._isDone ? `<button type="button" class="card__btn card__btn--archive">archive</button>` : ``}
            ${this._isFavorite ? `` : `<button type="button" class="card__btn card__btn--favorites card__btn--disabled">favorites</button>`}
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
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                </button>
                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="23 September" name="date" value="${moment(this._dueDate).format(`D MMMM`)}"/>
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="11:15 PM" name="time" value="${moment(this._dueDate).format(`h:mm a`)}"/>
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
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);
    if (this._state.isDate) {
      flatpickr(this._element.querySelector(`.card__date`), {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(this._element.querySelector(`.card__time`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => target.title = value,
      color: (value) => target.color = value,
      repeat: (value) => target.repeatingDays[value] = true,
      // date: (value) => target.dueDate[value],
      date: (value) => (target.dueDate = moment(value, `DD MMMM`).toDate().getTime()),
      time: (value) => {
        const time = moment(value, `HH:mm a`);
        target.dueDate = moment(target.dueDate).set({hour: time.hour(), minute: time.minute()}).toDate().getTime();
      }
    };
  }
}
