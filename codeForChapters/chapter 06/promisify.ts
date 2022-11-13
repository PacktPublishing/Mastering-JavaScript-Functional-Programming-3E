// VARIADIC TYPES

const promisify =
  <E, T extends any[], D>(
    fn: (...args: [...T, (err: E, data: D) => void]) => void
  ) =>
  (...args: T): Promise<D> =>
    new Promise((resolve, reject) =>
      fn(...args, (err: E, data: D) =>
        err ? reject(err) : resolve(data)
      )
    );

import fs from "fs";
// or const fs = require("fs");

const cb = (err: any, data: any) =>
  err
    ? console.log("ERROR", err)
    : console.log("SUCCESS", data);
fs.readFile("./promisify.ts", cb); // success, list the data
fs.readFile("./doesnt_exist.txt", cb); // failure, show exception

const fspromise = promisify(fs.readFile.bind(fs));

const goodRead = (data: any) =>
  console.log("SUCCESSFUL PROMISE", data);

const badRead = (err: any) =>
  console.log("UNSUCCESSFUL PROMISE", err);

fspromise("./promisify.ts") // success
  .then(goodRead)
  .catch(badRead);

fspromise("./readmenot.txt") // failure
  .then(goodRead)
  .catch(badRead);

export { promisify };
