import { curry } from "../chapter 07/curry.fn";
import fs from "fs";
import type { FN } from "../common";

function getDir(path: string) {
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
// console.log(c);

const countOdtFiles2 = (path: string): number =>
  count(filterOdt(getDir(path)));

const c2 = countOdtFiles2("/home/fkereki/Documents");
// 4, again
// console.log(c2);

const pipeTwo =
  <F extends FN, G extends FN>(f: F, g: G) =>
  (...args: Parameters<F>): ReturnType<G> =>
    g(f(...args));

const countOdtFiles3 = (path: string): number =>
  pipeTwo(pipeTwo(getDir, filterOdt), count)(path);
const c3 = countOdtFiles3("/home/fkereki/Documents");
// 4, again
// console.log(c3);

const countOdtFiles4 = (path: string): number =>
  pipeTwo(getDir, pipeTwo(filterOdt, count))(path);
const c4 = countOdtFiles4("/home/fkereki/Documents");
// 4, again
// console.log(c4);

type FnsMatchPipe<FNS extends FN[]> =
  1 extends FNS["length"]
    ? boolean
    : FNS extends [
        infer FN1st extends FN,
        infer FN2nd extends FN,
        ...infer FNRest extends FN[]
      ]
    ? Parameters<FN2nd> extends [ReturnType<FN1st>]
      ? FnsMatchPipe<[FN2nd, ...FNRest]>
      : never
    : never;

type Pipeline<FNS extends FN[]> =
  boolean extends FnsMatchPipe<FNS>
    ? 1 extends FNS["length"]
      ? FNS[0]
      : FNS extends [
          infer FNFIRST extends FN,
          ...FN[],
          infer FNLAST extends FN
        ]
      ? (...args: Parameters<FNFIRST>) => ReturnType<FNLAST>
      : never
    : never;

function pipeline<FNS extends FN[]>(
  ...fns: FNS
): Pipeline<FNS>;
function pipeline<FNS extends FN[]>(...fns: FNS): FN {
  return (...args: Parameters<FNS[0]>) => {
    let result = fns[0](...args);
    for (let i = 1; i < fns.length; i++) {
      result = fns[i](result);
    }
    return result;
  };
}

const countOdtFiles5 = (path: string): number =>
  pipeline(getDir, pipeTwo(filterOdt, count))(path);
const c5 = countOdtFiles5("/home/fkereki/Documents");
// console.log(c5);

function pipeline2<FNS extends FN[]>(
  ...fns: FNS
): Pipeline<FNS>;
function pipeline2<FNS extends FN[]>(...fns: FNS): FN {
  return fns.reduce(
    (result, f) =>
      (...args) =>
        f(result(...args))
  );
}
const countOdtFiles6 = (path: string): number =>
  pipeline2(getDir, pipeTwo(filterOdt, count))(path);
const c6 = countOdtFiles6("/home/fkereki/Documents");
// console.log(c6);

function pipeline3<FNS extends FN[]>(
  ...fns: FNS
): Pipeline<FNS>;
function pipeline3<FNS extends FN[]>(
  ...fns: FNS
): (...fns: FNS) => FN {
  return fns.reduce(pipeTwo);
}

const countOdtFiles7 = (path: string): number =>
  pipeline3(getDir, pipeTwo(filterOdt, count))(path);
const c7 = countOdtFiles7("/home/fkereki/Documents");
// console.log(c7);

export { getDir, filterOdt, count };

export { pipeline, pipeline2, pipeline3, pipeTwo };
export type { Pipeline, FN };
