/*
const unary = fn => (...args) => fn(args[0]);
*/

const unary =
  <T extends (...x: any[]) => any>(
    fn: T
  ): ((arg: Parameters<T>[0]) => ReturnType<T>) =>
  (x) =>
    fn(x);

console.log(["123.45", "-67.8", "90"].map(unary(parseInt)));
// [123, -67, 90]

console.log(
  ["123.45", "-67.8", "90"].map((x) =>
    parseInt(x, undefined)
  )
);

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

const pp = arity(1, parseInt);

console.log(["123.45", "-67.8", "90"].map(pp));
// [123, -67, 90]

export { unary, binary, ternary, arity };
