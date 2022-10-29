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

/*
https://blog.logrocket.com/a-complete-guide-to-threads-in-node-js-4fa3898fe74f/

I would also like to point out why we used
the callback approach as opposed to returning
a promise that would be resolved when the
message event is fired. This is because
workers can dispatch many message events,
not just one.


PENDIENTE: Crear un objeto thread que esté pendiente
Que se pueda hacer worker.call(value).then(...)

worker.call(...) genera una promesa que se resolverá
cuando venga el mensaje

*/
