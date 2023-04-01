import {
  lensProp,
  view,
  set,
  over,
} from "./lensesWithFunctions";

import { compose } from "../chapter 08/compose";

import type { FN, OBJ } from "../common";

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

const user = view(lensProp("user"))(author);
console.log(111, user);
/*
  fkereki
*/

const changedUser = set(lensProp("user"))("FEFK")(author);
console.log(222, changedUser);
/*
    {
    user: "FEFK",
    name: {first: "Federico", middle: "", last: "Kereki"},
    books: [
    {name: "GWT", year: 2010},
    {name: "FP", year: 2017},
    {name: "CB", year: 2018},
],
};
*/

const triple = (x: string): string => x + x + x;
const newAuthor = over(lensProp("user"))(triple)(author);
console.log(333, newAuthor);
/*
    user: "fkerekifkerekifkereki",
    name: {first: "Federico", middle: "", last: "Kereki"},
    books: [
    {name: "GWT", year: 2010},
    {name: "FP", year: 2017},
    {name: "CB", year: 2018},
    ],
    }
    */

const lastName = view(
  compose(lensProp("name"), lensProp("last"))
)(author);
console.log(444, lastName);
/*
        Kereki
*/
