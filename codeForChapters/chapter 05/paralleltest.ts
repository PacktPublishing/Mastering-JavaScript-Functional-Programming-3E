import Parallel from "./parallel";

console.log(Parallel);

const p = new Parallel(22960);

p.spawn((num: number) => {
  return num * 1000;
}).then(console.log);
