import type { OBJ } from "../common";

const setIn = <O extends OBJ>(
  arr: (string | number)[],
  value: any,
  obj: O
): O => {
  const newObj = Number.isInteger(arr[0]) ? [] : {};

  Object.keys(obj).forEach((k) => {
    (newObj as any)[k] = k !== arr[0] ? obj[k] : null;
  });

  (newObj as any)[arr[0]] =
    arr.length > 1
      ? setIn(arr.slice(1), value, obj[arr[0]])
      : value;

  return newObj as O;
};

const myObj1 = {
  a: 111,
  b: 222,
  c: 333,
  d: {
    e: 444,
    f: 555,
    g: {
      h: 666,
      i: 777,
    },
    j: [{ k: 100 }, { k: 200 }, { k: 300 }],
  },
};

const myObj2 = setIn(["d", "f"], 88888, myObj1);
console.log(myObj2);
/*
{
  a: 111,
  b: 222,
  c: 333,
  d: {
    e: 444,
    f: 88888,
    g: { h: 666, i: 777 },
    j: [{ k: 100 }, { k: 200 }, { k: 300 }],
  }
}
*/
console.log(myObj1.d === myObj2.d); // false
console.log(myObj1.d.f === myObj2.d.f); // false
console.log(myObj1.d.g === myObj2.d.g); // true

const myObj3 = setIn(["d", "j", 1, "k"], 99999, myObj2);
console.log(myObj3);
/*
{
  a: 111,
  b: 222,
  c: 333,
  d: {
    e: 444,
    f: 88888,
    g: { h: 666, i: 777 },
    j: [{ k: 100 }, { k: 99999 }, { k: 300 }],
  }
}

*/
console.log(myObj1.d.j === myObj3.d.j); // false
console.log(myObj1.d.j[0] === myObj3.d.j[0]); // true
console.log(myObj1.d.j[1] === myObj3.d.j[1]); // false
console.log(myObj1.d.j[2] === myObj3.d.j[2]); // true

const deleteIn = <O extends OBJ>(
  arr: (string | number)[],
  obj: O
): O => {
  const newObj = Number.isInteger(arr[0]) ? [] : {};

  Object.keys(obj).forEach((k) => {
    if (k !== arr[0]) {
      (newObj as any)[k] = obj[k];
    }
  });

  if (arr.length > 1) {
    (newObj as any)[arr[0]] = deleteIn(
      arr.slice(1),
      obj[arr[0]]
    );
  }

  return newObj as O;
};

const myObj4 = deleteIn(["d", "g"], myObj3);
const myObj5 = deleteIn(["d", "j"], myObj4);

console.log(myObj5);
// { a: 111, b: 222, c: 333, d: { e: 444, f: 88888 } }

export {};
