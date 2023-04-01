import { partial } from "./partial";

const make3 = (a: string, b: number, c: string): string =>
  `${a}:${b}:${c}`;

const f0 = partial(make3);
const f1 = f0(undefined, 2);
const f2 = f1("A");
const f3 = f2("Z");
console.log(f3);
