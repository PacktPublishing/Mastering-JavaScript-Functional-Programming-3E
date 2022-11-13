/*
const demethodize1 =
  (fn) =>
  (arg0, ...args) =>
    fn.apply(arg0, args);

const demethodize2 =
  (fn) =>
  (arg0, ...args) =>
    fn.call(arg0, ...args);

const demethodize3 =
  (fn) =>
  (...args) =>
    fn.bind(...args)();
*/

const demethodize1 =
  <T extends (arg0: any, ...args: any[]) => any>(fn: T) =>
  (arg0: any, ...args: Parameters<T>) =>
    fn.apply(arg0, args);

const demethodize2 =
  <T extends (arg0: any, ...args: any[]) => any>(fn: T) =>
  (arg0: any, ...args: Parameters<T>): ReturnType<T> =>
    fn.call(arg0, ...args);

const demethodize3 =
  <T extends (arg0: any, ...args: any[]) => any>(fn: T) =>
  (arg0: any, ...args: Parameters<T>): ReturnType<T> =>
    fn.bind(arg0, ...args)();

const sort = demethodize1(Array.prototype.sort);
const a = ["delta", "alfa", "beta", "gamma", "epsilon"];
const b = sort(a);
console.log(a, b);

const name = "FUNCTIONAL";

const result = name.split("").map((x) => x.toUpperCase());
// ["F", "U", "N", "C", "T", "I", "O", "N", "A", "L"]
console.log(result);

const map = demethodize1(Array.prototype.map);
const toUpperCase = demethodize2(
  String.prototype.toUpperCase
);
const result2 = map(name, toUpperCase);
// ["F", "U", "N", "C", "T", "I", "O", "N", "A", "L"]
console.log(result2);

const toLocaleString = demethodize3(
  Number.prototype.toLocaleString
);

const numbers = [2209.6, 124.56, 1048576];
// @ts-expect-error TS doesn't match types
const strings = numbers.map(toLocaleString);
console.log(strings);

// ["2,209.6", "124.56", "1,048,576"]
// @ts-expect-error TS doesn't match types
const strings2 = map(numbers, toLocaleString);
console.log(strings2);

export { demethodize1, demethodize2, demethodize3 };
