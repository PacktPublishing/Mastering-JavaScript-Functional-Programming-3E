import { Worker } from "worker_threads";

const createWorker = (filename) => {
  const worker = new Worker(filename);
  return {
    call: (value) => {
      worker.postMessage(value);
      return new Promise((resolve) =>
        worker.on("message", resolve)
      );
    },

    kill: () => worker.terminate(),
  };
};

let pool = createWorker("./test_pool_to_call.mjs");

const result1 = await pool.call(22);
console.log("AWAITED 1", result1);

const result2 = await pool.call(9);
console.log("AWAITED 2", result2);

pool.kill();
