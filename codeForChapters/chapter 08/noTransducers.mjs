const testOdd = (x) => x % 2 === 1;
const duplicate = (x) => x + x;
const testUnderFifty = (x) => x < 50;
const addThree = (x) => x + 3;

const myArray = [22, 9, 60, 24, 11, 63];

const newArray = myArray
  .filter(testOdd)
  .map(duplicate)
  .filter(testUnderFifty)
  .map(addThree);
console.log(newArray);

const simplifiedPass = (someArray) => {
  const result = [];
  someArray.forEach((value) => {
    if (value % 2 && value < 25) {
      result.push(value * 2 + 3);
    }
  });
  return result;
};
const newArray2 = simplifiedPass(myArray);
console.log(newArray2);

const singlePassFourOps = (someArray) => {
  const result = [];
  someArray.forEach((value) => {
    let ok = false;
    if (testOdd(value)) {
      value = duplicate(value);
      if (testUnderFifty(value)) {
        value = addThree(value);
        ok = true;
      }
    }
    if (ok) {
      result.push(value);
    }
  });
  return result;
};
const newArray3 = singlePassFourOps(myArray);
console.log(newArray3);

const singlePassManyOps = (someArray, fnList) => {
  const result = [];
  someArray.forEach((value) => {
    if (
      fnList.every(([type, fn]) => {
        if (type === "M") {
          value = fn(value);
          return true;
        } else {
          return fn(value);
        }
      })
    ) {
      result.push(value);
    }
  });
  return result;
};

const newArray4 = singlePassManyOps(myArray, [
  ["F", testOdd],
  ["M", duplicate],
  ["F", testUnderFifty],
  ["M", addThree],
]);
console.log(newArray4);

// es molesto tener que hacer arrays, y entonces...

const applyMap = (fn) => ["M", fn];
const applyFilter = (fn) => ["F", fn];
const newArray5 = singlePassManyOps(myArray, [
  applyFilter(testOdd),
  applyMap(duplicate),
  applyFilter(testUnderFifty),
  applyMap(addThree),
]);
console.log(newArray5);

// We want to be able to change the way the last step works
const singlePassMoreGeneral = (
  someArray,
  fnList,
  initialAccum = [],
  reduceAccumFn = (accum, value) => {
    accum.push(value);
    return accum;
  }
) => {
  let result = initialAccum;
  someArray.forEach((value) => {
    if (
      fnList.every(([type, fn]) => {
        if (type === "M") {
          value = fn(value);
          return true;
        } else {
          return fn(value);
        }
      })
    ) {
      result = reduceAccumFn(result, value);
    }
  });
  return result;
};

const newArray6 = singlePassMoreGeneral(myArray, [
  applyFilter(testOdd),
  applyMap(duplicate),
  applyFilter(testUnderFifty),
  applyMap(addThree),
]);
console.log(newArray6);

const newValue = singlePassMoreGeneral(
  myArray,
  [
    applyFilter(testOdd),
    applyMap(duplicate),
    applyFilter(testUnderFifty),
    applyMap(addThree),
  ],
  0,
  (x, y) => x + y
);
console.log(newValue);

export {};
