const Container = (x) => ({
  toString: () => `Container(${x})`,
  valueOf: () => x,
  map: (fn) => fn(x),
});

const Functor = (x) => ({
  toString: () => `Functor(${x})`,
  valueOf: () => x,
  map: (fn) => Functor(fn(x)),
});

const unwrap = (z) => (z.chain ? unwrap(z.valueOf()) : z);

const Monad = (x) => ({
  toString: () => `Monad(${x})`,
  valueOf: () => x,
  map: (fn) => Monad(fn(x)),
  chain: (fn) => Monad(unwrap(fn(x))),
  ap: (m) => m.map(x),
});

const Nothing = () => ({
  ...Monad(),
  toString: () => "Nothing()",
  isNothing: () => true,
  map() {
    return this;
  },
  chain() {
    return this;
  },
  ap() {
    return this;
  },
  orElse: (v) => Maybe(v),
});

const Just = (x) => ({
  ...Monad(x),
  toString: () => `Just(${x})`,
  isNothing: () => false,
  map: (fn) => Maybe(fn(x)),
  chain: (fn) => Maybe(unwrap(fn(x))),
  orElse() {
    return this;
  },
});

const Maybe = (x) => (x === null ? Nothing() : Just(x));

const Left = (x) => ({
  ...Monad(x),
  toString: () => `Left(${x})`,
  isLeft: () => true,
  map() {
    return this;
  },
  chain() {
    return this;
  },
  ap() {
    return this;
  },
  recover: (fn) => Either(null, fn()),
});

const Right = (x) => ({
  ...Monad(x),
  toString: () => `Right(${x})`,
  isLeft: () => false,
  map: (fn) => Either(null, fn(x)),
  chain: (fn) => Either(null, unwrap(fn(x))),
  recover() {
    return this;
  },
});

const Either = (l, r) => (r === null ? Left(l) : Right(r));

export {
  Container,
  Functor,
  Monad,
  Maybe,
  Either,
  Right,
  Left,
};

// hacer la creación de objetos en una línea, usando spread, y cambiando los valores

// { ...Monad(x), toString: blabla, isNothing: bleble, etc. }

// si hago Just(null) que retorne un Nothing() ... pero en ese caso
// para qué me sirve Maybe() ?
// también podría sacarle el test a Just...
