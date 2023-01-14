const quicksort = <A>(arr: A[]): A[] => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const smaller = arr.filter((x) => x < pivot);
    const greaterEqual = arr.filter((x) => x >= pivot);
    return [
      ...quicksort(smaller),
      ...quicksort(greaterEqual),
    ];
  }
};

const partition = <A>(
  arr: A[],
  fn: (x: A) => boolean
): [A[], A[]] => [arr, arr];

const quicksort2 = <A>(arr: A[]): A[] => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[0];
    const [smaller, greaterEqual] = partition(
      arr.slice(1),
      (x) => x < pivot
    );
    return [
      ...quicksort2(smaller),
      pivot,
      ...quicksort2(greaterEqual),
    ];
  }
};

export {};
