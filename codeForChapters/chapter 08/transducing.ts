import { compose } from "./compose";

import type { FN } from "../common";

const testOdd = (x: number): boolean => x % 2 === 1;
const testUnderFifty = (x: number): boolean => x < 50;
const duplicate = (x: number): number => x + x;
const addThree = (x: number): number => x + 3;

const myArray: number[] = [22, 9, 60, 24, 11, 63];

const a0 = myArray
  .filter(testOdd)
  .map(duplicate)
  .filter(testUnderFifty)
  .map(addThree);
console.log(a0);
// [ 21, 25 ]

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

const testOddR = filterTR(testOdd);
const duplicateR = mapTR(duplicate);
const testUnderFiftyR = filterTR(testUnderFifty);
const addThreeR = mapTR(addThree);

const addToArray = (a: any[], v: any): any[] => {
  a.push(v);
  return a;
};

console.log(
  myArray.reduce(
    testOddR(
      duplicateR(testUnderFiftyR(addThreeR(addToArray)))
    ),
    []
  )
);
// [ 21, 25 ]

const transduce = <A>(arr: A[], fns: FN[]) =>
  arr.reduce(compose(...fns)(addToArray), []);

console.log(
  transduce(myArray, [
    testOddR,
    duplicateR,
    testUnderFiftyR,
    addThreeR,
  ])
);
// [ 21, 25 ]

const transduce2 = <A>(
  arr: A[],
  fns: FN[],
  reducer: FN = addToArray,
  initial: any = []
) => arr.reduce(compose(...fns)(reducer), initial);

console.log(
  transduce2(myArray, [
    testOddR,
    duplicateR,
    testUnderFiftyR,
    addThreeR,
  ])
);
// [ 21, 25 ]

console.log(
  transduce2(
    myArray,
    [testOddR, duplicateR, testUnderFiftyR, addThreeR],
    (acc, value) => acc + value,
    0
  )
);
// 46

export { transduce, transduce2, filterTR, mapTR };
