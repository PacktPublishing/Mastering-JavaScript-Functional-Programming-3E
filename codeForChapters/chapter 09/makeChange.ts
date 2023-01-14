const makeChange = (n: number, bills: number[]): number => {
  if (n < 0) {
    return 0; // no way of paying negative amounts
  } else if (n == 0) {
    return 1; // one single way of paying $0: with no bills
  } else if (bills.length == 0) {
    // here, n>0
    return 0; // no bills? no way of paying
  } else {
    return (
      makeChange(n, bills.slice(1)) +
      makeChange(n - bills[0], bills)
    );
  }
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

const makeChange2 = memoize4(
  (n: number, bills: number[]): number => {
    if (n < 0) {
      return 0; // no way of paying negative amounts
    } else if (n == 0) {
      return 1; // one single way of paying $0: with no bills
    } else if (bills.length == 0) {
      // here, n>0
      return 0; // no bills? no way of paying
    } else {
      return (
        makeChange2(n, bills.slice(1)) +
        makeChange2(n - bills[0], bills)
      );
    }
  }
);

console.log(makeChange(64, [100, 50, 20, 10, 5, 2, 1]));
// 969 ways of paying $64

export {};
