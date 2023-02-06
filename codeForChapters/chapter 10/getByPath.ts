import { deepCopy } from "./deepCopy";
import { deepFreeze } from "./deepFreeze";

import type { OBJ } from "../common";

const getField =
  <O extends OBJ>(f: keyof O) =>
  (obj: O) =>
    obj[f];

const getByPath = <O extends OBJ>(
  arr: string[],
  obj: O
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
