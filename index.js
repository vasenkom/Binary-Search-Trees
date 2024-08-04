function Node(value) {
  return {
    value: value,
    left: null,
    right: null,
  };
}

function Tree(arr) {
  if (arr.length === 0) return null;

  let arrNoDublicats = removeDuplicates(arr); // Remove duplicates
  arrNoDublicats.sort((a, b) => a - b); // Sort the array

  let root = buildTree(arrNoDublicats); // Build the tree and get the root node
  return root; // Return the root node
}

function buildTree(arr) {
  if (arr.length === 0) return null;

  let mid = Math.floor(arr.length / 2);
  let root = Node(arr[mid]);
  root.left = buildTree(arr.slice(0, mid));
  root.right = buildTree(arr.slice(mid + 1));
  return root;
}

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// Binary search tree visualizer
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function insert(root, value) {
  if (root == null) {
    return Node(value);
  }

  if (root.value == value) {
    return root;
  }

  if (value < root.value) {
    root.left = insert(root.left, value);
  } else if (value > root.value) {
    root.right = insert(root.right, value);
  }

  return root;
}

function deleteItem(root, value) {
  if (root == null) {
    return null;
  }

  if (value < root.value) {
    root.left = deleteItem(root.left, value);
  } else if (value > root.value) {
    root.right = deleteItem(root.right, value);
  } else {
    // Node with only one child or no child
    if (root.left == null) {
      return root.right;
    } else if (root.right == null) {
      return root.left;
    }

    // Node with two children: Get the inorder successor (smallest in the right subtree)
    let successor = minValueNode(root.right);

    // Copy the inorder successor's content to the node
    root.value = successor.value;

    // Delete the inorder successor
    root.right = deleteItem(root.right, successor.value);
  }

  return root;
}

function minValueNode(node) {
  let current = node;

  // Loop down to find the leftmost leaf
  while (current && current.left !== null) {
    current = current.left;
  }

  return current;
}

// Find function returns the node with the given value
function find(root, value) {
  if (root == null) {
    return null;
  }

  if (value < root.value) {
    return find(root.left, value); // Search in the left subtree
  } else if (value > root.value) {
    return find(root.right, value); // Search in the right subtree
  } else {
    return root; // Value found
  }
}

function levelOrder(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("Callback function is required");
  }

  if (root === null) {
    return;
  }

  let queue = [root]; // Start with the root node in the queue

  while (queue.length > 0) {
    let currentNode = queue.shift(); // Dequeue the first node

    callback(currentNode); // Apply the callback to the current node

    // Enqueue left and right children if they exist
    if (currentNode.left !== null) {
      queue.push(currentNode.left);
    }
    if (currentNode.right !== null) {
      queue.push(currentNode.right);
    }
  }
}

function inOrder(callback, node = this.root, result = []) {
  if (node === null) return;

  inOrder(callback, node.left, result);
  if (callback) {
    callback(node);
  } else {
    result.push(node.value);
  }
  inOrder(callback, node.right, result);

  if (!callback) return result;
}

// Pre-order traversal
function preOrder(callback, node = this.root, result = []) {
  if (node === null) return;

  if (callback) {
    callback(node);
  } else {
    result.push(node.value);
  }
  preOrder(callback, node.left, result);
  preOrder(callback, node.right, result);

  if (!callback) return result;
}

// Post-order traversal
function postOrder(callback, node = this.root, result = []) {
  if (node === null) return;

  postOrder(callback, node.left, result);
  postOrder(callback, node.right, result);
  if (callback) {
    callback(node);
  } else {
    result.push(node.value);
  }

  if (!callback) return result;
}

// Example 1
let root1 = Tree([1, 7, 9, 67, 6345, 324]);

prettyPrint(deleteItem(root1, 67));

// Example 2
let customRoot = Node(1);
customRoot.left = Node(2);
customRoot.right = Node(3);
customRoot.left.left = Node(4);
customRoot.left.right = Node(5);

levelOrder(customRoot, (node) => console.log(node.value)); // Should print: 1 2 3 4 5

module.exports = {
  Node,
  Tree,
  buildTree,
  removeDuplicates,
  prettyPrint,
  insert,
  deleteItem,
  find,
  levelOrder,
  inOrder,
  preOrder,
  postOrder,
};
