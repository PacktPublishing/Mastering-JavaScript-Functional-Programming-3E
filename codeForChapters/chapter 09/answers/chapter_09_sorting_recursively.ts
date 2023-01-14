const selectionSort = (arr: number[]): number[] => {
  if (arr.length === 0) {
    return [];
  } else {
    const max = Math.max(...arr);
    const rest = [...arr];
    rest.splice(arr.indexOf(max), 1);
    return [...selectionSort(rest), max];
  }
};

console.log(selectionSort([2, 2, 0, 9, 1, 9, 6, 0]));
// [0, 0, 1, 2, 2, 6, 9, 9]

export { selectionSort };
