import { isOldEnough3 } from "./isOldEnough";

describe("isOldEnough", function () {
  it("is false for people younger than 18", () => {
    expect(isOldEnough3(2010, 2022)).toBe(false);
  });

  it("is true for people older than 18", () => {
    expect(isOldEnough3(1960, 2022)).toBe(true);
  });

  it("is true for people exactly 18", () => {
    expect(isOldEnough3(2004, 2022)).toBe(true);
  });
});
