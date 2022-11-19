const opposite =
  <T extends (...args: any[]) => number | boolean>(fn: T) =>
  (...args: Parameters<T>): ReturnType<T> => {
    const result = fn(...args);
    return (
      typeof result === "boolean" ? !result : -result
    ) as any;
  };

const isBig = opposite2(
  (n: number) => (n > 1000) as boolean
);
const getProduct = opposite2(
  (n: number, p: number): number => n * p
);

console.log(isBig(2000));
console.log(getProduct(22, 9));

export { opposite, opposite2 };
