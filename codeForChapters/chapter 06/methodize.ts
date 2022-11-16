/*
function methodize(obj, fn) {
  obj.prototype[fn.name] = function (...args) {
    return fn(this, ...args);
  };
}
*/

function methodize<
  T extends any[],
  O extends { prototype: { [key: string]: any } },
  F extends (arg0: any, ...args: T) => any
>(obj: O, fn: F) {
  obj.prototype[fn.name] = function (
    this: Parameters<F>[0],
    ...args: T
  ): ReturnType<F> {
    return fn(this, ...args);
  };
}

declare global {
  interface String {
    reverse(y?: boolean): string;
  }
}

function reverse(x: string, y = false): string {
  return x
    .split("")
    .reverse()
    .join(y ? "-" : "");
}

methodize(String, reverse);

/* The previous is equivalent to:
String.prototype.reverse = function (
  this: string,
  y
): string {
  return reverse(this, y);
};
*/

console.log("MONTEVIDEO".reverse());
console.log("MONTEVIDEO".reverse(true));

declare global {
  // esl int-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    average(this: Array<number>): number;
  }
}

function average(x: number[]): number {
  return (
    x.reduce((x: number, y: number) => x + y, 0) / x.length
  );
}
methodize(Array, average);

const myAvg = [22, 9, 60, 12, 4, 56].average(); // 27.166667
console.log(myAvg);

console.log([1, 2, 3, 4].average()); // this is OK
// @ts-expect-error Wrong!
console.log(["a", "b"].average()); // this is not OK

export { reverse, methodize };
