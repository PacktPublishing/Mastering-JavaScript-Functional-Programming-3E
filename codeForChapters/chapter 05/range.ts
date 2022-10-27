const range = (start: number, stop: number): number[] =>
  new Array(stop - start).fill(0).map((v, i) => start + i);
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
// ["A", "B", "C", ... "X", "Y", "Z"]
console.log(ALPHABET);
