import Component from './component';
import {createTasks} from './main';

export default class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._count = data.count;
    this._checked = data.checked;
    this._listener = null;
  }

  get element() {
    return this._element;
  }

  _onFilterClick(evt) {
    evt.preventDefault();
    createTasks(this._count);
  }

  get template() {

    return `
    <input type="radio"
      id="filter__${this._name.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${(this._checked) && (this._count > 0) ? `checked` : ``}
      ${(this._count === 0) ? `disabled` : ``}
    />
    <label for="filter__${this._name.toLowerCase()}" class="filter__label">
      ${this._name} <span class="filter__${this._name.toLowerCase()}-count">${this._count}</span></label
    >`.trim();

  }

  bind() {
    this._listener = this._onFilterClick.bind(this);
    this._element.addEventListener(`click`, this._listener);
  }

  unbind() {
    this._element.addEvenetListener(`click`, this._listener);
    this._listener = null;
  }
}
