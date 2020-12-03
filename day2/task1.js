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
  let minimum = parseInt(range[0]);
  let maximum = parseInt(range[1]);
  let exp = new RegExp(letr, 'g');
  let cnt = (pass.match(exp) || []).length;

  return {
    password: pass,
    letter: letr,
    min: minimum,
    max: maximum,
    count: cnt,
    isValid: cnt >= minimum && cnt <= maximum,
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
