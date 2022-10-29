import { range } from "./range";

const a = [[1, 2], [3, 4, [5, 6, 7]], 8, [[[9]]]];

/*
console.log(a.flat()); // or a.flat(1)
console.log(a.flat(2));
console.log(a.flat(Infinity));
*/
/*
[ 1, 2, 3, 4, [ 5, 6, 7 ], 8, [ [ 9 ] ] ]
[
  1, 2, 3,
  4, 5, 6,
  7, 8, [ 9 ]
]
[
  1, 2, 3, 4, 5,
  6, 7, 8, 9
]
*/

const distances = [
  [0, 20, 35, 40],
  [20, 0, 10, 50],
  [35, 10, 0, 30],
  [40, 50, 30, 0],
];

const maxDist1 = Math.max(...distances.flat()); // 50

const maxDist2 = distances
  .flat()
  .reduce((p, d) => Math.max(p, d), 0); // also 50

/*
console.log(maxDist1, maxDist2);
// 50 50
*/

///////////////

const apiAnswer = [
  {
    country: "AR",
    name: "Argentine",
    states: [
      {
        state: "1",
        name: "Buenos Aires",
        cities: [{ city: 3846864, name: "Lincoln" }],
      },
    ],
  },
  {
    country: "GB",
    name: "Great Britain",
    states: [
      {
        state: "ENG",
        name: "England",
        cities: [{ city: 2644487, name: "Lincoln" }],
      },
    ],
  },
  {
    country: "US",
    name: "United States of America",
    states: [
      {
        state: "CA",
        name: "California",
        cities: [{ city: 5072006, name: "Lincoln" }],
      },
      {
        state: "RI",
        name: "Rhode Island",
        cities: [{ city: 8531960, name: "Lincoln" }],
      },
      {
        state: "VA",
        name: "Virginia",
        cities: [{ city: 4769608, name: "Lincolnia" }],
      },
      {
        state: "MI",
        name: "Michigan",
        cities: [{ city: 4999311, name: "Lincoln Park" }],
      },
      {
        state: "NE",
        name: "Nebraska",
        cities: [{ city: 5072006, name: "Lincoln" }],
      },
      {
        state: "IL",
        name: "Illinois",
        cities: [
          { city: 4899911, name: "Lincoln Park" },
          { city: 4899966, name: "Lincoln Square" },
        ],
      },
    ],
  },
];

/*
console.log(
  apiAnswer
    .map((x) => x.states)
    .flat()
    .map((y) => y.cities)
    .flat()
);

console.log(
  apiAnswer
    .flatMap((x) => x.states)
    .flatMap((y) => y.cities)
);
*/

////////////////////

const names = [
  "Winston Spencer Churchill",
  "Plato",
  "Abraham Lincoln",
  "Socrates",
  "Charles Darwin",
];

const lastNames = names.flatMap((x) => {
  const s = x.split(" ");
  return s.length === 1 ? [] : s.splice(1);
});
/*
console.log(lastNames);
*/
// [ 'Spencer', 'Churchill', 'Lincoln', 'Darwin' ]

///////////////////

const gettysburg = [
  "Four score and seven years ago our fathers",
  "brought forth, on this continent, a new nation,",
  "conceived in liberty, and dedicated to the",
  "proposition that all men are created equal.",
  "Now we are engaged in a great civil war,",
  "testing whether that nation, or any nation",
  "so conceived and so dedicated, can long endure.",
  "We are met on a great battle field of that",
  "war. We have come to dedicate a portion of",
  "that field, as a final resting place for",
  "those who here gave their lives, that that",
  "nation might live. It is altogether",
  "fitting and proper that we should do this.",
  "But, in a larger sense, we cannot dedicate,",
  "we cannot consecrate, we cannot hallow,",
  "this ground.",
  "The brave men, living and dead, who",
  "struggled here, have consecrated it far",
  "above our poor power to add or detract.",
  "The world will little note nor long",
  "remember what we say here, but it can",
  "never forget what they did here.",
  "It is for us the living, rather, to be",
  "dedicated here to the unfinished work",
  "which they who fought here have thus far",
  "so nobly advanced.",
  "It is rather for us to be here dedicated",
  "to the great task remaining before us—",
  "that from these honored dead we take",
  "increased devotion to that cause for",
  "which they here gave the last full",
  "measure of devotion— that we here highly",
  "resolve that these dead shall not have",
  "died in vain— that this nation, under",
  "God, shall have a new birth of freedom-",
  "and that government of the people, by",
  "the people, for the people, shall not",
  "perish from the earth.",
];

console.log(gettysburg.map((x) => x.split(" ").length));

console.log(
  gettysburg.flatMap((s: string) => s.split(" ")).length
); // 270 ...not 272?

///////////////

const flatAll = (arr: any[]): any[] =>
  arr.reduce(
    (f: any[], v: any) =>
      f.concat(Array.isArray(v) ? flatAll(v) : v),
    []
  );

const flatOne1 = (arr: any[]): any[] => [].concat(...arr);

/*
console.log("FLAT1 a", a, flatOne1(a));
*/

const flatOne2 = (arr: any[]): any[] =>
  arr.reduce((f, v) => f.concat(v), [] as any[]);

const flatOne = flatOne2;

const flat1 = (arr: any[], n = 1): any[] => {
  if (n === Infinity) {
    return flatAll(arr);
  } else {
    let result = arr;
    range(0, n).forEach(() => {
      result = flatOne(result);
    });
    return result;
  }
};

const flat2 = (arr: any[], n = 1): any[] =>
  n === Infinity
    ? flatAll(arr)
    : n === 1
    ? flatOne(arr)
    : flat2(flatOne(arr), n - 1);

const flat = flat1 || flat2;

/*
console.log(flatAll(a));
console.log(flat(a));
console.log(flat(a, 1));
console.log(flat(a, 2));
console.log(flat(a, Infinity));
*/

if (!Array.prototype.flat) {
  Array.prototype.flat = function (this, n): any[] {
    if (n === undefined || n === 1) {
      return flatOne(this as any[]);
    } else if (n === Infinity) {
      return flatAll(this as any[]);
    } else {
      return flatOne(this as any[]).flat(n - 1);
    }
  };
}

export { apiAnswer, gettysburg };
export { flatAll, flatOne, flatOne1, flatOne2 };
