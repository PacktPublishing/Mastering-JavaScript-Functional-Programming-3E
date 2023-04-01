import { compose } from "./compose";

import type { FN } from "../common";

const addToArray = (a: any[], v: any): any[] => {
  a.push(v);
  return a;
};

const mapTR =
  <V, W>(fn: (x: V) => W) =>
  <A>(reducer: (am: A, wm: W) => A) =>
  (accum: A, value: V): A =>
    reducer(accum, fn(value));

const filterTR =
  <V>(fn: (x: V) => boolean) =>
  <A>(reducer: (af: A, wf: V) => A) =>
  (accum: A, value: V): A =>
    fn(value) ? reducer(accum, value) : accum;

const transduce = <A>(arr: A[], fns: FN[]) =>
  arr.reduce(compose(...fns)(addToArray), []);

const transduce2 = <A>(
  arr: A[],
  fns: FN[],
  reducer: FN = addToArray,
  initial: any = []
) => arr.reduce(compose(...fns)(reducer), initial);

export { transduce, transduce2, filterTR, mapTR };
