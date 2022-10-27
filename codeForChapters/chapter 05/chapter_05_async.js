const fakeAPI = (delay, value) =>
  new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x);

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
2019-10-13T19:11:56.209Z
2019-10-13T19:11:57.214Z 229
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
2019-10-12T13:38:42.367Z 1
2019-10-12T13:38:43.375Z 2
2019-10-12T13:38:44.878Z 3
2019-10-12T13:38:46.880Z 4
END SEQUENCE
*/

/*
(() => {
    console.log("START FOREACH");

    [1, 2, 3, 4].forEach(async n => {
        const x = await fakeAPI(n * 1000, n);
        useResult(x);
    });

    console.log("END FOREACH");
})();
/*
START FOREACH
END FOREACH
2019-10-12T13:34:57.876Z 1
2019-10-12T13:34:58.383Z 2
2019-10-12T13:34:58.874Z 3
2019-10-12T13:34:59.374Z 4
*/

const forEachAsync = (arr, fn) =>
  arr.reduce(
    (promise, value) => promise.then(() => fn(value)),
    Promise.resolve()
  );
/*
(async () => {
    console.log("START FOREACH VIA REDUCE");
    await forEachAsync([1, 2, 3, 4], async n => {
        const x = await fakeAPI(n * 1000, n);
        useResult(x);
    });
    console.log("END FOREACH VIA REDUCE");
})();
/*
START FOREACH VIA REDUCE
2019-10-13T20:02:23.437Z 1
2019-10-13T20:02:24.446Z 2
2019-10-13T20:02:25.949Z 3
2019-10-13T20:02:27.952Z 4
END FOREACH VIA REDUCE
*/

const mapAsync = (arr, fn) => Promise.all(arr.map(fn));

/*
(async () => {
    console.log("START MAP");

    const mapped = await mapAsync([1, 2, 3, 4], async n => {
        const x = await fakeAPI(n * 1000, n);
        return x;
    });

    useResult(mapped);
    console.log("END MAP");
})();
/*
START MAP
2019-10-13T20:06:21.149Z [ 1, 2, 3, 4 ]
END MAP
*/

const filterAsync = (arr, fn) =>
  mapAsync(arr, fn).then(arr2 => arr.filter((v, i) => Boolean(arr2[i])));

const fakeFilter = value =>
  new Promise(resolve => setTimeout(() => resolve(value % 2 === 0), 1000));
/*
(async () => {
    console.log("START FILTER");

    const filtered = await filterAsync([1, 2, 3, 4], async n => {
        const x = await fakeFilter(n);
        return x;
    });

    useResult(filtered);
    console.log("END FILTER");
})();
/*
START FILTER
2019-10-13T21:24:36.478Z [ 2, 4 ]
END FILTER
*/

const reduceAsync = (arr, fn, init) =>
  Promise.resolve(init).then(accum =>
    forEachAsync(arr, async (v, i) => {
      accum = await fn(accum, v, i);
    }).then(() => accum)
  );

const fakeSum = (value1, value2) =>
  new Promise(resolve => setTimeout(() => resolve(value1 + value2), 1000));
/*
(async () => {
    console.log("START REDUCE");

    const summed = await reduceAsync(
        [1, 2, 3, 4],
        async (_accum, n) => {
            const accum = await _accum;
            const x = await fakeSum(accum, n);
            useResult(`accumulator=${accum} value=${x} `);
            return x;
        },
        0
    );

    useResult(summed);
    console.log("END REDUCE");
})();
/*
START REDUCE
2019-10-13T21:29:01.841Z 'accumulator=0 value=1 '
2019-10-13T21:29:02.846Z 'accumulator=1 value=3 '
2019-10-13T21:29:03.847Z 'accumulator=3 value=6 '
2019-10-13T21:29:04.849Z 'accumulator=6 value=10 '
2019-10-13T21:29:04.849Z 10
END REDUCE
*/

const someAsync = (arr, fn) =>
  mapAsync(arr, fn).then(mapped => mapped.some(Boolean));

(async () => {
  const someEven = await someAsync([1, 2, 3, 4], fakeFilter);
  useResult(someEven);

  const someEven2 = await someAsync([1, 3, 5, 7, 9], fakeFilter);
  useResult(someEven2);
})();
/*
2019-10-13T22:05:32.215Z true
2019-10-13T22:05:33.257Z false
*/
