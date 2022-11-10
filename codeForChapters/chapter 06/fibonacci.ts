function fib(n: number): number {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    console.log("CALLED WITH ", n);
    return fib(n - 2) + fib(n - 1);
  }
}

export { fib };
