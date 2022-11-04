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

export {};
