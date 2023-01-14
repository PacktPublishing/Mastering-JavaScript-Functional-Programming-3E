/* eslint-disable no-sparse-arrays */

type Opt<X> = X | undefined;

const filterR = <A>(
  orig: Opt<A>[],
  cb: (x: A, i: number, a: Opt<A>[]) => boolean
): A[] => {
  const filterLoop = (arr: Opt<A>[], i: number): A[] =>
    arr.length == 0
      ? []
      : !(0 in arr) ||
        arr[0] === undefined ||
        !cb(arr[0] as A, i, orig)
      ? filterLoop(arr.slice(1), i + 1)
      : ([arr[0]] as A[]).concat(
          filterLoop(arr.slice(1), i + 1) as A[]
        );

  return filterLoop(orig, 0);
};

const bbb = [1, 12, , , 5, 22, 9, 60];
const isOdd = (x: number): boolean => x % 2 === 1;
console.log(bbb.filter((x) => x && isOdd(x))); // [1, 5, 9]
console.log(filterR(bbb, isOdd)); // [1, 5, 9]

export {};
