const SIZE = 8;
const places = Array(SIZE);
let solutions = 0;

const checkPlace = (column: number, row: number): boolean =>
  places
    .slice(0, column)
    .every(
      (v, i) =>
        v !== row && Math.abs(v - row) !== column - i
    );

const checkR = (column: number, row: number): boolean => {
  const checkColumn = (i: number): boolean => {
    if (i == column) {
      return true;
    } else if (
      places[i] == row ||
      Math.abs(places[i] - row) == column - i
    ) {
      return false;
    } else {
      return checkColumn(i + 1);
    }
  };
  return checkColumn(0);
};

const finder = (column = 0) => {
  if (column === SIZE) {
    // all columns tried out?
    // if so, print and count solution
    console.log(JSON.stringify(places.map((x) => x + 1)));
    solutions++;
  } else {
    const testRowsInColumn = (j: number) => {
      if (j < SIZE) {
        if (checkR(column, j)) {
          places[column] = j;
          finder(column + 1);
        }
        testRowsInColumn(j + 1);
      }
    };
    testRowsInColumn(0);
  }
};

finder();

console.log(`Solutions found: ${solutions}`);

export {};
