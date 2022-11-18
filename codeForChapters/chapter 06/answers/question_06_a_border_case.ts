// continued...

const getField =
  <D>(f: keyof D) =>
  (obj: D) =>
    obj[f];

console.log(getField("someField")(null)); // rejected!
