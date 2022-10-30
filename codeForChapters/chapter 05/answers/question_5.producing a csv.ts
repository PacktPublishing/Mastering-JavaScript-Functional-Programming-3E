const myData = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

const concatNumbers = (a: string, b: number): string =>
  !a ? `${b}` : `${a},${b}`;

const concatLines = (c: string, d: string): string =>
  c + "\n" + d;

const makeCSV = (data: number[][]) =>
  data
    .map((x) => x.reduce(concatNumbers, ""))
    .reduce(concatLines, "");
console.log(makeCSV(myData));

const makeCSV2 = (data: number[][]) =>
  data
    .map((x: number[]) =>
      x.reduce(
        (a: string, b: number): string =>
          !a ? `${b}` : `${a},${b}`,
        ""
      )
    )
    .reduce((c: string, d: string) => c + "\n" + d, "");

console.log(makeCSV2(myData));

export {};
