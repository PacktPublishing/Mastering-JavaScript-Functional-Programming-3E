function fib(n: number): number {
  return n < 2 ? n : fib(n - 2) + fib(n - 1);
}

function getNumber() {
  return Number(
    (document.getElementById("num") as HTMLInputElement)
      .value
  );
}

function showResult(result: number) {
  document.getElementById("res")!.innerText =
    String(result);
}

/* eslint-disable-next-line */
function locally() {
  showResult(fib(getNumber()));
}

export {};
