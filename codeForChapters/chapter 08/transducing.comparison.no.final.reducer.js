// These were used for article

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

const singlePassMoreGeneralNoIf = (
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

const singlePassMoreGeneralWithLoops = (
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

// Next, not used in article

const singlePassMoreGeneralWithLoopsAndManyVars = (
  someArray,
  fnList,
  reduceAccumFn = (accum, value) => {
    accum.push(value);
    return accum;
  },
  initialAccum = []
) => {
  const someArrayLength = someArray.length;
  const fnListLength = fnList.length;
  let i;
  let j;
  let value;
  let fnListJ;
  let result = initialAccum;
  loop: for (i = 0; i < someArrayLength; i++) {
    value = someArray[i];
    for (j = 0; j < fnListLength; j++) {
      fnListJ = fnList[j];
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
let accum1st = 0n;
let accum2nd = 0n;
let accum3rd = 0n;
let accum4th = 0n;
let accum5th = 0n;
let accum6th = 0n;
let accum7th = 0n;
let accum8th = 0n;

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
  const result1st = transduce2(myArray, [
    testOddR,
    duplicateR,
    testUnderLimitR,
    addThreeR,
  ]);
  accum1st += process.hrtime.bigint() - start;

  start = process.hrtime.bigint();
  const result2nd = singlePassMoreGeneral(myArray, [
    applyFilter(testOdd),
    applyMap(duplicate),
    applyFilter(testUnderLimit),
    applyMap(addThree),
  ]);
  accum2nd += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result1st) === JSON.stringify(result2nd),
    "test2nd"
  );

  start = process.hrtime.bigint();
  const result3rd = singlePassMoreGeneralNoIf(myArray, [
    applyFilter3(testOdd),
    applyMap3(duplicate),
    applyFilter3(testUnderLimit),
    applyMap3(addThree),
  ]);
  accum3rd += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result1st) === JSON.stringify(result3rd),
    "test3rd"
  );

  start = process.hrtime.bigint();
  const result4th = singlePassMoreGeneralWithLoops(
    myArray,
    [
      applyFilter(testOdd),
      applyMap(duplicate),
      applyFilter(testUnderLimit),
      applyMap(addThree),
    ]
  );
  accum4th += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result1st) === JSON.stringify(result4th),
    "test4th"
  );

  start = process.hrtime.bigint();
  const result5th = singlePassMoreGeneralWithLoopsAndVar(
    myArray,
    [
      applyFilter(testOdd),
      applyMap(duplicate),
      applyFilter(testUnderLimit),
      applyMap(addThree),
    ]
  );
  accum5th += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result1st) === JSON.stringify(result5th),
    "test5th"
  );

  start = process.hrtime.bigint();
  const result6th =
    singlePassMoreGeneralWithLoopsAndManyVars(myArray, [
      applyFilter(testOdd),
      applyMap(duplicate),
      applyFilter(testUnderLimit),
      applyMap(addThree),
    ]);
  accum6th += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result1st) === JSON.stringify(result6th),
    "test6th"
  );

  start = process.hrtime.bigint();
  const result7th = singlePassMoreGeneralWithObject(
    myArray,
    [
      applyFilter2(testOdd),
      applyMap2(duplicate),
      applyFilter2(testUnderLimit),
      applyMap2(addThree),
    ]
  );
  accum7th += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result1st) === JSON.stringify(result7th),
    "test7h"
  );

  start = process.hrtime.bigint();
  const result8th = singlePassMoreGeneralWithArray(
    myArray,
    [
      applyFilter3(testOdd),
      applyMap3(duplicate),
      applyFilter3(testUnderLimit),
      applyMap3(addThree),
    ]
  );
  accum8th += process.hrtime.bigint() - start;

  console.assert(
    JSON.stringify(result1st) === JSON.stringify(result8th),
    "test87h"
  );
}

