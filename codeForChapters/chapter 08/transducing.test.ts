import {
  transduce,
  transduce2,
  filterTR,
  mapTR,
} from "./transducing";

const testOdd = (x: number): boolean => x % 2 === 1;
const testUnderFifty = (x: number): boolean => x < 50;
const duplicate = (x: number): number => x + x;
const addThree = (x: number): number => x + 3;

const testOddR = filterTR(testOdd);
const duplicateR = mapTR(duplicate);
const testUnderFiftyR = filterTR(testUnderFifty);
const addThreeR = mapTR(addThree);

const myArray: number[] = [22, 9, 60, 24, 11, 63];

describe("transducing", () => {
  it("works with several functions", () => {
    expect(
      transduce(myArray, [
        testOddR,
        duplicateR,
        testUnderFiftyR,
        addThreeR,
      ])
    ).toEqual([21, 25]);
  });

  it("works with just one function at all", () => {
    expect(transduce(myArray, [testOddR])).toEqual([
      9, 11, 63,
    ]);

    expect(transduce(myArray, [addThreeR])).toEqual([
      25, 12, 63, 27, 14, 66,
    ]);
  });

  it("works with just mapping", () => {
    expect(
      transduce(myArray, [addThreeR, duplicateR])
    ).toEqual([50, 24, 126, 54, 28, 132]);
  });

  it("works with just filtering", () => {
    expect(
      transduce(myArray, [testOddR, testUnderFiftyR])
    ).toEqual([9, 11]);
  });

  it("works with special reducer", () => {
    expect(
      transduce2(
        myArray,
        [testOddR, duplicateR, testUnderFiftyR, addThreeR],
        (acc, value) => acc + value,
        0
      )
    ).toBe(46);
  });
});

export {};
