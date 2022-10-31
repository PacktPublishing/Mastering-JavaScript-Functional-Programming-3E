import { parentPort } from "worker_threads";

/*
// Send a message to the main thread.
setTimeout(
  () =>
    parentPort && parentPort.postMessage("Hello world!"),
  2000
);
*/
/* por qué no se muere este? */
/* porque tiene on(...)? */

let x = 100;

parentPort.on("message", (m) =>
  parentPort.postMessage(`Hello world! ${x++} ${m}`)
);
