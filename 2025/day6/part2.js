import { input, example } from './input.js';

function solve(input) {
    console.time();
    let result = 0;
    const inputArr = input.trim().split('\n');
    let operationsIndex = []

    let operations = inputArr.pop();

    operations.split('').forEach((op, ind) => {
        if (op !== ' ') {
            operationsIndex.push({op, index: ind});
        }
    });

    operationsIndex.forEach((operation, opInd) => {
        let nextOpIndex = opInd !== operationsIndex.length-1 ? operationsIndex[opInd+1].index : inputArr[0].length;
        let numbers = [];

        for (let index = operation.index; index < nextOpIndex; index++) {
            let concatNums = '';
            inputArr.forEach((line) => {
                concatNums += line[index];
            });
            numbers.push(concatNums.trim() !== '' ? parseInt(concatNums) : '');
        }

        let total = numbers.reduce((previousValue, currentValue) => {
            if (currentValue === '') {
                return previousValue;
            }
            if (operation.op === '*') {
                return parseInt(previousValue) * parseInt(currentValue);
            } else {
                return parseInt(previousValue) + parseInt(currentValue);
            }
        }, operation.op === '*' ? 1 : 0);

        result += total;
    });

    console.log('result', result);
    console.timeEnd();
}

solve(input);

// 4.6ms