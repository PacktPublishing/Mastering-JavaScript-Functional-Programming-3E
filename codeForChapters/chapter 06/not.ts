/*
const not = (fn) => (...args) => !fn(...args);
*/

const not =
  <T extends (...args: any[]) => boolean>(fn: T) =>
  (...args: Parameters<T>): boolean =>
    !fn(...args);

/*
const filterNot = (arr) => (fn) => arr.filter(not(fn));
*/

const filterNot =
  <A, T extends (x: A) => boolean>(arr: A[]) =>
  (fn: T): A[] =>
    arr.filter(not((y) => fn(y)));

export { not, filterNot };
