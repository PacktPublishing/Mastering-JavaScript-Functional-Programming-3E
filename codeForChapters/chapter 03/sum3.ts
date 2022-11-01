const sum3 = new Function(
  "x",
  "y",
  "z",
  "const t = x+y+z; return t;"
);

console.log(sum3(4, 6, 7)); // 17

const f1 = (x: number, y: number, z: number): number =>
  x + y + z;

console.log(f1(4, 6, 7)); // also 17

const f2 = (x: number, y: number, z: number): number => {
  return x + y + z;
};

console.log(f2(4, 6, 7)); // again, 17

const altSum3 = (x: number) => (y: number) => (z: number) =>
  x + y + z;

console.log(altSum3(1)(2)(3)); // 6

const fn1 = altSum3(1);

const fn2 = fn1(2);

const fn3 = fn2(3);

console.log(fn3); // also 6
