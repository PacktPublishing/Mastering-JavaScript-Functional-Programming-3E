import { invert } from "../invert";

describe("invert", () => {
  it("can be used to sort Spanish words", () => {
    const spanishComparison = (
      a: string,
      b: string
    ): number => a.localeCompare(b, "es");

    const palabras = [
      "ñandú",
      "oasis",
      "mano",
      "natural",
      "mítico",
      "musical",
    ];

    expect(
      palabras.sort(invert(spanishComparison))
    ).toEqual([
      "oasis",
      "ñandú",
      "natural",
      "musical",
      "mítico",
      "mano",
    ]);
  });
});

export {};
