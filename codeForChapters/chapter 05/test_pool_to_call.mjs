import { parentPort } from "worker_threads";
/*
parentPort.on("message", (x) =>
  setTimeout(
    () =>
      parentPort.postMessage("Hello world!" + x + x + x),
    2000
  )
);
*/

parentPort.on("message", (x) =>
  parentPort.postMessage("Hello world!" + x + x + x)
);
