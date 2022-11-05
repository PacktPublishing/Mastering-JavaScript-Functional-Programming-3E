import { fakeFilter } from "../async";
import { someAsync } from "./question_5.missing equivalents";

describe("someAsync", () => {
  it("succeeds if sometimes OK", async () => {
    const someEven = await someAsync(
      [1, 2, 3, 4],
      fakeFilter
    );
    expect(someEven).toBeTruthy();
  });

  it("fails if never OK", () => {
    expect(
      someAsync([1, 3, 5, 7, 9], fakeFilter)
    ).resolves.toBeFalsy();
  });
});
