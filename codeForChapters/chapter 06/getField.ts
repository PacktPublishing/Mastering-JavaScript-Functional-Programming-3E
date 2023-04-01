/*
const getField = f => obj => obj[f];
*/

const getField =
  <D>(f: keyof D) =>
  (obj: D) =>
    obj[f];

export { getField };
