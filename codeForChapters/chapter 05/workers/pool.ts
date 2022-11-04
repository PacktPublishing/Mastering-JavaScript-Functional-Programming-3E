import { Worker } from "worker_threads";

type PoolEntry = {
  worker: Worker;
  filename: string;
  value: any;
  inUse: boolean;
};

const pool: PoolEntry[] = [];

export const workerCall = (
  filename: string,
  value: any
): Promise<any> => {
  let available = pool
    .filter((v) => !v.inUse)
    .find((x) => x.filename === filename);

  if (available === undefined) {
    // console.log("CREATING", filename, value);

    available = {
      worker: new Worker(filename),
      filename,
      value,
      inUse: true,
    } as PoolEntry;

    pool.push(available);
  } else {
    // console.log("REUSING", filename, available.value);
  }

  return new Promise((resolve) => {
    available!.inUse = true;
    available!.worker.on("message", (x) => {
      resolve(x);
      available!.inUse = false;
      // console.log("RESOLVING", filename, value, x);
    });
    available!.worker.postMessage(value);
  });
};
