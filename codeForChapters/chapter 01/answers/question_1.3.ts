const factUp = (n: number, f = 1): number =>
  n <= f ? f : f * factUp(n, f + 1);

const factUp2 = (n: number): number => {
  const factAux = (f: number): number =>
    n <= f ? f : f * factAux(f + 1);
  return factAux(1);
};

const factUp3 = (n: number): number => {
  const factAux = (f = 1): number =>
    n <= f ? f : f * factAux(f + 1);
  return factAux();
};

export { factUp, factUp2, factUp3 };
