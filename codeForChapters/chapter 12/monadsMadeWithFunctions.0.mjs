// MERITORIO: No tengo atributos (this.x, por ejemplo) que sean valores;
// todos los atributos son funciones! (Y uso closures por todos lados...)

function Container(x) {
  this.toString = () => `${this.constructor.name}(${x})`;
  this.valueOf = () => x;
  this.map = (fn) => fn(x);
}
Container.of = (x) => new Container(x);

function Functor(x) {
  Container.call(this, x);
  this.map = (fn) => new this.constructor(fn(x));
}
Functor.of = (x) => new Functor(x);

// PROBABLEMENTE NO PRECISE RECURSIVIDAD -
// SÓLO SACAR EL NIVEL DE AFUERA

const unwrap = (z) => (z.chain ? unwrap(z.valueOf()) : z);

function Monad(x) {
  Functor.call(this, x);
  this.chain = (fn) => new this.constructor(unwrap(fn(x)));
  this.ap = (mon) => mon.map(x); // iff x is a function!
}
Monad.of = (x) => new Monad(x);

function Nothing() {
  Monad.call(this);
  this.toString = () => "Nothing()";
  this.isNothing = () => true;
  this.map = this.chain = this.ap = () => this;
  this.orElse = (v) => new Maybe(v);
}
Nothing.of = () => new Nothing();

function Just(x) {
  Monad.call(this, x);
  this.isNothing = () => false;
  this.map = (fn) => new Maybe(fn(x));
  this.chain = (fn) => new Maybe(unwrap(fn(x)));
  this.orElse = () => this;
}
Just.of = (x) => new Just(x);

const isEmpty = (x) => x === null || x === undefined;

function Maybe(x) {
  isEmpty(x) ? Nothing.call(this) : Just.call(this, x);
}
Maybe.of = (x) => new Maybe(x);

function Left(x) {
  Monad.call(this, x);
  this.isLeft = () => true;
  this.map = this.chain = this.ap = () => this;
  this.recover = (f) =>
    new Either(null, typeof f === "function" ? f() : f);
}
Left.of = (x) => new Left(x);

function Right(x) {
  Monad.call(this, x);
  this.isLeft = () => false;
  this.map = (fn) => new Either(null, fn(x));
  this.chain = (fn) => new Either(null, unwrap(fn(x)));
  this.recover = () => this;
}
Right.of = (x) => new Right(x);

function Either(l, r) {
  isEmpty(r) ? Left.call(this, l) : Right.call(this, r);
  this.toString = () => `Either(${l},${r})`;
}
Either.of = (x, y) => new Either(x, y);

function Try(fn, msg) {
  try {
    Right.call(this, fn());
  } catch (e) {
    Left.call(this, msg || e.message);
  }
}
Try.of = (fn, msg) => new Try(fn, msg);

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

const curry = (fn) =>
  fn.length ? (...x) => curry(fn.bind(null, ...x)) : fn();

const map = curry((fn, m) => m.map(fn));
const chain = curry((fn, m) => m.chain(fn));
const ap = curry((mf, m) => mf.ap(m));
const orElse = curry((val, m) => m.orElse(val));
const recover = curry((fn, m) => m.recover(fn));

export { map, chain, ap, orElse, recover };

// VER https://jrsinclair.com/articles/2016/marvellously-mysterious-javascript-maybe-monad/
// HACER TODO CON FUNCIONES?
