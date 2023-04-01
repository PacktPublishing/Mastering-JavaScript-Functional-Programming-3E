import { invert } from "./invert";

const spanishComparison = (a: string, b: string): number =>
  a.localeCompare(b, "es");

const palabras = [
  "ñandú",
  "oasis",
  "mano",
  "natural",
  "mítico",
  "musical",
];
palabras.sort(spanishComparison);
console.log(palabras);
// ["mano", "mítico", "musical", "natural", "ñandú", "oasis"]

palabras.sort(invert(spanishComparison));
console.log(palabras);
// ["oasis", "ñandú", "natural", "musical", "mítico", "mano"]
