const oldObject = {
  d: 22,
  m: 9,
  o: { c: "MVD", i: "UY", f: { a: 56 } },
};

const newObject = {
  d: oldObject.d,
  m: oldObject.m,
  o: {
    c: oldObject.o.c,
    i: oldObject.o.i,
    f: { a: oldObject.o.f.a },
  },
};

const myObj = { d: 22, m: 9 };
const newObj1 = Object.assign({}, myObj);
const newObj2 = { ...myObj };

const myArray = [1, 2, 3, 4];
const newArray1 = myArray.slice();
const newArray2 = [...myArray];

const newObject2 = Object.assign({}, oldObject);

newObject2.d = 8888;
newObject2.o.f.a = 9999;

console.log(newObject2);
// {d:8888, m:9, o: {c:"MVD", i:"UY", f: {a:9999}}} -- ok

console.log(oldObject);
// {d:22, m:9, o: {c:"MVD", i:"UY", f: {a:9999}}} -- oops!!

const jsonCopy = <A extends { [key: string]: any }>(
  obj: A
): A => JSON.parse(JSON.stringify(obj));

const myDate = new Date();
const newDate = jsonCopy(myDate);
console.log(typeof myDate, typeof newDate); // object string

const deepCopy = <A extends { [key: string]: any }>(
  obj: A
): A => {
  let aux: A = obj;
  if (obj && typeof obj === "object") {
    aux = new (obj as any).constructor(); // TS hack!

    Object.getOwnPropertyNames(obj).forEach((prop) => {
      aux[prop as keyof A] = deepCopy(obj[prop]);
    });
  }

  return aux;
};

export { deepCopy };
