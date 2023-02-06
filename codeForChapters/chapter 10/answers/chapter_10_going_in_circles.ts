import type { OBJ } from "../../common";

const deepCopy2 = <O extends OBJ>(obj: O): O => {
  const mapped = new Map<O, O>();

  const deepCopy = (obj: O): O => {
    let aux: O = obj;
    if (obj && typeof obj === "object") {
      if (mapped.has(obj)) {
        return mapped.get(obj) as O;
      }

      aux = new (obj as any).constructor(); // TS hack!
      mapped.set(obj, aux);

      Object.getOwnPropertyNames(obj).forEach((prop) => {
        (aux as any)[prop as keyof O] = deepCopy(obj[prop]);
      });
    }

    return aux;
  };

  return deepCopy(obj);
};

const circular = {
  a: 1,
  b: { c: 3, d: { e: 5, f: null } },
};
circular.b.d.f = circular.b as any;

console.log(deepCopy2(circular)); // RangeError: Maximum call stack size exceeded

/*
{ a: 1, b: <ref *1> { c: 3, d: { e: 5, f: [Circular *1] } } }
*/

export { deepCopy2 };
