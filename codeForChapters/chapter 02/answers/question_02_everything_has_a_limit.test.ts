import { thisManyTimes } from "./question_02_everything_has_a_limit";

describe("thisManyTimes", () => {
  it("calls the function 2 times, nothing after", () => {
    const fn = jest.fn();
    const testFn = jest.fn(thisManyTimes(fn, 2));

    testFn(); // works
    testFn(); // works
    testFn(); // nothing now
    testFn(); // nothing now
    testFn(); // nothing now
    testFn(); // nothing now

    expect(testFn).toHaveBeenCalledTimes(6);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
