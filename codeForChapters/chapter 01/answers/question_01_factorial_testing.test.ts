import { carefulFact } from "./question_01_factorial_errors";

describe("Correct cases", () => {
  test("5! = 120", () => expect(carefulFact(5)).toBe(120));

  test("0! = 1", () => expect(carefulFact(0)).toBe(1));
});

describe("Errors", () => {
  test("Should reject 3.1", () => {
    expect(() => carefulFact(3.1)).toThrow();
  });

  test("Should reject -4", () => {
    expect(() => carefulFact(-3)).toThrow();
  });

  test("Should reject -5.2", () => {
    expect(() => carefulFact(-3)).toThrow();
  });
});

/*
 PASS  codeForChapters/chapter 01/question_1.5.test.ts
  Correct cases
    ✓ 5! = 120 (1 ms)
    ✓ 0! = 1
  Errors
    ✓ Should reject 3.1 (5 ms)
    ✓ Should reject -4
    ✓ Should reject -5.2 (1 ms)

-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
All files        |     100 |      100 |     100 |     100 |
 question_1.4.ts |     100 |      100 |     100 |     100 |
-----------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.1 s
*/
