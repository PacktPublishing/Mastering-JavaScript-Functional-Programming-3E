// eslint-disable-next-line
const onceJS = (fn) => {
  let done = false;

  return (...args) => {
    if (!done) {
      done = true;
      return fn(...args);
    }
  };
};
