const { Node, Tree, buildTree, removeDuplicates } = require("./index");

test("test the removeDuplicates()", () => {
  expect(removeDuplicates([1, 2, 2, 3, 4, 5, 5, 7])).toEqual([
    1, 2, 3, 4, 5, 7,
  ]);
});

test("return sorted no duplicat function", () => {
  expect(Tree([1, 9, 2, 2, 3, 4, 5, 5, 7])).toEqual([1, 2, 3, 4, 5, 7, 9]);
});

test("test if buildtree returns the root node", () => {
  expect(buildTree([1, 9, 2, 2, 3, 4, 5, 5, 7])).toEqual(4);
});
