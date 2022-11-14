import { addLogging2 } from "./logging";

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

    let thrower = () => {
      throw "CRASH!";
    };

    thrower = addLogging2(thrower);

    expect(thrower).toThrow();
    expect(global.console.log).toHaveBeenCalledTimes(2);
    expect(global.console.log).toHaveBeenNthCalledWith(
      1,
      "entering thrower()"
    );
    expect(global.console.log).toHaveBeenNthCalledWith(
      2,
      "exiting  thrower=>threw CRASH!"
    );
  });
});
