// import { forEachAsync } from "./async3";

const useResult = (x: any): void =>
  console.log(new Date(), x);

const forEachAsync = (
  arr: any[],
  fn: (x: any, y?: any) => any
): Promise<any> =>
  arr.reduce(
    (promise: Promise<any>, value: any) =>
      promise.then(() => fn(value)),
    Promise.resolve()
  );

const reduceAsync = <T, R>(
  arr: T[],
  fn: (acc: R, val: T) => Promise<R>,
  init: R
) =>
  Promise.resolve(init).then((accum) =>
    forEachAsync(arr, async (v: T) => {
      accum = await fn(accum, v);
    }).then(() => accum)
  );

const fakeSum = (
  value1: number,
  value2: number
): Promise<number> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value1 + value2), 1000)
  );

(async () => {
  console.log("START REDUCE");

  const summed = await reduceAsync(
    [1, 2, 3, 4],
    async (_accum, n) => {
      const accum = await _accum;
      const x = await fakeSum(accum, n);
      useResult(`accum=${accum} value=${x} `);
      return x;
    },
    0
  );

  useResult(summed);
  console.log("END REDUCE");
})();
/*
START REDUCE
2022-10-29T02:04:20.862Z accum=0 value=1
2022-10-29T02:04:21.864Z accum=1 value=3
2022-10-29T02:04:22.865Z accum=3 value=6
2022-10-29T02:04:23.866Z accum=6 value=10
2022-10-29T02:04:23.866Z 10
END REDUCE
*/

export {};
