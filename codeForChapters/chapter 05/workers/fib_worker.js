/* eslint-disable */

"use strict";
exports.__esModule = true;
var worker_threads_1 = require("worker_threads");
function fib(n) {
  return n < 2 ? n : fib(n - 2) + fib(n - 1);
}
worker_threads_1.parentPort.on("message", function (m) {
  return worker_threads_1.parentPort.postMessage(fib(m));
});
