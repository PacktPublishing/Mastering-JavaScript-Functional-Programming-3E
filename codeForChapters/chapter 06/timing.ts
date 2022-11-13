const myGet: () => number = () => performance.now();

const myPut = (
  text: string,
  name: string,
  tStart: number,
  tEnd: number
): void =>
  console.log(`${name} - ${text} ${tEnd - tStart} ms`);

function addTiming<T extends (...args: any[]) => any>(
  fn: T,
  { getTime, output } = {
    getTime: myGet,
    output: myPut,
  }
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const tStart = getTime();
    try {
      const valueToReturn = fn(...args);
      output("normal exit", fn.name, tStart, getTime());
      return valueToReturn;
    } catch (thrownError) {
      output("exception!!", fn.name, tStart, getTime());
      throw thrownError;
    }
  };
}

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
export { addTiming };
