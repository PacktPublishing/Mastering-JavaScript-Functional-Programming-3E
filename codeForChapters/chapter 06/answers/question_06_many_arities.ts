/*

const binary = (fn) => (...a) => fn(a[0], a[1]);
const ternary = (fn) => (...a) => fn(a[0], a[1], a[2]);

*/

const binary =
  <T extends (...x: any[]) => any>(
    fn: T
  ): ((
    arg0: Parameters<T>[0],
    arg1: Parameters<T>[1]
  ) => ReturnType<T>) =>
  (x, y) =>
    fn(x, y);

const ternary =
  <T extends (...x: any[]) => any>(
    fn: T
  ): ((
    arg0: Parameters<T>[0],
    arg1: Parameters<T>[1],
    arg2: Parameters<T>[2]
  ) => ReturnType<T>) =>
  (x, y, z) =>
    fn(x, y, z);

export { binary, ternary };
