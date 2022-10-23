const fibC = (() => {
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

  return fib2;
})();

console.log(fibC(10));
console.log(fibC(15));
console.log(fibC(5));
console.log(fibC(8));

export { fibC };
