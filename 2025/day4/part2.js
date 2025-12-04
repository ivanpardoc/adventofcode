import { input, example } from './input.js';

function solve(input) {
    console.time();
    let arr = input.trim().split('\n');
    let backupArr = [...arr];
    let result = 0;
    let continueLoop = true;

    while (continueLoop) {
        let resultBeforeThisLoop = result;

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
                        backupArr[rIndex] = replaceString(backupArr[rIndex], charIndex, '.');
                    }
                }
            });
        });

        continueLoop = result !== resultBeforeThisLoop;
        arr = backupArr;
    }

    console.log('result', result);
    console.timeEnd();
}

function replaceString(str, index, chr) {
    return str.substring(0,index) + chr + str.substring(index+1);
}

solve(input);