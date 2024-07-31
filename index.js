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
    // if root has 0 children or only right child
    if (root.left == null) {
      let temp = root.right;
      root = null;
      return temp;
    }

    // When root has only left child
    if (root.right == null) {
      let temp = root.left;
      root = null;
      return temp;
    }

    // if node has two children
    let newArr = reorder(root);
    root.value = newArr.value;
    root.right = deleteItem(root.right, newArr.key);
  }

  return root;
}

// find(value) function returns the node with the given value
function find(root, value) {
  if (root == null) {
    return null;
  }

  if (value < root.value) {
    return find(root.left, value); // search in the left subtree
  } else if (value > root.value) {
    return find(root.right, value); // search in the right subtree
  } else {
    return root;
  }
}

// Works when the right child is not empty
function reorder(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

// Example usage:
let root = Tree([1, 7, 9, 67, 6345, 324]);

prettyPrint(deleteItem(root, 67)); // This line will print the tree

module.exports = { Node, Tree, buildTree, removeDuplicates, prettyPrint };
