import { Worker } from "worker_threads";

type PoolEntry = {
  worker: Worker;
  filename: string;
  value: any;
  inUse: boolean;
};

const pool: PoolEntry[] = [];

const notInUse = (p: PoolEntry): boolean => !p.inUse;

const queue: ((_v?: any) => void)[] = [];
let running = 0;
const MAX_TO_USE = 5;

const enqueue = (resolve2: (_v?: any) => void) => {
  if (running < MAX_TO_USE) {
    running++;
    resolve2();
  } else {
    queue.push(resolve2);
  }
};

const dequeue = () => {
  const resolve2 = queue.shift();
  resolve2 && resolve2();
};

export const workerCall = (
  filename: string,
  value: any
): Promise<any> => {
  return new Promise((resolve) => {
    new Promise((resolve2) => enqueue(resolve2)).then(
      () => {
        let available = pool
          .filter(notInUse)
          .find((x) => x.filename === filename);

        if (available === undefined) {
          available = {
            worker: new Worker(filename),
            filename,
            value,
            inUse: true,
          } as PoolEntry;

          pool.push(available);
        }

        available!.inUse = true;
        available!.worker.on("message", (x) => {
          resolve(x);
          available!.inUse = false;
          dequeue();
        });
        available!.worker.postMessage(value);
      }
    );
  });
};

/*
const FIB_WORKER = "../workers/fib_worker.js";
const RANDOM_WORKER = "../workers/random_worker.js";

const showResult = (s: string) => (x: any) =>
  console.log(s, x);

workerCall(FIB_WORKER, 35).then(showResult("fib(35)"));
workerCall(RANDOM_WORKER, 3000).then(showResult("random"));
workerCall(FIB_WORKER, 20).then(showResult("fib(20)"));
workerCall(FIB_WORKER, 44).then(showResult("fib(44)"));
workerCall(FIB_WORKER, 10).then((x) => {
  console.log("fib(10)", x);
  workerCall(FIB_WORKER, 11).then((y) =>
    console.log("fib(11)", y)
  );
});
workerCall(RANDOM_WORKER, 2000).then(showResult("random"));
workerCall(RANDOM_WORKER, 1000).then(showResult("random"));

/*
CREATING ./fib_worker.js 35
CREATING ./random_worker.js 3000
CREATING ./fib_worker.js 20
CREATING ./fib_worker.js 44
CREATING ./fib_worker.js 10
CREATING ./random_worker.js 2000
CREATING ./random_worker.js 1000
fib(10) 55
REUSING ./test_fib_worker.js 10
fib(11) 89
fib(20) 6765
fib(35) 9227465
random 602
random 135
random 17
fib(44) 701408733
*/
