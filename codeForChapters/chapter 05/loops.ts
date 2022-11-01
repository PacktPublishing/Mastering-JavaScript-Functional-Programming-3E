import { range } from "./range";

const fact4 = (n: number): number => {
  let result = 1;
  range(1, n + 1).forEach((v) => (result *= v));
  return result;
};

console.log(fact4(5)); // 120
