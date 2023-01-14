/* eslint-disable no-sparse-arrays */

type Opt<X> = X | undefined;

const findR = <A>(
  orig: Opt<A>[],
  cb: (x: A, i: number, a: Opt<A>[]) => boolean
): Opt<A> => {
  const findLoop = (arr: Opt<A>[], i: number): Opt<A> =>
    arr.length === 0
      ? undefined
      : !(0 in arr) || arr[0] === undefined
      ? findLoop(arr.slice(1), i + 1)
      : cb(arr[0], i, orig)
      ? arr[0]
      : findLoop(arr.slice(1), i + 1);

  return findLoop(orig, 0);
};

const aaa = [1, 12, , , 5, 22, 9, 60];
const bbb = [1, 12, , , 5, 32, 9, 60];

const isTwentySomething = (x: number): boolean =>
  20 <= x && x <= 29;

console.log(findR(aaa, isTwentySomething)); // 22
console.log(findR(bbb, isTwentySomething)); // undefined

export {};
