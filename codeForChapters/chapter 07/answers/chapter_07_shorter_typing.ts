type Curry2<P, R> = P extends [infer H, ...infer T]
  ? (arg: H) => Curry2<[...T], R>
  : R;

function curry<A extends any[], R>(
  fn: (...args: A) => R
): Curry2<A, R>;
function curry(fn: (...args: any) => any) {
  return fn.length === 0
    ? fn()
    : (x: any) => curry(fn.bind(null, x));
}

const make3 = (a: string, b: number, c: string): string =>
  `${a}:${b}:${c}`;
const f1 = curry(make3);
// (arg: string) => (arg: number) => (arg: string) => string
const f2 = f1("A");
// (arg: number) => (arg: string) => string
const f3 = f2(2);
// (arg: string) => string
const f4 = f3("Z");
// string
console.log(f4);

export {};
