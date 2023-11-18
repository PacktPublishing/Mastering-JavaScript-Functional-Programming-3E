type Curry<P, R> = P extends []
  ? R
  : P extends [infer H]
  ? (arg: H) => R // only 1 arg
  : P extends [infer H, ...infer T] // 2 or more args
  ? (arg: H) => Curry<[...T], R>
  : never;

function curry<P extends any[], R>(
  fn: (...args: P) => R
): Curry<P, R>;

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

export { curry };
export type { Curry };
