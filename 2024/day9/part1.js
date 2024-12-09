import { input, example, example2 } from './input.js';

function solve(input) {
    console.time();
    let fileInd = '0';
    let newStr = [];
    input.split('').forEach((element, ind) => {
        for (let index = 0; index < parseInt(element); index++) {
            newStr.push(ind % 2 === 0 ? parseInt(fileInd) : '.')
        }
        if (ind % 2 === 0) {
            fileInd = parseInt(fileInd);
            fileInd++
        }
        fileInd = fileInd + '';
    });

    let reverseInd = newStr.length - 1;
    newStr.forEach((e, ind) => {
        if (e === '.') {
            while (newStr[reverseInd] === '.') {
                reverseInd--;
            }
            if (reverseInd > ind) {
                newStr[ind] = newStr[reverseInd];
                newStr[reverseInd] = '.';
                reverseInd = newStr.length - 1;
            }
        }
    })

    let total = 0;
    newStr.forEach((e, ind) => {
        if (e !== '.') {
            total += parseInt(e)*ind;
        }
    })
    console.log(total);
    console.timeEnd();
}

solve(input);