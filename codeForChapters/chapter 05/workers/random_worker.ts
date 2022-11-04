import { parentPort } from "worker_threads";

async function random(n: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, n));
  return Math.floor(n * Math.random());
}

parentPort!.on("message", async (m) =>
  parentPort!.postMessage(await random(m))
);
