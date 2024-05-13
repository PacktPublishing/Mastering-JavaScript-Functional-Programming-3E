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

const unwrap = (z) => (z.chain ? unwrap(z.valueOf()) : z);
// PROBABLEMENTE NO PRECISE RECURSIVIDAD -
// SÓLO SACAR EL NIVEL DE AFUERA

function Monad(x) {
  Functor.call(this, x);
  this.chain = (fn) => new this.constructor(unwrap(fn(x)));
  this.ap = (mon) => mon.map(x);
}

Monad.of = (x) => new Monad(x);

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

function Maybe(x) {
  x === null ? Nothing.call(this) : Just.call(this, x);
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
  r === null ? Left.call(this, l) : Right.call(this, r);
}

function Try(fn, msg) {
  try {
    Right.call(this, fn());
  } catch (e) {
    Left.call(this, msg || e.message);
  }
}

export {
  Container,
  Functor,
  Monad,
  Maybe,
  Either,
  Right,
  Left,
  Try,
};

// VER https://jrsinclair.com/articles/2016/marvellously-mysterious-javascript-maybe-monad/
// HACER TODO CON FUNCIONES?
