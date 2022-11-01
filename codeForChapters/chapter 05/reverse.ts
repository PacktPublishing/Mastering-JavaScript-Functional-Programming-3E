const reverseString = (str: string): string => {
  const arr = str.split("");
  arr.reverse();
  return arr.join("");
};
console.log(reverseString("MONTEVIDEO")); // OEDIVETNOM

const reverseString2 = (str: string): string =>
  str.split("").reduceRight((x, y) => x + y, "");
console.log(reverseString2("OEDIVETNOM")); // MONTEVIDEO
