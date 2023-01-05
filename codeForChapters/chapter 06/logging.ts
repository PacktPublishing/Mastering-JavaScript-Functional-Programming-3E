/*

function addLogging(fn) {
  return (...args) => {
    console.log(`entering ${fn.name}(${args})`);
    const valueToReturn = fn(...args);
    console.log(`exiting  ${fn.name}=>${valueToReturn}`);
    return valueToReturn;
  };
}

*/

// https://spin.atomicobject.com/2019/01/11/typescript-higher-order-functions/

function addLogging<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    console.log(`entering ${fn.name}(${args})`);
    const valueToReturn = fn(...args);
    console.log(`exiting  ${fn.name}=>${valueToReturn}`);
    return valueToReturn;
  };
}

function subtract(a: number, b: number): number {
  if (b === 0) {
    throw new Error("We don't subtract zero!");
  } else {
    b = changeSign(b);
    return a + b;
  }
}

let changeSign = (a: number): number => -a;

/*
// @ts-expect-error We want to reassign the function
subtract = addLogging(subtract);
subtract(8, 3);
*/
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

function addLogging2<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    console.log(`entering ${fn.name}(${args})`);
    try {
      const valueToReturn = fn(...args);
      console.log(`exiting  ${fn.name}=>${valueToReturn}`);
      return valueToReturn;
    } catch (thrownError) {
      console.log(
        `exiting  ${fn.name}=>threw ${thrownError}`
      );
      throw thrownError;
    }
  };
}

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
