function ready() {
  console.log("ready");
}
function set() {
  console.log("set");
}
function go() {
  console.log("go");
}
ready();
set();
go();

function set() {
  console.log("UNEXPECTED...");
}
// "ready"
// "UNEXPECTED"
// "go"

(function () {
  function ready() {
    console.log("ready");
  }
  function set() {
    console.log("set");
  }
  function go() {
    console.log("go");
  }
  ready();
  set();
  go();
})();

function set() {
  console.log("UNEXPECTED...");
}
// "ready"
// "set"
// "go"

const myCounter = (function () {
  let count = 0;
  return function () {
    count++;
    return count;
  };
})();
