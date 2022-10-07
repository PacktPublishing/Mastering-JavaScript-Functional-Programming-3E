const data = [
  { name: "John", age: 23, other: "xxx" },
  { name: "Paul", age: 18, other: "yyy" },
  { name: "George", age: 16, other: "zzz" },
  { name: "Ringo", age: 25, other: "ttt" },
];

// Declarative

const isAdult = (person) => person.age >= 21;
const result2 = data.filter(isAdult);
console.log(result2);
