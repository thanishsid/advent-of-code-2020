const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf-8');

let inputSplit = input.split(/\r?\n/);

let inputArr = inputSplit.map((value) => {
  return value;
});

let newArr = inputArr.map((value) => {
  let newValue = value.split(':');
  let policy = newValue[0].split(' ');
  let pass = newValue[1].trim();
  let range = policy[0].split('-');
  let letr = policy[1];
  let firstPos = parseInt(range[0]) - 1;
  let secondPos = parseInt(range[1]) - 1;
  let isValid = null;
  if (pass[firstPos] === letr && pass[secondPos] !== letr) {
    isValid = true;
  } else if (pass[secondPos] === letr && pass[firstPos] !== letr) {
    isValid = true;
  } else {
    isValid = false;
  }

  return {
    password: pass,
    letter: letr,
    first: firstPos,
    second: secondPos,
    isValid: isValid,
  };
});

const findInvalid = (array) => {
  let validCount = 0;

  array.forEach((obj) => {
    if (obj['isValid']) {
      validCount++;
    }
  });

  return validCount;
};

console.log(findInvalid(newArr));
