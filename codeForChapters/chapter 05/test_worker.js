function fib(n) {
  return n < 2 ? n : fib(n - 2) + fib(n - 1);
}
onmessage = function (e) {
  return postMessage(fib(e.data));
};
