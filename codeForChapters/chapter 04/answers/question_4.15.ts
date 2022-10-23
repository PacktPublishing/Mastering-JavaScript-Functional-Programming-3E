const sortingShuffle = <T>(arr: T[]): T[] =>
  arr
    .map((v) => ({ val: v, key: Math.random() }))
    .sort((a, b) => a.key - b.key)
    .map((o) => o.val);

export { sortingShuffle };
