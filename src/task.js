import moment from 'moment';
import Component from './component';

export default class Task extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
    this._element = null;
    this._onEdit = null;
    this._listener = null;
  }

  _isRepeated() {
    return Object.keys(this._repeatingDays).some((key)=>this._repeatingDays[key]);
  }

  _onEditButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `<article class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
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
              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input class="card__date" type="text" placeholder="23 September" name="date" value="${moment(this._dueDate).format(`D MMMM`)}"/>
                </label>
                <label class="card__input-deadline-wrap">
                  <input class="card__time" type="text" placeholder="11:15 PM" name="time" value="${moment(this._dueDate).format(`h:mm a`)}"/>
                </label>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${(Array.from(this._tags).map((tag) => (`
                  <span class="card__hashtag-inner">
                    <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
                    <button type="button" class="card__hashtag-name">#${tag}</button>
                    <button type="button" class="card__hashtag-delete">delete</button>
                  </span>`.trim()))).join(``)}
              </div>

              <label>
                <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
              </label>
            </div>
          </div>

          <label class="card__img-wrap">
            <input type="file" class="card__img-input visually-hidden" name="img"/>
            <img src=${this._picture} alt="task picture" class="card__img" />
          </label>
        </div>
      </div>
    </article>`.trim();
  }

  bind() {
    this._listener = this._onEditButtonClick.bind(this);
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._listener);
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._listener);
  }

  update(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }
}
