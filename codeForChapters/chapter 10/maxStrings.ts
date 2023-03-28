const maxStrings = (a: string[]): string | undefined =>
  a.sort().pop();

const countries = [
  "Argentina",
  "Uruguay",
  "Brasil",
  "Paraguay",
];

console.log(maxStrings(countries)); // "Uruguay"
console.log(countries); // ["Argentina", "Brasil", "Paraguay"]

const maxStrings2 = (a: string[]): string =>
  [...a].sort().pop() as string;

const maxStrings3 = (a: string[]): string =>
  a.slice().sort().pop() as string;

console.log(maxStrings2(countries)); // "Uruguay"
console.log(maxStrings3(countries)); // "Uruguay"

console.log(countries);
// ["Argentina", "Uruguay", "Brasil", "Paraguay"] - unchanged

export {};
