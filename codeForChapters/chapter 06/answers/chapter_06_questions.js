/*
  Question 6.5
*/

const setField = (attr, value, obj) => ({ ...obj, [attr]: value });

const myObj = { first: "Federico", last: "Kereki", country: "India" };
const myObj1 = setField("country", "Uruguay", myObj);
console.log(myObj1);

const setByPath = (arr, value, obj) => {
  if (!(arr[0] in obj)) {
    obj[arr[0]] =
      arr.length === 1 ? null : Number.isInteger(arr[1]) ? [] : {};
  }
  if (arr.length > 1) {
    return setByPath(arr.slice(1), value, obj[arr[0]]);
  } else {
    obj[arr[0]] = value;
    return obj;
  }
};

const setField2 = (attr, value, obj) => setByPath([attr], value, obj);

const myObj2 = setField2("country", "Uruguay", myObj);
console.log(myObj2);

/*
  Question 6.6
*/
const range = (start, stop) =>
  new Array(stop - start).fill(0).map((v, i) => start + i);

const arityL = (fn, n) => {
  const args1n = range(0, n)
    .map(i => `x${i}`)
    .join(",");
  return eval(`(${args1n}) => ${fn.name}(${args1n})`);
};
