import {
  Container,
  Functor,
  Maybe,
  Monad,
  Right,
  Left,
  Try,
} from "./monadsMadeWithFunctions.0.mjs";

const cont1 = new Container(22);
console.log(cont1.toString()); // Container(22)
console.log(cont1.map((x) => x * 10 + 9).toString()); // Container(229)

const cont2 = new Container("FK");
console.log(cont2.toString()); // Container("FK")

const funct1 = new Functor(9);
console.log(funct1.toString()); // Functor(9)

const funct2 = funct1.map((x) => 10 * x + 9);
console.log(funct2.toString()); // Functor(99)

const mon1 = (x) => (y) => x + y;
const fnMon = new Monad(2).map(mon1);
console.log(fnMon.toString()); // Monad(y => x+y)

const mon2 = fnMon.ap(new Monad(3));
console.log(mon2.toString()); // Monad(5)
const mon3 = mon2.chain(
  (x) => new Monad(new Monad(x + 100))
);
console.log(mon3.toString()); // Monad(105)

const plus1 = (x) => x + 1;
const may1 = new Maybe(2209).map(plus1).map(plus1);
console.log(may1.toString()); // Just(2211)
console.log(may1.map(() => null).toString()); // Nothing()

const may2 = new Maybe(null).map(plus1).map(plus1);
console.log(may2.toString()); // Nothing()
console.log(fnMon.ap(may1).toString()); // Just(2213)

console.log(may2.orElse(44).toString());

const fakeCall = (n) =>
  n % 2 === 1
    ? new Right(n * 100)
    : new Left(`Error ${n} happened`);

console.log("--- EITHER ---");

const ei1 = fakeCall(8);
console.log(ei1.map(plus1).toString());
console.log(ei1.recover(() => 4567).toString());

const ei2 = fakeCall(9);
console.log(ei2.map(plus1).toString());
console.log(ei2.recover(() => 4567).toString());

const getField2 = (attr) => (obj) =>
  new Try(() => obj[attr] /* , "NULL" */);

const x = getField2("somefield")(null).map(plus1);
console.log(x.toString()); // Left(NULL OBJECT)
console.log(x.isLeft()); // true

const y = getField2("bbb")({
  aaa: 10,
  bbb: 20,
  ccc: 30,
}).map(plus1);
console.log(y.toString()); // Either(21) <<<< FEO!!!
console.log(y.isLeft()); // false

// PROBAR ALGO ASYNC !!
