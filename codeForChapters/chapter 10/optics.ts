type FN = (...args: any[]) => any;

const getField =
  <D extends { [key: string]: any }>(f: keyof D) =>
  (obj: D) =>
    obj[f];

const author = {
  user: "fkereki",
  name: {
    first: "Federico",
    middle: "",
    last: "Kereki",
  },
  books: [
    { name: "Google Web Toolkit", year: 2010 },
    { name: "Functional Programming", year: 2017 },
    { name: "Javascript Cookbook", year: 2018 },
  ],
};

const lens = (getter: FN, setter: FN) => ({
  getter,
  setter,
});

const lensProp = (attr: string) =>
  lens(getField(attr), setField(attr));

const lens1 = lens(getField("user"), setField("user"));

export {};

const newAuthor = over(lens1, (x) => x + x + x, author);
console.log(newAuthor);
/*
user: "fkerekifkerekifkereki",
name: {first: "Federico", middle: "", last: "Kereki"}, books: [
{name: "GWT", year: 2010},
{name: "FP", year: 2017},
{name: "CB", year: 2018},

],
}
*/
