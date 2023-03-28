import type { OBJ } from "../common";

const myObj = { d: 22, m: 9 };
console.log(myObj);

// {d: 22, m: 9}

const myObjB = { d: 12, m: 4 };
// Uncaught TypeError: Assignment to constant variable.

myObjB.d = 12; // but this is fine!
myObjB.m = 4;
console.log(myObjB);
// {d: 12, m: 4}

const myObj2 = { d: 22, m: 9 };
console.log(myObj2);

// {d: 22, m: 9}

Object.freeze(myObj2);

// myObj2.d = 12; // will fail!
// myObj2.m = 4;  // will fail too!

console.log(myObj2);
// Object {d: 22, m: 9}

const myObj3 = {
  d: 22,
  m: 9,
  o: { c: "MVD", i: "UY", f: { a: 56 } },
};

Object.freeze(myObj3);
console.log(myObj3); // {d:22, m:9, o:{c:"MVD", i:"UY", f:{ a:56}}}

// myObj3.d = 8888; // will fail!
myObj3.o.f.a = 9999; // oops, does work!!
console.log(myObj3); // {d:22, m:9, o:{c:"MVD", i:"UY", f:{ a:9999 }}}

const deepFreeze = <O extends OBJ>(obj: O): O => {
  if (
    obj &&
    typeof obj === "object" &&
    !Object.isFrozen(obj)
  ) {
    Object.freeze(obj);
    Object.getOwnPropertyNames(obj).forEach((prop) =>
      deepFreeze(obj[prop])
    );
  }

  return obj;
};

export { deepFreeze };
