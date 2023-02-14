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

/*
const plus1 = (x: number): number => x + 1;

const ex1 = Maybe.of(2209).map(plus1).map(plus1);
console.log(ex1.toString());
// "Just(2211)"

// @ts-expect-error Ignore the type check as an example
const ex2 = Maybe.of(null).map(plus1).map(plus1);
console.log(ex2.toString());
// "Nothing()"

const ex3 = Just.of(22);
const ex4 = new Just("FK");
console.log(ex3.toString(), ex4.toString());
*/

/*
const fakeSearchForSomething = (key: number) => {
  if (key % 2 === 0) {
    return { key, some: "whatever", other: "more data" };
  } else {
    throw new Error("Not found");
  }
};

const findSomething = (key: number) => {
  try {
    const something = fakeSearchForSomething(key);
    return Maybe.of(something);
  } catch (e) {
    return Maybe.of(null);
  }
};

const getSome = (something: any) =>
  Maybe.of(something.map((x: any) => x.some));

const getSomeFromSomething = (key: number) =>
  getSome(findSomething(key));

const xxx = getSomeFromSomething(2222).valueOf().valueOf(); // "whatever"
console.log(xxx);
const yyy = getSomeFromSomething(9999).valueOf().valueOf(); // null
console.log(yyy);
*/

export { Maybe, Nothing, Just };
