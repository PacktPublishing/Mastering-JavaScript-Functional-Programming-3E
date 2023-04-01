// ESTOS TESTS FUNCIONAN PERFECTO PARA partial()

import { partial } from "./partial.examples";

function nonsense(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
) {
  return `${a}/${b}/${c}/${d}/${e}`;
}

describe("with partial()", function () {
  it("you could fix no arguments", () => {
    const nonsensePC0 = partial(nonsense);
    expect(nonsensePC0(0, 1, 2, 3, 4)).toBe(
      nonsense(0, 1, 2, 3, 4)
    );
  });

  it("you could fix only some initial arguments", () => {
    const nonsensePC1 = partial(nonsense)(1, 2, 3);
    expect(nonsensePC1(4, 5)).toBe(nonsense(1, 2, 3, 4, 5));
  });

  it("you could skip some arguments", () => {
    const nonsensePC2 = partial(nonsense)(
      undefined,
      22,
      undefined,
      44
    );
    expect(nonsensePC2(11, 33, 55)).toBe(
      nonsense(11, 22, 33, 44, 55)
    );
  });

  it("you could fix only some last arguments", () => {
    const nonsensePC3 = partial(nonsense)(
      undefined,
      undefined,
      undefined,
      444,
      555
    );
    expect(nonsensePC3(111, 222, 333)).toBe(
      nonsense(111, 222, 333, 444, 555)
    );
  });

  it("you could fix ALL the arguments", () => {
    const nonsensePC4 = partial(nonsense)(6, 7, 8, 9, 0);
    expect(nonsensePC4).toBe(nonsense(6, 7, 8, 9, 0));
  });

  it("you could work in steps - (a)", () => {
    const nonsensePC5 = partial(nonsense);
    const nn = nonsensePC5(undefined, 2, 3);
    const oo = nn(undefined, undefined, 5);
    const pp = oo(1, undefined);
    const qq = pp(4);
    expect(qq).toBe(nonsense(1, 2, 3, 4, 5));
  });

  it("you could work in steps - (b)", () => {
    const nonsensePC6 = partial(nonsense)(undefined, 2, 3)(
      undefined,
      undefined,
      5
    )(
      1,
      undefined
    )(4);
    expect(nonsensePC6).toBe(nonsense(1, 2, 3, 4, 5));
  });
});

export {};
