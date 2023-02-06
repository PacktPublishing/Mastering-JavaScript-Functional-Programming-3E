import { deepCopy } from "./deepCopy";
import { deepFreeze } from "./deepFreeze";

import type { OBJ } from "../common";

const setByPath = <O extends OBJ>(
  arr: string[],
  value: any,
  obj: O
): O => {
  if (!(arr[0] in obj)) {
    // TS objects to obj[arr[0]]=...

    (obj as any)[arr[0]] =
      arr.length === 1
        ? null
        : Number.isInteger(arr[1])
        ? []
        : {};

    /* This also works:

    Reflect.set(
      obj,
      arr[0],
      arr.length === 1
        ? null
        : Number.isInteger(arr[1])
        ? []
        : {}
    );
    */
  }

  if (arr.length > 1) {
    return setByPath(arr.slice(1), value, obj[arr[0]]);
  } else {
    obj[arr[0] as keyof O] = value;
    return obj;
  }
};

const updateObject = <O extends OBJ>(
  arr: string[],
  obj: O,
  value: any
) => {
  const newObj = deepCopy(obj);
  setByPath(arr, value, newObj);
  return deepFreeze(newObj);
};

const myObj3 = {
  d: 22,
  m: 9,
  o: { c: "MVD", i: "UY", f: { a: 56 } },
};

const new1 = updateObject(["m"], myObj3, "sep");
console.log(new1);
// {d: 22, m: "sep", o: {c: "MVD", i: "UY", f: {a: 56}}};

const new2 = updateObject(["b"], myObj3, 220960);
console.log(new2);
// {d: 22, m: 9, o: {c: "MVD", i: "UY", f: {a: 56}}, b: 220960};

const new3 = updateObject(["o", "f", "a"], myObj3, 9999);
console.log(new3);
// {d: 22, m: 9, o: {c: "MVD", i: "UY", f: {a: 9999}}};

const new4 = updateObject(
  ["o", "f", "j", "k", "l"],
  myObj3,
  "deep"
);
console.log(new4);
// {d: 22, m: 9, o: {c: "MVD", i: "UY", f: {a: 56, j: {k: "deep"}}}};

export { setByPath, updateObject };

// https://github.com/microsoft/TypeScript/issues/47357
