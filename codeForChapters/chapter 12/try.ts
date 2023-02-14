import { Either } from "./either";
import type { OBJ } from "../common";

class Try<A> extends Either<A, string> {
  // @ts-expect-error Call to super() not needed
  constructor(fn: () => A, msg?: string) {
    try {
      return Either.of(null, fn()) as Either<A, string>;
    } catch (e: any) {
      return Either.of(msg || e.message, null) as Either<
        string,
        string
      >;
    }
  }
}

const getField2 = (attr: string) => (obj: OBJ | null) =>
  new Try(() => obj![attr], "NULL OBJECT");

const x = getField2("somefield")(null);

console.log(x.isLeft()); // true
console.log(x.toString()); // Left(NULL OBJECT)
