import { deepCopy } from "./deepCopy";

type Curry<P, R> = P extends []
  ? R
  : P extends [infer H]
  ? (arg: H) => R // only 1 arg
  : P extends [infer H, ...infer T] // 2 or more args
  ? (arg: H) => Curry<[...T], R>
  : never;

function curry<A extends any[], R>(
  fn: (...args: A) => R
): Curry<A, R>;
function curry(fn: (...args: any) => any) {
  return fn.length === 0
    ? fn()
    : (x: any) => curry(fn.bind(null, x));
}

const deepFreeze = <A extends { [key: string]: any }>(
  obj: A
): A => {
  if (
    obj &&
    typeof obj === "object" &&
    !Object.isFrozen(obj)
  ) {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach((prop) =>
      deepFreeze(obj[prop])
    );
  }

  return obj;
};

const getField =
  <D extends { [key: string]: any }>(f: keyof D) =>
  (obj: D) =>
    obj[f];

const getByPath = <D extends { [key: string]: any }>(
  arr: string[],
  obj: D
): any => {
  if (arr[0] in obj) {
    return arr.length > 1
      ? getByPath(arr.slice(1), obj[arr[0]])
      : deepCopy(obj[arr[0]]);
  } else {
    return undefined;
  }
};

const myObj4 = deepFreeze({
  d: 22,
  m: 9,
  o: { c: "MVD", i: "UY", f: { a: 56 } },
});

console.log(getByPath(["d"], myObj4)); // 22
console.log(getByPath(["o"], myObj4)); // {c: "MVD", i: "UY", f: {a: 56}}
console.log(getByPath(["o", "c"], myObj4)); // "MVD"
console.log(getByPath(["o", "f", "a"], myObj4)); // 56

const fObj = getByPath(["o", "f"], myObj4);
console.log(fObj); // {a: 56}

fObj.a = 9999;
console.log(fObj); // {a: 9999} -- it's not frozen

export { getByPath };
