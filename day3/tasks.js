const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf-8');

let inputSplit = input.split(/\r?\n/);

let inputArr = inputSplit.map((value) => {
  return value.repeat(inputSplit.length);
});

const findTrees = (array, right, down) => {
  let position = 0;
  treeCount = 0;

  for (let i = 0; i < array.length; i += down) {
    if (position !== 0 && array[i][position] === '#') {
      treeCount++;
    }
    position += right;
  }

  return treeCount;
};

console.log('The solution for challenge 1 is: ', findTrees(inputArr, 3, 1));

console.log(
  'The solution for challenge 2 is: ',
  findTrees(inputArr, 1, 1) *
    findTrees(inputArr, 3, 1) *
    findTrees(inputArr, 5, 1) *
    findTrees(inputArr, 7, 1) *
    findTrees(inputArr, 1, 2)
);
