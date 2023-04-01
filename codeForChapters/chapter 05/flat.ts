import { range } from "./range";

const flatAll = (arr: any[]): any[] =>
  arr.reduce(
    (f: any[], v: any) =>
      f.concat(Array.isArray(v) ? flatAll(v) : v),
    []
  );

const flatOne1 = (arr: any[]): any[] => [].concat(...arr);

const flatOne2 = (arr: any[]): any[] =>
  arr.reduce((f, v) => f.concat(v), [] as any[]);

const flatOne = flatOne2;

const flat1 = (arr: any[], n = 1): any[] => {
  if (n === Infinity) {
    return flatAll(arr);
  } else {
    let result = arr;
    range(0, n).forEach(() => {
      result = flatOne(result);
    });
    return result;
  }
};

const flat2 = (arr: any[], n = 1): any[] =>
  n === Infinity
    ? flatAll(arr)
    : n === 1
    ? flatOne(arr)
    : flat2(flatOne(arr), n - 1);

const flat = flat1 || flat2;

if (!Array.prototype.flat) {
  Array.prototype.flat = function (this, n): any[] {
    if (n === undefined || n === 1) {
      return flatOne(this as any[]);
    } else if (n === Infinity) {
      return flatAll(this as any[]);
    } else {
      return flatOne(this as any[]).flat(n - 1);
    }
  };
}

export { flat, flatAll, flatOne, flatOne1, flatOne2 };
