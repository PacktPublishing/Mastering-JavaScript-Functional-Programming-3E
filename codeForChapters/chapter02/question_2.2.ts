const alternator = <FNType extends (...args: any[]) => any>(
  fn1: FNType,
  fn2: FNType
) =>
  ((...args: Parameters<FNType>) => {
    fn1(...args);
    [fn1, fn2] = [fn2, fn1];
  }) as FNType;

const sayA = () => console.log("A");
const sayB = () => console.log("B");

const alt = alternator(sayA, sayB);

alt(); // A
alt(); // B
alt(); // A
alt(); // B
alt(); // A
alt(); // B

export { alternator };
