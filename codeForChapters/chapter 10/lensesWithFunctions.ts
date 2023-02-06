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

const getField =
  <O extends OBJ>(attr: keyof O) =>
  (obj: O) =>
    obj[attr];

const setField =
  <O extends OBJ>(attr: keyof O) =>
  (value: any) =>
  (obj: O) => ({
    ...obj,
    [attr]: value,
  });

type GET<O extends OBJ> = ReturnType<typeof getField<O>>;

type SET<O extends OBJ> = ReturnType<typeof setField<O>>;

const lens =
  <O extends OBJ>(getter: GET<O>, setter: SET<O>) =>
  (fn: FN) =>
  (obj: O) =>
    fn(getter(obj)).map((value: any) => setter(value)(obj));

type LENS<O extends OBJ> = ReturnType<typeof lens<O>>;

const lensProp = <O extends OBJ>(attr: keyof O) =>
  lens<O>(getField(attr), setField(attr));

class Constant<V> {
  private value: V;
  map: FN;

  constructor(v: V) {
    this.value = v;
    this.map = () => this;
  }
}

const view =
  <O extends OBJ, V>(someLens: LENS<O>) =>
  (obj: O) =>
    someLens((x: V) => new Constant(x))(obj).value;

const user = view(lensProp("user"))(author);
console.log(111, user);
/*
  fkereki
*/

class Variable<V> {
  private value: V;
  map: FN;

  constructor(v: V) {
    this.value = v;
    this.map = (fn) => new Variable(fn(v));
  }
}

const set =
  <O extends OBJ, V>(someLens: LENS<O>) =>
  (newVal: V) =>
  (obj: O) =>
    someLens(() => new Variable(newVal))(obj).value;

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

const over =
  <O extends OBJ, V>(someLens: LENS<O>) =>
  (mapfn: FN) =>
  (obj: O) =>
    someLens((x: V) => new Variable(mapfn(x)))(obj).value;

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

export {};
