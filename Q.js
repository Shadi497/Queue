class Node {
  constructor(groupsize, next = null) {
    this.groupsize = groupsize;
    this.next = next;
  }
}

class Queue {
  constructor(limit = 12) {
    this.front = null;
    this.back = null;
    this.length = 0;
    this.limit = limit;
    this.waitingtime = 0;
  }

  isFull = () => this.length === this.limit;

  isEmpty = () => this.length === 0;

  /*peek = () =>
    this.isEmpty()
      ? `No time to wait`
      : `${this.length} groups of people in front of u. You have to wait ${this.waitingtime} min`;
*/
  addnode = (groupsize) => {
    const newNode = new Node(groupsize);
    if (this.isEmpty()) this.front = newNode;
    else this.back.next = newNode;
    this.back = newNode;
    this.length++;
    this.waitingtime += groupsize * 0.5;
    console.log(
      `${this.length} groups of people in front of u. You have to wait ${this.waitingtime} min`
    );
  };
  enqueue = (groupsize) => {
    if (this.isFull()) {
      console.log("Line is Full");
    } else {
      let peoplenum = groupsize;
      while (peoplenum > 12) {
        this.addnode(12);
        peoplenum -= 12;
      }
      this.addnode(peoplenum);
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      console.log("Queue is Empty");
    } else {
      const removed = this.front;
      if (this.length === 1) {
        this.front = null;
        this.back = null;
      } else {
        this.front = removed.next;
      }
      this.length--;
      this.waitingtime -= removed.groupsize * 0.5;
      return `\nThe front group entered. ${this.length} groups left. You have to wait ${this.waitingtime} min`;
    }
  };
}

const ride = new Queue(10);

ride.enqueue(2);
ride.enqueue(8);
ride.enqueue(16);
ride.enqueue(20);
ride.enqueue(6);
//console.log(ride.peek());

console.log(ride.dequeue()); //6*0.5=3
console.log(ride.dequeue()); //12*0.5=6
