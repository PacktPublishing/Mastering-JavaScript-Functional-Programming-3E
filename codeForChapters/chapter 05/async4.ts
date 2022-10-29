const fakeAPI = <T>(delay: number, value: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), delay)
  );

const useResult = (x: any): void =>
  console.log(new Date(), x);

const mapAsync = <T, R>(
  arr: T[],
  fn: (x: T) => Promise<R>
) => Promise.all(arr.map(fn));

/*
(async () => {
  console.log("START MAP");

  const mapped = await mapAsync([1, 2, 3, 4], async (n) => {
    const x = await fakeAPI(n * 1000, n);
    return x * 10;
  });

  useResult(mapped);
  console.log("END MAP");
})();
/*
START MAP
2022-10-29T01:47:06.726Z [ 10, 20, 30, 40 ]
END MAP
*/

export { mapAsync, fakeAPI, useResult };
