const limitYear = 2004; // only good for 2022!

const isOldEnough = (birthYear: number) =>
  birthYear <= limitYear;

console.log(isOldEnough(1960)); // true
console.log(isOldEnough(2010)); // false

const isOldEnough2 = (birthYear: number): boolean =>
  birthYear <= new Date().getFullYear() - 18;

console.log(isOldEnough2(1960)); // true
console.log(isOldEnough2(2010)); // false

const isOldEnough3 = (
  birthYear: number,
  currentYear: number
): boolean => birthYear <= currentYear - 18;

console.log(isOldEnough3(1960, 2022)); // true
console.log(isOldEnough3(2010, 2022)); // false

export { /* isOldEnough, isOldEnough2, */ isOldEnough3 };
