const objCopy = (obj) => {
  let copy = Object.create(Object.getPrototypeOf(obj));
  Object.getOwnPropertyNames(obj).forEach((prop) =>
    Object.defineProperty(
      copy,
      prop,
      Object.getOwnPropertyDescriptor(obj, prop)
    )
  );
  return copy;
};
const myObj = { fk: 22, st: 12, desc: "couple" };
const myCopy = objCopy(myObj);
console.log(myObj, myCopy); // {fk: 22, st: 12, desc: "couple"}, twice

const factorial4 = (n) => {
  let result = 1;
  range(1, n + 1).forEach((v) => (result *= v));
  return result;
};
console.log(factorial4(5)); // 120

const serviceResult = {
  accountsData: [
    {
      id: "F220960K",
      balance: 1024,
    },
    {
      id: "S120456T",
      balance: 2260,
    },
    {
      id: "J140793A",
      balance: -38,
    },
    {
      id: "M120396V",
      balance: -114,
    },
    {
      id: "A120289L",
      balance: 55000,
    },
  ],
};
const delinquent = serviceResult.accountsData.filter(
  (v) => v.balance < 0
);
console.log(delinquent); // two objects, with id's J140793A and M120396V

const delinquentIds = delinquent.map((v) => v.id);
console.log(delinquentIds);

const delinquentIds2 = serviceResult.accountsData
  .filter((v) => v.balance < 0)
  .map((v) => v.id);
console.log(delinquentIds2);

const myFilter = (arr, fn) =>
  arr.reduce((x, y) => (fn(y) ? x.concat(y) : x), []);

console.log(
  myFilter(serviceResult.accountsData, (v) => v.balance < 0)
);
// two objects, with id's J140793A and M120396V

let brazilData = markers.find((v) => v.name === "BR");
// {name:"BR", lat:-15.8, lon:-47.9}
console.log(brazilData);

let brazilIndex = markers.findIndex((v) => v.name === "BR"); // 2
console.log(brazilIndex);
let mexicoIndex = markers.findIndex((v) => v.name === "MX"); // -1
console.log(mexicoIndex);

console.log(markers.every((v) => v.lat < 0 && v.lon < 0)); // false
console.log(markers.some((v) => v.lat < 0 && v.lon < 0)); // true

const none = (arr, fn) => arr.every((v) => !fn(v));
Array.prototype.none = function (fn) {
  return this.every((v) => !fn(v));
};
