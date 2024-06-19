class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Queue {
  constructor() {
    this.list = [];
  }
  enqueue(x) {
    this.list.push(x);
  }
  dequeue(x) {
    return this.list.shift();
  }
  empty() {
    return this.list.length == 0;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.map((v) => this.addVertex(v));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let fromVertex of this.nodes) {
      if (fromVertex.adjacent.has(vertex)) {
        this.removeEdge(fromVertex, vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, traversed = []) {
    traversed.push(start.value);
    for (let vertex of start.adjacent) {
      console.log("is ", vertex.value, " in ", traversed, "?");
      if (traversed.indexOf(vertex.value) == -1) {
        const moreTraversed = this.depthFirstSearch(vertex, traversed);
        traversed.concat(moreTraversed);
      }
    }
    return traversed;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let traversed = [];
    let cur;
    let q = new Queue();
    q.enqueue(start);
    while (!q.empty()) {
      console.log(q.list);
      cur = q.dequeue();
      if (traversed.indexOf(cur.value) == -1) {
        traversed.push(cur.value);
        for (let v of cur.adjacent) {
          q.enqueue(v);
        }
      }
    }
    return traversed;
  }
}

module.exports = { Graph, Node };

//////////////////////
// for testing
//////////////////////

let graph = new Graph();
let a = new Node("A");
let b = new Node("B");
let c = new Node("C");
let d = new Node("D");
graph.addVertices([a, b, c, d]);
graph.addEdge(a, b);
graph.addEdge(a, c);
graph.addEdge(b, d);
graph.addEdge(c, d);
