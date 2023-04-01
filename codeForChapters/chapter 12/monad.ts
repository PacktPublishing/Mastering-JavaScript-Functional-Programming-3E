/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import type { FN } from "../common";
import { Functor } from "./functor";

import request from "superagent";

class Monad<A> extends Functor<A> {
  static of<B>(x: B): Monad<B> {
    return new Monad(x);
  }

  map<B>(fn: (_: A) => B): Monad<B> {
    return new Monad(fn(this.x));
  }

  unwrap(): any {
    const myValue = this.x;
    return myValue instanceof Monad
      ? myValue.unwrap()
      : this;
  }

  chain<B>(fn: (_: A) => B) {
    return this.map(fn).unwrap();
  }

  ap<B, C extends FN>(this: Monad<C>, m: Monad<B>) {
    return m.map(this.x);
  }
}

export { Monad };
