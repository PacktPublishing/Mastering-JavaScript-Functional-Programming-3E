import { FN, Pipeline } from "../pipeline.fn";

type Reverse<FNS extends FN[]> = 1 extends FNS["length"]
  ? [FNS[0]]
  : FNS extends [
      infer FN1st extends FN,
      ...infer FNRest extends FN[]
    ]
  ? [...Reverse<FNRest>, FN1st]
  : never;

type Compose<FNS extends FN[]> = Pipeline<Reverse<FNS>>;

function compose1<FNS extends FN[]>(
  ...fns: FNS
): Compose<FNS> {
  return pipeline(...fns.reverse()) as Compose<FNS>;
}

const tn = (t: string): number => Number(t);
const x2 = (x: number): number => x * 2;
const ts = (y: number): string => `${y}`;
const ds = (z: string): boolean => z > "5";

const fff = compose1(ds, ts, x2, tn);

export {};
