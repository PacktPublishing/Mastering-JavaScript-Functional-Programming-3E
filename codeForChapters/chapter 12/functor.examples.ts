import { Functor } from "./functor";

const num1 = new Functor(22);
console.log(num1.toString());

const num2 = num1.map((x: number) => 10 * x + 9);
console.log(num2.toString());

export { Functor };
