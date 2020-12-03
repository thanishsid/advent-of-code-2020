const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf-8');

let inputSplit = input.split('\n');

let inputArr = inputSplit.map((value) => {
  return parseInt(value);
});

let myArr = inputArr.sort((a, b) => a - b);

const findSum = (num, array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      for (let k = j + 1; k < array.length; k++) {
        if (array[i] + array[j] + array[k] === num) {
          console.log(array[i], array[j], array[k]);
          return array[i] * array[j] * array[k];
        }
      }
    }
  }
};

console.log(findSum(2020, myArr));
