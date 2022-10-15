const myCounter = (function myCounter(initialValue = 0) {
  let count = initialValue;
  return function () {
    count++;
    return count;
  };
})(77);

console.log(myCounter()); // 78
console.log(myCounter()); // 79
console.log(myCounter()); // 80
