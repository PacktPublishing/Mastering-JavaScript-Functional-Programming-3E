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