report("Transducer", accum1st);
report("SinglePassMoreGeneral", accum2nd);
report("singlePassMoreGeneralNoIf", accum3rd);
report("singlePassMoreGeneralWithLoops", accum4th);
report("singlePassMoreGeneralWithLoopsAndVar", accum5th);
report(
  "singlePassMoreGeneralWithLoopsAndManyVars",
  accum6th
);
report("singlePassMoreGeneralWithObject", accum7th);
report("singlePassMoreGeneralWithArray", accum8th);

/*
Transducer........................................ 38,336,754,378 nanoseconds
SinglePassMoreGeneral............................. 52,430,004,969 nanoseconds
singlePassMoreGeneralNoIf......................... 80,238,546,896 nanoseconds
singlePassMoreGeneralWithLoops.................... 30,913,136,731 nanoseconds
singlePassMoreGeneralWithLoopsAndVar.............. 30,875,391,205 nanoseconds
singlePassMoreGeneralWithLoopsAndManyVars......... 31,183,617,675 nanoseconds
singlePassMoreGeneralWithObject................... 46,655,675,016 nanoseconds
singlePassMoreGeneralWithArray.................... 61,778,021,371 nanoseconds

Transducer........................................ 39,466,426,993 nanoseconds
SinglePassMoreGeneral............................. 53,618,584,002 nanoseconds
singlePassMoreGeneralNoIf......................... 80,500,950,137 nanoseconds
singlePassMoreGeneralWithLoops.................... 31,314,047,663 nanoseconds
singlePassMoreGeneralWithLoopsAndVar.............. 31,380,353,547 nanoseconds
singlePassMoreGeneralWithLoopsAndManyVars......... 31,674,898,429 nanoseconds
singlePassMoreGeneralWithObject................... 47,100,655,594 nanoseconds
singlePassMoreGeneralWithArray.................... 59,210,313,641 nanoseconds

Transducer........................................ 37,813,139,545 nanoseconds
SinglePassMoreGeneral............................. 51,864,543,054 nanoseconds
singlePassMoreGeneralNoIf......................... 78,780,319,299 nanoseconds
singlePassMoreGeneralWithLoops.................... 30,940,463,729 nanoseconds
singlePassMoreGeneralWithLoopsAndVar.............. 30,942,679,361 nanoseconds
singlePassMoreGeneralWithLoopsAndManyVars......... 31,482,883,916 nanoseconds
singlePassMoreGeneralWithObject................... 46,180,744,842 nanoseconds
singlePassMoreGeneralWithArray.................... 58,153,758,650 nanoseconds

Transducer........................................ 44,723,739,494 nanoseconds
SinglePassMoreGeneral............................. 60,491,118,290 nanoseconds
singlePassMoreGeneralNoIf......................... 94,409,525,271 nanoseconds
singlePassMoreGeneralWithLoops.................... 35,523,239,872 nanoseconds
singlePassMoreGeneralWithLoopsAndVar.............. 36,120,298,530 nanoseconds
singlePassMoreGeneralWithLoopsAndManyVars......... 35,818,405,750 nanoseconds
singlePassMoreGeneralWithObject................... 54,463,784,910 nanoseconds
singlePassMoreGeneralWithArray.................... 69,443,532,529 nanoseconds

Transducer........................................ 38,568,825,688 nanoseconds
SinglePassMoreGeneral............................. 53,156,606,127 nanoseconds
singlePassMoreGeneralNoIf......................... 80,082,505,763 nanoseconds
singlePassMoreGeneralWithLoops.................... 31,431,578,252 nanoseconds
singlePassMoreGeneralWithLoopsAndVar.............. 31,285,050,370 nanoseconds
singlePassMoreGeneralWithLoopsAndManyVars......... 31,660,080,553 nanoseconds
singlePassMoreGeneralWithObject................... 46,674,897,638 nanoseconds
singlePassMoreGeneralWithArray.................... 60,820,829,880 nanoseconds
*/
