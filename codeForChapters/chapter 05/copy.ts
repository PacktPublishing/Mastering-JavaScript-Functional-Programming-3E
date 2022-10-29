const objCopy = <T>(obj: T): T => {
  const copy = Object.create(Object.getPrototypeOf(obj));
  Object.getOwnPropertyNames(obj).forEach((prop: string) =>
    Object.defineProperty(
      copy,
      prop,
      Object.getOwnPropertyDescriptor(obj, prop) as string
    )
  );
  return copy;
};
const myObj = { fk: 22, st: 12, desc: "couple" };
const myCopy = objCopy(myObj);
console.log(myObj, myCopy); // {fk: 22, st: 12, desc: "couple"}, twice

export {};
