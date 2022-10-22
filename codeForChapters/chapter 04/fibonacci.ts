const fib = (n: number): number => {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib(n - 2) + fib(n - 1);
  }
};

console.log(fib(10)); // 55, a bit slowly

const cache: number[] = [];

const fib2 = (n: number): number => {
  if (cache[n] === undefined) {
    if (n === 0) {
      cache[0] = 0;
    } else if (n === 1) {
      cache[1] = 1;
    } else {
      cache[n] = fib2(n - 2) + fib2(n - 1);
    }
  }

  return cache[n];
};

console.log(fib2(10)); // 55, as before, but more quickly!

const fib3 = (n: number): number =>
  n < 2 ? n : fib2(n - 2) + fib2(n - 1);

console.log(fib3(10));

const fib4 = (n: number, a = 0, b = 1): number =>
  n === 0 ? a : fib4(n - 1, b, a + b);

console.log(fib4(10)); // speediest!

export { fib, fib2, fib3, fib4 };
