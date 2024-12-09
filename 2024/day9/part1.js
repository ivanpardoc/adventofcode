import { input, example, example2 } from './input.js';

function solve(input) {
    console.time();
    console.log(input);
    let fileInd = '0';
    let newStr = [];
    input.split('').forEach((element, ind) => {
        for (let index = 0; index < parseInt(element); index++) {
            // newStr += ind % 2 === 0 ? fileInd : '.';
            newStr.push(ind % 2 === 0 ? parseInt(fileInd) : '.')
        }
        if (ind % 2 === 0) {
            fileInd = parseInt(fileInd);
            fileInd++
        }
        fileInd = fileInd + '';
    });
    // console.log(newStr);
    let newStrSplitted = newStr;

    let reverseInd = newStrSplitted.length - 1;
    newStrSplitted.forEach((e, ind) => {
        // console.log(e);
        if (e === '.') {
            while (newStrSplitted[reverseInd] === '.') {
                reverseInd--;
            }
            if (reverseInd > ind) {
                newStrSplitted[ind] = newStrSplitted[reverseInd];
                newStrSplitted[reverseInd] = '.';
                reverseInd = newStrSplitted.length - 1;
            }
        }
    })
    console.log(newStrSplitted);
    let total = 0;
    newStrSplitted.forEach((e, ind) => {
        if (e !== '.') {
            total += parseInt(e)*ind;
        }
    })
    console.log(total);
    console.timeEnd();
}

solve(input);
// 90119246415 TOO LOW
// 6299243228569
// solve(input);