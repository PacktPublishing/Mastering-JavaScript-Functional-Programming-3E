import { Worker } from "worker_threads";

const callWorker = (filename, value) =>
  new Promise((resolve) => {
    const worker = new Worker(filename);
    worker.on("message", resolve);
    worker.postMessage(value);
    worker.terminate();
  });

console.log("START");
const result = await callWorker(
  "./test_thread_to_call.mjs",
  40
);
console.log("AWAITED", result);
console.log("END");
