// Algunos combinadores que podrían servir...
const I = (x) => x; // Idiot bird AKA Identity
const K = (x) => (y) => x; // Kestrel bird AKA Constant
const A = (f) => (x) => f(x); // A  AKA Apply
const T = (x) => (f) => f(x); // Thrush AKA ApplyTo (?)
const B = (f) => (g) => (x) => f(g(x)); // Bluebird AKA Compose
const V = (a) => (b) => (f) => f(a)(b); // Vireo AKA ...

// MERITORIO: No tengo atributos (this.x, por ejemplo) que sean valores;
// todos los atributos son funciones! (Y uso closures por todos lados...)

function Container(x) {
  this.toString = K(`${this.constructor.name}(${x})`);
  this.valueOf = K(x);
  this.map = T(x);
}

function FunctorFromContainer(x) {
  Container.call(this, x);
  this.map = (fn) => new this.constructor(fn(x));
}

function Functor(x) {
  this.toString = K(`${this.constructor.name}(${x})`);
  this.valueOf = K(x);
  this.map = (fn) => new this.constructor(fn(x));
}

// PROBABLEMENTE NO PRECISE RECURSIVIDAD -
// SÓLO SACAR EL NIVEL DE AFUERA
const unwrap = (z) => (z.chain ? unwrap(z.valueOf()) : z);

function Monad(x) {
  Functor.call(this, x);
  this.chain = (fn) => new this.constructor(unwrap(fn(x)));
  this.ap = (mon) => mon.map(x); // iff x is a function!
}

function Nothing() {
  Monad.call(this);
  this.toString = K("Nothing()");
  this.isNothing = K(true);
  this.map = this.chain = this.ap = K(this);
  this.orElse = Maybe.of;
}

function Just(x) {
  Monad.call(this, x);
  this.isNothing = K(false);
  this.map = (fn) => new Maybe(fn(x));
  this.chain = (fn) => new Maybe(unwrap(fn(x)));
  this.orElse = K(this);
}

const isEmpty = (x) => x === null || x === undefined;

function Maybe(x) {
  isEmpty(x) ? Nothing.call(this) : Just.call(this, x);
}

function Left(x) {
  Monad.call(this, x);
  this.isLeft = K(true);
  this.map = this.chain = this.ap = K(this);
  this.recover = (fn) => new Either(null, fn());
}

function Right(x) {
  Monad.call(this, x);
  this.isLeft = K(false);
  this.map = (fn) => new Either(null, fn(x));
  this.chain = (fn) => new Either(null, unwrap(fn(x)));
  this.recover = K(this);
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
  FunctorFromContainer,
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
  FunctorFromContainer,
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
