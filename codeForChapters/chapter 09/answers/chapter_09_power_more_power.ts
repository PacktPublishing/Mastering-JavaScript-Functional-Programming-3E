function evaluate(str: string) {
  const PLUS = "+";
  const MINUS = "-";
  const TIMES = "*";
  const DIVIDES = "/";
  const MODULUS = "%";
  const LPARENS = "(";
  const RPARENS = ")";
  const POWER = "^";

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
    let accum = power();

    while (
      tokens[curr] === TIMES ||
      tokens[curr] === DIVIDES ||
      tokens[curr] === MODULUS
    ) {
      if (tokens[curr] === TIMES) {
        curr++;
        accum *= power();
      } else if (tokens[curr] === DIVIDES) {
        curr++;
        accum /= power();
      } else if (tokens[curr] === MODULUS) {
        curr++;
        accum %= power();
      }
    }

    return accum;
  }

  function power(): number {
    const tower = [factor()];
    while (tokens[curr] === POWER) {
      curr++;
      tower.push(factor());
    }

    while (tower.length > 1) {
      tower[tower.length - 2] **= tower[tower.length - 1];
      tower.pop();
    }
    return tower[0];
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

console.log(evaluate("2+2^3^(1+2)*5-2"));

export {};
