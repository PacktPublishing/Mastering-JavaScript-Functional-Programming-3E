const range = (start, stop) =>
  new Array(stop - start).fill(0).map((v, i) => start + i);

const uncurry = (fn, len) =>
  eval(
    `(${range(0, len)
      .map((i) => `x${i}`)
      .join(",")}) => ${fn.name}${range(0, len)
      .map((i) => `(x${i})`)
      .join("")}`
  );

const curriedMake3 = (x0) => (x1) => (x2) =>
  ((a, b, c) => `${a}:${b}:${c}`)(x0, x1, x2);

console.log(uncurry(curriedMake3, 3).toString());

export { uncurry };
