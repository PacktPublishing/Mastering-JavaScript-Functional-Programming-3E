import { range } from "../../chapter 05/range";

import type { Curry } from "../curry";

function curryByEval<A extends any[], R>(
  fn: (...args: A) => R
): Curry<A, R>;
function curryByEval(fn: (...args: any) => any) {
  return eval(`${range(0, fn.length)
    .map((i) => `x${i}`)
    .join("=>")} =>
        ${fn.name}(${range(0, fn.length)
    .map((i) => `x${i}`)
    .join(",")})`);
}

function curryByEval2<A extends any[], R>(
  fn: (...args: A) => R
): Curry<A, R>;
function curryByEval2(fn: (...args: any) => any) {
  return eval(`${range(0, fn.length)
    .map((i) => `x${i}`)
    .join("=>")} =>
    (${fn.toString()})
    (${range(0, fn.length)
      .map((i) => `x${i}`)
      .join(",")})`);
}

export { curryByEval, curryByEval2 };
