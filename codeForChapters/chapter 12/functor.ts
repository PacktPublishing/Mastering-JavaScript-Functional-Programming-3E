import { Container } from "./container";

class Functor<A> extends Container<A> {
  static of<B>(x: B) {
    return new Functor(x);
  }

  map<B>(fn: (_: A) => B): Functor<B> {
    return Functor.of(fn(this.x));
  }
}

export { Functor };
