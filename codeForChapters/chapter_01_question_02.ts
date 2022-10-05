// QUESTION 2
const carefulFact = (n: number): number | void => {
  if (
    typeof n !== "undefined" && // QUIZAS PEDIR typeof n === "number"
    Number(n) === n &&
    n >= 0 &&
    n === Math.floor(n)
  ) {
    const innerFact = (n: number): number =>
      n === 0 ? 1 : n * innerFact(n - 1);
    return innerFact(n);
  }
};

console.log(carefulFact(3)); // 6, correct
console.log(carefulFact(3.1)); // undefined
console.log(carefulFact(-3)); // undefined
console.log(carefulFact(-3.1)); // undefined
/*
console.log(carefulFact("3")); // undefined -- error with TypeScript
console.log(carefulFact(false)); // undefined -- error with TypeScript
console.log(carefulFact([])); // undefined -- error with TypeScript
console.log(carefulFact({})); // undefined -- error with TypeScript
*/

const carefulFact2 = (n: number): number | never => {
  if (
    typeof n !== "undefined" && // QUIZAS PEDIR typeof n === "number"
    Number(n) === n &&
    n >= 0 &&
    n === Math.floor(n)
  ) {
    const innerFact = (n: number): number =>
      n === 0 ? 1 : n * innerFact(n - 1);
    return innerFact(n);
  } else {
    throw new Error("Wrong parameter for carefulFact2");
  }
};
