const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');

const inputSplit = input.split(/\n\n/);

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
    const questionSplit = group.map((person) => {
      return person.split('');
    });

    let unique = [...new Set(questionSplit.flat())];
    // console.log(unique);

    let commonCount = 0;

    unique.forEach((question) => {
      let isCommon = false;
      for (let i = 0; i < questionSplit.length; i++) {
        if (questionSplit[i].includes(question)) {
          isCommon = true;
        } else {
          isCommon = false;
        }
      }

      isCommon ? commonCount++ : (commonCount += 0);
    });
    sum += commonCount;
  });
  return sum;
};

console.log(findCommon(groupArr));
