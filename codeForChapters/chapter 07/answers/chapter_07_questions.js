const curry = fn => (...args) =>
  args.length >= fn.length ? fn(...args) : curry(fn.bind(null, ...args));

const make3 = (a, b, c) => String(100 * a + 10 * b + c);
const make3curried = curry(make3);
console.log(make3curried(1)(2)(3));
console.log(make3curried(4, 5)(6));
console.log(make3curried(7, 8, 9));
/*
123
456
789
*/
