// no overloading for arrow functions!

function sum(x: number, y: number): number;
function sum(x: string, y: string): string;
function sum(x: any, y: any): string | number {
  return x + y;
}

const reverseString2 = (str: string): string =>
  str.split("").reduceRight(sum, "");

console.log(reverseString2("MONTEVIDEO"));

const myArray = [22, 9, 60, 12, 4, 56];

console.log(myArray.reduce(sum, 0)); // 163

/*
console.log(sum(false, []));
console.log(sum(23, "fk"));

produces

TSError: ⨯ Unable to compile TypeScript:
question_5.reverse by summing.ts:18:13 - error TS2769: No overload matches this call.
  Overload 1 of 2, '(x: number, y: number): number', gave the following error.
    Argument of type 'string' is not assignable to parameter of type 'number'.
  Overload 2 of 2, '(x: string, y: string): string', gave the following error.
    Argument of type 'number' is not assignable to parameter of type 'string'.

18 console.log(sum(23, "fk"));
               ~~~~~~~~~~~~~
*/

export {};
