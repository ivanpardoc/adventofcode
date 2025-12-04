import { input, example } from './input.js';

function solve(input) {
    console.time();
    const arr = input.trim().split('\n');
    let result = 0;

    arr.forEach((row, rIndex) => {
        row.split('').forEach((char, charIndex) => {
            if (char === '@') {
                let count = 0;
                let brow = arr[rIndex-1] || '';
                let nrow = arr[rIndex+1] || '';
                let topRow = brow.substring(charIndex - 1, charIndex + 2);
                let bottomRow = nrow.substring(charIndex - 1, charIndex + 2);
                count += topRow.match(/@/g)?.length || 0;
                count += bottomRow.match(/@/g)?.length || 0;
                row[charIndex - 1] === '@' && count++;
                row[charIndex + 1] === '@' && count++;

                if (count < 4) {
                    result++;
                }
            }
        });
        
    });

    console.log('result', result);
    console.timeEnd();
}

solve(input);