import type { TREE } from "../functionAsTree";

const treeHeight = <A>(tree: TREE<A>): number =>
  tree(
    (val, left, right) =>
      1 + Math.max(treeHeight(left), treeHeight(right)),
    () => 0
  );

const treeList = <A>(tree: TREE<A>): void =>
  tree(
    (value, left, right) => {
      treeList(left);
      console.log(value);
      treeList(right);
    },
    () => {
      // nothing
    }
  );

const treeRemove = <A>(
  toRemove: A,
  tree: TREE<A>
): TREE<A> =>
  tree(
    (val, left, right) => {
      const findMinimumAndRemove = (
        tree: TREE<A> /* never empty */
      ): { min: A; tree: TREE<A> } =>
        tree(
          (value, left, right) => {
            if (treeIsEmpty(left)) {
              return { min: value, tree: right };
            } else {
              const result = findMinimumAndRemove(left);
              return {
                min: result.min,
                tree: Tree(value, result.tree, right),
              };
            }
          },
          () => {
            /* not needed */
          }
        );
      if (toRemove < val) {
        return Tree(val, treeRemove(toRemove, left), right);
      } else if (toRemove > val) {
        return Tree(val, left, treeRemove(toRemove, right));
      } else if (treeIsEmpty(left) && treeIsEmpty(right)) {
        return EmptyTree();
      } else if (treeIsEmpty(left) !== treeIsEmpty(right)) {
        return tree(
          (val, left, right) =>
            left(
              () => left,
              () => right
            ),
          () => {
            /* not needed */
          }
        );
      } else {
        const result = findMinimumAndRemove(right);
        return Tree(result.min, left, result.tree);
      }
    },
    () => tree
  );
export {};
