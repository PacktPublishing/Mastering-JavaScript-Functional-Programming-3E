import { range } from "./range";

console.log(range(2, 7)); // [2, 3, 4, 5, 6];

const factorialByRange = (n: number): number =>
  range(1, n + 1).reduce((x, y) => x * y, 1);

console.log(factorialByRange(5)); // 120
console.log(factorialByRange(1)); // 1
console.log(factorialByRange(0)); // 1

const ALPHABET = range(
  "A".charCodeAt(0),
  "Z".charCodeAt(0) + 1
).map((x) => String.fromCharCode(x));
console.log(ALPHABET);
// ["A", "B", "C", ... "X", "Y", "Z"]

export { factorialByRange, ALPHABET, range };
