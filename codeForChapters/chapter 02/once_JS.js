/* eslint-disable @typescript-eslint/no-unused-vars */

const onceJS = (fn) => {
  let done = false;

  return (...args) => {
    if (!done) {
      done = true;
      return fn(...args);
    }
  };
};
