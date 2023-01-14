import type { Pipeline, FN } from "../chapter 08/pipeline";

function pipelineR<FNS extends FN[]>(
  ...fns: FNS
): Pipeline<FNS>;
function pipelineR<FNS extends FN[]>(...fns: FNS): FN {
  return fns.length === 1
    ? fns[0]
    : (...args) =>
        pipelineR(...fns.slice(1))(fns[0](...args));
}

function pipelineR2<FNS extends FN[]>(
  ...fns: FNS
): Pipeline<FNS>;
function pipelineR2<FNS extends FN[]>(...fns: FNS): FN {
  return fns.length === 0
    ? (...args) => args[0]
    : (...args) =>
        pipelineR2(...fns.slice(1))(fns[0](...args));
}

const plus1 = (x: number): number => x + 1;
const by10 = (x: number): number => x * 10;

console.log(
  pipelineR(
    by10,
    plus1,
    plus1,
    plus1,
    by10,
    plus1,
    by10,
    by10,
    plus1,
    plus1,
    plus1
  )(2)
);
// 23103

console.log(
  pipelineR2(
    by10,
    plus1,
    plus1,
    plus1,
    by10,
    plus1,
    by10,
    by10,
    plus1,
    plus1,
    plus1
  )(2)
);

export {};
