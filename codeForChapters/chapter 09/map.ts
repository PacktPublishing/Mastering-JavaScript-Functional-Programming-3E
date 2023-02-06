/* eslint-disable no-sparse-arrays */

import type { OPT } from "../common";

const mapR = <A, B>(arr: A[], cb: (x: A) => B): B[] =>
  arr.length === 0
    ? []
    : [cb(arr[0])].concat(mapR(arr.slice(1), cb));

const aaa = [1, 2, 4, 5, 7];
const timesTen = (x: number): number => x * 10;

console.log(aaa.map(timesTen)); // [10, 20, 40, 50, 70]
console.log(mapR(aaa, timesTen)); // [10, 20, 40, 50, 70]

const timesTenPlusI = (v: number, i: number) => 10 * v + i;

console.log(aaa.map(timesTenPlusI)); // [10, 21, 42, 53, 74]
// console.log(mapR(aaa, timesTenPlusI)); // [NaN, NaN, NaN, NaN, NaN]

const mapR2 = <A, B>(
  arr: A[],
  cb: (x: A, i: number, arr: A[]) => B,
  i = 0,
  orig = arr
): B[] =>
  arr.length == 0
    ? []
    : [cb(arr[0], i, orig)].concat(
        mapR2(arr.slice(1), cb, i + 1, orig)
      );

const senseless = (
  x: number,
  i: number,
  a: number[]
): number => x * 10 + i + a[i] / 10;

console.log(aaa.map(senseless)); // [10.1, 21.2, 42.4, 53.5, 74.7]
console.log(mapR2(aaa, senseless)); // [10.1, 21.2, 42.4, 53.5, 74.7]

const mapR3 = <A, B>(
  orig: A[],
  cb: (x: A, i: number, a: A[]) => B
): B[] => {
  const mapLoop = (arr: A[], i: number): B[] =>
    arr.length == 0
      ? []
      : [cb(arr[0], i, orig)].concat(
          mapLoop(arr.slice(1), i + 1)
        );
  return mapLoop(orig, 0);
};

console.log(mapR3(aaa, senseless)); // [10.1, 21.2, 42.4, 53.5, 74.7]

// @ts-expect-error All is OK
console.log([1, 2, , , 5].map(timesTen));
// [10, 20, undefined × 2, 50]

const mapR4 = <A, B>(
  orig: OPT<A>[],
  cb: (x: A, i: number, a: OPT<A>[]) => B
): OPT<B>[] => {
  const mapLoop = (arr: OPT<A>[], i: number): OPT<B>[] =>
    arr.length == 0
      ? []
      : !(0 in arr) || arr[0] === undefined
      ? ([,] as OPT<B>[]).concat(
          mapLoop(arr.slice(1), i + 1)
        )
      : ([cb(arr[0] as A, i, orig)] as OPT<B>[]).concat(
          mapLoop(arr.slice(1), i + 1)
        );

  return mapLoop(orig, 0);
};

const senseless2 = (
  x: number,
  i: number,
  a: (number | undefined)[]
): number => x * 10 + i + (a[i] as number) / 10;

console.log(mapR4([1, 2, 3, 4, 5], senseless2));
console.log(mapR4([1, 2, , , 5], senseless2));

export {};
