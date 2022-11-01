import { Worker } from "worker_threads";

const worker = new Worker("./test_thread_to_call.mjs");

console.log("START");
worker.postMessage(40);
console.log("END");

worker.on("message", (msg) => {
  console.log("MESSAGE", msg);
  worker.terminate();
});
