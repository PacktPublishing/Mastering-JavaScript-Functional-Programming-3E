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

/*
  EXPLICAR QUE EL 1R PARAMETRO SERÁ SIEMPRE EL OBJETO
  SOBRE EL CUAL TRABAJAR... LA STRING PARA REVERSE(),
  EL ARRAY PARA AVERAGE()

  la función también tiene que tener nombre... algo de
  esto ya mencioné en el capítulo 1, creo...

  CUANDO LA LLAME COMO METODO, NO VOY A PASAR EL 1r ARG
  CUANDO LA LLAMO COMO FUNC, SIEMPRE PASO EL 1r ARG
*/

declare global {
  interface String {
    reverse(y?: number): string;
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

String.prototype.reverse = function (this: string, y=""): string {
  return reverse(this, y);
};
*/
console.log("MONTEVIDEO".reverse());
console.log("MONTEVIDEO".reverse(22));

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    average(this: number[]): number;
  }
}

function average(x: number[]): number {
  return (
    x.reduce((x: number, y: number) => x + y, 0) / x.length
  );
}
methodize(Array, average);
/*
Array.prototype.average = function (this: number[]) {
  return average(this);
};
*/
const myAvg = [22, 9, 60, 12, 4, 56].average(); // 27.166667
console.log(myAvg);

console.log([1, 2, 3, 4].average()); // this is OK
// @ts-expect-error Wrong!
console.log(["a", "b"].average()); // this is not OK

export { reverse, methodize };
