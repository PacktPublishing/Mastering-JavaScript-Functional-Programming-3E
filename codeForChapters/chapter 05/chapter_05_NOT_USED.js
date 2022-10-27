/* ***************** not used!
(async () => {
    console.log("START FOREACH");

    const allPromises = [1, 2, 3, 4].map(async n => {
        const x = await fakeAPI(n * 500, n);
        return x;
    });

    const allValues = await Promise.all(allPromises);
    allValues.forEach(useResult);

    console.log("END FOREACH");
})();
/*
START!!!
2019-10-12T13:57:38.639Z 1
2019-10-12T13:57:38.646Z 2
2019-10-12T13:57:38.647Z 3
2019-10-12T13:57:38.647Z 4
END!!!
*/

// POLYFILLS BY, OR INSPIRED BY, VALERI KARPOV'S ARTICLE

Array.prototype.forEachAsync = function(fn) {
  return this.reduce(
    (promise, value) => promise.then(() => fn(value)),
    Promise.resolve()
  );
};

/*
(async () => {
    console.log("START!!!!");
    await [1, 2, 3, 4].forEachAsync(async n => {
        const x = await fakeAPI(n * 500, n);
        useResult(x);
    });
    console.log("END!!!!");
})();
*/

Array.prototype.mapAsync = function(fn) {
  return Promise.all(this.map(fn));
};
/*
(async () => {
    console.log("START MAP");
    const mapped = await [1, 2, 3, 4].mapAsync(async n => {
        const x = await fakeAPI(n * 500, n);
        return x;
    });
    console.log("END MAP", mapped);
})();
*/

Array.prototype.filterAsync = function(fn) {
  return this.mapAsync(fn).then(arr =>
    this.filter((v, i) => Boolean(arr[i]))
  );
};
/*
(async () => {
    console.log("START FILTER");
    const filtered = await [1, 2, 3, 4].filterAsync(async n => {
        const x = await fakeAPI(n * 500, n);
        return x % 2 === 0;
    });
    console.log("END FILTER", filtered);
})();
*/

Array.prototype.reduceAsync = function(fn, initial) {
  return Promise.resolve(initial).then(cur => {
    return this.forEachAsync(async function(v, i) {
      cur = await fn(cur, v, i);
    }).then(() => cur);
  });
};
/*
(async () => {
    console.log("START REDUCE");
    const summed = await [1, 2, 3, 4].reduceAsync(async (cur, n) => {
        const x = await fakeAPI(n * 500, n);
        useResult(x);
        return x ** 2 + cur;
    }, 0);
    console.log("END REDUCE", summed);
})();
*/
