import { pipeline } from "../pipeline";

const split = (str: string) => (text: string) =>
  text.split(str);

const map =
  (fn: (x: string) => string) => (arr: string[]) =>
    arr.map(fn);

const firstToUpper = (word: string): string =>
  word[0].toUpperCase() + word.substring(1).toLowerCase();

const join = (str: string) => (arr: string[]) =>
  arr.join(str);

const headline = pipeline(
  split(" "),
  map(firstToUpper),
  join(" ")
);

console.log(headline("Alice's ADVENTURES in WoNdErLaNd"));
// Alice's Adventures In Wonderland

export {};
