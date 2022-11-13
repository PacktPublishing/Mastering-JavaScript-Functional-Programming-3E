import winston from "winston";
winston.add(new winston.transports.Console({}));
winston.level = "debug";

function addLogging3<T extends (...args: any[]) => any>(
  fn: T,
  logger = console.log.bind(console)
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    logger(`entering ${fn.name}(${args})`);
    try {
      const valueToReturn = fn(...args);
      logger(`exiting  ${fn.name}=>${valueToReturn}`);
      return valueToReturn;
    } catch (thrownError) {
      logger(`exiting  ${fn.name}=>threw ${thrownError}`);
      throw thrownError;
    }
  };
}

/*
const myLogger = (t: any) => winston.log("debug", t);

function subtract(a: number, b: number): number {
  b = changeSign(b);
  return a + b;
}

let changeSign = (a: number): number => -a;

 // @ts-expect-error We want to reassign the function
subtract = addLogging3(subtract, myLogger);
subtract(8, 3);

console.log(); // to separate

changeSign = addLogging3(changeSign, myLogger);
subtract(7, 5);

/*
{"level":"debug","message":"entering subtract(8,3)"}
{"level":"debug","message":"exiting  subtract=>5"}

{"level":"debug","message":"entering subtract(7,5)"}
{"level":"debug","message":"entering changeSign(5)"}
{"level":"debug","message":"exiting  changeSign=>-5"}
{"level":"debug","message":"exiting  subtract=>2"}
*/

export { addLogging3 };
