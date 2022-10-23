type AccumRoundedType = [number, number];

const roundFix2a = (
  accum: number,
  n: number
): AccumRoundedType => {
  const nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
  accum += n - nRounded;
  return [accum, nRounded];
};

const roundFix2b = ([
  accum,
  n,
]: AccumRoundedType): AccumRoundedType => {
  const nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
  accum += n - nRounded;
  return [accum, nRounded];
};

describe("roundFix2a", function () {
  it("rounds 3.14159->3 if differences are 0", () => {
    const [accum, nRounded] = roundFix2a(0.0, 3.14159);
    expect(accum).toBeCloseTo(0.14159);
    expect(nRounded).toBe(3);
  });

  it("rounds 2.71828->3 if differences are 0.14159", () => {
    const [accum, nRounded] = roundFix2a(0.14159, 2.71828);
    expect(accum).toBeCloseTo(-0.14013);
    expect(nRounded).toBe(3);
  });
});

describe("roundFix2b", function () {
  it("rounds 2.71828->2 if differences are -0.14013", () => {
    const [accum, nRounded] = roundFix2b([
      -0.14013, 2.71828,
    ]);
    expect(accum).toBeCloseTo(0.57815);
    expect(nRounded).toBe(2);
  });

  it("rounds 3.14159->4 if differences are 0.57815", () => {
    const [accum, nRounded] = roundFix2b([
      0.57815, 3.14159,
    ]);
    expect(accum).toBeCloseTo(-0.28026);
    expect(nRounded).toBe(4);
  });
});

export { roundFix2a, roundFix2b };
