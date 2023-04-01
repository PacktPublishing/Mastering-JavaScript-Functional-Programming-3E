import {
  pipeline,
  pipeline2,
  pipeline3,
  pipeTwo,
} from "./pipeline";

import { curry } from "../chapter 07/curry";
import fs from "fs";

function getDir(path: string): string[] {
  const files = fs.readdirSync(path);
  return files;
}

const filterByText = (
  text: string,
  arr: string[]
): string[] => arr.filter((v) => v.endsWith(text));

/*
const filterOdt = (arr: string[]): string[] =>
  filterByText(".odt", arr);
*/

const filterOdt = curry(filterByText)(".odt");

const count = <T>(arr: T[]): number => arr.length;

const countOdtFiles = (path: string): number => {
  const files = getDir(path);
  const filteredFiles = filterOdt(files);
  const countOfFiles = count(filteredFiles);
  return countOfFiles;
};

/*
  Note: the following code will fail if you
  don't have a /home/fkereki/Documents directory.
  Substitute another directory from your own machine.
*/

const c = countOdtFiles("/home/fkereki/Documents");
// 4, as with the command line solution
console.log(c);

const countOdtFiles2 = (path: string): number =>
  count(filterOdt(getDir(path)));

const c2 = countOdtFiles2("/home/fkereki/Documents");
// 4, again
console.log(c2);

const countOdtFiles3 = (path: string): number =>
  pipeTwo(pipeTwo(getDir, filterOdt), count)(path);
const c3 = countOdtFiles3("/home/fkereki/Documents");
// 4, again
console.log(c3);

const countOdtFiles4 = (path: string): number =>
  pipeTwo(getDir, pipeTwo(filterOdt, count))(path);
const c4 = countOdtFiles4("/home/fkereki/Documents");
// 4, again
console.log(c4);

const countOdtFiles5 = (path: string): number =>
  pipeline(getDir, pipeTwo(filterOdt, count))(path);
const c5 = countOdtFiles5("/home/fkereki/Documents");
console.log(c5);

const countOdtFiles6 = (path: string): number =>
  pipeline2(getDir, pipeTwo(filterOdt, count))(path);
const c6 = countOdtFiles6("/home/fkereki/Documents");
console.log(c6);

const countOdtFiles7 = (path: string): number =>
  pipeline3(getDir, pipeTwo(filterOdt, count))(path);
const c7 = countOdtFiles7("/home/fkereki/Documents");
console.log(c7);
