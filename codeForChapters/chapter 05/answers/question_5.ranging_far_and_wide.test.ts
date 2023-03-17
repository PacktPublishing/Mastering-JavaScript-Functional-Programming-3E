import { range2 } from "./question_5.ranging_far_and_wide";

describe("range2()", () => {
  it("works from 1 to 10", () =>
    expect(range2(1, 10)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]));

  it("works from 1 to 10 by 2", () =>
    expect(range2(1, 10, 2)).toEqual([1, 3, 5, 7, 9]));

  it("works from 21 down to 10 by -4", () =>
    expect(range2(21, 10, -4)).toEqual([21, 17, 13]));
});

/*
range2(1, 10); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
range2(1, 10, 2); // [1, 3, 5, 7, 9]
range2(1, 10, 3); // [1, 4, 7]
range2(1, 10, 6); // [1, 7]
range2(1, 10, 11); // [1]
range2(21, 10); // [21, 20, 19, ... 13, 12, 11]
range2(21, 10, -3); // [21, 18, 15, 12]
range2(21, 10, -4); // [21, 17, 13]
range2(21, 10, -7); // [21, 14]
range2(21, 10, -12); // [21]

export { range2, range2b };
*/
