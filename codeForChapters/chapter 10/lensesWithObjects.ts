type FN = (...args: any[]) => any;

type Curry<P, R> = P extends []
  ? R
  : P extends [infer H]
  ? (arg: H) => R // only 1 arg
  : P extends [infer H, ...infer T] // 2 or more args
  ? (arg: H) => Curry<[...T], R>
  : never;

function curry<A extends any[], R>(
  fn: (...args: A) => R
): Curry<A, R>;
function curry(fn: (...args: any) => any) {
  return fn.length === 0
    ? fn()
    : (x: any) => curry(fn.bind(null, x));
}

type GET = <D extends { [key: string]: any }>(
  f: keyof D
) => (x: D) => any;

type SET = <D>(attr: keyof D, value: any, obj: D) => D;

type LENS = { getter: GET; setter: SET };

const lens = (getter: GET, setter: SET): LENS => ({
  getter,
  setter,
});

const lensProp = (attr: string) =>
  lens((getField as any)(attr), setField(attr));

const view = curry((lens, obj) => lens.getter(obj));

const set = curry((lens, newVal, obj) =>
  lens.setter(newVal, obj)
);

const over = curry((lens, mapfn, obj) =>
  lens.setter(mapfn(lens.getter(obj)), obj)
);

const composeTwoLenses = (
  lens1: LENS,
  lens2: LENS
): LENS => ({
  getter: (obj) => lens2.getter(lens1.getter(obj)),
  setter: curry((newVal, obj) =>
    lens1.setter(
      lens2.setter(newVal, lens1.getter(obj)),
      obj
    )
  ),
});

export {};
