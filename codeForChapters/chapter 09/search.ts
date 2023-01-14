const search = <A>(arr: A[], key: A): boolean => {
  if (arr.length === 0) {
    return false;
  } else if (arr[0] === key) {
    return true;
  } else {
    return search(arr.slice(1), key);
  }
};

const search2 = <A>(arr: A[], key: A): boolean =>
  arr.length === 0
    ? false
    : arr[0] === key || search2(arr.slice(1), key);

const search3 = <A>(arr: A[], key: A): boolean =>
  !!arr.length &&
  (arr[0] === key || search3(arr.slice(1), key));

const myArray = [22, 9, 60, 12, 4, 56];

console.log(search(myArray, 22));
console.log(search(myArray, 23));
console.log(search(myArray, 60));

console.log(search2(myArray, 22));
console.log(search2(myArray, 23));
console.log(search2(myArray, 60));

console.log(search3(myArray, 22));
console.log(search3(myArray, 23));
console.log(search3(myArray, 60));

export {};
