import type { TypesMatch } from "./partial.fn";

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

export { partialCurryByBind, partialCurryByClosure };
