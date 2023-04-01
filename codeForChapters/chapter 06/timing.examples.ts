import { addTiming } from "./timing";

function subtract(a: number, b: number): number {
  b = changeSign(b);
  return a + b;
}

let changeSign = (a: number): number => -a;

// @ts-expect-error We want to reassign the function
subtract = addTiming(subtract);
subtract(8, 3);

console.log(); // to separate

changeSign = addTiming(changeSign);
// subtract(7, 5);

/*
subtract - normal exit 0.0217440128326416 ms

changeSign - normal exit 0.0014679431915283203 ms
subtract - normal exit 0.0415341854095459 ms
*/
