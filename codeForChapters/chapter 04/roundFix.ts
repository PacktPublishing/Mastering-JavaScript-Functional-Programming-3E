const roundFix = (function () {
  let accum = 0;
  return (n: number): number => {
    // reals get rounded up or down
    // depending on the sign of accum
    const nRounded =
      accum > 0 ? Math.ceil(n) : Math.floor(n);

    console.log(
      "accum",
      accum.toFixed(5),
      " result",
      nRounded
    );

    accum += n - nRounded;
    return nRounded;
  };
})();

roundFix(3.14159); // accum  0.00000  result 3
roundFix(2.71828); // accum  0.14159  result 3
roundFix(2.71828); // accum -0.14013  result 2
roundFix(3.14159); // accum  0.57815  result 4
roundFix(2.71828); // accum -0.28026  result 2
roundFix(2.71828); // accum  0.43802  result 3
roundFix(2.71828); // accum  0.15630  result 3

const roundFix1 = (() => {
  let accum = 0;
  return (n: number): number => {
    const nRounded =
      accum > 0 ? Math.ceil(n) : Math.floor(n);
    accum += n - nRounded;
    return nRounded;
  };
})();

const roundFix2 = (accum: number, n: number) => {
  const nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
  accum += n - nRounded;
  return { accum, nRounded };
};

export { roundFix, roundFix1, roundFix2 };
