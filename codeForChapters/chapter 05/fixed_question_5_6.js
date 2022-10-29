const myData = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
];

const concatNumbers = (a, b) => (a === "" ? b : a + "," + b);
const concatLines = (c, d) => c + "\n" + d;

const makeCSV = (t) =>
  t.map((x) => x.reduce(concatNumbers)).reduce(concatLines);

console.log(makeCSV(myData));

const makeCSV2 = (t) =>
  t
    .map((x) => x.reduce((a, b) => (a === "" ? b : a + "," + b)))
    .reduce((c, d) => c + "\n" + d);

console.log(makeCSV2(myData));
