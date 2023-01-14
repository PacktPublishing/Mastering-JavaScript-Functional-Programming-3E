type FN = (...args: any[]) => any;

const getIsoDT = () => new Date().toISOString(); // a thunk
const isoDT = getIsoDT(); // getting the thunk's value
console.log(isoDT);

const trampoline = (fn: FN): any => {
  while (typeof fn === "function") {
    fn = fn();
  }
  return fn;
};

const sumAll = (n: number): number =>
  n == 0 ? 0 : n + sumAll(n - 1);

/*
console.log(sumAll(10));
console.log(sumAll(100));
console.log(sumAll(1_000));
console.log(sumAll(10_000));
console.log(sumAll(100_000));
*/

const sumAllC = (n: number, cont: FN): number =>
  n === 0 ? cont(0) : sumAllC(n - 1, (v) => cont(v + n));

/*
sumAllC(100, console.log); // OK
sumAllC(100_000, console.log); // crash as earlier
*/

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

class Thunk {
  fn: FN;
  constructor(fn: FN) {
    this.fn = fn;
  }
}

const trampoline2 = (thk: Thunk) => {
  while (
    typeof thk === "object" &&
    thk.constructor.name === "Thunk"
  ) {
    thk = thk.fn();
  }
  return thk;
};

export { trampoline };
