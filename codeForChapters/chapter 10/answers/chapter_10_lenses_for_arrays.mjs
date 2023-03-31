import curry from "../../chapter 07/js_versions/curry.js";
import lens from "../js_versions/lensesWithObjects.mjs";

const getArray = curry((ind, arr) => arr[ind]);

const setArray = curry((ind, value, arr) => {
  arr[ind] = value;
  return arr;
});

const lensArray = (ind) =>
  lens(getArray(ind), setArray(ind));

export {};
