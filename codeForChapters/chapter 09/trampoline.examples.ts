import { trampoline } from "./trampoline";
import type { FN } from "../common";

const getIsoDT = () => new Date().toISOString(); // a thunk
const isoDT = getIsoDT(); // getting the thunk's value
console.log(isoDT);

const sumAll = (n: number): number =>
  n == 0 ? 0 : n + sumAll(n - 1);

console.log(sumAll(10));
console.log(sumAll(100));
console.log(sumAll(1_000));
// THIS WILL CRASH! console.log(sumAll(10_000));
// THIS WILL CRASH! console.log(sumAll(100_000));

const sumAllC = (n: number, cont: FN): number =>
  n === 0 ? cont(0) : sumAllC(n - 1, (v) => cont(v + n));

sumAllC(100, console.log); // OK
// THIS WILL CRASH! sumAllC(100_000, console.log); // crash as earlier

const sumAllT = (n: number, cont: FN): (() => number) =>
  n === 0
    ? () => cont(0)
    : () => sumAllT(n - 1, (v) => () => cont(v + n));

const sumAll2 = (n: number): number =>
  trampoline(sumAllT(n, (x) => x));

console.log(sumAll2(1_000_000)); // OK now!

const sumAll3 = (n: number): number => {
  const sumAllT = (n: number, cont: FN) =>
    n === 0
      ? () => cont(0)
      : () => sumAllT(n - 1, (v) => () => cont(v + n));

  return trampoline(sumAllT(n, (x) => x));
};

console.log(sumAll3(1_000_000));
