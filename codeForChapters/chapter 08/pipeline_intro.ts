// import { curry } from "../chapter 07/curry";
import { getField } from "../chapter 06/getField";

function flip2<A, B, R>(fn: (a: A, b: B) => R) {
  return (p1: B, p2: A) => fn(p2, p1);
}

type Curry<P, R> = P extends []
  ? R
  : P extends [infer H]
  ? (arg: H) => R // only 1 arg
  : P extends [infer H, ...infer T] // 2 or more args
  ? (arg: H) => Curry<[...T], R>
  : never;

function curry<A extends any[], R>(
  fn: (...args: A) => R
): Curry<A, R>;
function curry(fn: (...args: any) => any) {
  return fn.length === 0
    ? fn()
    : (x: any) => curry(fn.bind(null, x));
}

const demethodize =
  <T extends (arg0: any, ...args: any[]) => any>(fn: T) =>
  (arg0: any, ...args: Parameters<T>): ReturnType<T> =>
    fn.bind(arg0, ...args)();

const markers = [
  { name: "AR", lat: -34.6, lon: -58.4 },
  { name: "BO", lat: -16.5, lon: -68.1 },
  { name: "BR", lat: -15.8, lon: -47.9 },
  { name: "CL", lat: -33.4, lon: -70.7 },
  { name: "CO", lat: 4.6, lon: -74.0 },
  { name: "EC", lat: -0.3, lon: -78.6 },
  { name: "PE", lat: -12.0, lon: -77.0 },
  { name: "PY", lat: -25.2, lon: -57.5 },
  { name: "UY", lat: -34.9, lon: -56.2 },
  { name: "VE", lat: 10.5, lon: -66.9 },
];

const sum = (x: number, y: number): number => x + y;

const average = (arr: number[]) =>
  arr.reduce(sum, 0) / arr.length;

const myMap = curry(
  flip2(demethodize(Array.prototype.map))
);

const getAllLats = myMap(getField("lat")) as (
  arg: any
) => number[];

const pipeTwo =
  <AF extends any[], RF, RG>(
    f: (...args: AF[]) => RF,
    g: (arg: RF) => RG
  ) =>
  (...args: any[]) =>
    g(f(...args));

const averageLat = pipeTwo(getAllLats, average)(markers);
console.log("RESULT1", averageLat);

const averageLat2 = pipeTwo(
  curry(flip2(demethodize(Array.prototype.map)))(
    getField("lat")
  ) as (arg: any) => number[],
  average
)(markers);
console.log("RESULT2", averageLat2);

export {};
