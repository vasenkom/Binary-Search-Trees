function Node(val, left = null, right = null) {
  return {
    val: val,
    left: left,
    right: right,
  };
}

function Tree(arr) {
  if (arr.length == 0) return null;

  let mid = (arr[0] + arr[length - 1]) / 2;

  let root = buildTree(arr);
}

function buildTree(arr) {
  let arrNoDublicats = removeDuplicates(arr);
  arrNoDublicats.sort((a, b) => a - b);
  return arrNoDublicats;
}

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

module.exports = { Node, Tree, buildTree, removeDuplicates };
