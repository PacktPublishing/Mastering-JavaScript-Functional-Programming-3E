import { alternator } from "./question_2.2";

const sayA = () => console.log("A");
const sayB = () => console.log("B");

const alt = alternator(sayA, sayB);

alt(); // A
alt(); // B
alt(); // A
alt(); // B
alt(); // A
alt(); // B
