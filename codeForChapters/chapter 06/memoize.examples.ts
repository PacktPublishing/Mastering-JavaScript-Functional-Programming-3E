import { addTiming } from "./timing";
import {
  memoize,
  memoize2,
  memoize3,
  memoize4,
  promiseMemoize,
} from "./memoize";

function fib(n: number): number {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}

const testFib = (n: number) => fib(n);
addTiming(testFib)(45); // 15,382.255 ms
addTiming(testFib)(40); //  1,600.600 ms
addTiming(testFib)(35); //    146.900 ms

const testMemoFib = memoize((n: number) => fib(n));
addTiming(testMemoFib)(45); // 15,537.575 ms
addTiming(testMemoFib)(45); //          0.005 ms
addTiming(testMemoFib)(40); //  1,368.880 ms
addTiming(testMemoFib)(35); //    123.970 ms

// @ts-expect-error We want to reassign the function
fib = memoize(fib);
addTiming(testFib)(45); // 0.080 ms
addTiming(testFib)(45); // 0.080 ms
addTiming(testFib)(40); // 0.025 ms
addTiming(testFib)(35); // 0.009 ms
