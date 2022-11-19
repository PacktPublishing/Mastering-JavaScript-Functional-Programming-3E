import { addLogging2, subtract } from "./logging";

describe("a logging function", function () {
  afterEach(() => {
    // so count of calls to Math.random will be OK
    jest.restoreAllMocks();
  });

  it("should log twice with well behaved functions", () => {
    jest.spyOn(global.console, "log");

    let something = (a: number, b: number): string =>
      `result=${a}:${b}`;

    something = addLogging2(something);

    something(22, 9);

    expect(global.console.log).toHaveBeenCalledTimes(2);
    expect(global.console.log).toHaveBeenNthCalledWith(
      1,
      "entering something(22,9)"
    );
    expect(global.console.log).toHaveBeenNthCalledWith(
      2,
      "exiting  something=>result=22:9"
    );
  });

  it("should report a thrown exception", () => {
    jest.spyOn(global.console, "log");

    let subtractZero = (x: number) => subtract(x, 0);
    subtractZero = addLogging2(subtractZero);

    expect(() => subtractZero(10)).toThrow();
    expect(global.console.log).toHaveBeenCalledTimes(2);
    expect(global.console.log).toHaveBeenNthCalledWith(
      1,
      "entering subtractZero(10)"
    );
    expect(global.console.log).toHaveBeenNthCalledWith(
      2,
      "exiting  subtractZero=>threw Error: We don't subtract zero!"
    );
  });
});
