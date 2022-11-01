const characters = [
  { name: "Fred", plays: "bowling" },
  { name: "Barney", plays: "chess" },
  { name: "Wilma", plays: "bridge" },
  { name: "Betty", plays: "checkers" },
  { name: "Pebbles", plays: "chess" },
];

const list = characters
  .filter(
    (x) => x.plays === "chess" || x.plays == "checkers"
  )
  .map((x) => `<li>${x.name}</li>`)
  .reduce((a, x) => [a[0] + x], [""])
  .map((x) => `<div><ul>${x}</ul></div>`)
  .reduce((a, x) => x);

console.log(list);
// <div><ul><li>Barney</li><li>Betty</li><li>Pebbles</li></ul></div>

const list2 = characters
  .filter(
    (x) => x.plays === "chess" || x.plays == "checkers"
  )
  .map(
    (x, i, t) =>
      `${i === 0 ? "<div><ul>" : ""}` +
      `<li>${x.name}</li>` +
      `${i == t.length - 1 ? "</ul></div>" : ""}`
  )
  .reduce((a, x) => a + x, "");

console.log(list2);

const list3 = characters
  .filter(
    (x) => x.plays === "chess" || x.plays == "checkers"
  )
  .map((x) => `<li>${x.name}</li>`)
  .reduce(
    (a, x, i, t) =>
      a + x + (i === t.length - 1 ? "</ul></div>" : ""),
    "<div><ul>"
  );

console.log(list3);
