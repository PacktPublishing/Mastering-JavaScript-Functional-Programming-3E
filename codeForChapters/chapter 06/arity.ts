/*
const unary = fn => (...args) => fn(args[0]);
*/

const unary =
  <T extends (...x: any[]) => any>(
    fn: T
  ): ((arg: Parameters<T>[0]) => ReturnType<T>) =>
  (x) =>
    fn(x);

/*
const arity = (n, fn) => ()...a) => fn(...a.slice(0, n));
*/

function arity<T extends (...args: any[]) => any>(
  n: number,
  fn: T
): (...x: Parameters<T>) => ReturnType<T> {
  return (...x: Parameters<T>) =>
    fn(...x.map((v, i) => (i < n ? v : undefined)));
}

export { unary, arity };
