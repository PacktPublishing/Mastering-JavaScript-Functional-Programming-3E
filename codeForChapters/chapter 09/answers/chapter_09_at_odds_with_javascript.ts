function isOdd1(n: number): boolean {
  return n % 2 === 1;
}

function isOdd2(n: number): boolean {
  return Boolean(n % 2); // or !!(n % 2) instead
}

function isOdd3(n: number): boolean {
  return Math.floor(n / 2) !== n / 2;
}

function isOdd4(n: number): boolean {
  return Math.floor(n / 2) === Math.floor((n - 1) / 2);
}

function isOdd5(n: number): boolean {
  return (n & 1) === 1;
}

function isOdd6(n: number): boolean {
  return Boolean(n & 1); // or !!(n & 1) instead
}

function isOdd7(n: number): boolean {
  return (n >> 1) << 1 !== n;
}

function isOdd8(n: number): boolean {
  return n >> 1 === (n - 1) >> 1;
}

function isOdd9(n: number): boolean {
  return "13579".includes(String(n).at(-1)!);
}

console.log(isOdd1(22)); // false
console.log(isOdd1(9)); // true

console.log(isOdd2(22)); // false
console.log(isOdd2(9)); // true

console.log(isOdd3(22)); // false
console.log(isOdd3(9)); // true

console.log(isOdd4(22)); // false
console.log(isOdd4(9)); // true

console.log(isOdd5(22)); // false
console.log(isOdd5(9)); // true

console.log(isOdd6(22)); // false
console.log(isOdd6(9)); // true

console.log(isOdd7(22)); // false
console.log(isOdd7(9)); // true

console.log(isOdd8(22)); // false
console.log(isOdd8(9)); // true

console.log(isOdd9(22)); // false
console.log(isOdd9(9)); // true
