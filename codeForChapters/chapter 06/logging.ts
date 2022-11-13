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
  b = changeSign(b);
  return a + b;
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

/*
const errorFunc = (n: number) => {
  throw new Error(`I won't work with ${n}!`);
};

try {
  addLogging2(errorFunc)(22);
} catch (e) {
  console.log("Got an error");
}

entering errorFunc(22)
exiting  errorFunc=>threw Error: I won't work with 22!
Got an error
*/

export { addLogging2 };
