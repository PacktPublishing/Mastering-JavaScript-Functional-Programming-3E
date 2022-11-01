const fakeAPI = <T>(delay: number, value: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(value), delay)
  );

const useResult = (x: any): void =>
  console.log(new Date(), x);

/*
(async () => {
  console.log("START");
  console.log(new Date());
  const result = await fakeAPI(1000, 229);
  useResult(result);
  console.log("END");
})();

/*
START
2022-10-29T01:28:12.986Z
2022-10-29T01:28:13.989Z 229
END
*/

/*
(async () => {
  console.log("START SEQUENCE");

  const x1 = await fakeAPI(1000, 1);
  useResult(x1);
  const x2 = await fakeAPI(2000, 2);
  useResult(x2);
  const x3 = await fakeAPI(3000, 3);
  useResult(x3);
  const x4 = await fakeAPI(4000, 4);
  useResult(x4);

  console.log("END SEQUENCE");
})();
/*
START SEQUENCE
2022-10-29T01:32:11.671Z 1
2022-10-29T01:32:13.677Z 2
2022-10-29T01:32:16.680Z 3
2022-10-29T01:32:20.683Z 4
END SEQUENCE
*/

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
  fn: (x: T) => any
): Promise<any> =>
  arr.reduce(
    (promise: Promise<void>, value: T) =>
      promise.then(() => fn(value)),
    Promise.resolve()
  );

/*
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

/*
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
/*
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

export { fakeFilter, fakeSum, fakeAPI, useResult };
export { mapAsync, forEachAsync, reduceAsync, filterAsync };
