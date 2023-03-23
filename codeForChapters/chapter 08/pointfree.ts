import {
  getDir,
  filterOdt,
  pipeTwo,
  count,
} from "./pipeline";

const countOdtFiles3b = pipeTwo(
  pipeTwo(getDir, filterOdt),
  count
);

const countOdtFiles4b = pipeTwo(
  getDir,
  pipeTwo(filterOdt, count)
);

console.log(
  countOdtFiles3b("/home/fkereki/Documents"),
  countOdtFiles4b("/home/fkereki/Documents")
);

export {};
