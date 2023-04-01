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

export { getByPath };
