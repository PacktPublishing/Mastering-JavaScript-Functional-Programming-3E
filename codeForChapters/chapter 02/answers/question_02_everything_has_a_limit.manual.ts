import { thisManyTimes } from "./question_02_everything_has_a_limit";

const squeak = (a: string) => console.log(a, "squeak!!");

const squeakTwice = thisManyTimes(squeak, 2);

squeakTwice("only twice"); // "only twice squeak!!"
squeakTwice("only twice"); // "only twice squeak!!"
squeakTwice("only twice"); // nothing
squeakTwice("only twice"); // nothing
squeakTwice("only twice"); // nothing

export { thisManyTimes };
