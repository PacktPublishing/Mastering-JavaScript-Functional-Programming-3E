/*
    h: stands for the head of a list
    t: stands for the tail of a list

    v: stands for a value
    p: stands for a position -- the head of the list is at position 0

    f: a destructuring function: f(h,t)
    g: a destructuring null function: g()
*/
import type { FN } from "../../common";

type LIST<A> = (
  _nonEmptyList: (_head: A, _tail: LIST<A>) => any,
  _emptyList: LIST<A>
) => any;

const NewList =
  <A>(head: A, tail: LIST<A>): LIST<A> =>
  (f: FN, _g: FN) =>
    f(head, tail);

const EmptyList =
  <A>(): LIST<A> =>
  (f: FN, g: FN) =>
    g();

const MakeList = <A>(...args: A[]): LIST<A> =>
  args.length
    ? NewList(args[0], MakeList(...args.slice(1)))
    : EmptyList();

const MakeList2 = <A>(...args: A[]): LIST<A> =>
  args.length
    ? (f: FN, _g: FN) =>
        f(args[0], MakeList2(...args.slice(1))) // lazy evaluation of the tail!
    : (_f: FN, g: FN) => g();

const MakeList3 = <A>(...args: A[]): LIST<A> => {
  if (args.length) {
    const h = args[0];
    const t = MakeList3(...args.slice(1));
    return (f: FN, _g: FN) => f(h, t);
  } else {
    return (_f: FN, g: FN) => g();
  }
};

const listHead = <A>(list: LIST<A>): A | null =>
  list(
    (head, _tail) => head,
    () => null
  );

const listTail = <A>(list: LIST<A>): LIST<A> | null =>
  list(
    (head, tail) => tail,
    () => null
  );

const listIsEmpty = <A>(list: LIST<A>): boolean =>
  list(
    (_head, _tail) => false,
    () => true
  );

const listToArray = <A>(list: LIST<A>): A[] =>
  list(
    (head, tail) => [head, ...listToArray(tail)],
    () => []
  );

const listFromArray = <A>(arr: A[]): LIST<A> =>
  arr.length
    ? NewList(arr[0], listFromArray(arr.slice(1)))
    : EmptyList();

const listAppend = <A>(list: LIST<A>, value: A): LIST<A> =>
  list(
    (head, tail) => NewList(head, listAppend(tail, value)),
    () => NewList(value, EmptyList())
  );

const listReverse = <A>(list: LIST<A>): LIST<A> =>
  list(
    (head, tail) => listAppend(listReverse(tail), head),
    () => EmptyList()
  );

const listEquals1 = <A>(
  list1: LIST<A>,
  list2: LIST<A>
): boolean =>
  JSON.stringify(listToArray(list1)) ===
  JSON.stringify(listToArray(list2));

const listEquals2 = <A>(
  list1: LIST<A>,
  list2: LIST<A>
): boolean =>
  (listIsEmpty(list1) && listIsEmpty(list2)) ||
  (!listIsEmpty(list1) &&
    !listIsEmpty(list2) &&
    listHead(list1) === listHead(list2) &&
    listEquals2(
      listTail(list1) as LIST<A>,
      listTail(list2) as LIST<A>
    ));

const listSize = <A>(list: LIST<A>): number =>
  list(
    (head, tail) => 1 + listSize(tail),
    () => 0
  );

const listSize2 = <A>(list: LIST<A>): number => {
  const accumSize = (
    accum: number,
    list: LIST<A>
  ): number =>
    list(
      (head, tail) => accumSize(accum + 1, tail),
      () => accum
    );
  return accumSize(0, list);
};

const listConcat = <A>(list1: LIST<A>, list2: LIST<A>) =>
  list1(
    (head, tail) => NewList(head, listConcat(tail, list2)),
    () => list2
  );

const listSearch = <A>(list: LIST<A>, value: A): boolean =>
  list(
    (head, tail) =>
      head === value || listSearch(tail, value),
    () => false
  );

const listGetAt = <A>(list: LIST<A>, pos: number): A =>
  list(
    (head, tail) =>
      pos === 0 ? head : listGetAt(tail, pos - 1),
    () => throwEmptyListError()
  );

const listUpdate = <A>(
  list: LIST<A>,
  pos: number,
  value: A
): LIST<A> =>
  list(
    (head, tail) =>
      pos === 0
        ? NewList(value, tail)
        : NewList(head, listUpdate(tail, pos - 1, value)),
    () => throwEmptyListError()
  );

const listMap = <A, B>(
  list: LIST<A>,
  fn: (_x: A) => B
): LIST<B> =>
  list(
    (head, tail) => NewList(fn(head), listMap(tail, fn)),
    EmptyList
  );

const listFilter = <A>(
  list: LIST<A>,
  fn: (_x: A) => boolean
): LIST<A> =>
  list(
    (head, tail) =>
      fn(head)
        ? NewList(head, listFilter(tail, fn))
        : listFilter(tail, fn),
    EmptyList
  );

const listReduce = <A, B>(
  list: LIST<A>,
  fn: (_acc: B, _val: A) => B,
  accum: B
): B =>
  list(
    (head, tail) => listReduce(tail, fn, fn(accum, head)),
    () => accum
  );

////////////////////// TESTS! ////////////////////////

console.log(listToArray(MakeList3(22, 9, 60, 24, 11, 63)));
console.log(listToArray(MakeList3(1492)));
console.log(listToArray(MakeList3()));

const myList1 = NewList(
  22,
  NewList(9, NewList(60, EmptyList()))
);
const myList2 = listFromArray([24, 11, 63, 12, 4, 56]);

const myList3 = NewList(
  24,
  NewList(11, NewList(63, listFromArray([12, 4, 56])))
);

export {
  NewList,
  EmptyList,
  listToArray,
  listReverse,
  listIsEmpty,
};

export type { LIST };
