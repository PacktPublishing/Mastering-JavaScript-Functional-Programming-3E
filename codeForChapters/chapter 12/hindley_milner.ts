/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { curry } from "../chapter 07/curry";
import type { FN } from "../common";

// firstToUpper :: String → String
const firstToUpper = (s: string) =>
  s[0].toUpperCase() + s.substring(1).toLowerCase();

// Math.random :: () → Number

// sum3C :: Number → Number → Number → Number
const sum3C = curry(
  (a: number, b: number, c: number): number => a + b + c
);

// sum3 :: (Number, Number, Number) → Number
const sum3 = (a: number, b: number, c: number) => a + b + c;

// map :: [a] → (a → b) → [b]
const map = curry(<A, B>(arr: A[], fn: (x: A) => B) =>
  arr.map(fn)
);

// filter :: [a] → (a → Boolean) → [a]
const filter = curry(<A>(arr: A[], fn: (x: A) => B) =>
  arr.filter(fn)
);

// reduce :: [a] → (b → a → b) → b → b
const reduce = curry(
  <A, B>(arr: A[], fn: (a: B, v: A) => B, acc: B) =>
    arr.reduce(fn, acc)
);

// getWeekAndDay :: String → (Number × String)
const getWeekAndDay = (
  yyyy_mm_dd: string
): [number, string] => {
  let weekNumber: number;
  let dayOfWeekName: string;
  /* ... */
  return [weekNumber, dayOfWeekName];
};

// getPerson :: Number → { id:Number × name:String }
const getPerson = (
  personId: number
): { id: number; name: string } => {
  /* ... */
  return { id: personId, name: personName };
};

// getField :: String → attr → a | undefined
const getField =
  <A>(attr: string) =>
  (obj: { [key: string]: A }) =>
    obj[attr];

// unary :: ((b, ...) → a) → (b → a)

// Boolean.map :: Boolean ⇝ (Boolean → a) → Boolean
Boolean.prototype.map = function (
  this: boolean,
  fn: (x: boolean) => boolean
) {
  return !!fn(this);
};

// Number.map :: Number ⇝ (Number → a) → Number
Number.prototype.map = function (
  this: number,
  fn: (x: number) => number
) {
  return Number(fn(this));
};

// String.map :: String ⇝ (String → a) → String
String.prototype.map = function (
  this: string,
  fn: (x: string) => string
) {
  return String(fn(this));
};

// Function.map :: (a → b) ⇝ (b → c) → (a → c)
Function.prototype.map = function <A, B, C>(
  this: (x: A) => B,
  fn: (y: B) => C
): (x: A) => C {
  return (x: A) => fn(this(x));
};

const plus1 = (x) => x + 1;
const times10 = (y) => 10 * y;

console.log(plus1.map(by10)(3));
// 40: first add 1 to 3, then multiply by 10
