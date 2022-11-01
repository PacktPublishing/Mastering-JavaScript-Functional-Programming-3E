import { factorial } from "./factorial";

test("5! = 120", () => {
  expect(factorial(5)).toBe(120);
});

test("0! = 1", () => {
  expect(factorial(0)).toBe(1);
});
