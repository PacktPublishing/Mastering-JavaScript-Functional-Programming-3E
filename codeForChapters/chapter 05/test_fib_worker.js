function fib(n) {
  return n < 2 ? n : fib(n - 2) + fib(n - 1);
}

onmessage = (e) => postMessage(fib(e.data));