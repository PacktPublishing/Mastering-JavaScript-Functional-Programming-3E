const range = (start, stop) =>
  new Array(stop - start).fill(0).map((v, i) => start + i);

const make3 = (a, b, c) => `${a}:${b}:${c}`;

function curryByEval(fn) {
  return eval(
    `${range(0, fn.length)
      .map((i) => `x${i}`)
      .join("=>")} => ${fn.name}(${range(0, fn.length)
      .map((i) => `x${i}`)
      .join(",")})`
  );
}

console.log(curryByEval(make3).toString());

export { curryByEval };
