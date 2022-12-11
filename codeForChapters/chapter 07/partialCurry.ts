const make3 = (a: string, b: number, c: string): string =>
  `${a}:${b}:${c}`;

type TypesMatch<
  P extends any[],
  A extends any[]
> = 0 extends P["length"]
  ? boolean
  : 0 extends A["length"]
  ? boolean
  : [P, A] extends [
      [infer PH, ...infer PT],
      [infer AH, ...infer AT]?
    ]
  ? AH extends undefined
    ? TypesMatch<PT, AT>
    : PH extends AH
    ? TypesMatch<PT, AT>
    : never
  : never;

type Minus<X, Y> = [X, Y] extends [
  [any, ...infer XT],
  [any, ...infer YT]
]
  ? Minus<XT, YT>
  : X;

type PartialCurry<P extends any[], R> = <A extends any[]>(
  ...x: A
) => TypesMatch<P, A> extends never
  ? never
  : P extends any[]
  ? A["length"] extends P["length"]
    ? R
    : PartialCurry<Minus<P, A>, R>
  : never;

function partialCurryByBind<A extends any[], R>(
  fn: (...args: A) => R
): PartialCurry<A, R>;
function partialCurryByBind(fn: (...args: any) => any) {
  return fn.length === 0
    ? fn()
    : (...x: any[]) =>
        partialCurryByBind(fn.bind(null, ...x));
}

function partialCurryByClosure<P extends any[], R>(
  fn: (...a: P) => R
): PartialCurry<P, R>;
function partialCurryByClosure(fn: (...a: any) => any) {
  const curryize =
    (...args1: any[]) =>
    (...args2: any[]) => {
      const allParams = [...args1, ...args2];
      return allParams.length < fn.length
        ? curryize(...allParams)
        : fn(...allParams);
    };

  return curryize();
}

const h1 = partialCurryByBind(make3);
const h2 = h1("A");
const h3 = h2(2, "Z");
console.log(h3); // A:2:Z

const h5 = h1("BE", 4);
const h6 = h5("YOU");
console.log(h6); // BE:4:YOU

const h7 = h5()()()("ME");
console.log(h7); // B:4:ME

const h8 = partialCurryByBind(make3)("I", 8);
const h9 = h8("SOME");
console.log(h9); // "I:8:SOME"

export { partialCurryByBind, partialCurryByClosure };
