import {
  transduce,
  transduce2,
  filterTR,
  mapTR,
} from "./transducing";

const addToArray = (a: any[], v: any): any[] => {
  a.push(v);
  return a;
};

const testOdd = (x: number): boolean => x % 2 === 1;
const testUnderFifty = (x: number): boolean => x < 50;
const duplicate = (x: number): number => x + x;
const addThree = (x: number): number => x + 3;

const myArray: number[] = [22, 9, 60, 24, 11, 63];

const a0 = myArray
  .filter(testOdd)
  .map(duplicate)
  .filter(testUnderFifty)
  .map(addThree);
console.log(a0);
// [ 21, 25 ]

const testOddR = filterTR(testOdd);
const duplicateR = mapTR(duplicate);
const testUnderFiftyR = filterTR(testUnderFifty);
const addThreeR = mapTR(addThree);

console.log(
  myArray.reduce(
    testOddR(
      duplicateR(testUnderFiftyR(addThreeR(addToArray)))
    ),
    []
  )
);
// [ 21, 25 ]

console.log(
  transduce(myArray, [
    testOddR,
    duplicateR,
    testUnderFiftyR,
    addThreeR,
  ])
);
// [ 21, 25 ]

console.log(
  transduce2(myArray, [
    testOddR,
    duplicateR,
    testUnderFiftyR,
    addThreeR,
  ])
);
// [ 21, 25 ]

console.log(
  transduce2(
    myArray,
    [testOddR, duplicateR, testUnderFiftyR, addThreeR],
    (acc, value) => acc + value,
    0
  )
);
// 46
