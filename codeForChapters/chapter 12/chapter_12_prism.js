plus1 = x => x + 1;

const VALUE = Symbol("Value");

class Container {
  constructor(x) {
    this[VALUE] = x;
  }

  map(fn) {
    return fn(this[VALUE]);
  }

  static of(x) {
    return new Container(x);
  }

  toString() {
    return `${this.constructor.name}(${this[VALUE]})`;
  }

  valueOf() {
    return this[VALUE];
  }
}

class Functor extends Container {
  static of(x) {
    return new Functor(x);
  }

  map(fn) {
    return Functor.of(fn(this[VALUE]));
  }
}

class Nothing extends Functor {
  isNothing() {
    return true;
  }

  toString() {
    return "Nothing()";
  }

  map(fn) {
    return this;
  }
}

class Just extends Functor {
  isNothing() {
    return false;
  }

  map(fn) {
    return Maybe.of(fn(this[VALUE]));
  }
}

class Maybe extends Functor {
  constructor(x) {
    return x === undefined || x === null ? new Nothing() : new Just(x);
  }

  static of(x) {
    return new Maybe(x);
  }

  orElse(v) {
    return this.isNothing() ? v : this.valueOf();
  }
}

console.log(
  Maybe.of(2209)
    .map(plus1)
    .map(plus1)
    .toString()
); // "Just(2211)"
console.log(
  Maybe.of(null)
    .map(plus1)
    .map(plus1)
    .toString()
); // "Nothing()"

class Monad extends Functor {
  static of(x) {
    return new Monad(x);
  }

  map(fn) {
    return Monad.of(fn(this[VALUE]));
  }

  unwrap() {
    const myValue = this[VALUE];
    return myValue instanceof Container ? myValue.unwrap() : this;
  }

  chain(fn) {
    return this.map(fn).unwrap();
  }

  ap(m) {
    return m.map(this.valueOf());
  }
}

const add = x => y => x + y; // or curry((x,y) => x+y)
const something = Monad.of(2).map(add);
const monad5 = something.ap(Monad.of(3));
console.log(monad5.toString());

class Left extends Monad {
  isLeft() {
    return true;
  }

  map(fn) {
    return this;
  }
}

class Right extends Monad {
  isLeft() {
    return false;
  }

  map(fn) {
    return Either.of(null, fn(this[VALUE]));
  }
}

class Either extends Monad {
  constructor(left, right) {
    return right === undefined || right === null
      ? new Left(left)
      : new Right(right);
  }

  static of(left, right) {
    return new Either(left, right);
  }
}

class Try extends Either {
  constructor(fn, msg) {
    try {
      return Either.of(null, fn());
    } catch (e) {
      return Either.of(msg || e, null);
    }
  }

  static of(fn, msg) {
    return new Try(fn, msg);
  }
}

const getField2 = attr => obj => Try.of(() => obj[attr], "NULL OBJECT");
const x = getField2("somefield")(null);
console.log(x.isLeft()); // true
console.log(x.toString()); // Left(NULL OBJECT)

console.log("LENSES********");

// FROM PREVIOUS CHAPTERS

const curry = (f, ...args) =>
  f.length <= args.length
    ? f(...args)
    : (...more) => curry(f, ...args, ...more);

const getField = curry((attr, obj) => obj[attr]);

const setField = curry((attr, value, obj) => ({ ...obj, [attr]: value }));

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
    last: "Kereki"
    //    id: {
    //      type: "DNI",
    //      number: "1234567-8"
    //    }
  },
  books: [
    { name: "GWT", year: 2010 },
    { name: "FP", year: 2017 },
    { name: "CB", year: 2018 }
  ]
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

const lastName = view(compose(lensProp("name"), lensProp("last")))(author);
console.log(lastName);
/*
    Kereki
*/

const lFirst = compose(lensProp("name"), lensProp("first"));

const lLast = compose(lensProp("name"), lensProp("last"));

const fullAuthor = set(
  compose(lensProp("name"), lensProp("fullName")),
  view(lFirst, author) + " " + view(lLast, author),
  author
);
console.log("FULL AUTHOR>", fullAuthor);

/* COMPOSING ************************ */

console.log(
  "COMPOSING VIEWS",
  compose(view(lensProp("first")), view(lensProp("name")))(author)
);

console.log(
  "COMPOSING LENSES",
  view(compose(lensProp("name"), lensProp("first")))(author)
);
/* ************************************ */

