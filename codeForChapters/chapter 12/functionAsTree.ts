type FN = (..._args: any[]) => any;
type OBJ = { [key: string]: any };

type TREE<A> = (
  _x: A,
  _l: TREE<A> | typeof EmptyTree,
  _r: TREE<A> | typeof EmptyTree
) => FN;

const Tree =
  <A>(value: A, left?: TREE<A>, right?: TREE<A>) =>
  (destructure: FN, __: FN) =>
    destructure(value, left, right);

const EmptyTree = () => (__: FN, destructure: FN) =>
  destructure();

const myTree: TREE<number> = Tree(
  22,
  Tree(
    9,
    Tree(4, EmptyTree(), EmptyTree()),
    Tree(12, EmptyTree(), EmptyTree())
  ),
  Tree(60, Tree(56, EmptyTree(), EmptyTree()), EmptyTree())
);

const myRoot = myTree(
  (value) => value,
  () => null
);

const treeRoot = <A>(tree: FN): A =>
  tree(
    (value: A, _left: TREE<A>, _right: TREE<A>) => value,
    () => null
  );

const treeLeft = <A>(tree: FN): TREE<A> =>
  tree(
    (_value: A, left: TREE<A>, _right: TREE<A>) => left,
    () => null
  );

const treeRight = <A>(tree: FN): TREE<A> =>
  tree(
    (_value: A, _left: TREE<A>, right: TREE<A>) => right,
    () => null
  );

const treeIsEmpty = (tree: FN): boolean =>
  tree(
    () => false,
    () => true
  );
console.log("EMPTY?", treeIsEmpty(myTree));

const treeCount = <A>(aTree: FN): number =>
  aTree(
    (value: A, left: TREE<A>, right: TREE<A>) =>
      1 + treeCount(left) + treeCount(right),
    () => 0
  );
console.log("COUNT", treeCount(myTree));

const treeToObject = <A>(tree: FN): OBJ =>
  tree(
    (value: A, left: FN, right: FN) => {
      const leftBranch = treeToObject(left);
      const rightBranch = treeToObject(right);
      const result = { value };
      if (leftBranch) {
        (result as any).left = leftBranch;
      }
      if (rightBranch) {
        (result as any).right = rightBranch;
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

const treeSearch = <A>(findValue: A, tree: FN): boolean =>
  tree(
    (value: A, left: FN, right: FN) =>
      findValue === value
        ? true
        : findValue < value
        ? treeSearch(findValue, left)
        : treeSearch(findValue, right),
    () => false
  );
console.log("SEARCH 22", treeSearch(22, myTree));
console.log("SEARCH 9", treeSearch(9, myTree));
console.log("SEARCH 60", treeSearch(60, myTree));
console.log("SEARCH 23", treeSearch(23, myTree));

const treeInsert = <A>(newValue: A, tree: FN): TREE<A> =>
  tree(
    (value: A, left: FN, right: FN) =>
      newValue <= value
        ? Tree(value, treeInsert(newValue, left), right)
        : Tree(value, left, treeInsert(newValue, right)),
    () => Tree(newValue, EmptyTree(), EmptyTree())
  );

const compare = <A>(obj1: A, obj2: A) =>
  obj1 === obj2 ? 0 : obj1 < obj2 ? -1 : 1;

const treeInsert2 = <A>(
  comparator: typeof compare<A>,
  newValue: A,
  tree: FN
): TREE<A> =>
  tree(
    (value: A, left: FN, right: FN) =>
      comparator(newValue, value) === 0
        ? Tree(newValue, left, right)
        : comparator(newValue, value) < 0
        ? Tree(
            value,
            treeInsert2(comparator, newValue, left),
            right
          )
        : Tree(
            value,
            left,
            treeInsert2(comparator, newValue, right)
          ),
    () => Tree(newValue, EmptyTree(), EmptyTree())
  );

const treeMap = <A, B>(
  fn: (_x: A) => B,
  tree: FN
): TREE<B> =>
  tree(
    (value: A, left: FN, right: FN) =>
      Tree(
        fn(value),
        treeMap(fn, left),
        treeMap(fn, right)
      ),
    () => EmptyTree()
  );

console.log(
  treeMap((x: string): string => x + "FF", myTree)
);

export {};
