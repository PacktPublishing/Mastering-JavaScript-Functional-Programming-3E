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

const Nothing = () => {
  const y = Monad();
  y.toString = () => "Nothing()";
  y.isNothing = () => true;
  y.map = y.chain = y.ap = () => y;
  y.orElse = (v) => Maybe(v);
  return y;
};

const Just = (x) => {
  const y = Monad(x);
  y.toString = () => `Just(${x})`;
  y.isNothing = () => false;
  y.map = (fn) => Maybe(fn(x));
  y.chain = (fn) => Maybe(unwrap(fn(x)));
  y.orElse = () => y;
  return y;
};

const Maybe = (x) => (x === null ? Nothing() : Just(x));

const Left = (x) => {
  const y = Monad(x);
  y.toString = () => `Left(${x})`;
  y.isLeft = () => true;
  y.map = () => y;
  y.chain = () => y;
  y.ap = () => y;
  y.recover = (fn) => Either(null, fn());
  return y;
};

const Right = (x) => {
  const y = Monad(x);
  y.toString = () => `Right(${x})`;
  y.isLeft = () => false;
  y.map = (fn) => Either(null, fn(x));
  y.chain = (fn) => Either(null, unwrap(fn(x)));
  y.recover = () => y;
  return y;
};

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
