import type { FN } from "../common";

type OBJ = { [key: string]: any };

type TREE<A> = (
  _nonEmptyTree: (
    _x: A,
    _left: TREE<A>,
    _right: TREE<A>
  ) => any,
  _emptyTree: TREE<A>
) => any;

const NewTree =
  <A>(value: A, left: TREE<A>, right: TREE<A>): TREE<A> =>
  (destructure: FN, __: FN) =>
    destructure(value, left, right);

const EmptyTree =
  <A>(): TREE<A> =>
  (__: FN, destructure: FN) =>
    destructure();

const myTree: TREE<number> = NewTree(
  22,
  NewTree(
    9,
    NewTree(4, EmptyTree(), EmptyTree()),
    NewTree(12, EmptyTree(), EmptyTree())
  ),
  NewTree(
    60,
    NewTree(56, EmptyTree(), EmptyTree()),
    EmptyTree()
  )
);

const myRoot = myTree(
  (value) => value,
  () => null
);

const treeRoot = <A>(tree: TREE<A>): A | null =>
  tree(
    (value, _left, _right) => value,
    () => null
  );

const treeLeft = <A>(tree: TREE<A>): TREE<A> =>
  tree(
    (_value, left, _right) => left,
    () => null
  );

const treeRight = <A>(tree: TREE<A>): TREE<A> =>
  tree(
    (_value, _left, right) => right,
    () => null
  );

const treeIsEmpty = <A>(tree: TREE<A>): boolean =>
  tree(
    () => false,
    () => true
  );
console.log("EMPTY?", treeIsEmpty(myTree));

const treeCount = <A>(aTree: TREE<A>): number =>
  aTree(
    (_value, left, right) =>
      1 + treeCount(left) + treeCount(right),
    () => 0
  );
console.log("COUNT", treeCount(myTree));

const treeToObject = <A>(tree: TREE<A>): OBJ =>
  tree(
    (value, left, right) => {
      const leftBranch = treeToObject(left);
      const rightBranch = treeToObject(right);
      const result: OBJ = { value };
      if (leftBranch) {
        result.left = leftBranch;
      }
      if (rightBranch) {
        result.right = rightBranch;
      }
      return result;
    },
    () => null
  );
console.log("OBJECT", treeToObject(myTree));

console.log("ROOT", treeRoot(myTree));
console.log("MYROOT", myRoot);
console.log("LEFT", treeToObject(treeLeft(myTree)));
console.log("RIGHT", treeToObject(treeRight(myTree)));

const treeSearch = <A>(
  findValue: A,
  tree: TREE<A>
): boolean =>
  tree(
    (value, left, right) =>
      findValue === value
        ? true
        : findValue < value
        ? treeSearch(findValue, left)
        : treeSearch(findValue, right),
    () => false
  );
console.log("SEARCH 22", treeSearch(22, myTree));
console.log("SEARCH  9", treeSearch(9, myTree));
console.log("SEARCH 60", treeSearch(60, myTree));
console.log("SEARCH 23", treeSearch(23, myTree));

const treeInsert = <A>(
  newValue: A,
  tree: TREE<A>
): TREE<A> =>
  tree(
    (value, left, right) =>
      newValue <= value
        ? NewTree(value, treeInsert(newValue, left), right)
        : NewTree(value, left, treeInsert(newValue, right)),
    () => NewTree(newValue, EmptyTree(), EmptyTree())
  );

const myTree2 = treeInsert(34, myTree);
console.log(treeToObject(myTree2));

type NODE<K, D> = { key: K; data: D };

const compare = <K, D>(
  obj1: NODE<K, D>,
  obj2: NODE<K, D>
) =>
  obj1.key === obj2.key ? 0 : obj1.key < obj2.key ? -1 : 1;

const treeInsert2 = <K, D>(
  comparator: typeof compare<K, D>,
  newValue: NODE<K, D>,
  tree: TREE<NODE<K, D>>
): TREE<NODE<K, D>> =>
  tree(
    (value, left, right) =>
      comparator(newValue, value) === 0
        ? NewTree(newValue, left, right)
        : comparator(newValue, value) < 0
        ? NewTree(
            value,
            treeInsert2(comparator, newValue, left),
            right
          )
        : NewTree(
            value,
            left,
            treeInsert2(comparator, newValue, right)
          ),
    () => NewTree(newValue, EmptyTree(), EmptyTree())
  );

// console.log(treeToObject(treeInsert2(86, myTree2)));

const treeMap = <A, B>(
  fn: (_x: A) => B,
  tree: TREE<A>
): TREE<B> =>
  tree(
    (value, left, right) =>
      NewTree(
        fn(value),
        treeMap(fn, left),
        treeMap(fn, right)
      ),
    () => EmptyTree()
  );

console.log(
  treeToObject(
    treeMap((x: number): string => `** ${x} **`, myTree)
  )
);

const nullTree = EmptyTree();
console.log(treeToObject(nullTree));

export type { TREE };
