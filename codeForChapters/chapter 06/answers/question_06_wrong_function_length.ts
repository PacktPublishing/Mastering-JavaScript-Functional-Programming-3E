import { range } from "../../chapter 05/range";

function arityL<T extends (...args: any[]) => any>(
  n: number,
  fn: T
): (...x: Parameters<T>) => ReturnType<T> {
  const args1n = range(0, n)
    .map((i) => `x${i}`)
    .join(",");

  return eval(`(${args1n}) => ${fn.name}(${args1n})`);
}

const parseInt1 = arityL(1, parseInt);
console.log(parseInt1.length);

const parseInt2 = arityL(2, parseInt);
console.log(parseInt2.length);

/*
  se mantiene que TS no sabe el verdadero tipo del resultado
  hover sobre parseInt1, parseInt2
*/

export { arityL };
