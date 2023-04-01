import { Monad } from "./monad";

abstract class Either<A, B> extends Monad<A | B> {
  static of<C, D>(left: C, right?: D): Left | Right<D> {
    return right === undefined || right === null
      ? new Left(left)
      : new Right(right);
  }

  isLeft() {
    /* */
  }
}

class Left extends Monad<any> {
  isLeft() {
    return true;
  }

  map(_x: any) {
    return this;
  }
}

class Right<A> extends Monad<A> {
  isLeft() {
    return false;
  }

  map(fn: (_: A) => any) {
    return Either.of(null, fn(this.x));
  }
}

export { Either, Left, Right };
