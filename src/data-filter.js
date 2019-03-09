const MAX_TASKS = 10;

export default (name) => {
  return {
    name,
    count: Math.floor(Math.random() * (MAX_TASKS)),
    checked: false,
  };
};
