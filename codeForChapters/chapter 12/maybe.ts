import { Functor } from "./functor";

import type { FN } from "../common";

abstract class Maybe<A> extends Functor<A> {
  static of<B>(x: B): Maybe<B> {
    return x === null || x === undefined
      ? new Nothing()
      : new Just(x);
  }

  isNothing() {
    /* */
  }

  orElse(_x: any) {
    /* */
  }

  map<B>(fn: (_: A) => B): Maybe<B> {
    return Maybe.of(fn(this.x));
  }
}

class Nothing extends Maybe<any> {
  constructor() {
    super(null);
  }

  isNothing() {
    return true;
  }

  toString() {
    return "Nothing()";
  }

  orElse(v: any) {
    return v;
  }

  map(_fn: FN) {
    return this;
  }
}

class Just<A> extends Maybe<A> {
  static of<B>(x: B): Maybe<B> {
    if (x === null || x === undefined) {
      throw new Error("Just should have a value");
    } else {
      return new Just(x);
    }
  }

  isNothing() {
    return false;
  }

  orElse(_v: any) {
    return this.x;
  }

  map<B>(fn: (_: A) => B): Just<B> {
    return new Just(fn(this.x));
  }
}

export { Maybe, Nothing, Just };
