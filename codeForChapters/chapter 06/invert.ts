/*
const invert = (fn) => (...args) => -fn(...args);
*/

const invert =
  <T extends (...args: any[]) => number>(fn: T) =>
  (...args: Parameters<T>): number =>
    -fn(...args);

export { invert };
