const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (!this._root) {
      this._root = new Node(data);
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

  _find(data, startFrom = this._root) {
    let parent = null;
    let side = null;
    let currentNode = startFrom;

    while (currentNode) {
      const prevNode = currentNode;

      if (data < currentNode.data) {
        currentNode = currentNode.left;
        side = 'left';
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
        side = 'right';
      } else if (data === currentNode.data) {
        return { parent, node: currentNode, side };
      }

      parent = prevNode;
    }

    return { parent: null, node: null, isLeft: null };
  }

  remove(data) {
    this._remove(data);
  }

  _remove(data, nodeMetaData = null) {
    if (!this._root) {
      return null;
    }

    const {
      parent,
      node: nodeToRemove,
      side,
    } = nodeMetaData ? nodeMetaData : this._find(data);

    if (!nodeToRemove) {
      return null;
    }

    // Case 1: No descendants (leaf-node)
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (nodeToRemove === this._root) {
        this._root = null;
      } else {
        parent[side] = null;
      }

      return nodeToRemove;
    }

    // Case 2: Only one descendant (any - left or right)
    if (!nodeToRemove.left || !nodeToRemove.right) {
      const descendant = nodeToRemove.left || nodeToRemove.right;

      if (nodeToRemove === this._root) {
        this._root = descendant;
      } else {
        parent[side] = descendant;
      }

      return nodeToRemove;
    }

    // Case 3: Both descendants are present
    if (nodeToRemove.left && nodeToRemove.right) {
      //
      // A little bit more optimal way (maybe), but something goes wrong...
      // Debug required
      //
      // const nodeToReplaceMetaData = {
      //   ...this._getEdge('left', nodeToRemove.right),
      //   parent: nodeToRemove,
      // };

      // this._remove(null, nodeToReplaceMetaData);
      // nodeToRemove.data = nodeToReplaceMetaData.node.data;

      const nodeToReplace = this._getEdge('left', nodeToRemove.right).node;

      this._remove(nodeToReplace.data);
      nodeToRemove.data = nodeToReplace.data;

      return nodeToRemove;
    }

    throw new Error('Removing node unexpected error');
  }

  _getEdge(side = 'left', startFromNode = this._root) {
    let node = startFromNode;
    let parent = null;

    while (node[side]) {
      parent = node;
      node = node[side];
    }

    return { parent, node, side };
  }

  min() {
    return this._getEdge('left').node.data;
  }

  max() {
    return this._getEdge('right').node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
