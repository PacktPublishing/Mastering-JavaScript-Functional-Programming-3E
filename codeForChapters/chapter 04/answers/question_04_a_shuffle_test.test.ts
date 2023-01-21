import { shuffle } from "../shuffle";

describe("shuffleTest", function () {
  it("doesn't change the array length or elements", () => {
    const a = [22, 9, 60, 22, 12, 4, 56, 22, 60];
    const oldA = JSON.stringify([...a].sort());
    shuffle(a);
    const newA = JSON.stringify([...a].sort());
    expect(oldA).toBe(newA);
  });
});
