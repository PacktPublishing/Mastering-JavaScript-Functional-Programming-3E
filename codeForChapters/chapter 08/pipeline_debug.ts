import { addLogging } from "../chapter 06/logging";
import { pipeline, pipeline3 } from "./pipeline";
import { getDir, filterOdt, count } from "./pipeline";

import type { FN } from "../common";

type Curry<P, R> = P extends []
  ? R
  : P extends [infer H]
  ? (_arg: H) => R // only 1 arg
  : P extends [infer H, ...infer T] // 2 or more args
  ? (_arg: H) => Curry<[...T], R>
  : never;

function curry<A extends any[], R>(
  _fn: (..._args: A) => R
): Curry<A, R>;
function curry(fn: (..._args: any) => any) {
  return fn.length === 0
    ? fn()
    : (x: any) => curry(fn.bind(null, x));
}

const tee = <A>(arg: A): A => {
  console.log(arg);
  return arg;
};

/* Alternative:
const tee = <A>(arg: A) => (console.log(arg), arg);
*/

console.log("------------------------");

console.log(
  pipeline(
    getDir,
    <typeof tee<string[]>>tee,
    filterOdt,
    <typeof tee<string[]>>tee,
    <typeof count<string>>count
  )("/home/fkereki/Documents")
);

const tee2 = <A>(arg: A, logger = console.log) => {
  logger(arg);
  return arg;
};

const tap = curry(<A>(fn: FN, x: A) => (fn(x), x));

const tee3 = tap(console.log);

const tap2 =
  (fn: FN) =>
  <A>(x: A) => (fn(x), x);

console.log("------------------------");
console.log(getDir.name, filterOdt.name, count.name);
console.log("------------------------");

/*
  Note: the following code will fail if you
  don't have a /home/fkereki/Documents directory.
  Substitute another directory from your own machine.
*/

pipeline(
  addLogging(getDir),
  addLogging(filterOdt),
  addLogging(count)
)("/home/fkereki/Documents");

export { tee, tee2 };
