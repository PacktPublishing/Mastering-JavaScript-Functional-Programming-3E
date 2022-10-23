type AccumRoundedType = [number, number];

const roundFix2a = (
  accum: number,
  n: number
): AccumRoundedType => {
  const nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
  accum += n - nRounded;
  return [accum, nRounded];
};

const roundFix2b = ([
  accum,
  n,
]: AccumRoundedType): AccumRoundedType => {
  const nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
  accum += n - nRounded;
  return [accum, nRounded];
};

export { roundFix2a, roundFix2b };
