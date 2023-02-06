const getArray = curry((ind, arr) => arr[ind]);

const setArray = curry((ind, value, arr) => {
  arr[ind] = value;
  return arr;
});

const lensArray = (ind) =>
  lens(getArray(ind), setArray(ind));

export {};
