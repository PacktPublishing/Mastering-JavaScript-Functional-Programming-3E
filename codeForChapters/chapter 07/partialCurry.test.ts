import {
  partialCurryByBind,
  partialCurryByClosure,
} from "./partialCurry.examples";

const make3 = (a: string, b: number, c: string): string =>
  `${a}:${b}:${c}`;

describe("with partialCurryByBind", function () {
  it("you could fix arguments in several steps", () => {
    const make3a = partialCurryByBind(make3);
    const make3b = make3a("MAKE", 1);
    const make3c = make3b("TRY");
    expect(make3c).toBe(make3("MAKE", 1, "TRY"));
  });

  it("you could fix arguments in a single step", () => {
    const make3a = partialCurryByBind(make3);
    const make3b = make3a("SET", 2, "IT");
    expect(make3b).toBe(make3("SET", 2, "IT"));
  });

  it("you could fix ALL the arguments", () => {
    const make3all = partialCurryByBind(make3);
    expect(make3all("SOME", 1, "KNOWS")).toBe(
      make3("SOME", 1, "KNOWS")
    );
  });

  it("you could fix one argument at a time", () => {
    const make3one =
      partialCurryByBind(make3)("READY")(2)("GO");
    expect(make3one).toBe(make3("READY", 2, "GO"));
  });
});

describe("with partialCurryByClosure", function () {
  it("you could fix arguments in several steps", () => {
    const make3a = partialCurryByClosure(make3);
    const make3b = make3a("MAKE", 1);
    const make3c = make3b("TRY");
    expect(make3c).toBe(make3("MAKE", 1, "TRY"));
  });

  it("you could fix arguments in a single step", () => {
    const make3a = partialCurryByClosure(make3);
    const make3b = make3a("SET", 2, "IT");
    expect(make3b).toBe(make3("SET", 2, "IT"));
  });

  it("you could fix ALL the arguments", () => {
    const make3all = partialCurryByClosure(make3);
    expect(make3all("SOME", 1, "KNOWS")).toBe(
      make3("SOME", 1, "KNOWS")
    );
  });

  it("you could fix one argument at a time", () => {
    const make3one =
      partialCurryByClosure(make3)("READY")(2)("GO");
    expect(make3one).toBe(make3("READY", 2, "GO"));
  });
});
