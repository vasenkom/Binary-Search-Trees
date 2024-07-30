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

// Example usage:
let root = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(root); // This line will print the tree

module.exports = { Node, Tree, buildTree, removeDuplicates, prettyPrint };
