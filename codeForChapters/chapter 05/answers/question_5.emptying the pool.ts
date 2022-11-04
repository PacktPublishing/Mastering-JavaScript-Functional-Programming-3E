import { Worker } from "worker_threads";

type PoolEntry = {
  worker: Worker;
  filename: string;
  value: any;
  inUse: boolean;
};

const pool: PoolEntry[] = [];

const notInUse = (p: PoolEntry): boolean => !p.inUse;

const MAX_NOT_IN_USE = 10;

export const workerCall = (
  filename: string,
  value: any
): Promise<any> => {
  let available = pool
    .filter(notInUse)
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

      while (
        pool.filter(notInUse).length > MAX_NOT_IN_USE
      ) {
        const notUsed = pool.findIndex(notInUse);
        pool[notUsed].worker.terminate();
        pool.splice(notUsed, 1);
      }
    });
    available!.worker.postMessage(value);
  });
};
