import { alternator } from "./question_2.2";

describe("alternator", () => {
  it("calls the two functions alternatively", () => {
    const funcA = jest.fn().mockReturnValue("A");
    const funcB = jest.fn().mockReturnValue("B");
    const testFn = jest.fn(alternator(funcA, funcB));

    expect(testFn()).toEqual("A");
    expect(testFn()).toEqual("B");
    expect(testFn()).toEqual("A");
    expect(testFn()).toEqual("B");
    expect(testFn()).toEqual("A");
    expect(testFn()).toEqual("B");

    expect(testFn).toHaveBeenCalledTimes(6);
    expect(funcA).toHaveBeenCalledTimes(3);
    expect(funcB).toHaveBeenCalledTimes(3);
  });
});
