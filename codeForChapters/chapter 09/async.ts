// @ts-nocheck
import type { FN } from "../common";

/* eslint-disable */

// Alternatives to setTimeout(0)... window.setImmediate() --deprecated--
// Node only: process.nextTick()

Function.prototype.async = async;
function async() {
  /*
    Understanding bind:
        null means the global context will be passed as "this" to the function
        this is the function itself, the one that will be called
        0 is the timeout value

    Understanding apply:
        null means the global context will be passed as "this"
        arguments is the array of arguments of the function

    So setTimeout() will be called with the current function and its arguments,
    using the global context
  */
  setTimeout.bind(null, this, 0).apply(null, arguments);
}

function factC(n: number, cont: FN): number {
  if (n === 0) {
    return cont(1);
  } else {
    // return factC(n - 1, (x) => cont(n * x));
    return factC.async(n - 1, (x) => cont(n * x));
  }
}

/*
factC(7, console.log); // 5040, correctly
console.log(factC(7, (x: number) => x));
*/

// Without async() or setTimeout() or nextTick(), the following crashes after printing 89000

function justLoop(n: number): void {
  n % 500 === 0 && console.log(n);
  // n && justLoop(n - 1); // until n is zero
  // n && setTimeout(() => justLoop(n - 1), 0); // This can also be done with async; see next. It's slow!
  // n && justLoop.async(n - 1); // until n is zero... works for large n but is slower and async!
  // n && process.nextTick(() => justLoop(n - 1)); // works for large n, but fast!!
}
justLoop(1000);
justLoop(100_000);

export {};
