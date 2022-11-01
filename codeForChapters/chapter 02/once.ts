const once = <FNType extends (...args: any[]) => any>(
  fn: FNType
) => {
  let done = false;

  return ((...args: Parameters<FNType>) => {
    if (!done) {
      done = true;
      return fn(...args);
    }
  }) as FNType;
};

/*
const sum = (a: number, b: number) =>
  console.log("SUM", a, b);

const sumOnce = once(sum);

console.log("A", sumOnce(3, 5));
console.log("B", sumOnce(3, 5));
console.log("C", sumOnce(3, 5));
*/

export { once };
