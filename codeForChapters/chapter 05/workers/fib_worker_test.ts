import { Worker } from "worker_threads";

const worker = new Worker("./fib_worker.js");

console.log("START");
worker.postMessage(40);
console.log("END");

worker.on("message", (msg) => {
  console.log("MESSAGE", msg);
  worker.terminate();
});
