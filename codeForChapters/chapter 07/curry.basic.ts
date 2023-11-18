type EQUALS<T, S> = [T] extends [S]
  ? [S] extends [T]
    ? true
    : false
  : false;

/* https://stackoverflow.com/questions/53807517/how-to-test-if-two-types-are-exactly-the-same */

type QRY<P extends any[], R> = 0 extends P["length"]
  ? R
  : EQUALS<1, P["length"]> extends true
  ? (a: P[0]) => QRY<[], R>
  : EQUALS<2, P["length"]> extends true
  ? (a: P[0]) => QRY<[P[1]], R>
  : EQUALS<3, P["length"]> extends true
  ? (a: P[0]) => QRY<[P[1], P[2]], R>
  : EQUALS<4, P["length"]> extends true
  ? (a: P[0]) => QRY<[P[1], P[2], P[3]], R>
  : never;

/* ORIGINAL
function curry<A extends any[], R>(
  fn: (...args: A) => R
): QRY<A, R>;
function curry(
  fn: (...args: any[]) => any
): QRY<Parameters<typeof fn>, ReturnType<typeof fn>> {
  if (fn.length === 0) return fn();

  return (x: any) => curry(fn.bind(null, x));
}
*/

function curry<A extends any[], R>(
  fn: (...args: A) => R
): QRY<A, R>;
function curry(
  fn: (...args: any[]) => any
): QRY<Parameters<typeof fn>, ReturnType<typeof fn>> {
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

export { curry, make3 };
export type { QRY };
