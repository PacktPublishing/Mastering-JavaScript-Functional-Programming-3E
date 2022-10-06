const data = [
  { name: "John", age: 23, other: "xxx" },
  { name: "Paul", age: 18, other: "yyy" },
  { name: "George", age: 16, other: "zzz" },
  { name: "Ringo", age: 25, other: "ttt" },
];

// Imperative

const result1 = [];
for (let i = 0; i < data.length; i++) {
  if (data[i].age >= 21) {
    result1.push(data[i]);
  }
}
console.log(result1);

// Declarative

const isAdult = (person) => person.age >= 21;
const result2 = data.filter(isAdult);
console.log(result2);
