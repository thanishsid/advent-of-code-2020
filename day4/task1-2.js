const fs = require('fs');

let input = fs.readFileSync('./input.txt', 'utf-8');

let inputSplit = input.split(/\n\n/);

let inputArr = inputSplit.map((value) => {
  let batch = value.split(/\s/);
  let fieldObj = {};
  batch.forEach((field) => {
    let property = field.split(/:/)[0];
    let val = field.split(/:/)[1];
    fieldObj[property] = val;
  });
  return fieldObj;
});

//function to check if each value of dataset has all necessary passport properties
const hasAllProperties = (obj) => {
  let props = ['iyr', 'byr', 'eyr', 'hcl', 'hgt', 'ecl', 'pid'];
  for (let i = 0; i < props.length; i++) {
    if (!obj.hasOwnProperty(props[i])) {
      return false;
    }
  }
  return true;
};

//function to check if valid eye color is given in each passport
const checkEyeColor = (eyeColor) => {
  let colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  for (let i = 0; i < colors.length; i++) {
    if (colors.includes(eyeColor)) {
      return true;
    }
  }
  return false;
};

//validate each property of a passport
const validateAllProperties = (obj) => {
  let props = ['iyr', 'byr', 'eyr', 'hcl', 'hgt', 'ecl', 'pid'];

  for (let i = 0; i < props.length; i++) {
    let prop = obj[props[i]];

    switch (props[i]) {
      case 'byr':
        if (parseInt(prop) > 2002 || parseInt(prop) < 1920) {
          return false;
        }
        break;
      case 'iyr':
        if (parseInt(prop) > 2020 || parseInt(prop) < 2010) {
          return false;
        }
        break;
      case 'eyr':
        if (parseInt(prop) > 2030 || parseInt(prop) < 2020) {
          return false;
        }
        break;
      case 'hgt':
        if (prop.match(/cm/)) {
          let num = parseInt(prop);
          if (num > 193 || num < 150) {
            return false;
          }
        } else if (prop.match(/in/)) {
          let num = parseInt(prop);
          if (num > 76 || num < 59) {
            return false;
          }
        } else if (Number(prop) !== NaN) {
          return false;
        }
        break;
      case 'hcl':
        if (prop.length !== 7) {
          return false;
        } else if (!prop.match(/[#]/)) {
          return false;
        } else if (prop.match(/[g-z]/)) {
          return false;
        }
        break;
      case 'ecl':
        if (!checkEyeColor(prop)) {
          return false;
        }
        break;
      case 'pid':
        if (prop.length !== 9) {
          return false;
        }
        break;
    }
  }
  return true;
};

const checkValid = (passports, fn) => {
  let validPassports = [];

  passports.forEach((passport) => {
    if (fn(passport)) {
      validPassports.push(passport);
    }
  });

  return validPassports;
};

//Task 1 answer
console.log(
  'The number of valid passports for task 1 is: ',
  checkValid(inputArr, hasAllProperties).length
);

//Task 2 asnwer
console.log(
  'The number of valid passports for task 2 is: ',
  checkValid(checkValid(inputArr, hasAllProperties), validateAllProperties)
    .length
);
