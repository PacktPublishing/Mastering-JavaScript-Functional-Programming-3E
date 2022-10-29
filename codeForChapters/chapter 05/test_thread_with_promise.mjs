import { Worker } from "worker_threads";

const callWorker = (filename) =>
  new Promise((resolve) =>
    new Worker(filename).on("message", resolve)
  );

const result = await callWorker(
  "./test_thread_to_call.mjs"
);

// AGREGAR LO DE TERMINATE

/*
.then((x) =>
  console.log("RESOLVE...", x)
);
*/
console.log("AWAITED", result);

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
