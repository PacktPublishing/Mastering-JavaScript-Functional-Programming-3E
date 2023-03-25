function curry(fn) {
  return fn.length === 0
    ? fn()
    : (x) => curry(fn.bind(null, x));
}

const make3 = (a, b, c) => `${a}:${b}:${c}`;

// f1 is the curried version of make3
const f1 = curry(make3);

// f2 is a function that will fix make3's 1st parameter
const f2 = f1("A");

// f3 is a function that will fix make3's 2nd parameter
const f3 = f2(2);

// "A2Z" will be now calculated, since we are providing
// the 3rd (last) make3's parameter
const f4 = f3("Z");
// console.log(f4);

// console.log("TEST!!");

const f2b = f1("TEA")(4);
const f3b = f2b("TWO");
// console.log(f3b);

const f1c = f1("IN")(10)("TION");
// console.log(f1c);

const step1 = make3.bind(null, "A");
const step2 = step1.bind(null, 2);
const step3 = step2.bind(null, "Z");

// console.log(step3()); // "A:2:Z"

function curry2(fn, len) {
  return len === 0
    ? fn()
    : (x) => curry2(fn.bind(null, x), len - 1);
}

const sum2 = (...args) => args.reduce((x, y) => x + y, 0);
sum2.length; // 0; curry() wouldn't work

sum2(1, 5, 3); // 9
sum2(1, 5, 3, 7); // 16
sum2(1, 5, 3, 7, 4); // 20

const curriedSum5 = curry2(sum2, 5); // curriedSum5 will expect 5 parameters
// console.log(curriedSum5(1)(5)(3)(7)(4)); // 20
