const powerN = (base: number, power: number): number => {
  if (power === 0) {
    return 1;
  } else if (power % 2) {
    // odd power?
    return base * powerN(base, power - 1);
  } else {
    // even power?
    return powerN(base * base, power / 2);
  }
};

console.log(powerN(2, 13));

export {};
