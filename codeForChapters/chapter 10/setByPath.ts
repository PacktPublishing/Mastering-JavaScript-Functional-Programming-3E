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

export { setByPath, updateObject };

// https://github.com/microsoft/TypeScript/issues/47357
