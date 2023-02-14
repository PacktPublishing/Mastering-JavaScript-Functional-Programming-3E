import { Container } from "./container";

class Functor<A> extends Container<A> {
  static of<B>(x: B) {
    return new Functor(x);
  }

  map<B>(fn: (_: A) => B): Functor<B> {
    return Functor.of(fn(this.x));
  }
}

/*
const num1 = new Functor(22);
console.log(num1.toString());

const num2 = num1.map((x: number) => 10 * x + 9);
console.log(num2.toString());
*/

export { Functor };
