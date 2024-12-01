import { input, example } from "./input.js";
const data = input;
let refinedData = [];

function solve() {
    console.time();
    data.forEach((row) => {
        refinedData.push(row.split(''));
    })
    tiltRocks()
}

function tiltRocks() {
    
    for (let indexCol = 0; indexCol < refinedData[0].length; indexCol++) {
        let rocks = [];
        for (let indexRow = refinedData.length-1; indexRow >= 0; indexRow--) {
            const row = refinedData[indexRow];
            const char = row[indexCol];

            if (char === 'O') {
                rocks.push({indexCol, indexRow});
                refinedData[indexRow][indexCol] = '.';
            }

            if (char === '#') {
                if (rocks.length !== 0) {
                    for (let index = indexRow + rocks.length; index > indexRow; index--) {
                        refinedData[index][indexCol] = 'O';
                    }
                }
                rocks = [];
            }
            if (indexRow === 0) {
                if (rocks.length !== 0) {
                    for (let index = rocks.length - 1; index >= 0; index--) {
                        refinedData[index][indexCol] = 'O';
                    }
                }
                rocks = [];
            }
        }
        }

    let totalCount = 0
    refinedData.forEach((row, index) => {
        const value = refinedData.length - index;
        let count = row.filter((v => v === 'O'));
        totalCount += count.length * value;
    })
    console.log(totalCount);
    console.timeEnd();
}

solve();