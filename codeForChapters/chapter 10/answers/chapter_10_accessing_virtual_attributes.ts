import type { OBJ } from "../../common";

import {
  composeTwoLenses,
  lensProp,
  lens,
  view,
  set,
} from "../lensesWithObjects";

const author = {
  user: "fkereki",
  name: {
    first: "Federico",
    middle: "",
    last: "Kereki",
  },
  books: [
    { name: "Google Web Toolkit", year: 2010 },
    { name: "Functional Programming", year: 2017 },
    { name: "Javascript Cookbook", year: 2018 },
  ],
};

const lastNameLens = composeTwoLenses(
  lensProp("name"),
  lensProp("last")
);

const firstNameLens = composeTwoLenses(
  lensProp("name"),
  lensProp("first")
);

const fullNameGetter = <O extends OBJ>(obj: O): string =>
  `${view(lastNameLens)(obj)}, ${view(firstNameLens)(obj)}`;

const fullNameSetter =
  <O extends OBJ>(fullName: string) =>
  (obj: O): O => {
    const parts = fullName.split(",");
    return set(firstNameLens)(parts[1])(
      set(lastNameLens)(parts[0])(obj)
    ) as O;
  };

const fullNameLens = lens(fullNameGetter, fullNameSetter);

console.log(view(fullNameLens)(author));
/*
      Kereki, Federico
  */

console.log(set(fullNameLens)("Doe, John")(author));
/*
      { user: 'fkereki',
      name: { first: ' John', middle: '', last: 'Doe' },
      books:
      [ { name: 'GWT', year: 2010 },
      { name: 'FP', year: 2017 },
      { name: 'CB', year: 2018 } ] }
      */

export {};
