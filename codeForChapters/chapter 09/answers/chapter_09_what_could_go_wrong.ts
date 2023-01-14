// This code has a bug!

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

export { quicksort };
