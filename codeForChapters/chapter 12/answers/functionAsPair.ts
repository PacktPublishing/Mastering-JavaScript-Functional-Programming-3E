const NewPair = (l, r) => (f) => f(l, r);

const pairLeft = (pair) => pair((l, r) => l);
const pairRight = (pair) => pair((l, r) => r);
const pairToArray = (pair) => pair((l, r) => [l, r]);
const pairSwap = (pair) => pair((l, r) => NewPair(r, l));

// the most straightforward, using previous functions to get values from a pair
const pairSetFirst1 = (pair, value) =>
  NewPair(value, pairRight(pair));
const pairSetSecond1 = (pair, value) =>
  NewPair(pairLeft(pair), value);

// expanding the definition of the pairRight/pairLeft calls in the previous definitions
const pairSetFirst2 = (pair, value) =>
  NewPair(
    value,
    pair((l, r) => r)
  );
const pairSetSecond2 = (pair, value) =>
  NewPair(
    pair((l, r) => l),
    value
  );

// expanding the definition of the NewPair calls in the previous definitions
const pairSetFirst3 = (pair, value) => (f) =>
  f(
    value,
    pair((l, r) => r)
  );
const pairSetSecond3 = (pair, value) => (f) =>
  f(
    pair((l, r) => l),
    value
  );

// a more standard way: all functions start with "pair => pair((l,r) => ...)
const pairSetFirst4 = (pair, value) =>
  pair((l, r) => NewPair(value, r));
const pairSetSecond4 = (pair, value) =>
  pair((l, r) => NewPair(l, value));

// expanding the definition of the NewPair calls in the previous definitions
const pairSetFirst5 = (pair, value) =>
  pair((l, r) => (f) => f(value, r));

const pairSetSecond5 = (pair, value) =>
  pair((l, r) => (f) => (l, value));

// TESTS /////////////////////////////////////////////////////////////////////

const pairLog = (pair) => console.log(pairToArray(pair));

const pair = NewPair(22, 9);

console.log(pairLeft(pair)); // 22
console.log(pairRight(pair)); // 9

pairLog(pair); // [22, 9]
pairLog(pairSwap(pair)); // [9, 22]

pairLog(pairSetFirst1(pair, 222)); // [222, 9]
pairLog(pairSetSecond1(pair, 999)); // [22, 999]

pairLog(pairSetFirst2(pair, 22222)); // [22222, 9]
pairLog(pairSetSecond2(pair, 99999)); // [22, 99999]

pairLog(pairSetFirst3(pair, 33333)); // [33333, 9]
pairLog(pairSetSecond3(pair, 44444)); // [22, 44444]

pairLog(pairSetFirst4(pair, 55555)); // [55555, 9]
pairLog(pairSetSecond4(pair, 66666)); // [22, 66666]

pairLog(pairSetFirst4(pair, 77777)); // [77777, 9]
pairLog(pairSetSecond4(pair, 88888)); // [22, 88888]

export {};
