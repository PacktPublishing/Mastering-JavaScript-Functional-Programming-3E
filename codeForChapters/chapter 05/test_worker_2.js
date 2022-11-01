"use strict";
function fib(n) {
  return n < 2 ? n : fib(n - 2) + fib(n - 1);
}
function getNumber() {
  return Number(document.getElementById("num").value);
}
function showResult(result) {
  document.getElementById("res").innerText = String(result);
}
/* eslint-disable-next-line */
function locally() {
  showResult(fib(getNumber()));
}
var worker = new Worker(
  "http://localhost:8887/test_worker.js"
);
worker.onmessage = function (e) {
  return showResult(e.data);
};
/* eslint-disable-next-line */
function parallelly() {
  worker.postMessage(getNumber());
}
