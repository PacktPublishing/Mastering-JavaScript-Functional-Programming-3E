import type { OBJ } from "../common";

const getField =
  <O extends OBJ>(attr: string) =>
  (obj: O) =>
    obj[attr];

const setField =
  <O extends OBJ>(attr: string) =>
  (value: any) =>
  (obj: O): O => ({ ...obj, [attr]: value });

type GET<O extends OBJ> = ReturnType<typeof getField<O>>;

type SET<O extends OBJ> = ReturnType<typeof setField<O>>;

const lens = <O extends OBJ>(
  getter: GET<O>,
  setter: SET<O>
) => ({
  getter,
  setter,
});

const lensProp = <O extends OBJ>(attr: string) =>
  lens<O>(getField(attr), setField(attr));

type LENS<O extends OBJ> = ReturnType<typeof lens<O>>;

const view =
  <O extends OBJ>(someLens: LENS<O>) =>
  (someObj: O) =>
    someLens.getter(someObj);

const set =
  <O extends OBJ>(someLens: LENS<O>) =>
  (newVal: any) =>
  (someObj: O) =>
    someLens.setter(newVal)(someObj);

const over =
  <O extends OBJ>(someLens: LENS<O>) =>
  (mapFn: (arg: any) => any) =>
  (someObj: O) =>
    someLens.setter(mapFn(someLens.getter(someObj)))(
      someObj
    );

const composeTwoLenses = <O extends OBJ>(
  lens1: LENS<O>,
  lens2: LENS<O>
) => ({
  getter: (obj: O) => lens2.getter(lens1.getter(obj)),
  setter: (newVal: any) => (obj: O) =>
    lens1.setter(lens2.setter(newVal)(lens1.getter(obj)))(
      obj
    ),
});

export {
  view,
  set,
  over,
  lens,
  lensProp,
  getField,
  setField,
  composeTwoLenses,
};

export type { LENS };
