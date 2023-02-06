import type { OBJ } from "../../common";
import type { LENS } from "../lensesWithObjects";
import { view } from "../lensesWithObjects";

const composeTwoLenses = <O extends OBJ>(
  lens1: LENS<O>,
  lens2: LENS<O>
) => ({
  getter: (obj: O) => lens2.getter(lens1.getter(obj)),
  setter: (newVal: any) => (obj: O) =>
    lens1.setter(lens2.setter(newVal)(lens1.getter(obj)))(
      obj
    ),
});

const composeManyLenses = <O extends OBJ>(
  ...lenses: LENS<O>[]
) =>
  lenses.reduce((acc, lens) => composeTwoLenses(acc, lens));
/*
console.log(
  view(composeManyLenses(lC, lE, lG, lJ, lK), deepObject)
);
/*
11, same as earlier
*/
