const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
    this._min = null;
    this._max = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (!this._root) {
      this._root = new Node(data);
      this._min = data;
      this._max = data;
      return;
    }

    let currentNode = this._root;
    let direction = '';

    while (true) {
      if (data < currentNode.data) {
        direction = 'left';
      } else if (data > currentNode.data) {
        direction = 'right';
      } else {
        return;
      }

      if (currentNode[direction] === null) {
        currentNode[direction] = new Node(data);
        this._min = Math.min(this._min, data);
        this._max = Math.max(this._max, data);
        return;
      }

      currentNode = currentNode[direction];
    }
  }

  has(data) {
    if (this.find(data) !== null) {
      return true;
    }

    return false;
  }

  find(data) {
    return this._find(data).node;
  }

  _find(data) {
    let parent = null;
    let currentNode = this._root;

    while (currentNode) {
      parent = currentNode;

      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else if (data === currentNode.data) {
        return { parent, node: currentNode };
      }
    }

    return { parent: null, node: null };
  }

  remove(data) {
    if (!this._root) {
      return;
    }
    const { parent, node: nodeToRemove } = this._find(data);

    // Case 1: No descendants (leaf)
    if (nodeToRemove.left === null && nodeToRemove.right === null) {
      if (parent && parent.left === nodeToRemove) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
  }

  min() {
    return this._min;
  }

  max() {
    return this._max;
  }
}

module.exports = {
  BinarySearchTree,
};
