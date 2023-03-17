const myMap = <T, R>(arr: T[], fn: (x: T) => R): R[] =>
  arr.reduce(
    (x: R[], y: T): R[] => x.concat(fn(y)),
    [] as R[]
  );

describe("myMap", () => {
  const myArray = [22, 9, 60, 12, 4, 56];

  it("duplicates values", () => {
    const dup = (x: number): number => 2 * x;
    expect(myArray.map(dup)).toEqual(myMap(myArray, dup));
  });

  it("add dashes", () => {
    const addDashes = (x: number): string => `-${x}-`;
    expect(myArray.map(addDashes)).toEqual(
      myMap(myArray, addDashes)
    );
  });
});
