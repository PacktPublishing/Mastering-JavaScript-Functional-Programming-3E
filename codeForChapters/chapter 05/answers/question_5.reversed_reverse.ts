const reversedReverse = (str: string): string =>
  str.split("").reduceRight((x, y) => y + x, "");

console.log(reversedReverse("URUGUAY"));

export {};
