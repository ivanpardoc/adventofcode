import { input, example, example2 } from './input.js';
let total = [];
function solve(input) {
    console.time();
    const data = formatData(input);
    data.forEach((r, rowInd) => r.forEach((c, colInd) => c === 0 ? checkAround(data, rowInd, colInd, c, rowInd+''+colInd) : ''));
    let unique = [...new Set(total)];
    console.log('total', unique.length);
    console.timeEnd();
}

function checkAround(data, rowInd, colInd, currentValue, zeroPosition) {
    const numToFind = currentValue+1;
    const maxRow = data.length - 1;
    const maxCol = data[0].length - 1;
    if (currentValue === 9) {
        total.push(rowInd+''+colInd+zeroPosition)
    }
    if (rowInd !== maxRow) {
        if (data[rowInd + 1][colInd] === numToFind) {
            checkAround(data, rowInd+1, colInd, numToFind, zeroPosition);
        }
    }
    if (rowInd !== 0) {
        if (data[rowInd - 1][colInd] === numToFind) {
            checkAround(data, rowInd-1, colInd, numToFind, zeroPosition);
        }
    }
    
    if (colInd !== maxCol) {
        if (data[rowInd][colInd + 1] === numToFind) {
            checkAround(data, rowInd, colInd+1, numToFind, zeroPosition);
        }
    }
    if (colInd !== 0) {
        if (data[rowInd][colInd - 1] === numToFind) {
            checkAround(data, rowInd, colInd-1, numToFind, zeroPosition);
        }
    }
}

function formatData(input) {
    let data = [];
    input.split('\n').forEach(element => {
        let row = [];
        element.split('').forEach((c) => row.push(parseInt(c)));
        data.push(row)
    });
    return data;
}

solve(input);