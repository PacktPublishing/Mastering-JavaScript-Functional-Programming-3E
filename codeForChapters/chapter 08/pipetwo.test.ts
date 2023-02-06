import type { FN } from "../common";

const pipeTwo =
  <F extends FN, G extends FN>(f: F, g: G) =>
  (...args: Parameters<F>): ReturnType<G> =>
    g(f(...args));

describe("pipeTwo", function () {
  it("works with single arguments", () => {
    const fn1 = jest.fn().mockReturnValue(1);
    const fn2 = jest.fn().mockReturnValue(2);

    const pipe = pipeTwo(fn1, fn2);
    const result = pipe(22);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(22);
    expect(fn2).toHaveBeenCalledWith(1);
    expect(result).toBe(2);
  });

  it("works with multiple arguments", () => {
    const fn1 = jest.fn().mockReturnValue(11);
    const fn2 = jest.fn().mockReturnValue(22);

    const pipe = pipeTwo(fn1, fn2);
    const result = pipe(12, 4, 56);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(12, 4, 56);

    expect(fn2).toHaveBeenCalledWith(11);
    expect(result).toBe(22);
  });
});

export {};
