/*
  Muchas fallas!!
*/

const NOOP = () => void 0;

const isEmpty = (x) => x === null || x === undefined;

const Maybe = (x) =>
  isEmpty(x)
    ? Promise.reject(null).catch(NOOP) // nothing()
    : Promise.resolve(x); // just(x)

Promise.prototype.recover = function (fn) {
  this.catch(NOOP);
  return Maybe(fn());
};

Promise.prototype.orElse = function (x) {
  this.catch(NOOP);
  return Promise.resolve(x);
};

Promise.of = Promise.resolve;
Promise.prototype.map = Promise.prototype.then;
Promise.prototype.chain = Promise.prototype.then;
Promise.prototype.ap = function (otherPromise) {
  return this.then(otherPromise.map);
};

await Promise.resolve(22).then(console.log);

await Promise.reject(33)
  .recover(() => 10)
  .then(console.log);

const Try = (fn) => Promise.resolve(fn()).catch(NOOP);

await Try(() => 1 / 2).then(console.log);

await Try(() => 1 / 0)
  .recover(() => 999)
  .then(console.log);

const Maybe2 = (x) => {
  let ret;
  if (isEmpty(x)) {
    ret = Promise.reject(null).catch(NOOP); // nothing
    ret.isNothing = () => true;
    ret.toString = () => "Nothing()";
  } else {
    ret = Promise.resolve(x); // just(x)
    ret.isNothing = () => false;
    ret.toString = () => `Just(${x})`;
  }
  return ServiceWorkerRegistration;
};

const plus1 = (x) => x + 1;
const may1 = Maybe(2209).map(plus1).map(plus1);
console.log(may1.toString()); // Just(2211)
console.log(may1.map(() => null).toString()); // Nothing()

const may2 = Maybe(null).map(plus1).map(plus1);
console.log(may2.toString()); // Nothing()
console.log(may2.orElse(44).toString());
