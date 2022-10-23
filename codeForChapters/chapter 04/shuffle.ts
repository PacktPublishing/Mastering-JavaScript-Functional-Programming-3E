const shuffle = <T>(arr: T[]): T[] => {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    const r = Math.floor(Math.random() * (len - i));
    [arr[i], arr[i + r]] = [arr[i + r], arr[i]];
  }
  return arr;
};

/*
const xxx = [11, 22, 33, 44, 55, 66, 77, 88];
console.log(shuffle(xxx));
// [55, 77, 88, 44, 33, 11, 66, 22]
*/

export { shuffle };
