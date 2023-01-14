function evaluate(str: string) {
  const PLUS = "+";
  const MINUS = "-";
  const TIMES = "*";
  const DIVIDES = "/";
  const MODULUS = "%";
  const LPARENS = "(";
  const RPARENS = ")";

  let curr = 0;
  const tokens = str
    .split("")
    .map((x) => (Number.isNaN(Number(x)) ? x : Number(x)));

  return expression();

  function expression(): number {
    let accum = term();

    while (
      tokens[curr] === PLUS ||
      tokens[curr] === MINUS
    ) {
      if (tokens[curr] === PLUS) {
        curr++;
        accum += term();
      } else if (tokens[curr] === MINUS) {
        curr++;
        accum -= term();
      }
    }

    return accum;
  }

  function term(): number {
    let accum = factor();

    while (
      tokens[curr] === TIMES ||
      tokens[curr] === DIVIDES ||
      tokens[curr] === MODULUS
    ) {
      if (tokens[curr] === TIMES) {
        curr++;
        accum *= factor();
      } else if (tokens[curr] === DIVIDES) {
        curr++;
        accum /= factor();
      } else if (tokens[curr] === MODULUS) {
        curr++;
        accum %= factor();
      }
    }

    return accum;
  }

  function factor(): number {
    let mult = 1;
    if (tokens[curr] === MINUS) {
      mult = -1;
      curr++; // skip MINUS
    }
    let result = 0;

    if (tokens[curr] === LPARENS) {
      curr++; // skip LPARENS
      result = expression();
      curr++; // skip RPARENS
    } else {
      result = tokens[curr] as number;
      curr++;
    }

    return mult * result;
  }
}

console.log(evaluate("2+3*5"));
console.log(evaluate("2*3+5"));
console.log(evaluate("2+(5+3)*4"));

console.log(evaluate("7+7/7+7*7-7"));

export {};
