const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');

const inputSplit = input.trim().split(/\n\n/);

const groupArr = inputSplit.map((value) => {
  return value.split(/\n/);
});

const findSum = (array) => {
  let sum = 0;
  array.forEach((group) => {
    const grpJoin = group.join('');
    const allQuestions = grpJoin.split('');
    const unique = [...new Set(allQuestions)];
    sum += unique.length;
  });
  return sum !== 0 ? sum : 'invalid input';
};

const findCommon = (array) => {
  let sum = 0;
  array.forEach((group) => {
    const grpSize = group.length;
    const grpJoin = group.flat().join('');
    const allQuestions = grpJoin.split('');
    const unique = [...new Set(allQuestions)];
    let counts = {};
    allQuestions.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });

    unique.forEach((value) => {
      if (counts[value] === grpSize) {
        sum++;
      }
    });
  });
  return sum !== 0 ? sum : 'invalid input';
};

console.log('The answer for task 1 is: ', findSum(groupArr));

console.log('The answer for task 2 is: ', findCommon(groupArr));
