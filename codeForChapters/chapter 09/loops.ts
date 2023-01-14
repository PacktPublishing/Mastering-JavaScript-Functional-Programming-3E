type STATE = any;

/*
while (condition) {
    do something;
}
*/
function whileR(
  state: STATE,
  condition: (x: STATE) => boolean,
  doSomething: (y: STATE) => STATE
): STATE {
  if (condition(state)) {
    return whileR(
      doSomething(state),
      condition,
      doSomething
    );
  } else {
    return state;
  }
}

/*
do { something } while condition ;
*/

function doWhileR(
  state: STATE,
  condition: (x: STATE) => boolean,
  doSomething: (y: STATE) => STATE
): STATE {
  return whileR(doSomething(state), condition, doSomething);
}

// en una función, un return newState anticipado sería el equivalente de un continue
// para emular un break... solución: throw

/*
for (let index = start , index < stop , index++) {
    do something;
}
*/

function forLoopR(
  state: STATE,
  start: number,
  stop: number,
  doSomething: (x: STATE, y: number) => STATE
): STATE {
  function loopR(state: STATE, index: number): STATE {
    if (index >= stop) {
      return state;
    } else {
      return loopR(doSomething(state, index), index + 1);
    }
  }

  return loopR(state, start);
}
