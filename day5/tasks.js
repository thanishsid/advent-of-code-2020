const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8');

const inputSplit = input.split(/\n/);

const createRows = () => {
  let rowsArr = [];
  for (let i = 0; i < 128; i++) {
    rowsArr.push({ row: i, column: [] });
    for (let j = 0; j < 8; j++) {
      rowsArr[i]['column'].push(j);
    }
  }
  return rowsArr;
};

const createSeats = () => {
  let rowsArr = [];
  for (let i = 0; i < 128; i++) {
    rowsArr.push({ row: i, seatNo: [] });
    for (let j = 0; j < 8; j++) {
      rowsArr[i]['seatNo'].push(0);
    }
  }
  return rowsArr;
};

const findSeat = (array) => {
  let maxId = 0;
  let seats = createSeats().map((value) => value);
  let mySeatId = null;

  array.forEach((bPass) => {
    let rows = createRows().map((value) => value);
    let column = rows[0]['column'];

    for (let i = 0; i < bPass.length; i++) {
      if (bPass[i] === 'F') {
        rows.splice(rows.length / 2, rows.length / 2);
      } else if (bPass[i] === 'B') {
        rows.splice(0, rows.length / 2);
      } else if (bPass[i] === 'L') {
        column.splice(column.length / 2, column.length / 2);
      } else if (bPass[i] === 'R') {
        column.splice(0, column.length / 2);
      }
    }
    let rowNum = rows[0]['row'];
    let seatId = rowNum * 8 + column[0];
    if (seatId > maxId) {
      maxId = seatId;
    }

    for (let i = 0; i < 128; i++) {
      if (rowNum === i && seatId !== 0) {
        seats[i]['seatNo'][column[0]] = seatId;
      }
    }
  });
  //   console.log(seats);

  let removeEmptySeat = seats.map((row) => {
    if (parseInt(row['seatNo'].join('')) !== 0) {
      return row['seatNo'];
    } else {
      return [];
    }
  });

  let filterFlatSeat = removeEmptySeat.filter((arr) => arr.length > 0).flat();

  filterFlatSeat.forEach((num, index) => {
    if (
      num === 0 &&
      filterFlatSeat[index + 1] - filterFlatSeat[index - 1] === 2
    ) {
      mySeatId = filterFlatSeat[index - 1] + 1;
    }
  });

  return [maxId, mySeatId];
};

console.log('The answer for task 1 is: ', findSeat(inputSplit)[0]);
console.log('The answer for task 2 is: ', findSeat(inputSplit)[1]);
