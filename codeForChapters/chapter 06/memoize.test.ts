import { fib } from "./fibonacci";
import * as moduleFib from "./fibonacci";

const memoize = <T extends (...x: any[]) => any>(
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

describe("the original fib", function () {
  it("should produce correct results", () => {
    expect(fib(0)).toBe(0);
    expect(fib(1)).toBe(1);
    expect(fib(5)).toBe(5);
    expect(fib(8)).toBe(21);
    expect(fib(10)).toBe(55);
  });

  // The following fails!

  it("should repeat calculations", () => {
    jest.spyOn(moduleFib, "fib");
    expect(fib(6)).toBe(8);
    expect(fib).toHaveBeenCalledTimes(25);
  });
});

describe("the modified fib", function () {
  it("should repeat calculations", () => {
    let count = 0;

    const fibM = (n: number): number => {
      count++;
      if (n == 0) {
        return 0;
      } else if (n == 1) {
        return 1;
      } else {
        return fibM(n - 2) + fibM(n - 1);
      }
    };

    expect(fibM(6)).toBe(8);
    expect(count).toBe(25);
  });
});

describe("the memoized, modified fib", function () {
  it("should repeat calculations", () => {
    let count = 0;

    const fibMM = memoize((n: number): number => {
      count++;
      if (n == 0) {
        return 0;
      } else if (n == 1) {
        return 1;
      } else {
        return fibMM(n - 2) + fibMM(n - 1);
      }
    });

    expect(fibMM(6)).toBe(8);
    expect(count).toBe(7);
  });
});

export {};
