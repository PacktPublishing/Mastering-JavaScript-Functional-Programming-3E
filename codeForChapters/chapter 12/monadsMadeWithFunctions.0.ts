// MERITORIO: No tengo atributos (this.x, por ejemplo) que sean valores;
// todos los atributos son funciones! (Y uso closures por todos lados...)

/*
function Container<T>(x: T) {
  this.toString = () => `${this.constructor.name}(${x})`;
  this.valueOf = () => x;
  this.map = (fn) => fn(x);
}

function FunctorFromContainer(x) {
  Container.call(this, x);
  this.map = (fn) => new this.constructor(fn(x));
}
*/

interface Functor<T> {
  toString: () => string;
  valueOfMe: () => T;
  map: <U>(fn: (v: T) => U) => Functor<U>;
}

function Functor<T>(this: Functor<T>, x: T) {
  this.toString = () => `${this.constructor.name}(${x})`;
  this.valueOfMe = () => x;
  this.map = <U>(fn: (x: T) => U) =>
    new (this.constructor as new (x: U) => Functor<U>)(
      fn(x)
    );
}

// PROBABLEMENTE NO PRECISE RECURSIVIDAD -
// SÓLO SACAR EL NIVEL DE AFUERA
const unwrap = (z) => (z.chain ? unwrap(z.valueOf()) : z);

interface Monad<T> extends Functor<T> {
  chain<U>(fn: (v: T) => Monad<U>): Monad<U>;
  // ap...
}

function Monad(x) {
  Functor.call(this, x);
  this.chain = (fn) => new this.constructor(unwrap(fn(x)));
  this.ap = (mon) => mon.map(x);
}

const pp = new Monad(220);

function Nothing() {
  Monad.call(this);
  this.toString = () => "Nothing()";
  this.isNothing = () => true;
  this.map = this.chain = this.ap = () => this;
  this.orElse = (v) => new Maybe(v);
}

function Just(x) {
  Monad.call(this, x);
  this.isNothing = () => false;
  this.map = (fn) => new Maybe(fn(x));
  this.chain = (fn) => new Maybe(unwrap(fn(x)));
  this.orElse = () => this;
}

const isEmpty = (x) => x === null || x === undefined;

function Maybe(x) {
  isEmpty(x) ? Nothing.call(this) : Just.call(this, x);
}

function Left(x) {
  Monad.call(this, x);
  this.isLeft = () => true;
  this.map = this.chain = this.ap = () => this;
  this.recover = (fn) => new Either(null, fn());
}

function Right(x) {
  Monad.call(this, x);
  this.isLeft = () => false;
  this.map = (fn) => new Either(null, fn(x));
  this.chain = (fn) => new Either(null, unwrap(fn(x)));
  this.recover = () => this;
}

function Either(l, r) {
  isEmpty(r) ? Left.call(this, l) : Right.call(this, r);
  this.toString = () => `Either(${l},${r})`;
}

function Try(fn, msg) {
  try {
    Right.call(this, fn());
  } catch (e) {
    Left.call(this, msg || e.message);
  }
}

// ES CORRECTO QUE TRY YA LLAME A fn() ??

[
  Container,
  Functor,
  Monad,
  Nothing,
  Just,
  Maybe,
  Either,
  Right,
  Left,
  Try,
].forEach((m) => (m.of = (...x) => new m(...x)));

export {
  Container,
  Functor,
  Monad,
  Nothing,
  Just,
  Maybe,
  Either,
  Right,
  Left,
  Try,
};

const map = (fn) => (m) => m.map(fn);
const chain = (fn) => (m) => m.chain(fn);
const ap = (mf) => (m) => mf.ap(m);
const orElse = (val) => (m) => m.orElse(val);
const recover = (fn) => (m) => m.recover(fn);

export { map, chain, ap, orElse, recover };

// VER https://jrsinclair.com/articles/2016/marvellously-mysterious-javascript-maybe-monad/
// HACER TODO CON FUNCIONES?
