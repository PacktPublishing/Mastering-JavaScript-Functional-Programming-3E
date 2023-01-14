type Post = "A" | "B" | "C";

const hanoi = (
  disks: number,
  from: Post,
  to: Post,
  extra: Post
) => {
  if (disks === 1) {
    console.log(
      `Move disk 1 from post ${from} to post ${to}`
    );
  } else {
    hanoi(disks - 1, from, extra, to);
    console.log(
      `Move disk ${disks} from post ${from} to post ${to}`
    );
    hanoi(disks - 1, extra, to, from);
  }
};

const hanoi2 = (
  disks: number,
  from: Post,
  to: Post,
  extra: Post
) => {
  if (disks > 0) {
    hanoi(disks - 1, from, extra, to);
    console.log(
      `Move disk ${disks} from post ${from} to post ${to}`
    );
    hanoi(disks - 1, extra, to, from);
  }
};

hanoi(4, "A", "B", "C");
hanoi2(4, "A", "B", "C");

export {};
