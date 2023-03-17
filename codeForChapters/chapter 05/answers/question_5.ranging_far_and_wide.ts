const range2 = (
  from: number,
  to: number,
  step = Math.sign(to - from)
): number[] => {
  const arr = [];
  do {
    arr.push(from);
    from += step;
  } while (
    (step > 0 && to > from) ||
    (step < 0 && to < from)
  );
  return arr;
};

const range2b = (
  start: number,
  stop: number,
  step: number = Math.sign(stop - start)
): number[] =>
  new Array(
    step === 0 ? 1 : Math.ceil((stop - start) / step)
  )
    .fill(0)
    .map((v, i) => start + i * step);

console.log(range2(1, 10)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

/*
range2(1, 10); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
range2(1, 10, 2); // [1, 3, 5, 7, 9]
range2(1, 10, 3); // [1, 4, 7]
range2(1, 10, 6); // [1, 7]
range2(1, 10, 11); // [1]
range2(21, 10); // [21, 20, 19, ... 13, 12, 11]
range2(21, 10, -3); // [21, 18, 15, 12]
range2(21, 10, -4); // [21, 17, 13]
range2(21, 10, -7); // [21, 14]
range2(21, 10, -12); // [21]
*/

export { range2, range2b };
