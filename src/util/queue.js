class Queue {
  constructor () {
    this.storage = {};
    this.headTracker = 0;
    this.tailTracker = 0;
    this.length = 0;
  };

  enqueue (value) {
    this.storage[this.tailTracker] = value;
    this.tailTracker++;
    this.length++;
  };

  dequeue () {
    let dequeued = this.storage[this.headTracker];
    if (this.length <= 1) {
      this.storage = {};
      this.length = 0;
      this.headTracker = 0;
      this.tailTracker = 0;
    } else {
      delete this.storage[this.headTracker];
      this.headTracker++;
      this.length--;
    }
    return dequeued;
  };

  dequeueAll () {
    this.storage = {};
    this.headTracker = 0;
    this.tailTracker = 0;
    this.length = 0;
  };

  size () {
    return this.length;
  };

  isEmpty () {
    return Object.keys(this.storage).length === 0 ? true : false;
  };
};

module.exports = Queue;
