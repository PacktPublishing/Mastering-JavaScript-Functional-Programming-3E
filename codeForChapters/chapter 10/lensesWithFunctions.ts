import { compose } from "../chapter 08/compose";

import type { FN, OBJ } from "../common";

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

const over =
  <O extends OBJ, V>(someLens: LENS<O>) =>
  (mapfn: FN) =>
  (obj: O) =>
    someLens((x: V) => new Variable(mapfn(x)))(obj).value;

export { lens, lensProp, view, set, over };
export type { LENS };
