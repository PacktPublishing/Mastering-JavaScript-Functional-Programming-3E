const colors = [
  "violet",
  "indigo",
  "blue",
  "green",
  "yellow",
  "orange",
  "red",
];
colors.sort();
console.log(colors);
// ["blue", "green", "indigo", "orange", "red", "violet", "yellow"]

const someNumbers = [3, 20, 100];
someNumbers.sort();
console.log(someNumbers);
// [100, 20, 3]

const palabras = [
  "ñandú",
  "oasis",
  "mano",
  "natural",
  "mítico",
  "musical",
];
palabras.sort();
console.log(palabras);
// ["mano", "musical", "mítico", "natural", "oasis", "ñandú"] -- wrong result!

palabras.sort((a: string, b: string) =>
  a.localeCompare(b, "es")
);
console.log(palabras);
// ["mano", "mítico", "musical", "natural", "ñandú", "oasis"]

const spanishComparison = (a: string, b: string) =>
  a.localeCompare(b, "es");

palabras.sort(spanishComparison);
// sorts the palabras array according to Spanish rules:
// ["mano", "mítico", "musical", "natural", "ñandú", "oasis"]
