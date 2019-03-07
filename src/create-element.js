export default (template, container) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  container.insertAdjacentHTML(`afterbegin`, template);

  return container.firstChild;
};
