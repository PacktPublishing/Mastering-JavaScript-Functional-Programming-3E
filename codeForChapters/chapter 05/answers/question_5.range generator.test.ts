import { range4 } from "./question_5.range generator";

describe("range4", () => {
  it("generates 2..5", () => {
    const range = range4(2, 5);
    expect(range.next().value).toBe(2);
    expect(range.next().value).toBe(3);
    expect(range.next().value).toBe(4);
    expect(range.next().value).toBe(5);
    expect(range.next().value).toBe(undefined);
  });

  it("generates 5..2", () => {
    const range = range4(5, 2);
    expect([...range]).toEqual([5, 4, 3, 2]);
  });

  it("generates 1..10 by 2", () => {
    const numbers = [];
    for (const i of range4(1, 10, 2)) {
      numbers.push(i);
    }
    expect(numbers).toEqual([1, 3, 5, 7, 9]);
  });
});
