import { input, example2, example, example3 } from './input.js';

function solve(input) {
    const sanitizedRows = [];
    input.forEach((row) => {
        let splitted = row.split(' ');
        let san = {
            og: splitted,
            variants: [splitted],
            valid: false
        }
        splitted.forEach((c, index) => {
            splitted = row.split(' ');
            splitted.splice(index, 1);
            san.variants.push(splitted);
        });
        sanitizedRows.push(san);
    })

    sanitizedRows.forEach((san) => {
        san.variants.forEach((row) => {
            let valid = true;
            let ascending = true;
            if (!san.valid) {
                let splittedRow = row;
                splittedRow.forEach((c, index) => {
                    if (splittedRow[index + 1]) {
                        let diff = c - splittedRow[index + 1];
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
                            san.valid = true;
                        }
                    }
                });
            }
        });
    })
    console.log(sanitizedRows.filter((s) => s.valid).length);
}

solve(input);
// solve(input);

// 700 too low