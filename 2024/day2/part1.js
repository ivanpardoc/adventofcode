import { input, example } from './input.js';

function solve(input) {
    const validRows = [];
    input.forEach((row, indexRow) => {
        let valid = true;
        let ascending = true;
        let splittedRow = row.split(' ');

        splittedRow.forEach((c, index) => {
            if (splittedRow[index+1]) {
                let diff = c - splittedRow[index+1];
                if (diff > 0 && index === 0) {
                    ascending = true;
                } else if (index === 0) {
                    ascending = false;
                }

                if (diff > 0 && index !== 0 && !ascending) {
                    valid = false;
                }
                
                if (diff < 0 && index !== 0 && ascending) {
                    valid = false;
                }

                diff = Math.abs(diff);

                if (diff > 3 || diff === 0) {
                    valid = false;
                }
            } else {
                if (valid) {
                    validRows.push(row);
                }
            }
        });
    });
    console.log(validRows.length);
}

solve(example);
solve(input);
