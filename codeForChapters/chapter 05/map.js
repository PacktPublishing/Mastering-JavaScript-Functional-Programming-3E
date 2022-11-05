/* eslint-disable @typescript-eslint/no-unused-vars */

const myMap = (arr, fn) =>
  arr.reduce((x, y) => x.concat(fn(y)), []);
