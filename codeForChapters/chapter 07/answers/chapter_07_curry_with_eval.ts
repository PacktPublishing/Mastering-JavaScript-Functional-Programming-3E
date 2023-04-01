import { range } from "../../chapter 05/range";

import type { Curry } from "../curry.examples";

function curryByEval<A extends any[], R>(
  _fn: (..._args: A) => R
): Curry<A, R>;
function curryByEval(fn: (..._args: any) => any) {
  return eval(`${range(0, fn.length)
    .map((i) => `x${i}`)
    .join("=>")} =>
        ${fn.name}(${range(0, fn.length)
    .map((i) => `x${i}`)
    .join(",")})`);
}

function curryByEval2<A extends any[], R>(
  _fn: (..._args: A) => R
): Curry<A, R>;
function curryByEval2(fn: (..._args: any) => any) {
  return eval(`${range(0, fn.length)
    .map((i) => `x${i}`)
    .join("=>")} =>
    (${fn.toString()})
    (${range(0, fn.length)
      .map((i) => `x${i}`)
      .join(",")})`);
}

export { curryByEval, curryByEval2 };
