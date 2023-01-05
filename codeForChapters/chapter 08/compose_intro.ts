// @ts-expect-error No typing for now...
const compose = (...fns) =>
  fns.reduceRight(
    (f, g) =>
      // @ts-expect-error No typing for now...
      (...args) =>
        g(f(...args))
  );
/*
const not =
  <T extends (...args: any[]) => boolean>(fn: T) =>
  (...args: Parameters<T>): boolean =>
    !fn(...args);

const positiveBalance = not(isNegativeBalance);

const logicalNot = unaryOp("!");

const positiveBalance = compose(
  logicalNot,
  isNegativeBalance
);

const changeSign = unaryOp("-");

palabras.sort(compose(changeSign, spanishComparison));

const countOdtFiles2 = (path: string): number =>
  count(filterOdt(getDir(path)));

const countOdtFiles2b = (path: string): number =>
  compose(count, filterOdt, getDir)(path);

countOdtFiles2b("/home/fkereki/Documents");
// 4, no change here

compose(
  count,
  filterOdt,
  getDir
)("/home/fkereki/Documents");
*/

const demethodize =
  <T extends (arg0: any, ...args: any[]) => any>(fn: T) =>
  (arg0: any, ...args: Parameters<T>): ReturnType<T> =>
    fn.bind(arg0, ...args)();

const removeNonAlpha = (str: string): string =>
  str.replace(/[^a-z]/gi, " ");

const toUpperCase = demethodize(
  String.prototype.toUpperCase
);

const splitInWords = (str: string): string[] =>
  str.trim().split(/\s+/);

const arrayToSet = (arr: string[]): Set<string> =>
  new Set(arr);

const setToList = (set: Set<string>): string[] =>
  Array.from(set).sort();

const getUniqueWords = compose(
  setToList,
  arrayToSet,
  splitInWords,
  toUpperCase,
  removeNonAlpha
);

const GETTYSBURG_1_2 = `Four score and seven years
ago our fathers brought forth, on this continent,
a new nation, conceived in liberty, and dedicated
to the proposition that all men are created equal.
Now we are engaged in a great civil war, testing
whether that nation, or any nation so conceived
and so dedicated, can long endure.`;

console.log(getUniqueWords(GETTYSBURG_1_2));

const getUniqueWords1 = (str: string): string[] => {
  const str1 = removeNonAlpha(str);
  const str2 = toUpperCase(str1);
  const arr1 = splitInWords(str2);
  const set1 = arrayToSet(arr1);
  const arr2 = setToList(set1);
  return arr2;
};
console.log(getUniqueWords1(GETTYSBURG_1_2).length);

const getUniqueWords2 = (str: string): string[] =>
  setToList(
    arrayToSet(
      splitInWords(toUpperCase(removeNonAlpha(str)))
    )
  );
console.log(getUniqueWords2(GETTYSBURG_1_2).length);

export {};
