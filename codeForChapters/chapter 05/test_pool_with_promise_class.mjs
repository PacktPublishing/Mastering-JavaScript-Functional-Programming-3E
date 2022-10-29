import { Worker } from "worker_threads";

class WorkerThread {
  constructor(filename) {
    this.worker = new Worker(filename);
  }

  call(value) {
    this.worker.postMessage(value);
    return new Promise((resolve) =>
      this.worker.on("message", resolve)
    );
  }

  kill() {
    this.worker.terminate();
  }
}

let pool = new WorkerThread("./test_pool_to_call.mjs");

const result1 = await pool.call(22);
console.log("AWAITED 1", result1);

const result2 = await pool.call(9);
console.log("AWAITED 2", result2);

pool.kill();

/*
https://blog.logrocket.com/a-complete-guide-to-threads-in-node-js-4fa3898fe74f/

I would also like to point out why we used
the callback approach as opposed to returning
a promise that would be resolved when the
message event is fired. This is because
workers can dispatch many message events,
not just one.
*/
