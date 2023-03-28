// partialCurry!

function curry(fn) {
  return fn.length === 0
    ? fn()
    : (...x) => curry(fn.bind(null, ...x));
}

const getField = curry((attr, obj) => obj[attr]);

const setField = curry((attr, value, obj) => ({
  ...obj,
  [attr]: value,
}));

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

/* *** *** *** *** *** *** *** *** *** *** *** */

const lens = (getter, setter) => ({ getter, setter });

const lensProp = (attr) =>
  lens(getField(attr), setField(attr));

function viewF(lens, obj) {
  return lens.getter(obj);
}

const view = curry(viewF);

const set = curry((lens, newVal, obj) =>
  lens.setter(newVal, obj)
);

const over = curry((lens, mapfn, obj) =>
  lens.setter(mapfn(lens.getter(obj)), obj)
);

const lens1 = lens(getField("user"), setField("user"));
// lensProp("user")

console.log("11a", view(lens1, author));
console.log("11b", view(lens1)(author));
/*
  fkereki
*/

console.log(
  "333",
  view(lensProp("last"), view(lensProp("name"), author))
);
/*
  Kereki
*/

const lensBooks = lensProp("books");
console.log(
  "444",
  "The author wrote " +
    view(lensBooks, author).length +
    " book(s)"
);
/*
  The author wrote 3 book(s)
*/

console.log("555", set(lens1, "FEFK", author));
/*
  user: "FEFK",
  name: {first: "Federico", middle: "", last: "Kereki"},
  books: [
    {name: "Google Web Toolkit", year: 2010},
    {name: "Functional Programming", year: 2017},
    {name: "Javascript Cookbook", year: 2018},
  ],
}
*/

const newAuthor = over(lens1, (x) => x + x + x, author);
console.log("666", newAuthor);
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

// composing

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

// Lenses compose left to right,
// so let's keep tradition

const composeTwoLenses = (lens1, lens2) => ({
  getter: (obj) => lens2.getter(lens1.getter(obj)),
  setter: curry((newVal, obj) =>
    lens1.setter(
      lens2.setter(newVal, lens1.getter(obj)),
      obj
    )
  ),
});

const lC = lensProp("c");
const lE = lensProp("e");
const lG = lensProp("g");
const lJ = lensProp("j");
const lK = lensProp("k");

const lJK = composeTwoLenses(lJ, lK);
const lGJK = composeTwoLenses(lG, lJK);
const lEGJK = composeTwoLenses(lE, lGJK);
const lCEGJK1 = composeTwoLenses(lC, lEGJK);
console.log(view(lCEGJK1)(deepObject));

const lCE = composeTwoLenses(lC, lE);
const lCEG = composeTwoLenses(lCE, lG);
const lCEGJ = composeTwoLenses(lCEG, lJ);
const lCEGJK2 = composeTwoLenses(lCEGJ, lK);
console.log(view(lCEGJK2)(deepObject));

const setTo60 = set(lCEGJK1, 60, deepObject);
console.log(setTo60);

/*
  {a: 1, b: 2, c: {d: 3, e: {f: 6, g: {i: 9, j: { k: 60 }}, h: 8}}}
*/

const setToDouble = over(lCEGJK2, (x) => x * 2, deepObject);
console.log(setToDouble, setToDouble.c.e.g);

const composeManyLenses = (...lenses) =>
  lenses.reduce((acc, lens) => composeTwoLenses(acc, lens));

console.log(
  view(composeManyLenses(lC, lE, lG, lJ, lK), deepObject)
);
