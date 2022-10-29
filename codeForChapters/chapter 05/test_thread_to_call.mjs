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

parentPort.on("message", (x) =>
  parentPort.postMessage("Hello world!" + x + x + x)
);
