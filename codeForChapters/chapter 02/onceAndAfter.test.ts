import { onceAndAfter } from "./onceAndAfter";

describe("onceAndAfter", () => {
  it("calls the 1st function once & the 2nd after", () => {
    const func1 = jest.fn();
    const func2 = jest.fn();
    const testFn = jest.fn(onceAndAfter(func1, func2));

    testFn();
    testFn();
    testFn();
    testFn();

    expect(testFn).toHaveBeenCalledTimes(4);
    expect(func1).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledTimes(3);
  });
});
