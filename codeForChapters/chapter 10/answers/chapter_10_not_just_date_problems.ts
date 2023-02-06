import { jsonCopy } from "../deepCopy";

const agent = {
  error: new Error("It's stirred; I ordered it shaken"),
  map: new Map([["James", "Bond"]]),
  set: new Set([0, 0, 7]),
  regex: /007/,
  useLicense() {
    console.log("Bang! Bang!");
  },
};

console.log(jsonCopy(agent));
/*
{ error: {}, map: {}, set: {}, regex: {} }
*/

export {};
