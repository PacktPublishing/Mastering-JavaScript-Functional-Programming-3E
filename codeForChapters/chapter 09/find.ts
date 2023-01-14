/* eslint-disable no-sparse-arrays */

type Opt<X> = X | undefined;

const findR = <A>(
  arr: A[],
  cb: (x: A) => boolean
): Opt<A> =>
  arr.length === 0
    ? undefined
    : cb(arr[0])
    ? arr[0]
    : findR(arr.slice(1), cb);

const ccc = [1, 12, , , 5, 22, 9, 60];

const isTwentySomething = (x: number): boolean =>
  20 <= x && x <= 29;

// @ts-expect-error It's OK: the filter won't be called with undefined
console.log(findR(ccc, isTwentySomething)); // 22

const isThirtySomething = (x: number): boolean =>
  30 <= x && x <= 39;

// @ts-expect-error It's OK: the filter won't be called with undefined
console.log(findR(ccc, isThirtySomething)); // undefined

export {};
