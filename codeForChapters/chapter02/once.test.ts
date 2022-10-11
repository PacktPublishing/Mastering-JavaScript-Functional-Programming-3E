import { once } from "./once";

describe("once", () => {
  it("without 'once', a function always runs", () => {
    const myFn = jest.fn();

    myFn();
    myFn();
    myFn();

    expect(myFn).toHaveBeenCalledTimes(3);
  });

  it("with 'once', a function runs one time", () => {
    const myFn = jest.fn();
    const onceFn = jest.fn(once(myFn));

    onceFn();
    onceFn();
    onceFn();

    expect(onceFn).toHaveBeenCalledTimes(3);
    expect(myFn).toHaveBeenCalledTimes(1);
  });
});
