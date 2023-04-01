import { partialCurryByBind } from "./partialCurry";

const make3 = (a: string, b: number, c: string): string =>
  `${a}:${b}:${c}`;

const h1 = partialCurryByBind(make3);
const h2 = h1("A");
const h3 = h2(2, "Z");
console.log(h3); // A:2:Z

const h5 = h1("BE", 4);
const h6 = h5("YOU");
console.log(h6); // BE:4:YOU

const h7 = h5()()()("ME");
console.log(h7); // B:4:ME

const h8 = partialCurryByBind(make3)("I", 8);
const h9 = h8("SOME");
console.log(h9); // "I:8:SOME"
