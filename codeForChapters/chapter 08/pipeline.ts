import type { FN } from "../common";

const pipeTwo =
  <F extends FN, G extends FN>(f: F, g: G) =>
  (...args: Parameters<F>): ReturnType<G> =>
    g(f(...args));

type FnsMatchPipe<FNS extends FN[]> =
  1 extends FNS["length"]
    ? boolean
    : FNS extends [
        infer FN1st extends FN,
        infer FN2nd extends FN,
        ...infer FNRest extends FN[]
      ]
    ? Parameters<FN2nd> extends [ReturnType<FN1st>]
      ? FnsMatchPipe<[FN2nd, ...FNRest]>
      : never
    : never;

type Pipeline<FNS extends FN[]> =
  boolean extends FnsMatchPipe<FNS>
    ? 1 extends FNS["length"]
      ? FNS[0]
      : FNS extends [
          infer FNFIRST extends FN,
          ...FN[],
          infer FNLAST extends FN
        ]
      ? (...args: Parameters<FNFIRST>) => ReturnType<FNLAST>
      : never
    : never;

function pipeline<FNS extends FN[]>(
  ...fns: FNS
): Pipeline<FNS>;
function pipeline<FNS extends FN[]>(...fns: FNS): FN {
  return (...args: Parameters<FNS[0]>) => {
    let result = fns[0](...args);
    for (let i = 1; i < fns.length; i++) {
      result = fns[i](result);
    }
    return result;
  };
}

function pipeline2<FNS extends FN[]>(
  ...fns: FNS
): Pipeline<FNS>;
function pipeline2<FNS extends FN[]>(...fns: FNS): FN {
  return fns.reduce(
    (result, f) =>
      (...args) =>
        f(result(...args))
  );
}

function pipeline3<FNS extends FN[]>(
  ...fns: FNS
): Pipeline<FNS>;
function pipeline3<FNS extends FN[]>(
  ...fns: FNS
): (...fns: FNS) => FN {
  return fns.reduce(pipeTwo);
}

export { pipeline, pipeline2, pipeline3, pipeTwo };
export type { Pipeline, FN };
