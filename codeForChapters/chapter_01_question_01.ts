// QUESTION 1
// Explanation in text

const makeSaluteClass = (term: string) =>
  class {
    x: string;

    constructor(x: string) {
      this.x = x;
    }

    salute(y: string) {
      console.log(`${this.x} says "${term}" to ${y}`);
    }
  };

const Spanish = makeSaluteClass("HOLA");
new Spanish("ALFA").salute("BETA");
// ALFA says "HOLA" to BETA

new (makeSaluteClass("HELLO"))("GAMMA").salute("DELTA");
// GAMMA says "HELLO" to DELTA

const fullSalute = (
  c: ReturnType<typeof makeSaluteClass>,
  x: string,
  y: string
) => new c(x).salute(y);

const French = makeSaluteClass("BON JOUR");
fullSalute(French, "EPSILON", "ZETA");
// EPSILON says "BON JOUR" to ZETA
