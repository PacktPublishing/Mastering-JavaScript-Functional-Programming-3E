import { pipeline, pipeTwo, FN } from "./pipeline";

type FnsMatchComp<FNS extends FN[]> =
  1 extends FNS["length"]
    ? boolean
    : FNS extends [
        ...infer FNInit extends FN[],
        infer FNPrev extends FN,
        infer FNLast extends FN
      ]
    ? Parameters<FNPrev> extends [ReturnType<FNLast>]
      ? FnsMatchComp<[...FNInit, FNPrev]>
      : never
    : never;

type Compose<FNS extends FN[]> =
  boolean extends FnsMatchComp<FNS>
    ? 1 extends FNS["length"]
      ? FNS[0]
      : FNS extends [
          infer FNFIRST extends FN,
          ...FN[],
          infer FNLAST extends FN
        ]
      ? (...args: Parameters<FNLAST>) => ReturnType<FNFIRST>
      : never
    : never;

function compose<FNS extends FN[]>(
  ...fns: FNS
): Compose<FNS>;
function compose<FNS extends FN[]>(...fns: FNS): FN {
  return (...args: Parameters<FNS[0]>) => {
    let result = fns[fns.length - 1](...args);
    for (let i = fns.length - 2; i >= 0; i--) {
      result = fns[i](result);
    }
    return result;
  };
}

function compose1<FNS extends FN[]>(
  ...fns: FNS
): Compose<FNS> {
  return pipeline(...fns.reverse()) as Compose<FNS>;
}

function compose1b<FNS extends FN[]>(
  ...fns: FNS
): Compose<FNS>;
function compose1b<FNS extends FN[]>(...fns: FNS): FN {
  return pipeline(...fns.reverse());
}

function compose2<FNS extends FN[]>(
  ...fns: FNS
): Compose<FNS>;
function compose2<FNS extends FN[]>(
  ...fns: FNS
): (...fns: FNS) => FN {
  return fns.reduceRight(
    (f, g) =>
      (...args) =>
        g(f(...args))
  );
}

function compose3<FNS extends FN[]>(
  ...fns: FNS
): Compose<FNS>;
function compose3<FNS extends FN[]>(
  ...fns: FNS
): (...fns: FNS) => FN {
  return fns.reduceRight(pipeTwo);
}

const composeTwo =
  <F extends FN, G extends FN>(f: F, g: G) =>
  (...args: Parameters<G>): ReturnType<F> =>
    f(g(...args));

function flip2<A, B, R>(fn: (a: A, b: B) => R) {
  return (p1: B, p2: A) => fn(p2, p1);
}

const composeTwoByFlipping = flip2(pipeTwo);

export {
  compose,
  compose1,
  compose2,
  compose3,
  composeTwo,
  composeTwoByFlipping,
};
