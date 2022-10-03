const factorial = (n: number): number => {
  if (n < 0) {
    throw new Error("Cannot do factorial if negative");
  } else if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

export { factorial };
