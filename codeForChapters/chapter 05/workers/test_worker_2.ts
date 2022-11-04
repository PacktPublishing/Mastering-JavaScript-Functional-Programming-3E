function fib(n: number): number {
  return n < 2 ? n : fib(n - 2) + fib(n - 1);
}

function getNumber(): number {
  return Number(
    (document.getElementById("num") as HTMLInputElement)
      .value
  );
}

function showResult(result: number): void {
  document.getElementById("res")!.innerText =
    String(result);
}

/* eslint-disable-next-line */
function locally(): void {
  showResult(fib(getNumber()));
}

const worker = new Worker(
  "http://localhost:8887/test_fib_worker.js"
);

worker.onmessage = (e: MessageEvent<number>) =>
  showResult(e.data);

/* eslint-disable-next-line */
function parallelly(): void {
  worker.postMessage(getNumber());
}

export {};
