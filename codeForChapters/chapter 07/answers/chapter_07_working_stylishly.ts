type Curry<P, R> = P extends [infer H]
  ? (arg: H) => R // only 1 arg
  : P extends [infer H, ...infer T] // 2 or more args
  ? (arg: H) => Curry<[...T], R>
  : never;

function curry<A extends any[], R>(
  fn: (...args: A) => R
): Curry<A, R>;
function curry(fn: (...args: any) => any) {
  return fn.length === 0
    ? fn()
    : (x: any) => curry(fn.bind(null, x));
}

const applyStyle =
  (style: string) =>
  (text: string): string =>
    `<${style}>${text}</${style}>`;

const makeBold = applyStyle("b");
console.log(makeBold("Montevideo"));
// <b>Montevideo</b>

const applyStyle2 = (style: string, text: string): string =>
  `<${style}>${text}</${style}>`;

const makeUnderline = curry(applyStyle2)("u");
console.log(makeUnderline("Uruguay"));
// <u>Uruguay</u>

export { applyStyle };
