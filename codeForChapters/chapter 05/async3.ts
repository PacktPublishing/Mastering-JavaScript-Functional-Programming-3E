const fakeAPI = <T>(delay: number, value: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), delay)
  );

const useResult = (x: any): void =>
  console.log(new Date(), x);

/*
(() => {
  console.log("START FOREACH");

  [1, 2, 3, 4].forEach(async (n) => {
    const x = await fakeAPI(n * 1000, n);
    useResult(x);
  });

  console.log("END FOREACH");
})();
/*
START FOREACH
END FOREACH
2022-10-29T01:34:06.287Z 1
2022-10-29T01:34:07.287Z 2
2022-10-29T01:34:08.286Z 3
2022-10-29T01:34:09.286Z 4
*/

const forEachAsync = <T>(
  arr: T[],
  fn: (x: T) => void
): void => {
  arr.reduce(
    (promise: Promise<void>, value: T) =>
      promise.then(() => fn(value)),
    Promise.resolve()
  );
};

(async () => {
  console.log("START FOREACH VIA REDUCE");
  await forEachAsync([1, 2, 3, 4], async (n) => {
    const x = await fakeAPI(n * 1000, n);
    useResult(x);
  });
  console.log("END FOREACH VIA REDUCE");
})();

/*
START FOREACH VIA REDUCE
2022-10-29T01:42:09.385Z 1
2022-10-29T01:42:11.388Z 2
2022-10-29T01:42:14.391Z 3
2022-10-29T01:42:18.392Z 4
END FOREACH VIA REDUCE
*/

export { fakeAPI, useResult, forEachAsync };
