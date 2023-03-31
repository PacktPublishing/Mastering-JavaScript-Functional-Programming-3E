import { pipeline } from "../pipeline";

const allTasks = {
  date: "2017-09-22",
  byPerson: [
    {
      responsible: "EG",
      tasks: [
        { id: 111, desc: "task 111", done: false },
        { id: 222, desc: "task 222", done: false },
      ],
    },
    {
      responsible: "FK",
      tasks: [
        { id: 555, desc: "task 555", done: false },
        { id: 777, desc: "task 777", done: true },
        { id: 999, desc: "task 999", done: false },
      ],
    },
    {
      responsible: "ST",
      tasks: [{ id: 444, desc: "task 444", done: true }],
    },
  ],
};

const getField =
  <D>(f: keyof D) =>
  (obj: D) =>
    obj[f]; // from Chapter 6

const filter =
  <A>(fn: (_x: A) => boolean) =>
  (arr: A[]) =>
    arr.filter(fn);

const map =
  <B, C>(fn: (_x: B) => C) =>
  (arr: B[]) =>
    arr.map(fn);

const reduce =
  <V, A>(fn: (_acc: A, _val: V) => A, init: A) =>
  (arr: V[]) =>
    arr.reduce(fn, init);

const pending = (
  listOfTasks: typeof allTasks,
  name: string
) =>
  // @ts-expect-error pipeline (TS!) gets confused
  pipeline(
    (x: typeof allTasks) => x.byPerson,
    filter(
      (t: (typeof allTasks.byPerson)[0]) =>
        t.responsible === name
    ),
    map((t: (typeof allTasks.byPerson)[0]) => t.tasks),
    // @ts-expect-error This is OK.
    reduce((y, x) => x, []),
    filter(
      (t: { id: number; desc: string; done: boolean }) =>
        t && !t.done
    ),
    map(getField("id"))
  )(allTasks || { byPerson: [] }); //

console.log(pending(allTasks, "FK"));
console.log(pending(allTasks, "ST"));
export {};
