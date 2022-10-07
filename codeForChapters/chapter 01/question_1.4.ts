const carefulFact = (n: number): number | never => {
  if (
    typeof n === "number" &&
    n >= 0 &&
    n === Math.floor(n)
  ) {
    const innerFact = (n: number): number =>
      n === 0 ? 1 : n * innerFact(n - 1);
    return innerFact(n);
  } else {
    throw new Error("Wrong parameter for carefulFact2");
  }
};

export { carefulFact };
