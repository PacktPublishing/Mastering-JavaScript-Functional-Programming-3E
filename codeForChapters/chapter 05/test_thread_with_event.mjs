import { Worker } from "worker_threads";

const worker = new Worker("./test_thread_to_call.mjs");

worker.postMessage(22);
worker.postMessage(9);
worker.postMessage(60);

worker.on("message", (msg) => {
  console.log("MESSAGE", msg);
  //  worker.terminate();
});
