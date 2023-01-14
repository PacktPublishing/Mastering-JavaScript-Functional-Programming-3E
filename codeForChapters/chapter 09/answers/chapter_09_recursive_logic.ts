/* eslint-disable no-sparse-arrays */

type Opt<X> = X | undefined;

const everyR = <A>(
  orig: Opt<A>[],
  cb: (x: A, i: number, a: Opt<A>[]) => boolean
): boolean => {
  const everyLoop = (arr: Opt<A>[], i: number): boolean =>
    arr.length === 0
      ? true
      : !(0 in arr) || arr[0] === undefined
      ? true
      : !cb(arr[0], i, orig)
      ? false
      : everyLoop(arr.slice(1), i + 1);

  return everyLoop(orig, 0);
};

const someR = <A>(
  orig: Opt<A>[],
  cb: (x: A, i: number, a: Opt<A>[]) => boolean
): boolean => {
  const someLoop = (arr: Opt<A>[], i: number): boolean =>
    arr.length === 0
      ? false
      : !(0 in arr) || arr[0] === undefined
      ? someLoop(arr.slice(1), i + 1)
      : cb(arr[0], i, orig)
      ? true
      : someLoop(arr.slice(1), i + 1);

  return someLoop(orig, 0);
};

const aaa = [1, 12, , , 5, 22, 9, 60];
const bbb = [1, 12, , , 5, 32, 9, 60];

const isTwentySomething = (x: number): boolean =>
  20 <= x && x <= 29;

console.log(everyR(aaa, isTwentySomething)); // false
console.log(everyR(bbb, isTwentySomething)); // false
console.log(someR(aaa, isTwentySomething)); // true
console.log(someR(bbb, isTwentySomething)); // false

export {};
