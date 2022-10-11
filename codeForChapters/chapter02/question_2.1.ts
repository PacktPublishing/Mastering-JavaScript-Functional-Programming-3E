const once = <FNType extends (...args: any[]) => any>(
  fn: FNType | null
) =>
  ((...args: Parameters<FNType>) => {
    fn && fn(...args);
    fn = null;
  }) as FNType;

const sum = (a: number, b: number) =>
  console.log("SUM", a, b);

const sumOnce = once(sum);

console.log("A");
sumOnce(3, 5); // output SUM 3 5
console.log("B");
sumOnce(3, 5); // no output
console.log("C");
sumOnce(3, 5); // no output

export { once };
