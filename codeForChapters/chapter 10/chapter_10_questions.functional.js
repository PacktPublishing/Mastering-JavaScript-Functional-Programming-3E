// FROM PREVIOUS CHAPTERS

const curry = (f, ...args) =>
  f.length <= args.length
    ? f(...args)
    : (...more) => curry(f, ...args, ...more);

const getField = curry((attr, obj) => obj[attr]);

const setField = curry((attr, value, obj) => ({...obj, [attr]: value}));

const compose = (...fns) =>
  fns.reduceRight((f, g) => (...args) => g(f(...args)));

// NEW THINGS

const lens = (getter, setter) => fn => obj =>
  fn(getter(obj)).map(value => setter(value, obj));

const lensProp = attr => lens(getField(attr), setField(attr));

class Constant {
  constructor(v) {
    this.value = v;
    this.map = () => this;
  }
}

class Variable {
  constructor(v) {
    this.value = v;
    this.map = fn => new Variable(fn(v));
  }
}

// view, set, and over are usual names - Ramda uses them, for example

const view = curry(
  (lensAttr, obj) => lensAttr(x => new Constant(x))(obj).value
);

const set = curry(
  (lensAttr, newVal, obj) =>
    lensAttr(() => new Variable(newVal))(obj).value
);

const over = curry(
  (lensAttr, mapfn, obj) =>
    lensAttr(x => new Variable(mapfn(x)))(obj).value
);

// EXAMPLES

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

const user = view(lensProp("user"), author);
console.log("USER... should be fkereki >", user);

const name = view(lensProp("name"), author);
console.log("USER... should be object >", name);

const changedUser = set(lensProp("user"), "FEFK", author);
console.log(changedUser);
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

const newAuthor = over(lensProp("user"), x => x + x + x, author);
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

const lastName = view(
  compose(
    lensProp("name"),
    lensProp("last")
  )
)(author);
console.log(lastName);
/*
    Kereki
*/

const lFirst = compose(
  lensProp("name"),
  lensProp("first")
);

const lLast = compose(
  lensProp("name"),
  lensProp("last")
);

const fullAuthor = set(
  compose(
    lensProp("name"),
    lensProp("fullName")
  ),
  view(lFirst, author) + " " + view(lLast, author),
  author
);
console.log("FULL AUTHOR>", fullAuthor);

/* COMPOSING ************************ */

console.log(
  "COMPOSING VIEWS",
  compose(
    view(lensProp("first")),
    view(lensProp("name"))
  )(author)
);

console.log(
  "COMPOSING LENSES",
  view(
    compose(
      lensProp("name"),
      lensProp("first")
    )
  )(author)
);
/* ************************************ */

const lBook = compose(
  lensProp("books"),
  lensProp(0)
);
const book = view(lBook, author);
console.log(view(lensProp("name"), book));

/*
  lenses for maps
*/

const someMap = new Map([["name", "Federico"], ["last", "Kereki"]]);

const mapLensProp = attr =>
  lens(obj => obj.get(attr), (value, obj) => obj.set(attr, value));

const mapLensName = mapLensProp("name");

console.log(view(mapLensName)(someMap));

/*
    mapping
*/
const allBooks = view(lensProp("books"), author);
console.log(allBooks);
const newBooks = allBooks.map(x => over(lensProp("year"), y => y * 10, x));
console.log(newBooks);
