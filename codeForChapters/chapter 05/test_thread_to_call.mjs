import { parentPort } from "worker_threads";

function fib(n) {
  return n < 2 ? n : fib(n - 2) + fib(n - 1);
}

parentPort.on("message", (m) =>
  parentPort.postMessage(fib(m))
);
