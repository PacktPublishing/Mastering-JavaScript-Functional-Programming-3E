import { deepCopy } from "../deepCopy";

const agent = {
  error: new Error("It's stirred; I ordered it shaken"),
  map: new Map([["James", "Bond"]]),
  set: new Set([0, 0, 7]),
  regex: /007/,
  useLicense() {
    console.log("Bang! Bang!");
  },
};

console.log(deepCopy(agent));

/*
{
  error: Error: It's stirred; I ordered it shaken
    ...many lines snipped out
  map: Map(0) {},
  set: Set(0) {},
  regex: /(?:)/,
  useLicense: [Function: useLicense]
}
*/

export {};
