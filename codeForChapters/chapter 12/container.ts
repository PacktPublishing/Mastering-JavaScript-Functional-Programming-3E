class Container<A> {
  protected x: A;

  constructor(x: A) {
    this.x = x;
  }

  static of<B>(x: B): Container<B> {
    return new Container(x);
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

export { Container };
