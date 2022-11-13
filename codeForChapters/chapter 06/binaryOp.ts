import { range } from "../chapter 05/range";

const binaryOp1 = (op: string) => {
  switch (op) {
    case "+":
      return (x: number, y: number): number => x + y;
    case "-":
      return (x: number, y: number): number => x - y;
    case "*":
      return (x: number, y: number): number => x * y;
    //
    // etc...
    //
    default:
      throw new Error(`Unknown ${op} operator`);
  }
};

/*
const binaryOp2 = (op) =>
  new Function("x", "y", `return x ${op} y;`);
*/

const binaryOp2 = (op: string) =>
  new Function("x", "y", `return x ${op} y;`) as (
    x: number,
    y: number
  ) => number;

const myArray = [22, 9, 60, 12, 4, 56];
const mySum = myArray.reduce(binaryOp2("+"), 0);

const factorialByRange = (n: number): number =>
  range(1, n + 1).reduce(binaryOp2("*"), 1);

const binaryLeftOp =
  (x: number, op: string) => (y: number) =>
    binaryOp2(op)(x, y);

const binaryOpRight =
  (op: string, y: number) => (x: number) =>
    binaryOp2(op)(x, y);

const isNegative1 = binaryLeftOp(0, ">");
const isNegative2 = binaryOpRight("<", 0);
const isNegative3 = (x: number): boolean => x < 0;

export {
  binaryOp1,
  binaryOp2,
  binaryLeftOp,
  binaryOpRight,
  isNegative1,
  isNegative2,
  isNegative3,
};

export { mySum, factorialByRange };
