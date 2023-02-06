class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: any, next = null) {
    this.value = value;
    this.next = next;
  }
}

export { ListNode };
