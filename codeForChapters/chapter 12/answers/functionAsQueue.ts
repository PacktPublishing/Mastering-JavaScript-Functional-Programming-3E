import {
  EmptyList,
  listToArray,
  listReverse,
  listIsEmpty,
} from "./functionAsList";

import type { FN } from "../../common";
import type { LIST } from "./functionAsList";
/*
QUEUE: WHENEVER THE FRONT LIST BECOMES EMPTY, WE FILL IT WITH THE REVERSED BACK LIST
*/

type QUEUE<A> = (
  _nonEmptyList: (_head: LIST<A>, _tail: LIST<A>) => any,
  _emptyList: QUEUE<A>
) => any;

const NewQueue =
  <A>(front: LIST<A>, back: LIST<A> = EmptyList()) =>
  (f: FN, _g: FN) =>
    f(front, back);

const EmptyQueue =
  <A>(): QUEUE<A> =>
  (f: FN, g: FN) =>
    g();

const queueToArray = <A>(queue: QUEUE<A>): A[] =>
  queue(
    (front, back): A[] => [
      ...listToArray(front),
      ...listToArray(listReverse(back)),
    ],
    () => []
  );

const queueIsEmpty = <A>(queue: QUEUE<A>): boolean =>
  queue(
    (front, _back) => listIsEmpty(front),
    () => true
  );

const queueHead = <A>(queue: QUEUE<A>): A =>
  queue(
    (front, _back) => listHead(front),
    () => undefined
  );

const queueAddAtBack = <A>(
  queue: QUEUE<A>,
  value: A
): QUEUE<A> =>
  queue(
    (front, back) => queueMake(front, NewList(value, back)),
    () => NewQueue(NewList(value, EmptyList()), EmptyList())
  );

const queueRemoveFromFront = <A>(
  queue: QUEUE<A>
): QUEUE<A> =>
  queue(
    (front, back) => queueMake(listTail(front), back),
    () => undefined
  );

const queueMake = <A>(
  front: LIST<A>,
  back: LIST<A>
): QUEUE<A> =>
  listIsEmpty(front)
    ? NewQueue(listReverse(back), EmptyList())
    : NewQueue(front, back);

let myQ = EmptyQueue();
console.log(queueIsEmpty(myQ));
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueAddAtBack(myQ, "alfa");
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueAddAtBack(myQ, "beta");
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueAddAtBack(myQ, "gamma");
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueRemoveFromFront(myQ);
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueAddAtBack(myQ, "delta");
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueAddAtBack(myQ, "epsilon");
console.log(queueIsEmpty(myQ));
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueRemoveFromFront(myQ);
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueRemoveFromFront(myQ);
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
myQ = queueRemoveFromFront(myQ);
console.log(queueToArray(myQ), "HEAD", queueHead(myQ));
