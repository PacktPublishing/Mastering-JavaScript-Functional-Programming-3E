const memoize4 = <T extends (..._x: any[]) => any>(
  fn: T
): ((..._x: Parameters<T>) => ReturnType<T>) => {
  const cache = new Map() as Map<string, ReturnType<T>>;
  return (...args) => {
    const strX = JSON.stringify(args);
    if (!cache.has(strX)) {
      cache.set(strX, fn(...args));
    }
    return cache.get(strX) as ReturnType<T>;
  };
};

function fib(n: number): number {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}

// @ts-expect-error We want to reassign the function
fib = memoize4(fib);

console.log(new Date().getTime());
console.log(new Date().getTime(), fib(50));
console.log(new Date().getTime(), fib(35));
console.log(new Date().getTime(), fib(30));
console.log(new Date().getTime(), fib(10));

export { memoize4 };
