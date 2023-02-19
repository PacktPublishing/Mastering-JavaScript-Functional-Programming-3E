declare global {
  interface Boolean {
    map(_f: (_x: boolean) => boolean): boolean;
  }
}

Boolean.prototype.map = function (
  this: boolean,
  fn: (_x: boolean) => any
) {
  return !!fn(this);
};

const t = true;
const f = false;
const negate = (x: boolean) => !x;

console.log(t.map(negate), f.map(negate));
// false true

declare global {
  interface Number {
    map(_f: (_x: number) => number): number;
  }
}

Number.prototype.map = function (
  this: number,
  fn: (_x: number) => number
) {
  return Number(fn(this));
};

const n = 22;
const add1 = (n: number) => n + 1;
console.log(n.map(add1));

declare global {
  interface String {
    map(_f: (_x: string) => string): string;
  }
}

String.prototype.map = function (
  this: string,
  fn: (_x: string) => string
) {
  return String(fn(this));
};

const s = "Montevideo";
const addBangs = (s: string): string => s + "!!!";

console.log(s.map(addBangs));

export {};
