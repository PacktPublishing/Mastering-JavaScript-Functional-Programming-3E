import { once } from "./once";

const squeak = (a: string) => console.log(a, " squeak!!");

squeak("original"); // "original squeak!!"
squeak("original"); // "original squeak!!"
squeak("original"); // "original squeak!!"

const squeakOnce = once(squeak);

squeakOnce("only once"); // "only once squeak!!"
squeakOnce("only once"); // no output
squeakOnce("only once"); // no output
