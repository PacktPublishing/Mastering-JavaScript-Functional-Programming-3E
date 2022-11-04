import { Worker } from "worker_threads";

const callWorker = (filename: string, value: unknown) =>
  new Promise((resolve) => {
    const worker = new Worker(filename);
    worker.on("message", resolve);
    worker.postMessage(value);
  });

console.log("START");
const result = await callWorker("./fib_worker.js", 40);
console.log("AWAITED", result);
console.log("END");
