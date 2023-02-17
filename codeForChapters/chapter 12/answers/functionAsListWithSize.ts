const NewList =
  (head, tail = EmptyList, size = 1 + listSize(tail)) =>
  (destructure) =>
    destructure(head, tail, size);

const EmptyList = (__1, destructure) => destructure();

const listHead = (list) =>
  list(
    (head) => head,
    () => null
  );
const listTail = (list) =>
  list(
    (xxx, tail) => tail,
    () => null
  );
const listSize = (list) =>
  list(
    (head, tail, size) => size,
    () => 0
  );

const listIsEmpty = (list) => listSize(list) === 0;

const listAppend = (value) => (list) =>
  list(
    (head, tail, size) =>
      NewList(head, listAppend(value)(tail), size + 1),
    () => NewList(value, EmptyList, 1)
  );

const listReverse = (list) =>
  list(
    (head, tail, size) =>
      listAppend(head)(listReverse(tail)),
    () => EmptyList
  );

const listToArray = (list) =>
  list(
    (head, tail, size) => [head, ...listToArray(tail)],
    () => []
  );

const listFromArray = (arr) =>
  arr.length
    ? NewList(
        arr[0],
        listFromArray(arr.slice(1)),
        arr.length
      )
    : EmptyList;

const listConcat = (list1, list2) =>
  list1(
    (head, tail, size) =>
      NewList(
        head,
        listConcat(tail, list2),
        size + listSize(list2)
      ),
    () => list2
  );

const myList = NewList(
  22,
  NewList(9, NewList(60, EmptyList))
);
const myList2 = listFromArray([24, 11, 63, 12, 4, 56]);
console.log(listSize(myList), listSize(myList2)); // 3 6
const myList3 = listConcat(myList, myList2);
console.log(listSize(myList3)); // 9
