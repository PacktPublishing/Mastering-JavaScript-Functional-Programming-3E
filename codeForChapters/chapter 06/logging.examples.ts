import { addLogging, addLogging2 } from "./logging";

function subtract(a: number, b: number): number {
  if (b === 0) {
    throw new Error("We don't subtract zero!");
  } else {
    b = changeSign(b);
    return a + b;
  }
}

let changeSign = (a: number): number => -a;

// @ts-expect-error We want to reassign the function
subtract = addLogging(subtract);
subtract(8, 3);
console.log(); // to separate

changeSign = addLogging(changeSign);
subtract(7, 5);
/*
entering subtract(8,3)
exiting  subtract=>5

entering subtract(7,5)
entering changeSign(5)
exiting  changeSign=>-5
exiting  subtract=>2
*/

const subtract2 = addLogging2(subtract);

try {
  subtract2(11, 0);
} catch (e) {
  /* nothing */
}
/*
entering subtract(11,0)
exiting  subtract=>threw Error: We don't subtract zero!
*/

export { addLogging, addLogging2, subtract };
