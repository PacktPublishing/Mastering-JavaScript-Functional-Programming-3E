/* eslint-disable no-sparse-arrays */

const reduceR = <A, B>(
  orig: A[],
  cb: (acc: B, x: A, i: number, a: A[]) => B,
  accum: B
) => {
  const reduceLoop = (arr: A[], accum: B, i: number): B =>
    arr.length == 0
      ? accum
      : !(0 in arr) || arr[0] === undefined
      ? reduceLoop(arr.slice(1), accum, i + 1)
      : reduceLoop(
          arr.slice(1),
          cb(accum, arr[0], i, orig),
          i + 1
        );

  return reduceLoop(orig, accum, 0);
};

const sum = (x: number, y: number): number => x + y;

const bbb = [, , , 1, 2, , 5, 7, 8, 10, 21, 40];

// @ts-expect-error It's OK: sum() will not be called with undefined
console.log(bbb.reduce(sum, 0)); // 94

// @ts-expect-error It's OK: sum() will not be called with undefined
console.log(reduceR(bbb, sum, 0)); // 94

export {};
