import {
  transduce2,
  filterTR,
  mapTR,
} from "./transducing.ts";

const applyMap = (fn) => ["M", fn];
const applyFilter = (fn) => ["F", fn];

const singlePassMoreGeneral = (
  someArray,
  fnList,
  reduceAccumFn = (accum, value) => {
    accum.push(value);
    return accum;
  },
  initialAccum = []
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

const singlePassMoreGeneral2 = (
  someArray,
  fnList,
  reduceAccumFn = (accum, value) => {
    accum.push(value);
    return accum;
  },
  initialAccum = []
) => {
  let result = initialAccum;
  loop: for (let i = 0; i < someArray.length; i++) {
    let value = someArray[i];
    for (let j = 0; j < fnList.length; j++) {
      if (fnList[j][0] === "M") {
        value = fnList[j][1](value);
      } else if (!fnList[j][1](value)) {
        continue loop;
      }
    }
    result = reduceAccumFn(result, value);
  }
  return result;
};

const singlePassMoreGeneralWithLoopsAndVar = (
  someArray,
  fnList,
  reduceAccumFn = (accum, value) => {
    accum.push(value);
    return accum;
  },
  initialAccum = []
) => {
  let result = initialAccum;
  loop: for (let i = 0; i < someArray.length; i++) {
    let value = someArray[i];
    for (let j = 0; j < fnList.length; j++) {
      const fnListJ = fnList[j];
      if (fnListJ[0] === "M") {
        value = fnListJ[1](value);
      } else if (!fnListJ[1](value)) {
        continue loop;
      }
    }
    result = reduceAccumFn(result, value);
  }
  return result;
};

const applyMap2 = (fn) => (value) => ({
  v: fn(value),
  f: true,
});
const applyFilter2 = (fn) => (value) => ({
  v: value,
  f: fn(value),
});

const singlePassMoreGeneralWithObject = (
  someArray,
  fnList,
  reduceAccumFn = (accum, value) => {
    accum.push(value);
    return accum;
  },
  initialAccum = []
) => {
  let result = initialAccum;
  loop: for (let i = 0; i < someArray.length; i++) {
    let value = someArray[i];
    for (let j = 0; j < fnList.length; j++) {
      const obj = fnList[j](value);
      if (!obj.f) {
        continue loop;
      }
      value = obj.v;
    }
    result = reduceAccumFn(result, value);
  }
  return result;
};

const applyMap3 = (fn) => (value) => [fn(value), true];
const applyFilter3 = (fn) => (value) => [value, fn(value)];

const singlePassMoreGeneralWithArray = (
  someArray,
  fnList,
  reduceAccumFn = (accum, value) => {
    accum.push(value);
    return accum;
  },
  initialAccum = []
) => {
  let result = initialAccum;
  let value;
  let flag;
  loop: for (let i = 0; i < someArray.length; i++) {
    value = someArray[i];
    for (let j = 0; j < fnList.length; j++) {
      [value, flag] = fnList[j](value);
      if (!flag) continue loop;
    }
    result = reduceAccumFn(result, value);
  }
  return result;
};

const singlePassMoreGeneral5 = (
  someArray,
  fnList,
  reduceAccumFn = (accum, value) => {
    accum.push(value);
    return accum;
  },
  initialAccum = []
) => {
  let result = initialAccum;
  someArray.forEach((value) => {
    let flag = true;
    if (
      fnList.every((fn) => {
        [value, flag] = fn(value);
        return flag;
      })
    ) {
      result = reduceAccumFn(result, value);
    }
  });
  return result;
};

// TESTS! **********************************************************************************
const random_0_100 = () => Math.floor(Math.random() * 100);
let LIMIT_FOR_TEST = 0;

const testOdd = (x) => x % 2 === 1;
const testUnderLimit = (x) => x < LIMIT_FOR_TEST;
const duplicate = (x) => x + x;
const addThree = (x) => x + 3;

const report = (description, diff) =>
  console.log(
    description.padEnd(50, "."),
    new Intl.NumberFormat("en-US").format(diff),
    "nanoseconds"
  );

const TRIALS = 100;
const TEST_SIZE = 10_000_000;

let start = 0n;
let accum0 = 0n;
let accum1 = 0n;
let accum2 = 0n;
let accum2b = 0n;
let accum3 = 0n;
let accum4 = 0n;
let accum5 = 0n;

for (let i = 0; i < TRIALS; i++) {
  const myArray = [];
  for (let i = 0; i < TEST_SIZE; i++) {
    myArray[i] = random_0_100();
  }
  LIMIT_FOR_TEST = random_0_100() / 2;

  const testOddR = filterTR(testOdd);
  const duplicateR = mapTR(duplicate);
  const testUnderLimitR = filterTR(testUnderLimit);
  const addThreeR = mapTR(addThree);

  start = process.hrtime.bigint();
  const result0 = transduce2(
    myArray,
    [testOddR, duplicateR, testUnderLimitR, addThreeR],
    (acc, value) => acc + value,
    0
  );
  accum0 += process.hrtime.bigint() - start;

  start = process.hrtime.bigint();
  const result1 = singlePassMoreGeneral(
    myArray,
    [
      applyFilter(testOdd),
      applyMap(duplicate),
      applyFilter(testUnderLimit),
      applyMap(addThree),
    ],
    (x, y) => x + y,
    0
  );
  accum1 += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result0) === JSON.stringify(result1)
  );

  start = process.hrtime.bigint();
  const result2 = singlePassMoreGeneral2(
    myArray,
    [
      applyFilter(testOdd),
      applyMap(duplicate),
      applyFilter(testUnderLimit),
      applyMap(addThree),
    ],
    (x, y) => x + y,
    0
  );
  accum2 += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result0) === JSON.stringify(result2)
  );

  start = process.hrtime.bigint();
  const result2b = singlePassMoreGeneralWithLoopsAndVar(
    myArray,
    [
      applyFilter(testOdd),
      applyMap(duplicate),
      applyFilter(testUnderLimit),
      applyMap(addThree),
    ],
    (x, y) => x + y,
    0
  );
  accum2b += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result0) === JSON.stringify(result2b),
    "test2b"
  );

  start = process.hrtime.bigint();
  const result3 = singlePassMoreGeneralWithObject(
    myArray,
    [
      applyFilter2(testOdd),
      applyMap2(duplicate),
      applyFilter2(testUnderLimit),
      applyMap2(addThree),
    ],
    (x, y) => x + y,
    0
  );
  accum3 += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result0) === JSON.stringify(result3)
  );

  start = process.hrtime.bigint();
  const result4 = singlePassMoreGeneralWithArray(
    myArray,
    [
      applyFilter3(testOdd),
      applyMap3(duplicate),
      applyFilter3(testUnderLimit),
      applyMap3(addThree),
    ],
    (x, y) => x + y,
    0
  );
  accum4 += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result0) === JSON.stringify(result4)
  );

  start = process.hrtime.bigint();
  const result5 = singlePassMoreGeneral5(
    myArray,
    [
      applyFilter3(testOdd),
      applyMap3(duplicate),
      applyFilter3(testUnderLimit),
      applyMap3(addThree),
    ],
    (x, y) => x + y,
    0
  );
  accum5 += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result0) === JSON.stringify(result5)
  );
}

report("Transducer", accum0);
report("SinglePassMoreGeneral", accum1);
report("SinglePassMoreGeneral2", accum2);
report("singlePassMoreGeneralWithLoopsAndVar", accum2b);
report("singlePassMoreGeneralWithObject", accum3);
report("singlePassMoreGeneralWithArray", accum4);
report("SinglePassMoreGeneral5", accum5);
