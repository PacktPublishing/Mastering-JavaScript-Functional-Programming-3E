import {
  compose,
  compose1,
  compose2,
  compose3,
} from "./compose";

import { demethodize1 } from "../chapter 06/demethodize";

const removeNonAlpha = (str: string): string =>
  str.replace(/[^a-z]/gi, " ");

const toUpperCase = demethodize1(
  String.prototype.toUpperCase
) as (_x: string) => string;

const splitInWords = (str: string): string[] =>
  str.trim().split(/\s+/);

const arrayToSet = (arr: string[]): Set<string> =>
  new Set(arr);

const setToList = (set: Set<string>): string[] =>
  Array.from(set).sort();

const GETTYSBURG_1_2 = `Four score and seven years
ago our fathers brought forth, on this continent,
a new nation, conceived in liberty, and dedicated
to the proposition that all men are created equal.
Now we are engaged in a great civil war, testing
whether that nation, or any nation so conceived
and so dedicated, can long endure.`;

console.log(
  compose(
    setToList,
    arrayToSet,
    splitInWords,
    toUpperCase,
    removeNonAlpha
  )(GETTYSBURG_1_2)
);

console.log(
  compose1(
    setToList,
    arrayToSet,
    splitInWords,
    toUpperCase,
    removeNonAlpha
  )(GETTYSBURG_1_2)
);

console.log(
  compose2(
    setToList,
    arrayToSet,
    splitInWords,
    toUpperCase,
    removeNonAlpha
  )(GETTYSBURG_1_2)
);

console.log(
  compose3(
    setToList,
    arrayToSet,
    splitInWords,
    toUpperCase,
    removeNonAlpha
  )(GETTYSBURG_1_2)
);
