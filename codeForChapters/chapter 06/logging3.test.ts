import { addLogging3 } from "./logging3";

describe("addLogging3()", function () {
  it("should call the provided logger", () => {
    const logger = jest.fn();

    let something = (a: number, b: number): string =>
      `result=${a}:${b}`;

    something = addLogging3(something, logger);

    something(22, 9);

    expect(logger).toHaveBeenCalledTimes(2);
    expect(logger).toHaveBeenNthCalledWith(
      1,
      "entering something(22,9)"
    );
    expect(logger).toHaveBeenNthCalledWith(
      2,
      "exiting  something=>result=22:9"
    );
  });

  it("a throwing function should be reported", () => {
    const logger = jest.fn();

    let thrower = () => {
      throw "CRASH!";
    };

    thrower = addLogging3(thrower, logger);

    try {
      thrower();
    } catch (e) {
      expect(logger).toHaveBeenCalledTimes(2);
      expect(logger).toHaveBeenNthCalledWith(
        1,
        "entering thrower()"
      );
      expect(logger).toHaveBeenNthCalledWith(
        2,
        "exiting  thrower=>threw CRASH!"
      );
    }
  });
});
