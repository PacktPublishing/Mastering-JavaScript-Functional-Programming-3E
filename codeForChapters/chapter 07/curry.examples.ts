import { curry } from "./curry";

const make3 = (a: string, b: number, c: string): string =>
  `${a}:${b}:${c}`;
const f1 = curry(make3);
// (arg: string) => (arg: number) => (arg: string) => string
const f2 = f1("A");
// (arg: number) => (arg: string) => string
const f3 = f2(2);
// (arg: string) => string
const f4 = f3("Z");
// string
console.log(f4);
