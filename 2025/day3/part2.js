import { input, example2 } from './input.js';
let iterations = 11;
let resArray = [];

function solve(input) {
    console.time();
    const arr = input.trim().split('\n');
    resArray = [];
    arr.forEach(row => {
        const resultsRow = [];
        let highest = 0;
        let highestIndex = 0;

        row.split('').forEach((char, index) => {
            if (index < row.length - 11) {
                if (parseInt(char) > highest) {
                    highest = parseInt(char);
                    highestIndex = index;
                }
            }
        })

        resultsRow.push({value: highest, index: highestIndex});

        while (iterations > 0) {
            resultsRow.push(lookForHighest(row, row.length - iterations, resultsRow[resultsRow.length - 1].index));
        }

        iterations = 11;
        resArray.push(resultsRow.reduce((acc, curr) => acc + curr.value.toString(), ''));

    });
    
    console.log('Total:', resArray.reduce((a, b) => parseInt(a) + parseInt(b), 0));
    console.timeEnd();
}


function lookForHighest(row, maxIndex, currentHighestIndex) {
    let highest = 0;
    let highestIndex = 0;
    
    row.split('').forEach((char, index) => {
        if (index > currentHighestIndex && index <= maxIndex) {
            if (parseInt(char) > highest) {
                highest = parseInt(char);
                highestIndex = index;
            }
        }
    })
    iterations--;
    return {value: highest, index: highestIndex};
}
solve(input);