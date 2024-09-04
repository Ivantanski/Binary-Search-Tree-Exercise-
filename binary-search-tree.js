class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    let currentNode = this.root;
    while (true) {
      if (val < currentNode.val) {
        if (currentNode.left === null) {
          currentNode.left = new Node(val);
          return this;
        }
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        if (currentNode.right === null) {
          currentNode.right = new Node(val);
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, current = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let currentNode = this.root;

    while (currentNode) {
      if (val === currentNode.val) {
        return currentNode;
      } else if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, current = this.root) {
    if (current === null) return undefined;

    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else if (val > current.val) {
      return this.findRecursively(val, current.right);
    }
    return current;
  }

  /** dfsPreOrder(): Traverse the tree using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    const data = [];
    const traverse = (node) => {
      data.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };

    traverse(this.root);
    return data;
  }

  /** dfsInOrder(): Traverse the tree using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    const data = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      data.push(node.val);
      if (node.right) traverse(node.right);
    };

    traverse(this.root);
    return data;
  }

  /** dfsPostOrder(): Traverse the tree using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    const data = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.val);
    };

    traverse(this.root);
    return data;
  }

  /** bfs(): Traverse the tree using BFS.
   * Return an array of visited nodes. */
  bfs() {
    const queue = [this.root];
    const data = [];

    while (queue.length) {
      const node = queue.shift();
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return data;
  }

  /** remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val) {
    let nodeToRemove = this.root;
    let parentNode = null;

    while (nodeToRemove && nodeToRemove.val !== val) {
      parentNode = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (!nodeToRemove) return undefined; // Node not found

    // Case 1: Node has no children (leaf node)
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (nodeToRemove !== this.root) {
        if (parentNode.left === nodeToRemove) {
          parentNode.left = null;
        } else {
          parentNode.right = null;
        }
      } else {
        this.root = null; // Tree had only one node
      }
    }
    // Case 2: Node has two children
    else if (nodeToRemove.left && nodeToRemove.right) {
      let successor = nodeToRemove.right;
      let successorParent = nodeToRemove;

      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      if (successorParent !== nodeToRemove) {
        successorParent.left = successor.right;
        successor.right = nodeToRemove.right;
      }
      successor.left = nodeToRemove.left;

      if (nodeToRemove !== this.root) {
        if (parentNode.left === nodeToRemove) {
          parentNode.left = successor;
        } else {
          parentNode.right = successor;
        }
      } else {
        this.root = successor;
      }
    }
    // Case 3: Node has one child
    else {
      const child = nodeToRemove.left ? nodeToRemove.left : nodeToRemove.right;

      if (nodeToRemove !== this.root) {
        if (parentNode.left === nodeToRemove) {
          parentNode.left = child;
        } else {
          parentNode.right = child;
        }
      } else {
        this.root = child;
      }
    }

    return nodeToRemove;
  }

  /** isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced(current = this.root) {
    if (current === null) return true;

    const heightDifference = maxDepth(current) - minDepth(current);
    return heightDifference <= 1;

    function minDepth(node) {
      if (node === null) return 0;
      return 1 + Math.min(minDepth(node.left), minDepth(node.right));
    }

    function maxDepth(node) {
      if (node === null) return 0;
      return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
    }
  }

  /** findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise, return undefined. */
  findSecondHighest(current = this.root) {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    while (current) {
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }

      if (current.right && (!current.right.left && !current.right.right)) {
        return current.val;
      }

      current = current.right;
    }
  }

  /** dfsInOrderIterative(): Traverse the tree using in-order DFS iteratively.
   * Return an array of visited nodes. */
  dfsInOrderIterative() {
    const stack = [];
    const dfs = [];
    let currentNode = this.root;

    while (stack.length > 0 || currentNode) {
      while (currentNode) {
        stack.push(currentNode);
        currentNode = currentNode.left;
      }
      currentNode = stack.pop();
      dfs.push(currentNode.val);
      currentNode = currentNode.right;
    }

    return dfs;
  }
}

// Export the classes for testing
module.exports = { BinarySearchTree, Node };