const lBook = compose(lensProp("books"), lensProp(0));
const book = view(lBook, author);
console.log(view(lensProp("name"), book));

console.log("PRISMS");

const getFieldP = curry((attr, obj) =>
  obj && attr in obj ? obj[attr] : undefined
);

const setFieldP = curry((attr, value, obj) =>
  obj && attr in obj ? { ...obj, [attr]: value } : { ...obj }
);

const prism = (getter, setter) => fn => obj =>
  fn(getter(obj)).map(value => setter(value, obj));

const prismProp = attr => prism(getFieldP(attr), setFieldP(attr));

class ConstantP {
  constructor(v) {
    this.value = Maybe.of(v);
    this.map = () => this;
  }
}

/*
Con esto funciona bien, y retorna o valores o undefined

const preview = curry(
  (prismAttr, obj) => prismAttr(x => new Constant(x))(obj).value
);
*/

const preview = curry(
  (prismAttr, obj) => prismAttr(x => new ConstantP(x))(obj).value
);

const review = curry(
  (lensAttr, newVal, obj) =>
    lensAttr(() => new Variable(newVal))(obj).value
);

// USANDO ESTA HAY QUE IMPRIMIR EL RESULTADO.toString() PARA VER BIEN

const pUser = prismProp("user");
console.log(preview(pUser, author) /* .toString() */); // Just("fkereki")

const pPseudonym = prismProp("pseudonym");
console.log(preview(pPseudonym, author) /* .toString() */); // Nothing()

const lPseudonym = lensProp("pseudonym");
const lUsedSince = lensProp("usedSince");
/*
console.log(
  "PSEUDONYM, USED SINCE",
  view(compose(lPseudonym, lUsedSince))(author)
);
/*
TypeError: Cannot read property 'usedSince' of undefined
    at curry (/data/fkereki_data/Dropbox/FP_BOOK_2ndEd/CODE_NEW/chapter_12_prism.js:176:42)
    at curry (/data/fkereki_data/Dropbox/FP_BOOK_2ndEd/CODE_NEW/chapter_12_prism.js:173:7)
    at f.length.args.length.more (/data/fkereki_data/Dropbox/FP_BOOK_2ndEd/CODE_NEW/chapter_12_prism.js:174:41)
    at obj (/data/fkereki_data/Dropbox/FP_BOOK_2ndEd/CODE_NEW/chapter_12_prism.js:186:6)
    at obj (/data/fkereki_data/Dropbox/FP_BOOK_2ndEd/CODE_NEW/chapter_12_prism.js:186:3)
    at curry (/data/fkereki_data/Dropbox/FP_BOOK_2ndEd/CODE_NEW/chapter_12_prism.js:207:52)
    at curry (/data/fkereki_data/Dropbox/FP_BOOK_2ndEd/CODE_NEW/chapter_12_prism.js:173:7)
    at f.length.args.length.more (/data/fkereki_data/Dropbox/FP_BOOK_2ndEd/CODE_NEW/chapter_12_prism.js:174:41)
    at Object.<anonymous> (/data/fkereki_data/Dropbox/FP_BOOK_2ndEd/CODE_NEW/chapter_12_prism.js:352:40)
    at Module._compile (internal/modules/cjs/loader.js:816:30)
*/

const pUsedSince = prismProp("usedSince");
console.log(
  "PSEUDONYM, USED SINCE",
  preview(compose(pPseudonym, pUsedSince))(author) /* .toString() */
);
/*
  Nothing()
*/

const pname = prismProp("name");
const pfirst = prismProp("first");
const pid = prismProp("id");
const pnumber = prismProp("number");

console.log(preview(compose(pname, pid, pnumber), author));

console.log(preview(compose(pname, pfirst), author).toString());
console.log(preview(compose(pname, pPseudonym), author).toString());
console.log(preview(compose(pPseudonym, pname), author).toString());

const fullAuthor2 = review(
  compose(prismProp("name"), prismProp("first")),
  "FREDERICK",
  author
);
console.log(fullAuthor2);
/*
{ user: 'fkereki',
  name: { first: 'FREDERICK', middle: '', last: 'Kereki' },
  books:
   [ { name: 'GWT', year: 2010 },
     { name: 'FP', year: 2017 },
     { name: 'CB', year: 2018 } ] }
*/

const fullAuthor3 = review(pPseudonym, "NEW ALIAS", author);
console.log(fullAuthor3);
