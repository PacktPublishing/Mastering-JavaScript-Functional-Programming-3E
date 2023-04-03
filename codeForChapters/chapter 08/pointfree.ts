import { pipeTwo } from "./pipeline";
import {
  getDir,
  filterOdt,
  count,
} from "./pipeline.examples";

const countOdtFiles3b = pipeTwo(
  pipeTwo(getDir, filterOdt),
  count
);

const countOdtFiles4b = pipeTwo(
  getDir,
  pipeTwo(filterOdt, count)
);

/*
  Note: the following code will fail if you
  don't have a /home/fkereki/Documents directory.
  Substitute another directory from your own machine.
*/

console.log(
  countOdtFiles3b("/home/fkereki/Documents"),
  countOdtFiles4b("/home/fkereki/Documents")
);

export {};
