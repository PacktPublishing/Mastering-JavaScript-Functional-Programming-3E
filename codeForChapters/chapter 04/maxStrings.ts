const maxStrings = (a: string[]) => a.sort().pop();

let countries = [
  "Argentina",
  "Uruguay",
  "Brasil",
  "Paraguay",
];

console.log(maxStrings(countries)); // "Uruguay"
console.log(countries); // ["Argentina", "Brasil", "Paraguay"]

const maxStrings2 = (a: string[]) => [...a].sort().pop();

countries = ["Argentina", "Uruguay", "Brasil", "Paraguay"];

console.log(maxStrings2(countries)); // "Uruguay"
console.log(countries); // ["Argentina", "Uruguay", "Brasil", "Paraguay"]
