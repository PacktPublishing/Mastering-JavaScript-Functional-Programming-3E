/* eslint-disable @typescript-eslint/no-unused-vars */

const memoize = (fn) => {
  const cache = {};
  return (x) =>
    x in cache ? cache[x] : (cache[x] = fn(x));
};
