const SIZE = 8;

const places = Array(SIZE);

const checkPlace = (column: number, row: number): boolean =>
  places
    .slice(0, column)
    .every(
      (v, i) =>
        v !== row && Math.abs(v - row) !== column - i
    );

const symmetricFinder = (column = 0): void => {
  if (column === SIZE) {
    console.log(JSON.stringify(places.map((x) => x + 1)));
  } else if (column <= SIZE / 2) {
    // first half of the board?
    const testRowsInColumn = (j: number): void => {
      if (j < SIZE) {
        if (checkPlace(column, j)) {
          places[column] = j;
          symmetricFinder(column + 1);
        }
        testRowsInColumn(j + 1);
      }
    };
    testRowsInColumn(0);
  } else {
    // second half of the board
    const symmetric = SIZE - 1 - places[SIZE - 1 - column];
    if (checkPlace(column, symmetric)) {
      places[column] = symmetric;
      symmetricFinder(column + 1);
    }
  }
};

symmetricFinder();

export {};
