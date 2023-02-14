/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

// import { Maybe } from "./containers";

class Container<A> {
  protected x: A;

  constructor(x: A) {
    this.x = x;
  }

  map(fn: (_: A) => any) {
    return fn(this.x);
  }

  toString() {
    return `${this.constructor.name}(${this.x})`;
  }

  valueOf() {
    return this.x;
  }
}

const containerOf = <A>(x: A): Container<A> =>
  new Container(x);

class Functor<A> extends Container<A> {
  map<B>(fn: (_: A) => B): Functor<B> {
    return functorOf(fn(this.valueOf()));
  }
}

const functorOf = <A>(x: A): Functor<A> =>
  new Functor<A>(x);

class Maybe<A> extends Functor<A> {
  isNothing() {
    /* */
  }

  orElse(_x: any) {
    /* */
  }

  map<B>(fn: (_: A) => B): Maybe<B> {
    return maybeOf(fn(this.valueOf()));
  }
}

const maybeOf = <A>(x: A | null | undefined) =>
  x === null || x === undefined
    ? new Nothing(undefined)
    : new Just(x);

class Nothing extends Maybe<any> {
  isNothing() {
    return true;
  }

  toString() {
    return "Nothing()";
  }

  orElse(v: any) {
    return v;
  }

  map(fn: (..._args: any) => any) {
    return this;
  }
}

class Just<A> extends Maybe<A> {
  isNothing() {
    return false;
  }

  orElse(v: any) {
    return this.valueOf();
  }

  map<B>(fn: (_: A) => B): Just<B> {
    return new Just(fn(this.valueOf()));
  }
}

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
    return maybeOf(something);
  } catch (e) {
    return maybeOf(null);
  }
};

const getSome = (something: any) =>
  maybeOf(something.map((x: any) => x.some));

const getSomeFromSomething = (key: number) =>
  getSome(findSomething(key));

const xxx = getSomeFromSomething(2222).valueOf().valueOf(); // "whatever"
console.log(xxx);
const yyy = getSomeFromSomething(9999).valueOf().valueOf(); // null
console.log(yyy);

class Monad<A> extends Functor<A> {
  map<B>(fn: (_: A) => B): Monad<B> {
    return new Monad(fn(this.valueOf()));
  }

  unwrap(): any {
    const myValue = this.valueOf();
    return myValue instanceof Monad
      ? myValue.unwrap()
      : this;
  }
}
const monadOf = <A>(x: A): Monad<A> => new Monad<A>(x);

const getSomeFromSomething2 = (key: number) =>
  getSome(findSomething(key)).unwrap();

export {};
