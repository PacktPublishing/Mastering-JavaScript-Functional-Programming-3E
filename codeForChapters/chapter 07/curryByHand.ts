const make3 = (a: string, b: number, c: string): string =>
  `${a}:${b}:${c}`;

const make3curried =
  (a: string) => (b: number) => (c: string) =>
    `${a}:${b}:${c}`;

const make3curried2 = function (a: string) {
  return function (b: number) {
    return function (c: string) {
      return `${a}:${b}:${c}`;
    };
  };
};

const addVAT = (rate: number, amount: number): number =>
  amount * (1 + rate / 100);

addVAT(20, 500); // 600 -- that is, 500 + 20%
addVAT(15, 200); // 230 -- 200 +15%

const addVATcurried =
  (rate: number) =>
  (amount: number): number =>
    amount * (1 + rate / 100);

const addNationalVAT = addVATcurried(6);
addNationalVAT(1500); // 1590 -- 1500 + 6%

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function myLog(severity: string, logText?: string) {
  // display logText in an appropriate way,
  // according to its severity
  // ("NORMAL", "WARNING", or "ERROR")
}

/*
// @ts-expect-error We want to reassign the function
myLog = curry(myLog);

const myNormalLog = myLog("NORMAL");
const myWarningLog = myLog("WARNING");
const myErrorLog = myLog("ERROR");

const myNormalLog2 = curry(myLog)("NORMAL");
const myWarningLog2 = curry(myLog)("WARNING");
const myErrorLog2 = curry(myLog)("ERROR");
*/

function sum(x: number): (y: number) => number;
function sum(x: number, y: number): number;
function sum(
  x: number,
  y?: number
): number | ((y: number) => number) {
  if (x !== undefined && y !== undefined) {
    return x + y;
  } else {
    // if (x !== undefined && y == undefined)
    return (z: number) => x + z;
  }
}

console.log(sum(3, 5)); // 8; did you expect otherwise?
const add3 = sum(3);
console.log(add3(5)); // 8

console.log(sum(3)(5)); // 8 -- as if it were curried

/*
export { myNormalLog, myWarningLog, myErrorLog };
export { myNormalLog2, myWarningLog2, myErrorLog2 };
*/

export {};
