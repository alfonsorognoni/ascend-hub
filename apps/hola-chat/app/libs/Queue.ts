class Queue<T> {
  private items: T[] = [];

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  peek() {
    return !this.isEmpty() ? this.items[0] : null;
  }

  size() {
    return this.items.length;
  }
}

export default Queue;
