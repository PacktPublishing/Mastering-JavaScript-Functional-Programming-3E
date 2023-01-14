const LCS = (strA: string, strB: string): number => {
  // memoization "by hand"
  const cache: { [k: string]: number } = {};

  const innerLCS = (strA: string, strB: string): number => {
    const key = strA + "/" + strB;
    let ret: number;

    if (!(key in cache)) {
      if (strA.length === 0 || strB.length === 0) {
        ret = 0;
      } else if (strA[0] === strB[0]) {
        ret = 1 + innerLCS(strA.substr(1), strB.substr(1));
      } else {
        ret = Math.max(
          innerLCS(strA, strB.substr(1)),
          innerLCS(strA.substr(1), strB)
        );
      }

      cache[key] = ret;
    }

    return cache[key];
  };

  return innerLCS(strA, strB);
};

console.log(LCS("INTERNATIONAL", "CONTRACTOR")); // 6, as in the text

export {};
