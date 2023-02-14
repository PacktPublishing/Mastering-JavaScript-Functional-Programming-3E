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

/*
const num1 = new Container(22);
console.log(num1.map((x: number): number => x));
console.log(num1.toString());

const num2 = Container.of("FK");
console.log(num2.toString());
*/

export { Container };
