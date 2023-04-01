import { Either } from "./either";

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

export { Try };
