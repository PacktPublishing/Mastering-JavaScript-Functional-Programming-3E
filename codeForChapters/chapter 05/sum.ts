const myArray = [22, 9, 60, 12, 4, 56];

const sum = (x: number, y: number): number => x + y;

const mySum = myArray.reduce(sum, 0); // 163

const mySum2 = myArray.reduce((x, y) => x + y, 0);

console.log(mySum, mySum2);

const sumAndLog = (x: number, y: number): number => {
  console.log(`${x}+${y}=${x + y}`);
  return x + y;
};
myArray.reduce(sumAndLog, 0);

export {};
