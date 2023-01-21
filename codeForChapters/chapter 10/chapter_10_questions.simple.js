// FROM PREVIOUS CHAPTERS

const curry = (f, ...args) =>
  f.length <= args.length
    ? f(...args)
    : (...more) => curry(f, ...args, ...more);

const getField = curry((attr, obj) => obj[attr]);

const setField = curry((attr, value, obj) => ({...obj, [attr]: value}));

const deepCopy = obj => {
  let aux = obj;
  if (obj && typeof obj === "object") {
    aux = new obj.constructor();
    Object.getOwnPropertyNames(obj).forEach(
      prop => (aux[prop] = deepCopy(obj[prop]))
    );
  }
  return aux;
};

// NEW THINGS

const lens = (getter, setter) => ({getter, setter});

const lensProp = attr => lens(getField(attr), setField(attr));

const view = curry((lens, obj) => lens.getter(obj));

const set = curry((lens, newVal, obj) => lens.setter(newVal, obj));

const over = curry((lens, mapfn, obj) =>
  lens.setter(mapfn(lens.getter(obj)), obj)
);

const author = {
  user: "fkereki",
  name: {
    first: "Federico",
    middle: "",
    last: "Kereki",
  },
  books: [
    {name: "GWT", year: 2010},
    {name: "FP", year: 2017},
    {name: "CB", year: 2018},
  ],
};

const lens1 = lens(getField("user"), setField("user"));

console.log(view(lens1, author));
console.log(view(lens1)(author));
/*
  fkereki
*/

console.log(view(lensProp("last"), view(lensProp("name"), author)));
/*
  Kereki
*/

const lensBooks = lensProp("books");
console.log(
  "The author wrote " + view(lensBooks, author).length + " book(s)"
);
/*
  The author wrote 3 book(s)
*/

console.log(set(lens1, "FEFK", author));
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

const newAuthor = over(lens1, x => x + x + x, author);
console.log(newAuthor);
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
      g: {i: 9, j: {k: 11}},
      h: 8,
    },
  },
};

// Lenses compose left to right,
// so let's keep tradition

const composeTwoLenses = (lens1, lens2) => ({
  getter: obj => lens2.getter(lens1.getter(obj)),
  setter: curry((newVal, obj) =>
    lens1.setter(lens2.setter(newVal, lens1.getter(obj)), obj)
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

const setToDouble = over(lCEGJK2, x => x * 2, deepObject);
console.log(setToDouble, setToDouble.c.e.g);

const composeManyLenses = (...lenses) =>
  lenses.reduce((acc, lens) => composeTwoLenses(acc, lens));

console.log(view(composeManyLenses(lC, lE, lG, lJ, lK), deepObject));

// EXTRA FUNCTIONS - VIRTUAL FIELDS

const firstNameLens = composeTwoLenses(
  lensProp("name"),
  lensProp("first")
);

const lastNameLens = composeTwoLenses(lensProp("name"), lensProp("last"));

const fullNameLens = lens(
  obj => `${view(lastNameLens)(obj)}, ${view(firstNameLens)(obj)}`,
  (fullName, obj) => {
    const parts = fullName.split(",");
    return set(firstNameLens, parts[1], set(lastNameLens, parts[0], obj));
  }
);

console.log(view(fullNameLens, author));
/*
  Kereki, Federico
*/

console.log(set(fullNameLens, "Doe, John", author));
/*
{ user: 'fkereki',
  name: { first: ' John', middle: '', last: 'Doe' },
  books:
   [ { name: 'GWT', year: 2010 },
     { name: 'FP', year: 2017 },
     { name: 'CB', year: 2018 } ] }
*/

// QUESTIONS

const getArray = curry((ind, arr) => arr[ind]);
const setArray = curry((ind, value, arr) => {
  arr[ind] = value;
  return arr;
});
const lensArray = ind => lens(getArray(ind), setArray(ind));

const getMap = curry((key, map) => map.get(key));
const setMap = curry((key, value, map) => new Map(map).set(key, value));
const lensMap = key => lens(getMap(key), setMap(key));
