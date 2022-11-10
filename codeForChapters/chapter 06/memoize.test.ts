import { fib } from "./fibonacci";
import * as moduleFib from "./fibonacci";

global.fib = function fib(n: number): number {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    console.log("CALLED WITH ", n);
    return fib(n - 2) + fib(n - 1);
  }
};

/*
afterEach(() => {
  jest.restoreAllMocks();
});
*/

describe("the original fib", function () {
  /*
  it("should produce correct results", () => {
    expect(fib(0)).toBe(0);
    expect(fib(1)).toBe(1);
    expect(fib(5)).toBe(5);
    expect(fib(8)).toBe(21);
    expect(fib(10)).toBe(55);
  });
  */

  it("should repeat calculations", () => {
    jest.spyOn(moduleFib, "fib");
    expect(fib(6)).toBe(8);
    expect(fib).toHaveBeenCalledTimes(25);
  });
});

export {};

/*
jest.spyOn(object, methodName)
Creates a mock function similar to jest.fn but also tracks calls to object[methodName]. Returns a Jest mock function.

NOTE
By default, jest.spyOn also calls the spied method. This is different behavior from most other test libraries.
*/
