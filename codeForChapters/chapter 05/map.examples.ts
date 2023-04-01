import { myMap } from "./map";

const myArray = [22, 9, 60, 12, 4, 56];

const dup = (x: number): number => 2 * x;
console.log(myMap(myArray, dup));
console.log(myArray.map(dup));
// [44, 18, 120, 24, 8, 112] both times

const addDashes = (x: number): string => `-${x}-`;
const myDashes = myArray.map(addDashes);
console.log(myDashes);
// [ '-22-', '-9-', '-60-', '-12-', '-4-', '-56-' ]

export { myMap };
