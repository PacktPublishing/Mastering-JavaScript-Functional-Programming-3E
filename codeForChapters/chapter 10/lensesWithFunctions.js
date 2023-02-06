function curry(fn) {
  return fn.length === 0
    ? fn()
    : (...x) => curry(fn.bind(null, ...x));
}

const compose = (...fns) =>
  fns.reduceRight(
    (f, g) =>
      (...args) =>
        g(f(...args))
  );

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

const getField = curry((attr, obj) => obj[attr]);

const setField = curry((attr, value, obj) => ({
  ...obj,
  [attr]: value,
}));

const lens = (getter, setter) => (fn) => (obj) =>
  fn(getter(obj)).map((value) => setter(value, obj));

const lensProp = (attr) =>
  lens(getField(attr), setField(attr));

class Constant {
  constructor(v) {
    this.value = v;
    this.map = () => this;
  }
}

const view = curry(
  (lensAttr, obj) =>
    lensAttr((x) => new Constant(x))(obj).value
);
const user = view(lensProp("user"), author);
console.log(111, user);
/*
    fkereki
    */

class Variable {
  constructor(v) {
    this.value = v;
    this.map = (fn) => new Variable(fn(v));
  }
}

const set = curry(
  (lensAttr, newVal, obj) =>
    lensAttr(() => new Variable(newVal))(obj).value
);
const changedUser = set(lensProp("user"), "FEFK", author);
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

const over = curry(
  (lensAttr, mapfn, obj) =>
    lensAttr((x) => new Variable(mapfn(x)))(obj).value
);
const newAuthor = over(
  lensProp("user"),
  (x) => x + x + x,
  author
);
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
