import { onceIfSuccess } from "./question_02_allow_for_crashing";

describe("onceIfSuccess", () => {
  it("should run once if no errors", () => {
    const myFn = jest.fn();
    const onceFn = jest.fn(onceIfSuccess(myFn));

    onceFn();
    onceFn();
    onceFn();

    expect(onceFn).toHaveBeenCalledTimes(3);
    expect(myFn).toHaveBeenCalledTimes(1);
  });

  it("should run again if an exception", () => {
    const myFn = jest
      .fn()
      .mockImplementationOnce(() => {
        throw new Error("ERROR 1");
      })
      .mockImplementationOnce(() => {
        throw new Error("ERROR 2");
      })
      .mockReturnValue(22);

    const onceFn = jest.fn(onceIfSuccess(myFn));

    expect(onceFn).toThrow();
    expect(onceFn).toThrow();
    expect(onceFn()).toBe(22); // OK now (returns 22)
    onceFn(); // nothing
    onceFn(); // nothing
    onceFn(); // nothing

    expect(onceFn).toHaveBeenCalledTimes(6);
    expect(myFn).toHaveBeenCalledTimes(3);
  });
});
