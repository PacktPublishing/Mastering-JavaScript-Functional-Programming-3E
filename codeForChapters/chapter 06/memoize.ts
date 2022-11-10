import { addTiming } from "./timing";

function fib(n: number): number {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}

const memoize = <T extends (x: number) => any>(
  fn: T
): ((x: number) => ReturnType<T>) => {
  const cache = {} as Record<number, ReturnType<T>>;
  return (x) =>
    x in cache ? cache[x] : (cache[x] = fn(x));
};

const testFib = (n: number) => fib(n);
addTiming(testFib)(45); // 15,382.255 ms
addTiming(testFib)(40); //  1,600.600 ms
addTiming(testFib)(35); //    146.900 ms

const testMemoFib = memoize((n: number) => fib(n));
addTiming(testMemoFib)(45); // 15,537.575 ms
addTiming(testMemoFib)(45); //          0.005 ms
addTiming(testMemoFib)(40); //  1,368.880 ms
addTiming(testMemoFib)(35); //    123.970 ms

// @ts-expect-error We want to reassign the function
fib = memoize(fib);
addTiming(testFib)(45); // 0.080 ms
addTiming(testFib)(45); // 0.080 ms
addTiming(testFib)(40); // 0.025 ms
addTiming(testFib)(35); // 0.009 ms

const memoize2 = <
  T extends (x: number, ...y: any[]) => any
>(
  fn: T
): ((x: number, ...y: any[]) => ReturnType<T>) => {
  if (fn.length === 1) {
    const cache = {} as Record<number, ReturnType<T>>;
    return (x) =>
      x in cache ? cache[x] : (cache[x] = fn(x));
  } else {
    return fn;
  }
};

const memoize3 = <T extends (...x: any[]) => any>(
  fn: T
): ((...x: Parameters<T>) => ReturnType<T>) => {
  const cache = {} as Record<
    number | string,
    ReturnType<T>
  >;
  const PRIMITIVES = ["number", "string"];
  return (...args) => {
    const strX: number | string =
      args.length === 1 &&
      PRIMITIVES.includes(typeof args[0])
        ? args[0]
        : JSON.stringify(args);
    return strX in cache
      ? cache[strX]
      : (cache[strX] = fn(...args));
  };
};

const memoize4 = <T extends (...x: any[]) => any>(
  fn: T
): ((...x: Parameters<T>) => ReturnType<T>) => {
  const cache = {} as Record<string, ReturnType<T>>;
  return (...args) => {
    const strX = JSON.stringify(args);
    return strX in cache
      ? cache[strX]
      : (cache[strX] = fn(...args));
  };
};

export { memoize, memoize2, memoize3, memoize4 };
