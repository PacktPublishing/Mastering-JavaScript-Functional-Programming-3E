function somethingElse() {
  // get arguments and do something
}

function listArguments() {
  console.log(arguments);
  var myArray = Array.prototype.slice.call(arguments);
  console.log(myArray);
  somethingElse.apply(null, myArray);
}

listArguments(22, 9, 60);
// (3) [22, 9, 60, callee: function, Symbol(Symbol.iterator): function]
// (3) [22, 9, 60]

function listArguments2(...args) {
  console.log(args);
  somethingElse(...args);
}

listArguments2(12, 4, 56);
// (3) [12, 4, 56]
