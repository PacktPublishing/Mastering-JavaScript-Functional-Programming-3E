import { thisManyTimes } from "./question_2.3";

const squeak = (a: string) => console.log(a, "squeak!!");

const squeakTwice = thisManyTimes(squeak, 2);

squeakTwice("only twice"); // "only twice squeak!!"
squeakTwice("only twice"); // "only twice squeak!!"
squeakTwice("only twice"); // nothing
squeakTwice("only twice"); // nothing
squeakTwice("only twice"); // nothing

export { thisManyTimes };
