import { curry, make3 } from "./curry.examples";

describe("with curry", function () {
  it("you fix arguments one by one", () => {
    const make3a = curry(make3);
    const make3b = make3a("A")(2);
    const make3c = make3b("Z");
    expect(make3c).toBe(make3("A", 2, "Z"));
  });
});
