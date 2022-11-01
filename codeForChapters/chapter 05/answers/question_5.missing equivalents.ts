import { mapAsync, useResult } from "../async4";
import { fakeFilter } from "../async5";

const someAsync = <T>(
  arr: T[],
  fn: (x: T) => Promise<boolean>
) =>
  mapAsync(arr, fn).then((mapped) => mapped.some(Boolean));

(async () => {
  console.log("SOME 1");
  const someEven = await someAsync(
    [1, 2, 3, 4],
    fakeFilter
  );
  useResult(someEven);

  console.log("SOME 2");
  const someEven2 = await someAsync(
    [1, 3, 5, 7, 9],
    fakeFilter
  );
  useResult(someEven2);

  console.log("END");
})();
/*
SOME 1
2022-10-29T14:38:00.193Z true
SOME 2
2022-10-29T14:38:01.198Z false
END
*/
