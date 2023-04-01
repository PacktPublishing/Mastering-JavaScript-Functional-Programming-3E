import { Try } from "./try";
import type { OBJ } from "../common";

const getField2 = (attr: string) => (obj: OBJ | null) =>
  new Try(() => obj![attr], "NULL OBJECT");

const x = getField2("somefield")(null);

console.log(x.isLeft()); // true
console.log(x.toString()); // Left(NULL OBJECT)

export { Try };
