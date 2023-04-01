import {
  view,
  set,
  over,
  lens,
  lensProp,
  getField,
  setField,
  composeTwoLenses,
} from "./lensesWithObjects";

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

const lens1 = lens(getField("user"), setField("user"));
const lens1b = lensProp("user");
console.log(view(lens1)(author));
console.log(view(lens1b)(author));
console.log(
  view(lensProp("last"))(view(lensProp("name"))(author))
);

const lensBooks = lensProp("books");
console.log(
  "The author wrote " +
    view(lensBooks)(author).length +
    " book(s)"
);

console.log("333", set(lens1)("FEFK")(author));

const triple = (x: string): string => x + x + x;
const newAuthor = over(lens1)(triple)(author);
console.log(newAuthor);

const deepObject = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: {
      f: 6,
      g: { i: 9, j: { k: 11 } },
      h: 8,
    },
  },
};

const lC = lensProp("c");
const lE = lensProp("e");
const lG = lensProp("g");
const lJ = lensProp("j");
const lK = lensProp("k");

const lJK = composeTwoLenses(lJ, lK);
const lGJK = composeTwoLenses(lG, lJK);
const lEGJK = composeTwoLenses(lE, lGJK);
const lCEGJK1 = composeTwoLenses(lC, lEGJK);
console.log("VIEW1", view(lCEGJK1)(deepObject));

const lCE = composeTwoLenses(lC, lE);
const lCEG = composeTwoLenses(lCE, lG);
const lCEGJ = composeTwoLenses(lCEG, lJ);
const lCEGJK2 = composeTwoLenses(lCEGJ, lK);
console.log("VIEW2", view(lCEGJK2)(deepObject));

const setTo60 = set(lCEGJK1)(60)(deepObject);
console.log("SET", JSON.stringify(setTo60));

const setToDouble = over(lCEGJK2)((x) => x * 2)(deepObject);
console.log("OVER", JSON.stringify(setToDouble));

/* Answer to question:

const composeManyLenses = <O extends OBJ>(
  ...lenses: LENS<O>[]
) =>
  lenses.reduce((acc, lens) => composeTwoLenses(acc, lens));

console.log(
  JSON.stringify(
    view(composeManyLenses(lC, lE, lG, lJ, lK))(deepObject)
  )
);

*/
