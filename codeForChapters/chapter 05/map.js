const myMap = (arr, fn) =>
  arr.reduce((x, y) => x.concat(fn(y)), []);

export { myMap };
