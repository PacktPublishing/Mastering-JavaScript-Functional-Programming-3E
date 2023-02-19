/*
In the end, this might strike you as nothing more than a useless programming trick.
In a sense that’s right. I’d never use this in my own code. What makes this technique
so valuable is that it actually fits into the broader context of lambda calculus,
which is a mathematical abstraction of computation.

Alex Beal, at http://www.usrsb.in/Building-Data-Structures-from-Functions.html
*/

import type { FN } from "../../common";

type BOOLEAN = (_true: any, _false: any) => any;

const TRUE: BOOLEAN = (trueValue: any, __: any) =>
  trueValue;

const FALSE: BOOLEAN = (__: any, falseValue: any) =>
  falseValue;

const MakeBool = (value: boolean) => (value ? TRUE : FALSE);

const valueOf = (boolValue: BOOLEAN): boolean =>
  boolValue(true, false);

const NOT = (boolValue: BOOLEAN): BOOLEAN =>
  boolValue(FALSE, TRUE);

const AND = (
  boolLeft: BOOLEAN,
  boolRight: BOOLEAN
): BOOLEAN => boolLeft(boolRight, FALSE);

const OR = (
  boolLeft: BOOLEAN,
  boolRight: BOOLEAN
): BOOLEAN => boolLeft(TRUE, boolRight);

/*
 * MAS INTERESANTE POR LA SIMETRIA
 * AND = (left, right) => left(right, left)  -o-  right(left, right)
 * OR  = (left, right) => left(left, right)  -o-  right(right, left)
 */

const XOR = (
  boolLeft: BOOLEAN,
  boolRight: BOOLEAN
): BOOLEAN => boolLeft(NOT(boolRight), boolRight); // comparar con EQU()

const EQU = (
  boolLeft: BOOLEAN,
  boolRight: BOOLEAN
): BOOLEAN => boolLeft(boolRight, NOT(boolRight)); // comparar con XOR()

const IMP = (
  boolLeft: BOOLEAN,
  boolRight: BOOLEAN
): BOOLEAN => boolLeft(boolRight, TRUE); // comparar con AND()

const XOR2 = (
  boolLeft: BOOLEAN,
  boolRight: BOOLEAN
): BOOLEAN => boolLeft(boolRight(FALSE, TRUE), boolRight); // comparar con EQU()

console.log("LOG T  ", valueOf(TRUE));
console.log("LOG F  ", valueOf(FALSE));
console.log("");

console.log("VAL T  ", valueOf(MakeBool(true)));
console.log("VAL F  ", valueOf(MakeBool(false)));
console.log("");

console.log("NOT T  ", valueOf(NOT(TRUE)));
console.log("NOT F  ", valueOf(NOT(FALSE)));
console.log("");

console.log("AND T T", valueOf(AND(TRUE, TRUE)));
console.log("AND T F", valueOf(AND(TRUE, FALSE)));
console.log("AND F T", valueOf(AND(FALSE, TRUE)));
console.log("AND F F", valueOf(AND(FALSE, FALSE)));
console.log("");

console.log("OR  T T", valueOf(OR(TRUE, TRUE)));
console.log("OR  T F", valueOf(OR(TRUE, FALSE)));
console.log("OR  F T", valueOf(OR(FALSE, TRUE)));
console.log("OR  F F", valueOf(OR(FALSE, FALSE)));
console.log("");

console.log("XOR T T", valueOf(XOR(TRUE, TRUE)));
console.log("XOR T F", valueOf(XOR(TRUE, FALSE)));
console.log("XOR F T", valueOf(XOR(FALSE, TRUE)));
console.log("XOR F F", valueOf(XOR(FALSE, FALSE)));
console.log("");

console.log("XOR2 T T", valueOf(XOR2(TRUE, TRUE)));
console.log("XOR2 T F", valueOf(XOR2(TRUE, FALSE)));
console.log("XOR2 F T", valueOf(XOR2(FALSE, TRUE)));
console.log("XOR2 F F", valueOf(XOR2(FALSE, FALSE)));
console.log("");

console.log("EQU T T", valueOf(EQU(TRUE, TRUE)));
console.log("EQU T F", valueOf(EQU(TRUE, FALSE)));
console.log("EQU F T", valueOf(EQU(FALSE, TRUE)));
console.log("EQU F F", valueOf(EQU(FALSE, FALSE)));
console.log("");

console.log("IMP T T", valueOf(IMP(TRUE, TRUE)));
console.log("IMP T F", valueOf(IMP(TRUE, FALSE)));
console.log("IMP F T", valueOf(IMP(FALSE, TRUE)));
console.log("IMP F F", valueOf(IMP(FALSE, FALSE)));
console.log("");

const ifElse = (
  boolValue: BOOLEAN,
  fnTRUE: FN,
  fnFALSE: FN
) => boolValue(fnTRUE, fnFALSE)();

ifElse(
  TRUE,
  () => console.log("SOY CIERTO"),
  () => console.log("SOY FALSO")
);

ifElse(
  FALSE,
  () => console.log("SOY CIERTO"),
  () => console.log("SOY FALSO")
);

export {};
