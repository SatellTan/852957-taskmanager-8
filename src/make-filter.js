//export default (caption, count, checked = false) => `<input

export default (name, count, checked = true) => {

  const mainFilter = document.querySelector(`.main__filter`);
  const nameLow = name.toLowerCase();
  const templateFilterText = `
  <input type="radio"
    id="filter__${nameLow}"
    class="filter__input visually-hidden"
    name="filter"
    ${checked}
    ${(count === 0) ? `disabled` : ``}
  />
  <label for="filter__${nameLow}" class="filter__label">
    ${name} <span class="filter__${nameLow}-count">${count}</span></label
  >`;

  mainFilter.insertAdjacentHTML(`beforeend`, templateFilterText);
};
