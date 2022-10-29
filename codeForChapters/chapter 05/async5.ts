import { mapAsync } from "./async4";

const useResult = (x: any): void =>
  console.log(new Date(), x);

const fakeFilter = (value: number): Promise<boolean> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value % 2 === 0), 1000)
  );

const filterAsync = <T>(
  arr: T[],
  fn: (x: T) => Promise<boolean>
) =>
  mapAsync(arr, fn).then((arr2) =>
    arr.filter((v, i) => Boolean(arr2[i]))
  );

(async () => {
  console.log("START FILTER");

  const filtered = await filterAsync(
    [1, 2, 3, 4],
    async (n) => {
      const x = await fakeFilter(n);
      return x;
    }
  );

  useResult(filtered);
  console.log("END FILTER");
})();
/*
START FILTER
2022-10-29T01:56:19.798Z [ 2, 4 ]
END FILTER
*/

export {};
